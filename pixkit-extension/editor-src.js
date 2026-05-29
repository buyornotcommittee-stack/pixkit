import { removeBackground } from '@imgly/background-removal';

// ══════════════════════════════════════════
// SHARED
// ══════════════════════════════════════════
const DAILY_LIMIT = 3;
const params = new URLSearchParams(window.location.search);
const currentTool = params.get('tool') || 'remove-bg';
const imageUrl = params.get('url') || null;

// ── Tab switching ──
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

// Activate correct tab on load
function activateTab(tool) {
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tool);
  });
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  const panel = document.getElementById('panel-' + tool);
  if (panel) panel.classList.add('active');
}

// ── Shared: fetch image as blob ──
async function fetchImageBlob(url) {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (res.ok) return await res.blob();
  } catch (e) { /* fallback below */ }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.width; c.height = img.height;
      c.getContext('2d').drawImage(img, 0, 0);
      c.toBlob(b => b ? resolve(b) : reject(new Error('toBlob failed')), 'image/png');
    };
    img.onerror = () => reject(new Error('Image load failed'));
    img.src = url;
  });
}

// ── Shared: load image element from blob ──
function loadImageFromBlob(blob) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(blob);
  });
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ══════════════════════════════════════════
// REMOVE-BG
// ══════════════════════════════════════════
const stepLimit = document.getElementById('step-limit');
const stepLoading = document.getElementById('step-loading');
const stepProcessing = document.getElementById('step-processing');
const stepEditor = document.getElementById('step-editor');
const remainingBar = document.getElementById('remaining-bar');
const remainingText = document.getElementById('remaining-text');
const loadingMsg = document.getElementById('loading-msg');
const loadingProgress = document.getElementById('loading-progress');
const loadingHint = document.getElementById('loading-hint');
const previewImg = document.getElementById('preview-img');
const processingMsg = document.getElementById('processing-msg');
const processingProgress = document.getElementById('processing-progress');
const processingPercent = document.getElementById('processing-percent');
const editCanvas = document.getElementById('edit-canvas');
const canvasContainer = document.getElementById('canvas-container');
const canvasArea = document.querySelector('.canvas-area');
const brushSizeInput = document.getElementById('brush-size');
const brushSizeVal = document.getElementById('brush-size-val');
const zoomVal = document.getElementById('zoom-val');

let brushMode = 'eraser', brushSize = 30;
let zoom = 1, panX = 0, panY = 0;
let isPainting = false, isPanning = false;
let panStartX = 0, panStartY = 0, lastPos = null;
let originalResultImg = null;
let bgHistory = [], bgHistoryIdx = -1;
let bgColor = 'transparent';

async function getUsage() {
  const today = new Date().toDateString();
  const data = await chrome.storage.local.get(['pixkitCount', 'pixkitDate']);
  if (data.pixkitDate !== today) {
    await chrome.storage.local.set({ pixkitCount: 0, pixkitDate: today });
    return { count: 0 };
  }
  return { count: data.pixkitCount || 0 };
}

async function incrementUsage() {
  const { count } = await getUsage();
  await chrome.storage.local.set({ pixkitCount: count + 1 });
}

function updateRemainingUI(count) {
  const remaining = Math.max(0, DAILY_LIMIT - count);
  remainingText.textContent = `오늘 남은 횟수: ${remaining}/${DAILY_LIMIT}`;
  remainingBar.classList.add('visible');
}

function showBgStep(step) {
  [stepLimit, stepLoading, stepProcessing, stepEditor].forEach(s => s.classList.remove('active'));
  step.classList.add('active');
}

document.getElementById('btn-visit-pixkit').addEventListener('click', () => window.open('https://pixkit.app/remove-bg', '_blank'));
document.getElementById('btn-come-back').addEventListener('click', () => window.close());

