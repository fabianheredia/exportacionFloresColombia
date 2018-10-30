// var selectDepto = document.getElementById("selDepto"),
var elemento = document.getElementById('grafico');
document.body.style.zoom = 0.80
var highlight_stroke_width = 3,
  highlight_color = "#fd0000",
  highlight_trans = 0.1,
  highlight_stroke_opacity = 0.7,
  highlight_text_size = "17px",

  default_stroke_width = 1,
  default_stroke_color = "#777777",
  default_stroke_opacity = 0.5,
  default_text_size = "15px",

  width = 700,
  height = 500,
  margin = {
    top: 50,
    right: 20,
    bottom: 80,
    left: 20
  };
var breaks = ["origen","destino"];


var svg = d3
  .select(".grafico")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);
var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
let r = 4,
  color = d3.scaleOrdinal(d3.schemeCategory20),
  color2 = d3.scaleOrdinal(d3.schemeCategory20),
  widthScale = d3.scaleLinear().range([0, width - margin.left - margin.right]),
  heightScale = d3.scaleLinear().range([0, height - margin.top - margin.bottom]),
  exportacionScale = d3.scaleLinear().range([1,10]);


  var simulation = d3.forceSimulation()
  .force("link", d3.forceLink().id(d => {
    return d.Pais;
  }).distance(3))
  .force("collide", d3.forceCollide(r + 3))
  .force("charge", d3.forceManyBody().strength(-20))

  .force('x', d3.forceX()
       .x((d,i) =>{                
       console.log(widthScale(i));
            return widthScale(i);
        
    }).strength(2))
    .force('y', d3.forceY()
    .y((d,i) => {                
         return heightScale(i);
 }).strength(2));
