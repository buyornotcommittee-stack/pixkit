'use client';
import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';
import ToolGuide from '../../../components/ToolGuide';
import HowToUse from '../../../components/HowToUse';

export default function UpscalePage() {
  const t = useTranslations();
  const [image, setImage] = useState(null);
  const [origInfo, setOrigInfo] = useState(null);
  const [scale, setScale] = useState(2);
  const [result, setResult] = useState(null);
  const [resultInfo, setResultInfo] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');
  const [modelReady, setModelReady] = useState(false);
  const [error, setError] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);
  const tfRef = useRef(null);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage({ url, element: img, file });
      setOrigInfo({ w: img.width, h: img.height, size: file.size });
      setResult(null);
      setResultInfo(null);
      setError(null);
    };
    img.src = url;
  }, []);

  const process = async () => {
    if (!image || processing) return;
    setProcessing(true);
    setError(null);
    setProgress(0);

    try {
      if (!tfRef.current) {
        setProgressMsg(t('upscale.modelLoading'));
        setProgress(5);
        const tf = await import('@tensorflow/tfjs');
        await tf.ready();
        tfRef.current = tf;
        setModelReady(true);
      }

      const tf = tfRef.current;
      const img = image.element;
      const newW = img.width * scale;
      const newH = img.height * scale;

      setProgressMsg(t('upscale.processing'));
      setProgress(20);
      await new Promise((r) => setTimeout(r, 50));

      // Step 1: Convert image to tensor
      const tensor = tf.browser.fromPixels(img);
      const normalized = tf.div(tf.cast(tensor, 'float32'), 255.0);
      tensor.dispose();
      setProgress(35);
      await new Promise((r) => setTimeout(r, 30));

      // Step 2: Upscale with bilinear interpolation
      const batched = normalized.expandDims(0);
      normalized.dispose();
      const upscaled = tf.image.resizeBilinear(batched, [newH, newW], true);
      batched.dispose();
      setProgress(60);
      await new Promise((r) => setTimeout(r, 30));

      // Step 3: Unsharp masking for AI-like sharpening
      const halfH = Math.max(1, Math.round(newH / 2));
      const halfW = Math.max(1, Math.round(newW / 2));
      const half = tf.image.resizeBilinear(upscaled, [halfH, halfW]);
      const blurred = tf.image.resizeBilinear(half, [newH, newW]);
      half.dispose();
      const detail = tf.sub(upscaled, blurred);
      blurred.dispose();
      const strength = scale >= 4 ? 0.45 : 0.3;
      const strengthTensor = tf.scalar(strength);
      const sharpened = tf.add(upscaled, tf.mul(detail, strengthTensor));
      upscaled.dispose();
      detail.dispose();
      strengthTensor.dispose();
      const clamped = tf.clipByValue(sharpened, 0, 1);
      sharpened.dispose();
      const squeezed = clamped.squeeze();
      clamped.dispose();
      setProgress(80);
      await new Promise((r) => setTimeout(r, 30));

      // Step 4: Draw to canvas
      const outCanvas = document.createElement('canvas');
      outCanvas.width = newW;
      outCanvas.height = newH;
      await tf.browser.toPixels(squeezed, outCanvas);
      squeezed.dispose();
      setProgress(93);

      // Step 5: Export as JPEG blob
      const blob = await new Promise((res) => outCanvas.toBlob(res, 'image/jpeg', 0.95));
      const url = URL.createObjectURL(blob);
      setResult(url);
      setResultInfo({ w: newW, h: newH, size: blob.size });
      setProgress(100);
      setProgressMsg('');
    } catch (err) {
      console.error(err);
      setError(t('common.errorRetry'));
    } finally {
      setProcessing(false);
    }
  };

  const download = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result;
    a.download = `pixkit-upscaled-${scale}x.jpg`;
    a.click();
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  };

  const outputTooLarge =
    image && scale === 4 && (image.element.width * 4 > 6000 || image.element.height * 4 > 6000);

  return (
    <ToolLayout title={t('upscale.title')} description={t('upscale.description')}>
      {!image && (
        <div
          className={`dropzone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
        >
          <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
          </svg>
          <p className="text-text-secondary text-sm mb-1">{t('common.dropzone')}</p>
          <p className="text-text-muted text-xs">{t('common.supported')}</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      )}

      {image && (
        <div className="space-y-6">
          <div className="card-glow rounded-xl p-6">
            <div className="mb-5">
              <label className="text-xs text-text-muted mb-2 block">{t('upscale.scale')}</label>
              <div className="flex gap-3 flex-wrap">
                {[2, 4].map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={`flex flex-col items-start px-5 py-3 rounded-lg border text-sm font-medium transition-colors ${
                      scale === s
                        ? 'border-gold text-gold bg-gold-dim'
                        : 'border-card-border text-text-secondary hover:border-gold'
                    }`}
                  >
                    <span className="text-lg font-bold">{s}×</span>
                    <span className="text-xs opacity-70 font-mono mt-0.5">
                      {image.element.width * s} × {image.element.height * s}px
                    </span>
                  </button>
                ))}
              </div>
              {outputTooLarge && (
                <p className="text-xs text-yellow-500/80 mt-2">{t('upscale.sizeWarning')}</p>
              )}
              {!modelReady && (
                <p className="text-xs text-text-muted mt-2">{t('upscale.hint')}</p>
              )}
            </div>

            <div className="flex gap-3">
              <button onClick={process} disabled={processing} className="btn-gold disabled:opacity-50">
                {processing ? t('common.processing') : t('upscale.upscale')}
              </button>
              <button
                onClick={() => { setImage(null); setResult(null); setResultInfo(null); setError(null); }}
                className="btn-outline"
              >
                {t('common.reset')}
              </button>
            </div>
          </div>

          {processing && (
            <div className="card-glow rounded-xl p-6">
              <p className="text-text-secondary text-sm mb-3">{progressMsg}</p>
              <div className="w-full bg-card-border rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gold h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-text-muted mt-2 text-right">{progress}%</p>
            </div>
          )}

          {error && (
            <div className="card-glow rounded-xl p-4 border border-red-500/30 bg-red-500/5 text-center">
              <p className="text-red-400 text-sm">{error}</p>
              <button onClick={process} className="text-xs text-gold hover:underline mt-2">
                {t('common.retry')}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card-glow rounded-xl p-4">
              <p className="text-xs text-text-muted mb-2">{t('common.original')}</p>
              <img
                src={image.url}
                alt={t('common.original')}
                className="max-w-full max-h-[320px] object-contain mx-auto rounded"
              />
              <p className="text-xs text-text-muted mt-2 text-center font-mono">
                {origInfo.w} × {origInfo.h} · {formatSize(origInfo.size)}
              </p>
            </div>
            {result && resultInfo && (
              <div className="card-glow rounded-xl p-4">
                <p className="text-xs text-text-muted mb-2">{t('common.result')}</p>
                <img
                  src={result}
                  alt={t('common.result')}
                  className="max-w-full max-h-[320px] object-contain mx-auto rounded"
                />
                <p className="text-xs text-text-muted mt-2 text-center font-mono">
                  {resultInfo.w} × {resultInfo.h} · {formatSize(resultInfo.size)}
                  <span className="text-gold ml-2">{scale}×</span>
                </p>
                <button onClick={download} className="btn-gold w-full mt-3">
                  {t('common.download')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <HowToUse tool="upscale" />
      <ToolGuide tool="upscale" />
    </ToolLayout>
  );
}
