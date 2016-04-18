/**
 * DashboardController
 *
 * @description :: Server-side logic for managing dashboards
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `DashboardController.render()`
   */
  render: function(req, res) {
    return res.view('dashboard');
  }
};

