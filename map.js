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
 * Main 'story' and navbar/header/footer
 */
const story = document.querySelector("#story");
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const header = document.querySelector("#header");
const footer = document.querySelector("#footer");

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

  // Creates the subtitle for the vignettes
  if (record.subtitle) {
    const subtitle = document.createElement("h4");
    subtitle.innerText = record.subtitle;
    chapter.appendChild(subtitle);
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
    datasetTitle.innerHTML = "<h5>Select a dataset</h5>";
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
          onCurrentLayer(record.data, record.dataIndex, record.legend);
        }
      });
      const label = document.createElement("label");
      label.setAttribute("class", "btn");
      label.setAttribute("for", d);
      label.textContent = record.dataName[idx];
      datasetToggle.appendChild(radioBtn);
      datasetToggle.appendChild(label);
      datasetToggle.appendChild(document.createElement("br"));
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
const popupMaxWidth = 300;
const popupHeight = 180;
const popup = document.createElement("div");
popup.setAttribute("id", "popup");
popup.style.maxWidth = `${popupMaxWidth}px`;
popup.setAttribute("width", popupWidth);
popup.setAttribute("height", popupHeight);
popup.classList.add("invisible");
const popupText = document.createElement("div");
const popupImg = document.createElement("img");
popupImg.classList.add("popup_img");
popupImg.classList.add("invisible");
popup.appendChild(popupText);
popup.appendChild(popupImg);
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
  let mouseEnterHandlerWrapper = null;

  scroller
    .setup({
      step: ".step",
      offset: 0.5,
      progress: true,
      preventDefault: true,
      threshold: 1,
    })
    .onStepEnter((response) => {
      // Header interaction
      if (response.element.dataset.category === "header") {
        map.flyTo({
          center: [-95, 48],
          zoom: 3.3,
          pitch: 0,
          bearing: 0,
        });
        setLayerOpacity({ layer: "country-boundaries-black", opacity: 0.05 });
        setLayerOpacity({ layer: "united-states-black-mass", opacity: 0.3 });
        setLayerOpacity({ layer: "ocean", opacity: 0 });
      }

      // Features interaction
      const chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );

      if (chapter) {
        map.flyTo(chapter.location);

        if (chapter.onChapterEnter.length > 0) {
          chapter.onChapterEnter.forEach(setLayerOpacity);
        }

        if (chapter.data) {
          if (chapter.data.length > 1) {
            onCurrentLayer(chapter.data, chapter.dataIndex, chapter.legend);
            intervalId && clearInterval(intervalId);
            intervalId = setDatasetInterval(chapter, 2500);
          }

          mouseEnterHandlerWrapper = (event) => {
            mouseEnterHandler(event, chapter);
          };
          map.on("mouseenter", chapter.data[0], mouseEnterHandlerWrapper);

          mouseLeaveHandlerWrapper = () => {
            mouseLeaveHandler(chapter);
          };
          map.on("mouseleave", chapter.data[0], mouseLeaveHandlerWrapper);

          mouseMoveHandlerWrapper = (event) => {
            mouseMoveHandler(event, chapter);
          };
          map.on("mousemove", chapter.data[0], mouseMoveHandlerWrapper);
        }
      }

      // Hightlight the selected navbar item
      const selected = document.querySelector(
        `#navbar_${response.element.dataset.category}`
      );
      selectNavItem(selected);
    })
    .onStepExit((response) => {
      // Header interaction
      if (response.element.dataset.category === "header") {
        setLayerOpacity({ layer: "country-boundaries-black", opacity: 0 });
        setLayerOpacity({ layer: "united-states-black-mass", opacity: 0 });
      }

      // Features interaction
      const chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );
      if (chapter?.onChapterExit.length > 0) {
        chapter.onChapterExit.forEach(setLayerOpacity);
      }
      if (chapter?.data && chapter?.data.length > 1) {
        offLayers(chapter.data);
      }
      isExiting = false;
    })
    // onStepProgress is used to guarantee callback from onStepProgress always runs before
    // onStepEnter, since it is not guaranteed onStepExit triggers before onStepEnter
    .onStepProgress(({ progress, direction, element }) => {
      if (
        ((progress > 0.9 && direction == "down") ||
          (progress < 0.1 && direction == "up")) &&
        !isExiting
      ) {
        const chapter = config.chapters.find((chap) => chap.id === element.id);
        if (chapter?.data) {
          if (chapter.data.length > 1) clearInterval(intervalId);
          map.off("mouseenter", chapter.data[0], mouseEnterHandlerWrapper);
          map.off("mouseleave", chapter.data[0], mouseLeaveHandlerWrapper);
          map.off("mousemove", chapter.data[0], mouseMoveHandlerWrapper);
          offHover(chapter);
          popup.classList.add("invisible");
          map.getCanvas().style.cursor = "";
        }
        d3.select(".popup_chart").remove(); // delete existing charts on popup
        popupImg.classList.add("invisible"); // make existing images on popup invisible
        prevName = null;
        isExiting = true;
      }
    });
});

