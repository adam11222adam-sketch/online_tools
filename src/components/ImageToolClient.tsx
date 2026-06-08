'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import UploadBox from './UploadBox';
import { downloadBlob } from '@/lib/download';
import type { Tool } from '@/lib/tools';

interface ImageToolClientProps {
  tool: Tool;
  apiRoute: string;
  options?: React.ReactNode;
  getFormData?: (files: File[]) => FormData;
}

export default function ImageToolClient({ tool, apiRoute, options, getFormData }: ImageToolClientProps) {
  const t = useTranslations('common');
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError(null);

    try {
      if (tool.slug === 'extract-images-from-pdf') {
        throw new Error('هذه الأداة ستعمل عند تفعيل Poppler على الخادم.');
      }

      const formData = getFormData ? getFormData(files) : new FormData();
      if (!getFormData) {
        files.forEach((f) => formData.append('file', f));
      }

      const res = await fetch(apiRoute, { method: 'POST', body: formData });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || 'Processing failed');
      }

      const blob = await res.blob();
      const disposition = res.headers.get('content-disposition');
      let filename = 'download';
      if (disposition && disposition.indexOf('filename=') !== -1) {
        filename = disposition.split('filename=')[1].replace(/"/g, '');
      } else {
        const ext = blob.type.split('/')[1] || 'bin';
        filename = `${tool.slug}-result.${ext}`;
      }

      downloadBlob(blob, filename);
      setDone(true);
    } catch (err: any) {
      setError(err.message || 'An error occurred during processing.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
      {!done ? (
        <>
          <UploadBox
            acceptedFormats={tool.acceptedFormats}
            maxFileSize={tool.maxFileSize}
            multiple={tool.slug.includes('merge') || tool.slug.includes('images-to')}
            onFilesSelected={(f) => setFiles((prev) => [...prev, ...f])}
          />

          {files.length > 0 && (
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between bg-surface rounded-lg px-4 py-2">
                    <span className="text-sm text-foreground truncate">{f.name}</span>
                    <button onClick={() => setFiles(files.filter((_, j) => j !== i))} className="text-danger text-sm hover:underline">
                      {t('delete')}
                    </button>
                  </div>
                ))}
              </div>

              {options && (
                <div className="p-4 bg-surface rounded-xl border border-border">
                  {options}
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-200">
                  {error}
                </div>
              )}

              <button
                onClick={handleProcess}
                disabled={processing || (tool.slug === 'extract-images-from-pdf' && true)}
                className="w-full btn-primary py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                {processing ? t('processing') : t('process')}
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
