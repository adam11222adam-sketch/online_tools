'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ReactCrop, { Crop, PixelCrop, centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import UploadBox from './UploadBox';
import { downloadBlob } from '@/lib/download';
import type { Tool } from '@/lib/tools';

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number) {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}

export default function CropImageClient({ tool }: { tool: Tool }) {
  const t = useTranslations('common');
  const [file, setFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState('');
  
  const imgRef = useRef<HTMLImageElement>(null);
  
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  
  // Transformations
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (file) {
      setCrop(undefined); // Reset crop when file changes
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result?.toString() || ''));
      reader.readAsDataURL(file);
    }
  }, [file]);

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    if (aspect) {
      setCrop(centerAspectCrop(width, height, aspect));
    } else {
      // Default free crop centered 80%
      setCrop(centerCrop(
        makeAspectCrop({ unit: '%', width: 80, height: 80 }, width / height, width, height),
        width, height
      ));
    }
  }

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspect(newAspect);
    if (newAspect && imgRef.current) {
      const { width, height } = imgRef.current;
      setCrop(centerAspectCrop(width, height, newAspect));
    }
  };

  const resetTransforms = () => {
    setScale(1);
    setRotate(0);
    setFlipH(false);
    setFlipV(false);
  };

  const handleDownload = async () => {
    if (!completedCrop || !imgRef.current) return;
    
    setProcessing(true);
    try {
      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('No 2d context');

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const pixelRatio = window.devicePixelRatio;

      canvas.width = Math.floor(completedCrop.width * scaleX * pixelRatio);
      canvas.height = Math.floor(completedCrop.height * scaleY * pixelRatio);

      ctx.scale(pixelRatio, pixelRatio);
      ctx.imageSmoothingQuality = 'high';

      const cropX = completedCrop.x * scaleX;
      const cropY = completedCrop.y * scaleY;

      const centerX = image.naturalWidth / 2;
      const centerY = image.naturalHeight / 2;

      ctx.save();

      // Move to center of canvas
      ctx.translate(-cropX, -cropY);
      ctx.translate(centerX, centerY);
      
      // Apply transforms
      ctx.scale(scale, scale);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
      
      ctx.translate(-centerX, -centerY);

      ctx.drawImage(
        image,
        0, 0, image.naturalWidth, image.naturalHeight,
        0, 0, image.naturalWidth, image.naturalHeight
      );
      
      ctx.restore();

      const blob = await new Promise<Blob | null>(resolve => {
        const ext = file?.type === 'image/png' ? 'png' : file?.type === 'image/webp' ? 'webp' : 'jpeg';
        canvas.toBlob(resolve, `image/${ext}`, 0.95);
      });

      if (blob) {
        const ext = file?.type === 'image/png' ? 'png' : file?.type === 'image/webp' ? 'webp' : 'jpg';
        downloadBlob(blob, `cropped.${ext}`);
      }
    } catch (e) {
      console.error(e);
      alert('Error cropping image');
    } finally {
      setProcessing(false);
    }
  };

  // Handle manual input changes
  const handleManualInput = (key: keyof PixelCrop, value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    
    setCrop(prev => {
      const c = prev as PixelCrop || { unit: 'px', x: 0, y: 0, width: 100, height: 100 };
      return { ...c, [key]: num };
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      {!file ? (
        <UploadBox
          acceptedFormats={tool.acceptedFormats}
          maxFileSize={tool.maxFileSize}
          multiple={false}
          onFilesSelected={(f) => setFile(f[0])}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-surface rounded-lg px-4 py-2">
            <span className="text-sm text-foreground truncate">{file.name}</span>
            <button onClick={() => { setFile(null); setImgSrc(''); }} className="text-danger text-sm hover:underline">
              {t('delete')}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Toolbar */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Aspect Ratio */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Aspect Ratio</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => handleAspectChange(undefined)} className={`py-1.5 px-3 text-sm rounded-lg border transition-colors ${aspect === undefined ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-foreground hover:border-primary'}`}>Free</button>
                  <button onClick={() => handleAspectChange(1)} className={`py-1.5 px-3 text-sm rounded-lg border transition-colors ${aspect === 1 ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-foreground hover:border-primary'}`}>1:1</button>
                  <button onClick={() => handleAspectChange(4/3)} className={`py-1.5 px-3 text-sm rounded-lg border transition-colors ${aspect === 4/3 ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-foreground hover:border-primary'}`}>4:3</button>
                  <button onClick={() => handleAspectChange(16/9)} className={`py-1.5 px-3 text-sm rounded-lg border transition-colors ${aspect === 16/9 ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-foreground hover:border-primary'}`}>16:9</button>
                  <button onClick={() => handleAspectChange(9/16)} className={`py-1.5 px-3 text-sm rounded-lg border transition-colors ${aspect === 9/16 ? 'bg-primary text-white border-primary' : 'bg-surface border-border text-foreground hover:border-primary'}`}>9:16</button>
                </div>
              </div>

              {/* Transforms */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Transform</label>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setRotate(r => r - 90)} className="py-1.5 px-3 text-sm rounded-lg bg-surface border border-border hover:border-primary transition-colors flex items-center justify-center gap-1">
                    ↺ -90°
                  </button>
                  <button onClick={() => setRotate(r => r + 90)} className="py-1.5 px-3 text-sm rounded-lg bg-surface border border-border hover:border-primary transition-colors flex items-center justify-center gap-1">
                    ↻ +90°
                  </button>
                  <button onClick={() => setFlipH(!flipH)} className={`py-1.5 px-3 text-sm rounded-lg border transition-colors ${flipH ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border hover:border-primary'}`}>
                    Flip H
                  </button>
                  <button onClick={() => setFlipV(!flipV)} className={`py-1.5 px-3 text-sm rounded-lg border transition-colors ${flipV ? 'bg-primary/10 border-primary text-primary' : 'bg-surface border-border hover:border-primary'}`}>
                    Flip V
                  </button>
                </div>
                <button onClick={resetTransforms} className="mt-2 w-full py-1.5 text-sm text-muted hover:text-foreground">
                  {t('reset')}
                </button>
              </div>

              {/* Manual Inputs */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Manual Edit (px)</label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs text-muted">X</span>
                    <input type="number" value={Math.round(completedCrop?.x || 0)} onChange={e => handleManualInput('x', e.target.value)} className="w-full px-2 py-1 text-sm rounded border border-border bg-surface" />
                  </div>
                  <div>
                    <span className="text-xs text-muted">Y</span>
                    <input type="number" value={Math.round(completedCrop?.y || 0)} onChange={e => handleManualInput('y', e.target.value)} className="w-full px-2 py-1 text-sm rounded border border-border bg-surface" />
                  </div>
                  <div>
                    <span className="text-xs text-muted">Width</span>
                    <input type="number" value={Math.round(completedCrop?.width || 0)} onChange={e => handleManualInput('width', e.target.value)} className="w-full px-2 py-1 text-sm rounded border border-border bg-surface" />
                  </div>
                  <div>
                    <span className="text-xs text-muted">Height</span>
                    <input type="number" value={Math.round(completedCrop?.height || 0)} onChange={e => handleManualInput('height', e.target.value)} className="w-full px-2 py-1 text-sm rounded border border-border bg-surface" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                disabled={!completedCrop?.width || !completedCrop?.height || processing}
                className="w-full btn-primary py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {processing ? t('processing') : t('download')}
              </button>

            </div>

            {/* Cropper View */}
            <div className="lg:col-span-3 bg-surface border border-border rounded-xl p-4 flex items-center justify-center min-h-[400px] overflow-auto">
              {!!imgSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspect}
                  className="max-h-[60vh]"
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    style={{ transform: `scale(${scale}) rotate(${rotate}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})` }}
                    onLoad={onImageLoad}
                    className="max-w-full max-h-[60vh] object-contain"
                  />
                </ReactCrop>
              )}
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
