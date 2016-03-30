module.exports = function () {
  this.Then(/^I should have (\d+) of (.*) selector$/, function (num, selector, cb) {
    this.assertElements(selector, 1);
    cb();
  });
  
  this.When(/^I fill (.*) selector with (.*)$/, function (selector, input, cb) {
    this.fill(selector, input);
    cb();
  });
  
  this.When(/^I press the button (.*)$/, function (button, cb) {
    this.pressButton(button, cb);
  });
};