var docRef = app.activeDocument;
var doc = app.activeDocument;
var ret_re = new RegExp("/[\x03]|[\f]|[\r\n]|[\r]|[\n]|[,]/"); 

// use this loop to replace text in the document
// if you use this on a batch it updates multiple files at once

var regex = /\d+\/\d+\/\d+/gi



for (var i = 0 ; i < docRef.textFrames.length; i++) {
    if (docRef.textFrames[i].locked == true) {
        docRef.textFrames[i].locked = false
    }
    docRef.textFrames[i].selected = true
    
    splitOne()
    docRef.textFrames[i].selected = false
}

function genDate() {
    var date = new Date()
    var day = date.getDate()
    var month = date.getMonth() + 1
    var year = date.getFullYear()
    return day + '/' + month + '/' + year
}







function splitOne() {
    



var genError= "DivideTextFrame must be run on a point-text text-frame. ";

if(doc){
        var docsel = doc.selection;
        var sel = [];
    //remember initial selection set
         for(var itemCt=0, len = docsel.length ;itemCt<len;itemCt++){
             if(docsel[itemCt].typename == "TextFrame"){
                  sel.push(docsel[itemCt]);
             }
         }
     
        if(sel.length){  //alert(sel.length+" items found.");
            for(var itemCt=0, len = sel.length ;itemCt<len;itemCt++){
                divide(sel[itemCt]);
            }      
        }else{
                alert(genError +"Please select a Text-Frame object. (Try ungrouping.)");
        }       
}else{
    alert(genError + "No document found.");
};
}
 
function divide(item){ 
    
	//get object position
    var selWidth = item.width; 
if(item.contents.indexOf("\n") != -1){
	//alert("This IS already a single line object!");
}else{
        
    //getObject justification
    var justification = item.story.textRange.justification;
    
	//make array
	var lineArr = fieldToArray(item);
	tfTop = item.top;
	tfLeft = item.left;
	item.contents = lineArr[0];

	//for each array item, create a new text line
	var tr = item.story.textRange;
	var vSpacing = tr.leading;
    var newTF;
	for(j=1 ; j<lineArr.length ; j++){
		newTF = item.duplicate(doc, ElementPlacement.PLACEATBEGINNING);
		newTF.contents = lineArr[j];
		newTF.top = tfTop - (vSpacing*j);
        if(justification == Justification.CENTER)
        { 	
             newTF.left = (tfLeft + (selWidth/2)) - (newTF.width/2);	
        }
    else 
            if(justification == Justification.RIGHT)
        {
            newTF.left = (tfLeft + selWidth) - newTF.width;	
        }
    else 
    {
           newTF.left = tfLeft;
    }
		newTF.selected = false;		
	}
}

function fieldToArray(myField) {  
		retChars = new Array("\x03","\f","\r","\n"); 
		var tmpTxt = myField.contents.toString();
		for (all in retChars )
		{
            tmpArr = tmpTxt.split(retChars[all]); 
		}  
		return tmpTxt.split(ret_re);
	}
 
    }