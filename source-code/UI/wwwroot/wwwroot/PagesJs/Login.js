$(function () {
    frmLoginPage.Events.Init();
});
var frmLoginPage =
{
     
    URLs: null,
    Ctrls:
    {
        UserName: '#UserName',
        Password: '#Password',
        AppCode: '#AppCode',
        btnLogin:'#btnLogin'
    },
    Events:
    {
        Init: function () {
           
            frmLoginPage.URLs =
            {
               // Login: 'Authentication/fnAuthenticateUser',
                  Login: 'UserAccess/fnAuthenticate'
               //  Login: 'PMD/fnAuthenticate'
            }

           

            $(frmLoginPage.Ctrls.AppCode).val('CANA-3789271');
            $(frmLoginPage.Ctrls.UserName).val('admin');
            $(frmLoginPage.Ctrls.Password).val('Ctuk!325@kms#8');


            $(frmLoginPage.Ctrls.btnLogin).click(function ()
            {
                frmLoginPage.Events.GetToken();
            });

            jsToken.Events.setToken('');
             
        },
        GetToken: function () {
           /* debugger;*/
            let AuthUserLogin = {};
            AuthUserLogin.ClientKey = $(frmLoginPage.Ctrls.AppCode).val();
            AuthUserLogin.UserName = $(frmLoginPage.Ctrls.UserName).val();
            AuthUserLogin.Password = $(frmLoginPage.Ctrls.Password).val();

            let JReq =
            {
                Item: AuthUserLogin,
                AuthUserReq: null
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;
            HttpRequestBody.MethodURL = frmLoginPage.URLs.Login;
            HttpRequestBody.CallBackFunction = frmLoginPage.Events.GetTokenCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },
        GetTokenCallBack: function (obj)
        {
           
            let isAuthenticated = obj.authUser.isAuthenticated;
            let Authtoken = obj.authUser.Authtoken;

            if (isAuthenticated == true)
            {
                jsToken.Events.setToken(Authtoken);
                window.location.href = "/";
            }
            else
            {
                Swal.fire({
                    title: "Invalid Application Code/User Name/Password!",
                    text: "Invalid Application Code/User Name/Password!",
                    icon: "error"
                });
                 
            }
        }
         
        
        

    }
     


}