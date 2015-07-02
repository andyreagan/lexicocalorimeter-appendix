for ID in {45..48}
do
    # take the first one
    sleep 1
    phantomjs /Users/andyreagan/work/2014/2014-09phantom-crowbar/phantom-crowbar.js http://127.0.0.1:8000/maps.html?ID=${ID} shiftsvg shifts/food-${ID}.svg
    # take the second one
    sleep 1    
    phantomjs /Users/andyreagan/work/2014/2014-09phantom-crowbar/phantom-crowbar.js http://127.0.0.1:8000/maps.html?ID=${ID} shiftsvg2 shifts/activity-${ID}.svg
done
for ID in {0..48}
do    
    # convert the png, then pdf
    /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.svg -d 600 -e /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.png
    /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.svg -A /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.pdf
    # convert the png, then pdf
    /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.svg -d 600 -e /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.png
    /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.svg -A /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.pdf
done
# /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/bar-chart.svg -d 600 -e /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/bar-chart.png
# /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/bar-chart.svg -A /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/bar-chart.pdf
# /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/square-map.svg -d 600 -e /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/square-map.png
# /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/square-map.svg -A /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/square-map.pdf
