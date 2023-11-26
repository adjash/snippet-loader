export default class EraseButton {
  constructor(el) {
    this.el = el;
  }
  attachListeners() {
    this.el.addEventListener("click", () => this.clearAllEntries());
  }
  clearAllEntries() {
    // Check if localStorage is supported by the browser
    if (typeof Storage !== "undefined") {
      // Remove the 'sites' key from localStorage
      localStorage.removeItem("sites");
      console.log('Key "sites" removed from local storage');
    } else {
      console.log("Sorry, your browser does not support local storage");
    }
  }
}
