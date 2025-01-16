let previousUrl: string | null = null;

chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
  if (info.status === 'complete' && tab?.url && tab.url !== previousUrl) {
    previousUrl = tab.url;

    const url = new URL(tab.url);
    if (!url.pathname.match(/^\/[^/]+\/[^/]+(\/pulls)?$/g)) {
      console.log('Not a valid page', tab.url);
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['./index.js'],
    });
  }
});