// Here we watch for any resizing of the screen to adjust our scrolling setup
window.addEventListener("resize", scroller.resize);

// Navbar interactivity as scrolling
document.addEventListener("scroll", scrollHandler);

function scrollHandler() {
  // make navbar transparent and highlight the title when on the top page
  if (window.scrollY > navbarHeight) {
    navbar.classList.remove("highlight");
  } else {
    navbar.classList.add("highlight");
  }
}

function selectNavItem(selected) {
  const navItems = navbar.querySelectorAll("a");
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
  paintProps.forEach((prop) =>
    map.setPaintProperty(layer.layer, prop, layer.opacity)
  );
}

function onCurrentLayer(data, index, legend) {
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
    setLayerOpacity({ layer: "montgomery-provider", opacity: 1 });
    setLayerOpacity({ layer: "montgomery-neighbors-buffer", opacity: 0.15 });
  } else if (data[index] == "montgomery-shortage-2018M") {
    offLayers(groupLayers);
    setLayerOpacity({ layer: "montgomery-provider-medicaid", opacity: 1 });
    setLayerOpacity({ layer: "montgomery-neighbors-buffer", opacity: 0.15 });
  } else if (data[index] == "montgomery-disparity-2018") offLayers(groupLayers);
  legend && onCurrentLegend(data, index);
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
  onCurrentLayer(chapter.data, chapter.dataIndex, chapter.legend);
}

function mouseEnterHandler(event, chapter) {
  const feature = event.features[0];
  map.getCanvas().style.cursor = "pointer";
  updatePopupContentOnEnter(chapter.id, feature);
}

function mouseLeaveHandler(chapter) {
  map.getCanvas().style.cursor = "";
  popup.classList.add("invisible");
  offHover(chapter);
}

function mouseMoveHandler(event, chapter) {
  const layerName = chapter.dataName && chapter.dataName[chapter.dataIndex];
  const feature = map.queryRenderedFeatures(event.point, {
    layers: [chapter.data[chapter.dataIndex]],
  });
  if (feature.length > 0) {
    updatePopupPosition(event);
    updatePopupContentOnMove(
      chapter.id,
      chapter.data,
      chapter.dataIndex,
      layerName,
      feature[0]
    );
    onHover(chapter, feature[0]);
  }
}

