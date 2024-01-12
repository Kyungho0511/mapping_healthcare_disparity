import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

const layerTypes = {
  fill: ["fill-opacity"],
  line: ["line-opacity"],
  circle: ["circle-opacity", "circle-stroke-opacity"],
  symbol: ["icon-opacity", "text-opacity"],
  raster: ["raster-opacity"],
  background: ["background-opacity"],
  symbol: ["text-opacity"],
  "fill-extrusion": ["fill-extrusion-opacity"],
};
const alignments = {
  left: "lefty",
  center: "centered",
  right: "righty",
};

/**
 * Main 'story' and header/footer
 */
const story = document.querySelector("#story");
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");
header.classList.add(config.theme);
footer.classList.add(config.theme);

/**
 * Features
 */
const features = document.createElement("section");
features.setAttribute("id", "features");

config.chapters.forEach((record, idx) => {
  const container = document.createElement("div");
  const chapter = document.createElement("div");

  // Creates the title for the vignettes
  if (record.title) {
    const title = document.createElement("h3");
    title.innerText = record.title;
    chapter.appendChild(title);
  }

  // Creates the description for the vignette
  if (record.description) {
    const description = document.createElement("p");
    description.innerHTML = record.description;
    chapter.appendChild(description);
  }

  // Creates the datasets for the vignette
  if (record.data && record.data.length > 1) {
    const datasetContainer = document.createElement("section");
    datasetContainer.classList.add("dataset_container");
    const datasetTitle = document.createElement("div");
    datasetTitle.classList.add("dataset_title");
    datasetTitle.innerHTML = "<h4>Select a dataset</h4>";
    const datasetToggle = document.createElement("div");
    datasetToggle.classList.add("dataset_toggle");

    record.data.forEach((d, idx) => {
      const radioBtn = document.createElement("input");
      if (idx == 0) radioBtn.setAttribute("checked", true);
      radioBtn.setAttribute("type", "radio");
      radioBtn.setAttribute("class", "btn-check");
      radioBtn.setAttribute("name", record.id);
      radioBtn.setAttribute("id", d);
      radioBtn.setAttribute("autocomplete", "off");
      radioBtn.addEventListener("click", (event) => {
        if (event.target.className !== "dataset_toggle") {
          record.dataIndex = record.data.indexOf(event.target.id);
          onCurrentLayer(record.data, record.dataIndex);
        }
      });
      const label = document.createElement("label");
      label.setAttribute("class", "btn");
      label.setAttribute("for", d);
      label.textContent = record.dataName[idx];
      datasetToggle.appendChild(radioBtn);
      datasetToggle.appendChild(label);
    });

    datasetContainer.appendChild(datasetTitle);
    datasetContainer.appendChild(datasetToggle);
    chapter.appendChild(datasetContainer);
  }

  // Creates the legends for the vignette
  if (record.legend) {
    const legend = document.createElement("section");
    legend.innerHTML = record.legend;
    chapter.appendChild(legend);
  }

  // Sets the id for the vignette and adds the step css attribute
  container.setAttribute("id", record.id);
  container.setAttribute("data-category", record.category);
  container.classList.add(alignments[record.alignment]);
  container.classList.add("step");
  if (idx === 0) {
    container.classList.add("active");
  }

  // Sets the overall theme to the chapter element
  chapter.classList.add(config.theme);
  container.appendChild(chapter);
  features.appendChild(container);
});

// Creates the popups
const popupWidth = 200;
const popupHeight = 180;
const popup = document.createElement("div");
popup.setAttribute("id", "popup");
popup.setAttribute("width", popupWidth);
popup.setAttribute("height", popupHeight);
popup.classList.add("invisible");
const popupText = document.createElement("div");
popup.appendChild(popupText);
story.appendChild(popup);

// Appends the features element (with the vignettes) to the story element
story.insertBefore(features, footer);

/**
 * Mapbox & Scrollama
 */
mapboxgl.accessToken = config.accessToken;
const transformRequest = (url) => {
  const hasQuery = url.indexOf("?") !== -1;
  const suffix = hasQuery
    ? "&pluginName=journalismScrollytelling"
    : "?pluginName=journalismScrollytelling";
  return {
    url: url + suffix,
  };
};

