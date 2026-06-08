'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import UploadBox from './UploadBox';
import { PDFDocument, degrees } from 'pdf-lib-plus-encrypt';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Tool } from '@/lib/tools';
import * as pdfjsLib from 'pdfjs-dist';
import { 
  RotateCw, 
  RotateCcw, 
  RefreshCcw, 
  Trash2, 
  Lock, 
  Check, 
  AlertTriangle, 
  Grid as GridIcon, 
  FileText,
  HelpCircle,
  Undo,
  ListOrdered
} from 'lucide-react';

// Configure pdfjs worker
if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

interface Props {
  tool: Tool;
}

// Subcomponent to lazy render individual page thumbnails
function PageThumbnail({ 
  pdfDocJs, 
  pageIndex, 
  rotation = 0 
}: { 
  pdfDocJs: pdfjsLib.PDFDocumentProxy; 
  pageIndex: number; 
  rotation?: number; 
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const render = async () => {
      try {
        setLoading(true);
        const page = await pdfDocJs.getPage(pageIndex + 1);
        const viewport = page.getViewport({ scale: 0.35 });
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        if (active) {
          await page.render({ canvasContext: context, viewport, canvas }).promise;
          setLoading(false);
        }
      } catch (err) {
        console.error('Thumbnail render error:', err);
      }
    };
    render();
    return () => {
      active = false;
    };
  }, [pdfDocJs, pageIndex]);

  return (
    <div className="relative w-full aspect-[3/4] flex items-center justify-center bg-surface rounded-lg overflow-hidden border border-border/40 group-hover:border-primary/30 transition-colors">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-hover animate-pulse">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="max-w-full max-h-full transition-transform duration-300 ease-in-out shadow-sm"
        style={{ transform: `rotate(${rotation}deg)` }}
      />
    </div>
  );
}

