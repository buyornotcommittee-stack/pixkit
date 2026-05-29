'use client';
import { useState, useRef, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ToolLayout from '../../../components/ToolLayout';
import ToolGuide from '../../../components/ToolGuide';
import HowToUse from '../../../components/HowToUse';

export default function RemoveBgPage() {
  const t = useTranslations();

  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');
  const [modelLoading, setModelLoading] = useState(false);
  const [bgColor, setBgColor] = useState('transparent');
  const [customColor, setCustomColor] = useState('#ff0000');
  const [dragOver, setDragOver] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);
  const removeBgRef = useRef(null);

  // Manual editing state
  const [editing, setEditing] = useState(false);
  const [brushMode, setBrushMode] = useState('eraser'); // 'eraser' | 'restore'
  const [brushSize, setBrushSize] = useState(30);
  const [isPainting, setIsPainting] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const editCanvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const originalResultRef = useRef(null);
  const containerRef = useRef(null);
  const lastPosRef = useRef(null);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setImage({ url, file });
    setResult(null);
    setDone(false);
    setProgress(0);
    setEditing(false);
    setHistory([]);
    setHistoryIdx(-1);
  };

  const processImage = useCallback(async () => {
    if (!image) return;
    setProcessing(true);
    setProgress(0);
    setDone(false);
    setEditing(false);

    try {
      if (!removeBgRef.current) {
        setModelLoading(true);
        setProgressMsg(t('removeBg.modelLoading'));
        const mod = await import('@imgly/background-removal');
        removeBgRef.current = mod.default || mod.removeBackground || mod;
        setModelLoading(false);
      }

      setProgressMsg(t('removeBg.processing'));
      const removeBackground = removeBgRef.current;

      const blob = await removeBackground(image.file, {
        progress: (key, current, total) => {
          if (total > 0) {
            setProgress(Math.round((current / total) * 100));
          }
        },
      });

      const url = URL.createObjectURL(blob);
      setResult({ url, blob });
      setDone(true);
    } catch (err) {
      console.error('Background removal failed:', err);
      alert(t('common.errorRetry'));
    } finally {
      setProcessing(false);
      setProgressMsg('');
      setModelLoading(false);
    }
  }, [image, t]);

  // Initialize editing canvas when entering edit mode
  const startEditing = useCallback(() => {
    if (!result) return;
    setEditing(true);
    setZoom(1);
    setPan({ x: 0, y: 0 });

    const img = new Image();
    img.onload = () => {
      originalResultRef.current = img;
      const editCanvas = editCanvasRef.current;
      const maskCanvas = maskCanvasRef.current;
      if (!editCanvas || !maskCanvas) return;

      editCanvas.width = img.width;
      editCanvas.height = img.height;
      maskCanvas.width = img.width;
      maskCanvas.height = img.height;

      // Draw result on edit canvas
      const ctx = editCanvas.getContext('2d');
      ctx.clearRect(0, 0, img.width, img.height);
      ctx.drawImage(img, 0, 0);

      // Clear mask
      const mctx = maskCanvas.getContext('2d');
      mctx.clearRect(0, 0, img.width, img.height);

      // Save initial state
      const initialState = ctx.getImageData(0, 0, img.width, img.height);
      setHistory([initialState]);
      setHistoryIdx(0);
    };
    img.src = result.url;
  }, [result]);

  // Redraw edit canvas from history
  const redrawFromState = useCallback((imageData) => {
    const canvas = editCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.putImageData(imageData, 0, 0);
  }, []);

  // Save state to history
  const saveState = useCallback(() => {
    const canvas = editCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIdx + 1);
      newHistory.push(state);
      if (newHistory.length > 21) newHistory.shift();
      return newHistory;
    });
    setHistoryIdx(prev => Math.min(prev + 1, 20));
  }, [historyIdx]);

  // Undo
  const undo = useCallback(() => {
    if (historyIdx <= 0) return;
    const newIdx = historyIdx - 1;
    setHistoryIdx(newIdx);
    redrawFromState(history[newIdx]);
  }, [historyIdx, history, redrawFromState]);

  // Redo
  const redo = useCallback(() => {
    if (historyIdx >= history.length - 1) return;
    const newIdx = historyIdx + 1;
    setHistoryIdx(newIdx);
    redrawFromState(history[newIdx]);
  }, [historyIdx, history, redrawFromState]);

  // Reset editing to initial state
  const resetEditing = useCallback(() => {
    if (history.length > 0) {
      redrawFromState(history[0]);
      setHistory([history[0]]);
      setHistoryIdx(0);
    }
  }, [history, redrawFromState]);

  // Finish editing — update result
  const finishEditing = useCallback(() => {
    const canvas = editCanvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setResult({ url, blob });
      setEditing(false);
      setHistory([]);
      setHistoryIdx(-1);
    }, 'image/png');
  }, []);

  // Get canvas-relative position from event
  const getCanvasPos = useCallback((e) => {
    const canvas = editCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) / rect.width * canvas.width,
      y: (clientY - rect.top) / rect.height * canvas.height,
    };
  }, []);

  // Paint on canvas
  const paint = useCallback((pos) => {
    const canvas = editCanvasRef.current;
    const origImg = originalResultRef.current;
    if (!canvas || !origImg) return;
    const ctx = canvas.getContext('2d');

    const scaledBrush = brushSize / zoom;

    ctx.save();
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, scaledBrush / 2, 0, Math.PI * 2);

    if (lastPosRef.current) {
      // Draw line between last and current for smooth strokes
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.lineWidth = scaledBrush;
      ctx.lineCap = 'round';
    }

    ctx.closePath();

    if (brushMode === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fill();
      if (lastPosRef.current) {
        ctx.stroke();
      }
    } else {
      // Restore: draw original pixels back
      ctx.clip();
      ctx.globalCompositeOperation = 'source-over';
      ctx.drawImage(origImg, 0, 0);
      // Also handle the line area
      if (lastPosRef.current) {
        ctx.restore();
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.lineWidth = scaledBrush;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'white';
        ctx.stroke();
        ctx.clip();
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(origImg, 0, 0);
      }
    }
    ctx.restore();
    lastPosRef.current = pos;
  }, [brushMode, brushSize, zoom]);

  const onPointerDown = useCallback((e) => {
    e.preventDefault();
    // Middle button or space+click for panning
    if (e.button === 1) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      return;
    }
    const pos = getCanvasPos(e);
    setIsPainting(true);
    lastPosRef.current = null;
    paint(pos);
  }, [getCanvasPos, paint, pan]);

  const onPointerMove = useCallback((e) => {
    e.preventDefault();
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
      return;
    }
    if (!isPainting) return;
    const pos = getCanvasPos(e);
    paint(pos);
  }, [isPainting, isPanning, getCanvasPos, paint, panStart]);

  const onPointerUp = useCallback(() => {
    if (isPanning) {
      setIsPanning(false);
      return;
    }
    if (isPainting) {
      setIsPainting(false);
      lastPosRef.current = null;
      saveState();
    }
  }, [isPainting, isPanning, saveState]);

  // Touch events
  const onTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      e.preventDefault();
      const pos = getCanvasPos(e);
      setIsPainting(true);
      lastPosRef.current = null;
      paint(pos);
    }
  }, [getCanvasPos, paint]);

  const onTouchMove = useCallback((e) => {
    if (e.touches.length === 1 && isPainting) {
      e.preventDefault();
      const pos = getCanvasPos(e);
      paint(pos);
    }
  }, [isPainting, getCanvasPos, paint]);

  const onTouchEnd = useCallback(() => {
    if (isPainting) {
      setIsPainting(false);
      lastPosRef.current = null;
      saveState();
    }
  }, [isPainting, saveState]);

  // Wheel zoom
  const onWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(prev => Math.max(0.5, Math.min(5, prev + delta)));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    if (!editing) return;
    const handler = (e) => {
      if (e.key === 'e' || e.key === 'E') { setBrushMode('eraser'); e.preventDefault(); }
      if (e.key === 'r' || e.key === 'R') { setBrushMode('restore'); e.preventDefault(); }
      if (e.key === '[') { setBrushSize(prev => Math.max(5, prev - 5)); e.preventDefault(); }
      if (e.key === ']') { setBrushSize(prev => Math.min(100, prev + 5)); e.preventDefault(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo(); }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); redo(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [editing, undo, redo]);

  const getDisplayBgColor = () => {
    if (bgColor === 'transparent') return 'transparent';
    if (bgColor === 'custom') return customColor;
    return bgColor;
  };

  const downloadPng = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.url;
    a.download = 'pixkit-removed-bg.png';
    a.click();
  };

  const downloadJpg = async () => {
    if (!result) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      const color = getDisplayBgColor();
      if (color && color !== 'transparent') {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pixkit-removed-bg.jpg';
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/jpeg', 0.92);
    };
    img.src = result.url;
  };

  const bgOptions = [
    { value: 'transparent', label: t('removeBg.bgTransparent') },
    { value: '#ffffff', label: t('removeBg.bgWhite') },
    { value: '#000000', label: t('removeBg.bgBlack') },
    { value: 'custom', label: t('removeBg.bgCustom') },
  ];

  const checkerStyle = {
    backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
    backgroundSize: '16px 16px',
    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
  };

  return (
    <ToolLayout title={t('removeBg.title')} description={t('removeBg.description')}>
      {!image && (
        <div
          className={`dropzone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
          onClick={() => inputRef.current?.click()}
        >
          <svg className="mx-auto mb-3" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 4V2m0 2v2m0-2h-4.5M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9M3 10l2.96-5.17A2 2 0 0 1 7.69 3.5h8.62a2 2 0 0 1 1.73 1.33L21 10M3 10h18" />
            <circle cx="12" cy="16" r="3" />
          </svg>
          <p className="text-text-secondary text-sm">{t('removeBg.dropzone')}</p>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
        </div>
      )}

      {image && !editing && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="card-glow rounded-xl p-6">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">{t('removeBg.bgLabel')}</span>
                {bgOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setBgColor(opt.value)}
                    className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                      bgColor === opt.value ? 'border-gold text-gold bg-gold-dim' : 'border-card-border text-text-secondary hover:border-gold'
                    }`}
                  >
                    {opt.value !== 'transparent' && opt.value !== 'custom' && (
                      <span className="inline-block w-3 h-3 rounded-full mr-1.5 align-middle border border-card-border" style={{ backgroundColor: opt.value }} />
                    )}
                    {opt.label}
                  </button>
                ))}
                {bgColor === 'custom' && (
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border border-card-border"
                  />
                )}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={processImage} disabled={processing} className="btn-gold disabled:opacity-50">
                {processing ? t('removeBg.processing') : t('removeBg.removeBtn')}
              </button>
              <button onClick={() => { setImage(null); setResult(null); setDone(false); setProgress(0); }} className="btn-outline">{t('common.reset')}</button>
            </div>
          </div>

          {/* Progress bar */}
          {processing && (
            <div className="card-glow rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="animate-spin w-5 h-5 border-2 border-gold border-t-transparent rounded-full" />
                <span className="text-sm text-text-secondary">{progressMsg}</span>
                {progress > 0 && <span className="text-sm text-gold font-medium">{progress}%</span>}
              </div>
              {modelLoading && (
                <p className="text-xs text-text-muted mb-2">{t('removeBg.modelHint')}</p>
              )}
              <div className="w-full h-2 bg-card-border rounded-full overflow-hidden">
                <div className="h-full bg-gold rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          {/* Preview - side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="card-glow rounded-xl p-4">
              <p className="text-xs text-text-muted mb-2">{t('common.original')}</p>
              <img src={image.url} alt="original" className="max-w-full max-h-[400px] rounded mx-auto" />
            </div>

            <div className="card-glow rounded-xl p-4">
              <p className="text-xs text-text-muted mb-2">{t('common.result')}</p>
              {result ? (
                <div className={`transition-opacity duration-500 ${done ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="rounded overflow-hidden inline-block mx-auto" style={getDisplayBgColor() === 'transparent' ? checkerStyle : { backgroundColor: getDisplayBgColor() }}>
                    <img src={result.url} alt="result" className="max-w-full max-h-[400px]" />
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button onClick={startEditing} className="btn-outline flex-1">
                      <span className="inline-flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        {t('removeBg.editBtn')}
                      </span>
                    </button>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <button onClick={downloadPng} className="btn-gold flex-1">{t('removeBg.downloadPng')}</button>
                    <button onClick={downloadJpg} className="btn-outline flex-1">{t('removeBg.downloadJpg')}</button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-[200px] text-text-muted text-sm">
                  {processing ? t('common.processing') : t('removeBg.resultPlaceholder')}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Manual Edit Mode */}
      {editing && (
        <div className="space-y-4">
          {/* Edit Toolbar */}
          <div className="card-glow rounded-xl p-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* Eraser */}
              <button
                onClick={() => setBrushMode('eraser')}
                className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border transition-colors ${
                  brushMode === 'eraser' ? 'border-gold text-gold bg-gold-dim' : 'border-card-border text-text-secondary hover:border-gold'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 20H7L3 16l9.5-9.5a2.828 2.828 0 0 1 4 0l3.5 3.5a2.828 2.828 0 0 1 0 4L12.5 21.5" />
                </svg>
                {t('removeBg.eraser')} <kbd className="text-[10px] opacity-50 ml-1">E</kbd>
              </button>

              {/* Restore */}
              <button
                onClick={() => setBrushMode('restore')}
                className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-md border transition-colors ${
                  brushMode === 'restore' ? 'border-gold text-gold bg-gold-dim' : 'border-card-border text-text-secondary hover:border-gold'
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
                </svg>
                {t('removeBg.restore')} <kbd className="text-[10px] opacity-50 ml-1">R</kbd>
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-card-border" />

              {/* Brush Size */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-muted">{t('removeBg.brushSize')}</span>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-24 accent-[#f59e0b]"
                />
                <span className="text-xs text-text-secondary w-8">{brushSize}px</span>
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-card-border" />

              {/* Undo/Redo */}
              <button onClick={undo} disabled={historyIdx <= 0} className="p-1.5 rounded border border-card-border text-text-secondary hover:border-gold disabled:opacity-30 transition-colors" title="Undo (Ctrl+Z)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
              </button>
              <button onClick={redo} disabled={historyIdx >= history.length - 1} className="p-1.5 rounded border border-card-border text-text-secondary hover:border-gold disabled:opacity-30 transition-colors" title="Redo (Ctrl+Y)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 0-9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /></svg>
              </button>

              {/* Zoom display */}
              <div className="w-px h-6 bg-card-border" />
              <span className="text-xs text-text-muted">{Math.round(zoom * 100)}%</span>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Reset / Done */}
              <button onClick={resetEditing} className="btn-outline text-xs px-3 py-2">{t('removeBg.editReset')}</button>
              <button onClick={finishEditing} className="btn-gold text-xs px-4 py-2">{t('removeBg.editDone')}</button>
            </div>
            <p className="text-[10px] text-text-muted mt-2">
              {t('removeBg.editHint')}
            </p>
          </div>

          {/* Edit Canvas */}
          <div className="card-glow rounded-xl p-4">
            <div
              ref={containerRef}
              className="relative overflow-hidden rounded"
              style={{ maxHeight: '600px', cursor: brushMode === 'eraser' ? 'crosshair' : 'cell' }}
              onWheel={onWheel}
            >
              <div
                style={{
                  transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transformOrigin: 'center center',
                  transition: isPainting || isPanning ? 'none' : 'transform 0.15s ease',
                }}
              >
                {/* Checker background for transparency */}
                <div className="inline-block" style={checkerStyle}>
                  <canvas
                    ref={editCanvasRef}
                    className="max-w-full block"
                    style={{ maxHeight: `${600 / zoom}px` }}
                    onMouseDown={onPointerDown}
                    onMouseMove={onPointerMove}
                    onMouseUp={onPointerUp}
                    onMouseLeave={onPointerUp}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  />
                </div>
              </div>
              {/* Hidden mask canvas */}
              <canvas ref={maskCanvasRef} className="hidden" />
            </div>
          </div>
        </div>
      )}
      <HowToUse tool="remove-bg" />
      <ToolGuide tool="remove-bg" />
    </ToolLayout>
  );
}
