/* eslint no-unused-vars: "off" */

/* istanbul ignore next */
function handleError(xhr, status, err) {
  console.log(err);
}

function login(email, password, cb) {
  $.ajax({
    url: '/login',
    type: 'post',
    data: {
      email: email,
      password: password
    }
  }).always(cb);
}

function getAccounts(ownerId, cb) {
  $.ajax({
    url: '/account',
    type: 'get',
    data: {
      ownerId: ownerId
    },
    success: cb,
    error: handleError
  });
}

function deleteAccount(ownerId, accountName, cb) {
  $.ajax({
    url: '/account',
    type: 'delete',
    data: {
      name: accountName,
      ownerId: ownerId
    },
    success: cb,
    error: handleError
  });
}

function addAccount(ownerId, accountName, balance, cb) {
  $.ajax({
    url: '/account',
    type: 'post',
    data: {
      name: accountName,
      ownerId: ownerId,
      balance: balance
    },
    success: cb,
    error: handleError
  });
}

function logout(cb) {
  $.ajax({
    url: '/logout',
    type: 'post'
  }).always(cb);
}

function getTransactions(ownerId, accountName, cb) {
  $.ajax({
    url: '/transaction',
    type: 'get',
    data: {
      ownerId: ownerId,
      accountName: accountName
    },
    success: cb,
    error: handleError
  });
}

function addTransaction(ownerId, accountName, amount, merchant, category, date, cb) {
  $.ajax({
    url: '/transaction',
    type: 'post',
    data: {
      ownerId: ownerId,
      accountName: accountName,
      amount: amount,
      merchant: merchant,
      category: category,
      date: date
    },
    success: cb,
    error: handleError
  });
}

function getAccount(ownerId, accountName, cb) {
  $.ajax({
    url: '/account',
    type: 'get',
    data: {
      ownerId: ownerId,
      name: accountName
    },
    success: function(data) {
      cb(data[0]);
    },
    error: handleError
  });
}

function getAccountGraphData(ownerId, accountName, cb) {
  getTransactions(ownerId, accountName, function(data) {
    data.sort(function(a, b) {
      if (a.date > b.date) { return -1; }
      if (a.date < b.date) { return 1; }
      return 0;
    });
    getAccount(ownerId, accountName, function(account) {
      var transformedData = {};
      var todayDate = new Date().toISOString();
      transformedData[todayDate] = account.balance;
      if (data.length > 0) { transformedData[data[0].date] = account.balance; }
      data.forEach(function(element, index, array) {
        var dayBefore = new Date(element.date);
        dayBefore.setDate(dayBefore.getDate() - 1);
        dayBefore = dayBefore.toISOString();
        var prevTransactionDate = dayBefore;
        if (index + 1 < array.length && array[index].date !== array[index + 1].date) { prevTransactionDate = array[index + 1].date; }
        if (transformedData[dayBefore]) {
          transformedData[dayBefore] -= element.amount;
        } else {
          transformedData[dayBefore] = transformedData[element.date] - element.amount;
        }
        transformedData[prevTransactionDate] = transformedData[dayBefore];
      });
      var finalData = [];
      for (var prop in transformedData) {
        finalData.push({
          date: parseTime.parse(prop),
          balance: transformedData[prop]
        });
      }
      cb(finalData);
    });
  });
}

function getAllAccountGraphData(ownerId, cb) {
  getAccounts(ownerId, function(accounts) {
    var finalTotalAssets = [];
    var finalTotalLiabilities = [];
    var finalTotalNetWorth = [];
    var allAccounts = [];
    var counters = [];
    var lastAssets = [];
    var lastLiabilities = [];
    accounts.forEach(function(value, index, array) {
      getAccountGraphData(ownerId, value.name, function(finalData) {
        finalData.sort(function(a, b) {
          if (a.date < b.date) { return -1; }
          if (a.date > b.date) { return 1; }
          return 0;
        });
        allAccounts.push(finalData);
        counters.push(0);
        lastAssets.push(0);
        lastLiabilities.push(0);
        if (allAccounts.length && allAccounts.length === array.length) {
          var done = true;
          for (let i = 0; i < allAccounts.length; i++) {
            if (counters[i] < allAccounts[i].length) {
              done = false;
              break;
            }
          }
          while (!done) {
            let minDate;
            for (let i = 0; i < allAccounts.length; i++) {
              if (counters[i] < allAccounts[i].length && (!minDate || allAccounts[i][counters[i]].date < minDate)) {
                minDate = allAccounts[i][counters[i]].date;
              }
            }
            var newAssets = 0;
            var newLiabilities = 0;
            for (let i = 0; i < allAccounts.length; i++) {
              if (counters[i] < allAccounts[i].length && dateEqual(allAccounts[i][counters[i]].date, minDate)) {
                if (allAccounts[i][counters[i]].balance >= 0) {
                  lastAssets[i] = allAccounts[i][counters[i]].balance;
                  lastLiabilities[i] = 0;
                } else {
                  lastAssets[i] = 0;
                  lastLiabilities[i] = allAccounts[i][counters[i]].balance;
                }
                counters[i]++;
              }
              newAssets += lastAssets[i];
              newLiabilities += lastLiabilities[i];
            }
            finalTotalAssets.push({
              date: new Date(minDate),
              balance: newAssets
            });
            finalTotalLiabilities.push({
              date: new Date(minDate),
              balance: newLiabilities
            });
            done = true;
            for (let i = 0; i < allAccounts.length; i++) {
              if (counters[i] < allAccounts[i].length) {
                done = false;
                break;
              }
            }
          }
          for (let i = 0; i < finalTotalAssets.length; i++) {
            finalTotalNetWorth.push({
              date: new Date(finalTotalAssets[i].date),
              balance: Number(finalTotalAssets[i].balance) + Number(finalTotalLiabilities[i].balance)
            });
          }
          cb(finalTotalAssets, finalTotalLiabilities, finalTotalNetWorth);
        }
      });
    });
  });

  function dateEqual(date1, date2) {
    var a = new Date(date1);
    var b = new Date(date2);
    return (a.getYear() === b.getYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate());
  }
}
