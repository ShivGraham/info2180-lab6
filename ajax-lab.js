'use strict';

window.onload = function ()
{
    var searchBtn = document.getElementById('SearchBtn');
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
}