function updatePopupPosition(event) {
  const mapWidth = window.innerWidth * 0.6;
  const offset = 30;
  if (event.point.x + popupMaxWidth + offset > mapWidth) {
    popup.style.left = `${event.point.x - popupMaxWidth - offset}px`;
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

function updatePopupContentOnEnter(id, feature) {
  // Site5,6: bullet points with images
  const prop = feature.properties;
  if (id === "site4" || id === "site5") {
    popupText.innerHTML = `
      <h5 class="popup_title">${prop["Street Address"]}, ${prop["Town/City"]}</h5>
      <div class="popup_text">
        <p><b>${prop["Provider Counts"]}</b> individual providers in the healthcare facility.</p>
      </div>
      `;
    addStreetViewImage(prop.Latitude, prop.Longitude);
  }
}

function updatePopupContentOnMove(id, layers, layerIndex, layerName, feature) {
  const prop = feature.properties;
  const name = feature.properties.NAME;
  const layer = layers[layerIndex];

  // Background: slope charts
  if (id === "background") {
    popupText.innerHTML = `
      <h5 class="popup_title">${name}</h5>
      <div class='popup_text'>
      <p><b>${prop[layer]}%</b> (${layerName})</p>
      </div>
      `;

    // Set data and domains for charts
    const data = [
      {
        value1: prop[layers[0]],
        value2: prop[layers[1]],
      },
      {
        value1: prop[layers[2]],
        value2: prop[layers[3]],
      },
    ];
    const domains = [
      {
        sourceMin: 2.4,
        sourceMax: 21.3,
        targetMin: [255, 241, 179],
        targetMax: [189, 0, 38],
      },
      {
        sourceMin: 6.2,
        sourceMax: 25.4,
        targetMin: [254, 217, 118],
        targetMax: [0, 143, 50],
      },
    ];

    // Initialize slope chart
    if (!prevName) {
      initSlopeChart(data, 0, 30, layerIndex, domains, [2010, 2022]);
      prevName = name;
      return;
    }

    // Rerender slope charts with new data when hovered area name is changed
    if (prevName !== name) {
      updateSlopeChart(data, 0, 30, layerIndex, domains, [2010, 2022]);
      prevName = name;
    }
  }

  // Background2: slope charts
  else if (id === "background2") {
    popupText.innerHTML = `
      <h5 class="popup_title">${name}, New York</h5>
      <div class='popup_text'>
      <p><b>${prop[layer]}%</b> (${layerName})</p>
      </div>
      `;

    // Set data and domains for charts
    const data = [
      {
        value1: prop[layers[0]],
        value2: prop[layers[1]],
      },
      {
        value1: prop[layers[2]],
        value2: prop[layers[3]],
      },
    ];

    const domains = [
      {
        sourceMin: 5.9,
        sourceMax: 42.0,
        targetMin: [254, 217, 118],
        targetMax: [0, 143, 50],
      },
      {
        sourceMin: 11.6,
        sourceMax: 93.6,
        targetMin: [189, 0, 38],
        targetMax: [255, 241, 179],
      },
    ];

    // Initialize slope chart
    if (!prevName) {
      initSlopeChart(data, 0, 100, layerIndex, domains, [2012, 2021]);
      prevName = name;
      return;
    }

    // Rerender slope charts with new data when hovered area name is changed
    if (prevName !== name) {
      updateSlopeChart(data, 0, 100, layerIndex, domains, [2012, 2021]);
      prevName = name;
    }
  }

  // Disparity Index: bar charts
  else if (id === "disparity_index") {
    popupText.innerHTML = `
      <h5 class="popup_title">${name}, New York</h5>
      <div class="popup_text">
        <p><b>${prop[layer]}</b> ${layerName}</p>
      </div>
      `;

    // Set data and domains for charts
    const data = [
      { category: "P", value: prop[layers[0]] },
      { category: "PM", value: prop[layers[1]] },
      { category: "D", value: prop[layers[2]] },
    ];

    const domains = [
      {
        sourceMin: 0.67,
        sourceMax: 4.37,
        targetMin: [180, 180, 232],
        targetMax: [0, 0, 214],
      },
      {
        sourceMin: 0.25,
        sourceMax: 4.37,
        targetMin: [216, 216, 235],
        targetMax: [0, 0, 214],
      },
      {
        sourceMin: 1.33,
        sourceMax: 3.74,
        targetMin: [243, 227, 227],
        targetMax: [209, 0, 0],
      },
    ];

    // Initialize slope charts
    if (!prevName) {
      initBarChart(data, domains);
      prevName = name;
      return;
    }

    // Rerender slope charts with new data when hovered area name is changed
    if (prevName !== name) {
      updateBarChart(data, domains);
      prevName = name;
    }
  }

  // Disparity Index2: bar charts
  else if (id === "disparity_index2") {
    popupText.innerHTML = `
    <h5 class="popup_title">${name}, New York</h5>
    <div class="popup_text">
      <p>Region: <b>${formatNumber(prop["REGION"])}</b></p>
      <p>Population: ${formatNumber(prop["2021_population"])}</p>
      <p>Medicaid Enrollments: ${formatNumber(
        prop["2021_medicaid enrollments"]
      )}</p>
    </div>
    `;

    // Set data and domains for charts
    const data = [
      {
        category: "P",
        value: prop["medicaid-shortage-counties-2021"],
      },
      {
        category: "PM",
        value: prop["medicaid-shortage-counties-2021M"],
      },
      {
        category: "D",
        value: prop["medicaid-disparity-counties-2021"],
      },
    ];

    const domains = [
      {
        sourceMin: 0.67,
        sourceMax: 4.37,
        targetMin: [180, 180, 232],
        targetMax: [0, 0, 214],
      },
      {
        sourceMin: 0.25,
        sourceMax: 4.37,
        targetMin: [216, 216, 235],
        targetMax: [0, 0, 214],
      },
      {
        sourceMin: 1.33,
        sourceMax: 3.74,
        targetMin: [243, 227, 227],
        targetMax: [209, 0, 0],
      },
    ];

    // Initialize slope charts
    if (!prevName) {
      initBarChart(data, domains);
      prevName = name;
      return;
    }

    // Rerender slope charts with new data when hovered area name is changed
    if (prevName !== name) {
      updateBarChart(data, domains);
      prevName = name;
    }
  }

  // Site2: bullet points
  else if (id === "site2") {
    popupText.innerHTML = `
    <h5 class="popup_title">${prop["TRACTCE"].slice(
      0,
      4
    )} Census Tract (Block Group ${prop["BLKGRPCE"]})</h5>
    <div class="popup_text">
      <p>Area: ${(prop["area"] / 1000000).toFixed(2)} km2</p>
      <p>Medicaid Enrollees: ${prop["insurance_medicaid"]}</p>
      <p>Medicaid Enrollees / km2: <b>${prop["medic/km2"]}</b></p>
    </div>
    `;
  }

  // Site3: bar charts
  else if (id === "site3") {
    popupText.innerHTML = `
    <h5 class="popup_title">Town${prop.id}, Montgomery</h5>
    <div class="popup_text">
      <p><b>${prop[layer]}</b> ${layerName}</p>
    </div>
    `;

    // Set data and domains for charts
    const data = [
      { category: "P", value: prop[layers[0]] },
      { category: "PM", value: prop[layers[1]] },
      { category: "D", value: prop[layers[2]] },
    ];

    const domains = [
      {
        sourceMin: 0.59,
        sourceMax: 2.99,
        targetMin: [186, 186, 232],
        targetMax: [0, 0, 214],
      },
      {
        sourceMin: 0.16,
        sourceMax: 0.79,
        targetMin: [216, 216, 235],
        targetMax: [0, 0, 214],
      },
      {
        sourceMin: 1.22,
        sourceMax: 6.36,
        targetMin: [243, 227, 227],
        targetMax: [209, 0, 0],
      },
    ];

    // Initialize slope charts
    if (!prevName) {
      initBarChart(data, domains);
      prevName = prop.id;
      return;
    }

    // Rerender slope charts with new data when hovered area name is changed
    if (prevName !== prop.id) {
      updateBarChart(data, domains);
      prevName = prop.id;
    }
  }
}

function addStreetViewImage(latitude, longitude) {
  // Hide existing image
  popupImg.classList.add("invisible");

  // Construct the request URL
  const apiKey = config.GOOGLE_MAPS_API_KEY;
  const width = 300;
  const height = 200;
  const fov = 100;
  const url = `https://maps.googleapis.com/maps/api/streetview?size=${width}x${height}&fov=${fov}&location=${latitude},${longitude}&key=${apiKey}`;

  // Make the HTTP request using fetch
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      // Convert the response to blob
      return response.blob();
    })
    .then((blob) => {
      const imageUrl = URL.createObjectURL(blob);
      popupImg.src = imageUrl;
      popupImg.classList.remove("invisible"); // Show image after loaded
    })
    .catch((error) => {
      console.error(error);
    });
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
  } else if (chapter.id === "background2" || chapter.id === "disparity_index") {
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
  } else if (chapter.id === "disparity_index2") {
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
  } else if (chapter.id === "site2") {
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
  } else if (chapter.id === "site3") {
    for (let i = 0; i < 5; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "neighbors_disparity-8ptuyk",
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
  } else if (chapter.id === "background2" || chapter.id === "disparity_index") {
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
  } else if (chapter.id === "disparity_index2") {
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
  } else if (chapter.id === "site2") {
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
  } else if (chapter.id === "site3") {
    for (let i = 0; i < 5; i++) {
      map.setFeatureState(
        {
          source: "composite",
          sourceLayer: "neighbors_disparity-8ptuyk",
          id: i,
        },
        { id: null }
      );
    }
  }
}