async function runRemoveBg() {
  if (!imageUrl) { loadingMsg.textContent = '이미지 URL이 없습니다.'; return; }

  const { count } = await getUsage();
  updateRemainingUI(count);
  if (count >= DAILY_LIMIT) { showBgStep(stepLimit); remainingBar.classList.remove('visible'); return; }

  try {
    loadingMsg.textContent = '이미지를 불러오는 중...';
    loadingProgress.style.width = '30%';
    const blob = await fetchImageBlob(imageUrl);

    loadingMsg.textContent = 'AI 모델을 불러오는 중...';
    loadingHint.textContent = '처음 실행 시 약 30초 소요됩니다.';
    loadingProgress.style.width = '50%';

    showBgStep(stepProcessing);
    previewImg.src = URL.createObjectURL(blob);
    processingMsg.textContent = '배경을 제거하는 중...';

    const resultBlob = await removeBackground(blob, {
      progress: (k, cur, tot) => {
        if (tot > 0) { const p = Math.round(cur / tot * 100); processingProgress.style.width = p + '%'; processingPercent.textContent = p + '%'; }
      }
    });

    await incrementUsage();
    updateRemainingUI((await getUsage()).count);
    initBgEditor(resultBlob);
  } catch (err) {
    loadingMsg.textContent = '오류: ' + err.message;
    loadingProgress.style.width = '0%';
  }
}

function initBgEditor(resultBlob) {
  showBgStep(stepEditor);
  const url = URL.createObjectURL(resultBlob);
  const img = new Image();
  img.onload = () => {
    originalResultImg = img;
    editCanvas.width = img.width; editCanvas.height = img.height;
    const ctx = editCanvas.getContext('2d');
    ctx.clearRect(0, 0, img.width, img.height);
    ctx.drawImage(img, 0, 0);
    fitBgZoom();
    bgHistory = [ctx.getImageData(0, 0, img.width, img.height)];
    bgHistoryIdx = 0;
    updateBgHistoryBtns();
    canvasArea.classList.add('eraser-mode');
  };
  img.src = url;
}

function fitBgZoom() {
  if (!editCanvas.width) return;
  zoom = Math.min((canvasArea.clientWidth - 40) / editCanvas.width, (canvasArea.clientHeight - 40) / editCanvas.height, 1);
  panX = 0; panY = 0; applyBgTransform();
}

function applyBgTransform() {
  canvasContainer.style.transform = `scale(${zoom}) translate(${panX/zoom}px, ${panY/zoom}px)`;
  zoomVal.textContent = Math.round(zoom * 100) + '%';
}

function saveBgState() {
  const s = editCanvas.getContext('2d').getImageData(0, 0, editCanvas.width, editCanvas.height);
  bgHistory = bgHistory.slice(0, bgHistoryIdx + 1);
  bgHistory.push(s);
  if (bgHistory.length > 21) bgHistory.shift();
  bgHistoryIdx = bgHistory.length - 1;
  updateBgHistoryBtns();
}

const btnUndo = document.getElementById('btn-undo');
const btnRedo = document.getElementById('btn-redo');

function bgUndo() { if (bgHistoryIdx <= 0) return; bgHistoryIdx--; editCanvas.getContext('2d').putImageData(bgHistory[bgHistoryIdx], 0, 0); updateBgHistoryBtns(); }
function bgRedo() { if (bgHistoryIdx >= bgHistory.length - 1) return; bgHistoryIdx++; editCanvas.getContext('2d').putImageData(bgHistory[bgHistoryIdx], 0, 0); updateBgHistoryBtns(); }
function updateBgHistoryBtns() { btnUndo.disabled = bgHistoryIdx <= 0; btnRedo.disabled = bgHistoryIdx >= bgHistory.length - 1; }

function getCanvasPos(e) {
  const r = editCanvas.getBoundingClientRect();
  const cx = e.touches ? e.touches[0].clientX : e.clientX;
  const cy = e.touches ? e.touches[0].clientY : e.clientY;
  return { x: (cx - r.left) / r.width * editCanvas.width, y: (cy - r.top) / r.height * editCanvas.height };
}

function paint(pos) {
  const ctx = editCanvas.getContext('2d');
  const sb = brushSize / zoom, rad = sb / 2;
  ctx.save();
  if (brushMode === 'eraser') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    if (lastPos) { ctx.moveTo(lastPos.x, lastPos.y); ctx.lineTo(pos.x, pos.y); ctx.lineWidth = sb; ctx.lineCap = 'round'; ctx.stroke(); }
    ctx.arc(pos.x, pos.y, rad, 0, Math.PI * 2); ctx.fill();
  } else {
    ctx.beginPath();
    if (lastPos) {
      const dx = pos.x - lastPos.x, dy = pos.y - lastPos.y, len = Math.sqrt(dx*dx + dy*dy);
      ctx.arc(lastPos.x, lastPos.y, rad, 0, Math.PI * 2);
      ctx.arc(pos.x, pos.y, rad, 0, Math.PI * 2);
      if (len > 0) { const nx = -dy/len*rad, ny = dx/len*rad; ctx.moveTo(lastPos.x+nx, lastPos.y+ny); ctx.lineTo(pos.x+nx, pos.y+ny); ctx.lineTo(pos.x-nx, pos.y-ny); ctx.lineTo(lastPos.x-nx, lastPos.y-ny); ctx.closePath(); }
    } else { ctx.arc(pos.x, pos.y, rad, 0, Math.PI * 2); }
    ctx.clip(); ctx.globalCompositeOperation = 'source-over'; ctx.drawImage(originalResultImg, 0, 0);
  }
  ctx.restore(); lastPos = pos;
}

