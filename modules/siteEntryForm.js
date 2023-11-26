export default class SiteEntryForm {
  constructor(el) {
    this.el = el;
    this.siteInput = el.querySelector("#siteInput");
    this.siteURL = "";
    this.htmlInput = el.querySelector("#htmlInput");
    this.cssInput = el.querySelector("#cssInput");
    this.jsInput = el.querySelector("#jsInput");
    this.submitButton = this.el.querySelector("[type='submit']");
  }

  initialize() {
    this.submitButton.addEventListener("click", (e) => this.handleSubmit(e));
  }

  buildSiteEntryTemplate(siteName, siteURL, siteHTML, siteCSS, siteJS) {
    return {
      "site-name": siteName,
      "site-url": siteURL,
      siteHTML: siteHTML,
      siteCSS: siteCSS,
      siteJS: siteJS,
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0] && tabs[0].url) {
        const url = new URL(tabs[0].url);
        const hostname = url.hostname;
        this.siteURL = hostname;
        this.storeSiteEntry();
      }
    });
  }

  storeSiteEntry() {
    console.log(
      this.buildSiteEntryTemplate(
        this.siteInput.value,
        this.siteURL,
        this.htmlInput.value,
        this.cssInput.value,
        this.jsInput.value
      )
    );

    // Your new object to append
    const newObj = this.buildSiteEntryTemplate(
      this.siteInput.value,
      this.siteURL,
      this.htmlInput.value,
      this.cssInput.value,
      this.jsInput.value
    );

    const storedData = localStorage.getItem("sites");

    try {
      // Parse the existing data
      let existingData;

      if (Array.isArray(JSON.parse(storedData))) {
        existingData = { sites: JSON.parse(storedData) };
      } else {
        existingData = storedData ? JSON.parse(storedData) : { sites: [] };
      }

      // Ensure existingData.sites is an array before attempting to push
      if (Array.isArray(existingData.sites)) {
        // Append the new object to the array
        existingData.sites.push(newObj);

        // Save the updated data back to localStorage
        localStorage.setItem("sites", JSON.stringify(existingData.sites));

        console.log("Object appended to localStorage successfully!");

        console.log(
          localStorage.getItem("sites") ? "is valid" : "is not valid"
        );
      } else {
        console.error("Invalid data structure in localStorage");
      }
    } catch (error) {
      console.error("Error parsing existing data:", error);
    }
  }
}
