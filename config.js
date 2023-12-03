const legendPrice = document.querySelector("#legend_price");

const config = {
  accessToken:
    "pk.eyJ1Ijoia2xlZTA1MTEiLCJhIjoiY2xrYnFibnNjMGV4cjNrbzRqdGg1d21sYiJ9.nN0pE1qocGhTLnD_xPuYdg",
  style: "mapbox://styles/klee0511/clpp2b3l300mg01p6h8z59wrw",
  theme: "light",
  chapters: [
    {
      id: "background",
      data: "background",
      title: "obamacare has reduced uninsured rate",
      image: "",
      description: `The Affordable Care Act (Obama Care) became law on March 23, 2010. In the decade before the enactment of the Affordable Care Act (ACA) in 2010, the uninsured rate averaged 15.0 percent. In 2014, provisions of the ACA went into effect that enabled states to expand Medicaid eligibility. As the ACA expanded Medicaid coverage to nearly all adults with incomes up to 138% of the Federal Poverty Level, the uninsured rate continued to drop, falling below 9.0 percent. So are the Medicaid beneficiaries getting equitable treatment ever since then?<br><br>`,
      location: {
        center: [-70.026992, 38.034694],
        zoom: 3.33,
        pitch: 10.0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "uninsured-percent-simple-2010", opacity: 1.0 },
        { layer: "background-white", opacity: 1.0 },
      ],
      onChapterExit: [{ layer: "uninsured-percent-simple-2010", opacity: 0 }],
    },
    {
      id: "background-2",
      data: "background",
      title: "Discrimination against Medicaid Enrollees has Increased",
      image: "",
      description: `As of 2023, only 49% of the population is under employer-based insurance and 44% of the population is either enrolled in medicaid / medicare or uninsured. Unfortunately, insurance-based discrimination in healthcare system has been reported. Medicaid beneficiaries and the uninsured often get delayed or rejected by physicians. In my site selection tool, I will try to give equitable access to healthcare by targeting the Medicaid enrollees.`,
      location: {
        center: [-73.244583, 42.901394],
        zoom: 6.3,
        pitch: 10.0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "uninsured-percent-simple-2022", opacity: 1.0 },
        { layer: "background-white", opacity: 1.0 },
      ],
      onChapterExit: [{ layer: "uninsured-percent-simple-2022", opacity: 0 }],
    },
    {
      id: "site",
      data: "site",
      title: "2015 | proximity to attractions and subway",
      image: "",
      description: `the convenient subway access and its adjacency to urban attractions create a symbiotic relationship that propels Gyeonglidan-gil's popularity, making it a vibrant and sought-after location for both local residents and tourists.
          <div id="legend_price" class="legend">
            <h4>The sum of distances to attractions and subways</h4>
            <div><span style="background-color: #ff002a"></span>4550 m +</div>
            <div><span style="background-color: #ea5400"></span>4000 - 4550 m</div>
            <div><span style="background-color: #ca7900"></span>3450 - 4000 m</div>
            <div><span style="background-color: #a39400"></span>2900 - 3450 m</div>
            <div><span style="background-color: #74a800"></span>2350 - 2900 m</div>
            <div><span style="background-color: #25b72b"></span>Less than 2350 m</div>
          </div>`,
      location: {
        center: [-73.244583, 42.901394],
        zoom: 6.3,
        pitch: 10.0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [{ layer: "background-white", opacity: 0 }],
      onChapterExit: [],
    },
    {
      id: "typology",
      data: "typology",
      title: "2015 | rise in social media trends",
      image: "images/trends00.png",
      description: `the proximity to subways and urban attractions has likely led to increased exposure on platforms like Instagram and other social media. As visitors share their experiences online, the area gains visibility and reputation, attracting even more attention and footfall.
          <div id="legend_price" class="legend">
            <h4>The number of review posts</h4>
            <div><span style="background-color: #ff002a"></span>150 +</div>
            <div><span style="background-color: #ff5220"></span>120 - 150</div>
            <div><span style="background-color: #ff7a1d"></span>90 - 120</div>
            <div><span style="background-color: #ff9b27"></span>60 - 90</div>
            <div><span style="background-color: #ffb93c"></span>30 - 60</div>
            <div><span style="background-color: #ffd458"></span>15 - 30</div>
            <div><span style="background-color: #ffee78"></span>Less than 5</div>
          </div>`,
      location: {
        center: [-74.233722, 42.920529],
        zoom: 9.4,
        pitch: 10.0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [{ layer: "background-white", opacity: 0 }],
      onChapterExit: [],
    },
  ],
};
