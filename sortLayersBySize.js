var docRef = app.activeDocument

alert(docRef.groupItems.length)

var heights = []

for (var i = 0 ; i < docRef.groupItems.length ; i++) {
    heights.push(Math.ceil(docRef.groupItems[i].height * 0.352778))
}
heights = heights.sort()
alert(heights)


//! get an array of unique values

var uniqueHeights = []

for (var i = 0 ; i < heights.length ; i++) {
    if (!isInArr(heights[i], uniqueHeights)) {
        uniqueHeights.push(heights[i])
    }
}

alert(uniqueHeights)


// ! If they match the first thing in the array push them to the top level

for (var i = 0 ; i < docRef.groupItems.length ; i++) {
    
    for (var j = 0 ; j < uniqueHeights.length ; j++) {
        
        if (Math.ceil(docRef.groupItems[i].height * 0.352778) == uniqueHeights[j]) {
            
            docRef.groupItems[i].zOrder(ZOrderMethod.BRINGTOFRONT)
        }
    }
}


// test if the order has been changed

for (var i = 0 ; i < docRef.groupItems.length ; i++) {
    alert(Math.ceil(docRef.groupItems[i].height * 0.352778))
}





function isInArr(input, arr) {
    for (var i = 0 ; i < arr.length ; i++) {
        if (input == arr[i]) {
            return true
        }
    }
    return false
}