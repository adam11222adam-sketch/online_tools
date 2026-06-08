'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UploadBox from './UploadBox';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Tool } from '@/lib/tools';

// Configure pdfjs worker
if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

interface PdfExtractClientProps {
  tool: Tool;
}

export default function PdfExtractClient({ tool }: PdfExtractClientProps) {
  const t = useTranslations('common');
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleProcess = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError(null);
    setProgress(0);

    try {
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const numPages = pdf.numPages;
      const zip = new JSZip();

      for (let i = 1; i <= numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // Higher quality
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        if (!context) throw new Error('Could not create canvas context');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport, canvas }).promise;

        // Convert canvas to blob
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, 'image/jpeg', 0.9);
        });

        if (blob) {
          zip.file(`page-${i}.jpg`, blob);
        }

        setProgress(Math.round((i / numPages) * 100));
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      saveAs(zipBlob, `${tool.slug}-result.zip`);
      
      setDone(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred during processing.');
      console.error(err);
    } finally {
      setProcessing(false);
      setProgress(0);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      {!done ? (
        <>
          <UploadBox
            acceptedFormats={tool.acceptedFormats}
            maxFileSize={tool.maxFileSize}
            multiple={false} // Only process one PDF at a time for memory reasons
            onFilesSelected={(f) => setFiles((prev) => [...prev, ...f].slice(0, 1))}
          />

          {files.length > 0 && (
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-surface rounded-lg px-4 py-2">
                    <span className="text-sm text-foreground truncate">{f.name}</span>
                    <button onClick={() => setFiles([])} className="text-danger text-sm hover:underline">
                      {t('delete')}
                    </button>
                  </div>
                ))}
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-200">
                  {error}
                </div>
              )}

              {processing && (
                <div className="w-full bg-surface rounded-full h-2.5 mb-4 overflow-hidden">
                  <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
              )}

              <button
                onClick={handleProcess}
                disabled={processing}
                className="w-full btn-primary py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {processing ? `${t('processing')} ${progress}%` : t('process')}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10 animate-fade-in">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="text-xl font-bold text-foreground mb-2">{t('done')}</h3>
          <button
            onClick={() => { setDone(false); setFiles([]); }}
            className="mt-4 px-6 py-2 rounded-xl border border-border text-muted hover:bg-surface-hover transition-colors"
          >
            {t('tryAgain')}
          </button>
        </div>
      )}
    </div>
  );
}
