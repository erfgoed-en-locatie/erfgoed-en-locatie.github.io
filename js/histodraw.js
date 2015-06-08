/** Baselayer **/
var osm = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});
/** old maps */
var vancampen1850 = L.esri.tiledMapLayer('http://tiles.arcgis.com/tiles/brgRNnNj6DClnBDf/arcgis/rest/services/1850_van_Campen/MapServer', {
    'opacity': 0.8
});
var vancampen1879 = L.esri.tiledMapLayer('http://tiles.arcgis.com/tiles/brgRNnNj6DClnBDf/arcgis/rest/services/1879_van_Campen/MapServer', {
    'opacity': 0.8
});
// http://tiles.arcgis.com/tiles/brgRNnNj6DClnBDf/arcgis/rest/services/1899_van_Campen/MapServer
var vancampen1899 = L.esri.tiledMapLayer('http://tiles.arcgis.com/tiles/brgRNnNj6DClnBDf/arcgis/rest/services/Kaart_1899/MapServer', {
    'opacity': 0.8
});
var streets = L.esri.basemapLayer('Streets');
/** Leaflet layers */
var baseLayers = {
    "osm": osm,
    "streets": streets
};
var overlays = {
    "Van Campen 1850": vancampen1850,
    "Van Campen 1879": vancampen1879,
    "Van Campen 1899": vancampen1899,
};
var map = L.map('map', {
    center: [52.16, 4.49], // leiden
    zoom: 15,
    layers: [osm,vancampen1850]
});

L.control.layers(baseLayers, overlays).addTo(map);


// integrate draw
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
	    draw: {
	      position: 'topleft',
	      circle: false,
	      rectangle: false,
	      marker: false,
	      polygon: {
	        title: 'Draw a polygon',
	        allowIntersection: false,
	        drawError: {
	          timeout: 1000,
	          color: '#e1e100', // Color the shape will turn when intersects
	          message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
	        },
	        shapeOptions: {
	          color: '#006699'
	        },
	        showArea: true
	      },
	      polyline: {
	        title: 'Draw some lines',
	        metric: false,
	        shapeOptions: {
	          color: '#f357a1',
	          weight: 4
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

  if (type === 'marker' || type === 'polyline' || type === 'polygon') {
    //var latlng = layer.getLatLngs().toString();

    var geo = layer.toGeoJSON();
    layer.bindPopup(JSON.stringify(geo.geometry)).addTo(map).openPopup();
  }
  drawnItems.addLayer(layer);
});

map.on('draw:edited', function (e) {
  var layers = e.layers;
  layers.eachLayer(function (layer) {

    var geo = layer.toGeoJSON();
    layer.bindPopup(JSON.stringify(geo.geometry)).addTo(map).openPopup();
  });
});

map.addControl( new L.Control.Search({
		url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
		jsonpParam: 'json_callback',
		propertyName: 'display_name',
		propertyLoc: ['lat','lon'],
		circleLocation: false,
		markerLocation: false,			
		autoType: false,
		autoCollapse: true,
		minLength: 2,
		zoom: 15
	}) );
