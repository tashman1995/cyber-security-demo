// Function for adding minutes to datenow
Date.prototype.addMinutes = function (m) {
  this.setTime(this.getTime() + m * 60 * 1000);
  return this;
};

// Initalise intial Date boundaries
var minDate = new Date();
var maxDate = new Date().addMinutes(3);

export const initializeGraph = (data) => {
  // Clear Previous Graph
  document.getElementById("graph").innerHTML = "";

  //   Grab width of graph element
  const width = document.getElementsByClassName("graph")[0].clientWidth;
  const height = document.getElementsByClassName("graph")[0].clientHeight;

  //   Re adjust axis when graph full of data
  if (data.length >= 180) {
    minDate = new Date().addMinutes(-3);
    maxDate = new Date();
  }

  //   Y axis max
  var maxBreaches = d3.max(data, function (d) {
    return d.value;
  });
  // X axis
  var x = d3
    .scaleTime()
    .domain([minDate, maxDate])
    .range([0, width - 120]);

  // Y axis
  var y = d3
    .scaleLinear()
    .domain([0, maxBreaches])
    .range([height - 95, 0]);

  var yAxis = d3.axisLeft(y);
  var xAxis = d3.axisBottom(x);

  //   Create SVG Element
  var svg = d3
    .select("#graph")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%");

  // Create graph
  var chartGroup = svg
    .append("g")
    .attr("transform", "translate(60,10)")
    .attr("height", "100%")
    .attr("width", "80%");

  // Generate data line
  var line = d3
    .line()
    .defined(function (d) {
      return d.time > minDate;
    })
    .x(function (d) {
      return x(d.time);
    })
    .y(function (d) {
      return y(d.value);
    });

  // Add X axis label:
  svg
    .append("text")
    .attr("class", "axis-title")
    .attr("text-anchor", "end")
    .attr("x", width / 2)
    .attr("y", height - 45)
    .text("Time");

  // Y axis label:
  svg
    .append("text")
    .attr("class", "axis-title")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", 20)
    .attr("x", -10)
    .text("Total Breaches");

  // Add line to graph
  chartGroup.append("path").attr("d", line(data));
  chartGroup
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, 157)")
    .call(xAxis);
  chartGroup.append("g").attr("class", "y axis").call(yAxis);
};
