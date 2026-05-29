'use client';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';
import ToolGuide from '../../../components/ToolGuide';
import HowToUse from '../../../components/HowToUse';

export default function ConvertPage() {
  const t = useTranslations();
  const [files, setFiles] = useState([]);
  const [format, setFormat] = useState('auto');
  const [quality, setQuality] = useState(0.9);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  const getTargetFormat = (fileType) => {
    if (format !== 'auto') return format;
    if (fileType === 'image/png') return 'image/jpeg';
    if (fileType === 'image/jpeg') return 'image/png';
    return 'image/jpeg';
  };

  const getExt = (mimeType) => {
    if (mimeType === 'image/png') return 'png';
    if (mimeType === 'image/webp') return 'webp';
    return 'jpg';
  };

  const getAutoLabel = (fileType) => {
    if (fileType === 'image/png') return 'PNG → JPG';
    if (fileType === 'image/jpeg') return 'JPG → PNG';
    return '→ JPG';
  };

  const getFormatLabel = (fileType) => {
    if (format === 'auto') return getAutoLabel(fileType);
    return format.replace('image/', '').toUpperCase().replace('JPEG', 'JPG');
  };

  const addFiles = async (fileList) => {
    const validFiles = Array.from(fileList).filter(
      (f) =>
        f.type.startsWith('image/') ||
        f.name.toLowerCase().endsWith('.heic') ||
        f.name.toLowerCase().endsWith('.heif')
    );

    const items = await Promise.all(
      validFiles.map(async (f) => {
        const isHeic =
          f.name.toLowerCase().endsWith('.heic') ||
          f.name.toLowerCase().endsWith('.heif') ||
          f.type === 'image/heic' ||
          f.type === 'image/heif';

        let processedFile = f;
        let fileType = f.type || 'image/jpeg';

        if (isHeic) {
          try {
            const heic2any = (await import('heic2any')).default;
            const blob = await heic2any({ blob: f, toType: 'image/png', quality: 1 });
            processedFile = Array.isArray(blob) ? blob[0] : blob;
            fileType = 'image/png';
          } catch (err) {
            console.error('HEIC conversion failed:', err);
            return null;
          }
        }

        return {
          id: Math.random().toString(36).slice(2),
          file: processedFile,
          name: f.name,
          type: fileType,
          origSize: f.size,
          thumb: URL.createObjectURL(processedFile),
          status: 'waiting',
          resultUrl: null,
          resultSize: null,
          targetFormat: null,
          origW: 0,
          origH: 0,
        };
      })
    );

    const validItems = items.filter(Boolean);
    validItems.forEach((item) => {
      const img = new Image();
      img.onload = () => {
        setFiles((prev) =>
          prev.map((f) => (f.id === item.id ? { ...f, origW: img.width, origH: img.height } : f))
        );
      };
      img.src = item.thumb;
    });
    setFiles((prev) => [...prev, ...validItems]);
  };

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
    setFiles((prev) =>
      prev.map((f) => ({ ...f, status: 'waiting', resultUrl: null, resultSize: null, targetFormat: null }))
    );
  };

  const processAll = async () => {
    for (const item of files) {
      if (item.status === 'done') continue;
      setFiles((prev) => prev.map((f) => (f.id === item.id ? { ...f, status: 'processing' } : f)));

      const targetFormat = getTargetFormat(item.type);
      await new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          canvas.getContext('2d').drawImage(img, 0, 0);
          canvas.toBlob(
            (blob) => {
              const url = URL.createObjectURL(blob);
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === item.id
                    ? { ...f, status: 'done', resultUrl: url, resultSize: blob.size, targetFormat }
                    : f
                )
              );
              resolve();
            },
            targetFormat,
            quality
          );
        };
        img.src = item.thumb;
      });
    }
  };

  const downloadOne = (item) => {
    if (!item.resultUrl) return;
    const ext = getExt(item.targetFormat);
    const a = document.createElement('a');
    a.href = item.resultUrl;
    a.download = item.name.replace(/\.[^.]+$/, `.${ext}`);
    a.click();
  };

  const downloadAll = () => {
    files.filter((f) => f.resultUrl).forEach((f) => downloadOne(f));
  };

  return (
    <ToolLayout title={t('convert.title')} description={t('convert.description')}>
      <div
        className={`dropzone mb-6 ${dragOver ? 'drag-over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
          <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
        </svg>
        <p className="text-text-secondary text-sm">{t('convert.dropzone')}</p>
        <p className="text-text-muted text-xs mt-1">{t('convert.supportedFormats')}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,.heic,.heif"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <>
          <div className="card-glow rounded-xl p-6 mb-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('convert.targetFormat')}</label>
                <select
                  value={format}
                  onChange={(e) => handleFormatChange(e.target.value)}
                  className="input-underline cursor-pointer w-40"
                >
                  <option value="auto">Auto (PNG↔JPG)</option>
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>
              <div className="flex-1 max-w-xs">
                <label className="text-xs text-text-muted mb-1 block">
                  {t('common.quality')}: {Math.round(quality * 100)}%
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={processAll} className="btn-gold">{t('convert.convert')}</button>
              <button onClick={downloadAll} className="btn-outline">{t('batch.downloadAll')}</button>
              <button onClick={() => setFiles([])} className="btn-outline">{t('common.newFile')}</button>
            </div>
          </div>

          <div className="card-glow rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-card-border text-text-muted text-xs">
                    <th className="text-left p-3">{t('batch.preview')}</th>
                    <th className="text-left p-3">{t('batch.filename')}</th>
                    <th className="text-left p-3">{t('convert.targetFormat')}</th>
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
                        <img src={f.thumb} alt={f.name} className="w-10 h-10 object-cover rounded" />
                      </td>
                      <td className="p-3 text-text-secondary truncate max-w-[150px]">{f.name}</td>
                      <td className="p-3 text-text-muted text-xs font-mono">{getFormatLabel(f.type)}</td>
                      <td className="p-3 text-text-muted font-mono text-xs">{formatSize(f.origSize)}</td>
                      <td className="p-3 font-mono text-xs">
                        {f.resultSize ? (
                          <span>
                            {formatSize(f.resultSize)}
                            {f.resultSize < f.origSize && (
                              <span className="text-status-green ml-1">
                                -{Math.round((1 - f.resultSize / f.origSize) * 100)}%
                              </span>
                            )}
                            {f.resultSize > f.origSize && (
                              <span className="text-status-red ml-1">
                                +{Math.round((f.resultSize / f.origSize - 1) * 100)}%
                              </span>
                            )}
                          </span>
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="p-3">
                        {f.status === 'waiting' && (
                          <span className="text-text-muted text-xs">{t('common.waiting')}</span>
                        )}
                        {f.status === 'processing' && (
                          <span className="text-gold pulse-gold text-xs">{t('common.processingStatus')}</span>
                        )}
                        {f.status === 'done' && (
                          <span className="text-status-green text-xs">{t('common.done')}</span>
                        )}
                      </td>
                      <td className="p-3">
                        {f.resultUrl && (
                          <button
                            onClick={() => downloadOne(f)}
                            className="text-gold text-xs hover:underline"
                          >
                            {t('common.save')}
                          </button>
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

      <HowToUse tool="convert" />
      <ToolGuide tool="convert" />
    </ToolLayout>
  );
}
