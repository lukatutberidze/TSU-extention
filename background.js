chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("tab updated");
  if (tab.url && tab.url.includes("/schedule")) {
    chrome.tabs.sendMessage(tabId, {
      message: "rerun",
    });
  }
});
