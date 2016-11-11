'use strict';

window.onload = function ()
{
    var searchBtn = document.getElementById('SearchBtn');
    var defBtn = document.getElementById("DefBtn");
    var resultBox = document.getElementById('result');
    var url = 'https://info2180-lab6-s-graham.c9users.io/request.php?q=';
    var httpRequest;
    
    
    searchBtn.onclick = function ()
    {
        var search = document.querySelector('#SearchBox').value;
       
        httpRequest = new XMLHttpRequest ();
        
        if (!httpRequest)
        {
            alert ("Something went wrong!");
            return false;
        }
        
        httpRequest.onreadystatechange = displayDef;
        
        //encodes the search value and appends it to the url and the get method
        httpRequest.open ('GET', url + encodeURIComponent(search)); 
        httpRequest.send ();
    }
    
    defBtn.onclick = function ()
    {
        var all = 'true';
        
        httpRequest = new XMLHttpRequest ();
        
        if (!httpRequest)
        {
            alert ("Something went wrong!");
            return false;
        }
        
        httpRequest.onreadystatechange = listAll;
        
        //appends '&all=true' to the url and uses the get method
        httpRequest.open ('GET', url + '&all=' + all);
        httpRequest.send ();
    }
    
    /*
        This function retrieves and displays the defintion for a specific word, from
        a given list of words.
    */
    function displayDef ()
    {
        try
        {
            if (httpRequest.readyState === XMLHttpRequest.DONE)
            {
                if (httpRequest.status === 200)
                {
                    var response = httpRequest.responseText; //retrieves regular text
                    resultBox.innerHTML = response;
                }
                else
                {
                    alert ("HTTP REQUEST FAILURE!");
                }
            }
        }
        catch (e)
        {
            alert ("An exception was caught: " + e.description);
        }
    }
    
    /*
        This function retrieves and presents all the definitions for a specific list of words, as well as
        the authors for the defintions.
    */
    function listAll ()
    {
        var defList = document.createElement("OL"); //creates an ordered list to store the defintions
        
        //clears the text in the results section if present
        while (resultBox.firstChild)
        {
            resultBox.removeChild(resultBox.firstChild);
        }
        
        try
        {
            if (httpRequest.readyState === XMLHttpRequest.DONE)
            {
                if (httpRequest.status === 200)
                {
                    var response = httpRequest.responseXML; //retrieves xml data
                    
                    //gets the xml data based on the tags
                    var xmlDef = response.getElementsByTagName('definition');
                    
                    resultBox.appendChild(defList); 
                    
                    for (var i = 0; i < xmlDef.length; i++)
                    {
                        var entry = document.createElement("LI"); //creates a list item [word entry]
                        
                        //gets the name/title of the word
                        var title = xmlDef[i].getAttribute('name');
                        
                        var titleHeading = document.createElement("h3"); //creates a <h3>
                        
                        //gets the definition for a specific word
                        var text = document.createTextNode(xmlDef[i].childNodes[0].nodeValue);
                        
                        var textParagraph = document.createElement ("p"); //creates a <p>
                        
                        //gets the author for the defintion of the word
                        var author = '- ' + xmlDef[i].getAttribute('author');
                        
                        var authorParagraph = document.createElement("p"); //creates a <p>
                        
                        titleHeading.innerHTML = title;
                        entry.appendChild(titleHeading);
                        
                        textParagraph.appendChild(text);
                        entry.appendChild(textParagraph);
                        
                        authorParagraph.innerHTML = author;
                        entry.appendChild(authorParagraph);
                        
                        defList.appendChild(entry); //adds the entry to the list of definitions
                    }
                }
                else
                {
                    alert ("HTTP REQUEST FAILURE!");
                }
            }
        }
        catch (e)
        {
            alert ("An exception was caught: " + e.description);
        }
    }
}