editCanvas.addEventListener('mousedown', e => {
  if (e.button === 1) { isPanning = true; panStartX = e.clientX - panX; panStartY = e.clientY - panY; e.preventDefault(); return; }
  if (e.button !== 0) return; isPainting = true; lastPos = null; paint(getCanvasPos(e));
});
window.addEventListener('mousemove', e => {
  if (isPanning) { panX = e.clientX - panStartX; panY = e.clientY - panStartY; applyBgTransform(); return; }
  if (isPainting) paint(getCanvasPos(e));
});
window.addEventListener('mouseup', () => {
  if (isPanning) { isPanning = false; return; }
  if (isPainting) { isPainting = false; lastPos = null; saveBgState(); }
});
editCanvas.addEventListener('touchstart', e => { if (e.touches.length === 1) { e.preventDefault(); isPainting = true; lastPos = null; paint(getCanvasPos(e)); } }, { passive: false });
editCanvas.addEventListener('touchmove', e => { if (e.touches.length === 1 && isPainting) { e.preventDefault(); paint(getCanvasPos(e)); } }, { passive: false });
editCanvas.addEventListener('touchend', () => { if (isPainting) { isPainting = false; lastPos = null; saveBgState(); } });
canvasArea.addEventListener('wheel', e => { e.preventDefault(); zoom = Math.max(0.25, Math.min(5, zoom + (e.deltaY > 0 ? -0.1 : 0.1))); applyBgTransform(); }, { passive: false });

function setMode(m) {
  brushMode = m;
  document.getElementById('btn-eraser').classList.toggle('active', m === 'eraser');
  document.getElementById('btn-restore').classList.toggle('active', m === 'restore');
  canvasArea.classList.toggle('eraser-mode', m === 'eraser');
  canvasArea.classList.toggle('restore-mode', m === 'restore');
}

document.getElementById('btn-eraser').addEventListener('click', () => setMode('eraser'));
document.getElementById('btn-restore').addEventListener('click', () => setMode('restore'));
brushSizeInput.addEventListener('input', () => { brushSize = Number(brushSizeInput.value); brushSizeVal.textContent = brushSize + 'px'; });
document.getElementById('btn-zoom-in').addEventListener('click', () => { zoom = Math.min(5, zoom + 0.2); applyBgTransform(); });
document.getElementById('btn-zoom-out').addEventListener('click', () => { zoom = Math.max(0.25, zoom - 0.2); applyBgTransform(); });
document.getElementById('btn-zoom-fit').addEventListener('click', fitBgZoom);
btnUndo.addEventListener('click', bgUndo);
btnRedo.addEventListener('click', bgRedo);
document.getElementById('btn-reset-edit').addEventListener('click', () => { if (bgHistory.length) { editCanvas.getContext('2d').putImageData(bgHistory[0], 0, 0); bgHistory = [bgHistory[0]]; bgHistoryIdx = 0; updateBgHistoryBtns(); } });

const customColor = document.getElementById('custom-color');
document.querySelectorAll('.bg-btn').forEach(btn => btn.addEventListener('click', () => {
  document.querySelectorAll('.bg-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active');
  bgColor = btn.dataset.bg === 'custom' ? customColor.value : btn.dataset.bg;
}));
customColor.addEventListener('input', () => {
  document.querySelector('.bg-btn[data-bg="custom"]').classList.add('active');
  document.querySelectorAll('.bg-btn:not([data-bg="custom"])').forEach(b => b.classList.remove('active'));
  bgColor = customColor.value;
});

