'use client';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ToolGuide from '../../../components/ToolGuide';
import KakaoAd from '../../../components/KakaoAd';

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

const EXIF_LABELS = {
  Make: 'Camera Make',
  Model: 'Camera Model',
  LensModel: 'Lens',
  DateTimeOriginal: 'Date Taken',
  ExposureTime: 'Shutter Speed',
  FNumber: 'Aperture',
  ISO: 'ISO',
  FocalLength: 'Focal Length',
  GPSLatitude: 'GPS Latitude',
  GPSLongitude: 'GPS Longitude',
  GPSAltitude: 'GPS Altitude',
  ImageWidth: 'Width',
  ImageHeight: 'Height',
  Software: 'Software',
  Copyright: 'Copyright',
  Artist: 'Artist',
};

export default function RemoveExifPage() {
  const t = useTranslations();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [exifData, setExifData] = useState(null);
  const [cleaned, setCleaned] = useState(null);
  const [format, setFormat] = useState('jpg');
  const [quality, setQuality] = useState(90);
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef(null);

  const handleFile = async (f) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setCleaned(null);

    try {
      const exifr = (await import('exifr')).default;
      const data = await exifr.parse(f, { pick: Object.keys(EXIF_LABELS) });
      setExifData(data || {});
    } catch {
      setExifData({});
    }
  };

  const handleDrop = (e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); };
  const handleDragOver = (e) => e.preventDefault();

  const removeExif = async () => {
    if (!file) return;
    setProcessing(true);

    try {
      const img = new Image();
      img.src = preview;
      await new Promise((resolve) => { img.onload = resolve; });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const blob = await canvasToBlob(canvas, MIME[format], quality / 100);
      const url = URL.createObjectURL(blob);
      setCleaned({ url, blob, w: img.width, h: img.height });
    } catch {
      alert(t('common.errorRetry'));
    } finally {
      setProcessing(false);
    }
  };

  const download = () => {
    if (!cleaned) return;
    const ext = format;
    const name = file.name.replace(/\.[^.]+$/, '') + `-no-exif.${ext}`;
    const a = document.createElement('a');
    a.href = cleaned.url;
    a.download = name;
    a.click();
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setExifData(null);
    setCleaned(null);
  };

  const exifEntries = exifData ? Object.entries(exifData).filter(([k]) => EXIF_LABELS[k]) : [];
  const hasGps = exifData && (exifData.GPSLatitude || exifData.GPSLongitude);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold font-heading mb-2">{t('removeExif.title')}</h1>
      <p className="text-text-muted text-sm mb-6">{t('removeExif.description')}</p>

      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-card-border rounded-xl p-12 text-center cursor-pointer hover:border-gold/40 transition-colors"
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
          <p className="text-text-muted text-sm">{t('removeExif.dropzone')}</p>
          <p className="text-text-muted text-xs mt-1">{t('common.supported')}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Preview */}
            <div>
              <p className="text-xs text-text-muted mb-2">{t('common.original')}</p>
              <img src={preview} alt="preview" className="max-w-full max-h-[300px] rounded-lg border border-card-border" />
            </div>

            {/* EXIF Info */}
            <div>
              <p className="text-xs text-text-muted mb-2">{t('removeExif.exifInfo')}</p>
              {exifEntries.length > 0 ? (
                <div className="bg-bg-secondary rounded-lg border border-card-border p-4 space-y-1.5 max-h-[300px] overflow-y-auto">
                  {hasGps && (
                    <div className="flex items-center gap-2 mb-2 px-2 py-1.5 bg-red-500/10 border border-red-500/20 rounded-md">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400 shrink-0">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      <span className="text-xs text-red-400">{t('removeExif.gpsWarning')}</span>
                    </div>
                  )}
                  {exifEntries.map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-text-muted">{EXIF_LABELS[key] || key}</span>
                      <span className={`text-text-primary max-w-[60%] text-right truncate ${
                        key.startsWith('GPS') ? 'text-red-400' : ''
                      }`}>
                        {value instanceof Date ? value.toLocaleString() : String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-bg-secondary rounded-lg border border-card-border p-6 text-center">
                  <p className="text-text-muted text-sm">{t('removeExif.noExif')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div>
              <label className="block text-xs text-text-muted mb-1">{t('common.format')}</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="px-3 py-1.5 rounded-md bg-bg-primary border border-card-border text-sm text-text-primary"
              >
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">{t('common.quality')}: {quality}%</label>
              <input
                type="range"
                min="10"
                max="100"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-32 accent-gold"
              />
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <button
              onClick={removeExif}
              disabled={processing}
              className="btn-gold px-6 py-2 disabled:opacity-40"
            >
              {processing ? t('common.processing') : t('removeExif.remove')}
            </button>
            {cleaned && (
              <button onClick={download} className="btn-outline px-6 py-2">
                {t('common.download')}
              </button>
            )}
            <button onClick={reset} className="btn-outline px-6 py-2">
              {t('common.reset')}
            </button>
          </div>

          {/* Result */}
          {cleaned && (
            <div className="border border-card-border rounded-xl p-4">
              <p className="text-xs text-text-muted mb-2">
                {t('removeExif.cleaned')} · {cleaned.w}×{cleaned.h} · {(cleaned.blob.size / 1024).toFixed(0)}KB
              </p>
              <div className="bg-green-500/10 border border-green-500/20 rounded-md px-3 py-2 mb-3">
                <p className="text-xs text-green-400">{t('removeExif.removedInfo', { count: exifEntries.length })}</p>
              </div>
              <img src={cleaned.url} alt="cleaned" className="max-w-full max-h-[300px] rounded-lg mx-auto" />
            </div>
          )}
        </>
      )}
      <ToolGuide tool="remove-exif" />
      <KakaoAd unit="DAN-HuODIrdxUXc8lsdF" width="728" height="90" />
    </div>
  );
}
