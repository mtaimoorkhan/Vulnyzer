$(function () {
    frmCustomisation.Events.Init();
});
var frmCustomisation =
{
    ReqData: null,
    mExtentions: ['java', 'zip', '7z'],
    IDs: {
        Type: '',
        Id: '',
        Name: '',
        ObjectData: {}

    },
    URLs: null,
    Ctrls:
    { 

    },
    Events:
    {
        Init: function () {
            $(frmGlobal.Ctrls.PageTitle).html("Rule Customization");
            frmGlobal.Events.ShowDownloadLink();
            frmCustomisation.URLs =
            {
                fnGetXpathRule: 'PMD/fnGetXpathRule',
                fnGetCapecMitreRuleDetail: 'PMD/fnGetCapecMitreRuleDetail',
            }

            $(document).delegate('.licapecmitrerule' , "click", function ()
            {
                let Id = $(this).attr('id');
                let ThreatType = $(this).attr('ThreatType');
               

                let CapecMitreRuleDetail = {};
                CapecMitreRuleDetail.Id = Id;
                CapecMitreRuleDetail.ThreatType = ThreatType;

                CapecMitreRuleDetail.UserKey = jsToken.Events.getToken();
                CapecMitreRuleDetail.CreateUserFile = true;

                let ReqData = {
                    Item: CapecMitreRuleDetail,
                    UserInfo: null
                };
                let HttpRequestBody = Requestbody;
                HttpRequestBody.Data = ReqData;
                HttpRequestBody.MethodURL = frmCustomisation.URLs.fnGetCapecMitreRuleDetail;
                HttpRequestBody.CallBackFunction = frmCustomisation.Events.GetCapecMitreRuleDetailCallBack;
                HttpRequestBody.isCallBack = true;
                HttpRequestBody.ShowLoader = true;
                jsonRequest.postRequest(HttpRequestBody);

             

            });


            $('#SaveCustomRule').click(function ()
            {
                alert('uuu');
            });
            $('.customdroppable').delegate('.customrulelnk', "click", function ()
            {
                let Id = $(this).attr('id');
                let ThreatType = $(this).attr('ThreatType');
                alert('ttpp');
                
                /**********
                 
                let CapecMitreRuleDetail = {};
                CapecMitreRuleDetail.Id = Id;
                CapecMitreRuleDetail.ThreatType = ThreatType;

                CapecMitreRuleDetail.UserKey = jsToken.Events.getToken();
                CapecMitreRuleDetail.CreateUserFile = true;

                let ReqData = {
                    Item: CapecMitreRuleDetail,
                    UserInfo: null
                };
                let HttpRequestBody = Requestbody;
                HttpRequestBody.Data = ReqData;
                HttpRequestBody.MethodURL = frmCustomisation.URLs.fnGetCapecMitreRuleDetail;
                HttpRequestBody.CallBackFunction = frmCustomisation.Events.GetCapecMitreRuleDetailCallBack;
                HttpRequestBody.isCallBack = true;
                HttpRequestBody.ShowLoader = true;
                jsonRequest.postRequest(HttpRequestBody);
                ********/

               if (ThreatType == 'Capec')
                {
                    let Capec_Rules = frmCustomisation.IDs.ObjectData.Capec_Rules;

                    var obj = Capec_Rules.filter(function (item)
                    {
                        return item.Id == Id;
                    });

                    if (obj != null && obj.length == 1)
                    {
                        $('#CustRuleName').val(obj[0].Name);
                        $('#CustRuleId').val(obj[0].Id);
                        $('#CustRuleLink').attr("href", obj[0].Link);
                        $('#CustRuleLink').text(obj[0].Link);
                        $('#CustRuleDescription').val(obj[0].Description);
                        $('#CustRuleSourceId').val(obj[0].SourceId);
                        $('#CustRuleSource').val(obj[0].Source);
                        $('#btnModel2').click();
                    }
                }

                if (ThreatType == 'Mitre_Enterprise_Attack')
                {
                    let _Rules = frmCustomisation.IDs.ObjectData.Mitre_Enterprise_Attack_Rules;

                    var obj = _Rules.filter(function (item)
                    {
                        return item.Id == Id;
                    });

                    if (obj != null && obj.length == 1)
                    {
                        $('#CustRuleName').val(obj[0].Name);
                        $('#CustRuleId').val(obj[0].Id);
                        $('#CustRuleLink').attr("href", obj[0].Link);
                        $('#CustRuleLink').text(obj[0].Link);
                        $('#CustRuleDescription').val(obj[0].Description);
                        $('#CustRuleSourceId').val(obj[0].SourceId);
                        $('#CustRuleSource').val(obj[0].Source);
                        $('#btnModel2').click();
                    }
                }

                if (ThreatType == 'Mitre_Ics_Attack') {
                    let _Rules = frmCustomisation.IDs.ObjectData.Mitre_Ics_Attack_Rules;

                    var obj = _Rules.filter(function (item) {
                        return item.Id == Id;
                    });

                    if (obj != null && obj.length == 1) {
                        $('#CustRuleName').val(obj[0].Name);
                        $('#CustRuleId').val(obj[0].Id);
                        $('#CustRuleLink').attr("href", obj[0].Link);
                        $('#CustRuleLink').text(obj[0].Link);
                        $('#CustRuleDescription').val(obj[0].Description);
                        $('#CustRuleSourceId').val(obj[0].SourceId);
                        $('#CustRuleSource').val(obj[0].Source);
                        $('#btnModel2').click();
                    }
                }

                if (ThreatType == 'Mitre_Mobile_Attack') {
                    let _Rules = frmCustomisation.IDs.ObjectData.Mitre_Mobile_Attack_Rules;

                    var obj = _Rules.filter(function (item) {
                        return item.Id == Id;
                    });

                    if (obj != null && obj.length == 1) {
                        $('#CustRuleName').val(obj[0].Name);
                        $('#CustRuleId').val(obj[0].Id);
                        $('#CustRuleLink').attr("href", obj[0].Link);
                        $('#CustRuleLink').text(obj[0].Link);
                        $('#CustRuleDescription').val(obj[0].Description);
                        $('#CustRuleSourceId').val(obj[0].SourceId);
                        $('#CustRuleSource').val(obj[0].Source);
                        $('#btnModel2').click();
                    }
                }

                if (ThreatType == 'Mitre_Pre_Attack') {
                    let _Rules = frmCustomisation.IDs.ObjectData.Mitre_Pre_Attack_Rules;

                    var obj = _Rules.filter(function (item) {
                        return item.Id == Id;
                    });

                    if (obj != null && obj.length == 1) {
                        $('#CustRuleName').val(obj[0].Name);
                        $('#CustRuleId').val(obj[0].Id);
                        $('#CustRuleLink').attr("href", obj[0].Link);
                        $('#CustRuleLink').text(obj[0].Link);
                        $('#CustRuleDescription').val(obj[0].Description);
                        $('#CustRuleSourceId').val(obj[0].SourceId);
                        $('#CustRuleSource').val(obj[0].Source);
                        $('#btnModel2').click();
                    }
                }
            });

            $(".ibx").delegate(".rulelnk", "click", function ()
            {
                let Name = $(this).text();
                let id = $(this).attr('id');
                let Xpath = $(this).attr('Xpath');
                $("#RuleHeading").text(Name);
                $("#RuleXpath").text(Xpath);
                $("#NewRuleXpath").text(Xpath);
                $("#btnModel").click();
                
            });
         /****************************************************/
         frmCustomisation.Events.GetRuleIndex();
        },
        GetCapecMitreRuleDetailCallBack: function (obj)
        {


            $('.cdrop').append('<p class="mt-2">  <img src="/assets/images/threat1.png" width="20" height="20" /><a role="button" class="ms-2 customrulelnk link-opacity-10" ThreatType=' + obj.ThreatType + ' id=' + obj.Id + ' >' + obj.Name + ' </a></p>');


            //console.log('123');
            //console.log(obj);

          //  $('.CustRuleHeading').text(obj.Name);


            
            //$('#CustRuleName').val(obj.Name);
            //$('#CustRuleId').val(obj.Id);

         
            //$('#CustRuleLink').attr("href", obj.Link);
            //$('#CustRuleLink').text(obj.Link);


            //$('#CustRuleDescription').val(obj.Description);
            //$('#CustRuleSourceId').val(obj.SourceId);
            //$('#CustRuleSource').val(obj.Source);
            //$('#btnModel2').click();
            

        },
        GetRuleIndex: function ()
        {
            let PMDDemo = {};
           
            let ReqData = {
                Item: PMDDemo,
                UserInfo: null
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = ReqData;
            HttpRequestBody.MethodURL = frmCustomisation.URLs.fnGetXpathRule;
            HttpRequestBody.CallBackFunction = frmCustomisation.Events.GetRuleIndexCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);
        },
        GetRuleIndexCallBack: function (obj) {

            let _CapecMitreRule = obj._CapecMitreRule;
            frmCustomisation.IDs.ObjectData = _CapecMitreRule;
            let Capec_Rules = _CapecMitreRule.Capec_Rules;
            let Mitre_Enterprise_Attack_Rules = _CapecMitreRule.Mitre_Enterprise_Attack_Rules;
            let Mitre_Ics_Attack_Rules = _CapecMitreRule.Mitre_Ics_Attack_Rules;
            let Mitre_Mobile_Attack_Rules = _CapecMitreRule.Mitre_Mobile_Attack_Rules;
            let Mitre_Pre_Attack_Rules = _CapecMitreRule.Mitre_Pre_Attack_Rules;

            $.each(obj.XpathRules, function (key, value) {
                $('.ibx').append('<p><a role="button" class="rulelnk link-opacity-10" Xpath=' + value.XpathExpression + ' id=' + value.RuleId + '>' + value.Name + '</a></p>');

            });

            $('.liCustomization').append($('.CustomMenu').html());

            /**************Capec******************/
            $('.csCapecLi').append('<ul id = "Capec-nav" class=" CapecNavUl nav-content collapse" data-bs-parent="#sidebar-nav" /> ')
            $.each(Capec_Rules, function (index, value) {
                $('.CapecNavUl').append('<li class="licapecmitrerule" ThreatType=' + value.ThreatType + '  id=' + value.Id + ' role="button"><a asp-area="" ><i class="bi bi-circle"></i><span class="spName">' + value.Name + '</span> </a></li>');
            });

            /**************mitre_enterprise-attack******************/
            $('.csMitreEnterpriseAttackLi').append('<ul id = "mitre_enterprise_attack_nav" class="mitre_enterprise_attack_Ul nav-content collapse" data-bs-parent="#sidebar-nav" /> ')
            $.each(Mitre_Enterprise_Attack_Rules, function (index, value) {
                $('.mitre_enterprise_attack_Ul').append('<li class="licapecmitrerule" ThreatType=' + value.ThreatType + '  id=' + value.Id + ' role="button"><a asp-area="" ><i class="bi bi-circle"></i><span class="spName">' + value.Name + '</span> </a></li>');
            });

            /**************mitre_ics_attack******************/
            $('.csMitreICSAttackLi').append('<ul id = "mitre_ics-attack-nav" class="mitre_ics_attack_Ul nav-content collapse" data-bs-parent="#sidebar-nav" /> ')
            $.each(Mitre_Ics_Attack_Rules, function (index, value) {
                $('.mitre_ics_attack_Ul').append('<li class="licapecmitrerule" ThreatType=' + value.ThreatType + '  id=' + value.Id + ' role="button"><a asp-area="" ><i class="bi bi-circle"></i><span class="spName">' + value.Name + '</span> </a></li>');
            });
            /**************mitre_mobile_attack******************/
            $('.csMitreMobileAttackLi').append('<ul id = "mitre_mobile-attack-nav" class="mitre_mobile_attack_Ul nav-content collapse" data-bs-parent="#sidebar-nav" /> ')
            $.each(Mitre_Mobile_Attack_Rules, function (index, value) {
                $('.mitre_mobile_attack_Ul').append('<li class="licapecmitrerule" ThreatType=' + value.ThreatType + '  id=' + value.Id + ' role="button"><a asp-area="" ><i class="bi bi-circle"></i><span class="spName">' + value.Name + '</span> </a></li>');
            });
            /**************mitre_pre_attack******************/
            $('.csMitrePreAttackLi').append('<ul id = "mitre_pre-attack-nav" class="mitre_pre_attack_Ul nav-content collapse" data-bs-parent="#sidebar-nav" /> ')
            $.each(Mitre_Pre_Attack_Rules, function (index, value) {
                $('.mitre_pre_attack_Ul').append('<li class="licapecmitrerule" ThreatType=' + value.ThreatType + '  id=' + value.Id + ' role="button"><a asp-area="" ><i class="bi bi-circle"></i><span class="spName">' + value.Name + '</span> </a></li>');
            });

            //$(".licapecmitrerule").draggable({
            //    helper: function () {
            //        return $("<div></div>").append($(this).find('.spName').clone());
            //    }
            //});
            //$('.droppable').droppable({
            //    drop: function (event, ui) {
            //      /*  console.log(ui.helper.prop("outerHTML"));*/
            //    }
            // })  ;



            //$(".licapecmitrerule").draggable({
            //    helper: "clone",
            //    cancel: false,
            //});
            //$('.droppable').droppable({
            //    drop: function (event, ui) {
            //        console.log(ui.helper.prop("outerHTML"));
            //    }
            // })  ;
        }
    }
   


}