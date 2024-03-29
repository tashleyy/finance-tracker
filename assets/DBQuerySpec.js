describe('DBQuery', function() {
  var ownerId;
  beforeEach(function(done) {
    login('ttjahjad@usc.edu', 'password', function(data) {
      if (data && data.user && data.user.id) {
        ownerId = data.user.id;
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
    getAccounts(ownerId, function(accounts) {
      var found = false;
      for (var i = 0; i < accounts.length; i++) {
        if (accounts[i].name === 'Checking') {
          found = true;
          break;
        }
      }
      if (found) {
        deleteAccount(ownerId, 'Checking', function() {
          addAccount(ownerId, 'Checking', '200.00', function(moreAccounts) {
            for (var i = 0; i < moreAccounts.length; i++) {
              if (moreAccounts[i].name === 'Checking') {
                expect(moreAccounts[i].balance).toEqual(200);
                expect(moreAccounts[i].ownerId).toEqual(ownerId);
                done();
                break;
              }
            }
          });
        });
      } else {
        addAccount(ownerId, 'Checking', '200.00', function(moreAccounts) {
          accounts.forEach(function(element) {
            expect(moreAccounts).toContain(element);
          });
          for (var i = 0; i < moreAccounts.length; i++) {
            if (moreAccounts[i].name === 'Checking') {
              expect(moreAccounts[i].balance).toEqual(200);
              done();
              break;
            }
          }
        });
      }
    });
  });

  it('should be able to get Transactions', function(done) {
    getAccounts(ownerId, function(accounts) {
      if (accounts.length === 0) {
        addAccount(ownerId, 'Checking', function() {
          getTransactions(ownerId, 'Checking', function(transactions) {
            expect(transactions).toBeDefined();
            expect(transactions).toEqual(jasmine.any(Array));
            transactions.forEach(function(value) {
              expect(value.accountName).toEqual('Checking');
            });
            done();
          });
        });
      } else {
        getTransactions(ownerId, accounts[0].name, function(transactions) {
          expect(transactions).toBeDefined();
          expect(transactions).toEqual(jasmine.any(Array));
          transactions.forEach(function(value) {
            expect(value.accountName).toEqual(accounts[0].name);
          });
          done();
        });
      }
    });
  });

  it('should be able to add Transaction', function(done) {
    getAccounts(ownerId, function(accounts) {
      if (accounts.length === 0) {
        addAccount(ownerId, 'Checking', function() {
          addTransaction(ownerId, 'Checking', '-21.21', 'testmerch', 'Other', '2016-02-14', function(transaction) {
            expect(transaction.accountName).toEqual('Checking');
            expect(transaction.amount).toEqual(-21.21);
            expect(transaction.ownerId).toEqual(ownerId);
            expect(transaction.merchant).toEqual('testmerch');
            expect(transaction.category).toEqual('Other');
            done();
          });
        });
      } else {
        addTransaction(ownerId, accounts[0].name, '-21.21', 'testmerch', 'Other', '2016-02-14', function(transaction) {
          expect(transaction.accountName).toEqual(accounts[0].name);
          expect(transaction.amount).toEqual(-21.21);
          expect(transaction.ownerId).toEqual(ownerId);
          expect(transaction.merchant).toEqual('testmerch');
          expect(transaction.category).toEqual('Other');
          done();
        });
      }
    });
  });

  it('should be able to get Account graph data', function(done) {
    var accountsExist = false;
    getAccounts(ownerId, function(accounts) {
      // Test is only applicable if an account exists
      if (accounts.length === 0) {
        expect(accountsExist).toBeFalsy();
        done();
      } else {
        getAccountGraphData(ownerId, accounts[0].name, function(data) {
          expect(data).toBeDefined();
          expect(data).toEqual(jasmine.any(Array));
          expect((new Set(data)).size).toEqual(data.length);
          done();
        });
      }
    });
  });

  it('should be able to delete Account', function(done) {
    getAccounts(ownerId, function(accounts) {
      if (accounts.length === 0) {
        addAccount(ownerId, 'Checking', function() {
          deleteAccount(ownerId, 'Checking', function(data) {
            data.forEach(function(element) {
              expect(element.name).not.toEqual('Checking');
            });
            done();
          });
        });
      } else {
        deleteAccount(ownerId, accounts[0].name, function(data) {
          data.forEach(function(element) {
            expect(element.name).not.toEqual(accounts[0].name);
          });
          done();
        });
      }
    });
  });

  it('should handle bad requests', function(done) {
    addTransaction(ownerId, 'Checking', '-21.21', 'testmerch', 'badcategory', '2016-02-14', function() {
      expect(true).toBeFalsy();
    });
    done();
  });

  it('should be able to get all Account graph data', function(done) {
    getAllAccountGraphData(ownerId, function(totalAssets, totalLiabilities, totalNetWorth) {
      expect(totalAssets).toBeDefined();
      expect(totalAssets).toEqual(jasmine.any(Array));
      expect((new Set(totalAssets)).size).toEqual(totalAssets.length);
      expect(totalLiabilities).toBeDefined();
      expect(totalLiabilities).toEqual(jasmine.any(Array));
      expect((new Set(totalLiabilities)).size).toEqual(totalLiabilities.length);
      expect(totalNetWorth).toBeDefined();
      expect(totalNetWorth).toEqual(jasmine.any(Array));
      expect((new Set(totalNetWorth)).size).toEqual(totalNetWorth.length);
      done();
    });
  });

  it('should be able to get Budgets', function(done) {
    getBudgets(ownerId, 2016, 4, function(data) {
      expect(data.groceries.first).toBeDefined();
      expect(data.groceries.second).toBeDefined();
      expect(data.dining.first).toBeDefined();
      expect(data.dining.second).toBeDefined();
      expect(data.entertainment.first).toBeDefined();
      expect(data.entertainment.second).toBeDefined();
      expect(data.utilities.first).toBeDefined();
      expect(data.utilities.second).toBeDefined();
      expect(data.other.first).toBeDefined();
      expect(data.other.second).toBeDefined();
      done();
    });
  });

  it('should be able to set Budget', function(done) {
    setBudget(ownerId, 'Groceries', 500, function(data) {
      expect(data).toBeDefined();
      var date = new Date();
      expect(data.year).toEqual(date.getYear() + 1900);
      expect(data.month).toEqual(date.getMonth() + 1);
      expect(data.category).toEqual('Groceries');
      expect(data.max).toEqual(500);
      expect(data.ownerId).toEqual(ownerId);
      done();
    });
  });
});
