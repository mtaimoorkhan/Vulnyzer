$(function () {
    frmExportErrorCount.Events.Init();
});
var frmExportErrorCount =
{
    ReqData: null,
    mExtentions: ['java', 'zip', '7z'],
    IDs: {
        FileUploadChange: '',
        AppWiseErrorCountDataList: [],
    },
    URLs: null,
    Ctrls:
    {
        btn_AnalyseDemoFiles: '#btn_AnalyseDemoFiles',
        TextArea_HelloJava: '#TextArea_HelloJava',
        TextArea_ResourcesJava: '#TextArea_ResourcesJava',
        TextArea_PointersJava: '#TextArea_PointersJava',
        Res: '#Res',
        
    },
    Events:
    {
        Init: function () {

            frmExportErrorCount.URLs =
            {
                fnGetExportErrorCountFormData: 'PMD/fnGetExportErrorCountFormData',
                fnLoadErrorCounts: 'PMD/fnLoadErrorCounts',
                fnGenerateCSV: 'PMD/fnGenerateCSV'
            }
            frmExportErrorCount.Events.fnGetExportErrorCountFormData();

            $('#chkbxAll').click(function () {
                $(".cbxApp").prop('checked', $(this).prop("checked"));

                if ($(this).is(':checked')) {

                }
            });

            $("#btnLoadErrorCounts").click(function () {
                frmExportErrorCount.Events.LoadErrorCounts();
            });

            $("#btnGenerateCSVFile").click(function () {
                frmExportErrorCount.Events.GenerateCSVFile();
            });
        },
        

        fnGetExportErrorCountFormData: function (obj) {
            let PMDApplicationDTO = {};
            let JReq = {
                Item: PMDApplicationDTO
            };
            let HttpRequestBody = Requestbody;
            HttpRequestBody.Data = JReq;
            HttpRequestBody.MethodURL = frmExportErrorCount.URLs.fnGetExportErrorCountFormData;
            HttpRequestBody.CallBackFunction = frmExportErrorCount.Events.GetExportErrorCountFormDataCallBack;
            HttpRequestBody.isCallBack = true;
            HttpRequestBody.ShowLoader = true;
            jsonRequest.postRequest(HttpRequestBody);
        },
        GetExportErrorCountFormDataCallBack: function (obj) {
            let appData = obj.resultdata.resultData;
            $.each(appData, function (key, value) {
                var chbAppHtml = "";
                chbAppHtml += '<div class="dvCbxApp">'
                chbAppHtml += '<input type="checkbox" class="cbxApp" id="' + value.Id + '" ></input>'
                chbAppHtml += '<label class="ms-2" for="' + value.Id + '" style="cursor:pointer;">'
                chbAppHtml += '<b>' + value.PMDApplicationName + '</b>'
                chbAppHtml += '</label>'
                chbAppHtml += '</div>'
                $("#dvCbxAppParent").append(chbAppHtml);
            });
        },
        LoadErrorCounts: function () {
            let SelectedApps = [];
            let isAnyRecord = false;
            $(".cbxApp").each(function () {
                if ($(this).is(":checked")) {
                    let objPMDApplicationDTO = {};
                    objPMDApplicationDTO.Id = $(this).attr('id').toString();
                    SelectedApps.push(objPMDApplicationDTO);
                    isAnyRecord = true;
                }
            });
            if (isAnyRecord == true) {
                let PMDApplicationDTOContainer = {};
                PMDApplicationDTOContainer.AppKeys = SelectedApps;
                let JReq =
                {
                    Item: PMDApplicationDTOContainer,
                };
                let HttpRequestBody = Requestbody;
                HttpRequestBody.Data = JReq;
                HttpRequestBody.MethodURL = frmExportErrorCount.URLs.fnLoadErrorCounts;
                HttpRequestBody.CallBackFunction = frmExportErrorCount.Events.LoadErrorCountsCallBack;
                HttpRequestBody.isCallBack = true;
                HttpRequestBody.ShowLoader = true;
                jsonRequest.postRequest(HttpRequestBody);
            }
        },
        LoadErrorCountsCallBack: function (obj) {
            $("#dvErrorCountStix").empty();
            frmExportErrorCount.IDs.AppWiseErrorCountDataList = [];
            let errorCountData = obj.resultdata.resultData;
            frmExportErrorCount.IDs.AppWiseErrorCountDataList = errorCountData;
            let uniqueApps = errorCountData.map(item => item.PMDApplicationId).filter((value, index, self) => self.indexOf(value) === index)
            $.each(uniqueApps, function (appIndx, appValue) {
                let appData = errorCountData.find((f) => f.PMDApplicationId === appValue)
                var dvAppHtml = "";
                dvAppHtml += '<div class="row" >'
                dvAppHtml += '<div class="col-8" >'
                dvAppHtml += '<label class="ms-2" >'
                dvAppHtml += '<b>' + appData.PMDApplicationName + '</b>'
                dvAppHtml += '</label>'
                dvAppHtml += '</div>'
                dvAppHtml += '<div class="col-4" >'
                dvAppHtml += '<label class="ms-2" >'
                dvAppHtml += '<b>' + appData.AppErrorCount + '</b>'
                dvAppHtml += '</label>'
                dvAppHtml += '</div>'
                dvAppHtml += '</div>'
                $("#dvErrorCountStix").append(dvAppHtml);
                $.each(errorCountData, function (key, value) {
                    if (appValue === value.PMDApplicationId) {
                        var dvErrorCountStixHtml = "";
                        dvErrorCountStixHtml += '<div class="row" >'
                        dvErrorCountStixHtml += '<div class="col-8" >'
                        dvErrorCountStixHtml += '<label class="ms-2" >' + value.StixKey + '</label>'
                        dvErrorCountStixHtml += '</div>'
                        dvErrorCountStixHtml += '<div class="col-4" >'
                        dvErrorCountStixHtml += '<label class="ms-2" >' + value.ErrorCount + '</label>'
                        dvErrorCountStixHtml += '</div>'
                        dvErrorCountStixHtml += '</div>'
                        $("#dvErrorCountStix").append(dvErrorCountStixHtml);
                    }
                });
            });
        },
        GenerateCSVFile: function (obj) {
            let SelectedApps = [];
            let isAnyRecord = false;
            $(".cbxApp").each(function () {
                if ($(this).is(":checked")) {
                    let objPMDApplicationDTO = {};
                    objPMDApplicationDTO.Id = $(this).attr('id').toString();
                    SelectedApps.push(objPMDApplicationDTO);
                    isAnyRecord = true;
                }
            });
            if (isAnyRecord == true) {
                let PMDApplicationDTOContainer = {};
                PMDApplicationDTOContainer.AppKeys = SelectedApps;
                let JReq =
                {
                    Item: PMDApplicationDTOContainer,
                };
                let HttpRequestBody = Requestbody;
                HttpRequestBody.Data = JReq;
                HttpRequestBody.MethodURL = frmExportErrorCount.URLs.fnGenerateCSV;
                HttpRequestBody.CallBackFunction = frmExportErrorCount.Events.GenerateCSVCallBack;
                HttpRequestBody.isCallBack = true;
                HttpRequestBody.ShowLoader = true;               
                jsonRequest.postRequest(HttpRequestBody);
            }
        },
        GenerateCSVCallBack: function (obj) {
            var data = obj.objectData;
            const keys = Object.keys(data[0]);
            const commaSeparatedString = [keys.join(","), data.map(row => keys.map(key => row[key]).join(",")).join("\n")].join("\n");
            const blob = new Blob([commaSeparatedString]);
            var downloadUrl = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = downloadUrl;
            a.download = "data.csv";
            document.body.appendChild(a);
            a.click();
        }
    },
}