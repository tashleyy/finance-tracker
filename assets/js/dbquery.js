/* eslint no-unused-vars: "off" */

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
