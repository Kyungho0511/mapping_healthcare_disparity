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
  if (record.data) {
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
      label.textContent = d;
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

map.on("load", function () {
  // This is the function that finds the first symbol layer
  const layers = map.getStyle().layers;
  let firstSymbolId;
  for (let i = 0; i < layers.length; i++) {
    // console.log(layers[i].id);
    // if (layers[i].type === "symbol") {
    //   firstSymbolId = layers[i].id;
    //   break;
    // }
  }

  // Setup the instance, pass callback functions
  let intervalId = null;

  scroller
    .setup({
      step: ".step",
      offset: 0.2,
      progress: true,
      preventDefault: true,
    })
    .onStepEnter((response) => {
      let chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );
      if (chapter) {
        map.flyTo(chapter.location);
        if (chapter.onChapterEnter.length > 0) {
          chapter.onChapterEnter.forEach(setLayerOpacity);
        }
        onCurrentLayer(chapter.data, chapter.dataIndex);
        intervalId && clearInterval(intervalId);
        intervalId = setDatasetInterval(chapter, 2500);
      }
      const selected = document.querySelector(
        `#header_${response.element.dataset.category}`
      );
      selectNavItem(selected);
    })
    .onStepExit((response) => {
      let chapter = config.chapters.find(
        (chap) => chap.id === response.element.id
      );
      if (chapter) {
        if (chapter.onChapterExit.length > 0) {
          chapter.onChapterExit.forEach(setLayerOpacity);
        }
        offLayers(chapter.data);
        intervalId && clearInterval(intervalId);
      }
    });

  // When the user moves their mouse over the active layer, show popups and
  // update the feature state for the feature under the mouse.
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.classList.add("invisible");
  story.appendChild(popup);

  map.on("mousemove", (event) => {
    const states = map.queryRenderedFeatures(event.point, {
      layers: ["uninsured-percent-2010", "medicaid-percent-2010"],
    });
    if (states.length) {
      const title = document.createElement("h4");
      title.innerText = console.log(event);
      const description = document.createElement("p");
      popup.innerHTML;
      popup.style.top = `${event.point.y + 30}px`;
      popup.style.left = `${event.point.x + 30}px`;
      popup.classList.remove("invisible");
    }
  });

  map.on("mouseenter", "uninsured-percent-2010", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "uninsured-percent-2010", () => {
    map.getCanvas().style.cursor = "";
    popup.classList.add("invisible");
  });
});

/* Here we watch for any resizing of the screen to
adjust our scrolling setup */
window.addEventListener("resize", scroller.resize);

function selectNavItem(selected) {
  navItems = header.children;
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
  onCurrentLegend(data, index);
}

function offLayers(data) {
  data.forEach((d) => {
    setLayerOpacity({ layer: d, opacity: 0 });
  });
}

function onCurrentLegend(data, index) {
  offLegends();
  const string = data[index].split("-");
  let id = "";
  string.forEach((s) => {
    if (Object.is(parseInt(s), NaN)) id += `${s}-`;
  });
  id += "legend";
  const legend = document.getElementById(id);
  legend.classList.remove("invisible");
}

function offLegends() {
  const legends = document.querySelectorAll(".legend_container");
  legends.forEach((legend) => legend.classList.add("invisible"));
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
