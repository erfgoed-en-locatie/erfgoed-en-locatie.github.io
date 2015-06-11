// path = [searchUrl, hgid]

var ResultsBox = React.createClass({displayName: "ResultsBox",

  getInitialState: function() {
    return {
      graphHidden: true,
      featureGroups: L.featureGroup().addTo(map),
      pitLayers: {}
    };
  },

  render: function() {
    var conceptBox = null,
        hideConceptList = false;

    if (!this.props.geojson) {
      return null;
    }

    if (this.props.selected != -1) {
      var feature = this.props.geojson.features[this.props.selected],
          hideConceptList = true
      var conceptBox = (
            React.createElement("div", null, 
              React.createElement(ConceptBoxResults, {feature: feature, back: this.handleBack, showGraph: this.showGraph, graphHidden: this.state.graphHidden}), 
              React.createElement(ConceptBoxList, {feature: feature, featureGroups: this.state.featureGroups, 
                pitLayers: this.state.pitLayers}), 
              React.createElement(Graph, {feature: feature, graphHidden: this.state.graphHidden})
            )
          );
    }

    if (this.props.geojson && this.props.geojson.features && this.props.geojson.features.length > 0) {
      var className = (hideConceptList || this.props.hidden) ? "hidden" : "";

      return (
        React.createElement("div", null, 
          React.createElement("div", {className: className}, 
            React.createElement(ConceptsBoxResults, {features: this.props.geojson.features, hide: this.handleHide}), 
            React.createElement(ConceptsBoxList, {features: this.props.geojson.features, featureGroups: this.state.featureGroups, 
                pitLayers: this.state.pitLayers, onSelect: this.handleSelect})
          ), 
          conceptBox
        )
      );
    } else {
      return (
        React.createElement("div", {className: className}, 
          React.createElement(ConceptsBoxResults, {error: this.props.error, hide: this.handleHide})
        )
      );
    }
  },

  showGraph: function() {
    this.setState({graphHidden: !this.state.graphHidden});
  },

  handleBack: function(event) {
    this.setState({graphHidden: true});

    this.setProps({
      selected: -1
    });
    event.preventDefault();
  },

  handleHide: function(event) {
    this.setProps({
      hidden: true
    });

    event.preventDefault();
  },

  handleSelect: function(index) {
    this.setProps({
      selected: index
    });
  }
});

/**
 * Components for list of concepts
 */

var ConceptsBoxResults = React.createClass({displayName: "ConceptsBoxResults",
  render: function() {
    var message;
    if (this.props.features && this.props.features.length) {
      var concept = this.props.features.length == 1 ? "concept" : "concepts",
          message = this.props.features.length + " " + concept+ " found:";
    } else if (this.props.error) {
      message = "Error: " + this.props.error;
    } else {
      message = "No concepts found";
    }

    return (
      React.createElement("div", {id: "concepts-results", className: "padding results"}, 
        React.createElement("span", {id: "concepts-results-message"}, message), 
        React.createElement("a", {id: "concepts-close", className: "float-right", href: "#", onClick: this.props.hide}, "Close")
      )
    );
  }
});

var ConceptsBoxList = React.createClass({displayName: "ConceptsBoxList",

  handleSelect: function(index) {
    this.props.onSelect(index)
  },

  updateOtherConcepts: function(callingIndex, state) {
    for (var ref in this.refs) {
      var item = this.refs[ref];
      if (callingIndex != item.props.index) {
        item.setState(state);
      }
    }
  },

  render: function() {
    return (
      React.createElement("ol", {id: "concepts", className: "list"}, 
        this.props.features.map(function(feature, index) {
          // Compute subgraph key from hgids
          var key = feature.properties.pits
              .map(function(pit) {return pit.hgid; })
              .join(",")
              .hashCode();

          var boundSelect = this.handleSelect.bind(this, index),
              boundUpdateOtherConcepts = this.updateOtherConcepts.bind(this, index);

          return React.createElement(ConceptsBoxListItem, {key: key, feature: feature, index: index, 
              featureGroups: this.props.featureGroups, pitLayers: this.props.pitLayers, 
              onSelect: boundSelect, ref: 'item' + index, 
              updateOtherConcepts: boundUpdateOtherConcepts});
        }.bind(this))
      )
    );
  },

  componentDidMount: function() {
    fitBounds(this.props.featureGroups.getBounds());
  },

  componentDidUpdate: function() {
    fitBounds(this.props.featureGroups.getBounds());
  }
});

