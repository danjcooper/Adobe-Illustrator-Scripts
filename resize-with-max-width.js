var docRef = app.activeDocument;



//! Start of Pop up Box 


/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
*/

// DIALOG
// ======
var dialog = new Window("dialog"); 
    dialog.text = "Dialog"; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["right","center"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

var statictext1 = dialog.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "Max Width / Height"; 
    statictext1.alignment = ["center","center"]; 

// PANEL1
// ======
var panel1 = dialog.add("panel", undefined, undefined, {name: "panel1"}); 
    panel1.text = "Sizing"; 
    panel1.orientation = "column"; 
    panel1.alignChildren = ["left","center"]; 
    panel1.spacing = 10; 
    panel1.margins = 10; 

// GROUP1
// ======
var group1 = panel1.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

var statictext2 = group1.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.helpTip = "in mm"; 
    statictext2.text = "Max Width:"; 
    statictext2.preferredSize.width = 75; 

var edittext1 = group1.add('edittext {properties: {name: "edittext1"}}'); 
    edittext1.preferredSize.width = 150; 

// GROUP2
// ======
var group2 = panel1.add("group", undefined, {name: "group2"}); 
    group2.orientation = "row"; 
    group2.alignChildren = ["left","center"]; 
    group2.spacing = 10; 
    group2.margins = 0; 

var statictext3 = group2.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "Max Height:"; 
    statictext3.preferredSize.width = 75; 

var edittext2 = group2.add('edittext {properties: {name: "edittext2"}}'); 
    edittext2.preferredSize.width = 150; 

// DIALOG
// ======

var Submit = dialog.add("button", undefined, undefined, {name: "Submit"}); 
Submit.text = "Submit"; 
Submit.alignment = ["center","center"]; 


var button2 = dialog.add("button", undefined, undefined, {name: "button2"}); 
    button2.text = "Cancel"; 
    button2.alignment = ["center","center"]; 

    
Submit.onClick = function(){	 
    var maxWidth = parseInt(edittext1.text)
    var maxHeight = parseInt(edittext2.text)

    maxWidthMaxHeight(maxWidth, maxHeight)
    tile()
    
    dialog.close();
}

dialog.show();





//! End of Pop up Box 




//! Start of main script





function tile() {
    var fullWidth = 0

    var maxLineWidth = convertMMtoPT(500) // get from user, max width of a line
    var highest = 0
    var height = highest
    
    for (var i = 0; i < docRef.groupItems.length; i++) {
      
        if (fullWidth + docRef.groupItems[i].width > maxLineWidth) {
            height += (highest + convertMMtoPT(25)) // This makes next row heigher with a gap
            // Reset the heightest height and width.
            highest = 0
            fullWidth = 0
        }
        //alert('trig')
        
        //docRef.pathItems[i].selected = true

        
        docRef.groupItems[i].position = [fullWidth, docRef.groupItems[i].height + height] // Space out the items Evently
        fullWidth += docRef.groupItems[i].width + convertMMtoPT(25) // the plus here is how much space is added between items. Get this from user input.

        if (docRef.groupItems[i].height > highest) {
            highest = docRef.groupItems[i].height
        }

        //docRef.pathItems[i].selected = false   

       
        //redraw()

    }
}



    


function maxWidthMaxHeight(maxWidth, maxHeight) {
    
// Loop through every group in the file 
for (var i = 0; i < docRef.groupItems.length; i++) {
  
    // These are hard coded at the moment for debugging. this will be a user input.
    

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
}




// * Supporting Functions

function convertMMtoPT(input) {
    return input / 0.352778
}
function convertPTtoMM(input) {
    var output = input * 0.352778
    return output
}