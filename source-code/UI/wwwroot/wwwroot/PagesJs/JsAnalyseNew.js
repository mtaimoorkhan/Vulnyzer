$(function () {
    
    frmAnalyzePage.Events.Init();
});
var frmAnalyzePage =
{
    ReqData: null,
    mExtentions: ['java', 'zip', '7z'],
    IDs: {
        FileUploadChange: '', CtrlReference: null, isCustomizedRequestView: false
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
        ddlJavaRules: '#ddlJavaRules'


    },
    Events:
    {
        Init: function () {
            $(frmGlobal.Ctrls.PageTitle).html("Analyse Semantic & Syntax Errors");
            frmGlobal.Events.ShowDownloadLink();
            frmAnalyzePage.URLs =
            {
                MultiUpload: 'Common/fnMultiUpload',
                /*  UploadComplete: 'AnalyzePage/fnUploadComplete',*/
                UploadComplete: 'SemanticErrorsOnFolder/fnUploadComplete',
                Analyse: 'Infer/fnInferDemo',
                fnGetDemoFileData: 'PMD/fnGetDemoFileData',
                fnGetDemoFileDataForAll: 'PMD/fnGetDemoFileDataForAll',
                fnGetDemoFileDataForSelected: 'PMD/fnGetDemoFileDataForSelected',
                fnGetPmdViewSingle: 'PMD/fnGetPmdViewSingle',
                fnGetTradesCustomizedRuleRuleSingle: 'PMD/fnGetTradesCustomizedRuleRuleSingle',
                fnGetCapecRuleSingle: 'PMD/fnGetCapecRuleSingle',
                fnGetPmdViewSingleCustomized: 'PMD/fnGetPmdViewSingleCustomized',
              

            }

            $(document).delegate('.traderulelnkshow', "click", function () {

                let Id = $(this).attr('Id');
                let ThreatType = $(this).attr('ThreatType');



                let DataCarrier = {};

                DataCarrier.Id = Id;
                DataCarrier.Type = ThreatType;


                let JReq = {
                    Item: DataCarrier

                };


                let HttpRequestBody = Requestbody;
                HttpRequestBody.Data = JReq;
                HttpRequestBody.MethodURL = frmAnalyzePage.URLs.fnGetCapecRuleSingle;
                HttpRequestBody.CallBackFunction = frmAnalyzePage.Events.fnGetCapecRuleSingleCallBack;
                HttpRequestBody.isCallBack = true;
                HttpRequestBody.ShowLoader = true;
                jsonRequest.postRequest(HttpRequestBody);


            });


            $(document).delegate('.customrulelnkshow', "click", function () {

                let Id = $(this).attr('Id');
                let ThreatType = $(this).attr('ThreatType');
                let pmdrulesstixkey = $(this).attr('pmdrulesstixkey');


                let DataCarrier = {};

                DataCarrier.Id = pmdrulesstixkey;
                DataCarrier.Type = ThreatType;


                let JReq = {
                    Item: DataCarrier

                };


                let HttpRequestBody = Requestbody;
                HttpRequestBody.Data = JReq;
                HttpRequestBody.MethodURL = frmAnalyzePage.URLs.fnGetTradesCustomizedRuleRuleSingle;
                HttpRequestBody.CallBackFunction = frmAnalyzePage.Events.fnShowTradesCustomizedRuleCallBack;
                HttpRequestBody.isCallBack = true;
                HttpRequestBody.ShowLoader = true;
                jsonRequest.postRequest(HttpRequestBody);


            });

            $(frmAnalyzePage.Ctrls.chkInfer).change(function () {
                frmAnalyzePage.Events.SetTabVisibility();
                frmAnalyzePage.Events.CheckSubmission();
            });
            $(frmAnalyzePage.Ctrls.chkPMD).change(function () {
                frmAnalyzePage.Events.SetTabVisibility();
                frmAnalyzePage.Events.CheckSubmission();
            });


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
            $(frmAnalyzePage.Ctrls.btnFile).change(function (e) {
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
                else {
                    $(frmAnalyzePage.Ctrls.lblFileName).html('');
                }

            });
            $(frmAnalyzePage.Ctrls.btn_AnalyseDemoFiles).click(function () {

                $('#TradesRulesTab').html('');
                $('#TradesCustomisedRulesTab').html('');
                let JavaRules = [];
                let NonCapecJavaRules = [];
                          
                if (
                    $(frmAnalyzePage.Ctrls.chkFolder).prop("checked") == true &&
                    $(frmAnalyzePage.Ctrls.btnFile)[0].files.length === 0) {
                    Swal.fire({
                        title: "No file selected!",
                        text: "Please Select the file!",
                        icon: "warning"
                    });
                }
                else {
                    frmAnalyzePage.Events.ClearResult();
                    $(frmAnalyzePage.Ctrls.Res).text("Code being Analyzed.....");
                    let InferDemo = {};
                    InferDemo.IsFolder = $(frmAnalyzePage.Ctrls.chkFolder).prop("checked");
                    InferDemo.IsFiles = $(frmAnalyzePage.Ctrls.chkFiles).prop("checked")
                    if ($(frmAnalyzePage.Ctrls.chkFiles).prop("checked")) {
                        InferDemo.HelloJavaText = $(frmAnalyzePage.Ctrls.TextArea_HelloJava).val();
                        InferDemo.PointerJavaText = $(frmAnalyzePage.Ctrls.TextArea_PointersJava).val();
                        InferDemo.ResourcesJavaText = $(frmAnalyzePage.Ctrls.TextArea_ResourcesJava).val();
                    }

                    InferDemo.IsPMD = $(frmAnalyzePage.Ctrls.chkPMD).prop("checked");
                    InferDemo.IsInfer = $(frmAnalyzePage.Ctrls.chkInfer).prop("checked");
                    InferDemo.isTradeAnalyse = false;
                    InferDemo.ZipfileName = 'Source File(s)';

                    if (InferDemo.IsFolder)
                    {
                        var ZipfileName = $('#lblFileName').text();
                        if (ZipfileName != null && ZipfileName.length > 0)
                        {
                            InferDemo.ZipfileName = ZipfileName;
                        }
                    }



                    if ($(frmAnalyzePage.Ctrls.chkPMD).prop("checked") == true)
                    {
                        $('input.chkbyIby:checkbox:checked').each(function ()
                        {
                            let JavaRule = {};
                            JavaRule.RuleRef = $(this).attr('ref');
                            JavaRule.RuleId = $(this).attr('refname');
                            JavaRule.PMDRulesStixKey = $(this).attr('pmdrulesstixkey');  
                            JavaRules.push(JavaRule);

                        });

                        $('input.chkbxIbx:checkbox:checked').each(function ()
                        {
                            let JavaRule = {};
                            JavaRule.RuleRef = $(this).attr('id');
                            JavaRule.RuleId = $(this).attr('text');
                            NonCapecJavaRules.push(JavaRule);

                        });



                        
                    }
                    
                    InferDemo.JavaRules = JavaRules;
                    InferDemo.NonCapecJavaRules = NonCapecJavaRules;

                    InferDemo.AppUrl = $('#txtAppUrl').val();
                    InferDemo.AppName = $('#txtAppName').val();
                   
                   
                  

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


            $('.CustTradesChild').delegate('.CustTradesChild_level1', 'click', function () {
                frmAnalyzePage.IDs.isCustomizedRequestView = true;



                let Id = $(this).attr('Id');

                if ($(this).is(":checked")) {
                    frmAnalyzePage.IDs.CtrlReference = $(this).parent().find('.div1_CustTradesChild_level2');
                    frmAnalyzePage.Events.EditPmdView(Id);
                }
                else {
                    $(this).parent().find('.div1_CustTradesChild_level2').html('');
                }
            });

            $('.TradesChild').delegate('.TradesChild_level1', 'click', function () {
                frmAnalyzePage.IDs.isCustomizedRequestView = false;

                let Id = $(this).attr('Id');

                if ($(this).is(":checked")) {
                    frmAnalyzePage.IDs.CtrlReference = $(this).parent().find('.div1_TradesChild_level2');
                    frmAnalyzePage.Events.GetTradeView(Id);
                }
                else {
                    $(this).parent().find('.div1_TradesChild_level2').html('');
                }
            });



            frmAnalyzePage.Events.SetTabVisibility();
           // frmAnalyzePage.Events.GetDemoFileData();
            frmAnalyzePage.Events.GetDemoFileDataNew();
        },
        GetDemoFileDataNew: function () {
            frmAnalyzePage.Events.ClearResult();

            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = '';

            let JReq = {
                Item: PMDDemo

            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;
            HttpRequestBody.MethodURL = frmAnalyzePage.URLs.fnGetDemoFileDataForAll;
            HttpRequestBody.CallBackFunction = frmAnalyzePage.Events.GetDemoFileNewDataCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },
        GetDemoFileNewDataCallBack: function (obj) {
           


            $(frmAnalyzePage.Ctrls.txtViolation).val(obj.ViolationCode);
            $(frmAnalyzePage.Ctrls.txtNoViolation).val(obj.NoViolationCode);
            $(frmAnalyzePage.Ctrls.txtStixObject).val(obj.STIXObject);
            var JavaRules = obj.NonCapecJavaRules;  //obj.JavaRules;
            var counter = 0;

            /*************************************/

            $('.ibyp').append('<input type="checkbox" id="chkbyIbyAll" /><label class="ms-2" for="chkbyIbyAll" style="cursor:pointer;"><b>CAPEC/CWE Rules</b></label>')

            /***********
            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-335" /><span class="ms-2">CWE_335: Long Integer Violation </span>  <br />')
            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-480" /><span class="ms-2">CWE-480: Use of Incorrect Operator Declaration Rule</span>  <br />')
            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-369" /><span class="ms-2">CWE-369 Divide By Zero</span>  <br />')
            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-681" /><span class="ms-2">CWE-681 Incorrect Conversion between Numeric Types</span>  <br />')
            *********/

            let RightSideRules = obj._ListCapecMitreRuleDeatilaWithStix;

            if (RightSideRules != null && RightSideRules.length > 0)
            {
                $.each(RightSideRules, function (index, item)
                {
                    $('.iby').append('<input type="checkbox" class="chkbyIby"  id=' + item.StixKey + ' ref=' + item.Ref + ' refname=' + item.RefName + '  pmdruletypekey=' + item.PMDRuleTypeKey + '  pmdrulesstixkey=' + item.PMDRulesStixKey + ' /><span class="ms-2"> ' + item.StixName +' </span>  <br />')
                });
            }

                     
            $('#chkbyIbyAll').click(function ()
            {
                $(".chkbyIby").prop('checked', $(this).prop("checked"));
                frmAnalyzePage.Events.UpdateStix();
            });

            $('.chkbyIby').click(function () {


               
                frmAnalyzePage.Events.UpdateStix();
            });



            $(".chkbyIby").prop('checked', false);
            $("#chkbyIbyAll").prop('checked', false);
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


        fnGetCapecRuleSingleCallBack: function (obj) {
            if (obj != null) {
                $('#CustRuleName1').val(obj.Name);
                $('#CustRuleId').val(obj.Id);
                $('#CustRuleLink').attr("href", obj.Link);
                $('#CustRuleLink').text(obj.Link);
                $('#CustRuleDescription').val(obj.Description);
                $('#CustRuleSourceId').val(obj.SourceId);
                $('#CustRuleSource').val(obj.Source);
                let myModal = new bootstrap.Modal(document.getElementById('RuleDetailModal'), {});
                myModal.show();

            }
        },
        GetTradeView: function (Id) {
            frmAnalyzePage.Events.EditPmdView(Id);
        },
        fnShowTradesCustomizedRuleCallBack: function (obj) {

            if (obj != null) {
                $('#CustRuleName1').val(obj.Name);
                $('#CustRuleId').val(obj.Id);
                $('#CustRuleLink').attr("href", obj.Link);
                $('#CustRuleLink').text(obj.Link);
                $('#CustRuleDescription').val(obj.Description);
                $('#CustRuleSourceId').val(obj.SourceId);
                $('#CustRuleSource').val(obj.Source);
                let myModal = new bootstrap.Modal(document.getElementById('RuleDetailModal'), {});
                myModal.show();

            }
        },
        EditPmdView: function (Id) {

            let DataCarrier = {};
            DataCarrier.Id = Id;
            let JReq = {
                Item: DataCarrier

            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;


            if (frmAnalyzePage.IDs.isCustomizedRequestView == false) { HttpRequestBody.MethodURL = frmAnalyzePage.URLs.fnGetPmdViewSingle; }
            else { HttpRequestBody.MethodURL = frmAnalyzePage.URLs.fnGetPmdViewSingleCustomized; }

            HttpRequestBody.CallBackFunction = frmAnalyzePage.Events.EditPmdViewCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },
        EditPmdViewCallBack: function (obj) {

            let detail = obj.objectData;
            let ddata = obj.resultdata.resultData[0];

            //alert(frmAnalyzePage.IDs.isCustomizedRequestView)

            //console.log(detail);
            //console.log(ddata);

            if (detail != null && detail.length > 0) {

                if (parseInt(ddata.Def_PmdViewTypeId) == 2) {
                    $.each(detail, function (index, obj) {
                        $(frmAnalyzePage.IDs.CtrlReference).append('<p class="mt-2"><a role="button" class="ms-2 customrulelnk link-opacity-10" Id=' + obj.Id + ' ThreatType=' + obj.ThreatType + '  Ref=' + obj.Ref + ' RefName=' + obj.RefName + ' PMDRuleTypeKey=' + obj.PMDRuleTypeKey + '  PMDRulesStixKey=' + obj.PMDRulesStixKey + '  >' + obj.Name + ' </a>  </p>');
                    });
                }
                if (parseInt(ddata.Def_PmdViewTypeId) == 1) {
                    $.each(detail, function (index, obj) {
                        $(frmAnalyzePage.IDs.CtrlReference).append('<p class="mt-2"> <a role="button" class="ms-2 traderulelnk link-opacity-10" Id=' + obj.Id + ' ThreatType=' + obj.ThreatType + ' >' + obj.Name + ' </a>  </p>');
                    });
                }
            }




            //let Id = $(this).attr('Id');
            //let ThreatType = $(this).attr('ThreatType');
            //let atext = $(this).text();
            //$('.cdropcustCapec').append('<p class="mt-2">  <img src="/assets/images/threat1.png" width="20" height="20" /><a role="button" class="ms-2 customrulelnk link-opacity-10" Id=' + Id + ' ThreatType=' + ThreatType + ' >' + atext + ' </a>  <img class="ms-3 delruletemp" role="button" src="/assets/images/delete.png" width="20" height="20" /></p>');



            //if (detail != null && detail.length > 0) {
            //    $.each(detail, function (index, val) {
            //        $('.cdropcustCapec').append('<p class="mt-2">  <img src="/assets/images/threat1.png" width="20" height="20" /><a role="button" class="ms-2 customrulelnk link-opacity-10" Id=' + val.Id + ' ThreatType=' + val.ThreatType + ' >' + val.Name + ' </a>  <img class="ms-3 delruletemp" role="button" src="/assets/images/delete.png" width="20" height="20" /></p>');
            //    });
            //}

            //$('#btnEditCustomRule').click();
            //$(frmCustomisation.Ctrls.CustRuleName).val(ddata.PmdViewsName);
            //frmCustomisation.Events.GetCapecMitreRule();

        },



        GetDemoFileData: function () {
            frmAnalyzePage.Events.ClearResult();

            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = '';

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


            /*****************Trades Rules******************/
            let _TradeRules = obj._TradeRules;

            if (_TradeRules != null && _TradeRules.length > 0) {
                $.each(_TradeRules, function (indx, val) {
                    $('.TradesChild').append('<div class="div1_TradesChild_level1"><input type="checkbox" class="TradesChild_level1" id=' + val.Id + '   /><span class="ms-2">' + val.Name + '</span><div class="div1_TradesChild_level2"></div> </div>')
                });
            }


            /*****************Trades Customized Rules******************/
            let TradesCustomized = obj._TradeCustomizedRules;
            if (TradesCustomized != null && TradesCustomized.length > 0) {
                $.each(TradesCustomized, function (indx, val) {
                    $('.CustTradesChild').append('<div class="div1_CustTradesChild_level1"><input type="checkbox" class="CustTradesChild_level1" id=' + val.Id + '   /><span class="ms-2">' + val.Name + '</span><div class="div1_CustTradesChild_level2"></div> </div>')
                });
            }





            $(frmAnalyzePage.Ctrls.txtViolation).val(obj.ViolationCode);
            $(frmAnalyzePage.Ctrls.txtNoViolation).val(obj.NoViolationCode);
            $(frmAnalyzePage.Ctrls.txtStixObject).val(obj.STIXObject);
            var JavaRules = obj.JavaRules;
            var counter = 0;

            /*************************************/



            $('.ibyp').append('<input type="checkbox" id="chkbyIbyAll" /><label class="ms-2" for="chkbyIbyAll" style="cursor:pointer;"><b>CAPEC/CWE Rules</b></label>')

            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-335" /><span class="ms-2">CWE_335: Long Integer Violation </span>  <br />')

            $('.iby').append('<input type="checkbox" class="chkbyIby" id="ShortBill" /><span class="ms-2">Simple Syntactic Variable(Short=bill) Declaration Rule</span>  <br />')

            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CAPEC-250" /><span class="ms-2">CAPEC-250(XML Injection) </span>  <br />')

            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-480" /><span class="ms-2">CWE-480: Use of Incorrect Operator Declaration Rule</span>  <br />')


            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-369" /><span class="ms-2">CWE-369 Divide By Zero</span>  <br />')

            $('.iby').append('<input type="checkbox" class="chkbyIby" id="CWE-681" /><span class="ms-2">CWE-681 Incorrect Conversion between Numeric Types</span>  <br />')

            $('#chkbyIbyAll').click(function () {
                $(".chkbyIby").prop('checked', $(this).prop("checked"));
                frmAnalyzePage.Events.UpdateStix();
            });

            $('.chkbyIby').click(function () {


                //if ($(this).is(':checked')) {
                //    alert('Check This');
                //}
                //else {
                //    alert('Un Check This');
                //}
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
            $(frmAnalyzePage.Ctrls.txtAnalysisInfer).val('');
            $(frmAnalyzePage.Ctrls.StixObjectImage1).attr("src", '');
            $(frmAnalyzePage.Ctrls.StixObjectImage2).attr("src", '');
            $(frmAnalyzePage.Ctrls.StixObjectImage3).attr("src", '');
            $(frmAnalyzePage.Ctrls.StixObjectJsonXPath).attr("src", '');

        },
        CheckSubmission: function () {

            if ($(frmAnalyzePage.Ctrls.chkInfer).prop("checked") || $(frmAnalyzePage.Ctrls.chkPMD).prop("checked")) {
                if ($(frmAnalyzePage.Ctrls.chkFiles).prop("checked") || $(frmAnalyzePage.Ctrls.chkFolder).prop("checked")) {
                    $(frmAnalyzePage.Ctrls.btn_AnalyseDemoFiles).removeAttr("disabled");
                }
                else {
                    $(frmAnalyzePage.Ctrls.btn_AnalyseDemoFiles).attr("disabled", "disabled");
                }

            } else {
                $(frmAnalyzePage.Ctrls.btn_AnalyseDemoFiles).attr("disabled", "disabled");
            }


        },
        AnalyseDemoFilesCallBack: function (obj) {
            // console.log(obj);
            // console.log('----AnalyseDemoFilesCallBack----');
            //  $(frmAnalyzePage.Ctrls.txtAnalysisInfer).text(obj["Message"]);
            $(frmAnalyzePage.Ctrls.txtAnalysisInfer).val(obj.InferAnalysis);
            $(frmAnalyzePage.Ctrls.txtAnalysisPMD).val(obj.PMDAnalysis);
            $(frmAnalyzePage.Ctrls.txtXPathQuery).val(obj.XPathQuery);
            $(frmAnalyzePage.Ctrls.StixObjectImage1).attr("src", obj.Image1);
            $(frmAnalyzePage.Ctrls.StixObjectImage2).attr("src", obj.Image2);
            $(frmAnalyzePage.Ctrls.StixObjectImage3).attr("src", obj.Image3);
            $(frmAnalyzePage.Ctrls.StixObjectJsonXPath).attr("src", obj.Image);

            // console.log('AnalyseDemoFilesCallBack 713');

            $(frmAnalyzePage.Ctrls.txtAnalysisPMD).val(obj.ErrorText);

            



        },
        SetTabVisibility: function () {
            //  /********Right Side Visibility********/  tccode

            /*let ShowRightSide = true;*/
            $('.tccode').show();

            //if ($(frmAnalyzePage.Ctrls.chkFiles).prop("checked") == false)
            //{
            //    ShowRightSide = false;
            //}


            if (
                $(frmAnalyzePage.Ctrls.chkFiles).prop("checked") == false
            ) {
                $('.leftCard').hide();
                $('.card5w').addClass('col-12');
            }
            else {
                $('.card5w').removeClass('col-12');
                $('.leftCard').show();

            }

            if (
                ($(frmAnalyzePage.Ctrls.chkFiles).prop("checked") == false) ||
                ($(frmAnalyzePage.Ctrls.chkInfer).prop("checked") == false &&
                    $(frmAnalyzePage.Ctrls.chkPMD).prop("checked") == false)
            ) {
                $('.tccode').hide();
            }

            /* if (ShowRightSide == false) { $('.tccode').hide(); }*/

            if (
                $(frmAnalyzePage.Ctrls.chkFiles).prop("checked") == true
                && $(frmAnalyzePage.Ctrls.chkPMD).prop("checked") == true
            ) {
                $('.pmdtab').show();
                //  $('.pmdtabTA').show();

                $('.pmdtabviolation > button').trigger("click");
            }
            else {
                $('.pmdtab').hide();
                //  $('.pmdtabTA').hide();
            }

            if (
                $(frmAnalyzePage.Ctrls.chkFiles).prop("checked") == true
                && $(frmAnalyzePage.Ctrls.chkInfer).prop("checked") == true
            ) {
                $('.infertab').show();
                $('.infertabhellow > button').trigger("click");

                // $('.infertabTA').show();
            }
            else {
                $('.infertab').hide();
                //   $('.infertabTA').hide();
            }
            ////    /********Left Side Visibility********/
            if (
                $(frmAnalyzePage.Ctrls.chkInfer).prop("checked") == false
                && $(frmAnalyzePage.Ctrls.chkPMD).prop("checked") == false
            ) {
                $('.RPMDTab').hide();
                // $('.RPMDTabTA').hide();
                $('.RInferTab').hide();
                // $('.RInferTabTA').hide();
            }

            if (
                $(frmAnalyzePage.Ctrls.chkInfer).prop("checked") == true
                && $(frmAnalyzePage.Ctrls.chkPMD).prop("checked") == true
            ) {
                $('.RPMDTab').show();
                // $('.RPMDTabTA').show();
                $('.RInferTab').show();
                // $('.RInferTabTA').show();

                $('.RPMDTabXpathquery > button').trigger("click");
            }

            if (
                $(frmAnalyzePage.Ctrls.chkInfer).prop("checked") == true
                && $(frmAnalyzePage.Ctrls.chkPMD).prop("checked") == false
            ) {
                $('.RPMDTab').hide();
                // $('.RPMDTabTA').hide();
                $('.RInferTab').hide();
                // $('.RInferTabTA').show();
                $('.RInferTab > button').trigger("click");
            }

            if (
                $(frmAnalyzePage.Ctrls.chkInfer).prop("checked") == false
                && $(frmAnalyzePage.Ctrls.chkPMD).prop("checked") == true
            ) {
                $('.RPMDTab').show();
                //  $('.RPMDTabTA').show();
                $('.RInferTab').hide();
                //  $('.RInferTabTA').hide();
            }

            if ($(frmAnalyzePage.Ctrls.chkPMD).prop("checked") == true) {
                $("input.chkbxIbx").removeAttr("disabled");
                $("input#chkbxIbxAll").removeAttr("disabled");

                $("input.chkbyIby").removeAttr("disabled");
                $("input#chkbyIbyAll").removeAttr("disabled");

                $('.ibxpMain').show();

            }
            if ($(frmAnalyzePage.Ctrls.chkPMD).prop("checked") == false) {
                $('input.chkbxIbx').prop('checked', false);
                $("input.chkbxIbx").attr('disabled', true);
                $(".chkbxIbx").prop('checked', false);

                $('input#chkbxIbxAll').prop('checked', false);
                $("input#chkbxIbxAll").attr('disabled', true);

                $('input.chkbyIby').prop('checked', false);
                $("input.chkbyIby").attr('disabled', true);
                $(".chkbyIby").prop('checked', false);

                $('input#chkbyIbyAll').prop('checked', false);
                $("input#chkbyIbyAll").attr('disabled', true);
                $('.ibxpMain').hide();
            }

        }

    },
    FileUploaded: function (fileUploading) {

       // console.log(fileUploading.Res.NonCapecJavaRuleResult);


        $("#divLoading").show();

        $(frmAnalyzePage.Ctrls.txtAnalysisInfer).val(fileUploading.Res.Message);
        //  $(frmAnalyzePage.Ctrls.txtAnalysisPMD).val(fileUploading.Res.PMDAnalysis);
        $(frmAnalyzePage.Ctrls.txtXPathQuery).val(fileUploading.Res.XPathQuery);

        $(frmAnalyzePage.Ctrls.StixObjectImage1).attr("src", fileUploading.Res.Image1);
        $(frmAnalyzePage.Ctrls.StixObjectImage2).attr("src", fileUploading.Res.Image2);
        $(frmAnalyzePage.Ctrls.StixObjectImage3).attr("src", fileUploading.Res.Image3);
        $(frmAnalyzePage.Ctrls.StixObjectJsonXPath).attr("src", fileUploading.Res.Image);

        // $(frmAnalyzePage.Ctrls.txtAnalysisPMD).val(fileUploading.Res.ErrorText);
        $(frmAnalyzePage.Ctrls.txtAnalysisPMD).val('');

        let Errors = '';
        let StixMaster = fileUploading.Res.MiscDataSet1.Table1;
        let StixDetail = fileUploading.Res.MiscDataSet1.Table2;

        let counter = 0;
        if (StixMaster != null && StixMaster.length > 0) {
            $(StixMaster).each(function (index, val) {
                Errors = Errors + '<h3>' + val.StixName + '</h3>'
                let filteredErrors = StixDetail.filter((x) => {
                    return x.StixKey == val.StixKey;
                });
                if (filteredErrors != null && filteredErrors.length > 0) {
                    counter = 1;
                    $(filteredErrors).each(function (indexx, vall) {
                        Errors = Errors + String(counter) + ':   ' + vall.ErrorText + '<br>'
                        counter = parseInt(counter) + 1;
                    });
                }
            });
        }
        $(frmAnalyzePage.Ctrls.txtAnalysisPMD).hide();

        Errors += '<br><h2>General Rules Result</h2><br>' + fileUploading.Res.NonCapecJavaRuleResult

        $('.SyntacticAppErrorDetail').html(Errors);



        $("#divLoading").hide();
    },
}