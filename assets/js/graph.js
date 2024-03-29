/* eslint no-unused-vars: "off" */

var margin = {top: 20, right: 20, bottom: 30, left: 40};
var width = 400 - margin.left - margin.right;
var height = 300 - margin.top - margin.bottom;
var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);
var xAxis = d3.svg.axis().scale(x).orient('bottom');
var yAxis = d3.svg.axis().scale(y).orient('left');
xAxis.ticks(6);
var svg;
var parseTime = d3.time.format('%Y-%m-%dT%H:%M:%S.%LZ');
var line = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.balance); });
var minY;
var maxY;

function setupGraph(ownerId) {
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
  past.setMonth(past.getMonth() - 3);
  x.domain([past, today]);
  y.domain([-500, 500]);
  svg.select('.xAxis').call(xAxis);
  svg.select('.yAxis').call(yAxis);
  svg.selectAll('path.line').attr('d', line);
  graphTotals(ownerId);
}

function graphAccount(ownerId, accountName) {
  getAccountGraphData(ownerId, accountName, function(finalData) {
    for (var i = 0; i < finalData.length; i++) {
      if (!minY || finalData[i].balance < minY) {
        minY = Number(finalData[i].balance);
      }
      if (!maxY || finalData[i].balance > maxY) {
        maxY = Number(finalData[i].balance);
      }
    }
    y.domain([minY - 10, maxY + 10]);
    svg.select('.yAxis').call(yAxis);
    var color = $('#' + accountName + 'Account').css('color');
    var newLine = svg.append('path')
      .datum(finalData)
      .attr('class', 'line')
      .style('stroke', color)
      .attr('id', accountName + 'Line')
      .attr('clip-path', 'url(#clip)')
      .attr('d', line);
  });
}

function ungraphAccount(ownerId, accountName) {
  $('#' + accountName + 'Line').remove();
}

function updateDateRange(start, end) {
  var startDate = new Date(start);
  var endDate = new Date(end);
  x.domain([startDate, endDate]);
  svg.select('.xAxis').call(xAxis);
  svg.selectAll('path.line').attr('d', line);
}

function graphTotals(ownerId) {
  getAllAccountGraphData(ownerId, function(totalAssetsData, totalLiabilitiesData, totalNetWorthData) {
    for (var i = 0; i < totalAssetsData.length; i++) {
      if (!minY || totalAssetsData[i].balance < minY) {
        minY = Number(totalAssetsData[i].balance);
      }
      if (!maxY || totalAssetsData[i].balance > maxY) {
        maxY = Number(totalAssetsData[i].balance);
      }
    }
    for (var j = 0; j < totalLiabilitiesData.length; j++) {
      if (!minY || totalLiabilitiesData[j].balance < minY) {
        minY = Number(totalLiabilitiesData[j].balance);
      }
      if (!maxY || totalLiabilitiesData[j].balance > maxY) {
        maxY = Number(totalLiabilitiesData[j].balance);
      }
    }
    for (var k = 0; k < totalNetWorthData.length; k++) {
      if (!minY || totalNetWorthData[k].balance < minY) {
        minY = Number(totalNetWorthData[k].balance);
      }
      if (!maxY || totalNetWorthData[k].balance > maxY) {
        maxY = Number(totalNetWorthData[k].balance);
      }
    }
    y.domain([minY - 10, maxY + 10]);
    svg.select('.yAxis').call(yAxis);
    ungraphAccount(ownerId, 'totalAssets');
    ungraphAccount(ownerId, 'totalLiabilities');
    ungraphAccount(ownerId, 'totalNetWorth');
    var newLine = svg.append('path')
      .datum(totalAssetsData)
      .attr('class', 'line')
      .attr('id', 'totalAssetsLine')
      .style('stroke', '#00cc66')
      .attr('clip-path', 'url(#clip)')
      .attr('d', line);
    var newLine2 = svg.append('path')
      .datum(totalLiabilitiesData)
      .attr('class', 'line')
      .attr('id', 'totalLiabilitiesLine')
      .style('stroke', '#ff5050')
      .attr('clip-path', 'url(#clip)')
      .attr('d', line);
    var newLine3 = svg.append('path')
      .datum(totalNetWorthData)
      .attr('class', 'line')
      .attr('id', 'totalNetWorthLine')
      .style('stroke', '#0099ff')
      .attr('clip-path', 'url(#clip)')
      .attr('d', line);
  });
}
