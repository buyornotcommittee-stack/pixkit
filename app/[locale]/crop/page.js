'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';

export default function CropPage() {
  const t = useTranslations();

  const ratios = [
    { label: t('crop.free'), value: null },
    { label: '1:1', value: 1 },
    { label: '4:3', value: 4 / 3 },
    { label: '16:9', value: 16 / 9 },
    { label: '3:4', value: 3 / 4 },
    { label: '9:16', value: 9 / 16 },
  ];

  const [image, setImage] = useState(null);
  const [format, setFormat] = useState('image/jpeg');
  const [quality, setQuality] = useState(0.9);
  const [ratio, setRatio] = useState(null);
  const [crop, setCrop] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const [result, setResult] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage({ url, element: img });
      setCrop(null);
      setResult(null);
    };
    img.src = url;
  };

  const getPos = (e) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.max(0, Math.min(clientX - rect.left, rect.width)),
      y: Math.max(0, Math.min(clientY - rect.top, rect.height)),
    };
  };

  const onStart = useCallback((e) => {
    e.preventDefault();
    const pos = getPos(e);
    setStartPos(pos);
    setDragging(true);
    setCrop({ x: pos.x, y: pos.y, w: 0, h: 0 });
  }, []);

  const onMove = useCallback((e) => {
    if (!dragging || !startPos) return;
    e.preventDefault();
    const pos = getPos(e);
    let w = pos.x - startPos.x;
    let h = pos.y - startPos.y;

    if (ratio) {
      h = Math.abs(w) / ratio * Math.sign(h || 1);
    }

    setCrop({
      x: w >= 0 ? startPos.x : startPos.x + w,
      y: h >= 0 ? startPos.y : startPos.y + h,
      w: Math.abs(w),
      h: Math.abs(h),
    });
  }, [dragging, startPos, ratio]);

  const onEnd = useCallback(() => {
    setDragging(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onEnd);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
  }, [onMove, onEnd]);

  const applyCrop = () => {
    if (!crop || !image || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const scaleX = image.element.width / rect.width;
    const scaleY = image.element.height / rect.height;

    const sx = crop.x * scaleX;
    const sy = crop.y * scaleY;
    const sw = crop.w * scaleX;
    const sh = crop.h * scaleY;

    const canvas = document.createElement('canvas');
    canvas.width = sw;
    canvas.height = sh;
    canvas.getContext('2d').drawImage(image.element, sx, sy, sw, sh, 0, 0, sw, sh);

    canvas.toBlob(
      (blob) => {
        setResult(URL.createObjectURL(blob));
      },
      format,
      quality
    );
  };

  const download = () => {
    if (!result) return;
    const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
    const a = document.createElement('a');
    a.href = result;
    a.download = `pixkit-cropped.${ext}`;
    a.click();
  };

  return (
    <ToolLayout title={t('crop.title')} description={t('crop.description')}>
      {!image && (
        <div
          className={`dropzone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
        >
          <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2v14a2 2 0 0 0 2 2h14" /><path d="M18 22V8a2 2 0 0 0-2-2H2" />
          </svg>
          <p className="text-text-secondary text-sm">{t('common.dropzone')}</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}

      {image && (
        <div className="space-y-6">
          <div className="card-glow rounded-xl p-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex gap-2">
                {ratios.map((r) => (
                  <button
                    key={r.label}
                    onClick={() => { setRatio(r.value); setCrop(null); }}
                    className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                      ratio === r.value ? 'border-gold text-gold bg-gold-dim' : 'border-card-border text-text-secondary hover:border-gold'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
              <select value={format} onChange={(e) => setFormat(e.target.value)} className="input-underline w-24 cursor-pointer">
                <option value="image/jpeg">JPG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={applyCrop} disabled={!crop || crop.w < 5} className="btn-gold disabled:opacity-50">{t('crop.apply')}</button>
              <button onClick={() => { setImage(null); setCrop(null); setResult(null); }} className="btn-outline">{t('common.reset')}</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card-glow rounded-xl p-4">
              <p className="text-xs text-text-muted mb-2">{t('crop.dragHint')}</p>
              <div
                ref={containerRef}
                className="relative inline-block select-none"
                onMouseDown={onStart}
                onTouchStart={onStart}
              >
                <img ref={imgRef} src={image.url} alt="crop" className="max-w-full max-h-[400px] rounded" draggable={false} />
                {crop && crop.w > 0 && (
                  <>
                    <div className="absolute inset-0 bg-black/50 rounded" style={{ clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%, 0 ${crop.y}px, ${crop.x}px ${crop.y}px, ${crop.x}px ${crop.y + crop.h}px, ${crop.x + crop.w}px ${crop.y + crop.h}px, ${crop.x + crop.w}px ${crop.y}px, 0 ${crop.y}px)` }} />
                    <div
                      className="absolute border-2 border-gold"
                      style={{ left: crop.x, top: crop.y, width: crop.w, height: crop.h }}
                    />
                  </>
                )}
              </div>
            </div>

            {result && (
              <div className="card-glow rounded-xl p-4">
                <p className="text-xs text-text-muted mb-2">{t('common.result')}</p>
                <img src={result} alt={t('common.result')} className="max-w-full max-h-[400px] rounded" />
                <button onClick={download} className="btn-gold w-full mt-3">{t('common.download')}</button>
              </div>
            )}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