function setHoverPaintProperty(layer) {
  // corner case for "montgomery-cbg-outline-hover" layer
  // it does not have unique id column, therefore use area column instead
  if (layer === "montgomery-cbg-outline-hover") {
    setPaintPropertyCase(layer, "area");
  } else if (layer === "montgomery-filter-outline-hover") {
    map.setPaintProperty(layer, "line-dasharray", [1, 0]);
    setPaintPropertyCase(layer, "id");
  } else {
    setPaintPropertyCase(layer, "id");
  }
}

function setPaintPropertyCase(layer, property) {
  map.setPaintProperty(layer, "line-width", [
    "case",
    ["==", ["get", property], ["feature-state", "id"]],
    4,
    0,
  ]);
}

function initSlopeChart(data, min, max, layerIndex, domains, years) {
  // Set size
  const margin = { top: 5, right: 50, bottom: 30, left: 40 };
  const width = popupWidth - margin.left - margin.right;
  const height = 110 - margin.top - margin.bottom;

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

  const y1 = d3
    .scaleLinear()
    .domain([max, min])
    .range([margin.top, margin.top + height]);
  const y2 = d3
    .scaleLinear()
    .domain([max, min])
    .range([margin.top, margin.top + height]);

  // Set tick values for y1 and y2 axes
  let tickValuesY1 = [];
  let tickValuesY2 = [];
  if (layerIndex < 2) {
    data.forEach((d, i) => {
      if (i === 0) {
        tickValuesY1.push(d.value1);
        tickValuesY2.push(d.value2);
      }
    });
    tickValuesY1 = [min, ...tickValuesY1, max];
  } else {
    data.forEach((d, i) => {
      if (i === 0) {
        tickValuesY1.push(d.value1);
        tickValuesY2.push(d.value2);
      }
    });
    tickValuesY1 = [min, ...tickValuesY1, max];
  }

  // Append y1 axis and style
  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .attr("class", "y1_axis")
    .call(
      d3
        .axisLeft(y1)
        .tickValues(tickValuesY1)
        .tickSize(0)
        .tickFormat((d) => d + "%")
    )
    .select(".domain")
    .attr("stroke-dasharray", 4)
    .attr("stroke", "grey");

  // Append y2 axis and style
  svg
    .append("g")
    .attr("transform", `translate(${width + margin.left}, 0)`)
    .attr("class", "y2_axis")
    .call(
      d3
        .axisRight(y2)
        .tickValues(tickValuesY2)
        .tickSize(0)
        .tickFormat((d) => d + "%")
    )
    .select(".domain")
    .attr("stroke-dasharray", 4)
    .attr("stroke", "grey");

  // Add year labels
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
    .style("font-size", "10px");

  // Define gradients
  data.forEach((d, i) => {
    defineGradient(
      svg,
      `lineGradient${i + 1}`,
      remapToRGB(Math.max(d.value1, d.value2), domains[i]),
      remapToRGB(Math.min(d.value1, d.value2), domains[i])
    );
  });

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
    .attr("stroke", (d, i) => `url(#lineGradient${i + 1})`)
    .attr("stroke-width", (d, i) => {
      if (layerIndex < 2) {
        if (i === 0) return 2.5;
        else return 1;
      } else {
        if (i === 0) return 1;
        else return 2.5;
      }
    });

  svg
    .selectAll(".circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circle")
    .attr("cx", (d) => x(0))
    .attr("cy", (d) => y1(d.value1))
    .attr("r", 3)
    .style("fill", (d, i) => remapToRGB(d.value1, domains[i]));

  svg
    .selectAll(".circle2")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "circle2")
    .attr("cx", (d) => x(1))
    .attr("cy", (d) => y2(d.value2))
    .attr("r", 3)
    .style("fill", (d, i) => remapToRGB(d.value2, domains[i]));
}

