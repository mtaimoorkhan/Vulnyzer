$(function () {
    frmInferDemoFiles.Events.Init();
});

var frmInferDemoFiles =
{
    URLs: null,
    Ctrls:
    {
        btn_AnalyseDemoFiles: '#btn_AnalyseDemoFiles',
        TextArea_HelloJava: '#TextArea_HelloJava',
        TextArea_ResourcesJava: '#TextArea_ResourcesJava',
        TextArea_PointersJava: '#TextArea_PointersJava',
        Res:'#Res'
    },

    Events:
    {
        Init: function ()
        {
            $(frmGlobal.Ctrls.PageTitle).html("Semantic Errors On Files");
            frmInferDemoFiles.URLs =
            {
                Analyse: 'Infer/fnInferDemo'
            }           
            $(frmInferDemoFiles.Ctrls.btn_AnalyseDemoFiles).click(function ()
            {
                frmInferDemoFiles.Events.AnalyseDemoFiles();
            });

        },
        AnalyseDemoFiles: function () {
            $(frmInferDemoFiles.Ctrls.Res).text("Code being Analyzed.....");
            let InferDemo = {};
            InferDemo.HelloJavaText = $(frmInferDemoFiles.Ctrls.TextArea_HelloJava).val();
            InferDemo.PointerJavaText = $(frmInferDemoFiles.Ctrls.TextArea_PointersJava).val();
            InferDemo.ResourcesJavaText = $(frmInferDemoFiles.Ctrls.TextArea_ResourcesJava).val();
            InferDemo.IsFiles = true
            InferDemo.IsInfer = true
            let ReqData =  {
                    Item: InferDemo,
                    UserInfo:null
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = ReqData;
            HttpRequestBody.MethodURL = frmInferDemoFiles.URLs.Analyse;
            HttpRequestBody.CallBackFunction = frmInferDemoFiles.Events.AnalyseDemoFilesCallBack; 
            HttpRequestBody.isCallBack = true;
            jsonRequest.postRequest(HttpRequestBody);
        },
        AnalyseDemoFilesCallBack: function (obj)
        {
            $(frmInferDemoFiles.Ctrls.Res).text(obj["Message"]);
        }
    }
}