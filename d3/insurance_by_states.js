import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Width and height
let w = 1000;
let h = 250;
let padding = 40;

Promise.all([
  d3.csv("insurance_by_states_2010.csv"),
  d3.csv("insurance_by_states_2022.csv"),
]).then((dataset) => {
  let data = dataset[0];
  let xScale = d3
    .scaleBand()
    .domain(
      data.map(function (d) {
        return d["Appendix"];
      })
    )
    .range([padding, w - padding])
    .padding(0.1);

  let yScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, function (d) {
        return parseFloat(d["uninsured_percent"]);
      }),
    ])
    .range([h - padding, padding]);

  //Create SVG element
  let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

  //Create bars
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return xScale(d["Appendix"]);
    })
    .attr("y", function (d) {
      return yScale(parseFloat(d["uninsured_percent"]));
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return h - padding - yScale(parseFloat(d["uninsured_percent"]));
    })
    .attr(
      "fill",
      (d) => "rgb(0, 0, " + Math.round(d["uninsured_percent"] * 10) + ")"
    );

  //Create labels
  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function (d) {
      return Math.round(parseFloat(d["uninsured_percent"]));
    })
    .attr("text-anchor", "middle")
    .attr("x", function (d) {
      return xScale(d["Appendix"]) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
      return yScale(parseFloat(d["uninsured_percent"])) + 14;
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "10px")
    .attr("fill", "white");

  // Create x axis
  let xAxis = d3.axisBottom().scale(xScale);
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .call(xAxis);

  //On click, update with new data
  d3.select("button").on("click", () => {
    data = dataset[1];

    // Update all rects
    svg
      .selectAll("rect")
      .data(data)
      .transition()
      .attr("y", (d) => yScale(parseFloat(d["uninsured_percent"])))
      .attr(
        "height",
        (d) => h - padding - yScale(parseFloat(d["uninsured_percent"]))
      )
      .attr(
        "fill",
        (d) => "rgb(0, 0, " + Math.round(d["uninsured_percent"] * 10) + ")"
      );

    // Update all labels
    svg
      .selectAll("text")
      .data(data)
      .text((d) => Math.round(parseFloat(d["uninsured_percent"])))
      .attr("y", (d) => yScale(parseFloat(d["uninsured_percent"])) + 14);
  });
});
