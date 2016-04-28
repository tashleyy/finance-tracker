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
      var categories = ['Groceries', 'Dining', 'Entertainment', 'Utilities', 'Other'];
      var numDone = 0;
      categories.forEach(function(value) {
        Budget.findOne({
          ownerId: params.ownerId,
          category: value,
          year: date.getYear() + 1900,
          month: date.getMonth() + 1
        }).exec(function budgetFound(err, budget) {
          if (err) {
            return res.serverError();
          }
          if (budget) {
            if (value === 'Groceries') {
              groceries.second = budget.max;
            } else if (value === 'Dining') {
              dining.second = budget.max;
            } else if (value === 'Entertainment') {
              entertainment.second = budget.max;
            } else if (value === 'Utilities') {
              utilities.second = budget.max;
            } else if (value === 'Other') {
              other.second = budget.max;
            }
            numDone++;
            if (numDone === 5) {
              var data = {
                groceries: groceries,
                dining: dining,
                entertainment: entertainment,
                utilities: utilities,
                other: other
              };
              return res.ok(data);
            }
          } else {
            var lastMonth = new Date(params.startDate);
            lastMonth.setMonth(lastMonth.getMonth() - 1);
            Budget.findOne({
              ownerId: params.ownerId,
              category: value,
              year: lastMonth.getYear() + 1900,
              month: date.getMonth() + 1
            }).exec(function lastBudgetFound(err, lastBudget) {
              if (err) {
                return res.serverError();
              }
              if (lastBudget) {
                if (value === 'Groceries') {
                  groceries.second = lastBudget.max;
                } else if (value === 'Dining') {
                  dining.second = lastBudget.max;
                } else if (value === 'Entertainment') {
                  entertainment.second = lastBudget.max;
                } else if (value === 'Utilities') {
                  utilities.second = lastBudget.max;
                } else if (value === 'Other') {
                  other.second = lastBudget.max;
                }
              }
              numDone++;
              if (numDone === 5) {
                var data = {
                  groceries: groceries,
                  dining: dining,
                  entertainment: entertainment,
                  utilities: utilities,
                  other: other
                };
                return res.ok(data);
              }
            });
          }
        });
      });
    });
  },

  update: function(req, res) {
    var params = req.params.all();
    if (!params.ownerId || !params.category || !params.max) {
      return res.serverError();
    }
    var today = new Date();
    var year = today.getYear() + 1900;
    var month = today.getMonth() + 1;
    Budget.update({
      ownerId: params.ownerId,
      year: year,
      month: month,
      category: params.category
    }, {max: params.max}).exec(function budgetUpdated(err, budgets) {
      if (err) {
        return res.serverError();
      }
      var budget = budgets[0];
      if (budget) {
        return res.ok(budget);
      }
      Budget.create({
        ownerId: params.ownerId,
        year: year,
        month: month,
        category: params.category,
        max: params.max
      }).exec(function budgetCreated(err, newBudget) {
        if (err) {
          return res.serverError();
        }
        return res.json(201, newBudget);
      });
    });
  }
};

