/**
 * TransactionController
 *
 * @description :: Server-side logic for managing transactions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
/* eslint no-unused-vars: "off" */

module.exports = {
  create: function (req, res) {
    var params = req.params.all();
    if (!params.amount || !params.accountName || !params.merchant || !params.ownerId || !params.date) {
      return res.badRequest();
    }
    Account.findOne({ name: params.accountName, ownerId: params.ownerId }).exec(function accountFound(err, account) {
      if (err) {
        return res.serverError();
      }
      if (!account) {
        return res.notFound();
      }
      Transaction.create(params, function transactionCreated(err, transaction) {
        if (err) {
          return res.serverError();
        }
        account.balance += transaction.amount;
        account.save(function accountSaved(err, savedAccount) {
          if (err) {
            return res.serverError();
          }
          return res.json(201, transaction); // 201 indicates successful creation          
        });
      });
    });
  }
};

