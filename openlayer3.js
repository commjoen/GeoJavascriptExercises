var lonLatHilversum = [5.1605481, 52.2315715];
var lonLatLaapersveld = [5.18490762, 52.2115104];

var drawControls;

$().ready(function () {
  var map = getMapCenteredOnHilversum();
//  interactions: ol.interaction.defaults().extend([selectInteraction]),


  markLaapersVeld(map);
  findMyself(map);
  renderGeoJson(map);
  drawPolygonOverYourCountry(map);
  selectMultiplePolygons(map);

  var style = new ol.style.Style({
    rules: [
      new ol.style.Rule({
        filter: 'renderIntent("selected")',
        symbolizers: [
          new ol.style.Fill({
            color: '#ffffff',
            opacity: 0.5
          })
        ]
      })
    ],
    symbolizers: [
      new ol.style.Icon({
        url: 'data/icon.png',
        yOffset: -22
      }),
      new ol.style.Fill({
        color: '#ffffff',
        opacity: 0.25
      }),
      new ol.style.Stroke({
        color: '#6666ff'
      })
    ]
  });

  var vector = new ol.layer.Vector({
    id: 'vector',
    source: new ol.source.Vector({
      parser: new ol.parser.GeoJSON(),
      url: 'points.json'
    }),
    style: style
  });

  var selectInteraction = new ol.interaction.Select({
//  layerFilter: function(layer) { return layer.get('id') == 'vector'; }
  });


  map.on('click', function(evt) {
    map.getFeatures({
      pixel: evt.getPixel(),
      layers: [vector, vector2],
      success: function(layerFeatures) {
        var feature;
        for (var i=0; i< layerFeatures.length; i++) {
          feature = layerFeatures[i][0];
          if (feature) {
            break;
          }
        }

        if (feature) {
          var geometry = feature.getGeometry();
          var coord = geometry.getCoordinates();
//        popup.setPosition(coord);
          $('#message').text(feature.get('name'));
        } else {
          $('#message').text('');
        }
      }
    });
  });
});

/**
 * Instantiate a new map object centered on lonlatHilversum with a zoomlevel of 12
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
 */
function markLaapersVeld(map) {
  addMarkerForLonLat(lonLatLaapersveld, map);
}

/*
 Use the geoLocation api to obtain your current location and add a marker of your location to the map
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