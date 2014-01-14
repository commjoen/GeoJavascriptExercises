var map, drawControls, selectControl;
  function init(){
      var epsg4326 = new OpenLayers.Projection('EPSG:4326'),
        epsg900913 = new OpenLayers.Projection('EPSG:900913');

      map = new OpenLayers.Map('map', {
        units: 'm',
        projection: epsg900913,
        displayProjection: epsg4326, //Is used for displaying coordinates in appropriate CRS by MousePosition control
        // controls and layers are only here to fix ipad navigation. They break browser navigation however
        controls: [
          new OpenLayers.Control.TouchNavigation({
            dragPanOptions: {
              enableKinetic: true
            }
          }),
          new OpenLayers.Control.Zoom()
        ],
        layers: [
          new OpenLayers.Layer.OSM("OpenStreetMap", null, {
            transitionEffect: 'resize'
          })
        ]

      });

      var wmsLayer = new OpenLayers.Layer.WMS( "OpenLayers WMS",
          "http://vmap0.tiles.osgeo.org/wms/vmap0?", {layers: 'basic'});

      var icon_style = new OpenLayers.Style({'externalGraphic': 'data/icon.png',
        'graphicWidth' :32,
        'graphicHeight':48
      });

      var geojsonLayer = new OpenLayers.Layer.Vector("GeoJSON", {
        projection: epsg4326,
        strategies: [new OpenLayers.Strategy.Fixed()],
        protocol: new OpenLayers.Protocol.HTTP({
          url: "./points.json",
          format: new OpenLayers.Format.GeoJSON()
        }),
        styleMap: icon_style
      });

    var geojsonLayer2 = new OpenLayers.Layer.Vector("GeoJSON2", {
      projection: epsg4326,
      strategies: [new OpenLayers.Strategy.Fixed()],
      protocol: new OpenLayers.Protocol.HTTP({
        url: "./regions.json",
        format: new OpenLayers.Format.GeoJSON()
      })
    });

      var pointLayer = new OpenLayers.Layer.Vector("Point Layer");
      var lineLayer = new OpenLayers.Layer.Vector("Line Layer");
      var polygonLayer = new OpenLayers.Layer.Vector("Polygon Layer");
      var boxLayer = new OpenLayers.Layer.Vector("Box layer");

      map.addLayers([wmsLayer, pointLayer, lineLayer, polygonLayer, boxLayer, geojsonLayer, geojsonLayer2]);
      map.addControl(new OpenLayers.Control.LayerSwitcher());
      map.addControl(new OpenLayers.Control.MousePosition());

      drawControls = {
          point: new OpenLayers.Control.DrawFeature(pointLayer,
              OpenLayers.Handler.Point),
          line: new OpenLayers.Control.DrawFeature(lineLayer,
              OpenLayers.Handler.Path),
          polygon: new OpenLayers.Control.DrawFeature(polygonLayer,
              OpenLayers.Handler.Polygon),
          box: new OpenLayers.Control.DrawFeature(boxLayer,
              OpenLayers.Handler.RegularPolygon, {
                  handlerOptions: {
                      sides: 4,
                      irregular: true
                  }
              }
          )
      };

      for(var key in drawControls) {
          map.addControl(drawControls[key]);
      }

      selectControl = new OpenLayers.Control.SelectFeature(
        [geojsonLayer, geojsonLayer2, boxLayer],
        {
          clickout: true, toggle: false,
          multiple: false, hover: false,
          toggleKey: "ctrlKey", // ctrl key removes from selection
          multipleKey: "shiftKey" // shift key adds to selection
        }
      );
      map.addControl(selectControl);
      map.setCenter(new OpenLayers.LonLat(4, 52), 3);
      var handler = {
        "featureselected": function(e) {
          console.log("selected feature " + e.feature.id);
        },
        "featureunselected": function(e) {
          console.log("unselected feature " + e.feature.id);
        }
      }

      geojsonLayer.events.on(handler);
      boxLayer.events.on(handler);
      geojsonLayer2.events.on(handler);
      document.getElementById('noneToggle').checked = true;
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
