var docRef = app.activeDocument


function organiseLayersByHeight() {
    

var heights = []

for (var i = 0 ; i < docRef.groupItems.length ; i++) {
    heights.push(Math.ceil(docRef.groupItems[i].height * 0.352778))
}
heights = heights.sort()



//! get an array of unique values

var uniqueHeights = []

for (var i = 0 ; i < heights.length ; i++) {
    if (!isInArr(heights[i], uniqueHeights)) {
        uniqueHeights.push(heights[i])
    }
}


uniqueHeights = uniqueHeights.reverse()


// ! If they match the first thing in the array push them to the top level

for (var i = 0 ; i <  uniqueHeights.length ; i++) {
    
    for (var j = 0 ; j < docRef.groupItems.length ; j++) {
        
        if (Math.ceil(docRef.groupItems[j].height * 0.352778) == uniqueHeights[i]) {
            
            docRef.groupItems[j].zOrder(ZOrderMethod.BRINGTOFRONT)
        }
    }
}

}






function isInArr(input, arr) {
    for (var i = 0 ; i < arr.length ; i++) {
        if (input == arr[i]) {
            return true
        }
    }
    return false
}

organiseLayersByHeight()