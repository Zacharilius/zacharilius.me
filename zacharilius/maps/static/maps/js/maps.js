$(function() {
    drawStatesWithLabels(); 
});

window.idsForStates = {
    1: {'state_abbrv': 'AL', 'name': 'Alabama'},
    2: {'state_abbrv': 'AK', 'name': 'Alaska'},
    4: {'state_abbrv': 'AZ', 'name': 'Arizona'},
    5: {'state_abbrv': 'AR', 'name': 'Arkansas'},
    6: {'state_abbrv': 'CA', 'name': 'California'},
    8: {'state_abbrv': 'CO', 'name': 'Colorado'},
    9: {'state_abbrv': 'CT', 'name': 'Connecticut'},
    10: {'state_abbrv': 'DE', 'name': 'Delaware'},
    12: {'state_abbrv': 'FL', 'name': 'Florida'},
    13: {'state_abbrv': 'GA', 'name': 'Georgia'},
    15: {'state_abbrv': 'HI', 'name': 'Hawaii'},
    16: {'state_abbrv': 'ID', 'name': 'Idaho'},
    17: {'state_abbrv': 'IL', 'name': 'Illinois'},
    18: {'state_abbrv': 'IN', 'name': 'Indiana'},
    19: {'state_abbrv': 'IA', 'name': 'Iowa'},
    20: {'state_abbrv': 'KS', 'name': 'Kansas'},
    21: {'state_abbrv': 'KY', 'name': 'Kentucky'},
    22: {'state_abbrv': 'LA', 'name': 'Louisiana'},
    23: {'state_abbrv': 'ME', 'name': 'Maine'},
    24: {'state_abbrv': 'MD', 'name': 'Maryland'},
    25: {'state_abbrv': 'MA', 'name': 'Massachusetts'},
    26: {'state_abbrv': 'MI', 'name': 'Michigan'},
    27: {'state_abbrv': 'MN', 'name': 'Minnesota'},
    28: {'state_abbrv': 'MS', 'name': 'Mississippi'},
    29: {'state_abbrv': 'MO', 'name': 'Missouri'},
    30: {'state_abbrv': 'MT', 'name': 'Montana'},
    31: {'state_abbrv': 'NE', 'name': 'Nebraska'},
    32: {'state_abbrv': 'NV', 'name': 'Nevada'},
    33: {'state_abbrv': 'NH', 'name': 'New Hampshire'},
    34: {'state_abbrv': 'NJ', 'name': 'New Jersey'},
    35: {'state_abbrv': 'NM', 'name': 'New Mexico'},
    36: {'state_abbrv': 'NY', 'name': 'New York'},
    37: {'state_abbrv': 'NC', 'name': 'North Carolina'},
    38: {'state_abbrv': 'ND', 'name': 'North Dakota'},
    39: {'state_abbrv': 'OH', 'name': 'Ohio'},
    40: {'state_abbrv': 'OK', 'name': 'Oklahoma'},
    41: {'state_abbrv': 'OR', 'name': 'Oregon'},
    42: {'state_abbrv': 'PA', 'name': 'Pennsylvania'},
    44: {'state_abbrv': 'RI', 'name': 'Rhode Island'},
    45: {'state_abbrv': 'SC', 'name': 'South Carolina'},
    46: {'state_abbrv': 'SD', 'name': 'South Dakota'},
    47: {'state_abbrv': 'TN', 'name': 'Tennessee'},
    48: {'state_abbrv': 'TX', 'name': 'Texas'},
    49: {'state_abbrv': 'UT', 'name': 'Utah'},
    50: {'state_abbrv': 'VT', 'name': 'Vermont'},
    51: {'state_abbrv': 'VA', 'name': 'Virginia'},
    53: {'state_abbrv': 'WA', 'name': 'Washington'},
    54: {'state_abbrv': 'WY', 'name': 'West Virginia'},
    55: {'state_abbrv': 'WI', 'name': 'Wisconsin'},
    56: {'state_abbrv': 'WY', 'name': 'Wyoming'}
}

function drawStatesWithLabels() {
    var width = $(window).width();
    var height = $(window).height();
    var projection = d3.geo.albersUsa()
        .scale(1000)
        .translate([width / 2, height / 2]);

    var color = d3.scale.category10()
    color.range(color.range().slice(0,8));

    var path = d3.geo.path()
        .projection(projection);
    var svg = d3.select("#map-container").append("svg")
        .attr("width", width)
        .attr("height", height);
    d3.json(window.usStateMapUrl, function(error, us) {
      if (error) throw error;
      var countries = topojson.feature(us, us.objects.states).features;
      var neighbors = topojson.neighbors(us.objects.states.geometries);

      svg.selectAll(".state")
            .data(countries)
            .enter().insert("path", ".graticule")
                .attr("class", "state")
                .attr("d", path)
                .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return countries[n].color; }) + 1 | 0); });
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