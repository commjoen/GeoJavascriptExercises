var raster = new ol.layer.Tile({
  source: new ol.source.TileJSON({
    url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.jsonp'
  })
});

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

var map = new ol.Map({
  interactions: ol.interaction.defaults().extend([selectInteraction]),
  layers: [raster, vector, vector2],
  renderer: ol.RendererHint.CANVAS,
  target: 'map',
  view: new ol.View2D({
    projection: 'EPSG:4326',
    center: [4, 52],
    zoom: 10
  })
});



//var popup = new ol.Overlay({
//  element: element,
//  positioning: ol.OverlayPositioning.BOTTOM_CENTER
//});
//map.addOverlay(popup);



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
