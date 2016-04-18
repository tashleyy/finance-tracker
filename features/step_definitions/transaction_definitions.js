/* eslint new-cap: "off" */
module.exports = function() {
  this.Given(/^I have imported the transactions in file (.*)$/, function(filename, cb) {
    this.attachFile('#addTransactionInputFile', filename);
    this.pressButton('Submit', cb);
  })
};
