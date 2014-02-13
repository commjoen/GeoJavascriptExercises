var lonLatHilversum = [5.1605481, 52.2315715];
var lonLatLaapersveld = [5.18490762, 52.2115104];

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

  var vector2 = new ol.layer.Vector({
    id: 'vector2',
    source: new ol.source.Vector({
      parser: new ol.parser.GeoJSON(),
      url: 'regions.json'
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

/*
 add a marker to the map designating the location of the Laapersveld office
 */
function markLaapersVeld(map) {
  map.addOverlay(new ol.Overlay({
    position: ol.proj.transform(
      lonLatLaapersveld, 'EPSG:4326', 'EPSG:3857'
    ),
    element: $('<div>').addClass('marker')
  }));


}

/*
 Use the geoLocation api to obtain your current location and add a marker of your location to the map
 */
function findMyself(map) {

}

/**
 * Display the contents of the regions.json file in the data dir on the map
 */
function renderGeoJson(map) {

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