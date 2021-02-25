//docRef = app.documents

docRef = app.activeDocument

var workingDoc = docRef.name
//var newDoc = app.documents.add()
//var newDoc = docRef.name


if (isOSX())
{
    var csvFile = File.openDialog('Select a CSV File', function (f) { return (f instanceof Folder) || f.name.match(/\.csv$/i);} );
} else
{
    var csvFile = File.openDialog('Select a CSV File','comma-separated-values(*.csv):*.csv;');
}
    

if (csvFile != null)
{
    fileArray = readInCSV(csvFile);
}

fileArray = fileArray.toString()
fileArray = fileArray.split(',')

//alert(typeof fileArray)
//alert(fileArray)

var names = []
var numbers= []

for (var i = 0 ; i < fileArray.length ; i++) {
    //alert(fileArray[i])
    //alert(i % 2)
    if (i % 2 == 0) {
        names.push(fileArray[i])
    } else {
        numbers.push(fileArray[i])
    }
}

//alert(names)
//alert(numbers)

// This works

var count = 0

for (var i = 0 ; i < names.length ; i++) {
    for (var j = 0 ; j < docRef.textFrames.length ; j++) {
        if (count >=2) {
            break
        } else if (docRef.textFrames[j].name == 'name') {
            docRef.textFrames[j].contents = names[i]
            count++
        } else if (docRef.textFrames[j].name == 'number') {
            docRef.textFrames[j].contents = numbers[i]
            count++
        }
    }
    if (i != names.length - 1) {
        redraw()
        docRef.groupItems[0].selected = true
        app.copy()
        //var newDoc = app.documents.add()
        //app.activeDocument = app.documents[1]
        redraw()
        app.paste()
        redraw()
        //app.activeDocument = app.documents[0]
        redraw()
        count = 0 
    }
}



// pass this the name of the target you want to select.
function setActiveDocument(target) {
    for (var i =0 ; i < app.documents.length ; i++) {
        if (app.documents[i].name == target) {
            app.activeDocument = app.documents[i]
        }
    }
}

function processData(name, number) {
    
        app.activeDocument.textFrames[0].contents = number
        app.activeDocument.textFrames[1].contents = name

}

// Support Functions



function readInCSV(fileObj)
{
     var fileArray = [];
     fileObj.open('r');
     //fileObj.seek(0, 0);
     while(!fileObj.eof)
     {
          var thisLine = fileObj.readln();
          var csvArray = thisLine.split(',');
          fileArray.push(csvArray);
     }
     fileObj.close();
     //alert(fileArray)
     return fileArray;
}

function isOSX()
{
    return $.os.match(/Macintosh/i);
}

