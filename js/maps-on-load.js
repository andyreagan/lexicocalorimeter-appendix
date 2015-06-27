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

    // d3.text("data/AllFoodNoLiqQuoteFree.csv", function (text) {
    d3.text("data/allFoodsNoLiq082614.csv", function (text) {
    // d3.text("data/ALL_FOODS_FOR_Rcleaned4R_NEWEST_1CUPLIQ.csv", function (text) {
        var tmp = text.split("\n")
        foodCals = tmp.map(function(d) { return parseFloat(d.split(",")[3]); }).slice(1,1438);
        // foodNames = tmp.map(function(d) { return d.split(",")[0].slice(1,d.split(",")[0].length-1); }).slice(1,1456);;
	// don't need to remove the quotes in this file
	foodNames = tmp.map(function(d) { return d.split(",")[0]; }).slice(1,1438);;
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
    // d3.text("data/stateFoodsMatrix_NOLIQUID.csv", function (text) {
    d3.text("data/stateFoodsMatrix_NOLIQUID082614.csv", function (text) {
    // d3.text("data/stateFoodsMatrix_1CUPLIQ.csv", function (text) {
        var tmp = text.split("\n").slice(1,1438);
        stateFood = tmp.map(function(d) { return d.split(",").slice(1,1000); });
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/caloric_balance091114.csv", function (text) {
    // d3.text("data/flux_noLiq.txt", function (text) {
    // d3.text("data/just_flux.csv", function (text) {
        var tmp = text.split("\n").slice(1,1000000);
        stateFlux = tmp.map(function(d) { return parseFloat(d.split(",")[1]); }).slice(0,49);
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
};

function initializePlotPlot() {
    // drap the map
    plotBarChart(d3.select("#bars01"),stateFlux,stateFeatures);
    drawMap(d3.select("#map01"),stateFlux);
    allUSfood = stateFood.map(function(d) { return d3.sum(d); });
    allUSact = stateAct.map(function(d) { return d3.sum(d); });

};

initializePlot();