var ConceptsBoxListItem = React.createClass({displayName: "ConceptsBoxListItem",
  getInitialState: function() {
    return {
      selected: false,
      unfade: true
    };
  },

  render: function() {
    var feature = this.props.feature,
        sortedNames = sortNames(feature.properties.pits),
        selectedName = sortedNames[0].name,
        selectedNames = sortedNames.slice(0, 4).map(function(name) { return name.name; }),
        selectedNamesRow;

    if (selectedNames.length > 1) {
      var namesLengthDiff = sortedNames.length - selectedNames.length,
          namesPlurSing = namesLengthDiff == 1 ? "name" : "names";

      selectedNamesSuffix = sortedNames.length > selectedNames.length ? " and " + namesLengthDiff + " other " +  namesPlurSing : "";

      selectedNamesRow =  React.createElement("tr", null, 
          React.createElement("td", {className: "label"}, "Names"), 
          React.createElement("td", null, 
            React.createElement("span", null, 
              selectedNames.map(function(selectedName, index) {
                return React.createElement("span", {key: index, className: "concept-alt-name"}, selectedName);
              })
            ), 
            React.createElement("span", null, selectedNamesSuffix)
          )
        );
    }

    var sources = feature.properties.pits
      .map(function(pit) { return pit.source; })
      .unique();

    // HTML
    // ----------------------------------------------------------------------
    var className = "padding concept" + (!this.state.selected &! this.state.unfade ? " faded" : "");

    return (
      React.createElement("li", {className: className}, 
        React.createElement("h5", null, 
          React.createElement("span", null, selectedName), 
          React.createElement("code", null, feature.properties.type.replace("hg:", ""))
        ), 
        React.createElement("table", {className: "indent"}, 
          React.createElement("tbody", null, 
            selectedNamesRow, 
            React.createElement("tr", null, 
              React.createElement("td", {className: "label"}, "Sources"), 
              React.createElement("td", null, 
                React.createElement("span", {className: "source-list"}, 
                  sources.map(function(source, index) {
                    return React.createElement("span", {key: index}, React.createElement("code", null, source));
                  })
                )
              )
            )
          )
        ), 
        React.createElement("div", {className: "buttons"}, 
          //React.createElement("button", {className: "details", onClick: this.details, title: "Show concept's details"}, "Details..."), 
          React.createElement("a", {className: "details", title: "Show concept's details", href: 'http://geothesaurus.nl/hgconcept/' + this.props.feature.properties.pits[0].hgid }, "Details..."), 
          React.createElement("button", {className: "zoom", onClick: this.zoom, title: "Zoom and pan map to concept"}, "Zoom"), 
          React.createElement("button", {className: "select", onClick: this.select, title: "Highlight concept on map (and fade others)"}, "Select")
        ), 
        React.createElement("div", {className: "clear"})
      )
    );
  },

  details: function(params) {
    fitBounds(this.featureGroup.getBounds());
    document.getElementById("concepts-box").scrollTop = 0;

    this.props.updateOtherConcepts({selected: false, unfade: false, disabled: true});
    this.setState({selected: true, unfade: false, disabled: false});
    this.props.onSelect();
  },

  zoom: function(params) {
    if (!params.noFitBounds) {
      fitBounds(this.featureGroup.getBounds());
    } else {
      //TODO: fix -60 hack!
      document.getElementById("concepts-box").scrollTop = React.findDOMNode(this).offsetTop - 60;
    }

    this.props.updateOtherConcepts({selected: false, unfade: false});
    this.setState({selected: true, unfade: false});
  },

  select: function(params) {
    this.props.updateOtherConcepts({selected: false, unfade: false});
    this.setState({selected: true, unfade: false});
  },

  componentDidMount: function() {
    var feature = this.props.feature;

    this.featureGroup = L.featureGroup();

    feature.geometry.geometries.map(function(geometry, geometryIndex) {
      var hgid,
          pitIndex;
      for (pitIndex = 0; pitIndex < feature.properties.pits.length; pitIndex++) {
        if (feature.properties.pits[pitIndex].geometryIndex == geometryIndex) {
          hgid = feature.properties.pits[pitIndex].hgid;
          break;
        }
      }

      return {
        type: "Feature",
        properties: {
          geometryIndex: geometryIndex,
          pitIndex: pitIndex,
          hgid: hgid
        },
        geometry: geometry
      };
    }).sort(function(a, b) {
      return geometryTypeOrder.indexOf(b.geometry.type) - geometryTypeOrder.indexOf(a.geometry.type);
    })
    .forEach(function(feature) {
      var geojson = L.geoJson(feature, {
        geometryType: feature.geometry.type,
        style: defaultStyle.line,
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, defaultStyle.point);
        },
        onEachFeature: function(feature, layer) {
          layer.on('click', function (e) {
            // TODO: FIX! bij pitlijst
            this.zoom({
              hgid: feature.hgid,
              noFitBounds: true
            });
          }.bind(this));
        }.bind(this)
      });
      this.featureGroup.addLayer(geojson);
    }.bind(this));

    this.addLayer();
  },

  componentDidUpdate: function() {
    if (this.state.disabled) {
      this.removeLayer();
    } else {
      this.addLayer();
    }

    this.featureGroup.getLayers().forEach(function(layer) {
      // TODO: make function for styling based on state
      // TODO: make selection object in state, denoting all possible selection states
      if (layer.options.geometryType == "Point") {
        layer.setStyle(!this.state.selected &! this.state.unfade ? fadedStyle.point : defaultStyle.point);
      } else {
        layer.setStyle(!this.state.selected &! this.state.unfade ? fadedStyle.point : defaultStyle.line);
      }
    }.bind(this));
  },

  addLayer: function() {
    this.props.featureGroups.addLayer(this.featureGroup);
    this.featureGroup.getLayers().forEach(function(layer) {
      var hgid = layer.getLayers()[0].feature.properties.hgid;
      this.props.pitLayers[hgid] = {
        layer: layer,
        featureGroup: this.featureGroup
      };
    }.bind(this));
  },

  removeLayer: function() {
    // Remove item's GeoJSON layer from Leaflet map
    this.props.featureGroups.removeLayer(this.featureGroup);
    this.featureGroup.getLayers().forEach(function(layer) {
      var hgid = layer.getLayers()[0].feature.properties.hgid;
      delete this.props.pitLayers[hgid];
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.removeLayer();
  }
});

