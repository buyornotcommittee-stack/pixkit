'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob(
        (blob) => {
          if (blob) { resolve(blob); return; }
          const dataUrl = canvas.toDataURL(type, quality);
          const [, base64] = dataUrl.split(',');
          const bin = atob(base64);
          const arr = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
          resolve(new Blob([arr], { type }));
        },
        type,
        quality
      );
    } catch {
      try {
        const dataUrl = canvas.toDataURL(type, quality);
        const [, base64] = dataUrl.split(',');
        const bin = atob(base64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
        resolve(new Blob([arr], { type }));
      } catch (e2) {
        reject(e2);
      }
    }
  });
}

const MIME = { jpg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };

export default function MergePage() {
  const t = useTranslations();
  const [images, setImages] = useState([]);
  const [direction, setDirection] = useState('horizontal');
  const [gap, setGap] = useState(0);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [format, setFormat] = useState('jpg');
  const [quality, setQuality] = useState(90);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef(null);
  const previewRef = useRef(null);

  const loadImage = (file) =>
    new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ img, name: file.name, w: img.width, h: img.height });
      img.src = URL.createObjectURL(file);
    });

  const handleFiles = async (files) => {
    const accepted = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!accepted.length) return;
    const loaded = await Promise.all(accepted.map(loadImage));
    setImages((prev) => [...prev, ...loaded]);
    setResult(null);
  };

  const handleDrop = (e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); };
  const handleDragOver = (e) => e.preventDefault();

  const move = (idx, dir) => {
    setImages((prev) => {
      const arr = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= arr.length) return arr;
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return arr;
    });
    setResult(null);
  };

  const removeImage = (idx) => {
    setImages((prev) => prev.filter((_, i) => i !== idx));
    setResult(null);
  };

  const merge = useCallback(async () => {
    if (images.length < 2) return;
    setProcessing(true);
    setResult(null);

    try {
      await new Promise((r) => setTimeout(r, 50));
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const g = gap;

      if (direction === 'horizontal') {
        const maxH = Math.max(...images.map((i) => i.h));
        const totalW = images.reduce((sum, i) => sum + Math.round((i.w / i.h) * maxH), 0) + g * (images.length - 1);
        canvas.width = totalW;
        canvas.height = maxH;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, totalW, maxH);
        let x = 0;
        for (const item of images) {
          const w = Math.round((item.w / item.h) * maxH);
          ctx.drawImage(item.img, x, 0, w, maxH);
          x += w + g;
        }
      } else if (direction === 'vertical') {
        const maxW = Math.max(...images.map((i) => i.w));
        const totalH = images.reduce((sum, i) => sum + Math.round((i.h / i.w) * maxW), 0) + g * (images.length - 1);
        canvas.width = maxW;
        canvas.height = totalH;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, maxW, totalH);
        let y = 0;
        for (const item of images) {
          const h = Math.round((item.h / item.w) * maxW);
          ctx.drawImage(item.img, 0, y, maxW, h);
          y += h + g;
        }
      } else {
        // grid
        const cols = direction === 'grid2' ? 2 : 3;
        const rows = Math.ceil(images.length / cols);
        const cellW = Math.max(...images.map((i) => i.w));
        const cellH = Math.max(...images.map((i) => i.h));
        const totalW = cellW * cols + g * (cols - 1);
        const totalH = cellH * rows + g * (rows - 1);
        canvas.width = totalW;
        canvas.height = totalH;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, totalW, totalH);

        images.forEach((item, idx) => {
          const col = idx % cols;
          const row = Math.floor(idx / cols);
          const x = col * (cellW + g);
          const y = row * (cellH + g);
          // fit image inside cell keeping aspect ratio
          const scale = Math.min(cellW / item.w, cellH / item.h);
          const dw = Math.round(item.w * scale);
          const dh = Math.round(item.h * scale);
          const dx = x + Math.round((cellW - dw) / 2);
          const dy = y + Math.round((cellH - dh) / 2);
          ctx.drawImage(item.img, dx, dy, dw, dh);
        });
      }

      const blob = await canvasToBlob(canvas, MIME[format], quality / 100);
      const url = URL.createObjectURL(blob);
      setResult({ url, blob, w: canvas.width, h: canvas.height });
    } catch {
      alert(t('common.errorRetry'));
    } finally {
      setProcessing(false);
    }
  }, [images, direction, gap, bgColor, format, quality, t]);

  // auto preview
  useEffect(() => {
    if (images.length >= 2) merge();
  }, [images, direction, gap, bgColor]);

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = `pixkit-merged.${format}`;
    a.click();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold font-heading mb-2">{t('merge.title')}</h1>
      <p className="text-text-muted text-sm mb-6">{t('merge.description')}</p>

      {/* Dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-card-border rounded-xl p-8 text-center cursor-pointer hover:border-gold/40 transition-colors mb-6"
      >
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-text-muted text-sm">{t('merge.dropzone')}</p>
        <p className="text-text-muted text-xs mt-1">{t('common.supported')}</p>
      </div>

      {images.length > 0 && (
        <>
          {/* Image list */}
          <div className="flex flex-wrap gap-3 mb-6">
            {images.map((item, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={item.img.src}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border border-card-border"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                  <button onClick={() => move(idx, -1)} className="text-white text-xs p-1" title={t('merge.moveLeft')}>←</button>
                  <button onClick={() => move(idx, 1)} className="text-white text-xs p-1" title={t('merge.moveRight')}>→</button>
                  <button onClick={() => removeImage(idx)} className="text-red-400 text-xs p-1">✕</button>
                </div>
                <span className="absolute bottom-0.5 left-0.5 bg-black/60 text-white text-[10px] px-1 rounded">{idx + 1}</span>
              </div>
            ))}
            <button
              onClick={() => fileRef.current?.click()}
              className="w-20 h-20 border-2 border-dashed border-card-border rounded-lg flex items-center justify-center text-text-muted hover:border-gold/40 transition-colors text-2xl"
            >
              +
            </button>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Direction */}
            <div>
              <label className="block text-xs text-text-muted mb-1">{t('merge.direction')}</label>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { val: 'horizontal', label: t('merge.horizontal') },
                  { val: 'vertical', label: t('merge.vertical') },
                  { val: 'grid2', label: t('merge.grid2') },
                  { val: 'grid3', label: t('merge.grid3') },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setDirection(opt.val)}
                    className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                      direction === opt.val
                        ? 'border-gold bg-gold-dim text-gold'
                        : 'border-card-border text-text-secondary hover:border-gold/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gap */}
            <div>
              <label className="block text-xs text-text-muted mb-1">{t('merge.gap')}: {gap}px</label>
              <input
                type="range"
                min="0"
                max="20"
                value={gap}
                onChange={(e) => setGap(Number(e.target.value))}
                className="w-full accent-gold"
              />
            </div>

            {/* Background color */}
            <div>
              <label className="block text-xs text-text-muted mb-1">{t('merge.bgColor')}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-8 h-8 rounded border border-card-border cursor-pointer"
                />
                <span className="text-xs text-text-secondary">{bgColor}</span>
              </div>
            </div>

            {/* Format */}
            <div>
              <label className="block text-xs text-text-muted mb-1">{t('common.format')}</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-3 py-1.5 rounded-md bg-bg-primary border border-card-border text-sm text-text-primary"
              >
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>

            {/* Quality */}
            <div>
              <label className="block text-xs text-text-muted mb-1">{t('common.quality')}: {quality}%</label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full accent-gold"
              />
            </div>
          </div>

          {/* Merge button */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={merge}
              disabled={images.length < 2 || processing}
              className="btn-gold px-6 py-2 disabled:opacity-40"
            >
              {processing ? t('common.processing') : t('merge.merge')}
            </button>
            {result && (
              <button onClick={download} className="btn-outline px-6 py-2">
                {t('common.download')}
              </button>
            )}
          </div>

          {/* Result preview */}
          {result && (
            <div className="border border-card-border rounded-xl p-4">
              <p className="text-xs text-text-muted mb-2">
                {t('common.result')}: {result.w}×{result.h} · {(result.blob.size / 1024).toFixed(0)}KB
              </p>
              <img
                ref={previewRef}
                src={result.url}
                alt="merged result"
                className="max-w-full max-h-[500px] rounded-lg mx-auto"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
