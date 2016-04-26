/**
 * BudgetController
 *
 * @description :: Server-side logic for managing budgets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  find: function(req, res) {
    var params = req.params.all();
    if (!params.startDate || !params.endDate) {
      return res.badRequest();
    }
    Transaction.find({
      ownerId: params.ownerId,
      date: {'>=': new Date(params.startDate), '<': new Date(params.endDate)}
    }).exec(function transactionsFound(err, transactions) {
      if (err) {
        return res.serverError();
      }
      var groceries = {first: 0, second: 0};
      var dining = {first: 0, second: 0};
      var entertainment = {first: 0, second: 0};
      var utilities = {first: 0, second: 0};
      var other = {first: 0, second: 0};
      transactions.forEach(function(value) {
        if (value.category === 'Groceries') {
          groceries.first -= value.amount;
        } else if (value.category === 'Dining') {
          dining.first -= value.amount;
        } else if (value.category === 'Entertainment') {
          entertainment.first -= value.amount;
        } else if (value.category === 'Utilities') {
          utilities.first -= value.amount;
        } else if (value.category === 'Other') {
          other.first -= value.amount;
        }
      });
      var date = new Date(params.startDate);
      Budget.find({ownerId: params.ownerId, year: date.getYear() + 1900, month: date.getMonth() + 1})
      .exec(function budgetsFound(err, budgets) {
        if (err) {
          return res.serverError();
        }
        budgets.forEach(function(value) {
          if (value.category === 'Groceries') {
            groceries.second = value.max;
          } else if (value.category === 'Dining') {
            dining.second = value.max;
          } else if (value.category === 'Entertainment') {
            entertainment.second = value.max;
          } else if (value.category === 'Utilities') {
            utilities.second = value.max;
          } else if (value.category === 'Other') {
            other.second = value.max;
          }
        });
        var data = {
          groceries: groceries,
          dining: dining,
          entertainment: entertainment,
          utilities: utilities,
          other: other
        };
        return res.ok(data);
      });
    });
  }
};

