chrome.storage.sync.get(['blockAds'], function (result) {
    if (result.blockAds) {
        blockYouTubeAds();
    }
});

function blockYouTubeAds() {
    const adSelectors = [
        // Selectors for ad elements
        // These are just examples, you may need to update them based on the current structure of YouTube
        'ytd-promoted-sparkles-text-search-renderer', // Sponsored content
        'ytd-display-ad-renderer', // Display ads
        '.ad-showing', // Overlay ads
    ];

    adSelectors.forEach(selector => {
        const ads = document.querySelectorAll(selector);
        ads.forEach(ad => {
            ad.style.display = 'none'; 
        });
    });
}
