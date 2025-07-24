$(function () {
    //  $("#tabs_inferdemofiles").tabs();  // https://jqueryui.com/tabs/
    frmAnalyse.Events.Init();
});

var frmAnalyse =
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
        btnClear: '#btnClear',
        txtAnalysisInfer: '#txtAnalysisInfer',
        TextArea_HelloJava: '#TextArea_HelloJava',
        TextArea_PointersJava: '#TextArea_PointersJava',
        TextArea_ResourcesJava: '#TextArea_ResourcesJava',
        chkBoxSemanticError:'#chkBoxSemanticError'

    },

    Events:
    {
        Init: function () {
            frmAnalyse.URLs =
            {
                fnGetDemoFileData: 'PMD/fnGetDemoFileData',
                fnProcessDemoFile: 'PMD/fnProcessAnalyseFile'
            }

            $(frmAnalyse.Ctrls.ddlVulnerableCategories).on('change', function () {
                frmAnalyse.Events.GetDemoFileData();
            });
            $(frmAnalyse.Ctrls.btnCompileCode).click(function () {
                frmAnalyse.Events.ProcessDemoFile();
            });
            $(frmAnalyse.Ctrls.btnClear).click(function ()
            {
                $(frmAnalyse.Ctrls.chkBoxSemanticError).prop('checked', false)
                frmAnalyse.Events.ClearResult();
            });
            frmAnalyse.Events.GetDemoFileData();
        },
        ClearResult: function ()
        {
            $(frmAnalyse.Ctrls.txtXPathQuery).val('');
            $(frmAnalyse.Ctrls.txtAnalysis).val('');
            $(frmAnalyse.Ctrls.txtAnalysisInfer).val('');
            

        },
        ProcessDemoFile: function ()
        {
            frmAnalyse.Events.ClearResult();

            let VulnerabilityCategoryId = $(frmAnalyse.Ctrls.ddlVulnerableCategories).val();
            let AnalyseDemo = {};
            AnalyseDemo.VulnerabilityCategoryId = VulnerabilityCategoryId;

            AnalyseDemo.HelloJavaText = $(frmAnalyse.Ctrls.TextArea_HelloJava).val();;
            AnalyseDemo.PointerJavaText = $(frmAnalyse.Ctrls.TextArea_PointersJava).val();;
            AnalyseDemo.ResourcesJavaText = $(frmAnalyse.Ctrls.TextArea_ResourcesJava).val();;
            AnalyseDemo.GetSemanticError = $(frmAnalyse.Ctrls.chkBoxSemanticError).is(':checked');
            

             
            let ReqData = {
                Item: AnalyseDemo,
                UserInfo: null
            };
            console.log(ReqData);


            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = ReqData;
            HttpRequestBody.MethodURL = frmAnalyse.URLs.fnProcessDemoFile;
            HttpRequestBody.CallBackFunction = frmAnalyse.Events.ProcessDemoFileCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            debugger;
            jsonRequest.postRequest(HttpRequestBody);
        },
        ProcessDemoFileCallBack: function (obj)
        {
            $(frmAnalyse.Ctrls.txtXPathQuery).val(obj.PMDXPathQuery);
            $(frmAnalyse.Ctrls.txtAnalysis).val(obj.PMDResult);
            $(frmAnalyse.Ctrls.txtAnalysisInfer).val(obj.InferResult);

        },
        GetDemoFileData: function () {
            frmAnalyse.Events.ClearResult();
            let VulnerabilityCategoryId = $(frmAnalyse.Ctrls.ddlVulnerableCategories).val();
            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = VulnerabilityCategoryId;

            let ReqData = {
                Item: PMDDemo,
                UserInfo: null
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = ReqData;
            HttpRequestBody.MethodURL = frmAnalyse.URLs.fnGetDemoFileData;
            HttpRequestBody.CallBackFunction = frmAnalyse.Events.GetDemoFileDataCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            debugger;

            jsonRequest.postRequest(HttpRequestBody);

        },

        GetDemoFileDataCallBack: function (obj) {
            $(frmAnalyse.Ctrls.txtViolation).val(obj.ViolationCode);
            $(frmAnalyse.Ctrls.txtNoViolation).val(obj.NoViolationCode);
            $(frmAnalyse.Ctrls.txtStixObject).val(obj.STIXObject);
        }
    }
}