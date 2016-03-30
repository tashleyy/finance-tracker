/**
 * AccountController
 *
 * @description :: Server-side logic for managing accounts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  create: function(req, res) {
    var params = req.params.all();
    Account.findOne({ name: params.name }).exec(function accountFound(err, account) {
      if(err) {
        return res.serverError();
      }
      if (account) {
        return res.badRequest();
      }
      Account.create(params, function accountCreated(err, account) {
        if (err) {
          return res.serverError();
        }
        Account.find().exec(function accountsFound(err, accounts) {
          if (err) {
            return res.serverError();
          }
          return res.ok(accounts);
        });
      });
    });
  },
  destroy: function(req, res) {
    var params = req.params.all();
    Account.destroy({ name: params.name }).exec(function (err) {
      if (err) {
        return res.serverError();
      }
      Account.find().exec(function accountsFound(err, accounts) {
        if (err) {
          return res.serverError();
        }
        return res.ok(accounts);
      });
    });
  },
};

