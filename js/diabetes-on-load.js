function initializePlot() {
    console.log("loading");
    loadCsv();
}

function loadCsv() {
    var csvLoadsRemaining = 2;
    d3.json("data/us-states.topojson", function(data) {
        geoJson = data;
        stateFeatures = topojson.feature(geoJson,geoJson.objects.states).features;
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
    d3.text("data/diabetes_noLiq.txt", function (text) {
    // d3.text("data/just_flux.csv", function (text) {
        var tmp = text.split("\n").slice(1,1000000);
        stateDiabetes = tmp.map(function(d) { return parseFloat(d.split(",")[1]); }).slice(0,49);
        if (!--csvLoadsRemaining) initializePlotPlot();
    });
};

function initializePlotPlot() {
    // drap the map
    drawMap(d3.select("#map01"),stateDiabetes);
};

initializePlot();