const map = new mapboxgl.Map({
  container: "map",
  style: config.style,
  center: config.chapters[0].location.center,
  zoom: config.chapters[0].location.zoom,
  bearing: config.chapters[0].location.bearing,
  pitch: config.chapters[0].location.pitch,
  scrollZoom: false,
  interactive: false,
  transformRequest: transformRequest,
});

// Instantiates the scrollama function
const scroller = scrollama();
let prevName = null;

map.on("load", function () {
  setHoverPaintProperty("united-states-outline-hover");
  setHoverPaintProperty("united-states-counties-outline-hover");
  setHoverPaintProperty("medicaid-disparity-counties-filter-line-hover-2021");
  setHoverPaintProperty("montgomery-cbg-outline-hover");
  setHoverPaintProperty("montgomery-filter-outline-hover");

  // Setup the instance, pass callback functions
  let intervalId = null;
  let isExiting = false;
  let mouseMoveHandlerWrapper = null;
  let mouseLeaveHandlerWrapper = null;

  scroller
    .setup({
      step: ".step",
      offset: 0.5,
      progress: true,
      preventDefault: true,
      threshold: 1,
    })
    .onStepEnter((response) => {
      const chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );
      map.flyTo(chapter.location);
      if (chapter.onChapterEnter.length > 0) {
        chapter.onChapterEnter.forEach(setLayerOpacity);
      }
      if (chapter.data) {
        if (chapter.data.length > 1) {
          onCurrentLayer(chapter.data, chapter.dataIndex);
          intervalId && clearInterval(intervalId);
          intervalId = setDatasetInterval(chapter, 2500);
        }
        map.on("mouseenter", chapter.data[0], mouseEnterHandler);
        mouseLeaveHandlerWrapper = () => {
          mouseLeaveHandler(chapter);
        };
        map.on("mouseleave", chapter.data[0], mouseLeaveHandlerWrapper);
        mouseMoveHandlerWrapper = (event) => {
          mouseMoveHandler(event, chapter);
        };
        map.on("mousemove", chapter.data[0], mouseMoveHandlerWrapper);
      }
      const selected = document.querySelector(
        `#header_${response.element.dataset.category}`
      );
      selectNavItem(selected);
    })
    .onStepExit((response) => {
      const chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );
      if (chapter.onChapterExit.length > 0) {
        chapter.onChapterExit.forEach(setLayerOpacity);
      }
      if (chapter.data && chapter.data.length > 1) {
        offLayers(chapter.data);
      }
      isExiting = false;
    })
    // onStepProgress is used to guarantee callback from onStepProgress always runs before
    // onStepEnter, since it is not guaranteed onStepExit triggers before onStepEnter
    .onStepProgress(({ progress, direction, element }) => {
      if (
        ((progress > 0.95 && direction == "down") ||
          (progress < 0.05 && direction == "up")) &&
        !isExiting
      ) {
        const chapter = config.chapters.find((chap) => chap.id === element.id);
        if (chapter.data) {
          if (chapter.data.length > 1) clearInterval(intervalId);
          map.off("mouseenter", chapter.data[0], mouseEnterHandler);
          map.off("mouseleave", chapter.data[0], mouseLeaveHandlerWrapper);
          map.off("mousemove", chapter.data[0], mouseMoveHandlerWrapper);
          offHover(chapter);
          popup.classList.add("invisible");
          map.getCanvas().style.cursor = "";
        }
        prevName = null;
        isExiting = true;
      }
    });
});

/* Here we watch for any resizing of the screen to
adjust our scrolling setup */
window.addEventListener("resize", scroller.resize);

function selectNavItem(selected) {
  const navItems = header.children;
  for (let i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove("active");
  }
  selected.classList.add("active");
}

function getLayerPaintType(layer) {
  const layerType = map.getLayer(layer).type;
  return layerTypes[layerType];
}

function setLayerOpacity(layer) {
  const paintProps = getLayerPaintType(layer.layer);
  paintProps.forEach(function (prop) {
    map.setPaintProperty(layer.layer, prop, layer.opacity);
  });
}

