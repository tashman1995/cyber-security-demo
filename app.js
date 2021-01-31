import { fakeData } from "./fakeData.js";
import { Severity } from "./SeverityClass.js";
import { Totals } from "./TotalsClass.js";

// Generate Totals Class, also manages Graph
const totals = new Totals();

// Generate Severity class for totals in the side panel
const highSeverity = new Severity(
  "High Severity",
  document.getElementById("severity-high")
);
const mediumSeverity = new Severity(
  "Medium Severity",
  document.getElementById("severity-medium")
);
const lowSeverity = new Severity(
  "Low Severity",
  document.getElementById("severity-low")
);
const benignSeverity = new Severity(
  "Benign",
  document.getElementById("severity-benign")
);

// Call back to be input into the fake data function
const callback = (data) => {
  // Run through each piece of data
  data.forEach((event) => {
    // Add event to totals class
    totals.addEvent(event);

    // Seperate Events between risk levels
    if (event.score >= 0.95) {
      // Add occurence on specific risk level
      highSeverity.addOccurence(event);
      // Add event marker to map, events only added if high or medium
      addMarker({ geoData: event.geodata, style: "high" });
    } else if (event.score < 0.95 && event.score >= 0.75) {
      mediumSeverity.addOccurence(event);
      addMarker({ geoData: event.geodata, style: "medium" });
    } else if (event.score < 0.75 && event.score >= 0.5) {
      lowSeverity.addOccurence(event);
    } else {
      benignSeverity.addOccurence(event);
    }
  });
};
// Fake Data Production
setInterval(() => fakeData(callback), 1000);
setInterval(() => totals.importGraphData(), 1000);

// Handling Map
mapboxgl.accessToken =
  "pk.eyJ1IjoidG9tYXNobWFuMTk5NSIsImEiOiJja2hheXl5M3YxOTU2MnFucXMxMGkzMDE1In0.wCJe7VlDOc6tWX-6itorug";
var map = new mapboxgl.Map({
  container: "mapBox",
  style: "mapbox://styles/tomashman1995/ckkjsxthj25ge17nwlvf3wx8k", // stylesheet location
  center: [-14.5, 80], // starting position [lng, lat]
  zoom: 0.8, // starting zoom
});

const addMarker = (location) => {
  var el = document.createElement("div");
  el.className = `marker ${location.style}`;
  new mapboxgl.Marker(el)
    .setLngLat([location.geoData.long, location.geoData.lat])
    .addTo(map);
};

map.on("load", function () {
  map.resize();
});
