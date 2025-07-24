jsonRequest =
{
    postRequest: function (Requestbody)
    {
        var beforeSend = null;
        var complete = null;
        if (Requestbody.ShowLoader == true) {
            beforeSend = function () {
                $("#divLoading").show();
            }
            complete = function () {
                $("#divLoading").hide();
            }
        }

        let Authtoken = '';
        if (localStorage.getItem(frmGlobal.Ids.userToken) !== null)
        {
            Authtoken = localStorage.getItem(frmGlobal.Ids.userToken);  //jsToken.getToken();  // localStorage.getItem(frmGlobal.Ids.userToken);
        } 

        let AuthUserReq = {};
        AuthUserReq.UserKey = '';
        AuthUserReq.Authtoken = Authtoken;
        AuthUserReq.ClientKey = '';
        AuthUserReq.CompanyKey = '';

        Requestbody.Data.AuthUserReq = AuthUserReq;

       
       
            $.ajax({
                type: "post",
                url: app_def.apiurl + Requestbody.ApiURL + Requestbody.MethodURL,
                data: JSON.stringify(Requestbody.Data),
                datatype: "json",
                contentType: "application/json",
                //cache: cache,
                //async: async,
                beforeSend: beforeSend,
                complete: complete,
                success: function (data)
                {
                    
                    Requestbody.CallBackFunction(JSON.parse(data));
                }
            });
        }

}
     
