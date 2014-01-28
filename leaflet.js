$().ready(function() {
    var map = L.map('map').setView([52, 4], 8);

    L.tileLayer('http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    }).addTo(map);

    $.getJSON("points.json", function(data) {
            var geojsonLayer = new L.GeoJSON(data);
            map.addLayer(geojsonLayer);
        });

    $.getJSON("regions.json", function(data) {
        var geojsonLayer = new L.GeoJSON(data);
        geojsonLayer.on('click', function(evt) {
            console.log(evt.layer.feature);
        });
        map.addLayer(geojsonLayer);
    });

    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    var drawControl = new L.Control.Draw({
        draw: {
            position: 'topleft',
            polygon: {
                title: 'Draw a sexy polygon!',
                allowIntersection: false,
                drawError: {
                    color: '#b00b00',
                    timeout: 1000
                },
                shapeOptions: {
                    color: '#bada55'
                },
                showArea: true
            },
            polyline: {
                metric: false
            },
            circle: {
                shapeOptions: {
                    color: '#662d91'
                }
            }
        },
        edit: {
            featureGroup: drawnItems
        }
    });
    map.addControl(drawControl);

    map.on('draw:created', function (e) {
        var type = e.layerType,
                layer = e.layer;

        if (type === 'marker') {
            layer.bindPopup('A popup!');
        }

        drawnItems.addLayer(layer);
    });


    var popup = L.popup();
});
