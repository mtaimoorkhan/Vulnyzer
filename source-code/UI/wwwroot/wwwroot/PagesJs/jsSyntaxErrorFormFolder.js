$(function () {
    frmAnalyzePage.Events.Init();
});
var frmAnalyzePage =
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
 
        chkPMD: '#chkPMD',
        ddlVulnerableCategories: '#ddlVulnerableCategories',
        txtViolation: '#txtViolation',
        txtNoViolation: '#txtNoViolation',
        txtStixObject: '#txtStixObject',

        txtXPathQuery: '#txtXPathQuery',
        txtAnalysisPMD: '#txtAnalysisPMD',
      
        StixObjectImage1: '#StixObjectImage1',
        StixObjectImage2: '#StixObjectImage2',
        StixObjectImage3: '#StixObjectImage3',
        StixObjectJsonXPath: '#StixObjectJsonXPath'
    },
    Events:
    {
        Init: function () {
            $(frmGlobal.Ctrls.PageTitle).html("Syntax Error");
            frmGlobal.Events.ShowDownloadLink();
            frmAnalyzePage.URLs =
            {
                MultiUpload: 'Common/fnMultiUpload',
                /*  UploadComplete: 'AnalyzePage/fnUploadComplete',*/
                UploadComplete: 'SemanticErrorsOnFolder/fnUploadComplete',
                Analyse: 'Infer/fnInferDemo',
                fnGetDemoFileData: 'PMD/fnGetDemoFileData',
                fnGetDemoFileDataForAll: 'PMD/fnGetDemoFileDataForAll',
                fnGetDemoFileDataForSelected: 'PMD/fnGetDemoFileDataForSelected'
            }



            $(frmAnalyzePage.Ctrls.chkFolder).change(function () {
                if ($(frmAnalyzePage.Ctrls.chkFolder).prop("checked")) {
                    $(frmAnalyzePage.Ctrls.rFiles).show();
                } else {
                    $(frmAnalyzePage.Ctrls.rFiles).hide();
                }
                $(frmAnalyzePage.Ctrls.Res).text("");
                $(frmAnalyzePage.Ctrls.lblFileName).html("");
                frmAnalyzePage.Events.SetTabVisibility();
                frmAnalyzePage.Events.CheckSubmission();
            });
            $(frmAnalyzePage.Ctrls.chkFiles).change(function () {
                $(frmAnalyzePage.Ctrls.Res).text("");
                $(frmAnalyzePage.Ctrls.lblFileName).html("");
                frmAnalyzePage.Events.SetTabVisibility();
                frmAnalyzePage.Events.CheckSubmission();
            });
            $(frmAnalyzePage.Ctrls.btn_Upload).click(function () {
                $(frmAnalyzePage.Ctrls.btnFile).click();
            });
            $(frmAnalyzePage.Ctrls.btnFile).change(function (e)
            {
                
                $(frmAnalyzePage.Ctrls.Res).text("");
                if (e.target.files[0] != null) {
                    if (e.handled !== true) {
                        e.handled = true;
                        frmAnalyzePage.IDs.FileUploadChange = e;
                        fileUploading.Extensions = frmAnalyzePage.mExtentions;
                        fileUploading.Events.fnCheckExtention(e.target.files[0]);
                        $(frmAnalyzePage.Ctrls.lblFileName).html(e.target.files[0].name);
                    }
                }
                else
                {
                    $(frmAnalyzePage.Ctrls.lblFileName).html('');
                }
            });
            $(frmAnalyzePage.Ctrls.btn_AnalyseDemoFiles).click(function () {

                if ( 
                    $(frmAnalyzePage.Ctrls.chkFolder).prop("checked") == true &&
                    $(frmAnalyzePage.Ctrls.btnFile)[0].files.length === 0
                )
                {
                    Swal.fire({
                        title: "No file selected!",
                        text: "Please Select the file!",
                        icon: "warning"
                    });
                }
                else
                {
                    frmAnalyzePage.Events.ClearResult();
                    $(frmAnalyzePage.Ctrls.Res).text("Code being Analyzed.....");
                    let InferDemo = {};
                    InferDemo.IsFolder = $(frmAnalyzePage.Ctrls.chkFolder).prop("checked");
                    InferDemo.IsFiles = $(frmAnalyzePage.Ctrls.chkFiles).prop("checked")


                    InferDemo.IsPMD = true;
                    InferDemo.IsInfer = false;
                    InferDemo.VulnerabilityCategoryId = '';

                    /*************************************************/
                    let JavaRules = [];
                    let XpathRules = [];

                    $('input.chkbxIbx:checkbox:checked').each(function () {
                        let JavaRule = {};
                        JavaRule.RuleRef = $(this).attr('id');
                        JavaRule.RuleId = $(this).attr('text');
                        JavaRules.push(JavaRule);
                    });
                    $('input.chkbyIby:checkbox:checked').each(function ()
                    {
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
                    frmAnalyzePage.ReqData = ReqData;
                    if (InferDemo.IsFolder) {
                        fileUploading.Events.UploadFile(frmAnalyzePage.IDs.FileUploadChange);
                        fileUploading.Events.myFunc(frmAnalyzePage.URLs.MultiUpload, frmAnalyzePage.URLs.UploadComplete, frmAnalyzePage);
                    } else if (InferDemo.IsFiles) {
                        let HttpRequestBody = Requestbody;
                        HttpRequestBody.Data = frmAnalyzePage.ReqData;
                        HttpRequestBody.MethodURL = frmAnalyzePage.URLs.Analyse;
                        HttpRequestBody.CallBackFunction = frmAnalyzePage.Events.AnalyseDemoFilesCallBack;
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
            $(frmAnalyzePage.Ctrls.ddlVulnerableCategories).on('change', function () {
                frmAnalyzePage.Events.GetDemoFileData();
            });
            frmAnalyzePage.Events.SetTabVisibility();
            frmAnalyzePage.Events.GetDemoFileData();
        },
        GetDemoFileData: function () {
            frmAnalyzePage.Events.ClearResult();
            let VulnerabilityCategoryId = $(frmAnalyzePage.Ctrls.ddlVulnerableCategories).val();
            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = VulnerabilityCategoryId;

            let JReq = {
                Item: PMDDemo
                
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;
            HttpRequestBody.MethodURL = frmAnalyzePage.URLs.fnGetDemoFileDataForAll;
            HttpRequestBody.CallBackFunction = frmAnalyzePage.Events.GetDemoFileDataCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },

        GetDemoFileDataCallBack: function (obj) {
            $(frmAnalyzePage.Ctrls.txtViolation).val(obj.ViolationCode);
            $(frmAnalyzePage.Ctrls.txtNoViolation).val(obj.NoViolationCode);
            $(frmAnalyzePage.Ctrls.txtStixObject).val(obj.STIXObject);
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

               frmAnalyzePage.Events.UpdateStix();
            });

            $('.chkbyIby').click(function () {

                frmAnalyzePage.Events.UpdateStix();
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

            frmAnalyzePage.Events.ClearResult();

            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = '';
            PMDDemo.XpathRules = XpathRules;

            let ReqData = {
                Item: PMDDemo,
                UserInfo: null
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = ReqData;
            HttpRequestBody.MethodURL = frmAnalyzePage.URLs.fnGetDemoFileDataForSelected;
            HttpRequestBody.CallBackFunction = frmAnalyzePage.Events.UpdateStixCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },
        UpdateStixCallBack: function (obj) {

            $(frmAnalyzePage.Ctrls.txtViolation).val(obj.ViolationCode);
            $(frmAnalyzePage.Ctrls.txtNoViolation).val(obj.NoViolationCode);
            $(frmAnalyzePage.Ctrls.txtStixObject).val(obj.STIXObject);
        },
        ClearResult: function () {
            $(frmAnalyzePage.Ctrls.txtXPathQuery).val('');
            $(frmAnalyzePage.Ctrls.txtAnalysisPMD).val('');
            $(frmAnalyzePage.Ctrls.StixObjectImage1).attr("src", '');
            $(frmAnalyzePage.Ctrls.StixObjectImage2).attr("src", '');
            $(frmAnalyzePage.Ctrls.StixObjectImage3).attr("src", '');
            $(frmAnalyzePage.Ctrls.StixObjectJsonXPath).attr("src", '');

        },
        CheckSubmission: function () {


            if ($(frmAnalyzePage.Ctrls.chkFiles).prop("checked") || $(frmAnalyzePage.Ctrls.chkFolder).prop("checked")) {
                $(frmAnalyzePage.Ctrls.btn_AnalyseDemoFiles).removeAttr("disabled");
            }
            else {
                $(frmAnalyzePage.Ctrls.btn_AnalyseDemoFiles).attr("disabled", "disabled");
            }



        },
        AnalyseDemoFilesCallBack: function (obj) {
            // console.log(obj);
            // console.log('----AnalyseDemoFilesCallBack----');
            //  $(frmAnalyzePage.Ctrls.txtAnalysisInfer).text(obj["Message"]);
            $(frmAnalyzePage.Ctrls.txtAnalysisPMD).val(obj.PMDAnalysis);
            $(frmAnalyzePage.Ctrls.txtXPathQuery).val(obj.XPathQuery);
            $(frmAnalyzePage.Ctrls.StixObjectImage1).attr("src", obj.Image1);
            $(frmAnalyzePage.Ctrls.StixObjectImage2).attr("src", obj.Image2);
            $(frmAnalyzePage.Ctrls.StixObjectImage3).attr("src", obj.Image3);
            $(frmAnalyzePage.Ctrls.StixObjectJsonXPath).attr("src", obj.Image);


        },
        SetTabVisibility: function ()
        {
            
            $('.leftsidemenu').show();
            if ($(frmAnalyzePage.Ctrls.chkFiles).prop("checked") == false)   
            {
                $('.leftsidemenu').hide();
                $('.card5w').addClass('col-12');
            }
            if ($(frmAnalyzePage.Ctrls.chkFiles).prop("checked") == true) {
                 
                $('.card5w').removeClass('col-12');
            }
        }
       

    },
     FileUploaded: function (fileUploading) {
        //console.log(fileUploading);

        $(frmAnalyzePage.Ctrls.txtAnalysisPMD).val(fileUploading.Res.PMDAnalysis);
        $(frmAnalyzePage.Ctrls.txtXPathQuery).val(fileUploading.Res.XPathQuery);
         $(frmAnalyzePage.Ctrls.StixObjectImage1).attr("src", fileUploading.Res.Image1);
         $(frmAnalyzePage.Ctrls.StixObjectImage2).attr("src", fileUploading.Res.Image2);
         $(frmAnalyzePage.Ctrls.StixObjectImage3).attr("src", fileUploading.Res.Image3);
         $(frmAnalyzePage.Ctrls.StixObjectJsonXPath).attr("src", fileUploading.Res.Image);
    }
}