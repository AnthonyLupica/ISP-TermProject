/*
    termProject.js

    <!-- ISP Term Project || Web content Generator 2.0 || November 2022 -->

    functions manipulating the generated window of termProject.html
*/

// content is a string that is incrementally appended to as the user gives commands. 
// myWindow is an indentifier for a new window. 
// On each update(), it is displayed up-to-date with the current content of the content
var content = "";
var myWindow = null;
var win = null;

/* Global constants that restrict the number of each type of element that the user can create */
const MAX_HEADINGS = 6;
const MAX_PARAGRAPHS = 4;

/* A set of all the id's that have been assigned to elements */
let assignedID = new Set();

/* 
    CSS variables (for each possible id). 
    needed for the user to change style properties after the content has already been entered. 
    Initialized to default values here, but can be modified by the user. They are returned to default by calling reset() 
*/
var h1Color = "black";
var h1Align = "center";
var h1Size  = "default";
var h1Font  = "default";

var h2Color = "black";
var h2Align = "center";
var h2Size  = "default";
var h2Font  = "default";

var h3Color = "black";
var h3Align = "center";
var h3Size  = "default";
var h3Font  = "default";

var h4Color = "black";
var h4Align = "center";
var h4Size  = "default";
var h4Font  = "default";

var h5Color = "black";
var h5Align = "center";
var h5Size  = "default";
var h5Font  = "default";

var h6Color = "black";
var h6Align = "center";
var h6Size  = "default";
var h6Font  = "default";

var p1Color = "black";
var p1Align = "left";
var p1Size  = "default";
var p1Font  = "default";

var p2Color = "black";
var p2Align = "left";
var p2Size  = "default";
var p2Font  = "default";

var p3Color = "black";
var p3Align = "left";
var p3Size  = "default";
var p3Font  = "default";

var p4Color = "black";
var p4Align = "left";
var p4Size  = "default";
var p4Font  = "default";

/* Function call-counter variables used to assign a unique id to each new element */
let addHeadingCount = 0;
let addTextCount = 0;

// update() overwrites the window, rendering all the content of the page, 
// including any content that has been appended to it since it was last updated
function update() 
{
    // dump the contents of the iframe before updating
    var myFrame = $("#designWindow").contents().find('body');
    myFrame.html("");

    // CSS for the background color
    document.getElementById("designWindow").style.backgroundColor = document.getElementById("bg-color").value;
    
    // open the window in the iframe to write the updated page
    myWindow = window.open("", "designWindow");
    
    /* Piece-by-piece, the window renders an entire HTML document, which contains any user-updated contents */
    myWindow.document.write("<!DOCTYPE html><html><head><style>");
    myWindow.document.write // Individual CSS blocks are defined line-by-line below
    ( 
        // CSS for headings
        "#h1 { color : " + h1Color + "; text-align : " + h1Align + "; font-size : " + h1Size + "; font-family : " + h1Font + "; }" +
        "#h2 { color : " + h2Color + "; text-align : " + h2Align + "; font-size : " + h2Size + "; font-family : " + h2Font + "; }" +
        "#h3 { color : " + h3Color + "; text-align : " + h3Align + "; font-size : " + h3Size + "; font-family : " + h3Font + "; }" +
        "#h4 { color : " + h4Color + "; text-align : " + h4Align + "; font-size : " + h4Size + "; font-family : " + h4Font + "; }" +
        "#h5 { color : " + h5Color + "; text-align : " + h5Align + "; font-size : " + h5Size + "; font-family : " + h5Font + "; }" +
        "#h6 { color : " + h6Color + "; text-align : " + h6Align + "; font-size : " + h6Size + "; font-family : " + h6Font + "; }" +

        // CSS for paragraphs
        "#p1 { color : " + p1Color + "; text-align : " + p1Align + "; font-size : " + p1Size + "; font-family : " + p1Font + "; }" + 
        "#p2 { color : " + p2Color + "; text-align : " + p2Align + "; font-size : " + p2Size + "; font-family : " + p2Font + "; }" +
        "#p3 { color : " + p3Color + "; text-align : " + p3Align + "; font-size : " + p3Size + "; font-family : " + p3Font + "; }" +
        "#p4 { color : " + p4Color + "; text-align : " + p4Align + "; font-size : " + p4Size + "; font-family : " + p4Font + "; }" +
        
        // CSS for subscripts
        "sub { font-size : 50%; color : black; font-family : default; }"                          
    );
    myWindow.document.write("</style></head><body>");
    myWindow.document.write(content);                          
    myWindow.document.write("</body></html>"); 
}

