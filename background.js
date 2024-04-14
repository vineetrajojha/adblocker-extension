chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({ blockAds: true });
  });
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleBlocking') {
      chrome.webRequest.onBeforeRequest.removeListener(blockAdsHandler);
      if (request.blockAds) {
        chrome.webRequest.onBeforeRequest.addListener(
          blockAdsHandler,
          { urls: ['<all_urls>'] },
          ['blocking']
        );
      }
    }
  });
  
  function blockAdsHandler(details) {
    return { cancel: true };
  }
  