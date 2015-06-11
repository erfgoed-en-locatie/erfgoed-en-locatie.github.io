var map = L.map('map', {
      //zoomControl: false
      minZoom: 4, maxZoom: 18
    }),
    color = 'rgba(105,198,223,1)',
    tileUrl = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
    attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
    subdomains = 'abcd',

    defaultStyle = {
      point: {
        color: color,
        fillColor: color,
        radius: 9,
        opacity: 0.95
      },
      line: {
        color: color,
        weight: 3,
        opacity: 0.95,
        fillOpacity: 0.05
      }
    },

    fadedStyle = {
      point: {
        color: color,
        fillColor: color,
        radius: 7,
        opacity: 0.25
      },
      line: {
        color: color,
        weight: 2,
        opacity: 0.25,
        fillOpacity: 0
      }
    },

    tileLayer = L.tileLayer(tileUrl, {
      subdomains: subdomains,
      attribution: attribution,
      opacity: 1
    }).addTo(map),
    geometryTypeOrder = [
      "Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection"
    ];

map.zoomControl.setPosition('topright');
map.setView([52.2808, 5.4918], 9);

function fitBounds(bounds) {
  var width = document.getElementById("sidebar-container").offsetWidth;
  map.fitBounds(bounds, {
    paddingTopLeft: [width, 0]
  });
}
