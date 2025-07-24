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
        ObjectData: {},
        isDataLoaded: false,
        DeletedId: 0,
        EditId: 0,
        isEditMode:false

    },
    URLs: null,
    Ctrls:
    {
        btnSaveCustomRule: '#btnSaveCustomRule',
        CustRuleName: '#CustRuleName',
        btnAddCustomRule:'#btnAddCustomRule'
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
                fnTestDb: 'PMD/fnTestDb',
                fnGetCapecMitreRule: 'PMD/fnGetCapecMitreRule',
                fnSaveCustomizedRule: 'PMD/fnSaveCustomizedRule',
                fnGetPmdView: 'PMD/fnGetPmdView',
                fnDeletePmdView: 'PMD/fnDeletePmdView',
                fnGetPmdViewSingle: 'PMD/fnGetPmdViewSingle',
                fnUpdatePmdView: 'PMD/fnUpdatePmdView',
                fnGetCapecRuleSingle:'PMD/fnGetCapecRuleSingle'


            }

            $('.cdropCapec').delegate('.customrulelnk', "click", function ()
            {
                let Id = $(this).attr('id');
                let ThreatType = $(this).attr('ThreatType');

                let DataCarrier = {};
                DataCarrier.Id = Id;
                DataCarrier.Type = ThreatType;


                let JReq = {
                    Item: DataCarrier

                };
                let HttpRequestBody = Requestbody;
                HttpRequestBody.Data = JReq;
                HttpRequestBody.MethodURL = frmCustomisation.URLs.fnGetCapecRuleSingle;
                HttpRequestBody.CallBackFunction = frmCustomisation.Events.fnGetCapecRuleSingleCallBack;
                HttpRequestBody.isCallBack = true;
                HttpRequestBody.ShowLoader = true;
                jsonRequest.postRequest(HttpRequestBody);


              /****************

                if (ThreatType == 'Capec') {
                    let Capec_Rules = frmCustomisation.IDs.ObjectData.Capec_Rules;

                    var obj = Capec_Rules.filter(function (item) {
                        return item.Id == Id;
                    });

                    console.log(obj);
                  
                    if (obj != null && obj.length == 1)
                    {
                        $('#CustRuleName1').val(obj[0].Name);
                        $('#CustRuleId').val(obj[0].Id);
                        $('#CustRuleLink').attr("href", obj[0].Link);
                        $('#CustRuleLink').text(obj[0].Link);
                        $('#CustRuleDescription').val(obj[0].Description);
                        $('#CustRuleSourceId').val(obj[0].SourceId);
                        $('#CustRuleSource').val(obj[0].Source);
                        $('#btnModel2').click();
                    }
                }

                if (ThreatType == 'Mitre_Enterprise_Attack') {
                    let _Rules = frmCustomisation.IDs.ObjectData.Mitre_Enterprise_Attack_Rules;

                    var obj = _Rules.filter(function (item) {
                        return item.Id == Id;
                    });

                    if (obj != null && obj.length == 1) {
                        $('#CustRuleName1').val(obj[0].Name);
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
                        $('#CustRuleName1').val(obj[0].Name);
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
                        $('#CustRuleName1').val(obj[0].Name);
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
                        $('#CustRuleName1').val(obj[0].Name);
                        $('#CustRuleId').val(obj[0].Id);
                        $('#CustRuleLink').attr("href", obj[0].Link);
                        $('#CustRuleLink').text(obj[0].Link);
                        $('#CustRuleDescription').val(obj[0].Description);
                        $('#CustRuleSourceId').val(obj[0].SourceId);
                        $('#CustRuleSource').val(obj[0].Source);
                        $('#btnModel2').click();
                    }
                }
                ***************/
            });




            $(frmCustomisation.Ctrls.btnAddCustomRule).click(function ()
            {
                $('.cdropCapec').html('');
                $(frmCustomisation.Ctrls.CustRuleName).val('');
                frmCustomisation.IDs.isEditMode = false;
                frmCustomisation.IDs.EditId = 0;

                frmCustomisation.Events.GetCapecMitreRule();
            });

            $(frmCustomisation.Ctrls.btnSaveCustomRule).click(function ()
            {

                let RuleName = $(frmCustomisation.Ctrls.CustRuleName).val();
                let isError = false;

               

                let RuleCounter = 0; 
                let CustomCapecMitreRule = {};
                let _Rules = [];

                $('.cdropCapec').find('.customrulelnk ').each(function ()
                {
                    let Id = $(this).attr('id');
                    let ThreatType = $(this).attr('threattype');

                    let CapecMitreRuleDetail = {};
                    CapecMitreRuleDetail.Id = Id;
                    CapecMitreRuleDetail.ThreatType = ThreatType;
                    _Rules.push(CapecMitreRuleDetail);
                    RuleCounter = parseInt(RuleCounter) + 1;

                });

                if (RuleName == '') {
                    isError = true;

                    Swal.fire({
                        title: "Name is missing!",
                        text: "Name is missing!",
                        icon: "error"
                    });
                }

                if (parseInt(RuleCounter) == 0) {
                    isError = true;

                    Swal.fire({
                        title: "Rule is missing! Click on rule",
                        text: "Rule is missing!  Click on rule",
                        icon: "error"
                    });
                }

                if (isError == false)
                {
                    CustomCapecMitreRule._Rules = _Rules;
                    CustomCapecMitreRule.Name = $(frmCustomisation.Ctrls.CustRuleName).val();
                    CustomCapecMitreRule.Id = frmCustomisation.IDs.EditId;
                    CustomCapecMitreRule.isEditMode= frmCustomisation.IDs.isEditMode;


                    let JReq = {
                        Item: CustomCapecMitreRule

                    };
                    let vurl = frmCustomisation.URLs.fnSaveCustomizedRule;
                    if (frmCustomisation.IDs.isEditMode == true)
                    {
                        vurl = frmCustomisation.URLs.fnUpdatePmdView
                    }

                    let HttpRequestBody = Requestbody;
                    HttpRequestBody.Data = JReq;
                    HttpRequestBody.MethodURL = vurl;
                    HttpRequestBody.CallBackFunction = frmCustomisation.Events.fnSaveCustomizedRuleCallBack;
                    HttpRequestBody.isCallBack = true;
                    HttpRequestBody.ShowLoader = true;
                    jsonRequest.postRequest(HttpRequestBody);
                }
                            

            });

            $(document).delegate('.btnEditCustRule', "click", function ()
            {
                $('.cdropCapec').html('');
                $(frmCustomisation.Ctrls.CustRuleName).val('');
                frmCustomisation.IDs.isEditMode = true;

                let Id = $(this).attr('Id');
                frmCustomisation.IDs.EditId = Id;
                frmCustomisation.Events.EditPmdView(Id);
            });

            $(document).delegate('.btnDelCustRule', "click", function () {
                 

                    let Id = $(this).attr('Id');
                    frmCustomisation.IDs.DeletedId = Id;

                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) =>
                    {
                        if (result.isConfirmed)
                        {
                            frmCustomisation.Events.DeletePmdView(frmCustomisation.IDs.DeletedId);
                        }
                    });



            });


            $('.cdropCapec').delegate('.delruletemp', "click", function ()
            {
                $(this).parent().remove();
            });


            $(document).delegate('.licapecmitrerulem', "click", function ()
            {
                let Id = $(this).attr('id');
                let ThreatType = $(this).attr('ThreatType');
                let Name = $(this).find('.spName').text();
                let isRecordAlreadyExisting = false;
                if ($(".cdropCapec .customrulelnk").length > 0) {
                    var $customRuleLinks = $(".cdropCapec .customrulelnk");
                    $customRuleLinks.each(function (ind, element) {
                        if ($(element).attr("id") == Id) {
                            isRecordAlreadyExisting = true;
                        }
                    });
                }
                if (!isRecordAlreadyExisting) {
                    $('.cdropCapec').append('<p class="mt-2">  <a role="button" class="ms-2 customrulelnk link-opacity-10" ThreatType=' + ThreatType + ' id=' + Id + ' ><img src="/assets/images/threat1.png" width="20" height="20" style="padding-right:5px;padding-bottom:5px" />' + Name + ' </a>  <img class="ms-3 delruletemp" role="button" src="/assets/images/delete.png" width="20" height="20" /></p>');
                }
            });

          
          //  frmCustomisation.Events.TestDB();
            frmCustomisation.Events.GetPmdViews();
        },

        fnGetCapecRuleSingleCallBack: function (obj)
        {
           if (obj != null )
            {
                $('#CustRuleName1').val(obj.Name);
                $('#CustRuleId').val(obj.Id);
                $('#CustRuleLink').attr("href", obj.Link);
                $('#CustRuleLink').text(obj.Link);
                $('#CustRuleDescription').val(obj.Description);
                $('#CustRuleSourceId').val(obj.SourceId);
                $('#CustRuleSource').val(obj.Source);
               /* $('#btnModel2').click();*/


               let myModal = new bootstrap.Modal(document.getElementById('exampleModal23'), {});
               myModal.show();
            }
        },
        fnSaveCustomizedRuleCallBack: function (obj)
        {
            $('#btnSaveCustomRuleCancel').click();

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 1500
            });


            frmCustomisation.Events.GetPmdViews();

        },

        GetPmdViews: function (obj)
        {

            let DataCarrier = {};
            DataCarrier.Id = '1';
             

            let JReq = {
                Item: DataCarrier

            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;
            HttpRequestBody.MethodURL = frmCustomisation.URLs.fnGetPmdView;
            HttpRequestBody.CallBackFunction = frmCustomisation.Events.GetPmdViewsCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },
        GetPmdViewsCallBack: function (obj)
        {
            // https://live.datatables.net/yaganalo/2/edit

          

            //if ($.fn.DataTable.isDataTable("#pmdDataTable"))
            //{

            //    $('#pmdDataTable').DataTable().clear().destroy();
            //}

                        
            //new DataTable('#pmdDataTable').destroy();
            //$("#pmdDataTable > tbody").html('');
            
            try {
                $('#pmdDataTable').dataTable().fnDestroy();
                $('#pmdDataTable' + " > tbody").empty();
            } catch (e) {

            }


            let PmdData = obj.resultdata.resultData;  // pmdDataTable

          
            $.each(PmdData, function (key, value)
            {
                $("#pmdDataTable > tbody").append("<tr><td>" + value.Id + "</td><td>" + value.PmdViewsName + "</td><td>" + value.CreatedDate + "</td><td>" + "<button type='button' id=" + value.Id + " class='btnDelCustRule btn-sm btn btn-danger'>Delete</button>" + "<button type='button' id=" + value.Id + " class='ms-2 btnEditCustRule btn-sm btn btn-warning'>Edit</button>" +"</td></tr>");

            });

        let table = new DataTable('#pmdDataTable', {
                columnDefs: [
                    {
                        target: 0,
                        visible: false,
                        searchable: false
                    } 
                ]
            });
          
            //table.on('click', '.btnDelCustRule', function (e)
            //{
            //    let data = table.row(e.target.closest('tr')).data();

            //    console.log('Table Draw');
            //    console.log(data);

            //    let Id = data[0];
            //    frmCustomisation.IDs.DeletedId = Id;

            //    Swal.fire({
            //        title: "Are you sure?",
            //        text: "You won't be able to revert this!",
            //        icon: "warning",
            //        showCancelButton: true,
            //        confirmButtonColor: "#3085d6",
            //        cancelButtonColor: "#d33",
            //        confirmButtonText: "Yes, delete it!"
            //    }).then((result) =>
            //    {
            //        if (result.isConfirmed)
            //        {
            //            frmCustomisation.Events.DeletePmdView(frmCustomisation.IDs.DeletedId);
            //        }
            //    });

            //});
             

        },

        EditPmdView: function (Id) {
           
            let DataCarrier = {};
            DataCarrier.Id = Id;
            let JReq = {
                Item: DataCarrier

            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;
            HttpRequestBody.MethodURL = frmCustomisation.URLs.fnGetPmdViewSingle;
            HttpRequestBody.CallBackFunction = frmCustomisation.Events.EditPmdViewCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },
        EditPmdViewCallBack: function (obj)
        {
         
            let detail = obj.objectData;
            let ddata = obj.resultdata.resultData[0];

            if (detail != null && detail.length > 0)
            {
                
                $.each(detail, function (index, val)
                {
                   
                    $('.cdropCapec').append('<p class="mt-2">  <img src="/assets/images/threat1.png" width="20" height="20" /><a role="button" class="ms-2 customrulelnk link-opacity-10" ThreatType=' + val.ThreatType + ' id=' + val.Id + ' >' + val.Name + ' </a>  <img class="ms-3 delruletemp" role="button" src="/assets/images/delete.png" width="20" height="20" /></p>');

                });
            }


            $('#btnEditCustomRule').click();
            $(frmCustomisation.Ctrls.CustRuleName).val(ddata.PmdViewsName);

            frmCustomisation.Events.GetCapecMitreRule();
        },
        DeletePmdView: function (Id)
        {
            frmCustomisation.IDs.DeletedId = 0;
            let DataCarrier = {};
            DataCarrier.Id = Id;
            let JReq = {
                Item: DataCarrier

            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;
            HttpRequestBody.MethodURL = frmCustomisation.URLs.fnDeletePmdView;
            HttpRequestBody.CallBackFunction = frmCustomisation.Events.DeletePmdViewCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);

        },
        DeletePmdViewCallBack: function (Id)
        {
            //Swal.fire({
            //    title: "Deleted!",
            //    text: "Your data has been deleted.",
            //    icon: "success"
            //});

            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Your data has been deleted",
                showConfirmButton: false,
                timer: 1500
            });
        //   location.reload();
            frmCustomisation.Events.GetPmdViews();
        },

        GetCapecMitreRule: function ()
        {

            if (frmCustomisation.IDs.isDataLoaded == false)
            {
                frmCustomisation.IDs.isDataLoaded = true;
                let PMDDemo = {};

                let JReq = {
                    Item: PMDDemo

                };
                let HttpRequestBody = Requestbody;
                HttpRequestBody.Data = JReq;
                HttpRequestBody.MethodURL = frmCustomisation.URLs.fnGetCapecMitreRule;
                HttpRequestBody.CallBackFunction = frmCustomisation.Events.GetCapecMitreRuleCallBack;
                HttpRequestBody.isCallBack = true;
                HttpRequestBody.ShowLoader = true;
                jsonRequest.postRequest(HttpRequestBody);
            }

                      

        },
        GetCapecMitreRuleCallBack: function (obj)
        {
            let _CapecMitreRule = obj._CapecMitreRule;
            frmCustomisation.IDs.ObjectData = _CapecMitreRule;
            let Capec_Rules = _CapecMitreRule.Capec_Rules;
            let Mitre_Enterprise_Attack_Rules = _CapecMitreRule.Mitre_Enterprise_Attack_Rules;
            let Mitre_Ics_Attack_Rules = _CapecMitreRule.Mitre_Ics_Attack_Rules;
            let Mitre_Mobile_Attack_Rules = _CapecMitreRule.Mitre_Mobile_Attack_Rules;
            let Mitre_Pre_Attack_Rules = _CapecMitreRule.Mitre_Pre_Attack_Rules;

            

             

            /**************Capec******************/
            $('.csCapecLi').append('<ul id = "Capec-nav" class=" CapecNavUl nav-content collapse" data-bs-parent="#sidebar-nav" /> ')
            $.each(Capec_Rules, function (index, value) {
                $('.CapecNavUl').append('<li class="licapecmitrerulem" ThreatType=' + value.ThreatType + '  id=' + value.Id + ' role="button"><a asp-area="" ><i class="bi bi-circle"></i><span class="spName">' + value.Name + '</span> </a></li>');
            });

            /**************mitre_enterprise-attack******************/
            $('.csMitreEnterpriseAttackLi').append('<ul id = "mitre_enterprise_attack_nav" class="mitre_enterprise_attack_Ul nav-content collapse" data-bs-parent="#sidebar-nav" /> ')
            $.each(Mitre_Enterprise_Attack_Rules, function (index, value) {
                $('.mitre_enterprise_attack_Ul').append('<li class="licapecmitrerulem" ThreatType=' + value.ThreatType + '  id=' + value.Id + ' role="button"><a asp-area="" ><i class="bi bi-circle"></i><span class="spName">' + value.Name + '</span> </a></li>');
            });

            /**************mitre_ics_attack******************/
            $('.csMitreICSAttackLi').append('<ul id = "mitre_ics-attack-nav" class="mitre_ics_attack_Ul nav-content collapse" data-bs-parent="#sidebar-nav" /> ')
            $.each(Mitre_Ics_Attack_Rules, function (index, value) {
                $('.mitre_ics_attack_Ul').append('<li class="licapecmitrerulem" ThreatType=' + value.ThreatType + '  id=' + value.Id + ' role="button"><a asp-area="" ><i class="bi bi-circle"></i><span class="spName">' + value.Name + '</span> </a></li>');
            });
            /**************mitre_mobile_attack******************/
            $('.csMitreMobileAttackLi').append('<ul id = "mitre_mobile-attack-nav" class="mitre_mobile_attack_Ul nav-content collapse" data-bs-parent="#sidebar-nav" /> ')
            $.each(Mitre_Mobile_Attack_Rules, function (index, value) {
                $('.mitre_mobile_attack_Ul').append('<li class="licapecmitrerulem" ThreatType=' + value.ThreatType + '  id=' + value.Id + ' role="button"><a asp-area="" ><i class="bi bi-circle"></i><span class="spName">' + value.Name + '</span> </a></li>');
            });
            /**************mitre_pre_attack******************/
            $('.csMitrePreAttackLi').append('<ul id = "mitre_pre-attack-nav" class="mitre_pre_attack_Ul nav-content collapse" data-bs-parent="#sidebar-nav" /> ')
            $.each(Mitre_Pre_Attack_Rules, function (index, value) {
                $('.mitre_pre_attack_Ul').append('<li class="licapecmitrerulem" ThreatType=' + value.ThreatType + '  id=' + value.Id + ' role="button"><a asp-area="" ><i class="bi bi-circle"></i><span class="spName">' + value.Name + '</span> </a></li>');
            });

        },
        TestDBCallBack: function (obj)
        {
            console.log('TestDBCallBack');
            console.log(obj);
        },
        TestDB: function (obj)
        {
          
            let CustomData1 = {};
            CustomData1.Data1 = "Data1";
            CustomData1.Data2 = "Data2";

            let CustomData = {};
            CustomData._FileDetail = CustomData1;
            alert('ttpp');

            let JReq = {
                Item: CustomData
                //,
                //AuthUserReq:
                //{
                //    UserKey: 'UserKey',
                //    Authtoken: 'Authtoken',
                //    ClientKey: 'ClientKey',
                //    CompanyKey: 'CompanyKey',
                //}

                

            };
         
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;
            HttpRequestBody.MethodURL = frmCustomisation.URLs.fnTestDb;
            HttpRequestBody.CallBackFunction = frmCustomisation.Events.TestDBCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);
        },
        GetCapecMitreRuleDetailCallBack: function (obj) {


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


        }
       
    }



}