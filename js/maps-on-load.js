var shift_height = 450;
var num_shift_words = 24;
var rectHeight = 11;
var sumRectHeight = 15;

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

    i = 2;
    shiftComp = sortedStates[i][1];
    shiftCompName = sortedStates[i][2];
    console.log(shiftCompName);
    // if (shiftRef !== shiftComp) {
    shiftObj = shift(allUSfood,stateFood.map(function(d) { return parseFloat(d[shiftComp]); }),foodCals,foodNames);

    plotShift(d3.select('#shift01'),shiftObj.sortedMag.slice(0,200),
	      shiftObj.sortedType.slice(0,200),
	      shiftObj.sortedWords.slice(0,200),
	      shiftObj.sumTypes,
	      shiftObj.refH,
	      shiftObj.compH,shift_height);

    shiftObj2 = shift(allUSact,stateAct.map(function(d) { return parseFloat(d[shiftComp]); }),actCals,actNames);

    plotShiftActivity(d3.select('#shift02'),shiftObj2.sortedMag.slice(0,200),
		      shiftObj2.sortedType.slice(0,200),
		      shiftObj2.sortedWords.slice(0,200),
		      shiftObj2.sumTypes,
		      shiftObj2.refH,
		      shiftObj2.compH,shift_height);
};

initializePlot();


