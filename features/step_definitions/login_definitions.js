module.exports = function () {
  this.Given(/^I am on the login page$/, {timeout: 30 * 1000}, function (cb) {
    this.visit('http://localhost:1337/', cb);
  });
  
  this.Then(/^I should be on the login page$/, function(cb) {
    this.assertUrl('http://localhost:1337/');
    cb();
  });
  
  this.Then(/^I should be on the dashboard page$/, {timeout: 30 * 1000}, function(cb) {
    this.assertUrl('http://localhost:1337/dashboard/');
    cb();
  });  
};