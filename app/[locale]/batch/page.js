'use client';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';
import ToolGuide from '../../../components/ToolGuide';
import HowToUse from '../../../components/HowToUse';

export default function BatchPage() {
  const t = useTranslations();
  const [files, setFiles] = useState([]);
  const [width, setWidth] = useState('1280');
  const [height, setHeight] = useState('720');
  const [keepRatio, setKeepRatio] = useState(true);
  const [format, setFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.9);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList)
      .filter((f) => f.type.startsWith('image/'))
      .map((f) => ({
        id: Math.random().toString(36).slice(2),
        file: f,
        name: f.name,
        origSize: f.size,
        thumb: URL.createObjectURL(f),
        status: 'waiting',
        resultUrl: null,
        resultSize: null,
        origW: 0,
        origH: 0,
      }));
    newFiles.forEach((item) => {
      const img = new Image();
      img.onload = () => {
        setFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, origW: img.width, origH: img.height } : f))
        );
      };
      img.src = item.thumb;
    });
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const processAll = async () => {
    for (const item of files) {
      if (item.status === 'done') continue;
      setFiles((prev) => prev.map((f) => (f.id === item.id ? { ...f, status: 'processing' } : f)));

      await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = Number(width);
          let h = Number(height);
          if (keepRatio) {
            const ratio = img.width / img.height;
            if (w && !Number(height)) h = Math.round(w / ratio);
            else if (h && !Number(width)) w = Math.round(h * ratio);
            else if (w && h) h = Math.round(w / ratio);
          }
          canvas.width = w || img.width;
          canvas.height = h || img.height;
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(
            (blob) => {
              const url = URL.createObjectURL(blob);
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === item.id ? { ...f, status: 'done', resultUrl: url, resultSize: blob.size } : f
                )
              );
              resolve();
            },
            format,
            quality
          );
        };
        img.src = item.thumb;
      });
    }
  };

  const downloadOne = (item) => {
    if (!item.resultUrl) return;
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
    const a = document.createElement('a');
    a.href = item.resultUrl;
    a.download = item.name.replace(/\.[^.]+$/, `.${ext}`);
    a.click();
  };

  const downloadAll = () => {
    files.filter((f) => f.resultUrl).forEach((f) => downloadOne(f));
  };

  return (
    <ToolLayout title={t('batch.title')} description={t('batch.description')}>
      <div
        className={`dropzone mb-6 ${dragOver ? 'drag-over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="text-text-secondary text-sm">{t('batch.dropzone')}</p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addFiles(e.target.files)} />
      </div>

      {files.length > 0 && (
        <>
          <div className="card-glow rounded-xl p-6 mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('common.width')}</label>
                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} className="input-underline" />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('common.height')}</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="input-underline" />
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
            <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer mb-4">
              <input type="checkbox" checked={keepRatio} onChange={(e) => setKeepRatio(e.target.checked)} className="accent-gold" />
              {t('common.lockRatio')}
            </label>
            <div className="flex gap-3">
              <button onClick={processAll} className="btn-gold">{t('batch.resizeAll')}</button>
              <button onClick={downloadAll} className="btn-outline">{t('batch.downloadAll')}</button>
            </div>
          </div>

          <div className="card-glow rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-card-border text-text-muted text-xs">
                    <th className="text-left p-3">{t('batch.preview')}</th>
                    <th className="text-left p-3">{t('batch.filename')}</th>
                    <th className="text-left p-3">{t('batch.origSize')}</th>
                    <th className="text-left p-3">{t('batch.origWeight')}</th>
                    <th className="text-left p-3">{t('batch.resultWeight')}</th>
                    <th className="text-left p-3">{t('batch.status')}</th>
                    <th className="text-left p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((f) => (
                    <tr key={f.id} className="border-b border-card-border">
                      <td className="p-3">
                        <img src={f.thumb} alt={`${f.name} preview`} className="w-10 h-10 object-cover rounded" />
                      </td>
                      <td className="p-3 text-text-secondary truncate max-w-[150px]">{f.name}</td>
                      <td className="p-3 text-text-muted font-mono text-xs">{f.origW}×{f.origH}</td>
                      <td className="p-3 text-text-muted font-mono text-xs">{formatSize(f.origSize)}</td>
                      <td className="p-3 font-mono text-xs">
                        {f.resultSize ? (
                          <span>
                            {formatSize(f.resultSize)}
                            {f.resultSize < f.origSize && (
                              <span className="text-status-green ml-1">-{Math.round((1 - f.resultSize / f.origSize) * 100)}%</span>
                            )}
                          </span>
                        ) : '—'}
                      </td>
                      <td className="p-3">
                        {f.status === 'waiting' && <span className="text-text-muted text-xs">{t('common.waiting')}</span>}
                        {f.status === 'processing' && <span className="text-gold pulse-gold text-xs">{t('common.processingStatus')}</span>}
                        {f.status === 'done' && <span className="text-status-green text-xs">{t('common.done')}</span>}
                      </td>
                      <td className="p-3">
                        {f.resultUrl && (
                          <button onClick={() => downloadOne(f)} className="text-gold text-xs hover:underline">{t('common.save')}</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
      <HowToUse tool="batch" />
      <ToolGuide tool="batch" />
    </ToolLayout>
  );
}
