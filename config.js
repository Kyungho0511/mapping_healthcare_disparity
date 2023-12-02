const legendPrice = document.querySelector("#legend_price");

const config = {
  accessToken:
    "pk.eyJ1Ijoia2xlZTA1MTEiLCJhIjoiY2xrYnFibnNjMGV4cjNrbzRqdGg1d21sYiJ9.nN0pE1qocGhTLnD_xPuYdg",
  style: "mapbox://styles/klee0511/clpnkhzap00lo01p85s0a98qy",
  theme: "light",
  chapters: [
    {
      id: "low_land_price",
      title: "2015 | low land price",
      image: "",
      description: `Gyeonglidan-gil is situated near the Itaewon area, which is known for its international and multicultural atmosphere. Since the rent fee was relatively cheap compared to Itaewon, Gyeonglidan-gil attracted many young enterpreneurs and creative individuals who opened businesses catering to modern tastes. This way, the area underwent a transformation from a more traditional neighborhood to a trendy and stylish corridor.<br><br>
          <div id="legend_price" class="legend">
            <h4>Land Price per m2</h4>
            <div><span style="background-color: #ff002a"></span>$14,000 +</div>
            <div><span style="background-color: #f86c1e"></span>$11,000 - $14,000</div>
            <div><span style="background-color: #ed9d35"></span>$8,000 - $11,000</div>
            <div><span style="background-color: #e3c464"></span>$5,000 - $8,000</div>
            <div><span style="background-color: #e0e49d"></span>$2,000 - $5,000</div>
            <div><span style="background-color: #ebffd7"></span>Less than $2,000</div>
          </div>`,
      location: {
        center: [-81.026992, 38.034694],
        zoom: 3.33,
        pitch: 10.0,
        bearing: 0,
      },
      alignment: "right",
      onChapterEnter: [
        { layer: "priceData_2016", opacity: 0.7 },
        { layer: "gyeonglidan_gil", opacity: 1 },
      ],
      onChapterExit: [
        { layer: "priceData_2016", opacity: 0 },
        { layer: "gyeonglidan_gil", opacity: 0 },
      ],
    },
    {
      id: "street_network",
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
      onChapterEnter: [{ layer: "streets_distance_attractions", opacity: 0.7 }],
      onChapterExit: [{ layer: "streets_distance_attractions", opacity: 0 }],
    },
    {
      id: "social_media_rise",
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
      onChapterEnter: [
        { layer: "gyeonglidan_gil", opacity: 0.5 },
        { layer: "places_reviews", opacity: 1 },
      ],
      onChapterExit: [
        { layer: "gyeonglidan_gil", opacity: 0 },
        { layer: "places_reviews", opacity: 0 },
      ],
    },
  ],
};
