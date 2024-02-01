const config = {
  GOOGLE_MAPS_API_KEY: "AIzaSyB6iI6HMX7p8WKomFZpEZj5Joi6auHQeho",
  accessToken:
    "pk.eyJ1Ijoia2xlZTA1MTEiLCJhIjoiY2xrYnFibnNjMGV4cjNrbzRqdGg1d21sYiJ9.nN0pE1qocGhTLnD_xPuYdg",
  style: "mapbox://styles/klee0511/cls23dbqw01pr01qs7mmp3wxq",
  theme: "light",
  chapters: [
    {
      id: "background",
      category: "background",
      title: "more insured does not mean more care",
      description: `The Affordable Care Act (Obamacare) became law on March 23, 2010. In the decade before the enactment of the Affordable Care Act (ACA) in 2010, the uninsured rate averaged 15.0 percent. In 2014, provisions of the ACA went into effect that enabled states to expand Medicaid eligibility. As the ACA expanded Medicaid coverage, the uninsured rate continued to drop, falling below 9.0 percent. So, have Medicaid beneficiaries been receiving equitable treatment ever since?`,
      data: [
        "uninsured-percent-2010",
        "uninsured-percent-2022",
        "medicaid-percent-2010",
        "medicaid-percent-2022",
      ],
      dataName: [
        "Uninsured percent 2010",
        "Uninsured percent 2022",
        "Medicaid percent 2010",
        "Medicaid percent 2022",
      ],
      dataIndex: 0,
      legend: `
      <section id="uninsured_percent_legend" class="legend_container">
          <h5 class="legend_title">Uninsured population percentage</h5>
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

        <section id="medicaid_percent_legend" class="legend_container invisible">
          <h5 class="legend_title">Medicaid Enrollees percentage</h5>
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
        center: [-77.0, 38.5],
        zoom: 3.55,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "background-white", opacity: 1 },
        { layer: "united-states-outline", opacity: 0 },
        { layer: "country-boundaries-black", opacity: 0 },
      ],
      onChapterExit: [],
    },
    {
      id: "background2",
      category: "background",
      title: "Discrimination against Medicaid has more than doubled",
      description: `The percentage of Medicaid enrollments in relation to the total population has increased from 13.7% to 21.7% since 2010. However, the Medicaid acceptance rate by health professionals has drastically decreased from 70.9% to 16.3% in New York State specifically. Unfortunately, the data shows that insurance-based discrimination in the healthcare system has significantly deepened since 2010.`,
      data: [
        "medicaid-percent-counties-2012",
        "medicaid-percent-counties-2021",
        "medicaid-acceptance-counties-2012",
        "medicaid-acceptance-counties-2021",
      ],
      dataName: [
        "Medicaid percent 2012",
        "Medicaid percent 2021",
        "Acceptance rate 2012",
        "Acceptance rate 2021",
      ],
      dataIndex: 0,
      legend: `
      <section id="medicaid_percent_counties_legend" class="legend_container">
        <h5 class="legend_title">Medicaid Enrollees percentage</h5>
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

      <section id="medicaid_acceptance_counties_legend" class="legend_container invisible">
        <h5 class="legend_title">Medicaid Acceptance rate</h5>
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
        { layer: "background-white", opacity: 0.95 },
        { layer: "united-states-outline", opacity: 1 },
      ],
      onChapterExit: [],
    },
    {
      id: "disparity_index",
      category: "disparity_index",
      title: "healthcare disparity index to identify vulnerable areas",
      description: `The healthcare disparity index for Medicaid beneficiaries is derived from two datasets. The first dataset measures the number of health professionals who accept Medicaid per one hundred Medicaid enrollees. The second dataset evaluates the number of total health professionals per one hundred insured individuals. This index indicates the discrepancy in healthcare access between Medicaid enrollees and the overall insured population. Counties with a high disparity index are more susceptible to insurance-based discrimination.`,
      data: [
        "medicaid-shortage-counties-2021",
        "medicaid-shortage-counties-2021M",
        "medicaid-disparity-counties-2021",
      ],
      dataName: [
        "P ( Providers / 100 Insured )",
        "PM ( Providers with Medicaid / 100 Medicaid Enrollees )",
        "D ( Disparity Index = P / PM )",
      ],
      dataIndex: 0,
      legend: `
      <section id="medicaid_shortage_counties_legend" class="legend_container">
        <section class="legend">
          <div>
            <div><span style="background-color: #000094"></span>4.37 - 9.51</div>
            <div><span style="background-color: #0000d6"></span>3.73 - 4.37</div>
            <div><span style="background-color: #2424eb"></span>2.92 - 3.73</div>
            <div><span style="background-color: #4848eb"></span>2.51 - 2.92</div>
          </div>
          <div>
            <div><span style="background-color: #6c6ce9"></span>2.01 - 2.51</div>
            <div><span style="background-color: #9090eb"></span>1.46 - 2.01</div>
            <div><span style="background-color: #b4b4eb"></span>0.67 - 1.46</div>
            <div><span style="background-color: #d8d8eb"></span>0.25 - 0.67</div>
          </div>
        </section>
      </section>

      <section id="medicaid_disparity_counties_legend" class="legend_container invisible">
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
        { layer: "background-white", opacity: 0.95 },
        { layer: "united-states-outline", opacity: 1 },
      ],
      onChapterExit: [],
    },
    {
      id: "disparity_index2",
      category: "disparity_index",
      title: "counties with high healthcare disparity",
      description: `Seven counties with a high healthcare disparity index are selected and classified based on their rural status. Among these, Montgomery County is singled out for further examination to identify the most vulnerable area susceptible to insurance-based discrimination in suburban regions within New York State.
        <img src="./images/vulnerable_counties.png"/>
      `,
      data: ["medicaid-disparity-counties-filter-2021"],
      dataIndex: 0,
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
        { layer: "united-states-outline", opacity: 1 },
        { layer: "mapbox-satellite", opacity: 0 },
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
      id: "site",
      category: "site",
      title: "montgomery county",
      subtitle: "the most vulnerable suburban county to healthcare disparity",
      description: `
        Population : 49,532<br/>
        Providers : 1,260<br/>
        Providers accepting Medicaid : 149<br/>
        Medicaid acceptance rate : 11.8 %<br/>
        Providers / 100 Insured : <b>2.62</b><br/> 
        Providers with Medicaid / 100 Medicaids : <b>0.91</b><br/> 
        Disparity index : <b>2.88</b><br/>
      `,
      location: {
        center: [-74.153722, 42.920529],
        zoom: 9.8,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "background-white", opacity: 0.1 },
        { layer: "united-states-outline", opacity: 0 },
        { layer: "mapbox-satellite", opacity: 1.0 },
        {
          layer: "medicaid-disparity-counties-filter-line-dotted-2021",
          opacity: 1.0,
        },
      ],
      onChapterExit: [
        {
          layer: "medicaid-disparity-counties-filter-line-dotted-2021",
          opacity: 0,
        },
      ],
    },
    {
      id: "site2",
      category: "site",
      title: "filter medicaid density outliers",
      description: `Despite being classified as a suburban area, a significant portion of Montgomery County comprises agricultural lands. To narrow down the analysis, I filtered out census block groups with extremely low Medicaid enrollee density. Then, I grouped together adjacent census block groups to identify distinct neighbors that have sufficient Medicaid enrollees.`,
      data: ["medicaid-density-montgomery"],
      dataIndex: 0,
      legend: `
      <section id="disparity_legend_counties">
        <h5 class="legend_title">Medicaid Enrollees / km2</h5>
        <section class="legend">
          <div>
            <div><span style="background-color: #008f32"></span>1205 - 1962</div>
            <div><span style="background-color: #459a33"></span>783 - 1205</div>
            <div><span style="background-color: #8ab03f"></span>614 - 783</div>
            <div><span style="background-color: #8ab03f"></span>369 - 614</div>
          </div>
          <div>
            <div><span style="background-color: #a9bb49"></span>166 - 369</div>
            <div><span style="background-color: #c6c555"></span>60 - 166</div>
            <div><span style="background-color: #e3cf65"></span>20 - 50</div>
            <div><span style="background-color: #f7efc5"></span>0.37 - 20</div>
          </div>
        </section>
      </section>  
      `,
      location: {
        center: [-74.153722, 42.920529],
        zoom: 9.8,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "mapbox-satellite", opacity: 1.0 },
        { layer: "background-white", opacity: 0.5 },
        { layer: "medicaid-density-montgomery", opacity: 1 },
      ],
      onChapterExit: [{ layer: "medicaid-density-montgomery", opacity: 0 }],
    },
    {
      id: "site3",
      category: "site",
      title: "areas with high healthcare disparity",
      description: `Healthcare providers within a 5-mile radius of each identified neighbor are considered available healthcare providers for that specific neighbor. Subsequently, the downsizing process using the disparity index is reiterated at a town scale.`,
      data: [
        "montgomery-shortage-2018",
        "montgomery-shortage-2018M",
        "montgomery-disparity-2018",
      ],
      dataName: [
        "P ( Providers / 100 Insured )",
        "PM ( Providers with Medicaid / 100 Medicaid Enrollees )",
        "D ( Disparity Index = P / PM )",
      ],
      legend: `
      <section id="montgomery_shortage_legend" class="legend_container">
        <section class="legend">
          <div>
            <div><span style="background-color: #000094"></span>2.61 - 2.96</div>
            <div><span style="background-color: #0000d6"></span>2.26 - 2.61</div>
            <div><span style="background-color: #2424eb"></span>1.91 - 2.26</div>
            <div><span style="background-color: #4848eb"></span>1.56 - 1.91</div>
          </div>
          <div>
            <div><span style="background-color: #6c6ce9"></span>1.21 - 1.56</div>
            <div><span style="background-color: #9090eb"></span>0.86 - 1.21</div>
            <div><span style="background-color: #b4b4eb"></span>0.51 - 0.86</div>
            <div><span style="background-color: #d8d8eb"></span>0.16 - 0.51</div>
          </div>
        </section>
      </section>

      <section id="montgomery_disparity_legend" class="legend_container invisible">
        <section class="legend">
          <div>
            <div><span style="background-color: #db0000"></span>5.77 - 6.42</div>
            <div><span style="background-color: #de2020"></span>5.12 - 5.77</div>
            <div><span style="background-color: #e24141"></span>4.47 - 5.12</div>
            <div><span style="background-color: #e56161"></span>3.82 - 4.47</div>
          </div>
          <div>
            <div><span style="background-color: #e98282"></span>3.17 - 3.82</div>
            <div><span style="background-color: #eca2a2"></span>2.52 - 3.17</div>
            <div><span style="background-color: #f0c3c3"></span>1.87 - 2.52</div>
            <div><span style="background-color: #f3e3e3"></span>1.22 - 1.87</div>
          </div>
        </section>
      </section>  
      `,
      dataIndex: 0,
      location: {
        center: [-74.153722, 42.920529],
        zoom: 9.8,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "mapbox-satellite", opacity: 1.0 },
        { layer: "background-white", opacity: 0.5 },
        { layer: "montgomery-cbg-outline", opacity: 1 },
        { layer: "montgomery-filter-outline", opacity: 0 },
      ],
      onChapterExit: [
        { layer: "montgomery-cbg-outline", opacity: 0 },
        { layer: "montgomery-provider", opacity: 0 },
        { layer: "montgomery-provider-medicaid", opacity: 0 },
        { layer: "montgomery-neighbors-buffer", opacity: 0 },
      ],
    },
    {
      id: "site4",
      category: "site",
      title: "St Johnsville village",
      subtitle: "the most vulnerable area in montgomery",
      description: ` 
        Providers / 100 Insured : <b>1.01</b><br /> 
        Providers with Medicaid / 100 Medicaids : <b>0.16</b><br /> 
        Disparity index : <b>6.36</b><br />
      `,
      data: [
        "johnsville-institutional-provider-2018",
        "johnsville-institutional-provider-2018M",
      ],
      dataName: [
        "Number of Providers",
        "Number of Providers accepting Medicaid",
      ],
      dataIndex: 0,
      legend: `
      <section id="johnsville_institutional_provider_legend" class="legend_container">
        <section class="legend">
          <div>
            <div><span style="background-color: #cc0000"></span>25 - 216</div>
            <div><span style="background-color: #d42828"></span>20 - 25</div>
            <div><span style="background-color: #dc5050"></span>15 - 20</div>
          </div>
          <div>
            <div><span style="background-color: #e47878"></span>10 - 15</div>
            <div><span style="background-color: #eca0a0"></span>5 - 10</div>
            <div><span style="background-color: #f4c8c8"></span>1 - 5</div>
          </div>
        </section>
      </section>
      `,
      location: {
        center: [-74.674895, 43.020729],
        zoom: 12.6,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "mapbox-satellite", opacity: 1.0 },
        { layer: "background-white", opacity: 0.1 },
        { layer: "montgomery-filter-outline", opacity: 1 },
      ],
      onChapterExit: [],
    },
    {
      id: "site5",
      category: "site",
      title: "amsterdam city",
      subtitle: "the second most vulnerable area in montgomery",
      description: `
        Providers / 100 Insured : <b>2.99</b><br/> 
        Providers with Medicaid / 100 Medicaids : <b>0.79</b><br/> 
        Disparity index : <b>3.79</b><br/>
      `,
      data: [
        "amsterdam-institutional-provider-2018",
        "amsterdam-institutional-provider-2018M",
      ],
      dataName: [
        "Number of Providers",
        "Number of Providers accepting Medicaid",
      ],
      dataIndex: 0,
      legend: `
      <section id="amsterdam_institutional_provider_legend" class="legend_container">
        <section class="legend">
          <div>
            <div><span style="background-color: #cc0000"></span>25 - 216</div>
            <div><span style="background-color: #d42828"></span>20 - 25</div>
            <div><span style="background-color: #dc5050"></span>15 - 20</div>
          </div>
          <div>
            <div><span style="background-color: #e47878"></span>10 - 15</div>
            <div><span style="background-color: #eca0a0"></span>5 - 10</div>
            <div><span style="background-color: #f4c8c8"></span>1 - 5</div>
          </div>
        </section>
      </section>
      `,
      location: {
        center: [-74.163722, 42.944529],
        zoom: 13,
        pitch: 0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "mapbox-satellite", opacity: 1.0 },
        { layer: "background-white", opacity: 0.1 },
        { layer: "montgomery-filter-outline", opacity: 1 },
      ],
      onChapterExit: [],
    },
  ],
};
