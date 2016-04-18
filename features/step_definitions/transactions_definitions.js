<<<<<<< 35a1a8f3d2d30e5f878043d76136e66f485c9d42
/* eslint new-cap: "off" */

module.exports = function() {
  this.When(/^I upload a file with valid data$/, function(cb) {
=======
module.exports = function () {
  this.Given(/^I am on the dashboard page$/, {timeout: 30 * 1000}, function(cb) {
	var actualThis = this;
    this.visit('http://localhost:1337/', function() {
      actualThis.fill('#inputEmail', 'ttjahjad@usc.edu');
      actualThis.fill('#inputPassword', 'password');
      actualThis.pressButton('Login', cb);
    }); 
  });
   this.When(/^I upload a file with valid data$/, function (cb) {
>>>>>>> trying to figure out testing
    // Write code here that turns the phrase above into concrete actions
    this.attachFile("input#uploadfile", "../../assets/account.csv");
    cb();
  });

  this.Then(/^I should be on the dashboard page$/, {timeout: 30 * 1000}, function(cb) {
    this.assertUrl('http://localhost:1337/dashboard/');
    cb();
  });

  this.When(/^I upload a file with invalid data$/, function (cb) {
    // Write code here that turns the phrase above into concrete actions
    this.attachFile("input#uploadfile", "../../assets/account.csv");
    cb();
  });

   this.Then(/^I should be on the dashboard page$/, {timeout: 30 * 1000}, function(cb) {
    this.assertUrl('http://localhost:1337/dashboard/');
    cb();
  });
};