export default function PdfAdvancedClient({ tool }: Props) {
  const t = useTranslations('common');
  const tPremium = useTranslations('premium');
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // PDFjs structures for visualization
  const [pdfDocJs, setPdfDocJs] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  // States for PDF Rotate
  const [previewRotation, setPreviewRotation] = useState(0);

  // States for PDF Delete Pages
  const [selectedPagesToDelete, setSelectedPagesToDelete] = useState<Set<number>>(new Set());

  // States for PDF Reorder Pages
  const [orderedPageIndices, setOrderedPageIndices] = useState<number[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Protect / Unlock password states
  const [password, setPassword] = useState('');

  const triggerDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleFileSelect = async (selectedFiles: File[]) => {
    const file = selectedFiles[0];
    if (!file) return;
    setFiles([file]);
    setError(null);
    setDone(false);
    setPdfDocJs(null);
    setTotalPages(0);
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Load utilizing pdfjs-dist
      const pdfJs = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      setPdfDocJs(pdfJs);
      setTotalPages(pdfJs.numPages);
      
      // Reset component action states
      setPreviewRotation(0);
      setSelectedPagesToDelete(new Set());
      const indices = Array.from({ length: pdfJs.numPages }, (_, i) => i);
      setOrderedPageIndices(indices);
    } catch (err: any) {
      console.error('Error parsing PDF file:', err);
      if (err.name === 'PasswordException' || err.message.includes('password')) {
        // If it's a password locked PDF, we let unlock-pdf bypass direct client loading
        if (tool.slug === 'unlock-pdf') {
          // Set placeholders to let processing go to the secure route
          setTotalPages(-1); 
        } else {
          setError(tPremium('unlockError'));
        }
      } else {
        setError(err.message || 'Error loading PDF file.');
      }
    }
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError(null);

    try {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();

      if (tool.slug === 'protect-pdf') {
        const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
        await pdfDoc.encrypt({
          userPassword: password,
          ownerPassword: password,
          permissions: {
            printing: 'highResolution',
            modifying: false,
            copying: false,
            annotating: false,
            fillingForms: false,
            contentAccessibility: false,
            documentAssembly: false,
          }
        });
        const pdfBytes = await pdfDoc.save();
        triggerDownload(new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' }), `protected_${file.name}`);
        setDone(true);
        return;
      }

      if (tool.slug === 'unlock-pdf') {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('password', password);
        const res = await fetch('/api/pdf/unlock', { method: 'POST', body: formData });
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          if (res.status === 501 || errorData.error === 'qpdfNotInstalled') {
            throw new Error(tPremium('qpdfNotInstalled'));
          }
          throw new Error(tPremium('unlockError'));
        }
        const blob = await res.blob();
        triggerDownload(blob, `unlocked_${file.name}`);
        setDone(true);
        return;
      }

      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalCount = pdfDoc.getPageCount();

      if (tool.slug === 'split-pdf') {
        const zip = new JSZip();
        for (let i = 0; i < totalCount; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
          newPdf.addPage(copiedPage);
          const pdfBytes = await newPdf.save();
          zip.file(`page-${i + 1}.pdf`, pdfBytes);
        }
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, `split_${file.name.replace('.pdf', '')}.zip`);

      } else if (tool.slug === 'rotate-pdf') {
        const pages = pdfDoc.getPages();
        pages.forEach((page) => {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees((currentRotation + previewRotation) % 360));
        });
        const pdfBytes = await pdfDoc.save();
        triggerDownload(new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' }), `rotated_${file.name}`);

      } else if (tool.slug === 'delete-pdf-pages') {
        // Sort descendingly to prevent index shifting issues
        const pagesToRemove = Array.from(selectedPagesToDelete).sort((a, b) => b - a);

        if (pagesToRemove.length === 0) {
          throw new Error(tPremium('noPagesSelected'));
        }
        if (pagesToRemove.length >= totalCount) {
          throw new Error(tPremium('cannotDeleteAll'));
        }

        pagesToRemove.forEach((idx) => {
          pdfDoc.removePage(idx);
        });

        const pdfBytes = await pdfDoc.save();
        triggerDownload(new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' }), `deleted_${file.name}`);

      } else if (tool.slug === 'organize-pdf') {
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdfDoc, orderedPageIndices);
        copiedPages.forEach((page) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        triggerDownload(new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' }), `reordered_${file.name}`);

      } else if (tool.slug === 'compress-pdf') {
        const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
        triggerDownload(new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' }), `compressed_${file.name}`);
      }

      setDone(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during processing.');
    } finally {
      setProcessing(false);
    }
  };

  // Select utilities for PDF delete page grid
  const togglePageDeleteSelection = (idx: number) => {
    setSelectedPagesToDelete(prev => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const selectOddPages = () => {
    const next = new Set<number>();
    for (let i = 0; i < totalPages; i += 2) {
      next.add(i);
    }
    setSelectedPagesToDelete(next);
  };

  const selectEvenPages = () => {
    const next = new Set<number>();
    for (let i = 1; i < totalPages; i += 2) {
      next.add(i);
    }
    setSelectedPagesToDelete(next);
  };

  const selectAllPages = () => {
    const next = new Set<number>();
    for (let i = 0; i < totalPages; i++) {
      next.add(i);
    }
    setSelectedPagesToDelete(next);
  };

  // Reordering native Drag & Drop hooks
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...orderedPageIndices];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    
    setOrderedPageIndices(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const reversePageOrder = () => {
    setOrderedPageIndices(prev => [...prev].reverse());
  };

  const resetPageOrder = () => {
    setOrderedPageIndices(Array.from({ length: totalPages }, (_, i) => i));
  };

  return (
    <div className="bg-card/75 border border-border/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl transition-all duration-300">
      {!done ? (
        <>
          <UploadBox
            acceptedFormats={tool.acceptedFormats}
            maxFileSize={tool.maxFileSize}
            multiple={false}
            onFilesSelected={handleFileSelect}
          />

          {files.length > 0 && (
            <div className="mt-8 space-y-6">
              {/* File Info Header */}
              <div className="flex items-center justify-between bg-surface/80 border border-border/40 rounded-2xl px-5 py-3.5 backdrop-blur-sm">
                <div className="flex items-center space-x-3 rtl:space-x-reverse min-w-0">
                  <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-semibold text-foreground truncate">{files[0].name}</span>
                </div>
                <button 
                  onClick={() => {
                    setFiles([]);
                    setPdfDocJs(null);
                    setTotalPages(0);
                    setError(null);
                  }} 
                  className="text-danger text-sm font-medium hover:underline flex-shrink-0 cursor-pointer"
                >
                  {t('delete')}
                </button>
              </div>

              {error && (
                <div className="p-4 bg-danger/10 text-danger border border-danger/20 rounded-2xl text-sm font-medium flex items-start space-x-2.5 rtl:space-x-reverse">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* DYNAMIC UX SLUG INTERFACES */}

              {/* 1. PDF Rotation Layout */}
              {tool.slug === 'rotate-pdf' && pdfDocJs && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-surface/30 p-6 rounded-3xl border border-border/40">
                  <div className="flex flex-col items-center justify-center p-4 bg-card/65 rounded-2xl border border-border/50 shadow-inner">
                    <span className="text-xs font-semibold text-muted mb-4 uppercase tracking-wider">
                      {tPremium('firstPagePreview')}
                    </span>
                    <div className="w-52 md:w-60 shadow-lg hover:shadow-xl transition-all duration-300">
                      <PageThumbnail pdfDocJs={pdfDocJs} pageIndex={0} rotation={previewRotation} />
                    </div>
                    <span className="text-xs text-muted text-center mt-4 max-w-xs">
                      {tPremium('firstPagePreviewNote')}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center space-y-5">
                    <h3 className="text-lg font-bold text-foreground">{tPremium('rotatePdfTitle')}</h3>
                    <p className="text-sm text-muted leading-relaxed">{tPremium('rotatePdfDesc')}</p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPreviewRotation(prev => (prev + 90) % 360)}
                        className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-xl border border-border bg-card hover:bg-surface-hover hover:border-primary/50 text-foreground transition-all duration-200 cursor-pointer font-medium text-sm"
                      >
                        <RotateCw className="w-4 h-4 text-primary" />
                        <span>{tPremium('rotateRight')}</span>
                      </button>
                      <button
                        onClick={() => setPreviewRotation(prev => (prev + 270) % 360)}
                        className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-xl border border-border bg-card hover:bg-surface-hover hover:border-primary/50 text-foreground transition-all duration-200 cursor-pointer font-medium text-sm"
                      >
                        <RotateCcw className="w-4 h-4 text-primary" />
                        <span>{tPremium('rotateLeft')}</span>
                      </button>
                      <button
                        onClick={() => setPreviewRotation(prev => (prev + 180) % 360)}
                        className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-xl border border-border bg-card hover:bg-surface-hover hover:border-primary/50 text-foreground transition-all duration-200 cursor-pointer font-medium text-sm"
                      >
                        <RefreshCcw className="w-4 h-4 text-primary" />
                        <span>{tPremium('rotate180')}</span>
                      </button>
                      <button
                        onClick={() => setPreviewRotation(0)}
                        className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-xl border border-border bg-card hover:bg-danger/10 hover:border-danger/30 hover:text-danger text-muted transition-all duration-200 cursor-pointer font-medium text-sm"
                      >
                        <Undo className="w-4 h-4" />
                        <span>{tPremium('reset')}</span>
                      </button>
                    </div>

                    <button
                      onClick={handleProcess}
                      disabled={processing}
                      className="w-full btn-primary py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 mt-4 cursor-pointer"
                    >
                      {processing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>{tPremium('rotating')}</span>
                        </>
                      ) : (
                        <>
                          <RotateCw className="w-5 h-5 animate-pulse" />
                          <span>{tPremium('rotatePdf')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* 2. PDF Delete Pages Layout */}
              {tool.slug === 'delete-pdf-pages' && pdfDocJs && (
                <div className="space-y-6">
                  <div className="bg-surface/50 border border-border/40 p-5 rounded-3xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-foreground">{tPremium('selectPagesToDelete')}</h3>
                        <p className="text-xs text-muted mt-0.5">{tPremium('selectPagesToDeleteDesc')}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={selectOddPages}
                          className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-surface-hover text-xs font-semibold text-foreground cursor-pointer transition-colors"
                        >
                          {tPremium('oddPages')}
                        </button>
                        <button
                          onClick={selectEvenPages}
                          className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-surface-hover text-xs font-semibold text-foreground cursor-pointer transition-colors"
                        >
                          {tPremium('evenPages')}
                        </button>
                        <button
                          onClick={selectAllPages}
                          className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-surface-hover text-xs font-semibold text-foreground cursor-pointer transition-colors"
                        >
                          {tPremium('allPages')}
                        </button>
                        <button
                          onClick={() => setSelectedPagesToDelete(new Set())}
                          className="px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-danger/10 hover:text-danger hover:border-danger/20 text-xs font-semibold text-muted cursor-pointer transition-colors"
                        >
                          {tPremium('deselectAll')}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-border/30 pt-3 text-sm">
                      <span className="font-semibold text-foreground">
                        {selectedPagesToDelete.size > 0 
                          ? tPremium('selectedPagesCount', { count: selectedPagesToDelete.size })
                          : tPremium('noPagesSelected')
                        }
                      </span>
                      {selectedPagesToDelete.size >= totalPages && (
                        <span className="text-xs text-danger font-medium flex items-center space-x-1.5 rtl:space-x-reverse">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                          <span>{tPremium('cannotDeleteAll')}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const isSelected = selectedPagesToDelete.has(i);
                      return (
                        <div
                          key={i}
                          onClick={() => togglePageDeleteSelection(i)}
                          className={`relative group cursor-pointer border rounded-2xl p-2 transition-all duration-200 bg-card select-none ${
                            isSelected 
                              ? 'border-danger bg-danger/5 ring-2 ring-danger/20' 
                              : 'border-border/60 hover:border-primary/45 hover:shadow-md'
                          }`}
                        >
                          <PageThumbnail pdfDocJs={pdfDocJs} pageIndex={i} />
                          
                          <div className="mt-2 flex items-center justify-between px-1">
                            <span className="text-xs font-bold text-foreground">
                              {tPremium('originalPage', { page: i + 1 })}
                            </span>
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${
                              isSelected 
                                ? 'bg-danger border-danger text-white' 
                                : 'border-border/80 group-hover:border-primary'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>

                          {isSelected && (
                            <div className="absolute inset-2 bg-danger/10 border border-danger/25 rounded-lg flex flex-col items-center justify-center backdrop-blur-[1px] animate-fade-in">
                              <Trash2 className="w-6 h-6 text-danger drop-shadow" />
                              <span className="text-[10px] font-black text-danger mt-1.5 uppercase tracking-wider select-none bg-card px-1.5 py-0.5 rounded shadow-sm">
                                {tPremium('toBeDeleted')}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleProcess}
                    disabled={processing || selectedPagesToDelete.size === 0 || selectedPagesToDelete.size >= totalPages}
                    className="w-full btn-primary py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 cursor-pointer mt-4"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{tPremium('deletingPages')}</span>
                      </>
                    ) : (
                      <>
                        <Trash2 className="w-5 h-5" />
                        <span>{tPremium('deleteBtnText')}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* 3. PDF Reordering Pages Layout */}
              {tool.slug === 'organize-pdf' && pdfDocJs && (
                <div className="space-y-6">
                  <div className="bg-surface/50 border border-border/40 p-5 rounded-3xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <h3 className="text-base font-bold text-foreground">{tPremium('reorderTitle')}</h3>
                        <p className="text-xs text-muted mt-0.5">{tPremium('reorderDesc')}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={reversePageOrder}
                          className="px-3.5 py-1.5 rounded-lg border border-border bg-card hover:bg-surface-hover text-xs font-semibold text-foreground cursor-pointer transition-colors"
                        >
                          {tPremium('reverseOrder')}
                        </button>
                        <button
                          onClick={resetPageOrder}
                          className="px-3.5 py-1.5 rounded-lg border border-border bg-card hover:bg-danger/10 hover:text-danger hover:border-danger/20 text-xs font-semibold text-muted cursor-pointer transition-colors"
                        >
                          {tPremium('resetOrder')}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar select-none">
                    {orderedPageIndices.map((originalIndex, index) => {
                      const isDragged = draggedIndex === index;
                      const isDragOver = dragOverIndex === index;
                      return (
                        <div
                          key={originalIndex}
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={(e) => handleDragOver(e, index)}
                          onDrop={(e) => handleDrop(e, index)}
                          onDragEnd={handleDragEnd}
                          className={`relative group cursor-grab border rounded-2xl p-2 transition-all duration-200 bg-card active:cursor-grabbing ${
                            isDragged ? 'opacity-30 border-primary/20 scale-95' : ''
                          } ${
                            isDragOver ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-border/60 hover:border-primary/45 hover:shadow-md'
                          }`}
                        >
                          <PageThumbnail pdfDocJs={pdfDocJs} pageIndex={originalIndex} />
                          
                          <div className="mt-2.5 space-y-1 text-center select-none">
                            <div className="text-xs font-bold text-foreground">
                              {tPremium('originalPage', { page: originalIndex + 1 })}
                            </div>
                            <div className="text-[10px] text-primary font-bold bg-primary/10 inline-block px-2 py-0.5 rounded-full">
                              {tPremium('newPosition', { pos: index + 1 })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleProcess}
                    disabled={processing}
                    className="w-full btn-primary py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 cursor-pointer mt-4"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{tPremium('reorderingPages')}</span>
                      </>
                    ) : (
                      <>
                        <ListOrdered className="w-5 h-5" />
                        <span>{tPremium('saveNewOrder')}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* 4. PDF Unlock Layout */}
              {tool.slug === 'unlock-pdf' && (
                <div className="space-y-6 max-w-xl mx-auto bg-surface/30 p-6 sm:p-8 rounded-3xl border border-border/40">
                  <div className="flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{tPremium('unlockPdf')}</h3>
                      <p className="text-xs text-muted mt-1 leading-relaxed">{tPremium('unlockPdfDesc')}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-1.5">
                        {t('password') || 'كلمة المرور'}
                      </label>
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={t('password') || '••••••••'}
                        className="w-full px-4 py-3 rounded-2xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-center placeholder:text-muted/40 font-medium"
                      />
                    </div>

                    <div className="p-4 bg-warning/10 border border-warning/20 rounded-2xl text-xs font-semibold text-warning flex items-start space-x-2.5 rtl:space-x-reverse leading-relaxed shadow-sm">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-warning" />
                      <span>{tPremium('privacyWarning')}</span>
                    </div>

                    <button
                      onClick={handleProcess}
                      disabled={processing || !password}
                      className="w-full btn-primary py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 cursor-pointer"
                    >
                      {processing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>{tPremium('unlockingPdf')}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-5 h-5" />
                          <span>{tPremium('unlockPdfBtn')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* 5. Split PDF Layout */}
              {tool.slug === 'split-pdf' && (
                <button
                  onClick={handleProcess}
                  disabled={processing}
                  className="w-full btn-primary py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 cursor-pointer"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('processing')}</span>
                    </>
                  ) : (
                    <>
                      <GridIcon className="w-5 h-5" />
                      <span>{t('process') || 'تطبيق العملية'}</span>
                    </>
                  )}
                </button>
              )}

              {/* 6. Protect PDF Layout */}
              {tool.slug === 'protect-pdf' && (
                <div className="space-y-5 max-w-xl mx-auto bg-surface/30 p-6 sm:p-8 rounded-3xl border border-border/40">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1.5">{t('password')}</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('password') || '••••••••'}
                      className="w-full px-4 py-3 rounded-2xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all text-center"
                    />
                  </div>

                  <button
                    onClick={handleProcess}
                    disabled={processing || !password}
                    className="w-full btn-primary py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 cursor-pointer"
                  >
                    {processing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('processing')}</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        <span>{t('process')}</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* 7. Compress PDF Layout */}
              {tool.slug === 'compress-pdf' && (
                <button
                  onClick={handleProcess}
                  disabled={processing}
                  className="w-full btn-primary py-3.5 rounded-2xl font-bold flex items-center justify-center space-x-2 rtl:space-x-reverse disabled:opacity-50 cursor-pointer"
                >
                  {processing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{t('processing')}</span>
                    </>
                  ) : (
                    <span>{t('process') || 'تطبيق العملية'}</span>
                  )}
                </button>
              )}

            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 animate-fade-in flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-success/15 rounded-full flex items-center justify-center text-success text-3xl">
            ✓
          </div>
          <h3 className="text-xl font-bold text-foreground">{t('done')}</h3>
          <p className="text-sm text-muted">
            {tool.slug === 'rotate-pdf' ? tPremium('rotatedSuccess') :
             tool.slug === 'delete-pdf-pages' ? tPremium('deletedSuccess') :
             tool.slug === 'organize-pdf' ? tPremium('reorderedSuccess') :
             tool.slug === 'unlock-pdf' ? tPremium('unlockedSuccess') : t('done')}
          </p>
          <button
            onClick={() => { setDone(false); setFiles([]); setPdfDocJs(null); setTotalPages(0); setPassword(''); }}
            className="mt-6 px-6 py-2.5 rounded-xl border border-border text-muted hover:bg-surface-hover hover:text-foreground font-semibold transition-all duration-200 cursor-pointer"
          >
            {t('tryAgain')}
          </button>
        </div>
      )}
    </div>
  );
}
