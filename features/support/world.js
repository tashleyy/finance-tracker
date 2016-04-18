var zombie = require('zombie');
function World() {
  this.browser = new zombie(); // this.browser will be available in step definitions

  this.visit = function (url, callback) {
    this.browser.visit(url, callback);
  };
  
  this.assertElements = function (selector, num) {
    this.browser.assert.elements(selector, num);
  };
  
  this.fill = function (selector, input) {
    this.browser.fill(selector, input);
  };
  
  this.pressButton = function (button, cb) {
    this.browser.pressButton(button, cb);
  };
  
  this.assertUrl = function (url) {
    this.browser.assert.url(url);
  };
  
  this.assertText = function (selector, text) {
    this.browser.assert.text(selector, text);
  };
  
  this.assertElementsAtLeast = function (selector, num) {
    this.browser.assert.elements(selector, { atLeast: num });
  };
}

module.exports = function() {
  this.World = World;
};