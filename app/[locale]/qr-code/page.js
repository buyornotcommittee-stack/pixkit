'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import QRCode from 'qrcode';
import ToolGuide from '../../../components/ToolGuide';
import KakaoAd from '../../../components/KakaoAd';

export default function QrCodePage() {
  const t = useTranslations();
  const [text, setText] = useState('');
  const [size, setSize] = useState(400);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [margin, setMargin] = useState(2);
  const [logoSrc, setLogoSrc] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const [generated, setGenerated] = useState(false);

  const generate = useCallback(async () => {
    if (!text.trim() || !canvasRef.current) return;

    try {
      await QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        margin,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: logoSrc ? 'H' : 'M',
      });

      // Draw logo on top
      if (logoSrc) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const logo = new Image();
        logo.onload = () => {
          const logoSize = size * 0.2;
          const x = (canvas.width - logoSize) / 2;
          const y = (canvas.height - logoSize) / 2;
          // White background behind logo
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(x - 4, y - 4, logoSize + 8, logoSize + 8);
          ctx.drawImage(logo, x, y, logoSize, logoSize);
        };
        logo.src = logoSrc;
      }

      setGenerated(true);
    } catch {
      setGenerated(false);
    }
  }, [text, size, fgColor, bgColor, margin, logoSrc]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (text.trim()) generate();
    }, 300);
    return () => clearTimeout(timer);
  }, [text, size, fgColor, bgColor, margin, logoSrc, generate]);

  const handleLogo = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoFile(file);
    setLogoSrc(URL.createObjectURL(file));
  };

  const downloadPng = () => {
    if (!canvasRef.current || !generated) return;
    const a = document.createElement('a');
    a.href = canvasRef.current.toDataURL('image/png');
    a.download = 'pixkit-qrcode.png';
    a.click();
  };

  const downloadSvg = async () => {
    if (!text.trim()) return;
    try {
      const svgStr = await QRCode.toString(text, {
        type: 'svg',
        width: size,
        margin,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: logoSrc ? 'H' : 'M',
      });
      const blob = new Blob([svgStr], { type: 'image/svg+xml' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'pixkit-qrcode.svg';
      a.click();
    } catch { /* ignore */ }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold font-heading mb-2">{t('qrCode.title')}</h1>
      <p className="text-text-muted text-sm mb-6">{t('qrCode.description')}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Controls */}
        <div className="space-y-4">
          {/* Text input */}
          <div>
            <label className="block text-xs text-text-muted mb-1">{t('qrCode.inputLabel')}</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('qrCode.inputPlaceholder')}
              className="w-full px-3 py-2 rounded-md bg-bg-primary border border-card-border text-sm text-text-primary resize-none h-24"
            />
          </div>

          {/* Size */}
          <div>
            <label className="block text-xs text-text-muted mb-1">{t('qrCode.size')}: {size}px</label>
            <div className="flex gap-2">
              {[200, 400, 600, 800].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                    size === s
                      ? 'border-gold bg-gold-dim text-gold'
                      : 'border-card-border text-text-secondary hover:border-gold/30'
                  }`}
                >
                  {s}px
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-muted mb-1">{t('qrCode.fgColor')}</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-8 h-8 rounded border border-card-border cursor-pointer"
                />
                <span className="text-xs text-text-secondary">{fgColor}</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-text-muted mb-1">{t('qrCode.bgColor')}</label>
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
          </div>

          {/* Margin */}
          <div>
            <label className="block text-xs text-text-muted mb-1">{t('qrCode.margin')}: {margin}</label>
            <input
              type="range"
              min="0"
              max="8"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block text-xs text-text-muted mb-1">{t('qrCode.logo')}</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => logoRef.current?.click()}
                className="btn-outline px-4 py-1.5 text-xs"
              >
                {logoSrc ? t('qrCode.changeLogo') : t('qrCode.uploadLogo')}
              </button>
              {logoSrc && (
                <>
                  <img src={logoSrc} alt="logo" className="w-8 h-8 rounded object-cover border border-card-border" />
                  <button
                    onClick={() => { setLogoSrc(null); setLogoFile(null); }}
                    className="text-xs text-text-muted hover:text-red-400"
                  >
                    ✕
                  </button>
                </>
              )}
              <input
                ref={logoRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogo}
              />
            </div>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="flex flex-col items-center">
          <p className="text-xs text-text-muted mb-2">{t('qrCode.preview')}</p>
          <div className="border border-card-border rounded-xl p-4 bg-white inline-block mb-4">
            <canvas
              ref={canvasRef}
              className="max-w-full"
              style={{ maxWidth: Math.min(size, 400), maxHeight: Math.min(size, 400) }}
            />
            {!text.trim() && (
              <div className="w-48 h-48 flex items-center justify-center text-gray-300 text-sm">
                {t('qrCode.emptyState')}
              </div>
            )}
          </div>

          {generated && text.trim() && (
            <div className="flex gap-3">
              <button onClick={downloadPng} className="btn-gold px-5 py-2 text-sm">
                PNG {t('common.download')}
              </button>
              <button onClick={downloadSvg} className="btn-outline px-5 py-2 text-sm">
                SVG {t('common.download')}
              </button>
            </div>
          )}
        </div>
      </div>
      <ToolGuide tool="qr-code" />
      <KakaoAd unit="DAN-HuODIrdxUXc8lsdF" width="728" height="90" />
    </div>
  );
}
