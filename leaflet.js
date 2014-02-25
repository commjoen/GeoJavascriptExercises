var selectEnabled = false
var selected = []
var latLonHilversum = [52.2315715, 5.1605481];
var latLonLaapersveld = [52.2115104, 5.18490762];

$().ready(function() {
 // var map = getMapCenteredOnHilversum();
 // markLaapersVeld(map);
 // findMyself(map);
 // renderGeoJson(map);
 // drawPolygonOverYourCountry(map);
});

/**
 * Instantiate a new map object centered on lonlatHilversum with a zoomlevel of 12
 * http://leafletjs.com/
 * http://leafletjs.com/reference.html#map-usage
 * http://leafletjs.com/reference.html#map-set-methods
 */
function getMapCenteredOnHilversum() {
  
  return map
}

/*
 * add a marker to the map designating the location of the Laapersveld office
 * http://leafletjs.com/reference.html#marker
 */
function markLaapersVeld(map) {
  
}

function addMarkerForLatLon(latLon, map) {
}

/*
 Use the geoLocation api to obtain your current location and add a marker of your location to the map
 */
function findMyself(map) {
  
}

/**
 * Display the contents of the regions.json file in the data dir on the map
 * Use jQuery getJSON to load json: http://api.jquery.com/jquery.getjson/
 * http://leafletjs.com/reference.html#geojson
 */
function renderGeoJson(map) {
  // Leaflet has no direct support to load GeoJSON from a URL, so using jQuery
}


/*
 Add functionality to the map to draw a polygon encompassing your country
 Draw support for Leaflet: https://github.com/Leaflet/Leaflet.draw
 */
function drawPolygonOverYourCountry(map) {
  // Initialise the FeatureGroup to store editable layers
  
  // Initialise the draw control and pass it the FeatureGroup of editable layers
  

  // respond to shapes that have been drawn
  
    // add to drawn items feature group
  
}

/**
 * Add multiselect on GeoJson features
 * Use onEachFeature for geoJson and pass in this method to build your own custom
 * multiselect via the on click handler of a layer. This might give some good ideas:
 * http://leafletjs.com/examples/choropleth.html
 */
function multiSelectSupport(feature, layer) {
}


/*
   Some other interesting stuff are the examples on the Leaflet page and the plugins for Leaflet:
   - http://leafletjs.com/examples.html
   - http://leafletjs.com/plugins.html
 */
