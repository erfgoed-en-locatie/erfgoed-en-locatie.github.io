var disableHashChange = false;

Array.prototype.unique = function() {
	var n = {},
      r=[];
	for(var i = 0; i < this.length; i++) 	{
		if (!n[this[i]]) {
			n[this[i]] = true;
			r.push(this[i]);
		}
	}
	return r;
};

String.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length == 0) return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function sortNames(pits) {
  var names = pits.map(function(pit) { return pit.name; }),
      counts = {};

  for (var k = 0, j = names.length; k < j; k++) {
    counts[names[k]] = (counts[names[k]] || 0) + 1;
  }

  return Object.keys(counts).map(function(name) {
    return {
      name: name,
      count: counts[name]
    };
  }).sort(function(a, b) {
    return b.count - a.count;
  });
};

function getApiUrl(queryString) {
  var url = "https://api.erfgeo.nl/search?",
      matches = queryString.match(/(\S*)=(\S*)/g)
      params = [];

  if (matches) {
    matches.forEach(function(match) {
      queryString = queryString.replace(match, "");
      params.push(match);
    });
  }

  if (queryString.indexOf("http") > -1) {
    params.push("uri=" + queryString.trim());
  } else if (queryString.indexOf("/") > -1) {
    params.push("hgid=" + queryString.trim());
  } else {
    params.push("name=" + queryString.trim());
  }

  return url + params.join("&");

}

function parseHash(hash) {
  params = {};
  decodeURIComponent(hash).split("&").forEach(function(param) {
    if (param.indexOf("=") > -1) {
      var kv = param.split("=");
      params[kv[0]] = kv.slice(1).join("=");
    }
  });

  if (params.search) {
    d3.select("#search-input").property('value', params.search);
    getData(params.search);
  }
}

function setHash(hash) {
  disableHashChange = true;
  location.hash = hash;
  setTimeout(function(){
    disableHashChange = false;
  }, 1000);
}

window.onhashchange = function() {
  if (!disableHashChange) {
    parseHash(location.hash.substring(1))
  }
};

if (location.hash) {
  parseHash(location.hash.substring(1));
}

/**
 * D3.js - GeoJSON from Histograph API
 */

d3.selectAll("#search-input").on('keyup', function() {
  if (d3.event.keyCode == 13) {
    var value = d3.select(this).property('value');
    setHash("search=" + value);
    getData(value);
  }
});

function getData(query) {
  d3.json(getApiUrl(query), function(error, geojson) {
    var errorMessage = null;
    if (error) {
      try {
        errorMessage = JSON.parse(error.response).error;
      } catch (e) {
        errorMessage = "Invalid reponse from Histograph API";
      }
    }
    document.getElementById("concepts-box").scrollTop = 0;
    resultsBox.setProps({
      geojson: geojson,
      error: errorMessage,
      selected: -1,
      hidden: false
    });

  });
}

document.getElementById("search-input").focus();
