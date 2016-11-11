'use strict';

window.onload = function ()
{
    var searchBtn = document.getElementById('SearchBtn');
    var url = 'https://info2180-lab6-s-graham.c9users.io/request.php?q=definition';
    var httpRequest;
    
    searchBtn.onclick = function ()
    {
        httpRequest = new XMLHttpRequest ();
        
        if (!httpRequest)
        {
            alert ("Something went wrong!");
            return false;
        }
        
        httpRequest.onreadystatechange = displayDef;
        httpRequest.open ('GET', url);
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
                    alert (response);
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