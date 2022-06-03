/*
let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

*/
/*
chrome.webNavigation.onConnect.addListener(function (tab) {
    try {
        chrome.storage.sync.set({url:tab.pendingUrl});
    } catch (error) {
        throw error;
    }
    
});*/

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({'allowed_url':{}});
});



chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    try {
        
        let current_url = tab.url;
        const regex = /https:\/\/[0-9a-zA-Z\.]+/g;
        current_url = current_url.match(regex);
        
        if (current_url == null) {
            current_url = "invalid url";
            console.log("invalid ",tab.url);
            chrome.storage.sync.set({'current_url':current_url});
            return;
        }
        chrome.storage.sync.set({'current_url':current_url});

        if (changeInfo.status == 'complete') {
            console.log('ran backgroud.js');
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                files: ['removeAds.js'],
              });
            return;
        }
    } catch (error) {
        throw error;
    }
    
  });

/*
function runLinkedinScript() {
    const tabId = getTabId();
    // Inject script from file into the webpage
    chrome.scripting.executeScript(
    {
        target: {tabId: tabId},
        files: ['removeAds.js'],
    },
    () => void);
    return true;
};
*/