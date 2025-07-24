$(function () {
    jsAuthenticateUser.Events.Init();
});

var jsAuthenticateUser =
{
   /* Ids: { userToken:"userToken"} , */

    Events:
    {
        Init: function ()
        {
           
            let isTokenValid = jsToken.Events.isTokenValid();

            if (isTokenValid != null && isTokenValid == true)
            {

            }
            else
            {
               window.location.href = "/signin";
            }
            
        }
       
    }
    
   
}

