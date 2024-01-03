import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

// Set size
let w = 900;
let h = 180;
let padding = 40;

Promise.all([
  d3.csv("./data/insurance_by_states_2010.csv"),
  d3.csv("./data/insurance_by_states_2022.csv"),
]).then((dataset) => {
  let data = dataset[0];
  let data_property = "uninsured_percent";
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
        return parseFloat(d[data_property]);
      }),
    ])
    .range([h - padding, padding]);

  //Create SVG element
  let svg = d3
    .select("#insurance_by_states")
    .append("svg")
    .attr("width", w)
    .attr("height", h);

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
      return yScale(parseFloat(d[data_property]));
    })
    .attr("width", xScale.bandwidth())
    .attr("height", function (d) {
      return h - padding - yScale(parseFloat(d[data_property]));
    })
    .attr(
      "fill",
      (d) =>
        `rgb(${255 - d[data_property] * (66 / 25)}, ${
          241 - d[data_property] * (241 / 25)
        }, ${179 - d[data_property] * (141 / 25)})`
    );

  //Create labels
  svg
    .selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function (d) {
      return Math.round(parseFloat(d[data_property]));
    })
    .attr("text-anchor", "middle")
    .attr("x", function (d) {
      return xScale(d["Appendix"]) + xScale.bandwidth() / 2;
    })
    .attr("y", function (d) {
      return yScale(parseFloat(d[data_property])) + 14;
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
  d3.select("#uninsured_2010").on("click", () => {
    data = dataset[0];
    data_property = "uninsured_percent";
    // Update all rects
    svg
      .selectAll("rect")
      .data(data)
      .transition()
      .attr("y", (d) => yScale(parseFloat(d[data_property])))
      .attr("height", (d) => h - padding - yScale(parseFloat(d[data_property])))
      .attr(
        "fill",
        (d) =>
          `rgb(${255 - d[data_property] * (66 / 25)}, ${
            241 - d[data_property] * (241 / 25)
          }, ${179 - d[data_property] * (141 / 25)})`
      );

    // Update all labels
    svg
      .selectAll("text")
      .data(data)
      .text((d) => Math.round(parseFloat(d[data_property])))
      .attr("y", (d) => yScale(parseFloat(d[data_property])) + 14);
  });
  d3.select("#uninsured_2022").on("click", () => {
    data = dataset[1];
    data_property = "uninsured_percent";
    // Update all rects
    svg
      .selectAll("rect")
      .data(data)
      .transition()
      .attr("y", (d) => yScale(parseFloat(d[data_property])))
      .attr("height", (d) => h - padding - yScale(parseFloat(d[data_property])))
      .attr(
        "fill",
        (d) =>
          `rgb(${255 - d[data_property] * (66 / 25)}, ${
            241 - d[data_property] * (241 / 25)
          }, ${179 - d[data_property] * (141 / 25)})`
      );

    // Update all labels
    svg
      .selectAll("text")
      .data(data)
      .text((d) => Math.round(parseFloat(d[data_property])))
      .attr("y", (d) => yScale(parseFloat(d[data_property])) + 14);
  });
  d3.select("#medicaid_2010").on("click", () => {
    data = dataset[0];
    data_property = "medicaid_percent";
    // Update all rects
    svg
      .selectAll("rect")
      .data(data)
      .transition()
      .attr("y", (d) => yScale(parseFloat(d[data_property])))
      .attr("height", (d) => h - padding - yScale(parseFloat(d[data_property])))
      .attr(
        "fill",
        (d) =>
          `rgb(${254 - d[data_property] * (254 / 36)}, ${
            217 - d[data_property] * (74 / 36)
          }, ${118 - d[data_property] * (68 / 36)})`
      );

    // Update all labels
    svg
      .selectAll("text")
      .data(data)
      .text((d) => Math.round(parseFloat(d[data_property])))
      .attr("y", (d) => yScale(parseFloat(d[data_property])) + 14);
  });
  d3.select("#medicaid_2022").on("click", () => {
    data = dataset[1];
    data_property = "medicaid_percent";
    // Update all rects
    svg
      .selectAll("rect")
      .data(data)
      .transition()
      .attr("y", (d) => yScale(parseFloat(d[data_property])))
      .attr("height", (d) => h - padding - yScale(parseFloat(d[data_property])))
      .attr(
        "fill",
        (d) =>
          `rgb(${254 - d[data_property] * (254 / 36)}, ${
            217 - d[data_property] * (74 / 36)
          }, ${118 - d[data_property] * (68 / 36)})`
      );
    // Update all labels
    svg
      .selectAll("text")
      .data(data)
      .text((d) => Math.round(parseFloat(d[data_property])))
      .attr("y", (d) => yScale(parseFloat(d[data_property])) + 14);
  });
});
