export default class Site {
  constructor() {
    // Initialize any properties or setup here
    console.log("Site constructor called");
  }

  initialize() {
    console.log("Site initialized");
    this.render();
  }

  render() {
    console.log("Site rendered");
  }
}
