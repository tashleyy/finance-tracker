function getAccounts(cb) {
  $.ajax({
    url: '/account',
    type: 'get',
    success: cb
  });
}
function deleteAccount(accountName, cb) {
  $.ajax({
    url: '/account',
    type: 'delete',
    data: {
      name: accountName,
    },
    success: cb,
    error: function (xhr, status, err) {
      alert('Failed to delete account.');
    },
  });
}
function addAccount(accountName, cb) {
  $.ajax({
    url: '/account',
    type: 'post',
    data: {
      name: accountName,
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