$(function () {
    frmSyntaxErrorFolder.Events.Init();
});
var frmSyntaxErrorFolder =
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
        lblFileName: '#lblFileName',
        chkFolder: '#chkFolder',
        chkFiles: '#chkFiles',
        rFiles: '#rFiles',
        chkInfer: '#chkInfer',
        chkPMD: '#chkPMD',
        txtViolation: '#txtViolation',
        txtNoViolation: '#txtNoViolation',
        txtStixObject: '#txtStixObject',

        txtXPathQuery: '#txtXPathQuery',
        txtAnalysisPMD: '#txtAnalysisPMD',
        txtAnalysisInfer: '#txtAnalysisInfer',
        StixObjectImage1: '#StixObjectImage1',
        StixObjectImage2: '#StixObjectImage2',
        StixObjectImage3: '#StixObjectImage3',
        StixObjectJsonXPath: '#StixObjectJsonXPath',


    },
    Events:
    {
        Init: function () {
            $(frmGlobal.Ctrls.PageTitle).html("Syntax Errors On Folder");
            frmGlobal.Events.ShowDownloadLink();
            frmSyntaxErrorFolder.URLs =
            {
                MultiUpload: 'Common/fnMultiUpload',
                /*  UploadComplete: 'AnalyzePage/fnUploadComplete',*/
                UploadComplete: 'SemanticErrorsOnFolder/fnUploadComplete',
                Analyse: 'Infer/fnInferDemo',
                fnGetDemoFileData: 'PMD/fnGetDemoFileData',
                fnGetDemoFileDataForAll: 'PMD/fnGetDemoFileDataForAll',
                fnGetDemoFileDataForSelected: 'PMD/fnGetDemoFileDataForSelected'
            }

            
            

            //$(frmSyntaxErrorFolder.Ctrls.chkFolder).change(function () {
            //    if ($(frmSyntaxErrorFolder.Ctrls.chkFolder).prop("checked")) {
            //        $(frmSyntaxErrorFolder.Ctrls.rFiles).show();
            //    } else {
            //        $(frmSyntaxErrorFolder.Ctrls.rFiles).hide();
            //    }
            //    $(frmSyntaxErrorFolder.Ctrls.Res).text("");
            //    $(frmSyntaxErrorFolder.Ctrls.lblFileName).html("");
            //    frmSyntaxErrorFolder.Events.SetTabVisibility();
            //    frmSyntaxErrorFolder.Events.CheckSubmission();
            //});
             
            $(frmSyntaxErrorFolder.Ctrls.btn_Upload).click(function () {
                $(frmSyntaxErrorFolder.Ctrls.btnFile).click();
            });
            $(frmSyntaxErrorFolder.Ctrls.btnFile).change(function (e)
            {
                $(frmSyntaxErrorFolder.Ctrls.Res).text("");
                if (e.target.files[0] != null)
                {
                    if (e.handled !== true)
                    {
                        e.handled = true;
                        frmSyntaxErrorFolder.IDs.FileUploadChange = e;
                        fileUploading.Extensions = frmSyntaxErrorFolder.mExtentions;
                        fileUploading.Events.fnCheckExtention(e.target.files[0]);
                        $(frmSyntaxErrorFolder.Ctrls.lblFileName).html(e.target.files[0].name);
                    }
                }
                else
                {
                    $(frmSyntaxErrorFolder.Ctrls.lblFileName).html('');
                }
            });
            $(frmSyntaxErrorFolder.Ctrls.btn_AnalyseDemoFiles).click(function () {

                if (
                    $(frmSyntaxErrorFolder.Ctrls.btnFile)[0].files.length === 0)
                {
                    Swal.fire({
                        title: "No file selected!",
                        text: "Please Select the file!",
                        icon: "warning"
                    });
                }
                else
                {
                    frmSyntaxErrorFolder.Events.ClearResult();
                    $(frmSyntaxErrorFolder.Ctrls.Res).text("Code being Analyzed.....");
                    let InferDemo = {};
                    InferDemo.IsFolder = true;
                    InferDemo.IsFiles = false;

                    InferDemo.IsPMD = true;
                    InferDemo.IsInfer = false;
                    InferDemo.VulnerabilityCategoryId = '';

                    let JavaRules = [];
                    let XpathRules = [];

                    $('input.chkbxIbx:checkbox:checked').each(function () {
                        let JavaRule = {};
                        JavaRule.RuleRef = $(this).attr('id');
                        JavaRule.RuleId = $(this).attr('text');
                        JavaRules.push(JavaRule);
                    });

                    $('input.chkbyIby:checkbox:checked').each(function () {
                        let XpathRuleDetail = {};
                        XpathRuleDetail.RuleId = $(this).attr('id');
                        XpathRuleDetail.Name = '';

                        XpathRuleDetail.XpathExpression = '';
                        XpathRuleDetail.Message = '';
                        XpathRuleDetail.Description = '';
                        XpathRuleDetail.Priority = '';
                        XpathRuleDetail.XpathExpressionToShow = '';



                        XpathRules.push(XpathRuleDetail);

                    });


                    InferDemo.XpathRules = XpathRules;
                    InferDemo.JavaRules = JavaRules;
                    /**************************************************/




                    let ReqData = {
                        Item: InferDemo,
                        UserInfo: null
                    };
                    frmSyntaxErrorFolder.ReqData = ReqData;
                    fileUploading.Events.UploadFile(frmSyntaxErrorFolder.IDs.FileUploadChange);
                    fileUploading.Events.myFunc(frmSyntaxErrorFolder.URLs.MultiUpload, frmSyntaxErrorFolder.URLs.UploadComplete, frmSyntaxErrorFolder);
                }
               
            });
            
            frmSyntaxErrorFolder.Events.GetDemoFileData();
        },
        GetDemoFileData: function () {
            frmSyntaxErrorFolder.Events.ClearResult();
            let VulnerabilityCategoryId = '';
            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = VulnerabilityCategoryId;

            let JReq = {
                Item: PMDDemo
                
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;
            HttpRequestBody.MethodURL = frmSyntaxErrorFolder.URLs.fnGetDemoFileDataForAll;
            HttpRequestBody.CallBackFunction = frmSyntaxErrorFolder.Events.GetDemoFileDataCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },

        GetDemoFileDataCallBack: function (obj) {
            $(frmSyntaxErrorFolder.Ctrls.txtViolation).val(obj.ViolationCode);
            $(frmSyntaxErrorFolder.Ctrls.txtNoViolation).val(obj.NoViolationCode);
            $(frmSyntaxErrorFolder.Ctrls.txtStixObject).val(obj.STIXObject);
            var JavaRules = obj.JavaRules;
            var counter = 0;

            /*************************************/
            $('.ibyp').append('<input type="checkbox" id="chkbyIbyAll" /><label class="ms-2" for="chkbyIbyAll" style="cursor:pointer;"><b>CAPEC/CWE Rules</b></label>')

            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-335" /><span class="ms-2">CWE_335: Long Integer Violation </span>  <br />')

            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-480" /><span class="ms-2">CWE-480: Use of Incorrect Operator Declaration Rule</span>  <br />')


            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-369" /><span class="ms-2">CWE-369 Divide By Zero</span>  <br />')

            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-681" /><span class="ms-2">CWE-681 Incorrect Conversion between Numeric Types</span>  <br />')

            $('#chkbyIbyAll').click(function () {
                $(".chkbyIby").prop('checked', $(this).prop("checked"));
            });
            $(".chkbyIby").prop('checked', true);
            $("#chkbyIbyAll").prop('checked', true);
            /******************************************/ 
            $('.ibxp').append('<input type="checkbox" id="chkbxIbxAll" /><label class="ms-2" for="chkbxIbxAll" style="cursor:pointer;"><b>General Rules</b></label>')



            jQuery.each(JavaRules, function (key, val) {
                $('.ibx').append('<input type="checkbox" class="chkbxIbx" id=' + "'" + val.RuleRef + "'" + ' text=' + "'" + val.RuleId + "'" + '/> ' + val.RuleId + '<br />');

            });




            $('#chkbxIbxAll').click(function () {
                $(".chkbxIbx").prop('checked', $(this).prop("checked"));
                if ($(this).is(':checked')) {

                }
            });
        },
        UpdateStix: function () {
            let counter = 0;
            let XpathRules = [];
            $('.chkbyIby').each(function (index, obj) {
                if (this.checked === true) {
                    counter = counter + 1;
                    let XpathRuleDetail = {};
                    XpathRuleDetail.RuleId = $(this).attr('id');
                    XpathRuleDetail.Name = '';
                    XpathRuleDetail.XpathExpression = '';
                    XpathRuleDetail.Message = '';
                    XpathRuleDetail.Description = '';
                    XpathRuleDetail.Priority = '';
                    XpathRuleDetail.XpathExpressionToShow = '';
                    XpathRules.push(XpathRuleDetail);
                }
            });

            frmSyntaxErrorFolder.Events.ClearResult();

            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = '';
            PMDDemo.XpathRules = XpathRules;

            let ReqData = {
                Item: PMDDemo,
                UserInfo: null
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = ReqData;
            HttpRequestBody.MethodURL = frmSyntaxErrorFolder.URLs.fnGetDemoFileDataForSelected;
            HttpRequestBody.CallBackFunction = frmSyntaxErrorFolder.Events.UpdateStixCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },
        UpdateStixCallBack: function (obj) {

            $(frmSyntaxErrorFolder.Ctrls.txtViolation).val(obj.ViolationCode);
            $(frmSyntaxErrorFolder.Ctrls.txtNoViolation).val(obj.NoViolationCode);
            $(frmSyntaxErrorFolder.Ctrls.txtStixObject).val(obj.STIXObject);
        },
        ClearResult: function () {
            $(frmSyntaxErrorFolder.Ctrls.txtXPathQuery).val('');
            $(frmSyntaxErrorFolder.Ctrls.txtAnalysisPMD).val('');
            $(frmSyntaxErrorFolder.Ctrls.StixObjectImage1).attr("src", '');
            $(frmSyntaxErrorFolder.Ctrls.StixObjectImage2).attr("src", '');
            $(frmSyntaxErrorFolder.Ctrls.StixObjectImage3).attr("src", '');
            $(frmSyntaxErrorFolder.Ctrls.StixObjectJsonXPath).attr("src", '');
        },
        CheckSubmission: function () {

             
        },
        AnalyseDemoFilesCallBack: function (obj) {
                      
            $(frmSyntaxErrorFolder.Ctrls.txtAnalysisPMD).val(obj.PMDAnalysis);
            $(frmSyntaxErrorFolder.Ctrls.txtXPathQuery).val(obj.XPathQuery);
            $(frmSyntaxErrorFolder.Ctrls.StixObjectImage1).attr("src", obj.Image1);
            $(frmSyntaxErrorFolder.Ctrls.StixObjectImage2).attr("src", obj.Image2);
            $(frmSyntaxErrorFolder.Ctrls.StixObjectImage3).attr("src", obj.Image3);
            $(frmSyntaxErrorFolder.Ctrls.StixObjectJsonXPath).attr("src", obj.Image);
           

        },


    },
    FileUploaded: function (fileUploading) {
        console.log(fileUploading);
        $(frmSyntaxErrorFolder.Ctrls.txtAnalysisInfer).val(fileUploading.Res.Message);
        $(frmSyntaxErrorFolder.Ctrls.txtAnalysisPMD).val(fileUploading.Res.PMDAnalysis);
        $(frmSyntaxErrorFolder.Ctrls.txtXPathQuery).val(fileUploading.Res.XPathQuery);
        $(frmSyntaxErrorFolder.Ctrls.StixObjectImage1).attr("src", fileUploading.Res.Image1);
        $(frmSyntaxErrorFolder.Ctrls.StixObjectImage2).attr("src", fileUploading.Res.Image2);
        $(frmSyntaxErrorFolder.Ctrls.StixObjectImage3).attr("src", fileUploading.Res.Image3);
        $(frmSyntaxErrorFolder.Ctrls.StixObjectJsonXPath).attr("src", fileUploading.Res.Image);
    },


}