'use client';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';

const PDFJS_VERSION = '4.4.168';
const PDFJS_CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`;
const TIMEOUT_MS = 30000;

function loadPdfJs() {
  return new Promise((resolve, reject) => {
    if (window.pdfjsLib) {
      resolve(window.pdfjsLib);
      return;
    }

    const script = document.createElement('script');
    script.src = `${PDFJS_CDN}/pdf.min.mjs`;
    script.type = 'module';

    const fallbackScript = document.createElement('script');
    fallbackScript.src = `${PDFJS_CDN}/pdf.min.js`;

    const onLoad = () => {
      const lib = window.pdfjsLib;
      if (lib) {
        lib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN}/pdf.worker.min.mjs`;
        resolve(lib);
      } else {
        reject(new Error('pdfjsLib not found'));
      }
    };

    script.onload = onLoad;
    script.onerror = () => {
      fallbackScript.onload = onLoad;
      fallbackScript.onerror = () => reject(new Error('Failed to load PDF.js'));
      document.head.appendChild(fallbackScript);
    };
    document.head.appendChild(script);
  });
}

function canvasToBlob(canvas, format, quality) {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            const dataUrl = canvas.toDataURL(format, quality);
            const arr = dataUrl.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            const u8arr = new Uint8Array(bstr.length);
            for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
            resolve(new Blob([u8arr], { type: mime }));
          }
        },
        format,
        quality
      );
    } catch {
      try {
        const dataUrl = canvas.toDataURL(format, quality);
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        const u8arr = new Uint8Array(bstr.length);
        for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i);
        resolve(new Blob([u8arr], { type: mime }));
      } catch (e) {
        reject(e);
      }
    }
  });
}

export default function PdfToImgPage() {
  const t = useTranslations();
  const [pages, setPages] = useState([]);
  const [format, setFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.9);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const cancelRef = useRef(false);

  const handleFile = async (file) => {
    if (!file || file.type !== 'application/pdf') return;
    setLoading(true);
    setPages([]);
    setError(null);
    cancelRef.current = false;

    try {
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('timeout')), TIMEOUT_MS)
      );

      const pdfjsLib = await Promise.race([loadPdfJs(), timeoutPromise]);

      if (cancelRef.current) return;

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      if (cancelRef.current) return;

      const results = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        if (cancelRef.current) return;

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext('2d');
        await page.render({ canvasContext: ctx, viewport }).promise;
        results.push({
          id: i,
          dataUrl: canvas.toDataURL('image/png'),
          width: viewport.width,
          height: viewport.height,
        });
      }

      if (!cancelRef.current) {
        setPages(results);
      }
    } catch (err) {
      if (!cancelRef.current) {
        if (err.message === 'timeout') {
          setError(t('common.timeout'));
        } else {
          setError(t('common.errorRetry'));
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelLoading = () => {
    cancelRef.current = true;
    setLoading(false);
  };

  const downloadPage = async (page) => {
    try {
      const canvas = document.createElement('canvas');
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = page.dataUrl;
      });
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);

      const blob = await canvasToBlob(canvas, format, quality);
      const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `pixkit-page-${page.id}.${ext}`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      setError(t('common.errorRetry'));
    }
  };

  const downloadAll = () => {
    pages.forEach((p) => downloadPage(p));
  };

  return (
    <ToolLayout title={t('pdfToImg.title')} description={t('pdfToImg.description')}>
      {!pages.length && !loading && !error && (
        <div
          className={`dropzone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
        >
          <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
          </svg>
          <p className="text-text-secondary text-sm">{t('pdfToImg.dropzone')}</p>
          <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-text-secondary text-sm mb-3">{t('pdfToImg.analyzing')}</p>
          <button onClick={cancelLoading} className="btn-outline text-sm">{t('common.cancel')}</button>
        </div>
      )}

      {error && !loading && (
        <div className="card-glow rounded-xl p-6 border border-red-500/30 bg-red-500/5 text-center">
          <p className="text-red-400 text-sm mb-3">{error}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setError(null); inputRef.current?.click(); }} className="btn-gold text-sm">{t('common.retry')}</button>
            <button onClick={() => { setError(null); }} className="btn-outline text-sm">{t('common.reset')}</button>
          </div>
          <input ref={inputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}

      {pages.length > 0 && (
        <>
          <div className="card-glow rounded-xl p-6 mb-6">
            <div className="flex flex-wrap items-center gap-6 mb-4">
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('common.format')}</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)} className="input-underline cursor-pointer w-32">
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>
              <div className="flex-1 max-w-xs">
                <label className="text-xs text-text-muted mb-1 block">{t('common.quality')}: {Math.round(quality * 100)}%</label>
                <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
              </div>
              <span className="text-text-muted text-sm">{pages.length} {t('common.pages')}</span>
            </div>
            <div className="flex gap-3">
              <button onClick={downloadAll} className="btn-gold">{t('pdfToImg.downloadAll')}</button>
              <button onClick={() => { setPages([]); }} className="btn-outline">{t('common.newPdf')}</button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {pages.map((page) => (
              <div key={page.id} className="card-glow rounded-xl p-3">
                <img src={page.dataUrl} alt={`${t('pdfToImg.page')} ${page.id}`} className="w-full h-40 object-contain rounded mb-2 bg-white" />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">{t('pdfToImg.page')} {page.id}</span>
                  <button onClick={() => downloadPage(page)} className="text-xs text-gold hover:underline">{t('common.save')}</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </ToolLayout>
  );
}
