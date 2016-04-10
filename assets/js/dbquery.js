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
    },
  }).always(cb);
}

function getAccounts(ownerId, cb) {
  $.ajax({
    url: '/account',
    type: 'get',
    data: {
      ownerId: ownerId,
    },
    success: cb,
    error: handleError,
  });
}

function deleteAccount(ownerId, accountName, cb) {
  $.ajax({
    url: '/account',
    type: 'delete',
    data: {
      name: accountName,
      ownerId: ownerId,
    },
    success: cb,
    error: handleError,
  });
}

function addAccount(ownerId, accountName, cb) {
  $.ajax({
    url: '/account',
    type: 'post',
    data: {
      name: accountName,
      ownerId: ownerId,
      balance: '500.00', // default for now
    },
    success: cb,
    error: handleError,
  });
}

function logout(cb) {
  $.ajax({
    url: '/logout',
    type: 'post',
  }).always(cb);
}

function getTransactions(ownerId, cb) {
  $.ajax({
    url: '/transaction',
    type: 'get',
    data: {
      ownerId: ownerId,
    },
    success: cb,
    error: handleError,
  });
}