document.getElementById('btn-download-png').addEventListener('click', () => editCanvas.toBlob(b => triggerDownload(b, 'pixkit-bg-removed.png'), 'image/png'));
document.getElementById('btn-download-jpg').addEventListener('click', () => {
  const c = document.createElement('canvas'); c.width = editCanvas.width; c.height = editCanvas.height;
  const x = c.getContext('2d'); x.fillStyle = bgColor === 'transparent' ? '#fff' : bgColor; x.fillRect(0, 0, c.width, c.height); x.drawImage(editCanvas, 0, 0);
  c.toBlob(b => triggerDownload(b, 'pixkit-bg-removed.jpg'), 'image/jpeg', 0.92);
});

window.addEventListener('keydown', e => {
  if (!stepEditor.classList.contains('active')) return;
  if (e.key === 'e' || e.key === 'E') { setMode('eraser'); e.preventDefault(); }
  if (e.key === 'r' || e.key === 'R') { setMode('restore'); e.preventDefault(); }
  if (e.key === '[') { brushSize = Math.max(5, brushSize - 5); brushSizeInput.value = brushSize; brushSizeVal.textContent = brushSize + 'px'; e.preventDefault(); }
  if (e.key === ']') { brushSize = Math.min(100, brushSize + 5); brushSizeInput.value = brushSize; brushSizeVal.textContent = brushSize + 'px'; e.preventDefault(); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); bgUndo(); }
  if ((e.ctrlKey || e.metaKey) && e.key === 'y') { e.preventDefault(); bgRedo(); }
});


// ══════════════════════════════════════════
// RESIZE
// ══════════════════════════════════════════
let resizeImg = null, resizeBlob = null;
let resizeFormat = 'image/jpeg', resizeQuality = 0.9;
const resizeW = document.getElementById('resize-w');
const resizeH = document.getElementById('resize-h');
const resizeLock = document.getElementById('resize-lock');
const resizePreview = document.getElementById('resize-preview');
const resizeOrigSize = document.getElementById('resize-orig-size');
const resizeSizeInfo = document.getElementById('resize-size-info');
const resizeQualityInput = document.getElementById('resize-quality');
const resizeQualityVal = document.getElementById('resize-quality-val');
const resizeQualitySection = document.getElementById('resize-quality-section');

function setupDropzone(dropAreaId, fileInputId, onFile) {
  const area = document.getElementById(dropAreaId);
  const input = document.getElementById(fileInputId);
  area.addEventListener('click', () => input.click());
  input.addEventListener('change', e => { if (e.target.files[0]) onFile(e.target.files[0]); });
  area.addEventListener('dragover', e => { e.preventDefault(); area.classList.add('drag-over'); });
  area.addEventListener('dragleave', () => area.classList.remove('drag-over'));
  area.addEventListener('drop', e => { e.preventDefault(); area.classList.remove('drag-over'); if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]); });
}

async function loadResize(blob) {
  resizeBlob = blob;
  resizeImg = await loadImageFromBlob(blob);
  resizePreview.src = resizeImg.src;
  resizeOrigSize.textContent = `${resizeImg.width} × ${resizeImg.height} (${formatBytes(blob.size)})`;
  resizeW.value = resizeImg.width;
  resizeH.value = resizeImg.height;
  resizeSizeInfo.textContent = formatBytes(blob.size);
  document.getElementById('resize-dropzone').classList.remove('active');
  document.getElementById('resize-tool').classList.add('active');
}

setupDropzone('resize-drop-area', 'resize-file-input', loadResize);

resizeW.addEventListener('input', () => {
  if (resizeLock.checked && resizeImg) {
    const ratio = resizeImg.height / resizeImg.width;
    resizeH.value = Math.round(Number(resizeW.value) * ratio);
  }
});
resizeH.addEventListener('input', () => {
  if (resizeLock.checked && resizeImg) {
    const ratio = resizeImg.width / resizeImg.height;
    resizeW.value = Math.round(Number(resizeH.value) * ratio);
  }
});

document.querySelectorAll('#panel-resize .preset-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    resizeW.value = btn.dataset.w;
    resizeH.value = btn.dataset.h;
  });
});

document.querySelectorAll('#panel-resize .format-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#panel-resize .format-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    resizeFormat = btn.dataset.fmt;
    resizeQualitySection.style.display = resizeFormat === 'image/png' ? 'none' : '';
  });
});

