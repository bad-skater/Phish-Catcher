var current_tab = 0;
var screenshotHolder = {};
if(chrome.runtime.lastError)
{ 
   console.log("Harmless error")
}

setInterval(function() {
    chrome.tabs.captureVisibleTab(function(screenshotUrl){
    chrome.tabs.query({currentWindow:true, active:true},function(tabs){
        var activeTabID =tabs[0].id;
        if (current_tab == 0) {
            current_tab = activeTabID;
        }
        if(current_tab != activeTabID) {
            if(screenshotHolder[activeTabID]!= undefined){
                chrome.tabs.sendMessage(activeTabID,[screenshotHolder[activeTabID],screenshotUrl]);
            }
        }
        current_tab = activeTabID;
        screenshotHolder[activeTabID]=screenshotUrl;
    });
    });
    },5000);

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    chrome.browserAction.setIcon({tabId: sender.tab.id, path: "images/cross.png"});
});