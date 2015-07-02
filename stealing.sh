for ID in {0..48}
do
    # take the first one
    sleep .01
    phantomjs my-crowbar.js http://127.0.0.1:8080/maps.html?ID=${ID} shiftsvg shifts/food-${ID}.svg
    # take the second one
    sleep .01   
    phantomjs my-crowbar.js http://127.0.0.1:8080/maps.html?ID=${ID} shiftsvg2 shifts/activity-${ID}.svg    
    for WORDS in posup posdown negup negdown
    do
	sleep .01
	phantomjs my-crowbar.js http://127.0.0.1:8080/maps.html?ID=${ID}\&wordtypes=${WORDS} shiftsvg shifts/food-${ID}-${WORDS}.svg
	sleep .01	
	phantomjs my-crowbar.js http://127.0.0.1:8080/maps.html?ID=${ID}\&wordtypes=${WORDS} shiftsvg2 shifts/activity-${ID}-${WORDS}.svg
    done

done

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
