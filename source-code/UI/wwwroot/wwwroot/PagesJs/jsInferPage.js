$(function () {
    frmInferPage.Events.Init();
});
var frmInferPage =
{
    ReqData:null,
    mExtentions: ['java', 'zip', '7z'],
    IDs: {
        FileUploadChange: ''
    },
    URLs: null,
    Ctrls:
    {
        btn_AnalyseDemoFiles: '#btn_AnalyseDemoFiles',
        TextArea_HelloJava: '#TextArea_HelloJava',
        TextArea_ResourcesJava: '#TextArea_ResourcesJava',
        TextArea_PointersJava: '#TextArea_PointersJava',
        Res: '#Res',
        btnFile: '#btnFile',
        btn_Upload: '#btn_Upload',
        lblFileName: '#lblFileName',
        chkFolder: '#chkFolder',
        chkFiles: '#chkFiles',
        rFiles:'#rFiles'
    },
    Events:
    {        
        Init: function ()
        {
            $(frmGlobal.Ctrls.PageTitle).html("Semantic Errors");
            frmGlobal.Events.ShowDownloadLink();
            frmInferPage.URLs =
            {
                MultiUpload: 'Common/fnMultiUpload',
                UploadComplete: 'SemanticErrorsOnFolder/fnUploadComplete',
                Analyse: 'Infer/fnInferDemo'
            }
            $(frmInferPage.Ctrls.chkFolder).click(function () {
                if ($(frmInferPage.Ctrls.chkFolder).prop("checked")) {
                    $(frmInferPage.Ctrls.rFiles).show();
                } else {
                    $(frmInferPage.Ctrls.rFiles).hide();
                }
                $(frmInferPage.Ctrls.Res).text("");
                frmInferPage.Events.CheckSubmission();
            });
            $(frmInferPage.Ctrls.chkFiles).click(function () {
                $(frmInferPage.Ctrls.Res).text("");
                frmInferPage.Events.CheckSubmission();
                frmInferPage.Events.CheckVisibility();
            });
            $(frmInferPage.Ctrls.btn_Upload).click(function () {
                $(frmInferPage.Ctrls.btnFile).click();
            });
            $(frmInferPage.Ctrls.btnFile).change(function (e) {
                $(frmInferPage.Ctrls.Res).text("");
                if (e.target.files[0] != null) {
                    if (e.handled !== true) {
                        e.handled = true;
                        frmInferPage.IDs.FileUploadChange = e;
                        fileUploading.Extensions = frmInferPage.mExtentions;
                        fileUploading.Events.fnCheckExtention(e.target.files[0]);
                        $(frmInferPage.Ctrls.lblFileName).html(e.target.files[0].name);
                    }
                }
                else
                {
                    $(frmInferPage.Ctrls.lblFileName).html('');
                }

            });
            $(frmInferPage.Ctrls.btn_AnalyseDemoFiles).click(function ()
            {
                if (
                    $(frmInferPage.Ctrls.chkFolder).prop("checked") == true &&
                    $(frmInferPage.Ctrls.btnFile)[0].files.length === 0) {
                    Swal.fire({
                        title: "No file selected!",
                        text: "Please Select the file!",
                        icon: "warning"
                    });
                }
                else
                {
                    $(frmInferPage.Ctrls.Res).text("Code being Analyzed.....");
                    let InferDemo = {};
                    InferDemo.IsFolder = $(frmInferPage.Ctrls.chkFolder).prop("checked");
                    InferDemo.IsFiles = $(frmInferPage.Ctrls.chkFiles).prop("checked")

                    InferDemo.IsPMD = false;
                    InferDemo.IsInfer = true;

                    if ($(frmInferPage.Ctrls.chkFiles).prop("checked")) {
                        InferDemo.HelloJavaText = $(frmInferPage.Ctrls.TextArea_HelloJava).val();
                        InferDemo.PointerJavaText = $(frmInferPage.Ctrls.TextArea_PointersJava).val();
                        InferDemo.ResourcesJavaText = $(frmInferPage.Ctrls.TextArea_ResourcesJava).val();
                    }
                    let ReqData = {
                        Item: InferDemo,
                        UserInfo: null
                    };
                    frmInferPage.ReqData = ReqData;
                    if (InferDemo.IsFolder) {
                        fileUploading.Events.UploadFile(frmInferPage.IDs.FileUploadChange);
                        fileUploading.Events.myFunc(frmInferPage.URLs.MultiUpload, frmInferPage.URLs.UploadComplete, frmInferPage);
                    } else if (InferDemo.IsFiles) {
                        let HttpRequestBody = Requestbody;
                        HttpRequestBody.Data = frmInferPage.ReqData;
                        HttpRequestBody.MethodURL = frmInferPage.URLs.Analyse;
                        HttpRequestBody.CallBackFunction = frmInferPage.Events.AnalyseDemoFilesCallBack;
                        HttpRequestBody.isCallBack = true;
                        jsonRequest.postRequest(HttpRequestBody);
                    } else {
                        Swal.fire({
                            type: 'warning',
                            title: "<i>Choose Option</i>",
                            html: "Atleast one option must be selected.",
                            confirmButtonText: "<u>Okay</u>",
                        });
                    }
                }
                
            });
        },
        CheckSubmission: function () {
            if ($(frmInferPage.Ctrls.chkFolder).prop("checked") || $(frmInferPage.Ctrls.chkFiles).prop("checked")) {
                $(frmInferPage.Ctrls.btn_AnalyseDemoFiles).removeAttr("disabled");
            } else {
                $(frmInferPage.Ctrls.btn_AnalyseDemoFiles).attr("disabled", "disabled");               
            }
        },
        AnalyseDemoFilesCallBack: function (obj) {
             $(frmInferPage.Ctrls.Res).text(obj["Message"]);
        },
        CheckVisibility: function (obj)
        {
           if (
                $(frmInferPage.Ctrls.chkFiles).prop("checked") == false
            ) {
               $('.leftCard').hide();
               $('.card5w').addClass('col-12');
            }
           else {
               $('.card5w').removeClass('col-12');
               $('.leftCard').show();
           }
        } 
    },
    FileUploaded: function (fileUploading) {
        $(frmInferPage.Ctrls.Res).text(fileUploading.Res.Message);
    },
}