//! top info functions
//this function calles for the date and updates the proof with it. It relies on the date text on the proof being called 'Ord_DATE'
function setDate() {
  var date = new Date();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  // priocess the month
  monthIndex = monthIndex + 1; // it returns the month as january being 0, so this just changes it so jan = 1

  if (monthIndex < 10) {
    // if it's less then 10 make it display as 01 instead of 1
    monthIndex = "0" + monthIndex;
  }

  // update the document with the relevant info.
  app.activeDocument.textFrames.getByName("Ord_DATE").contents =
    day + "/" + monthIndex + "/" + year;

  return;
}

function setORderNameAndNumber() {

  alert('hello')
  var FileName = app.activeDocument.name.toUpperCase();

  // Regular Expressions to Parse Order Number and name

  const regexArr = [
    /PROOF/g,
    /VISUAL/g,
    /V[0-9]/g,
    /[-_]/g,
    /^.*[0-9]/g,
    /^\ /,
    ".PDF",
  ];

  var op = FileName

  for (var i = 0; i < regexArr.length; i++) {
    op = op.replace(regexArr[i], "");

    alert(op)
  }

  /*

    var newName = FileName.replace(".PDF","");
    newName = newName.replace(/ PROOF/g, "");
    newName = newName.replace(/ VISUAL/g, "");
    newName = newName.replace(/ V[0-9]/g, "");
    newName = newName.replace(/[-_]/g, "");
    newName = newName.replace(/^.*[0-9]/g,"");
    newName = newName.replace(/^\ /,"");

    */

  // Number
  var newNumber = FileName.replace(FileName, "");

  // Update Proof to new Varables
  app.activeDocument.textFrames.getByName("ORDER_NAME").contents = op;

  //if the order number is blank call it visual
  if (newNumber == "") {
    app.activeDocument.textFrames.getByName("PO_NUMBER").contents = "VISUAL";
  } else {
    app.activeDocument.textFrames.getByName("PO_NUMBER").contents = newNumber;
  }
}

setDate();
setORderNameAndNumber();