resizeQualityInput.addEventListener('input', () => {
  resizeQuality = Number(resizeQualityInput.value) / 100;
  resizeQualityVal.textContent = resizeQualityInput.value + '%';
});

document.getElementById('resize-download').addEventListener('click', () => {
  if (!resizeImg) return;
  const w = Number(resizeW.value) || resizeImg.width;
  const h = Number(resizeH.value) || resizeImg.height;
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.drawImage(resizeImg, 0, 0, w, h);
  const ext = resizeFormat === 'image/png' ? 'png' : resizeFormat === 'image/webp' ? 'webp' : 'jpg';
  const q = resizeFormat === 'image/png' ? undefined : resizeQuality;
  c.toBlob(blob => {
    resizeSizeInfo.textContent = `${formatBytes(resizeBlob.size)} → ${formatBytes(blob.size)}`;
    triggerDownload(blob, `pixkit-resized.${ext}`);
  }, resizeFormat, q);
});


// ══════════════════════════════════════════
// COMPRESS
// ══════════════════════════════════════════
let compressImg = null, compressBlob = null;
let compressFormat = 'image/jpeg', compressQuality = 0.8;
const compressPreview = document.getElementById('compress-preview');
const compressOrigSize = document.getElementById('compress-orig-size');
const compressResultSize = document.getElementById('compress-result-size');
const compressSaving = document.getElementById('compress-saving');
const compressQualityInput = document.getElementById('compress-quality');
const compressQualityVal = document.getElementById('compress-quality-val');

async function loadCompress(blob) {
  compressBlob = blob;
  compressImg = await loadImageFromBlob(blob);
  compressPreview.src = compressImg.src;
  compressOrigSize.textContent = `${resizeImg ? '' : ''}${compressImg.width} × ${compressImg.height} — ${formatBytes(blob.size)}`;
  document.getElementById('compress-dropzone').classList.remove('active');
  document.getElementById('compress-tool').classList.add('active');
  updateCompressPreview();
}

setupDropzone('compress-drop-area', 'compress-file-input', loadCompress);

function updateCompressPreview() {
  if (!compressImg) return;
  const c = document.createElement('canvas');
  c.width = compressImg.width; c.height = compressImg.height;
  c.getContext('2d').drawImage(compressImg, 0, 0);
  c.toBlob(blob => {
    if (!blob) return;
    compressResultSize.textContent = formatBytes(blob.size);
    const saved = ((1 - blob.size / compressBlob.size) * 100);
    compressSaving.textContent = saved > 0 ? `-${saved.toFixed(0)}% 절감` : '(원본보다 큼)';
    compressSaving.style.color = saved > 0 ? '#22c55e' : '#ef4444';
  }, compressFormat, compressQuality);
}

compressQualityInput.addEventListener('input', () => {
  compressQuality = Number(compressQualityInput.value) / 100;
  compressQualityVal.textContent = compressQualityInput.value + '%';
  updateCompressPreview();
});

document.querySelectorAll('#panel-compress .format-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#panel-compress .format-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    compressFormat = btn.dataset.fmt;
    updateCompressPreview();
  });
});

document.getElementById('compress-download').addEventListener('click', () => {
  if (!compressImg) return;
  const c = document.createElement('canvas');
  c.width = compressImg.width; c.height = compressImg.height;
  c.getContext('2d').drawImage(compressImg, 0, 0);
  const ext = compressFormat === 'image/webp' ? 'webp' : 'jpg';
  c.toBlob(blob => {
    const saved = ((1 - blob.size / compressBlob.size) * 100);
    compressResultSize.textContent = `${formatBytes(blob.size)} (${saved > 0 ? '-' + saved.toFixed(0) + '%' : '+' + Math.abs(saved).toFixed(0) + '%'})`;
    triggerDownload(blob, `pixkit-compressed.${ext}`);
  }, compressFormat, compressQuality);
});


// ══════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════
async function main() {
  console.log('[Pixkit] Tool:', currentTool, 'URL:', imageUrl);
  activateTab(currentTool);

  if (currentTool === 'remove-bg') {
    await runRemoveBg();
  } else if (imageUrl) {
    // Load image for resize/compress from context menu
    try {
      const blob = await fetchImageBlob(imageUrl);
      if (currentTool === 'resize') await loadResize(blob);
      if (currentTool === 'compress') await loadCompress(blob);
    } catch (e) {
      console.error('[Pixkit] Failed to load image:', e);
    }
  }
}

main();
