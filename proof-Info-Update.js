var docRef = app.activeDocument;
var textFrames = app.activeDocument.textFrames

var dateRegex = /\d+\/\d+\/\d+/gi
var approvalDateRegex = /\d+\/\d+/g


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
        textFrames[i].contents = genDate()
        textFrames[i].name = 'APPROVAL DATE';
        
    } else if (textFrames[i].contents == 'AW NAME' || textFrames[i].name == 'AW NAME') {
        textFrames[i].contents = 'D COOPER';
        textFrames[i].name = 'AW NAME';
    }
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
}


// Get the Date
function genDate() {
    var date = new Date()
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    return day + '/' + month + '/' + year
}

function isInArr(input, arr) {
    for (var i = 0 ; i < arr.length ; i++) {
        if (input == arr[i]) {
            return true
        }
    }
    return false
}




