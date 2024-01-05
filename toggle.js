/**
 * Toggle site5 datasets (title: repeat the down selection process)
 */
const shortage_cbg_2021 = document.querySelector("#montgomery-shortage");
const shortageM_cbg_2021 = document.querySelector("#montgomery-shortageM");
const disparity_cbg_2021 = document.querySelector("#montgomery-disparity");

shortage_cbg_2021.addEventListener("click", () => {
  offLayersSite5();
  setLayerOpacity({ layer: "montgomery-shortage", opacity: 1.0 });
  setLayerOpacity({ layer: "montgomery-shortage-label", opacity: 1.0 });
  setLayerOpacity({ layer: "montgomery-provider", opacity: 1 });
});
shortageM_cbg_2021.addEventListener("click", () => {
  offLayersSite5();
  setLayerOpacity({ layer: "montgomery-shortageM", opacity: 1.0 });
  setLayerOpacity({ layer: "montgomery-provider-medicaid", opacity: 1 });
});
disparity_cbg_2021.addEventListener("click", () => {
  offLayersSite5();
  setLayerOpacity({ layer: "montgomery-disparity", opacity: 1.0 });
});

function offLayersSite5() {
  setLayerOpacity({ layer: "montgomery-disparity", opacity: 0 });
  setLayerOpacity({ layer: "montgomery-shortage", opacity: 0 });
  setLayerOpacity({ layer: "montgomery-shortageM", opacity: 0 });
  setLayerOpacity({ layer: "montgomery-provider", opacity: 0 });
  setLayerOpacity({ layer: "montgomery-provider-medicaid", opacity: 0 });
}
