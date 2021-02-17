var docRef = app.activeDocument;

// select every path item 
var count = 0;



for (var i = 0; i < docRef.pathItems.length; i++) {
    count++
    

    // calculate difference


    // get these from the user
    var maxWidth = 280
    var maxHeight = 280


    var increase = convertMMtoPT(maxHeight) - docRef.pathItems[i].height

    var increasePercent = (increase / docRef.pathItems[i].height) * 100
   

    // add 100 to get the added percent
    increasePercent = increasePercent + 100

    docRef.pathItems[i].resize(increasePercent, increasePercent)

    // Check the width to see if they're over max width

    if (docRef.pathItems[i].width > convertMMtoPT(maxWidth)) {
        
        increase = convertMMtoPT(maxWidth) - docRef.pathItems[i].width

        increasePercent = (increase / docRef.pathItems[i].width) * 100


        // add 100 to get the added percent
        increasePercent = increasePercent + 100

        docRef.pathItems[i].resize(increasePercent, increasePercent)
    }


}


// work out the difference.

function convertMMtoPT(input) {
    return input / 0.352778
}
function convertPTtoMM(input) {
    var output = input * 0.352778
    return output
}
function getIncreasePercentage(increase, width) {
    // make this a function

}