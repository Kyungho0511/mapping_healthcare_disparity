import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Set size
const margin = { top: 10, right: 30, bottom: 10, left: 30 };
const width = popupWidth - margin.left - margin.right;
const height = 120 - margin.top - margin.bottom;

const data = [
  { category: "medicaid", value1: 18, value2: 23 },
  { category: "uninsured", value1: 30, value2: 16 },
];

const svg = d3
  .select("#popup")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .attr("class", "popup_chart")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3
  .scaleLinear()
  .domain([0, 1]) // Two categories represented by 0 and 1
  .range([0, width]);

const min = 0;
const max = 40;
const y1 = d3.scaleLinear().domain([min, max]).range([height, 0]);
const y2 = d3.scaleLinear().domain([min, max]).range([height, 0]);

let tickValuesY1 = data.map((d) => d.value1);
let tickValuesY2 = data.map((d) => d.value2);
tickValuesY1 = [min, ...tickValuesY1, max];

// Append y1 axis and style
svg
  .append("g")
  .call(
    d3
      .axisLeft(y1)
      .tickValues(tickValuesY1)
      .tickSizeOuter(0)
      .tickFormat((d) => d + "%")
  )
  .select(".domain")
  .attr("stroke-dasharray", 4)
  .attr("stroke", "lightgrey");

// Append y2 axis and style
svg
  .append("g")
  .attr("transform", "translate(" + width + ", 0)")
  .call(
    d3
      .axisRight(y2)
      .tickValues(tickValuesY2)
      .tickSizeOuter(0)
      .tickFormat((d) => d + "%")
  )
  .select(".domain")
  .attr("stroke-dasharray", 4)
  .attr("stroke", "lightgrey");

svg.selectAll(".tick line").attr("stroke", "lightgrey");
svg.selectAll(".tick text").style("font-size", 10);

const line = svg
  .selectAll(".line")
  .data(data)
  .enter()
  .append("line")
  .attr("class", "line")
  .attr("x1", (d) => x(0))
  .attr("y1", (d) => y1(d.value1))
  .attr("x2", (d) => x(1))
  .attr("y2", (d) => y2(d.value2))
  .attr("stroke", (d) => (d.category === "medicaid" ? "green" : "red"))
  .attr("stroke-width", 2);

const circles = svg
  .selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => x(0))
  .attr("cy", (d) => y1(d.value1))
  .attr("r", 4)
  .style("fill", (d) => (d.category === "medicaid" ? "green" : "red"));

const circles2 = svg
  .selectAll("circle2")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", (d) => x(1))
  .attr("cy", (d) => y2(d.value2))
  .attr("r", 4)
  .style("fill", (d) => (d.category === "medicaid" ? "green" : "red"));
