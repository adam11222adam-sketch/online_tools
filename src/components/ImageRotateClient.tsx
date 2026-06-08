'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import UploadBox from './UploadBox';
import type { Tool } from '@/lib/tools';
import { 
  RotateCw, 
  RotateCcw, 
  RefreshCcw, 
  Trash2, 
  Undo,
  Image as ImageIcon,
  AlertTriangle
} from 'lucide-react';

interface Props {
  tool: Tool;
}

export default function ImageRotateClient({ tool }: Props) {
  const t = useTranslations('common');
  const tPremium = useTranslations('premium');
  const [files, setFiles] = useState<File[]>([]);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgDimensions, setImgDimensions] = useState<{ width: number; height: number } | null>(null);
  
  const [rotation, setRotation] = useState(0); // Current degree (0, 90, 180, 270)
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imgUrl) {
        URL.revokeObjectURL(imgUrl);
      }
    };
  }, [imgUrl]);

  const handleFileSelect = (selectedFiles: File[]) => {
    const file = selectedFiles[0];
    if (!file) return;
    
    setFiles([file]);
    setError(null);
    setDone(false);
    setRotation(0);

    const url = URL.createObjectURL(file);
    setImgUrl(url);

    // Retrieve image dimensions
    const img = new Image();
    img.onload = () => {
      setImgDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      setError(tPremium('imageReadError'));
    };
    img.src = url;
  };

  const handleProcess = async () => {
    if (files.length === 0 || !imgUrl) return;
    setProcessing(true);
    setError(null);

    try {
      const file = files[0];
      const img = new Image();
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error(tPremium('imageReadError')));
        img.src = imgUrl;
      });

      const canvas = document.createElement('canvas');
      const angleRad = (rotation * Math.PI) / 180;
      const is90or270 = Math.abs(rotation % 180) === 90;

      if (is90or270) {
        canvas.width = img.naturalHeight;
        canvas.height = img.naturalWidth;
      } else {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas 2D context');

      // Ensure crisp draws
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Perform standard matrix rotation and translation
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(angleRad);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

      // Determine output mime-type based on original file type
      let mimeType = file.type;
      let extension = file.name.split('.').pop() || 'png';
      if (!['image/png', 'image/jpeg', 'image/webp'].includes(mimeType)) {
        mimeType = 'image/png';
        extension = 'png';
      }

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), mimeType, mimeType === 'image/jpeg' ? 0.95 : undefined);
      });

      if (!blob) throw new Error('Failed to render rotated image to canvas.');

      // Download file client-side
      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `rotated_${file.name.replace(/\.[^/.]+$/, '')}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(downloadUrl);

      setDone(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred rotating the image.');
    } finally {
      setProcessing(false);
    }
  };

  const getFormattedSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

          {files.length > 0 && imgUrl && (
            <div className="mt-8 space-y-6">
              {/* File details panel */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-surface/80 border border-border/40 rounded-2xl px-5 py-4 backdrop-blur-sm gap-3">
                <div className="flex items-center space-x-3 rtl:space-x-reverse min-w-0">
                  <ImageIcon className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-sm font-bold text-foreground truncate block">{files[0].name}</span>
                    {imgDimensions && (
                      <span className="text-[11px] text-muted block mt-0.5">
                        {tPremium('imageDimensions', { width: imgDimensions.width, height: imgDimensions.height })} • {tPremium('imageType', { type: files[0].type.split('/')[1].toUpperCase() })} • {tPremium('imageSize', { size: getFormattedSize(files[0].size) })}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFiles([]);
                    setImgUrl(null);
                    setImgDimensions(null);
                    setError(null);
                  }}
                  className="text-danger text-sm font-semibold hover:underline flex-shrink-0 self-end sm:self-center cursor-pointer"
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

              {/* Layout splits into Visual Preview and Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-surface/30 p-6 rounded-3xl border border-border/40">
                <div className="flex flex-col items-center justify-center p-4 bg-card/65 rounded-2xl border border-border/50 shadow-inner min-h-[300px] relative overflow-hidden">
                  <span className="text-xs font-semibold text-muted mb-4 uppercase tracking-wider">
                    {tPremium('imagePreview')}
                  </span>
                  
                  <div className="relative max-w-full max-h-[250px] flex items-center justify-center overflow-hidden rounded-lg">
                    {/* Visual Preview displaying rotation with CSS transform */}
                    <img
                      src={imgUrl}
                      alt="Preview"
                      className="max-w-full max-h-[250px] object-contain transition-transform duration-300 ease-in-out shadow-md rounded border border-border/30"
                      style={{ transform: `rotate(${rotation}deg)` }}
                    />
                  </div>
                  
                  <span className="text-xs text-muted text-center mt-4 max-w-xs leading-relaxed">
                    {tPremium('saveImageAngleDesc')}
                  </span>
                </div>

                {/* Controls Column */}
                <div className="flex flex-col justify-center space-y-5">
                  <h3 className="text-lg font-bold text-foreground">{tPremium('rotateImage')}</h3>
                  <p className="text-sm text-muted leading-relaxed">{tPremium('imagePreviewDesc')}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setRotation(prev => (prev + 90) % 360)}
                      className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-xl border border-border bg-card hover:bg-surface-hover hover:border-primary/50 text-foreground transition-all duration-200 cursor-pointer font-semibold text-sm"
                    >
                      <RotateCw className="w-4 h-4 text-primary" />
                      <span>{tPremium('rotateRight')}</span>
                    </button>
                    <button
                      onClick={() => setRotation(prev => (prev + 270) % 360)}
                      className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-xl border border-border bg-card hover:bg-surface-hover hover:border-primary/50 text-foreground transition-all duration-200 cursor-pointer font-semibold text-sm"
                    >
                      <RotateCcw className="w-4 h-4 text-primary" />
                      <span>{tPremium('rotateLeft')}</span>
                    </button>
                    <button
                      onClick={() => setRotation(prev => (prev + 180) % 360)}
                      className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-xl border border-border bg-card hover:bg-surface-hover hover:border-primary/50 text-foreground transition-all duration-200 cursor-pointer font-semibold text-sm"
                    >
                      <RefreshCcw className="w-4 h-4 text-primary" />
                      <span>{tPremium('rotate180')}</span>
                    </button>
                    <button
                      onClick={() => setRotation(0)}
                      className="flex items-center justify-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-xl border border-border bg-card hover:bg-danger/10 hover:border-danger/30 hover:text-danger text-muted transition-all duration-200 cursor-pointer font-semibold text-sm"
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
                        <span>{tPremium('rotatingImage')}</span>
                      </>
                    ) : (
                      <>
                        <RotateCw className="w-5 h-5" />
                        <span>{tPremium('rotateImageBtn')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 animate-fade-in flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-success/15 rounded-full flex items-center justify-center text-success text-3xl">
            ✓
          </div>
          <h3 className="text-xl font-bold text-foreground">{t('done')}</h3>
          <p className="text-sm text-muted">{tPremium('rotatedImageSuccess')}</p>
          <button
            onClick={() => {
              setDone(false);
              setFiles([]);
              setImgUrl(null);
              setImgDimensions(null);
            }}
            className="mt-6 px-6 py-2.5 rounded-xl border border-border text-muted hover:bg-surface-hover hover:text-foreground font-semibold transition-all duration-200 cursor-pointer"
          >
            {t('tryAgain')}
          </button>
        </div>
      )}
    </div>
  );
}
