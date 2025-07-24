$(function () {
    //  $("#tabs_inferdemofiles").tabs();  // https://jqueryui.com/tabs/
    frmPMDDemoFiles.Events.Init();
});

var frmPMDDemoFiles =
{
    URLs: null,
    Ctrls:
    {
        ddlVulnerableCategories: '#ddlVulnerableCategories',
        btnCompileCode: '#btnCompileCode',
        btnClear: '#btnClear',
        txtViolation: '#txtViolation',
        txtNoViolation: '#txtNoViolation',
        txtStixObject: '#txtStixObject',
        XPathQuery: '#XPathQuery',
        txtResponse: '#txtResponse',
        txtXPathQuery: '#txtXPathQuery',
        txtAnalysis: '#txtAnalysis',
        btnClear:'#btnClear'
    },

    Events:
    {
        Init: function () {
            frmPMDDemoFiles.URLs =
            {
                fnGetDemoFileData: 'PMD/fnGetDemoFileData',
                fnProcessDemoFile:'PMD/fnProcessDemoFile'
            }

            $(frmPMDDemoFiles.Ctrls.ddlVulnerableCategories).on('change', function ()
            {
                frmPMDDemoFiles.Events.GetDemoFileData();
            });
            $(frmPMDDemoFiles.Ctrls.btnCompileCode).click(function ()
            {
                frmPMDDemoFiles.Events.ProcessDemoFile();
            });
            $(frmPMDDemoFiles.Ctrls.btnClear).click(function ()
            {
                frmPMDDemoFiles.Events.ClearResult();
               
            });
            


            frmPMDDemoFiles.Events.GetDemoFileData();



            
        },
        ClearResult: function ()
        {
            $(frmPMDDemoFiles.Ctrls.txtXPathQuery).val('');
            $(frmPMDDemoFiles.Ctrls.txtAnalysis).val('');
        },
        ProcessDemoFile: function ()
        {
            frmPMDDemoFiles.Events.ClearResult();
            let VulnerabilityCategoryId = $(frmPMDDemoFiles.Ctrls.ddlVulnerableCategories).val();
            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = VulnerabilityCategoryId;

            let ReqData = {
                Item: PMDDemo,
                UserInfo: null
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = ReqData;
            HttpRequestBody.MethodURL = frmPMDDemoFiles.URLs.fnProcessDemoFile;
            HttpRequestBody.CallBackFunction = frmPMDDemoFiles.Events.ProcessDemoFileCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            debugger;
            jsonRequest.postRequest(HttpRequestBody);
        },
        ProcessDemoFileCallBack: function (obj)
        {
            $(frmPMDDemoFiles.Ctrls.txtXPathQuery).val(obj.XPathQuery);
            $(frmPMDDemoFiles.Ctrls.txtAnalysis).val(obj.Result);
                      
        },
        GetDemoFileData: function ()
        {
            frmPMDDemoFiles.Events.ClearResult();
            let VulnerabilityCategoryId = $(frmPMDDemoFiles.Ctrls.ddlVulnerableCategories).val();
            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = VulnerabilityCategoryId;

            let ReqData = {
                Item: PMDDemo,
                UserInfo: null
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = ReqData;
            HttpRequestBody.MethodURL = frmPMDDemoFiles.URLs.fnGetDemoFileData;
            HttpRequestBody.CallBackFunction = frmPMDDemoFiles.Events.GetDemoFileDataCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            debugger;

            jsonRequest.postRequest(HttpRequestBody);

        },
        
        GetDemoFileDataCallBack: function (obj)
        {
            $(frmPMDDemoFiles.Ctrls.txtViolation).val(obj.ViolationCode);
            $(frmPMDDemoFiles.Ctrls.txtNoViolation).val(obj.NoViolationCode);
            $(frmPMDDemoFiles.Ctrls.txtStixObject).val(obj.STIXObject);
        }
    }
}