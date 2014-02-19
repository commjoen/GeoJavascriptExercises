// $().ready(function() {
//     var map = L.map('map').setView([52, 4], 8);

//     L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
//       maxZoom: 18,
//       attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
//     }).addTo(map);

//     $.getJSON("points.json", function(data) {
//             var geojsonLayer = new L.GeoJSON(data);
//             map.addLayer(geojsonLayer);
//         });

//     $.getJSON("regions.json", function(data) {
//         var geojsonLayer = new L.GeoJSON(data);
//         geojsonLayer.on('click', function(evt) {
//             console.log(evt.layer.feature);
//         });
//         map.addLayer(geojsonLayer);
//     });

//     var drawnItems = new L.FeatureGroup();
//     map.addLayer(drawnItems);

//     var drawControl = new L.Control.Draw({
//         draw: {
//             position: 'topleft',
//             polygon: {
//                 title: 'Draw a sexy polygon!',
//                 allowIntersection: false,
//                 drawError: {
//                     color: '#b00b00',
//                     timeout: 1000
//                 },
//                 shapeOptions: {
//                     color: '#bada55'
//                 },
//                 showArea: true
//             },
//             polyline: {
//                 metric: false
//             },
//             circle: {
//                 shapeOptions: {
//                     color: '#662d91'
//                 }
//             }
//         },
//         edit: {
//             featureGroup: drawnItems
//         }
//     });
//     map.addControl(drawControl);

//     map.on('draw:created', function (e) {
//         var type = e.layerType,
//                 layer = e.layer;

//         if (type === 'marker') {
//             layer.bindPopup('A popup!');
//         }

//         drawnItems.addLayer(layer);
//     });


//     var popup = L.popup();
// });

var drawControls, selectControl;

var latLonHilversum = [52.2315715, 5.1605481];
var latLonLaapersveld = [52.2115104, 5.18490762];

$().ready(function() {
  var map = getMapCenteredOnHilversum();
  markLaapersVeld(map);
  findMyself(map);
  renderGeoJson(map);
  drawPolygonOverYourCountry(map);
  selectMultiplePolygons(map);

  // document.getElementById('noneToggle').checked = true;
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
  addMarkerForLonLat(latLonLaapersveld, map);
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
      var geojsonLayer = new L.GeoJSON(data);
      geojsonLayer.addTo(map)
  });
}

/*
 Add functionality to the map to draw a polygon encompassing your country
 */
function drawPolygonOverYourCountry(map) {
}

/**
 * Add functionality to select the displayed polygons on the map
 */
function selectMultiplePolygons(map) {
}

function toggleControl(element) {
  for(key in drawControls) {
      var control = drawControls[key];
      if(element.value == key && element.checked) {
          control.activate();
      } else {
          control.deactivate();
      }
  }
}

function allowPan(element) {
  var stop = !element.checked;
  for(var key in drawControls) {
      drawControls[key].handler.stopDown = stop;
      drawControls[key].handler.stopUp = stop;
  }
}

function allowSelect(element) {
  if (!element.checked) {
    selectControl.deactivate();
  } else {
    selectControl.activate();
  }
}