function updateSlopeChart(data, min, max, layerIndex, domains) {
  // Set size
  const margin = { top: 5, right: 50, bottom: 30, left: 40 };
  const height = 110 - margin.top - margin.bottom;
  const duration = 200;

  const svg = d3.select(".popup_chart");

  const y1 = d3
    .scaleLinear()
    .domain([max, min])
    .range([margin.top, margin.top + height]);
  const y2 = d3
    .scaleLinear()
    .domain([max, min])
    .range([margin.top, margin.top + height]);

  // Set tick values for y1 and y2 axes
  let tickValuesY1 = [];
  let tickValuesY2 = [];
  if (layerIndex < 2) {
    data.forEach((d, i) => {
      if (i === 0) {
        tickValuesY1.push(d.value1);
        tickValuesY2.push(d.value2);
      }
    });
    tickValuesY1 = [min, ...tickValuesY1, max];
  } else {
    data.forEach((d, i) => {
      if (i === 1) {
        tickValuesY1.push(d.value1);
        tickValuesY2.push(d.value2);
      }
    });
    tickValuesY1 = [min, ...tickValuesY1, max];
  }

  // update y1 axis
  svg
    .select(".y1_axis")
    .transition()
    .duration(duration)
    .call(
      d3
        .axisLeft(y1)
        .tickValues(tickValuesY1)
        .tickSize(0)
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
        .tickSize(0)
        .tickFormat((d) => d + "%")
    );

  // Update gradients
  data.forEach((d, i) => {
    updateGradient(
      `lineGradient${i + 1}`,
      remapToRGB(Math.max(d.value1, d.value2), domains[i]),
      remapToRGB(Math.min(d.value1, d.value2), domains[i])
    );
  });

  // Update geometries
  svg
    .selectAll(".line")
    .data(data)
    .transition()
    .duration(duration)
    .attr("y1", (d) => y1(d.value1))
    .attr("y2", (d) => y2(d.value2))
    .attr("stroke-width", (d, i) => {
      if (layerIndex < 2) {
        if (i === 0) return 2.5;
        else return 1;
      } else {
        if (i === 0) return 1;
        else return 2.5;
      }
    });

  svg
    .selectAll(".circle")
    .data(data)
    .transition()
    .duration(duration)
    .attr("cy", (d) => y1(d.value1))
    .style("fill", (d, i) => remapToRGB(d.value1, domains[i]));

  svg
    .selectAll(".circle2")
    .data(data)
    .transition()
    .duration(duration)
    .attr("cy", (d) => y2(d.value2))
    .style("fill", (d, i) => remapToRGB(d.value2, domains[i]));
}

