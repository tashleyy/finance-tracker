/* eslint new-cap: "off" */
module.exports = function() {
  this.Then(/^I should have (\d+) of (.*) selector$/, function(num, selector, cb) {
    this.assertElements(selector, 1);
    cb();
  });

  this.When(/^I fill (.*) selector with (.*)$/, function(selector, input, cb) {
    this.fill(selector, input);
    cb();
  });

  this.When(/^I press the button (.*)$/, function(button, cb) {
    this.pressButton(button, cb);
  });

  this.Then(/^I should have (.*) text for (.*) selector$/, function(text, selector, cb) {
    this.assertText(selector, text);
    cb();
  });

  this.Then(/^I should have at least (\d+) of (.*) selector$/, function(num, selector, cb) {
    this.assertElementsAtLeast(selector, num);
    cb();
  });
};
