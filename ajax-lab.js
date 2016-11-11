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
        httpRequest.open ('GET', url + '&all=' + all);
        httpRequest.send ();
    }
    
    function displayDef ()
    {
        try
        {
            if (httpRequest.readyState === XMLHttpRequest.DONE)
            {
                if (httpRequest.status === 200)
                {
                    var response = httpRequest.responseText;
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
    
    function listAll ()
    {
        var defList = document.createElement("OL");
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
                    var response = httpRequest.responseXML;
                    
                    var xmlDef = response.getElementsByTagName('definition');
                    
                    resultBox.appendChild(defList);
                    
                    for (var i = 0; i < xmlDef.length; i++)
                    {
                        var entry = document.createElement("LI");
                        
                        var title = xmlDef[i].getAttribute('name');
                        var titleHeading = document.createElement("h3");
                        
                        var text = document.createTextNode(xmlDef[i].childNodes[0].nodeValue);
                        var textParagraph = document.createElement ("p");
                        
                        var author = '- ' + xmlDef[i].getAttribute('author');
                        var authorParagraph = document.createElement("p");
                        
                        titleHeading.innerHTML = title;
                        entry.appendChild(titleHeading);
                        
                        textParagraph.appendChild(text);
                        entry.appendChild(textParagraph);
                        
                        authorParagraph.innerHTML = author;
                        entry.appendChild(authorParagraph);
                        
                        defList.appendChild(entry);
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