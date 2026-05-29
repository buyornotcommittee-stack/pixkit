'use client';
import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';
import ToolGuide from '../../../components/ToolGuide';

export default function ImgToPdfPage() {
  const t = useTranslations();
  const [images, setImages] = useState([]);
  const [quality, setQuality] = useState(0.9);
  const [processing, setProcessing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const addImages = (fileList) => {
    const newItems = Array.from(fileList)
      .filter((f) => f.type.startsWith('image/'))
      .map((f) => ({
        id: Math.random().toString(36).slice(2),
        file: f,
        name: f.name,
        url: URL.createObjectURL(f),
      }));
    setImages((prev) => [...prev, ...newItems]);
  };

  const moveImage = (index, direction) => {
    setImages((prev) => {
      const arr = [...prev];
      const target = index + direction;
      if (target < 0 || target >= arr.length) return arr;
      [arr[index], arr[target]] = [arr[target], arr[index]];
      return arr;
    });
  };

  const removeImage = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setProcessing(true);

    const { jsPDF } = await import('jspdf');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageW = 210;
    const pageH = 297;
    const margin = 10;

    for (let i = 0; i < images.length; i++) {
      if (i > 0) pdf.addPage();

      const img = await new Promise((resolve) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.src = images[i].url;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', quality);

      const ratio = img.width / img.height;
      let w = pageW - margin * 2;
      let h = w / ratio;
      if (h > pageH - margin * 2) {
        h = pageH - margin * 2;
        w = h * ratio;
      }
      const x = (pageW - w) / 2;
      const y = (pageH - h) / 2;

      pdf.addImage(dataUrl, 'JPEG', x, y, w, h);
    }

    pdf.save('pixkit-images.pdf');
    setProcessing(false);
  };

  return (
    <ToolLayout title={t('imgToPdf.title')} description={t('imgToPdf.description')}>
      <div
        className={`dropzone mb-6 ${dragOver ? 'drag-over' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addImages(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p className="text-text-secondary text-sm">{t('imgToPdf.dropzone')}</p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => addImages(e.target.files)} />
      </div>

      {images.length > 0 && (
        <>
          <div className="card-glow rounded-xl p-6 mb-6">
            <div className="flex items-center gap-6 mb-4">
              <div className="flex-1 max-w-xs">
                <label className="text-xs text-text-muted mb-1 block">{t('common.quality')}: {Math.round(quality * 100)}%</label>
                <input type="range" min="0.1" max="1" step="0.05" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
              </div>
              <span className="text-text-muted text-sm">{images.length} {t('common.selected')}</span>
            </div>
            <button onClick={generatePDF} disabled={processing} className="btn-gold disabled:opacity-50">
              {processing ? t('imgToPdf.generating') : t('imgToPdf.downloadPdf')}
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <div key={img.id} className="card-glow rounded-xl p-3 relative group">
                <img src={img.url} alt={img.name} className="w-full h-32 object-contain rounded mb-2" />
                <p className="text-xs text-text-muted truncate">{i + 1}. {img.name}</p>
                <div className="flex gap-1 mt-2">
                  <button
                    onClick={() => moveImage(i, -1)}
                    disabled={i === 0}
                    className="text-xs px-2 py-1 rounded border border-card-border text-text-secondary hover:border-gold disabled:opacity-30"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                  </button>
                  <button
                    onClick={() => moveImage(i, 1)}
                    disabled={i === images.length - 1}
                    className="text-xs px-2 py-1 rounded border border-card-border text-text-secondary hover:border-gold disabled:opacity-30"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="text-xs px-2 py-1 rounded border border-card-border text-status-red hover:border-status-red ml-auto"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <ToolGuide tool="img-to-pdf" />
    </ToolLayout>
  );
}
