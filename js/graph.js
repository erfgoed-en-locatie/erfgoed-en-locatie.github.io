function graph() {
  var events = d3.dispatch('click', 'click'),
      svgGroups = [
        "link",
        "circle",
        "text",
        "label"
      ];

  function makeGraph(selection) {
    var width = 800,
        height = 800;

    selection.each(function() {
      var groups = selection.selectAll("g")
              .data(svgGroups)
              .enter()
            .append("g")
              .attr("class", function(d) {
                return d;
              }),
          feature = d3.select(this).datum(),
          linkG = selection.select("." + svgGroups[0]),
          circleG = selection.select("." + svgGroups[1]),
          textG = selection.select("." + svgGroups[2]),
          labelG = selection.select("." + svgGroups[3]),
          createNode = function(pit) {
            return {
              name: pit.name,
              hgid: pit.hgid,
              uri: pit.uri,
              startDate: pit.startDate,
              endDate: pit.endDate,
              geometryIndex: pit.geometryIndex,
              x: 0,
              y: 0,
              outgoing: [],
              incoming: []
            };
          },
          nodes = {};
          links = {};


      // First, create D3 nodes from all PITs
      feature.properties.pits.forEach(function(pit) {
        nodes[pit.hgid] = createNode(pit);
      });

      // Then create links from each PIT's relations
      feature.properties.pits.forEach(function(pit) {
        var source = nodes[pit.hgid];

        if (pit.relations) {
          Object.keys(pit.relations).forEach(function(relation) {
            if (relation !== "@id") {
              pit.relations[relation].forEach(function(id) {
                var hgid = id["@id"],
                    target = nodes[hgid];

                nodes[pit.hgid].outgoing.push(target);
                nodes[hgid].incoming.push(source);

                links[pit.hgid + "-" + hgid] = {
                  source: source,
                  target: target,
                  label: relation
                };
              });
            }
          });
        }
      });

      var transform = function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      };

      var tick = function () {
        circle.attr("transform", transform);
        text.attr("transform", transform);
        link.attr("d", function(d) {
          return "M" + d.source.x + "," + d.source.y + " "
              + "L" + d.target.x + "," + d.target.y;
        });

        //label.attr("xlink:href", function(d, i) { return "#path" + i; });
      };


      var circle,
          text,
          link,
          label;

      var circleRadius = 5,
          force = cola.d3adaptor()
          .jaccardLinkLengths(100,0.7)
          //.linkDistance(50)
          //.symmetricDiffLinkLengths(130)

          .start(30, 30)
          .on("tick", tick)
          .size([
            width,
            height
          ]);



        force.nodes(d3.values(nodes))
             .links(d3.values(links));

        link = linkG.selectAll("path")
            .data(force.links(), function(d) { return d.source.hgid + "-" + d.target.hgid; });

        link.enter().append("path")
            .attr("d", function(d) {
              return "M" + d.source.x + "," + d.source.y + " "
                  + "L" + d.target.x + "," + d.target.y;
            })
            .attr("id", function(d, i) { return "path" + i; });
        link.exit().remove();

        // // Relation labels
        // label = labelG.selectAll("text")
        //     .data(force.links(), function(d) { return d.source.hgid + "-" + d.target.hgid; });
        //
        // label.enter().append("text")
        //     .style("width", "100%")
        //     .style("text-anchor", "middle")
        //     .style("padding", "3px")
        //     .style("background-color", "white")
        //     .attr("dy", "-4px")
        //   .append("textPath")
        //     .attr("xlink:href", function(d, i) { return "#path" + i; })
        //     .attr("startOffset", "50%")
        //     .html(function(d) { return d.label; });
        // label.exit().remove();

        circle = circleG.selectAll("circle")
            .data(force.nodes(), function(d) { return d.hgid;});

        circle.enter().append("circle")
            .attr("transform", transform)
            .attr("r", circleRadius)
            .attr("class", "graph-pit")
            .classed("has-geometry", function(d) {
              return d.geometryIndex > -1;
            })
            //.on("click", vertexClick)
            .call(force.drag);
        circle.exit().remove();

        text = textG.selectAll("text")
            .data(force.nodes(), function(d) { return d.hgid;});

        var tspans = text.enter().append("text")

        tspans.append("tspan")
            .text(function(d) { return d.name; })
            .attr("x", "12px")
            .attr("y", "12px");

        tspans.append("tspan")
            .text(function(d) { return d.hgid; })
            .attr("class", "graph-hgid")
            .attr("x", "12")
            .attr("y", "30px");

        text.exit().remove();

        force.start();

    });
  }

  function click(value, transition) {
  }

  events.on('click', click);

  //
  // var resizeTimer;
  // var nodes = {},
  //     links = {};
  //
  // var circle,
  //     text,
  //     link,
  //     label;
  //
  // var force = d3.layout.force()
  //     .gravity(.09)
  //     .charge(-800)
  //     .linkDistance(200)
  //     .on("tick", tick)
  //     .size([
  //       document.getElementById("graph-box").offsetWidth,
  //       document.getElementById("graph-box").offsetHeight
  //     ]);
  //
  // var svg = d3.select("svg#graph");
  //
  // var linkG = svg.append("g"),
  //     circleG = svg.append("g"),
  //     textG = svg.append("g"),
  //     labelG = svg.append("g");
  //
  // d3.select(window).on("resize", function() {
  //   clearInterval(resizeTimer);
  //   resizeTimer = setInterval(resize, 20);
  // });
  //
  //
  //
  //
  // function resize() {
  //   width = window.innerWidth, height = window.innerHeight;
  //   svg.attr("width", width).attr("height", height);
  //   force.size([width, height]).resume();
  // }
  //
  // function createNode(node) {
  //   return {
  //     uri: node.uri,
  //     name: node.name,
  //     geometry: node.geometry,
  //     startDate: node.startDate,
  //     endDate: node.endDate,
  //     type: node.type,
  //     x: width / 2,
  //     y: height / 2,
  //     outgoing: [],
  //     incoming: []
  //   };
  // }


  //
  //   nodes = {};
  //   links = {};
  //
  //   width = window.innerWidth, height = window.innerHeight;
  //
  //   // Compute the distinct nodes from the links.
  //   for (var linkId in json.links) {
  //
  //     var link = json.links[linkId];
  //
  //     var source = nodes[link.source] || (nodes[link.source] = createNode(json.nodes[link.source]));
  //     var target = nodes[link.target] || (nodes[link.target] = createNode(json.nodes[link.target]));
  //
  //     nodes[link.source].outgoing.push(target);
  //     nodes[link.target].incoming.push(source);
  //
  //     links[source.uri + "-" + target.uri] || (links[source.uri + "-" + target.uri] = {
  //       source: source,
  //       target: target,
  //       label: link.label
  //     });
  //
  //   }
  //
  //   for (var nodeId in json.nodes) {
  //     if (!(nodeId in nodes)) {
  //       nodes[nodeId] = createNode(json.nodes[nodeId]);
  //     }
  //   }
  //
  //   update();





  // function tick() {
  //   circle.attr("transform", transform);
  //   text.attr("transform", transform);
  //   link.attr("d", function(d) {
  //     return "M" + d.source.x + "," + d.source.y + " "
  //         + "L" + d.target.x + "," + d.target.y;
  //   });
  //
  //   //label.attr("xlink:href", function(d, i) { return "#path" + i; });
  // }
  //
  // function transform(d) {
  //   return "translate(" + d.x + "," + d.y + ")";
  // }
  //
  // function update() {
  //   force.nodes(d3.values(nodes))
  //        .links(d3.values(links));
  //
  //   // Per-type markers, as they don't inherit styles.
  //   // svg.append("defs").selectAll("marker")
  //   //     .data(["suit", "licensing", "resolved"])
  //   //   .enter().append("marker")
  //   //     .attr("id", function(d) { return d; })
  //   //     .attr("viewBox", "0 -5 10 10")
  //   //     .attr("refX", 15)
  //   //     .attr("refY", -1.5)
  //   //     .attr("markerWidth", 6)
  //   //     .attr("markerHeight", 6)
  //   //     .attr("orient", "auto")
  //   //   .append("path")
  //   //     .attr("d", "M0,-5L10,0L0,5");
  //
  //   link = linkG.selectAll("path")
  //       .data(force.links(), function(d) { return d.source.uri + "-" + d.target.uri; });
  //
  //   link.enter().append("path")
  //       .attr("d", function(d) {
  //         return "M" + d.source.x + "," + d.source.y + " "
  //             + "L" + d.target.x + "," + d.target.y;
  //       })
  //       .attr("id", function(d, i) { return "path" + i; });
  //   link.exit().remove();
  //
  //   label = labelG.selectAll("text")
  //       .data(force.links(), function(d) { return d.source.uri + "-" + d.target.uri; });
  //
  //   label.enter().append("text")
  //       .style("width", "100%")
  //       .style("text-anchor", "middle")
  //       .style("padding", "3px")
  //       .style("background-color", "white")
  //       .attr("dy", "-4px")
  //     .append("textPath")
  //       .attr("xlink:href", function(d, i) { return "#path" + i; })
  //       .attr("startOffset", "50%")
  //       .html(function(d) { return d.label; });
  //   label.exit().remove();
  //
  //   circle = circleG.selectAll("circle")
  //       .data(force.nodes(), function(d) { return d.uri;});
  //
  //   circle.enter().append("circle")
  //       .attr("transform", transform)
  //       .attr("r", circleRadius)
  //       .attr("class", "pit")
  //       .classed("has-geometry", function(d) {
  //         return d.geometry && d.geometry.type;
  //       })
  //       .on("click", vertexClick)
  //       .call(force.drag);
  //   circle.exit().remove();
  //
  //   text = textG.selectAll("text")
  //       .data(force.nodes(), function(d) { return d.uri;});
  //
  //   text.enter().append("text")
  //       .attr("x", "12px")
  //       .attr("y", "12px")
  //       .text(function(d) { return d.name; });
  //   text.exit().remove();
  //
  //   force.start();
  // }

  makeGraph.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return makeGraph;
  }

  makeGraph.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return makeGraph;
  }

  var bound = d3.rebind(makeGraph, events, 'on');

  return bound;
}

































