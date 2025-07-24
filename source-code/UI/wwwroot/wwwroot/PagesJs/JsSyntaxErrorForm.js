$(function () {
    frmSyntaxErrorForm.Events.Init();
});
var frmSyntaxErrorForm =
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
        StixObjectJsonXPath: '#StixObjectJsonXPath'
    },
    Events:
    {
        Init: function () {
            $(frmGlobal.Ctrls.PageTitle).html("Syntax Errors On Files");
            //frmGlobal.Events.ShowDownloadLink();
            frmSyntaxErrorForm.URLs =
            {
                Analyse: 'Infer/fnInferDemo',
                fnGetDemoFileData: 'PMD/fnGetDemoFileData',
                fnGetDemoFileDataForAll: 'PMD/fnGetDemoFileDataForAll',
                fnGetDemoFileDataForSelected: 'PMD/fnGetDemoFileDataForSelected'
            }

            $(frmSyntaxErrorForm.Ctrls.btn_AnalyseDemoFiles).click(function () {
                frmSyntaxErrorForm.Events.ClearResult();
                $(frmSyntaxErrorForm.Ctrls.Res).text("Code being Analyzed.....");
                let InferDemo = {};
                InferDemo.IsFolder = false;
                InferDemo.IsFiles = true
                 

                InferDemo.IsPMD = true;
                InferDemo.IsInfer = false;
                InferDemo.VulnerabilityCategoryId = '';

                /**************************************************/
                let JavaRules = [];
                let XpathRules = [];

                $('input.chkbxIbx:checkbox:checked').each(function ()
                {
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
                frmSyntaxErrorForm.ReqData = ReqData;
                 
                    let HttpRequestBody = Requestbody;
                    HttpRequestBody.Data = frmSyntaxErrorForm.ReqData;
                    HttpRequestBody.MethodURL = frmSyntaxErrorForm.URLs.Analyse;
                    HttpRequestBody.CallBackFunction = frmSyntaxErrorForm.Events.AnalyseDemoFilesCallBack;
                    HttpRequestBody.isCallBack = true;
                    jsonRequest.postRequest(HttpRequestBody);
                 
                     
                 
            });
            
          
            frmSyntaxErrorForm.Events.GetDemoFileData();
        },
        GetDemoFileData: function () {
            frmSyntaxErrorForm.Events.ClearResult();
           
            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = '';

            let JReq = {
                Item: PMDDemo
               
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;
            HttpRequestBody.MethodURL = frmSyntaxErrorForm.URLs.fnGetDemoFileDataForAll;
            HttpRequestBody.CallBackFunction = frmSyntaxErrorForm.Events.GetDemoFileDataCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },

        GetDemoFileDataCallBack: function (obj) {
            $(frmSyntaxErrorForm.Ctrls.txtViolation).val(obj.ViolationCode);
            $(frmSyntaxErrorForm.Ctrls.txtNoViolation).val(obj.NoViolationCode);
            $(frmSyntaxErrorForm.Ctrls.txtStixObject).val(obj.STIXObject);

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

                //if ($(this).is(':checked'))
                //{
                //    alert('Check All');
                //}
                //else
                //{
                //    alert('Un Check All');
                //}
                frmSyntaxErrorForm.Events.UpdateStix();
            });

            $('.chkbyIby').click(function () {


                //if ($(this).is(':checked')) {
                //    alert('Check This');
                //}
                //else {
                //    alert('Un Check This');
                //}
                frmSyntaxErrorForm.Events.UpdateStix();
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

            frmSyntaxErrorForm.Events.ClearResult();

            let PMDDemo = {};
            PMDDemo.VulnerabilityCategoryId = '';
            PMDDemo.XpathRules = XpathRules;

            let ReqData = {
                Item: PMDDemo,
                UserInfo: null
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = ReqData;
            HttpRequestBody.MethodURL = frmSyntaxErrorForm.URLs.fnGetDemoFileDataForSelected;
            HttpRequestBody.CallBackFunction = frmSyntaxErrorForm.Events.UpdateStixCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },
        UpdateStixCallBack: function (obj) {

            $(frmSyntaxErrorForm.Ctrls.txtViolation).val(obj.ViolationCode);
            $(frmSyntaxErrorForm.Ctrls.txtNoViolation).val(obj.NoViolationCode);
            $(frmSyntaxErrorForm.Ctrls.txtStixObject).val(obj.STIXObject);
        },
        ClearResult: function () {
            $(frmSyntaxErrorForm.Ctrls.txtXPathQuery).val('');
            $(frmSyntaxErrorForm.Ctrls.txtAnalysisPMD).val('');
            $(frmSyntaxErrorForm.Ctrls.StixObjectImage1).attr("src", '');
            $(frmSyntaxErrorForm.Ctrls.StixObjectImage2).attr("src", '');
            $(frmSyntaxErrorForm.Ctrls.StixObjectImage3).attr("src", '');
            $(frmSyntaxErrorForm.Ctrls.StixObjectJsonXPath).attr("src", '');

        },
      
        AnalyseDemoFilesCallBack: function (obj) {
            
            $(frmSyntaxErrorForm.Ctrls.txtAnalysisPMD).val(obj.PMDAnalysis);
            $(frmSyntaxErrorForm.Ctrls.txtXPathQuery).val(obj.XPathQuery);
            $(frmSyntaxErrorForm.Ctrls.StixObjectImage1).attr("src", obj.Image1);
            $(frmSyntaxErrorForm.Ctrls.StixObjectImage2).attr("src", obj.Image2);
            $(frmSyntaxErrorForm.Ctrls.StixObjectImage3).attr("src", obj.Image3);
            $(frmSyntaxErrorForm.Ctrls.StixObjectJsonXPath).attr("src", obj.Image);
           

        },
       

    }
    


}