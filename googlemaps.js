$().ready(function () {
  var map = getMapCenteredOnHilversum();
  markLaapersVeld(map);
  findMyself(map);
  renderGeoJson(map);
  drawPolyGoneOverYourCountry(map);
});

function getMapCenteredOnHilversum() {
  var mapOptions = {
    center: new google.maps.LatLng(52.2315715, 5.1605481),
    zoom: 4
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

  var belgiumCoords = [
    new google.maps.LatLng(3.33984375, 51.337475662965204),
    new google.maps.LatLng(3.6035156249999996, 51.17934297928927),
    new google.maps.LatLng(3.93310546875, 51.23440735163461),
    new google.maps.LatLng(4.691162109375, 51.474540439419755),
    new google.maps.LatLng(5.811767578125, 51.13110763758015),
    new google.maps.LatLng(5.504150390625, 50.826758482363275),
    new google.maps.LatLng(6.207275390625, 50.534380406110806),
    new google.maps.LatLng(5.701904296875, 49.88755653624285),
    new google.maps.LatLng(5.833740234375, 49.61070993807422),
    new google.maps.LatLng(4.910888671875, 49.83798245308484),
    new google.maps.LatLng(4.921875, 50.13466432216696),
    new google.maps.LatLng(4.339599609375, 50.07124366044474),
    new google.maps.LatLng(3.2409667968749996, 50.6947178381929),
    new google.maps.LatLng(3.09814453125, 50.85450904781293),
    new google.maps.LatLng(2.79052734375, 50.764259357116465),
    new google.maps.LatLng(2.5927734375, 51.089722918116344),
    new google.maps.LatLng(3.33984375, 51.337475662965204)
  ];
  var conquerBelgium = new google.maps.Polygon({
    paths: belgiumCoords,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 3,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    draggable: true, // yes, it's that easy!
    geodesic: true
  });

  conquerBelgium.setMap(map);
}

/**
 * Add functionality to select the displayed polygons on the map
 */
function selectMultiplePolygons() {

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
