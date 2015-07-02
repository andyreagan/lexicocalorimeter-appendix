var shift_height = 450;
var num_shift_words = 24;
var rectHeight = 11;
var sumRectHeight = 15;

var state_encoder = d3.urllib.encoder().varname("ID");
var state_decoder = d3.urllib.decoder().varname("ID").varresult(Math.floor(Math.random() * 49));

function initializePlot() {
    loadCsv();
}

function loadCsv() {
    var csvLoadsRemaining = 6;
    d3.json("data/state_squares.topojson", function(data) {
        geoJson = data;
        // stateFeatures = topojson.feature(geoJson,geoJson.objects.states).features;
	stateFeatures = topojson.feature(geoJson,geoJson.objects.state_squares).features;
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/foodList_lemmatized_no_quotes.csv", function (text) {
        var tmp = text.split("\n").slice(1,451);
        foodCals = tmp.map(function(d) { return parseFloat(d.split(",")[3]); });
	foodNames = tmp.map(function(d) { return d.split(",")[0]; });
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/activityList_lemmatized_no_quotes.csv", function (text) {
        var tmp = text.split("\n").slice(1,299);
        actCals = tmp.map(function(d) { return parseFloat(d.split(",")[2]); });
        actNames = tmp.map(function(d) { return d.split(",")[0]; });
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/stateActivitiesMatrix_lemmatized.csv", function (text) {
        var tmp = text.split("\n").slice(1,299);
        stateAct = tmp.map(function(d) { return d.split(",").slice(1,1000); });
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/stateFoodsMatrix_lemmatized.csv", function (text) {
        var tmp = text.split("\n").slice(1,451);
        stateFood = tmp.map(function(d) { return d.split(",").slice(1,1000); });
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/caloric_balance06292015.csv", function (text) {
        var tmp = text.split("\n").slice(1,50);
	stateFlux = tmp.map(function(d) { return [d.split(",")[0],parseFloat(d.split(",")[1])]; });
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
};

function initializePlotPlot() {
    // line up the state flux with the map
    //
    // first, create a json so I can lookup the values for each state
    state_json_json = {};
    for (var i=0; i<49; i++) {
	state_json_json[stateFeatures[i].properties.name] = stateFeatures[i];
    }
    // save the sorted values in this
    sorted_state_json = Array(49);
    // loop through the map titles, and add them in that order to the above array
    for (var i=0; i<49; i++) {
	sorted_state_json[i] = state_json_json[stateFlux[i][0]];
    }

    // make this the new one
    // stateFeatures = sorted_state_json;
    
    plotBarChart(d3.select("#bars01"),stateFlux.map(function(d) { return d[1]; }),sorted_state_json);
    // drap the map
    drawMap(d3.select("#map01"),stateFlux.map(function(d) { return d[1]; }),sorted_state_json);
    allUSfood = stateFood.map(function(d) { return d3.sum(d); });
    allUSact = stateAct.map(function(d) { return d3.sum(d); });

    i = state_decoder().cached;
    // shiftComp = sortedStates[i][1];
    shiftComp = i;
    // shiftCompName = sortedStates[i][2];
    shiftCompName = sorted_state_json[i].properties.name;

    d3.selectAll("."+shiftCompName[0]+shiftCompName.split(" ")[shiftCompName.split(" ").length-1]).attr("fill","red");
    
    if (shiftCompName === "District of Columbia") {
	shiftCompName = "DC";
    }
    console.log(shiftCompName);
    
    hedotools.shifter.setfigure(d3.select("#shift01"));
    hedotools.shifter._refF(allUSfood);
    hedotools.shifter._compF(stateFood.map(function(d) { return parseFloat(d[shiftComp]); }));
    hedotools.shifter._words(foodNames);
    hedotools.shifter._lens(foodCals);
    hedotools.shifter.setTextBold(1);
    hedotools.shifter.shifter();
    var refH = hedotools.shifter._refH();
    var compH = hedotools.shifter._compH();
    if (compH >= refH) {
	var happysad = "more caloric";
    }
    else { 
	var happysad = "less caloric";
    }
    var sumtextarray = ["","",""];
    sumtextarray[0] = function() {
	if (Math.abs(refH-compH) < 0.01) {
	    return "How the food phrases of the whole US and "+shiftCompName+" differ";
	}
	else {
	    return "Why "+shiftCompName+" is "+happysad+" on average:";
	}
    }();
    sumtextarray[1] = function() {
	return "Average US calories = " + (refH.toFixed(2));
    }();
    sumtextarray[2] = function() {
		return shiftCompName+" calories = " + (compH.toFixed(2));
    }();
	
    hedotools.shifter.setText(sumtextarray);
    // console.log(sumtextarray);
    hedotools.shifter._xlabel_text("Per food phrase caloric shift");
    hedotools.shifter._ylabel_text("Food rank");
    hedotools.shifter.plot();
    // hedotools.shifter.resetbuttontoggle(false);

    hedotools.shifterTwo._refF(allUSact);
    hedotools.shifterTwo._compF(stateAct.map(function(d) { return parseFloat(d[shiftComp]); }));
    hedotools.shifterTwo._words(actNames);
    hedotools.shifterTwo._lens(actCals);
    hedotools.shifterTwo.shifter();
    var refH = hedotools.shifterTwo._refH();
    var compH = hedotools.shifterTwo._compH();
    if (compH >= refH) {
	var happysad = " expends more calories ";
    }
    else {
	var happysad = " expends fewer calories ";
    }
    var sumtextarray = ["","",""];
    sumtextarray[0] = function() {
	if (Math.abs(refH-compH) < 0.01) {
	    return "How the activity phrases of the whole US and "+shiftCompName+" differ";
	}
	else {
	    return "Why "+shiftCompName+" is "+happysad+" on average:";
	}
    }();
    sumtextarray[1] = function() {
	return "Average US caloric expenditure = " + (refH.toFixed(2));
    }();
    sumtextarray[2] = function() {
	return shiftCompName+" caloric expenditure = " + (compH.toFixed(2));
    }();
    hedotools.shifterTwo.setTextBold(1);
    // hedotools.shifterTwo.setWidth(modalwidth);
    hedotools.shifterTwo.setText(sumtextarray);
    hedotools.shifterTwo._xlabel_text("Per activity phrase caloric expenditure shift");
    hedotools.shifterTwo._ylabel_text("Activity rank");
    hedotools.shifterTwo.setfigure(d3.select("#shift02")).plot();
    // hedotools.shifterTwo.resetbuttontoggle(false);    
};

initializePlot();


