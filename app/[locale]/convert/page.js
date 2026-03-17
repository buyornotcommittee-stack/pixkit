'use client';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';

export default function ConvertPage() {
  const t = useTranslations();
  const [image, setImage] = useState(null);
  const [origInfo, setOrigInfo] = useState(null);
  const [format, setFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.9);
  const [result, setResult] = useState(null);
  const [resultSize, setResultSize] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  const handleFile = async (file) => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setResultSize(null);

    let processedFile = file;

    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif') || file.type === 'image/heic' || file.type === 'image/heif';
    if (isHeic) {
      try {
        const heic2any = (await import('heic2any')).default;
        const blob = await heic2any({ blob: file, toType: 'image/png', quality: 1 });
        processedFile = Array.isArray(blob) ? blob[0] : blob;
      } catch (err) {
        console.error('HEIC conversion failed:', err);
        setLoading(false);
        return;
      }
    }

    const url = URL.createObjectURL(processedFile);
    const img = new Image();
    img.onload = () => {
      setImage({ url, element: img, file: processedFile, originalFile: file });
      setOrigInfo({ name: file.name, size: file.size, type: file.type || 'image/heic' });
      setLoading(false);
    };
    img.onerror = () => setLoading(false);
    img.src = url;
  };

  const convert = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    canvas.width = image.element.width;
    canvas.height = image.element.height;
    canvas.getContext('2d').drawImage(image.element, 0, 0);
    canvas.toBlob(
      (blob) => {
        setResult(URL.createObjectURL(blob));
        setResultSize(blob.size);
      },
      format,
      quality
    );
  };

  const download = () => {
    if (!result) return;
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : format === 'image/gif' ? 'gif' : format === 'image/bmp' ? 'bmp' : 'jpg';
    const a = document.createElement('a');
    a.href = result;
    a.download = `pixkit-converted.${ext}`;
    a.click();
  };

  return (
    <ToolLayout title={t('convert.title')} description={t('convert.description')}>
      {!image && !loading && (
        <div
          className={`dropzone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
        >
          <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
          </svg>
          <p className="text-text-secondary text-sm">{t('convert.dropzone')}</p>
          <p className="text-text-muted text-xs mt-1">{t('convert.supportedFormats')}</p>
          <input ref={inputRef} type="file" accept="image/*,.heic,.heif" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-text-secondary text-sm">{t('convert.converting')}</p>
        </div>
      )}

      {image && (
        <div className="space-y-6">
          <div className="card-glow rounded-xl p-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('convert.targetFormat')}</label>
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
            </div>
            <div className="flex gap-3">
              <button onClick={convert} className="btn-gold">{t('convert.convert')}</button>
              <button onClick={() => { setImage(null); setResult(null); setResultSize(null); }} className="btn-outline">{t('common.newFile')}</button>
            </div>
          </div>

          <div className="card-glow rounded-xl p-6">
            <img src={image.url} alt={t('rotate.preview')} className="max-w-full max-h-[300px] object-contain mx-auto rounded mb-4" />
            <div className="text-center">
              <p className="text-sm text-text-secondary">
                <span className="font-mono">{origInfo.name}</span> · {formatSize(origInfo.size)}
              </p>
              {resultSize !== null && (
                <p className="text-sm mt-1">
                  <span className="text-text-muted">{t('common.after')}:</span>{' '}
                  <span className="font-mono">{formatSize(resultSize)}</span>
                  {resultSize < origInfo.size && (
                    <span className="text-status-green ml-2">-{Math.round((1 - resultSize / origInfo.size) * 100)}%</span>
                  )}
                  {resultSize > origInfo.size && (
                    <span className="text-status-red ml-2">+{Math.round((resultSize / origInfo.size - 1) * 100)}%</span>
                  )}
                </p>
              )}
            </div>
            {result && (
              <button onClick={download} className="btn-gold w-full mt-4">{t('common.download')}</button>
            )}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
