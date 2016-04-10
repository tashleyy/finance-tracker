jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('DBQuery', function() {
  beforeEach(function(done) {
    login('ttjahjad@usc.edu', 'password', function(data) {
      if (data && data.user && data.user.id) {
        var userId = btoa(data.user.id);
        this.ownerId = userId;
        done();
      }
    });
  });
  
  afterEach(function() {
    logout();
  });

  it('should be able to get Accounts', function(done) {
    getAccounts(this.ownerId, function(accounts) {
      expect(accounts).toBeDefined();
      expect(accounts).toEqual(jasmine.any(Array));
      expect((new Set(accounts)).size).toEqual(accounts.length);
      done();
    });
  });
  
  it('should be able to add Account', function(done) {
    getAccounts(this.ownerId, function(accounts) {
      // Test is only applicable if 'Checking' doesn't already exist
      var found = false;
      for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].name == 'Checking') {
          found = true;
          expect(true).toBeTruthy();
          done();
          break;
        }
      }
      if (!found) {
        addAccount(this.ownerId, 'Checking', function(moreAccounts) {
          accounts.forEach(function(element, index, array) {
            expect(moreAccounts).toContain(element);
          });
          for (var i = 0; i < moreAccounts.length; i++) {
            if (accounts[i].name == 'Checking') {
              done();
            }
          }
          expect(false).toBeTruthy();
        });
      }
    });
  });
});