// called on each update. The html code is stored in unrendered form and output to a new window
function unrendered()
{
    //  open a new window
    if (win != null) 
    {
        win.close();
    }
    win = window.open("", "rawHTML", "width=1024,height=768");             
    
    // CSS for headings
    var frameHeader = "\t\t\t\t\t\t#h1 \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t color : " + h1Color + "; \n\t\t\t\t\t\t\t\t\t text-align : " + h1Align + "; \n\t\t\t\t\t\t\t\t\t font-size : " + h1Size + "; \n\t\t\t\t\t\t\t\t\t font-family : " + h1Font + "; \n\t\t\t\t\t\t } \n\n"; 
    frameHeader = frameHeader.concat("\t\t\t\t\t\t#h2 \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t color : " + h2Color + "; \n\t\t\t\t\t\t\t\t\t text-align : " + h2Align + "; \n\t\t\t\t\t\t\t\t\t font-size : " + h2Size + "; \n\t\t\t\t\t\t\t\t\t font-family : " + h2Font + "; \n\t\t\t\t\t\t } \n\n");
    frameHeader = frameHeader.concat("\t\t\t\t\t\t#h3 \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t color : " + h3Color + "; \n\t\t\t\t\t\t\t\t\t text-align : " + h3Align + "; \n\t\t\t\t\t\t\t\t\t font-size : " + h3Size + "; \n\t\t\t\t\t\t\t\t\t font-family : " + h3Font + "; \n\t\t\t\t\t\t } \n\n");
    frameHeader = frameHeader.concat("\t\t\t\t\t\t#h4 \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t color : " + h4Color + "; \n\t\t\t\t\t\t\t\t\t text-align : " + h4Align + "; \n\t\t\t\t\t\t\t\t\t font-size : " + h4Size + "; \n\t\t\t\t\t\t\t\t\t font-family : " + h4Font + "; \n\t\t\t\t\t\t } \n\n");
    frameHeader = frameHeader.concat("\t\t\t\t\t\t#h5 \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t color : " + h5Color + "; \n\t\t\t\t\t\t\t\t\t text-align : " + h5Align + "; \n\t\t\t\t\t\t\t\t\t font-size : " + h5Size + "; \n\t\t\t\t\t\t\t\t\t font-family : " + h5Font + "; \n\t\t\t\t\t\t } \n\n");
    frameHeader = frameHeader.concat("\t\t\t\t\t\t#h6 \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t color : " + h6Color + "; \n\t\t\t\t\t\t\t\t\t text-align : " + h6Align + "; \n\t\t\t\t\t\t\t\t\t font-size : " + h6Size + "; \n\t\t\t\t\t\t\t\t\t font-family : " + h6Font + "; \n\t\t\t\t\t\t } \n\n");
    
    // CSS for paragraphs
    var frameParagraph = "\t\t\t\t\t\t#p1 \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t color : " + p1Color + "; \n\t\t\t\t\t\t\t\t\t text-align : " + p1Align + "; \n\t\t\t\t\t\t\t\t\t font-size : " + p1Size + "; \n\t\t\t\t\t\t\t\t\t font-family : " + p1Font + "; \n\t\t\t\t\t\t } \n\n\t\t\t\t\t\t"; 
    frameParagraph = frameParagraph.concat("#p2 \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t color : " + p2Color + "; \n\t\t\t\t\t\t\t\t\t text-align : " + p2Align + "; \n\t\t\t\t\t\t\t\t\t font-size : " + p2Size + "; \n\t\t\t\t\t\t\t\t\t font-family : " + p2Font + "; \n\t\t\t\t\t\t } \n\n\t\t\t\t\t\t");
    frameParagraph = frameParagraph.concat("#p3 \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t color : " + p3Color + "; \n\t\t\t\t\t\t\t\t\t text-align : " + p3Align + "; \n\t\t\t\t\t\t\t\t\t font-size : " + p3Size + "; \n\t\t\t\t\t\t\t\t\t font-family : " + p3Font + "; \n\t\t\t\t\t\t } \n\n\t\t\t\t\t\t");
    frameParagraph = frameParagraph.concat("#p4 \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t color : " + p4Color + "; \n\t\t\t\t\t\t\t\t\t text-align : " + p4Align + "; \n\t\t\t\t\t\t\t\t\t font-size : " + p4Size + "; \n\t\t\t\t\t\t\t\t\t font-family : " + p4Font + "; \n\t\t\t\t\t\t } \n\n\t\t\t\t\t\t");
        
    // CSS for misc. items
    var frameMisc = "sub \n\t\t\t\t\t\t { \n\t\t\t\t\t\t\t\t\t font-size : 50%; \n\t\t\t\t\t\t\t\t\t color : black; \n\t\t\t\t\t\t\t\t\t font-family : default; \n\t\t\t\t\t\t } \n\n";   
                       
    frameHeader = frameHeader.replace(/[<>&\n\t]/g, function(markup) 
    {
        // replace all occurances of the following characters with...
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
           '\n': '<br>',
           '\t' : '&nbsp'
        }[markup];
    });

    frameParagraph = frameParagraph.replace(/[<>&\n\t]/g, function(markup) 
    {
        // replace all occurances of the following characters with...
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
           '\n': '<br>',
           '\t' : '&nbsp'
        }[markup];
    });

    frameMisc = frameMisc.replace(/[<>&\n\t]/g, function(markup) 
    {
        // replace all occurances of the following characters with...
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
           '\n': '<br>',
           '\t' : '&nbsp'
        }[markup];
    });

    var frameBody = content;
    frameBody = frameBody.replace(/[<>&\n\t]/g, function(markup) 
    {
        // replace all occurances of the following characters with...
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
           '\n': '<br>',
           '\t' : '&nbsp'
        }[markup];
    });

    var docHeader = "<!DOCTYPE html>\n<html>\n<head>\n\t\t\t<style>\n";
    docHeader = docHeader.replace(/[<>&\n\t]/g, function(markup) 
    {
        // replace all occurances of the following characters with...
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
           '\n': '<br>',
           '\t' : '&nbsp'
        }[markup];
    });

    var midOuterHTML = "\t\t\t</style>\n</head>\n<body>\n\n";
    midOuterHTML = midOuterHTML.replace(/[<>&\n\t]/g, function(markup) 
    {
        // replace all occurances of the following characters with...
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
           '\n': '<br>',
           '\t' : '&nbsp'
        }[markup];
    });

    var docFooter = "</body>\n</html>";
    docFooter = docFooter.replace(/[<>&\n\t]/g, function(markup) 
    {
        // replace all occurances of the following characters with...
        return {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
           '\n': '<br>',
           '\t' : '&nbsp'
        }[markup];
    });

    win.document.write("");
    win.document.write(docHeader + frameHeader + frameParagraph + frameMisc + midOuterHTML + frameBody + docFooter);
}