/**
 * Components for single concept
 */

var ConceptBoxResults = React.createClass({displayName: "ConceptBoxResults",
  render: function() {
    var feature = this.props.feature;
    var sortedNames = sortNames(feature.properties.pits),
        selectedName = sortedNames[0].name;
        pitCount = feature.properties.pits.length,
        message = "Concept contains " + pitCount + " place "
            + ((pitCount == 1) ? "name" : "names");

    return (
      React.createElement("div", null, 
        React.createElement("div", {id: "pits-results", className: "padding results"}, 
          "1 concept selected:", 
          React.createElement("a", {id: "pits-close", className: "float-right", href: "#", onClick: this.props.back}, "Back to concept list")
        ), 
        React.createElement("div", {id: "pits-header", className: "padding"}, 
          React.createElement("h5", null, selectedName, React.createElement("code", null, this.props.feature.properties.type.replace("hg:", ""))), 
          React.createElement("div", {className: "cell-padding"}, 
            message, 
            React.createElement("a", {id: "show-graph", className: "float-right", href: "#", onClick: this.showGraph}, this.props.graphHidden ? "Show graph" : "Hide graph")
          )
        )
      )
    );
  },

  showGraph: function(event) {
    this.props.showGraph();
    event.preventDefault();
  }
});

var ConceptBoxList = React.createClass({displayName: "ConceptBoxList",
  getInitialState: function() {
    var sortFields = [
          "# relations",
          "name",
          "period",
          "source"
        ],
        sources = this.props.feature.properties.pits
          .map(function(pit) { return pit.source; })
          .unique()
          .reduce(function(o, v) {
            o[v] = true;
            return o;
          }, {});

    return {
      loop: {
        index: 0,
        timer: null,
        delay: 800
      },
      hgids: {

      },
      filters: {
        sources: sources,
        name: /.*/,
        geometryTypes: {
          none: true,
          points: true,
          lines: true,
          polygons: true
        }
      },
      sortField: sortFields[0],
      sortFields: sortFields
    };
  },

  render: function() {
    var sources = this.props.feature.properties.pits
            .map(function(pit) { return pit.source; })
            .unique()
        filteredPits = this.props.feature.properties.pits
            .filter(function(pit) {
              filterGeometryType = "none";
              if (pit.geometryIndex > -1) {
                var geometryType = this.props.feature.geometry.geometries[pit.geometryIndex].type;
                if (geometryType === "Point" || geometryType === "MultiPoint") {
                  filterGeometryType = "points";
                } else if (geometryType === "LineString" || geometryType === "MultiLineString") {
                  filterGeometryType = "lines";
                } else if (geometryType === "Polygon" || geometryType === "MultiPolygon") {
                  filterGeometryType = "polygons";
                }
              }

              return this.state.filters.geometryTypes[filterGeometryType]
                  && this.state.filters.name.test(pit.name.toLowerCase())
                  && this.state.filters.sources[pit.source];
            }.bind(this));

    if (this.state.sortField != this.state.sortFields[0]) {
      filteredPits.sort(function(a, b) {
        if (this.state.sortField == "name") {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        } else if (this.state.sortField == "period") {
          var dateA = a.hasBeginning || a.hasEnd,
              dateB = b.hasBeginning || b.hasEnd;

          // http://stackoverflow.com/questions/11526504/minimum-and-maximum-date
          if (!dateA) dateA = 8640000000000000;
          if (!dateB) dateB = 8640000000000000;

          return (new Date(dateA)) - (new Date(dateB));
        } else if (this.state.sortField == "source") {
          return a.source.localeCompare(b.source);
        }
      }.bind(this));
    }

    // // Set hgids, filtered hgids and disabled hgids (that did not pass filter) in state
    // var allHgids = this.props.feature.properties.pits.map(function(pit) { return pit.hgid; }),
    //     filteredHgids = filteredPits.map(function(pit) { return pit.hgid; });
    //
    // this.state.hgids = {
    //   all: allHgids
    //   filtered: filteredHgids
    //   disabled: allHgids.filter(function(hgid) { return filteredHgids.indexOf(hgid) < 0 });
    // };

    var geometryCount = filteredPits.filter(function(pit) {
      return pit.geometryIndex > -1;
    }).length;

    var pitComponents = filteredPits.map(function(pit, index) {
      var boundUpdateOtherPits = this.updateOtherPits.bind(this, index);
      return React.createElement(Pit, {key: pit.hgid, pit: pit, feature: this.props.feature, index: index, 
          featureGroups: this.props.featureGroups, pitLayers: this.props.pitLayers, 
          ref: 'item' + index, updateOtherPits: boundUpdateOtherPits});
    }.bind(this));

    var filterMessage;
    if (filteredPits.length > 0) {
      var loopMessage = this.state.loop.timer ? "Stop " : "Timelapse ";
      filterMessage = React.createElement("span", null, 
          "Showing ", filteredPits.length, " place ", filteredPits.length == 1 ? "name" : "names", " (", geometryCount, " on map):", 
          React.createElement("a", {title: "Start timelapse - loop selected place names", id: "loop-pits", className: "float-right", href: "#", onClick: this.toggleLoop}, 
            loopMessage, 
          React.createElement("img", {src: "/images/rocket.png", height: "18px"}))
          );
    } else {
      filterMessage = React.createElement("span", null, "No place names matching your filter");
    }

    var firstHgid = this.props.feature.properties.pits[0].hgid,
        apiUrl = getApiUrl(firstHgid),
        links = {
          histograph: apiUrl,
          jsonld: "http://json-ld.org/playground/index.html#startTab=tab-normalized&json-ld=" + apiUrl,
          geojson: "http://geojson.io/#data=data:text/x-url, " + encodeURIComponent(apiUrl)
        };

    return (
      React.createElement("div", null,
        React.createElement("div", {className: "padding"},
          React.createElement("table", {className: "indent"},
            React.createElement("tbody", null,
              React.createElement("tr", null,
                React.createElement("td", {className: "label"}, "Data"),
                React.createElement("td", null,
                  React.createElement("a", {href: links['histograph']}, "API"), ", ", React.createElement("a", {href: links['jsonld']}, "JSON-LD Playground"), ", ", React.createElement("a", {href: links['geojson']}, "geojson.io")
                )
              ),
              React.createElement("tr", null,
                React.createElement("td", {className: "label"}, "Names"),
                React.createElement("td", null,
                  React.createElement("input", {type: "search", placeholder: "Filter names", id: "pit-name-filter", onChange: this.filterName})
                )
              ),
              React.createElement("tr", null,
                React.createElement("td", {className: "label"}, "Sources"),
                React.createElement("td", null,
                  React.createElement("span", {className: "source-list"},
                    sources.map(function(source, index) {
                      var boundFilterSource = this.filterSource.bind(this, source),
                          className = this.state.filters.sources[source] ? "" : "filtered";
                      return React.createElement("span", {key: source}, React.createElement("a", {className: className, href: "#",
                                onClick: boundFilterSource}, React.createElement("code", null, source)), " ");
                    }.bind(this))
                  )
                )
              ),

              React.createElement("tr", null,
                React.createElement("td", {className: "label"}, "Geom"),
                React.createElement("td", null,
                  React.createElement("span", {className: "geometry-type-list"},
                    Object.keys(this.state.filters.geometryTypes).map(function(geometryType, index) {
                      var boundFilterGeometryType = this.filterGeometryType.bind(this, geometryType),
                          //geometry-type
                          className = this.state.filters.geometryTypes[geometryType] ? "" : "filtered";
                      return React.createElement("span", {key: geometryType}, React.createElement("a", {className: className, href: "#",
                                onClick: boundFilterGeometryType}, geometryType));
                    }.bind(this))
                  )
                )
              ),

              React.createElement("tr", null,
                React.createElement("td", {className: "label"}, "Sort"),
                React.createElement("td", {className: "sort-fields"},
                  this.state.sortFields.map(function(field, index) {
                    var boundSort = this.sort.bind(this, field),
                        className = this.state.sortField === field ? "selected" : "";
                    return React.createElement("span", {key: field}, React.createElement("a", {className: className, href: "#", onClick: boundSort}, field));
                  }.bind(this))
                )
              )
            )
          ),
          React.createElement("p", null,
            filterMessage
          )
        ),
        React.createElement("ol", {id: "pits", className: "list"},
          pitComponents
        )
      )
    );
  },

  updateOtherPits: function(callingIndex, state) {
    for (var ref in this.refs) {
      var item = this.refs[ref];
      if (callingIndex != item.props.index) {
        // TODO: setstate? or item.state = ?
        item.setState(state);
      }
    }
  },

  sort: function(field, event) {
    this.state.sortField = field;
    this.forceUpdate();
    event.preventDefault();
  },

  toggleLoop: function() {
    if (!this.state.loop.timer) {
      this.state.loop.timer = setTimeout(this.loopStep, this.state.loop.delay);
    } else {
      clearTimeout(this.state.loop.timer);
      this.state.loop.index = -1;
      this.state.loop.timer = undefined;
    }
    this.forceUpdate();
  },

  loopStep: function() {
    var refKeys = Object.keys(this.refs);
    for (var i = 0; i < refKeys.length; i++) {
      var newIndex = (i + this.state.loop.index + 1) % refKeys.length;
      if (this.refs[refKeys[newIndex]].props.pit.geometryIndex > -1) {
        this.state.loop.index = newIndex;
        break;
      }
    }

    for (var ref in this.refs) {
      var item = this.refs[ref];
      if (this.state.loop.index == item.props.index) {
        item.state.selected = true;
        item.state.unfade = false;
      } else {
        item.state.selected = false;
        item.state.unfade = false;
      }
    }

    this.state.loop.timer = setTimeout(this.loopStep, this.state.loop.delay);
    this.forceUpdate();
  },

  filterName: function(event) {
    var value = document.getElementById("pit-name-filter").value.toLowerCase();
    this.state.filters.name = new RegExp(".*" + value + ".*");
    this.forceUpdate();
  },

  filterGeometryType: function(geometryType, event) {
    this.state.filters.geometryTypes[geometryType] = !this.state.filters.geometryTypes[geometryType];
    event.preventDefault();
    this.forceUpdate();
  },

  filterSource: function(source, event) {
    if (event.shiftKey) {
      var current = this.state.filters.sources[source];

      var count = 0;
      for (s in this.state.filters.sources) {
        count += this.state.filters.sources[s] ? 1 : 0;
      }

      var length = Object.keys(this.state.filters.sources).length;
      if (length == count) {
        current = !current;
      }

      for (s in this.state.filters.sources) {
        this.state.filters.sources[s] = current;
      }
      this.state.filters.sources[source] = !current;
    } else {
      this.state.filters.sources[source] = !this.state.filters.sources[source];
    }

    event.preventDefault();
    this.forceUpdate();
  }

});