//get Data
//const _urlData = "https://github.com/fabianheredia/exportacionFloresColombia/blob/master/data/data.json";
const _urlData = "/data/data.json";
d3.json(_urlData).then(datos => {

 
  widthScale.domain([0,200]).nice();
  heightScale.domain([0,40]).nice();

  console.log(datos);
  var link = g.append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(datos.links)
    .enter().append("line")
    .attr("stroke-width", default_stroke_width)
    .attr("stroke", default_stroke_color)
    .attr("stroke-opacity", default_stroke_opacity);

  var node = g.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(datos.nodes);


  var nodeEnter = node.enter()
    .append("circle")
    .attr("r",10);
  node.merge(nodeEnter)
    .attr("stroke", "white")
    .attr("stroke-width", 0.5)
    .attr("fill", function (d) {
      return color(d.tipo);
    })
    .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
    .append("title")
    .html(d=> d.Pais);

  var text = g.selectAll(".text")
    .data(datos.nodes)
    .enter().append("text")
    .attr("dy", ".35em")
    .style("font-size", default_text_size)
    .text(d=> d.Pais);

  simulation
    .nodes(datos.nodes)
    .on("tick", ticked);

  simulation.force("link")
    .links(datos.links);

  var key = g.append("g")
    .attr("transform", "translate(" + (width * 0.35) + "," + (height * 0.90) + ")");

  key.selectAll("rect")
    .data(breaks)
    .enter()
    .append("rect")
    .attr("width", "15px")
    .attr("height", "15px")
    .attr("x", function (d, i) {
      return i * 150;
    })
    .attr("fill", function (d) {
      return color2(d);
    });

  key.selectAll("text")
    .data(breaks)
    .enter()
    .append("text")
    .attr("x", function (d, i) {
      return 15 + 5 + (i * 150);
    })
    .attr("y", "1em")
    .attr("font-size", 15)
    .text(function (d, i) {
      return breaks[i];
    });

  function ticked() {
    link
      .attr("x1", function (d) {
        return d.origen.x;
      })
      .attr("y1", function (d) {
        return d.origen.y;
      })
      .attr("x2", function (d) {
        return d.destino.x;
      })
      .attr("y2", function (d) {
        return d.destino.y;
      });

    node.merge(nodeEnter)
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      });

    text
      .attr("transform", function (d) {
        return "translate(" + (d.x + 10) + "," + d.y + ")";
      });
  }

  g.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (height * 0.85) + ")")
    .style("font-size", default_text_size)
    .call(d3.axisBottom(widthScale).ticks(null, "0"))
    .append("text")
    .attr("class", "axis_label")
    .attr("transform", "translate(" + (0) + "," + 45 + ")")
    .attr("font-weight", "bold")
    .text("Año de Lanzamiento")
    .attr("text-anchor", "start");

  var linkedByIndex = {};
  datos.links.forEach(function (d) {
    linkedByIndex[d.origen.Pais + "," + d.destino.Pais] = true;
  });

  function isConnected(a, b) {
    return linkedByIndex[a.Pais + "," + b.Pais] || linkedByIndex[b.Pais + "," + a.Pais] || a.Pais == b.Pais;
  }

  // node.merge(nodeEnter)
  //   .on("mouseover", function (d) {
  //     set_highlight(d);
  //   })
  //   .on("mouseout", function () {
  //     exit_highlight();
  //   });

  function set_highlight(d) {
    svg.style("cursor", "pointer");

    text
      .style("font-weight", function (o) {
        return isConnected(d, o) ? "bold" : "normal";
      })

    link
      .attr("stroke-width", function (o) {
        return o.origen.Pais == d.Pais || o.destino.Pais == d.Pais ? highlight_stroke_width : default_stroke_width;
      })

      .style("stroke", function (o) {
        return o.origen.Pais == d.Pais || o.destino.Pais == d.Pais ? highlight_color : default_stroke_color;
      })

      .attr("stroke-opacity", function (o) {
        return o.origen.Pais == d.Pais || o.destino.Pais == d.Pais ? highlight_stroke_opacity : default_stroke_opacity;
      });
  }

  function set_highlight2(d) {
    svg.style("cursor", "pointer");

    node.merge(nodeEnter)
      .attr("fill-opacity", function (o) {
        return isConnected(d, o) ? 1 : highlight_trans;
      })

      .attr("r", function (o) {
        return isConnected(d, o) ? r * 1.5 : r * 1.3;
      })

    text
      .style("opacity", function (o) {
        return isConnected(d, o) ? 1 : default_stroke_opacity;
      })

      .style("font-weight", function (o) {
        return isConnected(d, o) ? "bold" : "normal";
      })

      .style("font-size", function (o) {
        return isConnected(d, o) ? highlight_text_size : default_text_size;
      })

      .text(function (o) {
        
          return o.Pais;
        
      });

    link
      .attr("stroke-width", function (o) {
        return o.origen.Pais == d.Pais || o.destino.Pais == d.Pais ? highlight_stroke_width : default_stroke_width;
      })

      .style("stroke", function (o) {
        return o.origen.Pais == d.Pais || o.destino.Pais == d.Pais ? highlight_color : default_stroke_color;
      })

      .attr("stroke-opacity", function (o) {
        return o.origen.Pais == d.Pais || o.destino.Pais == d.Pais ? highlight_stroke_opacity : highlight_trans;
      });
  }

  function exit_highlight() {
    svg.style("cursor", "default");

    node.merge(nodeEnter)
      .attr("fill-opacity", 1)
      .attr("r", function (d) {
        
          return r;
      
      })

    text
      .style("opacity", 1)
      .style("font-weight", "normal")
      .style("font-size", default_text_size)
      .text(function (d) {
        
          return d.Pais;
        
      });
    link
      .attr("stroke-width", default_stroke_width)
      .style("stroke", default_stroke_color)
      .attr("stroke-opacity", default_stroke_opacity);
  }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphadestino(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;

    set_highlight2(d);
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;

    set_highlight2(d);
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphadestino(0);
    d.fx = null;
    d.fy = null;

    exit_highlight();
    set_highlight(d);
  }
});