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
    $('#show-us-map-container').click(function() {
        $('#map-intro').hide();
        $('#us-map-container').show();
        drawUsStatesWithLabels();
    })

    $('#start-us-state-map-quiz').click(function() {
        $('#us-map-container').find("svg").remove();
        setupUsStateQuiz();
        drawUsStatesForQuiz();
    })
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
    var svg = d3.select("#us-map-container .map").append("svg")
        .attr("width", width)
        .attr("height", height);
    d3.json(window.usStateMapUrl, function(error, us) {
        window.usStateGeoJson = us; // FIXME: REMOVE
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
            $('#wikipedia-us-state-search-results').empty();
            console.log(parsed_json);
            var pages = parsed_json.query.pages;
            for(page in pages){
                var title = pages[page].title;
                var extract = pages[page].extract;
                var pageId = pages[page].pageid;
                $('#wikipedia-us-state-search-results').append("<a href = http://en.wikipedia.org/?curid="+ pageId + "><div><p><b>" + title + ": </b>" + extract + "</p></br></div></a>");
            };
        },
        error: function (errorMessage) {
            $('#wikipedia-us-state-search-results').empty();
            $('#wikipedia-us-state-search-results').html('<p>Error with your request</p>');
            console.error("ERROR: " + errorMessage);
        }
    });
}

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/* US State Map */

function usStatesQuiz() {
    var currentQuizIndex = 0;
    var numberCorrect = 0;
    var numberIncorrect = 0;

    var quizLocations = [];
    var geoJsonLocation = window.usStateGeoJson.objects.states.geometries;
    for (var i = 0; i < geoJsonLocation.length; i++) {
        var elementProperties = geoJsonLocation[i].properties;
        var stateName = elementProperties['STATE_NAME'];
        quizLocations.push(stateName);
    }
    shuffle(quizLocations);

    return {
        'getQuizLocations': function() {
            return quizLocations;
        },

        'getCurrentQuizQuestion': function() {
            return quizLocations[currentQuizIndex];
        },

        'getNumberOfCorrectAnswers': function() {
            return numberCorrect;
        },

        'getNumberOfIncorrectAnswers': function() {
            return numberIncorrect;
        },

        'getNumberQuizQuestions': function() {
            return quizLocations.length;
        },

        'getCurrentQuestionOrdinal': function() {
            return currentQuizIndex + 1;
        },

        'gradeQuizResponse': function(clickedState) {
            var questionCorrect = clickedState == quizLocations[currentQuizIndex];
            if (questionCorrect) {
                numberCorrect += 1;
            }
            else {
                numberIncorrect += 1;
            }

            currentQuizIndex += 1;

            return questionCorrect;
        }
    }
}

function setupUsStateQuiz() {
    window.usStatesQuiz = usStatesQuiz()
    updateQuizState();
    $('#quiz-total').text(window.usStatesQuiz.getNumberQuizQuestions());
}

function updateQuizState() {
    $('#quiz-state').text(window.usStatesQuiz.getCurrentQuizQuestion());
    $('#quiz-correct').text(window.usStatesQuiz.getNumberOfCorrectAnswers());
    $('#quiz-incorrect').text(window.usStatesQuiz.getNumberOfIncorrectAnswers());
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

  return array;
}

function getQuizFrom(geoJsonLocation, name) {
    geoLocations = [];
    for (var i = 0; i < geoJsonLocation.length; i++) {
        var elementProperties = geoJsonLocation[i].properties;
        var stateName = elementProperties[name];
        geoLocations.push(stateName);
    }
    return geoLocations;
}

function drawUsStatesForQuiz() {
    var width = $(window).width();
    var height = $(window).height();
    scale0 = width  * .5;

    var projection = d3.geo.albersUsa();

    var zoom = d3.behavior.zoom()
        .translate([width / 2, height / 2])
        .scale(scale0)
        .scaleExtent([scale0, 8 * scale0])
        .on("zoom", zoomed);

    var color = d3.scale.category10()
    color.range(color.range().slice(0,8));

    var path = d3.geo.path()
        .projection(projection);

    var svg = d3.select("#us-map-container .map").append("svg")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g");

    // svg.append("rect")
    //     .attr("class", "overlay")
    //     .attr("width", width)
    //     .attr("height", height);

    svg.call(zoom)
        .call(zoom.event);

    d3.json(window.usStateMapUrl, function(error, us) {
        if (error) throw error;

        var states = topojson.feature(us, us.objects.states).features;
        var neighbors = topojson.neighbors(us.objects.states.geometries);

        g.selectAll(".state")
            .data(states)
            .enter().insert("path", ".graticule")
                .attr("class", "state")
                .attr("d", path)
                .attr('data-name', function(d) { return d.properties.STATE_NAME})
                .attr('data-abbrev', function(d) { return d.properties.STATE_ABBR})
                .attr("data-color", function(d, i) {
                    return color(d.color = d3.max(neighbors[i],
                        function(n) { return states[n].color; }) + 1 | 0);
                })
                .style('fill', '#FFFFFF')
                .style('stroke', '#232323')
                .on('click', function(d) {
                    var clickedName = $(this).attr('data-name');
                    window.usStatesQuiz.gradeQuizResponse(clickedName); // TODO: remove use of global variable
                    updateQuizState();
                })
                .on('mousemove', function(d) {
                    $(this).css('fill', $(this).attr('data-color'));
                })
                .on('mouseout', function(d) {
                    $(this).css('fill', '#FFFFFF');
                });
    });

    function zoomed() {
        projection
            .translate(zoom.translate())
            .scale(zoom.scale());

        g.selectAll("path")
            .attr("d", path);
    }

    d3.select(self.frameElement).style("height", height + "px");
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

    var svg = d3.select('#us-map-container').append('svg')
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
