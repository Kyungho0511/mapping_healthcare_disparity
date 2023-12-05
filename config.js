const legendPrice = document.querySelector("#legend_price");

const config = {
  accessToken:
    "pk.eyJ1Ijoia2xlZTA1MTEiLCJhIjoiY2xrYnFibnNjMGV4cjNrbzRqdGg1d21sYiJ9.nN0pE1qocGhTLnD_xPuYdg",
  style: "mapbox://styles/klee0511/clpso0bt000t701qm42bg6n2n",
  theme: "light",
  chapters: [
    {
      id: "background",
      data: "background",
      title: "obamacare has reduced uninsured rate",
      image: "",
      description: `The Affordable Care Act (Obama Care) became law on March 23, 2010. In the decade before the enactment of the Affordable Care Act (ACA) in 2010, the uninsured rate averaged 15.0 percent. In 2014, provisions of the ACA went into effect that enabled states to expand Medicaid eligibility. As the ACA expanded Medicaid coverage, the uninsured rate continued to drop, falling below 9.0 percent. So are the Medicaid beneficiaries getting equitable treatment ever since then?<br><br>
        <section class="toggle_datasets">
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
        { layer: "medicaid-percent-2010", opacity: 0 },
        { layer: "medicaid-percent-2022", opacity: 0 },
      ],
    },
    {
      id: "background2",
      data: "background",
      title: "Discrimination against Medicaid Enrollees has Increased",
      image: "",
      description: `As the percentage of Medicaid Enrollments in relation to total population has increased from 13.7% to 21.7%, Medicaid acceptance rate by health professionals has drastically decreased from 70.9% to 16.3% in New York state in particular. Unfortunately, insurance-based discrimination in healthcare system has been largely deepened. In my site selection tool, I will try to give equitable access to healthcare by targeting the Medicaid enrollees.
        <section class="toggle_datasets">
          <h4 class="legend_title">DataSets</h4>
          <input type="radio" class="btn-check" name="discrimination" id="medicaid_2012" autocomplete="off" checked>
          <label class="btn" for="medicaid_2012">Medicaid 2012</label>
          <input type="radio" class="btn-check" name="discrimination" id="medicaid_2021" autocomplete="off">
          <label class="btn" for="medicaid_2021">Medicaid 2021</label>
          <br>
          <input type="radio" class="btn-check" name="discrimination" id="acceptance_2012" autocomplete="off">
          <label class="btn" for="acceptance_2012">Acceptance 2012</label>
          <input type="radio" class="btn-check" name="discrimination" id="acceptance_2021" autocomplete="off">
          <label class="btn" for="acceptance_2021">Acceptance 2021</label>
        </section>
        
        <section id="medicaid_legend_counties">
          <h4 class="legend_title">Medicaid Enrollees percentage</h4>
          <section class="legend">
            <div>
              <div><span style="background-color: #008f32"></span>37.4 - 42.0 %</div>
              <div><span style="background-color: #459a33"></span>32.9 - 37.4 %</div>
              <div><span style="background-color: #6aa637"></span>28.4 - 32.9 %</div>
              <div><span style="background-color: #8ab03f"></span>23.9 - 28.4 %</div>
            </div>
            <div>
              <div><span style="background-color: #a9bb49"></span>19.4 - 23.9 %</div>
              <div><span style="background-color: #c6c555"></span>14.9 - 19.4 %</div>
              <div><span style="background-color: #e3cf65"></span>10.4 - 14.9 %</div>
              <div><span style="background-color: #fed976"></span>5.9 - 10.4 %</div>
            </div>
          </section>
        </section>

        <section id="acceptance_legend_counties" class="invisible">
          <h4 class="legend_title">Medicaid Acceptance rate</h4>
          <section class="legend">
            <div>
              <div><span style="background-color: #bd0026"></span>11.6 - 21.8 %</div>
              <div><span style="background-color: #c9412a"></span>21.8 - 32.1 %</div>
              <div><span style="background-color: #d36434"></span>32.1 - 42.3 %</div>
              <div><span style="background-color: #dc8343"></span>42.3 - 52.6 %</div>
            </div>
            <div>
              <div><span style="background-color: #e5a059"></span>52.6 - 62.8 %</div>
              <div><span style="background-color: #edbc73"></span>62.8 - 73.1 %</div>
              <div><span style="background-color: #f5d792"></span>73.1 - 83.3 %</div>
              <div><span style="background-color: #fff1b3"></span>83.3 - 93.6 %</div>
            </div>
          </section>
        </section>        
        `,
      location: {
        center: [-72.300583, 42.901394],
        zoom: 6.1,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "medicaid-percent-counties-2012", opacity: 1.0 },
        { layer: "background-white", opacity: 0.95 },
      ],
      onChapterExit: [
        { layer: "medicaid-percent-counties-2012", opacity: 0 },
        { layer: "medicaid-percent-counties-2021", opacity: 0 },
        { layer: "medicaid-accept-counties-2012", opacity: 0 },
        { layer: "medicaid-accept-counties-2021", opacity: 0 },
      ],
    },
    {
      id: "site",
      data: "site",
      title: "metrics for equitable site identification",
      image: "",
      description: `I will mainly use two datasets to get healthcare disparity index for Medicaid beneficiaries. One is the number of Medicaid Enrollments and the two is the ratio of health professionals who accept Medicaid insurance plans. Counties with high healthcare 'Diparity in Medicaid' are vulnerable to insurance-based discrimination. 
        <br /><br />
        <section class="toggle_datasets">
          <input type="radio" class="btn-check" name="metrics" id="shortage_2021" autocomplete="off" checked>
          <label class="btn" for="shortage_2021"><b>A</b></label>
          = &nbsp&nbsp Providers / 100 Residents 
          <br />
          <input type="radio" class="btn-check" name="metrics" id="shortageM_2021" autocomplete="off" checked>
          <label class="btn" for="shortageM_2021"><b>B</b></label>
          = &nbsp&nbsp Providers with Medicaid / 100 Medicaids 
          <br />
          <input type="radio" class="btn-check" name="metrics" id="disparity_2021" autocomplete="off">
          <label class="btn" for="disparity_2021"><b>Disparity in Medicaid</b></label>
          = &nbsp&nbsp A / B
        </section>

        <section id="shortage_legend_counties">
          <h4 class="legend_title"></h4>
          <section class="legend">
            <div>
              <div><span style="background-color: #000094"></span>0.25 - 0.67</div>
              <div><span style="background-color: #0000d6"></span>0.67 - 1.46</div>
              <div><span style="background-color: #2424eb"></span>1.46 - 2.01</div>
              <div><span style="background-color: #4848eb"></span>2.01 - 2.51</div>
            </div>
            <div>
              <div><span style="background-color: #6c6ce9"></span>2.51 - 2.92</div>
              <div><span style="background-color: #9090eb"></span>2.92 - 3.73</div>
              <div><span style="background-color: #b4b4eb"></span>3.73 - 4.37</div>
              <div><span style="background-color: #d8d8eb"></span>4.37 - 5.01</div>
            </div>
          </section>
        </section>

        <section id="disparity_legend_counties" class="invisible">
          <h4 class="legend_title"></h4>
          <section class="legend">
            <div>
              <div><span style="background-color: #db0000"></span>3.43 - 3.74</div>
              <div><span style="background-color: #de2020"></span>3.13 - 3.43</div>
              <div><span style="background-color: #e24141"></span>2.83 - 3.13</div>
              <div><span style="background-color: #e56161"></span>2.53 - 2.83</div>
            </div>
            <div>
              <div><span style="background-color: #e98282"></span>2.23 - 2.53</div>
              <div><span style="background-color: #eca2a2"></span>1.93 - 2.23</div>
              <div><span style="background-color: #f0c3c3"></span>1.63 - 1.93</div>
              <div><span style="background-color: #f3e3e3"></span>1.33 - 1.63</div>
            </div>
          </section>
        </section>           
      `,
      location: {
        center: [-72.300583, 42.901394],
        zoom: 6.1,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "medicaid-shortage-counties-2021", opacity: 1.0 },
        { layer: "background-white", opacity: 0.95 },
      ],
      onChapterExit: [
        { layer: "medicaid-disparity-counties-2021", opacity: 0 },
        { layer: "medicaid-shortageM-counties-2021", opacity: 0 },
        { layer: "medicaid-shortage-counties-2021", opacity: 0 },
      ],
    },
    {
      id: "site2",
      data: "site",
      title: "counties with health disparity",
      image: "",
      description: `I will use two datasets to choose counties vulnerable to insurance-based discrimination. One is the number of Medicaid Enrollments and the two is the ratio of health professionals who accept Medicaid insurance plans. Counties with high number of Medicaid Enrollments and low Medicaid acceptance rate are more likely to have insurance-based medical discrimination. 
        <img src="./images/site01.JPG" style="width: 400px;"/>
      `,
      location: {
        center: [-72.300583, 42.901394],
        zoom: 6.1,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "medicaid-disparity-counties-filter-2021", opacity: 1.0 },
        {
          layer: "medicaid-disparity-counties-filter-label-2021",
          opacity: 1.0,
        },
        {
          layer: "medicaid-disparity-counties-filter-line-2021",
          opacity: 1.0,
        },
        { layer: "background-white", opacity: 0.95 },
      ],
      onChapterExit: [
        { layer: "medicaid-disparity-counties-filter-2021", opacity: 0 },
        {
          layer: "medicaid-disparity-counties-filter-label-2021",
          opacity: 0,
        },
        {
          layer: "medicaid-disparity-counties-filter-line-2021",
          opacity: 0,
        },
      ],
    },
    {
      id: "site3",
      data: "site",
      title: "montgomery county",
      image: "",
      description: `the convenient subway access and its adjacency to urban attractions create a symbiotic relationship that propels Gyeonglidan-gil's popularity, making it a vibrant and sought-after location for both local residents and tourists.`,
      location: {
        center: [-74.103722, 42.920529],
        zoom: 9.6,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "background-white", opacity: 0 },
        { layer: "mapbox-satellite", opacity: 1.0 },
        {
          layer: "medicaid-disparity-counties-filter-line-dotted-2021",
          opacity: 1.0,
        },
      ],
      onChapterExit: [
        { layer: "mapbox-satellite", opacity: 0 },
        {
          layer: "medicaid-disparity-counties-filter-line-dotted-2021",
          opacity: 0,
        },
      ],
    },
    {
      id: "site4",
      data: "site",
      title: "filter medicaid enrollees outliers",
      image: "",
      description: `the convenient subway access and its adjacency to urban attractions create a symbiotic relationship that propels Gyeonglidan-gil's popularity, making it a vibrant and sought-after location for both local residents and tourists.`,
      location: {
        center: [-74.103722, 42.920529],
        zoom: 9.6,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [{ layer: "background-white", opacity: 0.95 }],
      onChapterExit: [],
    },
    {
      id: "typology",
      data: "typology",
      title: "next steps",
      image: "",
      description: `the proximity to subways and urban attractions has likely led to increased exposure on platforms like Instagram and other social media. As visitors share their experiences online, the area gains visibility and reputation, attracting even more attention and footfall.`,
      location: {
        center: [-74.103722, 42.920529],
        zoom: 9.6,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [{ layer: "background-white", opacity: 0 }],
      onChapterExit: [],
    },
  ],
};
