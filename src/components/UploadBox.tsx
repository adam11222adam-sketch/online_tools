'use client';

import { useTranslations } from 'next-intl';
import { useCallback, useState, useRef } from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';

interface UploadBoxProps {
  acceptedFormats?: string[];
  maxFileSize?: string;
  multiple?: boolean;
  onFilesSelected: (files: File[]) => void;
}

export default function UploadBox({
  acceptedFormats = [],
  maxFileSize = '50MB',
  multiple = false,
  onFilesSelected,
}: UploadBoxProps) {
  const t = useTranslations('common');
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const files = Array.from(e.dataTransfer.files);
      if (files.length) onFilesSelected(files);
    },
    [onFilesSelected]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length) onFilesSelected(files);
    },
    [onFilesSelected]
  );

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative group rounded-3xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
        isDragging 
          ? 'border-primary bg-primary-50/40 dark:bg-primary-950/20 scale-[1.01] shadow-lg shadow-primary/5' 
          : 'border-border/80 hover:border-primary/50 bg-card hover:bg-surface/50 dark:hover:bg-slate-900/40'
      }`}
      id="upload-box"
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptedFormats.join(',')}
        multiple={multiple}
        onChange={handleChange}
        className="hidden"
        id="file-input"
      />

      {/* Dynamic Upload Ring Icon */}
      <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center border transition-all duration-300 ${
        isDragging 
          ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-110' 
          : 'bg-surface dark:bg-slate-900/60 text-primary border-border group-hover:scale-105 group-hover:border-primary/30 group-hover:shadow-sm'
      }`}>
        <UploadCloud className="w-8 h-8" />
      </div>

      <p className="text-xl font-bold text-foreground mb-2">
        {t('dragDrop') || 'Drag & drop files here'}
      </p>
      
      <p className="text-sm text-muted mb-6">
        {t('or') || 'or'}{' '}
        <span className="text-primary font-semibold hover:underline group-hover:text-primary-hover">
          {t('browse') || 'browse your computer'}
        </span>
      </p>

      {/* Formats and Size Badge details */}
      <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-muted-light max-w-md mx-auto">
        {acceptedFormats.length > 0 && (
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface dark:bg-slate-900/60 border border-border/50 uppercase">
            <File className="w-3.5 h-3.5" />
            <span>{acceptedFormats.join(', ')}</span>
          </span>
        )}
        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface dark:bg-slate-900/60 border border-border/50">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{t('maxSize') || 'Max size'}: {maxFileSize}</span>
        </span>
      </div>
    </div>
  );
}

