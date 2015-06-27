var searchDecoder = d3.urllib.decoder().varresult("noact").varname("search");
var allDecoder = d3.urllib.decoder().varresult("0").varname("all");
var searchEncoder = d3.urllib.encoder().varname("search");
var allEncoder = d3.urllib.encoder().varname("all");

var substringMatcher = function(strs) {
    return function findMatches(q,cb) {
        var matches, substringRegex;
        //console.log("matching "+q);
        matches = [];
        for (var i=0; i<actNames.length; i++) {
            if (actNames[i].match(q)) {
     		matches.push({ value: actNames[i]})   
            }
        }
        if (matches.length === 0) { matches.push({ value: "<i>activity phrase not indexed</i>" }); }
        cb(matches);
    };
};

$(document).ready(function() {
    $("#wordsearch").typeahead(
        {
            hint: false,
            highlight: true,
            minLength: 2,
        },
        {
            name: "actwords",
            source: substringMatcher(["one","two"])
        });
}).on("typeahead:selected",function(event,sugg,dataset) {
    // console.log(event);
    // console.log(sugg);
    // console.log(dataset);
    searchEncoder.varval(sugg.value);
    if (parseFloat(allDecoder().current)) { allEncoder.varval("0"); }
    for (var i=0; i<actNames.length; i++) {
        if (actNames[i] === sugg.value) {
	    // console.log(i);
            drawMap(d3.select("#map01"),stateAct[i].map(parseFloat).map(function(d,i) { return d/stateActTotals[i]; }));
            plotBarChart(d3.select("#bars01"),stateAct[i].map(parseFloat).map(function(d,i) { return d/stateActTotals[i]; }),stateFeatures);
            break;
        }
    }
    //drawWordStats(d3.select("#viewpanel"),sugg.value);
    //$("#viewpanel").load('/definition/' + encodeURIComponent(sugg.value));
    //$("#controlpanel").hide();
});

$("#showallmatching").on("click", function(e) {
    // close the typeahead

    // push up that all was selected
    allEncoder.varval("1");

    // console.log("showing all matching");				      
    // add up the matching words
    totalAct = Array(stateAct[0].length);
    for (var i=0; i<stateAct[0].length; i++) {
	totalAct[i] = 0;
    } // for 
    var typed = $('.typeahead').typeahead('val');
    searchEncoder.varval(typed);

    for (var i=0; i<actNames.length; i++) {
        if (actNames[i].match(typed)) {
	    // console.log(i);
	    tmpAct = stateAct[i].map(parseFloat).map(function(d,i) { return d/stateActTotals[i]; })
            for (var j=0; j<stateAct[i].length; j++) {
		totalAct[j] += tmpAct[j];
	    } // for
        } //if 
    } // for 
    drawMap(d3.select("#map01"),totalAct);
    plotBarChart(d3.select("#bars01"),totalAct,stateFeatures);
}); 


function initializePlot() {
    loadCsv();
}

function loadCsv() {
    var csvLoadsRemaining = 6;
    d3.json("data/us-states.topojson", function(data) {
        geoJson = data;
        stateFeatures = topojson.feature(geoJson,geoJson.objects.states).features;
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/ALL_FOODS_FOR_Rcleaned4R_NEWEST_1CUPLIQ.csv", function (text) {
        var tmp = text.split("\n")
        foodCals = tmp.map(function(d) { return parseFloat(d.split(",")[3]); }).slice(1,1604);
        foodNames = tmp.map(function(d) { return d.split(",")[0].slice(1,d.split(",")[0].length-1); }).slice(1,1604);;
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/PHYS_ACT_2011-12edits_MTAs.csv", function (text) {
        var tmp = text.split("\n").slice(1,1000000);
        actCals = tmp.map(function(d) { return d.split(",")[3]; });
        actNames = tmp.map(function(d) { return d.split(",")[0]; });
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/finalStateActivityMatrix.csv", function (text) {
        var tmp = text.split("\n").slice(1,13420);
        stateAct = tmp.map(function(d) { return d.split(",").slice(1,1000); });
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/stateFoodsMatrix_1CUPLIQ.csv", function (text) {
        var tmp = text.split("\n").slice(1,1604);
        stateFood = tmp.map(function(d) { return d.split(",").slice(1,1000); });
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/just_flux.csv", function (text) {
        var tmp = text.split("\n").slice(1,1000000);
        stateFlux = tmp.map(function(d) { return parseFloat(d.split(",")[1]); });
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
};

function initializePlotPlot() {
    // drap the map
    //drawMap(d3.select("#map01"),stateFlux);
    //allUSfood = stateFood.map(function(d) { return d3.sum(d); });
    //allUSact = stateAct.map(function(d) { return d3.sum(d); });
    //plotBarChart(d3.select("#bars01"),stateFlux,stateFeatures);
    stateActTotals = Array(stateAct[0].length);
    for (var i=0; i<stateActTotals.length; i++) {
        stateActTotals[i] = d3.sum(stateAct.map(function(d) { return d[i]; }));
    }
    if (searchDecoder().current === "noact") { initialplot = "skiing";}
    else { initialplot = searchDecoder().current; 
	   $('.typeahead').typeahead('val', initialplot); }

    searchAll = parseFloat(allDecoder().current);

    totalAct = Array(stateAct[0].length);
    for (var i=0; i<stateAct[0].length; i++) {
	totalAct[i] = 0;
    } // for 

    if (searchAll) {
	
	for (var i=0; i<actNames.length; i++) {
            if (actNames[i].match(initialplot)) {
		var tmpAct = stateAct[i].map(parseFloat).map(function(d,i) { return d/stateActTotals[i]; })
		for (var j=0; j<stateAct[i].length; j++) {
		    totalAct[j] += tmpAct[j];
		} // for
            } //if 
	} // for 
    }
    else {
	for (var i=0; i<actNames.length; i++) {
            if (actNames[i] === initialplot) {
		var tmpAct = stateAct[i].map(parseFloat).map(function(d,i) { return d/stateActTotals[i]; })
		for (var j=0; j<stateAct[i].length; j++) {
		    totalAct[j] += tmpAct[j];
		} // for
		break;
            } //if 
	} // for 
    }
    drawMap(d3.select("#map01"),totalAct);
    plotBarChart(d3.select("#bars01"),totalAct,stateFeatures);
};


initializePlot();
