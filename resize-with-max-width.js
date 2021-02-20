var docRef = app.activeDocument;

/*
UI Imported from https://scriptui.joonas.me
*/

// DIALOG
// ======
var dialog = new Window("dialog");
dialog.text = "Dialog";
dialog.orientation = "column";
dialog.alignChildren = ["center", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// PANEL1
// ======
var panel1 = dialog.add("panel", undefined, undefined, { name: "panel1" });
panel1.text = "Max Size Info";
panel1.preferredSize.width = 300;
panel1.orientation = "column";
panel1.alignChildren = ["left", "top"];
panel1.spacing = 10;
panel1.margins = 10;

// GROUP1
// ======
var group1 = panel1.add("group", undefined, { name: "group1" });
group1.orientation = "row";
group1.alignChildren = ["right", "center"];
group1.spacing = 10;
group1.margins = 0;

var statictext1 = group1.add("statictext", undefined, undefined, {
  name: "statictext1",
});
statictext1.text = "Max Width";
statictext1.preferredSize.width = 120;

var edittext1 = group1.add('edittext {properties: {name: "edittext1"}}');
edittext1.preferredSize.width = 150;

// GROUP2
// ======
var group2 = panel1.add("group", undefined, { name: "group2" });
group2.orientation = "row";
group2.alignChildren = ["left", "center"];
group2.spacing = 10;
group2.margins = 0;

var statictext2 = group2.add("statictext", undefined, undefined, {
  name: "statictext2",
});
statictext2.text = "Max Height";
statictext2.preferredSize.width = 120;

var edittext2 = group2.add('edittext {properties: {name: "edittext2"}}');
edittext2.preferredSize.width = 150;

// PANEL2
// ======
var panel2 = dialog.add("panel", undefined, undefined, { name: "panel2" });
panel2.text = "Spacing Info";
panel2.preferredSize.width = 300;
panel2.orientation = "column";
panel2.alignChildren = ["left", "top"];
panel2.spacing = 10;
panel2.margins = 10;

// GROUP3
// ======
var group3 = panel2.add("group", undefined, { name: "group3" });
group3.orientation = "row";
group3.alignChildren = ["left", "center"];
group3.spacing = 10;
group3.margins = 0;

var statictext3 = group3.add("statictext", undefined, undefined, {
  name: "statictext3",
});
statictext3.text = "Horizontal Spacing";
statictext3.preferredSize.width = 120;

var edittext3 = group3.add('edittext {properties: {name: "edittext3"}}');
edittext3.preferredSize.width = 150;
edittext3.text = 10;
edittext3.alignment = ["left", "top"];

// GROUP4
// ======
var group4 = panel2.add("group", undefined, { name: "group4" });
group4.orientation = "row";
group4.alignChildren = ["left", "center"];
group4.spacing = 10;
group4.margins = 0;

var statictext4 = group4.add("statictext", undefined, undefined, {
  name: "statictext4",
});
statictext4.text = "Vertical Spacing";
statictext4.preferredSize.width = 120;

var edittext4 = group4.add('edittext {properties: {name: "edittext4"}}');
edittext4.preferredSize.width = 150;
edittext4.text = 30;

// PANEL3
// ======
var panel3 = dialog.add("panel", undefined, undefined, { name: "panel3" });
panel3.text = "Document Settings";
panel3.preferredSize.width = 300;
panel3.orientation = "column";
panel3.alignChildren = ["left", "top"];
panel3.spacing = 10;
panel3.margins = 10;

// GROUP5
// ======
var group5 = panel3.add("group", undefined, { name: "group5" });
group5.orientation = "row";
group5.alignChildren = ["left", "center"];
group5.spacing = 10;
group5.margins = 0;

var statictext5 = group5.add("statictext", undefined, undefined, {
  name: "statictext5",
});
statictext5.helpTip =
  "The max line width. You should make this the width of the material you're using.";
statictext5.text = "Max Line Width";
statictext5.preferredSize.width = 120;

var edittext5 = group5.add('edittext {properties: {name: "edittext5"}}');
edittext5.text = "500";
edittext5.preferredSize.width = 150;

// DIALOG
// ======
var checkbox1 = dialog.add("checkbox", undefined, undefined, {
  name: "checkbox1",
});
checkbox1.helpTip = "Use this for text which is always wider then heigh";
checkbox1.text = "Rotate Designs";

var Submit = dialog.add("button", undefined, undefined, { name: "Submit" });
Submit.text = "Submit";
Submit.alignment = ["center", "center"];

// GROUP6
// ======
var group6 = dialog.add("group", undefined, { name: "group6" });
group6.orientation = "row";
group6.alignChildren = ["left", "center"];
group6.spacing = 10;
group6.margins = 0;

var button2 = group6.add("button", undefined, undefined, { name: "button2" });
button2.text = "Cancel";

// this runs the scripts on go.
Submit.onClick = function () {
  var maxWidth = parseInt(edittext1.text);
  var maxHeight = parseInt(edittext2.text);

  maxWidthMaxHeight(maxWidth, maxHeight);
  organiseLayersByHeight();
  maxWidthMaxHeight(maxWidth, maxHeight);

  var lineWidth = parseInt(edittext5.text);
  var vSpacing = parseInt(edittext4.text);
  var hSpacing = parseInt(edittext3.text);
  tile(lineWidth, vSpacing, hSpacing);

  dialog.close();
};

dialog.show();

//! End of Pop up Box

//! Start of main script

function tile(lineWidth, vSpacing, HSpacing) {
  var fullWidth = 0;

  var maxLineWidth = convertMMtoPT(lineWidth); // get from user, max width of a line
  var highest = 0;
  var height = highest;

  for (var i = 0; i < docRef.groupItems.length; i++) {
    if (fullWidth + docRef.groupItems[i].width > maxLineWidth) {
      height += highest + convertMMtoPT(vSpacing); // This makes next row heigher with a gap
      // Reset the heightest height and width.
      highest = 0;
      fullWidth = 0;
    }
    //alert('trig')

    //docRef.pathItems[i].selected = true

    docRef.groupItems[i].position = [
      fullWidth,
      docRef.groupItems[i].height + height,
    ]; // Space out the items Evently
    fullWidth += docRef.groupItems[i].width + convertMMtoPT(HSpacing); // the plus here is how much space is added between items. Get this from user input.

    if (docRef.groupItems[i].height > highest) {
      highest = docRef.groupItems[i].height;
    }

    //docRef.pathItems[i].selected = false

    //redraw()
  }
}

function maxWidthMaxHeight(maxWidth, maxHeight) {
  // Loop through every group in the file
  for (var i = 0; i < docRef.groupItems.length; i++) {
    // These are hard coded at the moment for debugging. this will be a user input.

    var increase = convertMMtoPT(maxHeight) - docRef.groupItems[i].height; // this calculates the increase.
    var increasePercent = (increase / docRef.groupItems[i].height) * 100; // this converts the increase into a percentage
    increasePercent += 100; // add 100, so the increase is 140% rather than 40% which is too small.

    docRef.groupItems[i].resize(increasePercent, increasePercent); // Change the objects size

    // Check the width to see if they're over max width
    if (docRef.groupItems[i].width > convertMMtoPT(maxWidth)) {
      // Does the same as before, but this time it's checking the width isn't too big.
      increase = convertMMtoPT(maxWidth) - docRef.groupItems[i].width;
      increasePercent = (increase / docRef.groupItems[i].width) * 100;
      increasePercent += 100;

      docRef.groupItems[i].resize(increasePercent, increasePercent);
    }

    // this renames the group, not useful at the moment.
    app.activeDocument.groupItems[i].name = "I Am Group " + i;
    //app.activeDocument.groupItems[i].locked = true
  }
}

// * Supporting Functions

function organiseLayersByHeight() {
  var heights = [];

  for (var i = 0; i < docRef.groupItems.length; i++) {
    heights.push(Math.ceil(docRef.groupItems[i].height * 0.352778)); //  push all the heights to amn array
  }
  heights = heights.sort(); // organize them

  // get an array of unique values

  var uniqueHeights = [];

  for (var i = 0; i < heights.length; i++) {
    if (!isInArr(heights[i], uniqueHeights)) {
      uniqueHeights.push(heights[i]); // push the unique heights to an array
    }
  }

  uniqueHeights = uniqueHeights.reverse(); // reverse it so the biggest ones are first.

  // If they match the first thing in the array push them to the top level

  for (var i = 0; i < uniqueHeights.length; i++) {
    for (var j = 0; j < docRef.groupItems.length; j++) {
      if (
        Math.ceil(docRef.groupItems[j].height * 0.352778) == uniqueHeights[i]
      ) {
        docRef.groupItems[j].zOrder(ZOrderMethod.BRINGTOFRONT); // If it matches the size in he array push the item to the top of the document
      }
    }
  }
}

function isInArr(input, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (input == arr[i]) {
      return true;
    }
  }
  return false;
}

function convertMMtoPT(input) {
  return input / 0.352778;
}
function convertPTtoMM(input) {
  var output = input * 0.352778;
  return output;
}
