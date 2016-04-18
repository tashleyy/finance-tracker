module.exports = function() {
  this.When(/^I upload a file called (.*) to selector (.*)$/, function(filename, selector,cb) {
  	this.attachFile(selector, filename);
   cb();
  });

  this.Then(/^I should be on the dashboard page$/, {timeout: 30 * 1000}, function(cb) {
    this.assertUrl('http://localhost:1337/dashboard/');
    cb();
  });

};