// addHeading() prompts for heading input and a heading size.
// A unique ID is derived using the call counter.
// content is appended with the new header.
function addHeading()
{
    // Has the user already reached the max number of headings?
    if (addHeadingCount >= MAX_HEADINGS)
    {
        alert("For this prototype, the number of heading elements is restricted to " + MAX_HEADINGS);
        
        return;
    }

    // prompt for text
    let headingEntry = prompt("Enter some text for a heading - containing any HTML formatting elements, such as <mark> or <i>, that you wish to use");

    // if the user hits cancel
    if (headingEntry == null)
    {
        return;
    }

    // prompt in a loop to validate the input
    while (headingEntry === "")
    {
        headingEntry = prompt("The heading must consist of atleast one character");
        
        // if the user hits cancel, break the loop by returning
        if (headingEntry == null)
        {
            return;
        }
    } 

    // prompt for a heading size
    let X = prompt("...And now choose a heading size (1 - 6)");
    
    // if the user hits cancel
    if (X == null)
    {
        return;
    }

    // prompt in a loop to validate the input
    while (X <= 0 || X > 6)
    {
        X = prompt("Size must follow the standard heading sizes (1 - 6) in HTML");

        // if the user hits cancel, break the loop by returning
        if (X == null)
        {
            return;
        }
    } 

    // increment the call count of addHeading()
    ++addHeadingCount;

    // derive a unique id from the call count
    const ID = "h" + addHeadingCount;

    // add the ID to the set of id's
    assignedID.add(ID);

    // string to be appended is "<hX id='ID'> headingEntry <sub>ID</sub></hX>" 
    const stringToAppend = "\t\t\t<h" + X + " id='" + ID + "'> \n\t\t\t\t\t\t" + headingEntry + "<sub>" + ID + "</sub> \n" + "\t\t\t</h" + X + "> \n\n";
    
    // append to the content
    content += stringToAppend;
    
    /* LOGGING */
    
    // log the appended string
    console.log("content appended with: " + stringToAppend);

    // log an updated list of all identified elements
    let idList = "";
    for (const x of assignedID.values()) 
    { 
        idList += x + ", ";
    }
    console.log("List of identified elements: " + idList);

    update();
}

