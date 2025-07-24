$(function () {
    jsToken.Events.Init();
});

var jsToken =
{
    

    Events:
    {
        Init: function () {

                  },
        setToken: function (Token)
        {
            window.localStorage.setItem(frmGlobal.Ids.userToken, Token);
        },
        getToken: function () {
            return localStorage.getItem(frmGlobal.Ids.userToken);
        },
        isTokenValid: function () {
            let userToken = localStorage.getItem(frmGlobal.Ids.userToken);

            if (userToken != null && userToken.length > 5) { return true; }
            else { return false; }
        }
    }


}

