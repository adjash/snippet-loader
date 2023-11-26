import SiteCard from "./siteCard.js";

export default class SiteList {
  constructor(el) {
    this.cardHolder = el;
    this.cards = JSON.parse(localStorage.getItem("sites"));
  }

  initialize() {
    console.log("Site initialized");
    this.render();
  }

  render() {
    console.log("Site rendered");
    this.cards.forEach((site) => {
      console.log(site);
      this.cardHolder.appendChild(new SiteCard(site).initialize());
    });
  }
}
