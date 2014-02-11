$().ready(function () {
  var map = getMapCenteredOnHilversum();
  markLaapersVeld(map);
  findMyself(map);
  //renderGeoJson(map);
  drawPolyGoneOverYourCountry(map);
  //didYouKnowThat(map);
});

function getMapCenteredOnHilversum() {
  var mapOptions = {
    center: new google.maps.LatLng(52.2315715, 5.1605481),
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById("map"),
    mapOptions);

  return map;
}

/*
 add a marker to the map designating the location of the Laapersveld office
 */
function markLaapersVeld(map) {

  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(52.2115104, 5.18490762),
    map: map,
    //draggable:true,
    animation: google.maps.Animation.DROP,
    title: "Laapersveld!",
    icon: 'data/icon.png'
  });

//optional: open a nice infowindow about Xebia!
  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">Xebia Laapersveld</h1>' +
    '<div id="bodyContent">' +
    '<p><b>Laapersveld</b>, home to the Xebia Labs Rockers and the Iris-Team</p>' +
    '</div>' +
    '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.open(map, marker);
  });
}

/*
 Use the geoLocation api to obtain your current location and add a marker of your location to the map
 */
function findMyself(map) {
  if (window.navigator && window.navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(function (position) {
      findMyselfHelperFunction(position, map);
    }, showTheErrorHelperFunction);
  } else {
    $('#feedback').html('you have no support for geolocation');
  }
}

function findMyselfHelperFunction(position, map) {
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    map: map,
    //draggable:true,
    animation: google.maps.Animation.DROP,
    title: "Laapersveld!",
    icon: 'data/icon.png'
  });
}

function showTheErrorHelperFunction(error) {
  switch (error.code) {
  case error.PERMISSION_DENIED:
    $('#feedback').html("User denied the request for Geolocation.");
    break;
  case error.POSITION_UNAVAILABLE:
    $('#feedback').html("Location information is unavailable.");
    break;
  case error.TIMEOUT:
    $('#feedback').html("The request to get user location timed out.");
    break;
  case error.UNKNOWN_ERROR:
    $('#feedback').html("An unknown error occurred.");
    break;
  }
}

/**
 * Display the contents of the regions.json file in the data dir on the map
 */
function renderGeoJson(map) {
  $.getJSON("regions.json", function (data) {
    var gmapsJson = GeoJSON(data);
    if (gmapsJson.error) {
      // Handle the error.
    } else {
      console.log(gmapsJson);
      gmapsJson[0].setMap(map);
      gmapsJson[1].setMap(map);
    }

  });
}

/*
 Add functionality to the map to draw a polygon encompassing your country (you can use http://geojson.io/ for coordinates)
 */
function drawPolyGoneOverYourCountry(map) {

  var triangleCoords = [
    new google.maps.LatLng(51.828988363669126, 4.801025390625),
    new google.maps.LatLng(52.32526831457077, 4.801025390625),
    new google.maps.LatLng(52.32526831457077, 6.075439453125),
    new google.maps.LatLng(51.828988363669126, 6.075439453125),
    new google.maps.LatLng(51.828988363669126, 4.801025390625)
  ];

  // Construct the polygon.
  bermudaTriangle = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35
    //drawable: true
    //editable: true
  });

  bermudaTriangle.setMap(map);

  //now to add drawing controls themselves:
  var drawingManager = new google.maps.drawing.DrawingManager({
    drawingMode: google.maps.drawing.OverlayType.MARKER,
    drawingControl: true,
    drawingControlOptions: {
      position: google.maps.ControlPosition.TOP_CENTER,
      drawingModes: [
        google.maps.drawing.OverlayType.MARKER,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.POLYLINE,
        google.maps.drawing.OverlayType.RECTANGLE
      ]
    },
    markerOptions: {
      icon: 'data/icon.png'
    },
    circleOptions: {
      fillColor: '#ffff00',
      fillOpacity: 1,
      strokeWeight: 5,
      clickable: false,
      zIndex: 1,
      editable: true
    }
  });
  drawingManager.setMap(map);
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
