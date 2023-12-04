// Toggle uninsured years
const uninsured_2010 = document.querySelector("#uninsured_2010");
const uninsured_2022 = document.querySelector("#uninsured_2022");
const medicaid_2010 = document.querySelector("#medicaid_2010");
const medicaid_2022 = document.querySelector("#medicaid_2022");
const uninsured_legend_states = document.querySelector(
  "#uninsured_legend_states"
);
const medicaid_legend_states = document.querySelector(
  "#medicaid_legend_states"
);

uninsured_2010.addEventListener("click", () => {
  offLayers();
  setLayerOpacity({ layer: "uninsured-percent-2010", opacity: 1.0 });
  medicaid_legend_states.classList.add("invisible");
  uninsured_legend_states.classList.remove("invisible");
});
uninsured_2022.addEventListener("click", () => {
  offLayers();
  setLayerOpacity({ layer: "uninsured-percent-2022", opacity: 1.0 });
  medicaid_legend_states.classList.add("invisible");
  uninsured_legend_states.classList.remove("invisible");
});
medicaid_2010.addEventListener("click", () => {
  offLayers();
  setLayerOpacity({ layer: "medicaid-percent-2010", opacity: 1.0 });
  medicaid_legend_states.classList.remove("invisible");
  uninsured_legend_states.classList.add("invisible");
});
medicaid_2022.addEventListener("click", () => {
  offLayers();
  setLayerOpacity({ layer: "medicaid-percent-2022", opacity: 1.0 });
  medicaid_legend_states.classList.remove("invisible");
  uninsured_legend_states.classList.add("invisible");
});

function offLayers() {
  setLayerOpacity({ layer: "uninsured-percent-2022", opacity: 0 });
  setLayerOpacity({ layer: "uninsured-percent-2010", opacity: 0 });
  setLayerOpacity({ layer: "medicaid-percent-2022", opacity: 0 });
  setLayerOpacity({ layer: "medicaid-percent-2010", opacity: 0 });
}