function onCurrentLayer(data, index) {
  offLayers(data);
  setLayerOpacity({ layer: data[index], opacity: 1 });
  // corner case: group layers in the section site4
  const groupLayers = [
    "montgomery-provider",
    "montgomery-provider-medicaid",
    "montgomery-neighbors-buffer",
  ];
  if (data[index] == "montgomery-shortage-2018") {
    offLayers(groupLayers);
    setLayerOpacity({ layer: "montgomery-provider", opacity: 0.75 });
    setLayerOpacity({ layer: "montgomery-neighbors-buffer", opacity: 0.15 });
  } else if (data[index] == "montgomery-shortage-2018M") {
    offLayers(groupLayers);
    setLayerOpacity({ layer: "montgomery-provider-medicaid", opacity: 0.75 });
    setLayerOpacity({ layer: "montgomery-neighbors-buffer", opacity: 0.15 });
  } else if (data[index] == "montgomery-disparity-2018") offLayers(groupLayers);
  onCurrentLegend(data, index);
}

function offLayers(data) {
  data.forEach((d) => {
    setLayerOpacity({ layer: d, opacity: 0 });
  });
}

function onCurrentLegend(data, index) {
  offLegends(data);
  const id = getLegendId(data[index]);
  const legend = document.getElementById(id);
  legend.classList.remove("invisible");
}

function offLegends(data) {
  data.forEach((d) => {
    const id = getLegendId(d);
    const legend = document.getElementById(id);
    legend.classList.add("invisible");
  });
}

function getLegendId(data) {
  const string = data.split("-");
  let id = "";
  string.forEach((s) => {
    if (Object.is(parseInt(s), NaN)) id += `${s}_`;
  });
  id += "legend";
  return id;
}

function setDatasetInterval(chapter, time) {
  let intervalId = setInterval(() => playDatasets(chapter), time);
  const radioBtn = document
    .getElementById(chapter.id)
    .querySelector(".dataset_toggle");
  radioBtn.addEventListener("click", (event) => {
    if (event.target.className !== "dataset_toggle") clearInterval(intervalId);
  });
  return intervalId;
}

function playDatasets(chapter) {
  const dataBtns = document.querySelectorAll(`input[name="${chapter.id}"]`);
  chapter.dataIndex = (chapter.dataIndex + 1) % dataBtns.length; // Move to the next dataset index
  dataBtns[chapter.dataIndex].checked = true; // Check the radio button at the current index
  onCurrentLayer(chapter.data, chapter.dataIndex);
}

function mouseEnterHandler() {
  map.getCanvas().style.cursor = "pointer";
}

function mouseLeaveHandler(chapter) {
  map.getCanvas().style.cursor = "";
  popup.classList.add("invisible");
  offHover(chapter);
}

function mouseMoveHandler(event, chapter) {
  const layer = chapter.data[chapter.dataIndex];
  const layerName = chapter.dataName && chapter.dataName[chapter.dataIndex];
  const feature = map.queryRenderedFeatures(event.point, {
    layers: [chapter.data[0]],
  });
  if (feature.length > 0) {
    updatePopupPosition(event);
    updatePopupContent(chapter.id, chapter.data, layer, layerName, feature[0]);
    onHover(chapter, feature[0]);
  }
}

function updatePopupPosition(event) {
  const mapWidth = window.innerWidth * 0.6;

  const offset = 30;
  if (event.point.x + popupWidth + offset > mapWidth) {
    popup.style.left = `${event.point.x - popupWidth - offset}px`;
  } else {
    popup.style.left = `${event.point.x + offset}px`;
  }
  if (event.point.y + popupHeight - offset > window.innerHeight * 0.8) {
    popup.style.top = `${event.point.y - popupHeight + offset}px`;
  } else {
    popup.style.top = `${event.point.y - offset}px`;
  }
  popup.classList.remove("invisible");
}

