'use client';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';
import ToolGuide from '../../../components/ToolGuide';

export default function RotatePage() {
  const t = useTranslations();
  const [image, setImage] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [format, setFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.9);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage({ url, element: img });
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setPreview(null);
    };
    img.src = url;
  };

  useEffect(() => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const { element: img } = image;

    const rad = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));
    canvas.width = Math.round(img.width * cos + img.height * sin);
    canvas.height = Math.round(img.width * sin + img.height * cos);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    setPreview(canvas.toDataURL(format, quality));
  }, [image, rotation, flipH, flipV, format, quality]);

  const download = () => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const { element: img } = image;

    const rad = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(rad));
    const cos = Math.abs(Math.cos(rad));
    canvas.width = Math.round(img.width * cos + img.height * sin);
    canvas.height = Math.round(img.width * sin + img.height * cos);

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(rad);
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);

    canvas.toBlob(
      (blob) => {
        const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `pixkit-rotated.${ext}`;
        a.click();
      },
      format,
      quality
    );
  };

  return (
    <ToolLayout title={t('rotate.title')} description={t('rotate.description')}>
      {!image && (
        <div
          className={`dropzone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
        >
          <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          <p className="text-text-secondary text-sm">{t('common.dropzone')}</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}

      {image && (
        <div className="space-y-6">
          <div className="card-glow rounded-xl p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <button onClick={() => setRotation((r) => (r - 90) % 360)} className="btn-outline text-sm px-4 py-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
                {t('rotate.left90')}
              </button>
              <button onClick={() => setRotation((r) => (r + 90) % 360)} className="btn-outline text-sm px-4 py-2 flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ transform: 'scaleX(-1)' }}><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" /></svg>
                {t('rotate.right90')}
              </button>
              <button onClick={() => setRotation((r) => (r + 180) % 360)} className="btn-outline text-sm px-4 py-2">{t('rotate.rotate180')}</button>
              <button onClick={() => setFlipH((v) => !v)} className={`text-sm px-4 py-2 rounded-md border transition-colors ${flipH ? 'border-gold text-gold bg-gold-dim' : 'border-gold/50 text-gold'}`}>
                {t('rotate.flipH')}
              </button>
              <button onClick={() => setFlipV((v) => !v)} className={`text-sm px-4 py-2 rounded-md border transition-colors ${flipV ? 'border-gold text-gold bg-gold-dim' : 'border-gold/50 text-gold'}`}>
                {t('rotate.flipV')}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4">
              <select value={format} onChange={(e) => setFormat(e.target.value)} className="input-underline w-24 cursor-pointer">
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
              <div className="flex-1 max-w-xs">
                <label className="text-xs text-text-muted block">{t('common.quality')}: {Math.round(quality * 100)}%</label>
                <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
              </div>
              <span className="text-text-muted text-xs font-mono">{rotation}° {flipH ? `| ${t('rotate.flipH')}` : ''} {flipV ? `| ${t('rotate.flipV')}` : ''}</span>
            </div>

            <div className="flex gap-3">
              <button onClick={download} className="btn-gold">{t('common.download')}</button>
              <button onClick={() => { setImage(null); setPreview(null); }} className="btn-outline">{t('common.reset')}</button>
            </div>
          </div>

          {preview && (
            <div className="card-glow rounded-xl p-4 text-center">
              <p className="text-xs text-text-muted mb-2">{t('rotate.preview')}</p>
              <img src={preview} alt={t('rotate.preview')} className="max-w-full max-h-[400px] object-contain mx-auto rounded" />
            </div>
          )}
        </div>
      )}
      <ToolGuide tool="rotate" />
    </ToolLayout>
  );
}
