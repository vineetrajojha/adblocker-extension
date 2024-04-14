document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('toggleBtn');
  
    chrome.storage.sync.get(['blockAds'], function(result) {
      updateToggleButton(result.blockAds);
    });
  
    toggleBtn.addEventListener('click', function() {
      chrome.storage.sync.get(['blockAds'], function(result) {
        const newBlockState = !result.blockAds;
        chrome.storage.sync.set({ blockAds: newBlockState }, function() {
          updateToggleButton(newBlockState);
          chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleBlocking', blockAds: newBlockState });
          });
        });
      });
    });
  
    function updateToggleButton(blockAds) {
      toggleBtn.textContent = blockAds ? 'Disable Blocking' : 'Enable Blocking';
      toggleBtn.style.backgroundColor = blockAds ? '#e74c3c' : '#2ecc71';
    }
  });
  