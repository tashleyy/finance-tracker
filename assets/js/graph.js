/* eslint no-unused-vars: "off" */

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
  past.setMonth(past.getMonth() - 6);
  x.domain([past, today]);
  y.domain([-500, 500]);
  svg.select('.xAxis').call(xAxis);
  svg.select('.yAxis').call(yAxis);
  svg.selectAll('path.line').attr('d', line);

  getAllAccountGraphData(ownerId, function(totalAssetsData, totalLiabilitiesData, totalNetWorthData) {
    for (let i = 0; i < totalAssetsData.length; i++) {
      if (!minY || totalAssetsData[i].balance < minY) {
        minY = Number(totalAssetsData[i].balance);
      }
      if (!maxY || totalAssetsData[i].balance > maxY) {
        maxY = Number(totalAssetsData[i].balance);
      }
    }
    for (let i = 0; i < totalLiabilitiesData.length; i++) {
      if (!minY || totalLiabilitiesData[i].balance < minY) {
        minY = Number(totalLiabilitiesData[i].balance);
      }
      if (!maxY || totalLiabilitiesData[i].balance > maxY) {
        maxY = Number(totalLiabilitiesData[i].balance);
      }
    }
    for (let i = 0; i < totalNetWorthData.length; i++) {
      if (!minY || totalNetWorthData[i].balance < minY) {
        minY = Number(totalNetWorthData[i].balance);
      }
      if (!maxY || totalNetWorthData[i].balance > maxY) {
        maxY = Number(totalNetWorthData[i].balance);
      }
    }
    y.domain([minY, maxY]);
    svg.select('.yAxis').call(yAxis);
    var newLine = svg.append('path')
      .datum(totalAssetsData)
      .attr('class', 'line')
      .attr('id', 'totalAssetsLine')
      .attr('clip-path', 'url(#clip)')
      .attr('d', line);
    var newLine2 = svg.append('path')
      .datum(totalLiabilitiesData)
      .attr('class', 'line')
      .attr('id', 'totalLiabilitiesLine')
      .attr('clip-path', 'url(#clip)')
      .attr('d', line);
    var newLine3 = svg.append('path')
      .datum(totalNetWorthData)
      .attr('class', 'line')
      .attr('id', 'totalNetWorthLine')
      .attr('clip-path', 'url(#clip)')
      .attr('d', line);
  });
}

function graphAccount(ownerId, accountName) {
  getAccountGraphData(ownerId, accountName, function(finalData) {
    for (let i = 0; i < finalData.length; i++) {
      if (!minY || finalData.balance < minY) {
        minY = Number(finalData.balance);
      }
      if (!maxY || finalData.balance > maxY) {
        maxY = Number(finalData.balance);
      }
    }
    y.domain([minY, maxY]);
    svg.select('.yAxis').call(yAxis);
    var newLine = svg.append('path')
      .datum(finalData)
      .attr('class', 'line')
      .attr('id', accountName + 'Line')
      .attr('clip-path', 'url(#clip)')
      .attr('d', line);
  });
}

function ungraphAccount(ownerId, accountName) {
  $('#' + accountName + 'Line').remove();
}
