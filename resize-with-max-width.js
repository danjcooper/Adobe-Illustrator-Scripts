var docRef = app.activeDocument;

// select every group item 
var count = 0;


// if there's no groups make the paths groups
alert(docRef.groupItems.length)
if (docRef.groupItems.length <= 0) {

    for (var i = 0; i < docRef.pathItems.length; i++) {
      
        /*
        docRef.pathItems[i].selected = true
        app.executeMenuCommand('group')
        docRef.pathItems[i].selected = false
        */
    

        

        //app.executeMenuCommand('deselectall')
        
    }
    
}



for (var i = 0; i < docRef.groupItems.length; i++) {
    count++
    
   

    // calculate difference


    // get these from the user
    var maxWidth = 280
    var maxHeight = 280


    var increase = convertMMtoPT(maxHeight) - docRef.groupItems[i].height

    var increasePercent = (increase / docRef.groupItems[i].height) * 100
   

    // add 100 to get the added percent
    increasePercent = increasePercent + 100

    docRef.groupItems[i].resize(increasePercent, increasePercent)

    // Check the width to see if they're over max width

    if (docRef.groupItems[i].width > convertMMtoPT(maxWidth)) {
        
        increase = convertMMtoPT(maxWidth) - docRef.groupItems[i].width

        increasePercent = (increase / docRef.groupItems[i].width) * 100


        // add 100 to get the added percent
        increasePercent = increasePercent + 100

        docRef.groupItems[i].resize(increasePercent, increasePercent)
    }
    app.activeDocument.groupItems[i].name = 'I Am Group ' + i
    //app.activeDocument.groupItems[i].locked = true

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