var Pit = React.createClass({displayName: "Pit",
  getInitialState: function() {
    return {
      selected: false,
      unfade: true
    };
  },

  render: function() {
    var pit = this.props.pit,
        uriRow,
        geometryRow,
        periodRow,
        geometrySpan,
        buttons;

    if (pit.uri) {
      uriRow = (React.createElement("tr", null, React.createElement("td", {className: "label"}, "URI"), React.createElement("td", null, React.createElement("a", {href: pit.uri}, pit.uri))));
    }

    if (pit.geometryIndex > -1) {
      geometryRow = (React.createElement("tr", null, React.createElement("td", {className: "label"}, "Geometry"), React.createElement("td", null, "Jaatjes")));
    }

    if (pit.hasBeginning || pit.hasEnd) {
      var period;
      if (pit.hasBeginning && pit.hasEnd) {
        period = pit.hasBeginning + " - " + pit.hasEnd;
      } else if (pit.hasBeginning) {
        period = "from " + pit.hasBeginning;
      } else if (pit.hasEnd) {
        period = "until " + pit.hasEnd;
      }
      periodRow = (React.createElement("tr", null, React.createElement("td", {className: "label"}, "Period"), React.createElement("td", null, period)));
    }

    if (pit.geometryIndex > -1) {
      var className = "float-right geometry-type ",
          geometryType = this.props.feature.geometry.geometries[pit.geometryIndex].type;

      if (geometryType === "Point" || geometryType === "MultiPoint") {
        className += "geometry-type-point";
      } else if (geometryType === "LineString" || geometryType === "MultiLineString") {
        className += "geometry-type-line";
      } else if (geometryType === "Polygon" || geometryType === "MultiPolygon") {
        className += "geometry-type-polygon";
      }
      geometrySpan = (React.createElement("span", {className: className}));

      buttons = (
        React.createElement("div", {className: "buttons"}, 
          React.createElement("button", {className: "zoom", onClick: this.zoom, title: "Zoom and pan map to place name"}, "Zoom"), 
          React.createElement("button", {className: "select", onClick: this.select, title: "Select place name (and fade others)"}, "Select")
        )
      );
    }

    var className = "padding pit" + (!this.state.selected &! this.state.unfade ? " faded" : "");

    return (
      React.createElement("li", {className: className}, 
        React.createElement("h6", null, pit.name, geometrySpan), 
        React.createElement("div", null, 
          React.createElement("table", null, 
            React.createElement("tbody", null, 
              React.createElement("tr", null, 
                React.createElement("td", {className: "label"}, "ID"), 
                React.createElement("td", null, React.createElement("code", null, pit.hgid))
              ), 
              uriRow, 
              periodRow
            )
          ), 
          buttons, 
          React.createElement("div", {className: "clear"})
        )
      )
    );
  },

  zoom: function(params) {
    if (!params.noFitBounds) {
      fitBounds(this.props.pitLayers[this.props.pit.hgid].layer.getBounds());
    } else {
      //TODO: fix -60 hack!
      document.getElementById("concepts-box").scrollTop = React.findDOMNode(this).offsetTop - 60;
    }

    this.props.updateOtherPits({selected: false, unfade: false});
    this.setState({selected: true, unfade: false});
  },

  select: function(params) {
    this.props.updateOtherPits({selected: false, unfade: false});
    this.setState({selected: true, unfade: false});
  },

  setLayerStyle: function(style) {
    if (this.props.pit.geometryIndex > -1) {
      var pitLayer = this.props.pitLayers[this.props.pit.hgid],
          layer = pitLayer ? pitLayer.layer : undefined;

      if (layer) {
        if (style.point && style.line) {
          if (layer.options.geometryType == "Point") {
            layer.setStyle(style.point);
          } else {
            layer.setStyle(style.line);
          }
        } else {
          layer.setStyle(style);
        }

      }
    }
  },

  componentDidUpdate: function() {
    this.setLayerStyle(!this.state.selected &! this.state.unfade ? fadedStyle : defaultStyle);
  },

  componentWillMount: function() {
    this.setLayerStyle({
      fill: true,
      stroke: true
    });
  },

  componentWillUnmount: function() {
    this.setLayerStyle({
      fill: false,
      stroke: false
    });
  }

});

