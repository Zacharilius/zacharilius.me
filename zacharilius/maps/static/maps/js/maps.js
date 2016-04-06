$(function() {
    setupMouseMoveTooltipLabel()
    setupUsStateMap(); 
});

function setupMouseMoveTooltipLabel() {
    // The tooltip always follow the cursor
    $(window).mousemove(function(e) {
        var tooltipOffsetY = $('#state-tooltip').height();
        var tooltipOffsetX = $('#state-tooltip').width();
        $('#state-tooltip').css({
           left:  e.pageX - (tooltipOffsetX / 2),
           top:   e.pageY - (tooltipOffsetY * 2)
        });
    });
}

/* -------------------------------------------------------------------------- */
/* US State Map */

function setupUsStateMap() {
    drawUsStatesWithLabels();
}

function drawUsStatesWithLabels() {
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
      var states = topojson.feature(us, us.objects.states).features;
      var neighbors = topojson.neighbors(us.objects.states.geometries);

      svg.selectAll(".state")
            .data(states)
            .enter().insert("path", ".graticule")
                .attr("class", "state")
                .attr("d", path)
                .attr('data-name', function(d) { return d.properties.STATE_NAME})
                .attr('data-abbrev', function(d) { return d.properties.STATE_ABBR})                
                .style("fill", function(d, i) { 
                    return color(d.color = d3.max(neighbors[i], 
                        function(n) { return states[n].color; }) + 1 | 0); 
                })
                .on('click', function(d) {
                    appendWikipediaStateSearch(d.properties.STATE_NAME);
                })
                .on('mousemove', function(d) {
                    $('#state-tooltip').text(d.properties.STATE_NAME).show();
                })
                .on('mouseout', function(d) {
                    $('#state-tooltip').hide();
                });
    });
    d3.select(self.frameElement).style("height", height + "px");    
}

function appendWikipediaStateSearch(stateName){
    $.ajax({
        type: "GET",
        url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + stateName.split(" ").join("%20") + '&callback=JSON_CALLBACK',
        contentType: "application/json; charset=utf-8",
        dataType: "jsonp",
        success: function (parsed_json, textStatus, jqXHR) {
            $('#state-search-results').empty();
            console.log(parsed_json);
            var pages = parsed_json.query.pages;
            for(page in pages){
                var title = pages[page].title;
                var extract = pages[page].extract;
                var pageId = pages[page].pageid;
                $('#state-search-results').append("<a href = http://en.wikipedia.org/?curid="+ pageId + "><div><p><b>" + title + ": </b>" + extract + "</p></br></div></a>");
            };
        },
        error: function (errorMessage) {
            $('#state-search-results').empty();
            $('#state-search-results').html('<p>Error with your request</p>');
            console.error("ERROR: " + errorMessage);
        }
    });
}

/* -------------------------------------------------------------------------- */
/* World Starbucks Map */

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
