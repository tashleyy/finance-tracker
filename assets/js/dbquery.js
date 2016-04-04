function getAccounts(ownerId, cb) {
  $.ajax({
    url: '/me/account',
    type: 'get',
    data: {
      ownerId: ownerId,
    },
    success: cb
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
    error: function (xhr, status, err) {
      alert('Failed to delete account.');
    },
  });
}
function addAccount(ownerId, accountName, cb) {
  $.ajax({
    url: '/account',
    type: 'post',
    data: {
      name: accountName,
      ownerId: ownerId,
    },
    success: cb,
    error: function (xhr, status, err) {
      alert('Failed to add account.');
    },
  });
}
function logout() {
  $.ajax({
    url: '/logout',
    type: 'post',
  }).always(function (data) {
    location = '/';
  });
}