var docRef = app.activeDocument;

var fullWidth = 0

if (docRef.groupItems.length <= 0) {

    for (var i = 0; i < docRef.pathItems.length; i++) {
      
        alert('trig')
        
        docRef.pathItems[i].selected = true

        // Space out the items, WIP sort of works....
        docRef.pathItems[i].position = [fullWidth + (docRef.pathItems[i -1].width + 100), 0]
        fullWidth += docRef.pathItems[i].width + 100

        docRef.pathItems[i].selected = false   

    }
    
}



// Loop through every group in the file 
for (var i = 0; i < docRef.groupItems.length; i++) {
  
    // These are hard coded at the moment for debugging. this will be a user input.
    var maxWidth = 280
    var maxHeight = 280

    var increase = convertMMtoPT(maxHeight) - docRef.groupItems[i].height // this calculates the increase.
    var increasePercent = (increase / docRef.groupItems[i].height) * 100 // this converts the increase into a percentage
    increasePercent += 100 // add 100, so the increase is 140% rather than 40% which is too small.

    docRef.groupItems[i].resize(increasePercent, increasePercent) // Change the objects size

    // Check the width to see if they're over max width
    if (docRef.groupItems[i].width > convertMMtoPT(maxWidth)) {
        
        // Does the same as before, but this time it's checking the width isn't too big.
        increase = convertMMtoPT(maxWidth) - docRef.groupItems[i].width
        increasePercent = (increase / docRef.groupItems[i].width) * 100
        increasePercent += 100

        docRef.groupItems[i].resize(increasePercent, increasePercent)
    }

    // this renames the group, not useful at the moment. 
    app.activeDocument.groupItems[i].name = 'I Am Group ' + i
    //app.activeDocument.groupItems[i].locked = true

}


// * Supporting Functions

function convertMMtoPT(input) {
    return input / 0.352778
}
function convertPTtoMM(input) {
    var output = input * 0.352778
    return output
}
