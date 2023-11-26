export default class SiteCard {
  constructor(site) {
    this.site = site;
    this.siteName = site["site-name"];
    this.siteURL = site["site-url"];
  }

  initialize() {
    // You can add initialization logic here if needed
    return this.render();
  }

  handleEditClick(e) {
    console.log("edit clicked for:", e.target);
  }

  render() {
    const string = `
          <li>
            <a href="https://${this.siteURL}" target="_blank">${this.siteName}</a>
            <button data-site="${this.siteURL}">Edit Site Snippets</button>
          </li>`;
    const parser = new DOMParser();
    const doc = parser.parseFromString(string, "text/html");

    // Extract the first child of the document, which is the <li> element
    const element = doc.body.firstChild;
    doc.body
      .querySelector("button")
      .addEventListener("click", (e) => this.handleEditClick(e));

    return element;
  }
}