// addText() prompts for paragraph input.
// A unique ID is derived using the call counter.
// content is appended with the new paragraph.
function addText()
{
    // Has the user already reached the max number of paragraphs?
    if (addTextCount >= MAX_PARAGRAPHS)
    {
        alert("For this prototype, the number of paragraph elements is restricted to " + MAX_PARAGRAPHS);
        
        return;
    }

    // prompt for text
    let textEntry = prompt("Enter some text for a paragraph - containing any HTML formatting elements, such as <ins>, <del>, or <br>, that you wish to use");

    // if the user hits cancel
    if (textEntry == null)
    {
        return;
    }

    // prompt in a loop to validate the input
    while (textEntry === "")
    {
        textEntry = prompt("The paragraph must consist of atleast one character");
        
        // if the user hits cancel, break the loop by returning
        if (textEntry == null)
        {
            return;
        }
    } 

    // increment the call count of addText()
    ++addTextCount;

    // derive a unique id from the call count
    const ID = "p" + addTextCount;

    // add the ID to the set of id's
    assignedID.add(ID);

    // string to be appended is "<p id='ID'> textEntry <sub>ID</sub></p>" 
    const stringToAppend = "\t\t\t<p id='" + ID + "'> \n\t\t\t\t\t\t" + textEntry + " <sub>" + ID + "</sub> \n" + "\t\t\t</p> \n\n";
    
    // append to the content
    content += stringToAppend;
    
    /* LOGGING */
    
    // log the appended string
    console.log("content appended with: " + stringToAppend);

    // log an updated list of all identified elements
    let idList = "";
    for (const x of assignedID.values()) 
    { 
        idList += x + ", ";
    }
    console.log("List of identified elements: " + idList);

    update();
}

