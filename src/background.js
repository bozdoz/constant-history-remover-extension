const $ = typeof chrome === "undefined" ? browser : chrome;

// Listen for tab updates
$.tabs.onUpdated.addListener((_tabId, changeInfo, _tab) => {
  if (changeInfo.status === "complete") {
    $.browsingData.removeHistory({}, () => {
      console.log("onUpdated", "History cleared");
    });
  }
});
