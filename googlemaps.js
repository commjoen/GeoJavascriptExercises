$().ready(function () {
  var map = getMapCenteredOnHilversum();
  //markLaapersVeld(map);
  //findMyself(map);
  //renderGeoJson(map);
  //drawPolyGoneOverYourCountry(map);
  //didYouKnowThat(map);
});

/*
* Before you can start the exercise, goto : https://developers.google.com/maps/documentation/javascript/tutorial
* and obtain the key. After that, fill it in in googlemaps.html.
* for visualizing the map: see the hello world example on the same page as where the tutorial starts.
*/
function getMapCenteredOnHilversum() {
  
  return map;
}

/*
 add a marker to the map designating the location of the Laapersveld office
 see https://developers.google.com/maps/documentation/javascript/markers for more details
 */
function markLaapersVeld(map) {

  
//optional: open a nice infowindow about Xebia! (see https://developers.google.com/maps/documentation/javascript/infowindows)
  
}

/*
 Use the geoLocation api to obtain your current location and add a marker of your location to the map
 See http://dev.w3.org/geo/api/spec-source.html for more details
 */
function findMyself(map) {
  
}

function findMyselfHelperFunction(position, map) {
}

function showTheErrorHelperFunction(error) {
}

/**
 * Display the contents of the regions.json file in the data dir on the map
 * Note: for google maps, we can use the geojsonconverter.js to get the actual data and convert it to kml.
 */
function renderGeoJson(map) {
}

/*
 Add functionality to the map to draw a polygon encompassing your country (you can use http://geojson.io/ for coordinates)
 * to draw programmatically: https://developers.google.com/maps/documentation/javascript/shapes
 * to add drawing controls, use the drawing manager: https://developers.google.com/maps/documentation/javascript/drawing
 */
function drawPolyGoneOverYourCountry(map) {


}

/**
 * Add functionality to select the displayed polygons on the map
 */
function selectMultiplePolygons() {
  //we did not find the "correct multiselect" yet... So we found a creative solution:
  //http://bseth99.github.io/projects/google-maps/01-drawing-manager-selections.html

}

function didYouKnowThat(map){
  //google maps adds extra layers :)
  var trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);
}

/**
 * Nice additional reads:
 * https://google-developers.appspot.com/maps/documentation/javascript/layers
 * https://google-developers.appspot.com/maps/documentation/javascript/maptypes
 * https://google-developers.appspot.com/maps/documentation/javascript/geocoding
 * https://google-developers.appspot.com/maps/documentation/javascript/libraries
 * https://google-developers.appspot.com/maps/documentation/javascript/reference
 * https://google-developers.appspot.com/maps/documentation/javascript/examples/
 */