// // we can increase this, everything will scale up with us
// var w=960,h=500,
//     svg=d3.select("#chart")
//         .append("svg")
//         .attr("width",w)
//         .attr("height",h);
//
//
// /**
//  * textBlock - a really simple demonstration of a reusable d3 element /
//  * plugin following Mike Bostock's "Towards Reusable Charts" pattern on
//  * http://bost.ocks.org/mike/chart/
//  *
//  * This simply draws a rect around the text specified in the label property.
//  *
//  * This example is also available as a block:
//  * http://bl.ocks.org/cpbotha/5073718
//  *
//  * Other more complex examples that folow this pattern are:
//  * https://github.com/d3/d3-plugins/tree/master/bullet
//  * https://github.com/d3/d3-plugins/tree/master/chernoff
//  *
//  * author: Charl P. Botha - http://charlbotha.com/
//  */
// d3.textBlock = function() {
//     // label property: this will get drawn enclosed perfectly by a rect
//     var label = "";
//
//     // this function object is returned when textBlock() is invoked.
//     // after setting properties (label above), it can be invoked on
//     // a whole selection by using call() -- see the rest of the example.
//     function my(selection) {
//         selection.each(function(d, i) {
//             // inside here, d is the current data item, i is its index.
//             // "this" is the element that has been appended, in the case of
//             // this example, a svg:g
//
//             // the text property could have been specified by the user as a
//             // value, or a function of the current data item.
//             var labelvar = (typeof(label) === "function" ? label(d) : label);
//
//             // convert element (svg:g) into something that D3 can use
//             // element is a single-element selection
//             var element = d3.select(this);
//
//             // first append text to svg:g
//             var t = element.append("text")
//                 .text(labelvar) // here we set the label property on the text element
//                 .attr("dominant-baseline", "central"); // vertically centered
//             // get the bounding box of the just created text element
//             var bb = t[0][0].getBBox();
//
//             // then append svg rect to svg:g
//             // doing some adjustments so we fit snugly around the text: we're
//             // inside a transform, so only have to move relative to 0
//             element.append("rect")
//     .attr("x", -5) // 5px margin
//                 .attr("y", - bb.height) // so text is vertically within block
//                 .attr("width", bb.width + 10) // 5px margin on left + right
//                 .attr("height", bb.height * 2)
//                 .attr("fill", "steelblue")
//                 .attr("fill-opacity", 0.3)
//                 .attr("stroke", "black")
//                 .attr("stroke-width", 2);
//
//         });
//
//     }
//
//     // getter / setter for the label property
//     my.label = function(value) {
//         if (!arguments.length) return value;
//         label = value;
//         return my;
//     };
//
//     return my;
// }

// // calling textBlock() returns the function object textBlock().my
// // via which we set the "label" property of the textBlock outer func
// var tb = d3.textBlock().label(function(d) {return d.label;});
// // now we apply the returned function object my == tb on an enter selection
// var item = svg.selectAll("rect")
//     .data(items)
//   .enter()
//     .append("svg:g")
//     .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
//     .call(tb);
