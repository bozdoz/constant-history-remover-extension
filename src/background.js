const $ = typeof chrome === "undefined" ? browser : chrome;

const openWindows = new Map();

$.windows.onCreated.addListener((win) => {
  openWindows.set(win.id, Date.now());
});

// preferring onRemoved, since onUpdated removes the "Prev" button
$.windows.onRemoved.addListener((windowId) => {
  if (openWindows.has(windowId)) {
    const created = openWindows.get(windowId);

    $.history.deleteRange({ startTime: created, endTime: Date.now() }, () => {
      console.log("History cleared for window ID:", windowId);
      openWindows.delete(windowId);
    });
  }
});
