document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('click', () => {
    const tool = card.dataset.tool;
    const url = chrome.runtime.getURL('editor.html') + '?tool=' + tool;
    chrome.tabs.create({ url });
  });
});

document.getElementById('footerLink').addEventListener('click', (e) => {
  e.preventDefault();
  chrome.tabs.create({ url: 'https://pixkit.app' });
});