function updatePopupContent(id, layers, layer, layerName, feature) {
  // Chapters(multiple datasets) showing slope charts
  const name = feature.properties.NAME;
  if (id === "background" || id === "health_disparity") {
    popupText.innerHTML = `
      <h5 class="popup_title">${
        id === "background" ? name : name + ", New York"
      }</h5>
      <div class='popup_text'>
      <p><b>${feature.properties[layer]}%</b> (${layerName})</p>
      </div>
      `;

    // Initialize slope chart
    if (!prevName) {
      const data = [
        {
          category: "medicaid",
          value1: feature.properties[layers[2]],
          value2: feature.properties[layers[3]],
        },
        {
          category: "uninsured",
          value1: feature.properties[layers[0]],
          value2: feature.properties[layers[1]],
        },
      ];
      initChart(data);
      prevName = name;
      return;
    }

    // Rerender slope charts with new data when hovered area name is changed
    if (prevName !== name) {
      const data = [
        {
          category: "medicaid",
          value1: feature.properties[layers[2]],
          value2: feature.properties[layers[3]],
        },
        {
          category: "uninsured",
          value1: feature.properties[layers[0]],
          value2: feature.properties[layers[1]],
        },
      ];
      updateChart(data);
      prevName = name;
    }
  }
  // Chapters(multiple datasets) showing data in bullet points.
  else if (id === "health_disparity2" || id === "site4") {
    popupText.innerHTML = `
      <h5 class="popup_title">${feature.properties.NAME}</h5>
      <p>${feature.properties[layer]}</p>
      <p>${feature.properties[layer]}</p>
      `;
  }
  // // Chapters(single dataset) showing data in bullet points.
  // popupText.innerHTML = `
  //   <h5 class="popup_title">${feature.properties.NAME}</h5>
  //   <p>${feature.properties[layer]}</p>
  //   <p>${feature.properties[layer]}</p>
  //   `;
}

// Hover effect (mapbox studio duplicates feature ids by mistake, when uploading geojson)
// solution: set id states with a unique feature property for every geometry within feature
// then in setPaintProperty, do self-reference. so features with the same id are uniquely identifiable.
function onHover(chapter, feature) {
  if (chapter.id === "background") {
    for (let i = 0; i < 27; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "insurance_percent-bokrxj",
          id: i,
        },
        { id: feature.properties.id }
      );
    }
  } else if (
    chapter.id === "health_disparity" ||
    chapter.id === "health_disparity2"
  ) {
    for (let i = 0; i < 60; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "medicaid_counties-cn3p9u",
          id: i,
        },
        { id: feature.properties.id }
      );
    }
  } else if (chapter.id === "site") {
    for (let i = 0; i < 7; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "medicaid_counties_filter-606o8r",
          id: i,
        },
        { id: feature.properties.id }
      );
    }
  } else if (chapter.id === "site3") {
    for (let i = 0; i < 40; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "medicaid_density_montgomery-8wfbcr",
          id: i,
        },
        { id: feature.properties.area }
      );
    }
  } else if (chapter.id === "site4") {
    for (let i = 0; i < 5; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "neighbors_disparity-5vl5cx",
          id: i,
        },
        { id: feature.properties.id }
      );
    }
  }
}

function offHover(chapter) {
  // delete id states for every geometry within feature
  if (chapter.id === "background") {
    for (let i = 0; i < 27; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "insurance_percent-bokrxj",
          id: i,
        },
        { id: null }
      );
    }
  } else if (
    chapter.id === "health_disparity" ||
    chapter.id === "health_disparity2"
  ) {
    for (let i = 0; i < 60; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "medicaid_counties-cn3p9u",
          id: i,
        },
        { id: null }
      );
    }
  } else if (chapter.id === "site") {
    for (let i = 0; i < 7; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "medicaid_counties_filter-606o8r",
          id: i,
        },
        { id: null }
      );
    }
  } else if (chapter.id === "site3") {
    for (let i = 0; i < 40; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "medicaid_density_montgomery-8wfbcr",
          id: i,
        },
        { id: null }
      );
    }
  } else if (chapter.id === "site4") {
    for (let i = 0; i < 5; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "neighbors_disparity-5vl5cx",
          id: i,
        },
        { id: null }
      );
    }
  }
}

function setPaintProperty(layer, property) {
  map.setPaintProperty(layer, "line-width", [
    "case",
    ["==", ["get", property], ["feature-state", "id"]],
    4,
    0,
  ]);
}

function setHoverPaintProperty(layer) {
  // corner case for "montgomery-cbg-outline-hover" layer
  // it does not have unique id column, therefore use area column instead
  if (layer === "montgomery-cbg-outline-hover") {
    setPaintProperty(layer, "area");
  } else if (layer === "montgomery-filter-outline-hover") {
    map.setPaintProperty(layer, "line-dasharray", [1, 0]);
    setPaintProperty(layer, "id");
  } else {
    setPaintProperty(layer, "id");
  }
}

