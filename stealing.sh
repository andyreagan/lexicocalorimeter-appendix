for ID in {0..48}
do
    
    phantomjs /Users/andyreagan/work/2014/2014-09phantom-crowbar/phantom-crowbar.js http://127.0.0.1:8000/maps.html?ID=${ID} foodshift shifts/food-${ID}.svg

    /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.svg -d 600 -e /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.png

    /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.svg -A /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/food-${ID}.pdf

    phantomjs /Users/andyreagan/work/2014/2014-09phantom-crowbar/phantom-crowbar.js http://127.0.0.1:8000/maps.html?ID=${ID} activityshift shifts/activity-${ID}.svg

    /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.svg -d 600 -e /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.png

    /Applications/Inkscape.app/Contents/Resources/bin/inkscape -f /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.svg -A /Users/andyreagan/work/2014/2014-05twitter-calories/appendix/shifts/activity-${ID}.pdf
    
done
