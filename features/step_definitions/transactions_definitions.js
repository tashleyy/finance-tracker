module.exports = function () {
  this.Given(/^I am on the dashboard page$/, {timeout: 30 * 1000}, function (cb) {
    this.visit('http://localhost:1337/dashboard', cb);
  });
  
  this.Then(/^I should be on the dashboard page$/, function(cb) {
    this.assertUrl('http://localhost:1337/dashboard');
    cb();
  });

  
  this.Given(/^I am on the dashboard page$/, {timeout: 30 * 1000}, function(cb) {
    var actualThis = this;
    this.visit('http://localhost:1337/', function() {
      actualThis.fill('#inputEmail', 'ttjahjad@usc.edu');
      actualThis.fill('#inputPassword', 'password');
      actualThis.pressButton('Login', cb);
    });
  });

  this.When(/^I upload a file with valid data$/, function (cb) {
  // Write code here that turns the phrase above into concrete actions
  cb.pending();
});
};
