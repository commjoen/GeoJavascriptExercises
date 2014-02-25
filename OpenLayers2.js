var map, drawControls, selectControl, geojsonLayer2;
var epsg4326 = new OpenLayers.Projection('EPSG:4326');
var epsg900913 = new OpenLayers.Projection('EPSG:900913');

var lonLatHilversum = [5.1605481, 52.2315715];
var lonLatLaapersveld = [5.18490762, 52.2115104];

$().ready(function() {
//  map = getMapCenteredOnHilversum();
//  markLaapersVeld(map);
//  findMyself(map);
//  renderGeoJson(map);
//  drawPolygonOverYourCountry(map);
//  selectMultiplePolygons(map);

//  document.getElementById('noneToggle').checked = true;
});

/**
 * Instantiate a new map object centered on lonlatHilversum with a zoomlevel of 12
 * use http://docs.openlayers.org/library/introduction.html, 
 * and see http://openlayers.org/dev/examples/osm-marker-popup.js as an example
 */
function getMapCenteredOnHilversum() {

  return map;
}

/*
 add a marker to the map designating the location of the Laapersveld office
 * see http://openlayers.org/dev/examples/osm-marker-popup.js as an example
 * //todo, add popup via http://openlayers.org/dev/examples/osm-marker-popup.js
 */
function markLaapersVeld(map) {
}


/*
 * Use the geoLocation api to obtain your current location and add a marker of your location to the map
 * See http://dev.w3.org/geo/api/spec-source.html for more details
 */
function findMyself(map) {
}

/**
 * Display the contents of the regions.json file in the data dir on the map
 * See http://dev.openlayers.org/releases/OpenLayers-2.11/examples/geojson.html as an example
 */
function renderGeoJson(map) {
}

/*
 Add functionality to the map to draw a polygon encompassing your country
 * //todo: add polygon programmatically?
 * tip, see: http://dev.openlayers.org/docs/files/OpenLayers/Control-js.html
 */
function drawPolygonOverYourCountry(map) {
}

/**
 * Add functionality to select the displayed polygons on the map
 * see http://dev.openlayers.org/releases/OpenLayers-2.13.1/examples/select-feature.html as an example
 */
function selectMultiplePolygons(map) {
}


