var frmGlobal =
{
    Ids:
    {
        userToken: "userToken"
    },
    Ctrls:
    {
        PageTitle: '#PageTitle',
        DownloadTemplate: '#DownloadTemplate',
        DownloadSampleCode: '#DownloadSampleCode',
        DownloadUtilCode: '#DownloadUtilCode',
        DownloadLibCode: '#DownloadLibCode'
    },
    Events: {
        ShowDownloadLink: function () {
            $(frmGlobal.Ctrls.DownloadTemplate).show();
            //$(frmGlobal.Ctrls.DownloadSampleCode).attr("href", app_def.downloadSampleCode);
            //$(frmGlobal.Ctrls.DownloadUtilCode).attr("href", app_def.downloadUtilCode);
            $(frmGlobal.Ctrls.DownloadLibCode).attr("href", app_def.downloadLibCode);
        }
    }
}