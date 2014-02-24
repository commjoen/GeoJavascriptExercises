var lonLatHilversum = [5.1605481, 52.2315715];
var lonLatLaapersveld = [5.18490762, 52.2115104];

var drawControls;

$().ready(function () {
  var map = getMapCenteredOnHilversum();
  markLaapersVeld(map);
  findMyself(map);
  renderGeoJson(map);
  drawPolygonOverYourCountry(map);
  selectMultiplePolygons(map);
});

/**
 * Instantiate a new map object centered on lonlatHilversum with a zoomlevel of 12
 * see http://ol3js.org/en/master/doc/quickstart.html 
 * NOTE: THESE EXERCISES ARE BASED ON BETA 1, YOU CAN TRY THE BETA 2 YOURSELF IF YOU WANT TO
 */
function getMapCenteredOnHilversum() {
  var map = new ol.Map({
    layers: [new ol.layer.Tile({
      source: new ol.source.OSM()
    })],
    renderer: ol.RendererHint.CANVAS,
    target: 'map',
    view: new ol.View2D({
      center: ol.proj.transform(
        lonLatHilversum, 'EPSG:4326', 'EPSG:3857'),
      zoom: 12
    })
  });
  return map
}

function addMarkerForLonLat(lonlat, map) {
  map.addOverlay(new ol.Overlay({
    position: ol.proj.transform(
      lonlat, 'EPSG:4326', 'EPSG:3857'
    ),
    element: $('<div style="background: url(\'data/icon.png\'); width: 32px; height: 48px; margin-left: -16px;">')
  }));
}

/*
 add a marker to the map designating the location of the Laapersveld office
 See http://ol3js.org/en/v3.0.0-beta.1/examples/icon.html for more details
 */
function markLaapersVeld(map) {
  addMarkerForLonLat(lonLatLaapersveld, map);
}

/*
 Use the geoLocation api to obtain your current location and add a marker of your location to the map
 See http://dev.w3.org/geo/api/spec-source.html for more details
 */
function findMyself(map) {
  navigator.geolocation.getCurrentPosition(function (position) {
    addMarkerForLonLat([position.coords.longitude, position.coords.latitude], map);
  }, function () {
    console.log('failed to determine location');
  });
}

/**
 * Display the contents of the regions.json file in the data dir on the map
 * See http://ol3js.org/en/v3.0.0-beta.1/examples/vector-layer.html for more details
 */
function renderGeoJson(map) {
  var vector = new ol.layer.Vector({
    id: 'vector',
    source: new ol.source.Vector({
      parser: new ol.parser.GeoJSON(),
      url: 'regions.json'
    })
  });

  map.addLayer(vector);
}

/*
 Add functionality to the map to draw a polygon encompassing your country
 */
function drawPolygonOverYourCountry(map) {
  var source = new ol.source.Vector({})

  var vector = new ol.layer.Vector({
    source: source
  });
// This section doesn;t work with the beta build of ol3, it should work with the master build acording to
//  http://ol3js.org/en/master/examples/draw-features.html
//  drawControls = {
//    'polygon': new ol.interaction.Draw({
//      source:  source,
//      type: 'Polygon'
//    })
//  };
//
//  map.addInteraction(drawControls['polygon']);
//  map.addLayer(vector);
}

/**
 * Add functionality to select the displayed polygons on the map
 * it is not implemented yet in beta1, but with the masterversion: http://ol3js.org/en/master/examples/select-features.html
 */
function selectMultiplePolygons(map) {
  var selectedStyle = [new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(0,0,255,0.5)'
    })
  })];

// This section doesn;t work with the beta build of ol3, it should work with the master build acording to
//  http://ol3js.org/en/master/examples/select-features.html
//  var select = new ol.interaction.Select({
//    featureOverlay: new ol.FeatureOverlay({
//      styleFunction: function(feature, resolution) {
//        return selectedStyle;
//      }
//    })
//  });
//  map.addInteraction(select);
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