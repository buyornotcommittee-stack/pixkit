'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';
import ToolGuide from '../../../components/ToolGuide';

export default function WatermarkPage() {
  const t = useTranslations();

  const positions = [
    { label: t('watermark.posTopLeft'), value: 'top-left' },
    { label: t('watermark.posTopCenter'), value: 'top-center' },
    { label: t('watermark.posTopRight'), value: 'top-right' },
    { label: t('watermark.posBottomLeft'), value: 'bottom-left' },
    { label: t('watermark.posBottomCenter'), value: 'bottom-center' },
    { label: t('watermark.posBottomRight'), value: 'bottom-right' },
    { label: t('watermark.posCenter'), value: 'center' },
    { label: t('watermark.posTile'), value: 'tile' },
  ];

  const [image, setImage] = useState(null);
  const [mode, setMode] = useState('text');
  const [text, setText] = useState('Pixkit');
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(0.35);
  const [position, setPosition] = useState('bottom-right');
  const [color, setColor] = useState('#ffffff');
  const [rotation, setRotation] = useState(0);
  const [logoImg, setLogoImg] = useState(null);
  const [logoScale, setLogoScale] = useState(0.2);
  const [format, setFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.9);
  const [preview, setPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const logoInputRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage({ url, element: img });
      setPreview(null);
    };
    img.src = url;
  }, []);

  const handleLogo = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => setLogoImg({ url, element: img });
    img.src = url;
  }, []);

  const renderWatermark = useCallback(() => {
    if (!image) return;
    const canvas = document.createElement('canvas');
    const { element: img } = image;
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    ctx.globalAlpha = opacity;

    if (mode === 'text' && text) {
      ctx.font = `bold ${fontSize}px 'Sora', sans-serif`;
      ctx.fillStyle = color;
      const metrics = ctx.measureText(text);
      const textW = metrics.width;
      const textH = fontSize;

      if (position === 'tile') {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        const spacingX = textW + 80;
        const spacingY = textH + 80;
        for (let y = -canvas.height; y < canvas.height * 2; y += spacingY) {
          for (let x = -canvas.width; x < canvas.width * 2; x += spacingX) {
            ctx.fillText(text, x, y);
          }
        }
        ctx.restore();
      } else {
        const padding = Math.max(20, img.width * 0.03);
        let x, y;
        switch (position) {
          case 'top-left': x = padding; y = padding + textH; break;
          case 'top-center': x = (canvas.width - textW) / 2; y = padding + textH; break;
          case 'top-right': x = canvas.width - textW - padding; y = padding + textH; break;
          case 'bottom-left': x = padding; y = canvas.height - padding; break;
          case 'bottom-center': x = (canvas.width - textW) / 2; y = canvas.height - padding; break;
          case 'bottom-right': x = canvas.width - textW - padding; y = canvas.height - padding; break;
          case 'center': x = (canvas.width - textW) / 2; y = (canvas.height + textH) / 2; break;
          default: x = canvas.width - textW - padding; y = canvas.height - padding;
        }
        if (rotation !== 0) {
          ctx.save();
          ctx.translate(x + textW / 2, y - textH / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.fillText(text, -textW / 2, textH / 2);
          ctx.restore();
        } else {
          ctx.fillText(text, x, y);
        }
      }
    } else if (mode === 'image' && logoImg) {
      const lw = img.width * logoScale;
      const lh = (logoImg.element.height / logoImg.element.width) * lw;
      const padding = Math.max(20, img.width * 0.03);

      if (position === 'tile') {
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.translate(-canvas.width / 2, -canvas.height / 2);
        const spacingX = lw + 60;
        const spacingY = lh + 60;
        for (let y = -canvas.height; y < canvas.height * 2; y += spacingY) {
          for (let x = -canvas.width; x < canvas.width * 2; x += spacingX) {
            ctx.drawImage(logoImg.element, x, y, lw, lh);
          }
        }
        ctx.restore();
      } else {
        let x, y;
        switch (position) {
          case 'top-left': x = padding; y = padding; break;
          case 'top-center': x = (canvas.width - lw) / 2; y = padding; break;
          case 'top-right': x = canvas.width - lw - padding; y = padding; break;
          case 'bottom-left': x = padding; y = canvas.height - lh - padding; break;
          case 'bottom-center': x = (canvas.width - lw) / 2; y = canvas.height - lh - padding; break;
          case 'bottom-right': x = canvas.width - lw - padding; y = canvas.height - lh - padding; break;
          case 'center': x = (canvas.width - lw) / 2; y = (canvas.height - lh) / 2; break;
          default: x = canvas.width - lw - padding; y = canvas.height - lh - padding;
        }
        if (rotation !== 0) {
          ctx.save();
          ctx.translate(x + lw / 2, y + lh / 2);
          ctx.rotate((rotation * Math.PI) / 180);
          ctx.drawImage(logoImg.element, -lw / 2, -lh / 2, lw, lh);
          ctx.restore();
        } else {
          ctx.drawImage(logoImg.element, x, y, lw, lh);
        }
      }
    }

    ctx.globalAlpha = 1;
    setPreview(canvas.toDataURL(format, quality));
  }, [image, mode, text, fontSize, opacity, position, color, rotation, logoImg, logoScale, format, quality]);

  useEffect(() => {
    if (image) renderWatermark();
  }, [image, renderWatermark]);

  const download = () => {
    if (!preview) return;
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
    const a = document.createElement('a');
    a.href = preview;
    a.download = `pixkit-watermarked.${ext}`;
    a.click();
  };

  return (
    <ToolLayout title={t('watermark.title')} description={t('watermark.description')}>
      {!image && (
        <div
          className={`dropzone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
        >
          <svg className="mx-auto mb-3 text-text-muted" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p className="text-text-secondary text-sm mb-1">{t('watermark.dropzone')}</p>
          <p className="text-text-muted text-xs">{t('common.supported')}</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}

      {image && (
        <div className="space-y-6">
          <div className="card-glow rounded-xl p-6">
            <div className="flex gap-1 mb-5">
              <button
                onClick={() => setMode('text')}
                className={`text-sm px-4 py-2 rounded-md border transition-colors ${mode === 'text' ? 'border-gold text-gold bg-gold-dim' : 'border-card-border text-text-muted hover:text-text-secondary'}`}
              >
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" />
                  </svg>
                  {t('watermark.text')}
                </span>
              </button>
              <button
                onClick={() => setMode('image')}
                className={`text-sm px-4 py-2 rounded-md border transition-colors ${mode === 'image' ? 'border-gold text-gold bg-gold-dim' : 'border-card-border text-text-muted hover:text-text-secondary'}`}
              >
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                  </svg>
                  {t('watermark.logo')}
                </span>
              </button>
            </div>

            {mode === 'text' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs text-text-muted mb-1 block">{t('watermark.watermarkText')}</label>
                  <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="input-underline" placeholder={t('watermark.watermarkText')} />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">{t('watermark.fontSize')}: {fontSize}px</label>
                  <input type="range" min="12" max="120" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full mt-2" />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">{t('watermark.color')}</label>
                  <div className="flex gap-2 mt-1">
                    {['#ffffff', '#000000', '#f59e0b', '#ef4444', '#22c55e'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-7 h-7 rounded-md border-2 transition-colors ${color === c ? 'border-gold' : 'border-card-border'}`}
                        style={{ background: c }}
                      />
                    ))}
                    <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-7 h-7 rounded-md cursor-pointer border-0 p-0" />
                  </div>
                </div>
              </div>
            )}

            {mode === 'image' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-text-muted mb-1 block">{t('watermark.logo')}</label>
                  {logoImg ? (
                    <div className="flex items-center gap-3 mt-1">
                      <img src={logoImg.url} alt="logo" className="w-10 h-10 object-contain rounded border border-card-border" />
                      <button onClick={() => logoInputRef.current?.click()} className="text-xs text-gold hover:underline">{t('watermark.logoChange')}</button>
                    </div>
                  ) : (
                    <button onClick={() => logoInputRef.current?.click()} className="btn-outline text-xs mt-1">{t('watermark.logoUpload')}</button>
                  )}
                  <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleLogo(e.target.files[0])} />
                </div>
                <div>
                  <label className="text-xs text-text-muted mb-1 block">{t('watermark.logoSize')}: {Math.round(logoScale * 100)}%</label>
                  <input type="range" min="0.05" max="0.5" step="0.01" value={logoScale} onChange={(e) => setLogoScale(Number(e.target.value))} className="w-full mt-2" />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('watermark.opacity')}: {Math.round(opacity * 100)}%</label>
                <input type="range" min="0.05" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full mt-2" />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('watermark.rotation')}: {rotation}°</label>
                <input type="range" min="-45" max="45" value={rotation} onChange={(e) => setRotation(Number(e.target.value))} className="w-full mt-2" />
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('watermark.position')}</label>
                <select value={position} onChange={(e) => setPosition(e.target.value)} className="input-underline cursor-pointer">
                  {positions.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-text-muted mb-1 block">{t('common.format')}</label>
                <select value={format} onChange={(e) => setFormat(e.target.value)} className="input-underline cursor-pointer">
                  <option value="image/jpeg">JPG</option>
                  <option value="image/png">PNG</option>
                  <option value="image/webp">WebP</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs text-text-muted mb-2 block">{t('watermark.posSelect')}</label>
              <div className="inline-grid grid-cols-3 gap-1 border border-card-border rounded-lg p-1">
                {['top-left','top-center','top-right','center','center','center','bottom-left','bottom-center','bottom-right'].map((pos, i) => {
                  const actualPos = i === 3 || i === 4 || i === 5 ? (i === 4 ? 'center' : i === 3 ? 'tile' : 'center') : pos;
                  const label = i === 3 ? t('watermark.posTile').split(' ')[0] : i === 4 ? t('watermark.posCenter') : '';
                  if (i === 5) return <div key={i} className="w-8 h-8" />;
                  return (
                    <button
                      key={i}
                      onClick={() => setPosition(actualPos)}
                      className={`w-8 h-8 rounded text-[8px] flex items-center justify-center transition-colors ${
                        position === actualPos ? 'bg-gold text-bg-deep font-bold' : 'bg-card-bg text-text-muted hover:bg-gold-dim'
                      }`}
                      title={positions.find(p => p.value === actualPos)?.label}
                    >
                      {label || (position === actualPos ? '●' : '○')}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={download} disabled={!preview} className="btn-gold disabled:opacity-50">{t('common.download')}</button>
              <button onClick={() => { setImage(null); setPreview(null); setLogoImg(null); }} className="btn-outline">{t('common.reset')}</button>
            </div>
          </div>

          {preview && (
            <div className="card-glow rounded-xl p-4 text-center">
              <p className="text-xs text-text-muted mb-2">{t('watermark.preview')}</p>
              <img src={preview} alt={t('watermark.preview')} className="max-w-full max-h-[400px] object-contain mx-auto rounded" />
            </div>
          )}
        </div>
      )}
      <ToolGuide tool="watermark" />
    </ToolLayout>
  );
}
