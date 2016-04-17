var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 400 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis().scale(x).orient('bottom');
var yAxis = d3.svg.axis().scale(y).orient('left');
var svg;
var parseTime = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ');
var line = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.balance); });

function setupGraph() {
  svg = d3.select('#graph').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  svg.append('g')
    .attr('class', 'axis xAxis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis)
  .append('text')
    .attr('class', 'axis-title')
    .attr('y', -10)
    .attr('x', width)
    .attr('dx', '.71em')
    .style('text-anchor', 'end')
    .text('Time');
  svg.append('g')
    .attr('class', 'axis yAxis')
    .call(yAxis)
  .append('text')
    .attr('class', 'axis-title')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '.71em')
    .style('text-anchor', 'end')
    .text('Balance ($)');

  svg.append('clipPath')
    .attr('id', 'clip')
    .append('rect')
    .attr('width', width)
    .attr('height', height);
    
  var today = new Date();
  var past = new Date();
  past.setMonth(past.getMonth()-6);
  x.domain([past, today]);
  y.domain([0, 500]);
  svg.select('.xAxis').call(xAxis);
  svg.select('.yAxis').call(yAxis);
  svg.selectAll('path.line').attr('d', line);
}

function graphAccount(ownerId, accountName) {
  getTransactions(ownerId, accountName, function(data) {
    data.sort(function(a, b) {
      if (a.date > b.date) return -1;
      if (a.date < b.date) return 1;
      return 0;
    });
    getAccount(ownerId, accountName, function(account) {
      var transformedData = {};
      var todayDate = new Date().toISOString();
      transformedData[todayDate] = account.balance;
      if (data.length > 0) transformedData[data[0].date] = account.balance;
      data.forEach(function(element, index, array) {
        var dayBefore = new Date(element.date);
        dayBefore.setDate(dayBefore.getDate()-1);
        dayBefore = dayBefore.toISOString();
        var prevTransactionDate = dayBefore;
        if (index+1 < array.length && array[index].date != array[index+1].date) prevTransactionDate = array[index+1].date;
        if (transformedData[dayBefore]) transformedData[dayBefore] -= element.amount;
        else transformedData[dayBefore] = transformedData[element.date] - element.amount;
        transformedData[prevTransactionDate] = transformedData[dayBefore];
      });
      var finalData = [];
      for (var prop in transformedData) {
        finalData.push({
          date: parseTime.parse(prop),
          balance: transformedData[prop]
        });
      }
      var newLine = svg.append('path')
        .datum(finalData)
        .attr('class', 'line')
        .attr('clip-path', 'url(#clip)')
        .attr('d', line);
    });
  });
}

function ungraphAccount(ownerId, accountName) {
  console.log('ungraph');
}