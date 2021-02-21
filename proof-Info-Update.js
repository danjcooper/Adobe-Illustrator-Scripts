/*
    Author: Daniel Cooper
    Twitter: @dancoopercodes
    Github: danjcooper

    Usage ---
    Update your proof template like bellow
        Where you want the order number to go, the text should say 'PO NUMBER'
        The orders name should be 'ORDER NAME'
        The Date just needs to be any number in the 00/00/02 or 00/00/0000 format, any numbers will work here. It just looks for the pattern.

        The Artworkers name 'AW NAME' You also need to update line 27 of this file to what you want it to say.

        if any of these parameters are missing the program will still run so you can leave any out.

        Also, if more then one thing has the same text in, such as two text boxes include PO NUMBER, both will be updated. This is good for multipage proofs.

        This script also marks up the document, so it will still work for repeats, even when the text boxes don't say what they're named above.
*/


var docRef = app.activeDocument;
var textFrames = app.activeDocument.textFrames

var artworker = 'D COOPER' // Update me to your name.

var dateRegex = /\d+\/\d+\/\d+/gi
var approvalDateRegex = /\d+\/\d+/g

// Start of Main Function
// This is what gets executed when you run the script.

var orderInfo = parseNameAndNumber(app.activeDocument.name)

for (var i = 0; i < docRef.textFrames.length; i++) {
    
    if (textFrames[i].contents == 'ORDER NAME' || textFrames[i].name == 'ORDER NAME') {
        textFrames[i].contents = orderInfo.orderName;
        textFrames[i].name = 'ORDER NAME';
        
    } else if (textFrames[i].contents == 'PO NUMBER' || textFrames[i].name == 'PO NUMBER') {
        textFrames[i].contents = orderInfo.poNumber;
        textFrames[i].name = 'PO NUMBER';

    } else if (dateRegex.test(textFrames[i].contents) || textFrames[i].name == 'DATE') {
        textFrames[i].contents = genDate()
        textFrames[i].name = 'DATE';

    } else if (approvalDateRegex.test(textFrames[i].contents) || textFrames[i].name == 'APPROVAL DATE') {
        textFrames[i].contents = approvalDate(genDate())
        textFrames[i].name = 'APPROVAL DATE';
        
    } else if (textFrames[i].contents == 'AW NAME' || textFrames[i].name == 'AW NAME') {
        textFrames[i].contents = artworker;
        textFrames[i].name = 'AW NAME';
    }
}

// End of main function.

// Supporting functions, these are called by the main function and don't execute alone.

function approvalDate(date) {
    var lastDash = date.lastIndexOf('/') //  this finds the last time the '/' in the string. 
    date = date.slice(0,lastDash) // slice uses the index as it's last argument
    return date
}


// Parse order name and number
function parseNameAndNumber(fileName) {

    var toRemove = ['-', '/', 'PROOF']
    var splitRemoved = []
    var output = {}

    var split = fileName.split(" ")
    var orderNumberRegex = /\w*\d+\w*/gi
    var isProof = (orderNumberRegex.test(split[0])) ? true : false; // use regex to see if the first item is a po number or a word
    
    for (var i = 0 ; i < split.length ; i++) {
        split[i] = split[i].toUpperCase() // make everything Uppercase
        
        if (!isInArr(split[i], toRemove)) {
            splitRemoved.push(split[i])
        }
    }
        
    output.poNumber = (isProof) ? splitRemoved.shift() : 'VISUAL' // Sets the po number

    splitRemoved.pop() // take of the V1.pdf part
    splitRemoved = splitRemoved.toString()
    
    output.orderName = splitRemoved.replace(/,/g, ' ')

    return output
};


// Get the Date
function genDate() {
    var date = new Date()
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    return day + '/' + month + '/' + year
};

function isInArr(input, arr) {
    for (var i = 0 ; i < arr.length ; i++) {
        if (input == arr[i]) {
            return true
        }
    }
    return false
};