/* eslint new-cap: "off" */
module.exports = function() {
  this.Given(/^I have imported the accounts in file (.*)$/, function(filename, cb) {
    this.attachFile('#addAccountInputFile', filename);
    this.pressButton('Submit', cb);
  });
};
