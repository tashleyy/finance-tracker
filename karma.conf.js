module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js',
      'https://d3js.org/d3.v3.min.js',
      'assets/js/dbquery.js',
      'assets/DBQuerySpec.js',
      'assets/js/graph.js'
    ],
    browsers: ['Firefox'],
    singleRun: true,
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'assets/js/dbquery.js': ['coverage']
    },
    proxies: {
      '/login': 'http://localhost:1337/login',
      '/account': 'http://localhost:1337/account',
      '/transaction': 'http://localhost:1337/transaction',
      '/logout': 'http://localhost:1337/logout',
      '/budget': 'http://localhost:1337/budget'
    }
  });
};
