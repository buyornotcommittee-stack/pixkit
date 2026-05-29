'use client';
import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';
import ToolGuide from '../../../components/ToolGuide';
import HowToUse from '../../../components/HowToUse';

const presets = [
  { label: 'HD', w: 1280, h: 720 },
  { label: 'FHD', w: 1920, h: 1080 },
  { label: '2K', w: 2560, h: 1440 },
  { label: 'Instagram', w: 1080, h: 1080 },
  { label: 'Profile', w: 400, h: 400 },
  { label: 'Thumbnail', w: 1280, h: 720 },
  { label: 'Card', w: 1050, h: 600 },
  { label: 'Story', w: 1080, h: 1920 },
  { label: 'Pinterest', w: 1000, h: 1500 },
];

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

export default function ResizePage() {
  const t = useTranslations();
  const [image, setImage] = useState(null);
  const [origInfo, setOrigInfo] = useState(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [keepRatio, setKeepRatio] = useState(true);
  const [format, setFormat] = useState('image/jpeg');
  const [scale, setScale] = useState(100);
  const [quality, setQuality] = useState(0.9);
  const [result, setResult] = useState(null);
  const [resultInfo, setResultInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const ratioRef = useRef(1);
  const cancelRef = useRef(false);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage({ url, element: img, file });
      setOrigInfo({ w: img.width, h: img.height, size: file.size });
      setWidth(String(img.width));
      setHeight(String(img.height));
      ratioRef.current = img.width / img.height;
      setResult(null);
      setResultInfo(null);
      setError(null);
    };
    img.onerror = () => {
      setError(t('common.errorRetry'));
    };
    img.src = url;
  }, [t]);

  const onDrop = (e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); };

  const changeWidth = (v) => {
    setWidth(v);
    if (keepRatio && v) setHeight(String(Math.round(Number(v) / ratioRef.current)));
    if (origInfo && v) setScale(Math.round((Number(v) / origInfo.w) * 100));
  };
  const changeHeight = (v) => {
    setHeight(v);
    if (keepRatio && v) setWidth(String(Math.round(Number(v) * ratioRef.current)));
    if (origInfo && v) setScale(Math.round((Number(v) / origInfo.h) * 100));
  };

  const changeScale = (v) => {
    const s = Number(v);
    setScale(s);
    if (origInfo) {
      setWidth(String(Math.round(origInfo.w * s / 100)));
      setHeight(String(Math.round(origInfo.h * s / 100)));
    }
  };

  const applyPreset = (p) => {
    setWidth(String(p.w));
    setHeight(String(p.h));
    if (origInfo) setScale(Math.round((p.w / origInfo.w) * 100));
  };

  const process = async () => {
    if (!image || processing) return;
    setProcessing(true);
    setError(null);
    cancelRef.current = false;

    try {
      const canvas = document.createElement('canvas');
      const w = Number(width) || image.element.width;
      const h = Number(height) || image.element.height;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image.element, 0, 0, w, h);

      if (cancelRef.current) return;

      const blob = await canvasToBlob(canvas, format, quality);

      if (cancelRef.current) return;

      const url = URL.createObjectURL(blob);
      setResult(url);
      setResultInfo({ w, h, size: blob.size });
    } catch {
      setError(t('common.errorRetry'));
    } finally {
      setProcessing(false);
    }
  };

  const cancelProcess = () => {
    cancelRef.current = true;
    setProcessing(false);
  };

  const download = () => {
    if (!result) return;
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
    const a = document.createElement('a');
    a.href = result;
    a.download = `pixkit-resized.${ext}`;
    a.click();
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  return (
    <ToolLayout title={t('resize.title')} description={t('resize.description')}>
      {!image && (
        <div
          className={`dropzone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className="text-text-secondary text-sm mb-1">{t('common.dropzone')}</p>
          <p className="text-text-muted text-xs">{t('common.supported')}</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}

      {image && (
        <div className="space-y-6">
          <div className="card-glow rounded-xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('common.width')}</label>
                <input type="number" value={width} onChange={(e) => changeWidth(e.target.value)} className="input-underline" />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('common.height')}</label>
                <input type="number" value={height} onChange={(e) => changeHeight(e.target.value)} className="input-underline" />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('common.format')}</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)} className="input-underline cursor-pointer">
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('common.quality')}: {Math.round(quality * 100)}%</label>
                <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full mt-2" />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                <input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} className="accent-gold" />
                {t('common.lockRatio')}
              </label>
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <label className="text-xs text-text-muted whitespace-nowrap">{scale}%</label>
                <input type="range" min="1" max="200" value={scale} onChange={(e) => changeScale(e.target.value)} className="flex-1" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {presets.map((p) => {
                const isSquare = p.w === p.h;
                return isSquare ? (
                  <button key={p.label} onClick={() => applyPreset(p)} className="text-xs px-3 py-1.5 rounded-md border border-card-border text-text-secondary hover:border-gold hover:text-gold transition-colors">
                    {p.label} ({p.w}×{p.h})
                  </button>
                ) : (
                  <span key={p.label} className="inline-flex rounded-md border border-card-border overflow-hidden">
                    <button onClick={() => applyPreset({ ...p, w: Math.max(p.w, p.h), h: Math.min(p.w, p.h) })} className="text-xs px-2.5 py-1.5 text-text-secondary hover:bg-gold-dim hover:text-gold transition-colors flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="6" width="20" height="12" rx="2" /></svg>
                      {p.label} ({Math.max(p.w, p.h)}×{Math.min(p.w, p.h)})
                    </button>
                    <span className="w-px bg-card-border" />
                    <button onClick={() => applyPreset({ ...p, w: Math.min(p.w, p.h), h: Math.max(p.w, p.h) })} className="text-xs px-2.5 py-1.5 text-text-secondary hover:bg-gold-dim hover:text-gold transition-colors flex items-center gap-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="6" y="2" width="12" height="20" rx="2" /></svg>
                      {Math.min(p.w, p.h)}×{Math.max(p.w, p.h)}
                    </button>
                  </span>
                );
              })}
            </div>

            <div className="flex gap-3">
              {processing ? (
                <button onClick={cancelProcess} className="btn-outline">{t('common.cancel')}</button>
              ) : (
                <>
                  <button onClick={process} className="btn-gold">{t('resize.resize')}</button>
                  <button onClick={() => { setImage(null); setResult(null); setResultInfo(null); setError(null); }} className="btn-outline">{t('common.reset')}</button>
                </>
              )}
            </div>
          </div>

          {processing && (
            <div className="text-center py-8">
              <div className="inline-block w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-text-secondary text-sm">{t('common.processing')}</p>
            </div>
          )}

          {error && (
            <div className="card-glow rounded-xl p-4 border border-red-500/30 bg-red-500/5 text-center">
              <p className="text-red-400 text-sm">{error}</p>
              <button onClick={process} className="text-xs text-gold hover:underline mt-2">{t('common.retry')}</button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card-glow rounded-xl p-4">
              <p className="text-xs text-text-muted mb-2">{t('common.original')}</p>
              <img src={image.url} alt={t('common.original')} className="max-w-full max-h-[300px] object-contain mx-auto rounded" />
              <p className="text-xs text-text-muted mt-2 text-center font-mono">
                {origInfo.w} × {origInfo.h} · {formatSize(origInfo.size)}
              </p>
            </div>
            {result && resultInfo && (
              <div className="card-glow rounded-xl p-4">
                <p className="text-xs text-text-muted mb-2">{t('common.result')}</p>
                <img src={result} alt={t('common.result')} className="max-w-full max-h-[300px] object-contain mx-auto rounded" />
                <p className="text-xs text-text-muted mt-2 text-center font-mono">
                  {resultInfo.w} × {resultInfo.h} · {formatSize(resultInfo.size)}
                  {resultInfo.size < origInfo.size && (
                    <span className="text-status-green ml-2">
                      -{Math.round((1 - resultInfo.size / origInfo.size) * 100)}%
                    </span>
                  )}
                </p>
                <button onClick={download} className="btn-gold w-full mt-3">{t('common.download')}</button>
              </div>
            )}
          </div>
        </div>
      )}
      <HowToUse tool="resize" />
      <ToolGuide tool="resize" />
    </ToolLayout>
  );
}
