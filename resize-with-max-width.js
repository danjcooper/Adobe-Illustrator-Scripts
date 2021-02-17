var docRef = app.activeDocument;

// select every path item 
var count = 0;



for (var i = 0; i < docRef.pathItems.length; i++) {
    count++
    docRef.pathItems[i].resize(200, 200)
}

alert(count)