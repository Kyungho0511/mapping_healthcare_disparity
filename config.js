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
      description: `The Affordable Care Act (Obama Care) became law on March 23, 2010. In the decade before the enactment of the Affordable Care Act (ACA) in 2010, the uninsured rate averaged 15.0 percent. In 2014, provisions of the ACA went into effect that enabled states to expand Medicaid eligibility. As the ACA expanded Medicaid coverage to nearly all adults with incomes up to 138% of the Federal Poverty Level, the uninsured rate continued to drop, falling below 9.0 percent. So are the Medicaid beneficiaries getting equitable treatment ever since then?<br><br>
        <section class="radio_years">
        <h4 class="legend_title">DataSets</h4>
          <input type="radio" class="btn-check" name="uninsured" id="uninsured_2010" autocomplete="off" checked>
          <label class="btn" for="uninsured_2010">Uninsured 2010</label>
          <input type="radio" class="btn-check" name="uninsured" id="uninsured_2022" autocomplete="off">
          <label class="btn" for="uninsured_2022">Uninsured 2022</label>
          <br>
          <input type="radio" class="btn-check" name="uninsured" id="medicaid_2010" autocomplete="off">
          <label class="btn" for="medicaid_2010">Medicaid 2010</label>
          <input type="radio" class="btn-check" name="uninsured" id="medicaid_2022" autocomplete="off">
          <label class="btn" for="medicaid_2022">Medicaid 2022</label>
        </section>

        <section id="uninsured_legend_states">
          <h4 class="legend_title">Uninsured population percentage</h4>
          <section class="legend">
            <div>
              <div><span style="background-color: #bd0026"></span>18.9 - 21.3 %</div>
              <div><span style="background-color: #e31a1c"></span>16.5 - 18.9 %</div>
              <div><span style="background-color: #fc4e2a"></span>14.0 - 16.5 %</div>
              <div><span style="background-color: #ff6d29"></span>11.6 - 14.0 %</div>
            </div>
            <div>
              <div><span style="background-color: #fd953a"></span>9.2 - 11.6 %</div>
              <div><span style="background-color: #fec34d"></span>6.8 - 9.2 %</div>
              <div><span style="background-color: #fed976"></span>4.4 - 6.8 %</div>
              <div><span style="background-color: #fff1b3"></span>Less than 4.4 %</div>
            </div>
          </section>
        </section>

        <section id="medicaid_legend_states" class="invisible">
          <h4 class="legend_title">Medicaid Enrollees percentage</h4>
          <section class="legend">
            <div>
              <div><span style="background-color: #008f32"></span>22.5 - 29.7 %</div>
              <div><span style="background-color: #459a33"></span>19.3 - 22.5 %</div>
              <div><span style="background-color: #6aa637"></span>17.0 - 19.3 %</div>
              <div><span style="background-color: #8ab03f"></span>14.9 - 17.0 %</div>
            </div>
            <div>
              <div><span style="background-color: #a9bb49"></span>11.9 - 14.9 %</div>
              <div><span style="background-color: #c6c555"></span>7.4 - 11.9 %</div>
              <div><span style="background-color: #e3cf65"></span>6.2 - 7.4 %</div>
              <div><span style="background-color: #fed976"></span>Less than 6.2 %</div>
            </div>
          </section>
        </section>
        `,
      location: {
        center: [-75.026992, 39.534694],
        zoom: 3.6,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "uninsured-percent-2010", opacity: 1.0 },
        { layer: "background-white", opacity: 1.0 },
      ],
      onChapterExit: [
        { layer: "uninsured-percent-2010", opacity: 0 },
        { layer: "uninsured-percent-2022", opacity: 0 },
      ],
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
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "uninsured-percent-2022", opacity: 1.0 },
        { layer: "background-white", opacity: 1.0 },
      ],
      onChapterExit: [{ layer: "uninsured-percent-2022", opacity: 0 }],
    },
    {
      id: "site",
      data: "site",
      title: "2015 | proximity to attractions and subway",
      image: "",
      description: `the convenient subway access and its adjacency to urban attractions create a symbiotic relationship that propels Gyeonglidan-gil's popularity, making it a vibrant and sought-after location for both local residents and tourists.`,
      location: {
        center: [-73.244583, 42.901394],
        zoom: 6.3,
        pitch: 0,
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
      image: "",
      description: `the proximity to subways and urban attractions has likely led to increased exposure on platforms like Instagram and other social media. As visitors share their experiences online, the area gains visibility and reputation, attracting even more attention and footfall.`,
      location: {
        center: [-74.233722, 42.920529],
        zoom: 9.4,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [{ layer: "background-white", opacity: 0 }],
      onChapterExit: [],
    },
  ],
};
