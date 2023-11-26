import EraseButton from "./modules/eraseSiteEntries.js";
import SiteEntryForm from "./modules/siteEntryForm.js";
import SiteList from "./modules/siteList.js";

if (document.querySelector('[data-hook="site-entry-form"]')) {
  new SiteEntryForm(
    document.querySelector('[data-hook="site-entry-form"]')
  ).initialize();
}
if (document.querySelector('[data-hook="erase-site-entries"]')) {
  new EraseButton(
    document.querySelector('[data-hook="erase-site-entries"]')
  ).attachListeners();
}

if (localStorage.getItem("sites")) {
  new SiteList(
    document.querySelector('[data-hook="existing-sites"]')
  ).initialize();

  // Inject dynamic content into the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    if (tabs[0] && tabs[0].url) {
      const url = new URL(tabs[0].url);
      const hostname = url.hostname;

      const sitesInStorage = JSON.parse(localStorage.getItem("sites"));
      const siteInStorageIndex = sitesInStorage.findIndex(
        (entry) => entry["site-url"] === hostname
      );
      if (siteInStorageIndex != NaN) {
        const css = sitesInStorage[siteInStorageIndex].siteCSS;
        chrome.scripting
          .insertCSS({
            target: { tabId },
            css: css,
          })
          .then(() => console.log("CSS injected"));
      }
    }
  });
}
