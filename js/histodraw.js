var osmUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
	  osmAttrib = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	  osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib}),
	  map = new L.Map('map', {layers: [osm], center: new L.LatLng(52.1601, 4.4970), zoom: 15 });

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
