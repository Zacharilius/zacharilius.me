$(function() {
    drawStatesWithLabels(); 
});



function drawStatesWithLabels() {
    var width = $(window).width();
    var height = $(window).height();
    var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);
    var path = d3.geo.path()
        .projection(projection);
    var svg = d3.select("#map-container").append("svg")
        .attr("width", width)
        .attr("height", height);
    d3.json(window.usStateMapUrl, function(error, us) {
      if (error) throw error;
      svg.insert("path", ".graticule")
          .datum(topojson.feature(us, us.objects.land))
          .attr("class", "land")
          .attr("d", path);
      // svg.insert("path", ".graticule")
      //     .datum(topojson.mesh(us, us.objects.counties, function(a, b) { return a !== b && !(a.id / 1000 ^ b.id / 1000); }))
      //     .attr("class", "county-boundary")
      //     .attr("d", path);
      svg.insert("path", ".graticule")
          .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
          .attr("class", "state-boundary")
          .attr("d", path);
    });
    d3.select(self.frameElement).style("height", height + "px");    
}

function drawWorldStarbucksMap() {
    var width = 960;
    var height = 480;

    var projection = d3.geo.equirectangular()
      .scale(153)
      .translate([width / 2, height / 2])
      .precision(.1);

    var path = d3.geo.path()
      .projection(projection);

    var graticule = d3.geo.graticule();

    var svg = d3.select('#map-container').append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.append('path')
        .datum(graticule)
        .attr('class', 'graticule')
        .attr('d', path);

    d3.json(window.worldMapUrl, function(error, world) {
        if (error) throw error;

        svg.insert('path', '.graticule')
            .datum(topojson.feature(world, world.objects.land))
            .attr('class', 'land')
            .attr('d', path);

        svg.insert('path', '.graticule')
            .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
            .attr('class', 'boundary')
            .attr('d', path);
    });



    d3.json(window.starbucksUrl, function(error, starbucks) {
        if (error) {
            throw error;
        }
        var circle = svg.selectAll('circle')
            .data(starbucks, function(d) { return d; });

        circle.enter().append('circle')
            .attr('fill', 'blue')
            .attr('r', 1)
            .attr('transform', function(d, i) {return 'translate(' + projection([d.longitude, d.latitude]) + ')';})
            .attr('d', function(d, i) {return d});

        circle.exit().remove();

        for (i in starbucks) {
            latitude = starbucks[i].latitude
            longitude = starbucks[i].longitude
            if (latitude || longitude) {
                svg.append('circle')
                  .attr('fill', 'blue')
                  .attr('r',1)
                  .attr('transform', function() {return 'translate(' + projection([longitude, latitude]) + ')';});
            }
        }
    })

    d3.select(self.frameElement).style('height', height + 'px');
}