function textColor() 
{
    // prompt for an element id
    const elemID = prompt("Which element would you like to assign this color to (subscript identifier)?");

    // if the user hits cancel
    if (elemID == null)
    {
        // reset the color picker to white
        document.getElementById("text-color").value = "#FFFFFF"
        
        return;
    }

    // validate the id (is it in the id set?)
    if (!assignedID.has(elemID))
    {
        alert("No element with id '" + elemID + "' could be found");
        
        // reset the color picker to white
        document.getElementById("text-color").value = "#FFFFFF"
        
        return;
    }
    
    // store the the new color
    const newColor = document.getElementById("text-color").value;

    // determine which CSS color variable needs to be updated
    switch (elemID)
    {
        case "h1":
            h1Color = newColor;
            break;
        case "h2":
            h2Color = newColor;
            break;
        case "h3":
            h3Color = newColor;
            break;
        case "h4":
            h4Color = newColor;
            break;
        case "h5":
            h5Color = newColor;
            break;
        case "h6":
            h6Color = newColor;
            break;     
        case "p1":
            p1Color = newColor;
            break;
        case "p2":
            p2Color = newColor;
            break;
        case "p3":
            p3Color = newColor;
            break;
        case "p4":
            p4Color = newColor;
            break;
    }

    update();
}

function textAlign()
{
    // prompt for an element id
    const elemID = prompt("Which element would you like to assign this text alignment to (subscript identifier)?");

    // if the user hits cancel
    if (elemID == null)
    {
        // reset select form to default option
        document.getElementById("align").value = document.getElementById("default1").value;
        
        return;
    }

    // validate the id (is it in the id set?)
    if (!assignedID.has(elemID))
    {
        alert("No element with id '" + elemID + "' could be found");
       
        // reset select form to default option
        document.getElementById("align").value = document.getElementById("default1").value;
        
        return;
    }
    
    // locally store the selected option
    let newAlign = document.getElementById("align").value;

    // determine which CSS align variable needs to be updated
    switch (elemID)
    {
        case "h1":
            h1Align = newAlign;
            break;
        case "h2":
            h2Align = newAlign;
            break;
        case "h3":
            h3Align = newAlign;
            break;
        case "h4":
            h4Align = newAlign;
            break;
        case "h5":
            h5Align = newAlign;
            break;
        case "h6":
            h6Align = newAlign;
            break;     
        case "p1":
            p1Align = newAlign;
            break;
        case "p2":
            p2Align = newAlign;
            break;
        case "p3":
            p3Align = newAlign;
            break;
        case "p4":
            p4Align = newAlign;
            break;
    }

    // reset select form to default option
    document.getElementById("align").value = document.getElementById("default1").value;

    update();
}

function fontFamily()
{
    // prompt for an element id
    const elemID = prompt("Which element would you like to assign this font to (subscript identifier)?");

    // if the user hits cancel
    if (elemID == null)
    {
        // reset select form to default option
        document.getElementById("font").value = document.getElementById("default2").value;
        
        return;
    }

    // validate the id (is it in the id set?)
    if (!assignedID.has(elemID))
    {
        alert("No element with id '" + elemID + "' could be found");
       
        // reset select form to default option
        document.getElementById("font").value = document.getElementById("default2").value;
        
        return;
    }
    
    // locally store the selected option
    let newFont = document.getElementById("font").value;

    // determine which CSS font variable needs to be updated
    switch (elemID)
    {
        case "h1":
            h1Font = newFont;
            break;
        case "h2":
            h2Font = newFont;
            break;
        case "h3":
            h3Font = newFont;
            break;
        case "h4":
            h4Font = newFont;
            break;
        case "h5":
            h5Font = newFont;
            break;
        case "h6":
            h6Font = newFont;
            break;     
        case "p1":
            p1Font = newFont;
            break;
        case "p2":
            p2Font = newFont;
            break;
        case "p3":
            p3Font = newFont;
            break;
        case "p4":
            p4Font = newFont;
            break;
    }

    // reset select form to default option
    document.getElementById("font").value = document.getElementById("default2").value;

    update();
}