function initBarChart(data, domains) {
  // Set size
  const margin = { top: 0, right: 70, bottom: 0, left: 20 };
  const width = popupWidth - margin.left - margin.right;
  const height = 80 - margin.top - margin.bottom;
  const max = d3.max(domains.map((d) => d.sourceMax));

  const svg = d3
    .select("#popup")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("class", "popup_chart");

  // Set up scales
  const x = d3
    .scaleLinear()
    .domain([0, max])
    .range([margin.left, margin.left + width]);
  const y = d3
    .scaleBand()
    .domain(data.map((d) => d.category))
    .range([0, height])
    .padding(0.6);

  // Create horizontal bars
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", margin.left)
    .attr("y", (d) => y(d.category))
    .attr("width", (d) => {
      if (d.value > max) return x(max);
      else return x(d.value);
    })
    .attr("height", y.bandwidth())
    .attr("fill", (d, i) => remapToRGB(d.value, domains[i]));

  // Add vertical axis
  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).tickSize(0))
    .select(".domain")
    .attr("stroke-dasharray", 3)
    .attr("stroke", "grey");

  svg.selectAll("text").style("font-size", "11px");

  // Add labels
  svg
    .selectAll(".label")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "label")
    .text((d) => d.value)
    .attr("x", (d) => {
      if (d.value > max) return margin.left + x(max) + 10;
      else return margin.left + x(d.value) + 10;
    })
    .attr("y", (d) => y(d.category) + y.bandwidth() / 2)
    .attr("fill", "black")
    .style("font-size", "11px")
    .style("alignment-baseline", "middle");
}

