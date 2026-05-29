console.log('[Pixkit BG] Service worker loaded.');

chrome.runtime.onInstalled.addListener(() => {
  console.log('[Pixkit BG] Creating context menus...');

  // Parent menu
  chrome.contextMenus.create({
    id: 'pixkit',
    title: 'Pixkit',
    contexts: ['image'],
  });

  // Sub menus
  chrome.contextMenus.create({
    id: 'pixkit-remove-bg',
    parentId: 'pixkit',
    title: '\u{1FA84} 배경 제거',
    contexts: ['image'],
  });

  chrome.contextMenus.create({
    id: 'pixkit-resize',
    parentId: 'pixkit',
    title: '\u2194 리사이즈',
    contexts: ['image'],
  });

  chrome.contextMenus.create({
    id: 'pixkit-compress',
    parentId: 'pixkit',
    title: '\u{1F4E6} 이미지 압축',
    contexts: ['image'],
  }, () => {
    if (chrome.runtime.lastError) {
      console.error('[Pixkit BG] Menu creation error:', chrome.runtime.lastError.message);
    } else {
      console.log('[Pixkit BG] Context menus created.');
    }
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!info.srcUrl) return;
  const toolMap = {
    'pixkit-remove-bg': 'remove-bg',
    'pixkit-resize': 'resize',
    'pixkit-compress': 'compress',
  };
  const tool = toolMap[info.menuItemId];
  if (!tool) return;

  const editorUrl = chrome.runtime.getURL('editor.html')
    + '?tool=' + tool
    + '&url=' + encodeURIComponent(info.srcUrl);
  console.log('[Pixkit BG] Opening:', editorUrl);
  chrome.tabs.create({ url: editorUrl });
});