function fontSize()
{
    // locally store the text size input
    let newSize = document.getElementById("font-size").value;

    // validate the text size for acceptable range
    if (newSize < 1 || newSize > 50)
    {
        alert("text size input was out of the acceptable range. Ensure input is some value 1 through 50");

        // reset input text field for text size to the default placeholder text
        document.getElementById('font-size').value = null;
        document.getElementById('font-size').placeholder = " px(1 - 50)";

        return;
    }

    // append 'px' to the valid newSize
    newSize += "px";

    // prompt for an element id
    const elemID = prompt("Which element would you like to assign this font size to (subscript identifier)?");

    // if the user hits cancel
    if (elemID == null)
    {
        // reset input text field for text size to the default placeholder text
        document.getElementById('font-size').value = null;
        document.getElementById('font-size').placeholder = " px(1 - 50)";
        
        return;
    }

    // validate the id (is it in the id set?)
    if (!assignedID.has(elemID))
    {
        alert("No element with id '" + elemID + "' could be found");
        
        // reset input text field for text size to the default placeholder text
        document.getElementById('font-size').value = null;
        document.getElementById('font-size').placeholder = " px(1 - 50)";
        
        return;
    }

    // determine which CSS align variable needs to be updated
    switch (elemID)
    {
        case "h1":
            h1Size = newSize;
            break;
        case "h2":
            h2Size = newSize;
            break;
        case "h3":
            h3Size = newSize;
            break;
        case "h4":
            h4Size = newSize;
            break;
        case "h5":
            h5Size = newSize;
            break;
        case "h6":
            h6Size = newSize;
            break;     
        case "p1":
            p1Size = newSize;
            break;
        case "p2":
            p2Size = newSize;
            break;
        case "p3":
            p3Size = newSize;
            break;
        case "p4":
            p4Size = newSize;
            break;
    }

    // reset input text field for text size to the default placeholder text
    document.getElementById('font-size').value = null;
    document.getElementById('font-size').placeholder = " px(1 - 50)";

    update();
}

//@TODO before submission, make sure this function is up to date
// reset() is responsible for returning all non-const global variables back to the state they had on content load
function reset() 
{
    // wipeout the content
    content = "";
    
    // clear the id set
    assignedID.clear();

    // reset CSS variables to default
    h1Color = "black";
    h1Align = "center";
    h1Size  = "default";
    h1Font  = "default";

    h2Color = "black";
    h2Align = "center";
    h2Size  = "default";
    h2Font  = "default";

    h3Color = "black";
    h3Align = "center";
    h3Size  = "default";
    h3Font  = "default";

    h4Color = "black";
    h4Align = "center";
    h4Size  = "default";
    h4Font  = "default";

    h5Color = "black";
    h5Align = "center";
    h5Size  = "default";
    h5Font  = "default";

    h6Color = "black";
    h6Align = "center";
    h6Size  = "default";
    h6Font  = "default";

    p1Color = "black";
    p1Align = "left";
    p1Size  = "default";
    p1Font  = "default";

    p2Color = "black";
    p2Align = "left";
    p2Size  = "default";
    p2Font  = "default";

    p3Color = "black";
    p3Align = "left";
    p3Size  = "default";
    p3Font  = "default";

    p4Color = "black";
    p4Align = "left";
    p4Size  = "default";
    p4Font  = "default";

    // reset call counter variables
    addHeadingCount = 0;
    addTextCount = 0;

    // reset color pickers to white
    document.getElementById("bg-color").value = "#FFFFFF"
    document.getElementById("text-color").value = "#FFFFFF"

    update();
}

// exit() closes the design window
function exit() 
{
    let displayState = document.getElementById("window");

    if (displayState.style.display == "none")
    {
        displayState.style.display = "block";
    }

    else
    {
        displayState.style.display = "none";
    }  
}
