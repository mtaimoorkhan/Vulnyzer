$(function () {
    frmSemanticErrorsOnFolder.Events.Init();
});

var frmSemanticErrorsOnFolder =
{
    ReqData: null,
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
        lblFileName:'#lblFileName'
    },
    FileUploaded: function (fileUploading) {
        $(frmSemanticErrorsOnFolder.Ctrls.Res).text(fileUploading.Res.Message);
    },
    Events:
    {       
        Init: function ()
        {
            $(frmGlobal.Ctrls.PageTitle).html("Semantic Errors On Folder");
            frmGlobal.Events.ShowDownloadLink();
            frmSemanticErrorsOnFolder.URLs =
            {
               // Analyse: 'SemanticErrorsOnFolder/fnInferSemanticErrorsOnFolder',
                MultiUpload: 'Common/fnMultiUpload',
                UploadComplete: 'SemanticErrorsOnFolder/fnUploadComplete',
            } 
            $(frmSemanticErrorsOnFolder.Ctrls.btn_Upload).click(function () {
                $(frmSemanticErrorsOnFolder.Ctrls.btnFile).click();
            });
            $(frmSemanticErrorsOnFolder.Ctrls.btnFile).change(function (e) {
                $(frmSemanticErrorsOnFolder.Ctrls.Res).text("");
                if (e.target.files[0] != null)
                {
                    if (e.handled !== true) {
                        e.handled = true;
                        frmSemanticErrorsOnFolder.IDs.FileUploadChange = e;
                        fileUploading.Extensions = frmSemanticErrorsOnFolder.mExtentions;
                        fileUploading.Events.fnCheckExtention(e.target.files[0]);
                        $(frmSemanticErrorsOnFolder.Ctrls.lblFileName).html(e.target.files[0].name);
                    }
                }
                else
                {
                    $(frmSemanticErrorsOnFolder.Ctrls.lblFileName).html('');
                }

            });
            $(frmSemanticErrorsOnFolder.Ctrls.btn_AnalyseDemoFiles).click(function ()
            {
              if (
                    $(frmSemanticErrorsOnFolder.Ctrls.btnFile)[0].files.length === 0) {
                    Swal.fire({
                        title: "No file selected!",
                        text: "Please Select the file!",
                        icon: "warning"
                    });
                }
                else
                {
                    $(frmSemanticErrorsOnFolder.Ctrls.Res).text("Code being Analyzed.....");
                    fileUploading.Events.UploadFile(frmSemanticErrorsOnFolder.IDs.FileUploadChange);
                    frmSemanticErrorsOnFolder.ReqData =
                    {
                        Item: {
                            IsInfer: true,
                            IsFolder: true
                        },
                        UserInfo: null
                    };
                    fileUploading.Events.myFunc(frmSemanticErrorsOnFolder.URLs.MultiUpload, frmSemanticErrorsOnFolder.URLs.UploadComplete, frmSemanticErrorsOnFolder);
                }

                
            });
        }
    }
}