# stealing.sh
# use a local webserver to generate and capture all of the shifts
#
# note: use node http-server (python SimpleHTTPServer will fail)

########################################
## grab the .svg's
for ID in {0..48}
do
    # take the first one
    phantomjs my-crowbar.js http://127.0.0.1:8080/maps.html?ID=${ID} shiftsvg shifts/food-${ID}.svg
    # take the second one
    phantomjs my-crowbar.js http://127.0.0.1:8080/maps.html?ID=${ID} shiftsvg2 shifts/activity-${ID}.svg    
    for WORDS in posup posdown negup negdown
    do
	phantomjs my-crowbar.js http://127.0.0.1:8080/maps.html?ID=${ID}\&wordtypes=${WORDS} shiftsvg shifts/food-${ID}-${WORDS}.svg
	phantomjs my-crowbar.js http://127.0.0.1:8080/maps.html?ID=${ID}\&wordtypes=${WORDS} shiftsvg2 shifts/activity-${ID}-${WORDS}.svg
    done
done

########################################
## convert all of the shift to .eps then .pdf
cd shifts
for ID in {0..48}
do
    rsvg-convert --format=eps food-${ID}.svg > food-${ID}.eps
    epstopdf food-${ID}.eps
    rsvg-convert --format=eps activity-${ID}.svg > activity-${ID}.eps
    epstopdf activity-${ID}.eps
    for WORDS in posup posdown negup negdown
    do
	rsvg-convert --format=eps food-${ID}-${WORDS}.svg > food-${ID}-${WORDS}.eps
	epstopdf food-${ID}-${WORDS}.eps
	rsvg-convert --format=eps activity-${ID}-${WORDS}.svg > activity-${ID}-${WORDS}.eps
	epstopdf activity-${ID}-${WORDS}.eps	
    done
done
cd ..

########################################
## grab and convert the bar chart and the map

# phantomjs my-crowbar.js http://127.0.0.1:8080/maps.html?ID=${ID} barsvg figures/barsvg.svg
# rsvg-convert --format=eps figures/barsvg.svg > figures/barsvg.eps
# epstopdf figures/barsvg.eps

# phantomjs my-crowbar.js http://127.0.0.1:8080/maps.html?ID=${ID} mapsvg figures/mapsvg.svg
# rsvg-convert --format=eps figures/mapsvg.svg > figures/mapsvg.eps
# epstopdf figures/mapsvg.eps


########################################
## these all use inkScape (no good)

# for ID in {0..48}
# do    
#     # convert the png, then pdf
#     /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.svg -d 600 -e /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.png
#     /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.svg -A /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.pdf
#     # convert the png, then pdf
#     /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.svg -d 600 -e /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.png
#     /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.svg -A /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.pdf
# done

# /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/bar-chart.svg -d 600 -e /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/bar-chart.png
# /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/bar-chart.svg -A /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/bar-chart.pdf
# /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/square-map.svg -d 600 -e /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/square-map.png
# /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/square-map.svg -A /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/square-map.pdf