function updateBarChart(data, domains) {
  // Set size
  const margin = { top: 0, right: 70, bottom: 0, left: 20 };
  const width = popupWidth - margin.left - margin.right;
  const duration = 200;
  const max = d3.max(domains.map((d) => d.sourceMax));

  const svg = d3.select(".popup_chart");

  // Set up scales
  const x = d3
    .scaleLinear()
    .domain([0, max])
    .range([margin.left, margin.left + width]);

  // Create horizontal bars
  svg
    .selectAll("rect")
    .data(data)
    .transition()
    .duration(duration)
    .attr("width", (d) => {
      if (d.value > max) return x(max);
      else return x(d.value);
    })
    .attr("fill", (d, i) => remapToRGB(d.value, domains[i]));

  // Add labels
  svg
    .selectAll(".label")
    .data(data)
    .transition()
    .duration(duration)
    .text((d) => d.value)
    .attr("x", (d) => {
      if (d.value > max) return margin.left + x(max) + 10;
      else return margin.left + x(d.value) + 10;
    });
}

function defineGradient(svg, id, colorStart, colorEnd) {
  const gradient = svg
    .append("defs")
    .append("linearGradient")
    .attr("id", id)
    .attr("gradientTransform", "rotate(90)");

  gradient
    .append("stop")
    .attr("offset", "0%")
    .attr("style", `stop-color: ${colorStart}; stop-opacity: 1`);

  gradient
    .append("stop")
    .attr("offset", "100%")
    .attr("style", `stop-color: ${colorEnd}; stop-opacity: 1`);
}

function updateGradient(id, colorStart, colorEnd) {
  const gradient = d3.select(`#${id}`);

  gradient
    .select('stop[offset="0%"]')
    .attr("style", `stop-color: ${colorStart}; stop-opacity: 1`);

  gradient
    .select('stop[offset="100%"]')
    .attr("style", `stop-color: ${colorEnd}; stop-opacity: 1`);
}

function remapToRGB(val, { sourceMin, sourceMax, targetMin, targetMax }) {
  // index (0,1,2) corresponds to (r,g,b)
  // prettier-ignore
  let r, g, b = null;
  for (let i = 0; i < 3; i++) {
    const valRemap = Math.round(
      ((val - sourceMin) / (sourceMax - sourceMin)) *
        (targetMax[i] - targetMin[i]) +
        targetMin[i]
    );
    if (i === 0) r = valRemap;
    else if (i === 1) g = valRemap;
    else if (i === 2) b = valRemap;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

function formatNumber(number) {
  // Convert the number to a string
  let numStr = number.toString();

  // Use a regular expression to add commas
  numStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numStr;
}
