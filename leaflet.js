var selectEnabled = false
var selected = []
var latLonHilversum = [52.2315715, 5.1605481];
var latLonLaapersveld = [52.2115104, 5.18490762];

$().ready(function() {
  var map = getMapCenteredOnHilversum();
  markLaapersVeld(map);
  findMyself(map);
  renderGeoJson(map);
  drawPolygonOverYourCountry(map);
});

/**
 * Instantiate a new map object centered on lonlatHilversum with a zoomlevel of 12
 */
function getMapCenteredOnHilversum() {
  var map = L.map('map')

  var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var osmAttrib='Map data © OpenStreetMap contributors';
  var osm = new L.TileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib});

  osm.addTo(map)
  map.setView(latLonHilversum, 12)

  return map
}

/*
 add a marker to the map designating the location of the Laapersveld office
 */
function markLaapersVeld(map) {
  addMarkerForLatLon(latLonLaapersveld, map);
}

function addMarkerForLatLon(latLon, map) {
  var icon = L.icon({
    iconUrl: 'data/icon.png',
    iconSize: [32, 48],
    iconAnchor: [16, 48]
  });
  var marker = L.marker(latLon, { icon: icon})
  marker.addTo(map)
}

/*
 Use the geoLocation api to obtain your current location and add a marker of your location to the map
 */
function findMyself(map) {
  navigator.geolocation.getCurrentPosition(function (position) {
    addMarkerForLatLon([position.coords.latitude, position.coords.longitude], map);
  }, function () {
    console.log('failed to determine location');
  });
}

/**
 * Display the contents of the regions.json file in the data dir on the map
 */
function renderGeoJson(map) {
  // Leaflet has no direct support to load GeoJSON from a URL, so using jQuery
  $.getJSON("regions.json", function(data) {
      geojsonGroup = new L.GeoJSON(data, { style: { color: "#FF0000" },
        onEachFeature: multiSelectSupport
      });
      geojsonGroup.addTo(map)
  });
}

/**
 * Add multiselect on GeoJson features
 */
function multiSelectSupport(feature, layer) {
  layer.on("click", function(e){
    if (selectEnabled) {
      var layerId = geojsonGroup.getLayerId(layer)
      if (selected.indexOf(layerId)>=0) {
        layer.setStyle({color: "#FF0000"})
        selected.splice(selected.indexOf(layerId), 1)
        console.log("Deselected feature " + feature.properties.name +" "+layerId)
      } else {
        layer.setStyle({color: "#0000FF"})
        selected.push(layerId)
        console.log("Selected feature " + feature.properties.name +" "+layerId)
      }
    }
  })
}

/*
 Add functionality to the map to draw a polygon encompassing your country
 */
function drawPolygonOverYourCountry(map) {
  //Use Leaflet.Draw plugin from https://github.com/Leaflet/Leaflet.draw

  // Initialise the FeatureGroup to store editable layers
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  // Initialise the draw control and pass it the FeatureGroup of editable layers
  var drawControl = new L.Control.Draw({
    draw: {
      circle: false,
      polyline: false,
      marker: false
    },
    edit: {
      featureGroup: drawnItems
    }
  });
  map.addControl(drawControl);

  // respond to shapes that have been drawn
  map.on('draw:created', function (e) {
    var type = e.layerType;
    var layer = e.layer;

    // add to drawn items feature group
    drawnItems.addLayer(layer);
  });
}

function allowSelect(element) {
  if (!element.checked) {
    selectEnabled = false
  } else {
    selectEnabled = true
  }
}
