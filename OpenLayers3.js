var lonLatHilversum = [5.1605481, 52.2315715];
var lonLatLaapersveld = [5.18490762, 52.2115104];

var interactionControls;
var epsg4326 = ol.proj.get('EPSG:4326');
var epsg900913 = ol.proj.get('EPSG:900913');
var map;

$().ready(function () {
  //map = getMapCenteredOnHilversum();
  //markLaapersVeld(map);
  //findMyself(map);
  //renderGeoJson(map);
  //drawPolygonOverYourCountry(map);
  //selectMultiplePolygons(map);
});

/**
 * Instantiate a new map object centered on lonlatHilversum with a zoomlevel of 12
 * see http://ol3js.org/en/master/doc/quickstart.html 
 * NOTE: THESE EXERCISES ARE BASED ON BETA 1, YOU CAN TRY THE BETA 2 YOURSELF IF YOU WANT TO
 */
function getMapCenteredOnHilversum() {

  return map
}

function addMarkerForLonLat(lonlat, map) {
}

/*
 add a marker to the map designating the location of the Laapersveld office
 See http://ol3js.org/en/v3.0.0-beta.1/examples/icon.html for more details
 */
function markLaapersVeld(map) {
}

/*
 Use the geoLocation api to obtain your current location and add a marker of your location to the map
 See http://dev.w3.org/geo/api/spec-source.html for more details
 */
function findMyself(map) {
}

/**
 * Display the contents of the regions.json file in the data dir on the map
 * See http://ol3js.org/en/v3.0.0-beta.1/examples/vector-layer.html for more details
 */
function renderGeoJson(map) {
  
}

/*
 Add functionality to the map to draw a polygon encompassing your country
 see: http://ol3js.org/en/master/examples/draw-features.html
 */
function drawPolygonOverYourCountry(map) {
  
}

/**
 * Add functionality to select the displayed polygons on the map
 * See http://ol3js.org/en/master/examples/select-features.html
 */
function selectMultiplePolygons(map) {

}