var map, drawControls, selectControl, geojsonLayer2;
var epsg4326 = new OpenLayers.Projection('EPSG:4326');
var epsg900913 = new OpenLayers.Projection('EPSG:900913');

var lonLatHilversum = [5.1605481, 52.2315715];
var lonLatLaapersveld = [5.18490762, 52.2115104];

$().ready(function() {
  map = getMapCenteredOnHilversum();
  markLaapersVeld(map);
  findMyself(map);
  renderGeoJson(map);
  drawPolygonOverYourCountry(map);
  selectMultiplePolygons(map);

  map.addControl(new OpenLayers.Control.LayerSwitcher());
  map.addControl(new OpenLayers.Control.MousePosition());

  document.getElementById('noneToggle').checked = true;
});

/**
 * Instantiate a new map object centered on lonlatHilversum with a zoomlevel of 12
 */
function getMapCenteredOnHilversum() {
  var map = new OpenLayers.Map('map', {
    units: 'm',
    projection: epsg900913,
    displayProjection: epsg4326, //Is used for displaying coordinates in appropriate CRS by MousePosition control
    zoom: 10,
    controls: [
      new OpenLayers.Control.Navigation(),
      new OpenLayers.Control.Zoom()
    ],
    layers: [
      new OpenLayers.Layer.OSM("OpenStreetMap", null, {
        transitionEffect: 'resize'
      })
    ]

  });
  map.setCenter(
    new OpenLayers.LonLat(lonLatHilversum).transform(
      new OpenLayers.Projection("EPSG:4326"),
      map.getProjectionObject()
    ), 12
  );
  return map;
}

/*
 add a marker to the map designating the location of the Laapersveld office
 */
function markLaapersVeld(map) {
  addMarkerForLonLat(lonLatLaapersveld, map);
}

function addMarkerForLonLat(lonLat, map) {
  var markerLayer = new OpenLayers.Layer.Markers( "Markers" );
  map.addLayer(markerLayer);

  var size = new OpenLayers.Size(32,48);
  var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
  var icon = new OpenLayers.Icon('data/icon.png', size, offset);
  markerLayer.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(lonLat).transform(
    new OpenLayers.Projection("EPSG:4326"),
    map.getProjectionObject()
  ),icon));
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
  geojsonLayer2 = new OpenLayers.Layer.Vector("GeoJSON2", {
    projection: epsg4326,
    strategies: [new OpenLayers.Strategy.Fixed()],
    protocol: new OpenLayers.Protocol.HTTP({
      url: "./regions.json",
      format: new OpenLayers.Format.GeoJSON()
    })
  });
  map.addLayer(geojsonLayer2);
}

/*
 Add functionality to the map to draw a polygon encompassing your country
 */
function drawPolygonOverYourCountry(map) {
  var polygonLayer = new OpenLayers.Layer.Vector("Polygon Layer");

  map.addLayer(polygonLayer);
  drawControls = {
    polygon: new OpenLayers.Control.DrawFeature(polygonLayer,
      OpenLayers.Handler.Polygon)
  };

  for(var key in drawControls) {
    map.addControl(drawControls[key]);
  }
}

/**
 * Add functionality to select the displayed polygons on the map
 */
function selectMultiplePolygons(map) {
  var vectorLayers = map.getLayersByClass("OpenLayers.Layer.Vector");
  selectControl = new OpenLayers.Control.SelectFeature(
    vectorLayers,
    {
      clickout: true, toggle: false,
      multiple: false, hover: false,
      toggleKey: "ctrlKey", // ctrl key removes from selection
      multipleKey: "shiftKey" // shift key adds to selection
    }
  );
  map.addControl(selectControl);

  var handler = {
    "featureselected": function(e) {
      console.log("selected feature " + e.feature.id);
    },
    "featureunselected": function(e) {
      console.log("unselected feature " + e.feature.id);
    }
  };
  for (var i=0; i< vectorLayers.length; i++) {
    vectorLayers[i].events.on(handler);
  }
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