var Graph = React.createClass({displayName: "Graph",
  render: function() {
    if (this.props.graphHidden) {
      return null;
    } else {
      return (
        React.createElement("div", {id: "graph-container", className: "box-container"}, 
          React.createElement("div", {className: "box-container-padding"}, 
            React.createElement("div", {id: "graph-box", className: "box"}, 
              React.createElement("svg", {id: "graph"}, 
                React.createElement("defs", null, 
                  React.createElement("marker", {id: "marker-arrow", orient: "auto", markerWidth: "8", markerHeight: "8", 
                      refX: "12", refY: "4"}, 
                    React.createElement("path", {d: "M0,0 V8 L8,4 Z"})
                  )
                )
              )
            )
          )
        )
      );
    }
  },

  componentDidUpdate: function() {
    // #graph has fixed position, z-index does not work...
    d3.select("#map .leaflet-control-container").classed("hidden", !this.props.graphHidden);

    var graphContainer = document.querySelectorAll("#graph-container > div");
    d3.select("#graph")
        .datum(this.props.feature)
        .call(graph().width(graphContainer.offsetWidth).height(graphContainer.offsetHeight));
  }
});

// TODO: map element as props, svg element as props
var resultsBox = React.render(
  React.createElement(ResultsBox, null),
  document.getElementById('concepts-box')
);