function initChart(data) {
  // delete existing chart before rendering
  d3.select(".popup_chart").remove();

  // Set size
  const margin = { top: 10, right: 50, bottom: 30, left: 40 };
  const width = popupWidth - margin.left - margin.right;
  const height = 120 - margin.top - margin.bottom;

  const svg = d3
    .select("#popup")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "popup_chart");

  const x = d3
    .scaleLinear()
    .domain([0, 1]) // Two categories represented by 0 and 1
    .range([margin.left, margin.left + width]);

  const min = 0;
  const max = 30;
  const y1 = d3
    .scaleLinear()
    .domain([max, min])
    .range([margin.top, margin.top + height]);
  const y2 = d3
    .scaleLinear()
    .domain([max, min])
    .range([margin.top, margin.top + height]);

  let tickValuesY1 = data.map((d) => d.value1);
  let tickValuesY2 = data.map((d) => d.value2);
  tickValuesY1 = [min, ...tickValuesY1, max];

  // Append y1 axis and style
  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .attr("class", "y1_axis")
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
    .attr("transform", `translate(${width + margin.left}, 0)`)
    .attr("class", "y2_axis")
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

  // Add year labels
  const years = [2010, 2022];
  svg
    .selectAll(".year-label")
    .data(years)
    .enter()
    .append("text")
    .attr("class", "year-label")
    .attr("x", (d, i) => x(i))
    .attr("y", height + margin.top + 30)
    .text((d) => d)
    .attr("text-anchor", "middle")
    .style("font-size", 10);

  // Add geometries
  svg
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

  svg
    .selectAll(".circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circle")
    .attr("cx", (d) => x(0))
    .attr("cy", (d) => y1(d.value1))
    .attr("r", 4)
    .style("fill", (d) => {
      if (d.category === "medicaid") {
        return `rgb(${254 - d.value1 * (254 / 36)}, ${
          217 - d.value1 * (74 / 36)
        }, ${118 - d.value1 * (68 / 36)})`;
      } else {
        return `rgb(${255 - d.value1 * (66 / 25)}, ${
          241 - d.value1 * (241 / 25)
        }, ${179 - d.value1 * (141 / 25)})`;
      }
    });

  svg
    .selectAll(".circle2")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circle2")
    .attr("cx", (d) => x(1))
    .attr("cy", (d) => y2(d.value2))
    .attr("r", 4)
    .style("fill", (d) => {
      if (d.category === "medicaid") {
        return `rgb(${254 - d.value2 * (254 / 36)}, ${
          217 - d.value2 * (74 / 36)
        }, ${118 - d.value2 * (68 / 36)})`;
      } else {
        return `rgb(${255 - d.value2 * (66 / 25)}, ${
          241 - d.value2 * (241 / 25)
        }, ${179 - d.value2 * (141 / 25)})`;
      }
    });
}

function updateChart(data) {
  // Set size
  const margin = { top: 10, right: 50, bottom: 30, left: 40 };
  const height = 120 - margin.top - margin.bottom;
  const duration = 200;

  const svg = d3.select(".popup_chart");

  const min = 0;
  const max = 30;
  const y1 = d3
    .scaleLinear()
    .domain([max, min])
    .range([margin.top, margin.top + height]);
  const y2 = d3
    .scaleLinear()
    .domain([max, min])
    .range([margin.top, margin.top + height]);

  let tickValuesY1 = data.map((d) => d.value1);
  let tickValuesY2 = data.map((d) => d.value2);
  tickValuesY1 = [min, ...tickValuesY1, max];

  // update y1 axis
  svg
    .select(".y1_axis")
    .transition()
    .duration(duration)
    .call(
      d3
        .axisLeft(y1)
        .tickValues(tickValuesY1)
        .tickSizeOuter(0)
        .tickFormat((d) => d + "%")
    );

  // update y2 axis
  svg
    .select(".y2_axis")
    .transition()
    .duration(duration)
    .call(
      d3
        .axisRight(y2)
        .tickValues(tickValuesY2)
        .tickSizeOuter(0)
        .tickFormat((d) => d + "%")
    );

  svg.selectAll(".tick line").attr("stroke", "lightgrey");

  // Update geometries
  svg
    .selectAll(".line")
    .data(data)
    .transition()
    .duration(duration)
    .attr("y1", (d) => y1(d.value1))
    .attr("y2", (d) => y2(d.value2));

  svg
    .selectAll(".circle")
    .data(data)
    .transition()
    .duration(duration)
    .attr("cy", (d) => y1(d.value1));

  svg
    .selectAll(".circle2")
    .data(data)
    .transition()
    .duration(duration)
    .attr("cy", (d) => y2(d.value2));
}
