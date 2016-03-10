$(function() {
  var width = 960,
    height = 480;

  var projection = d3.geo.equirectangular()
      .scale(153)
      .translate([width / 2, height / 2])
      .precision(.1);

  var path = d3.geo.path()
      .projection(projection);

  var graticule = d3.geo.graticule();

  var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height);

  svg.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

  d3.json(window.worldMapUrl, function(error, world) {
    if (error) throw error;

    svg.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);
  });



  d3.json(window.starbucksUrl, function(error, starbucks) {
    if (error) throw error;
    for (i in starbucks) {
      latitude = starbucks[i].latitude
      longitude = starbucks[i].longitude
      svg.append("circle")
        .attr("fill", "red")
        .attr("r",5)
        .attr("transform", function() {return "translate(" + projection([longitude, latitude]) + ")";});     
    }
  })


  d3.select(self.frameElement).style("height", height + "px");
});