var substringMatcher = function(strs) {
    return function findMatches(q,cb) {
        var matches, substringRegex;
        console.log("matching "+q);
        matches = [];
        for (var i=0; i<foodNames.length; i++) {
            if (foodNames[i].match(q)) {
     		matches.push({ value: foodNames[i]})   
            }
        }
        if (matches.length === 0) { matches.push({ value: "<i>food phrase not indexed</i>" }); }
        cb(matches);
    };
};

$(document).ready(function() {
    $("#wordsearch").typeahead(
        {
            hint: false,
            highlight: true,
            minLength: 1,
        },
        {
            name: "foodwords",
            source: substringMatcher(["one","two"])
        });
}).on("typeahead:selected",function(event,sugg,dataset) {
    console.log(event);
    console.log(sugg);
    console.log(dataset);
    for (var i=0; i<foodNames.length; i++) {
        if (foodNames[i] === sugg.value) {
	    console.log(i);
            drawMap(d3.select("#map01"),stateFood[i].map(parseFloat).map(function(d,i) { return d/stateFoodTotals[i]; }));
            plotBarChart(d3.select("#bars01"),stateFood[i].map(parseFloat).map(function(d,i) { return d/stateFoodTotals[i]; }),stateFeatures);
            break;
        }
    }
    //drawWordStats(d3.select("#viewpanel"),sugg.value);
    //$("#viewpanel").load('/definition/' + encodeURIComponent(sugg.value));
    //$("#controlpanel").hide();
});




