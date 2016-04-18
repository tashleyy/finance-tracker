module.exports = function() {
  this.When(/^I upload a file called (.*) to selector (.*)$/, function(filename, selector,cb) {
  	this.attachFile(selector, filename);
   cb();
  });

};
