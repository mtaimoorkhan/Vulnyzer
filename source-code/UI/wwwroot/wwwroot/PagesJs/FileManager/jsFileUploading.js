var fileUploading = {
    Res: null,
    Extensions: [],
    finished: false,
    Attributes: {
        SaveFileName: '',
        filename: '',
        ContentType: '',
        FileExtension: '',
        dataAttributes: [],
        fileInfo: null,
        dataObject: [],
    },
    Events: {
        UploadFile: function (e) { 
            if (e.target.files[0] != null) {
                if (e.handled == true) {
                    var fileInfo = e.target.files[0];
                    fileUploading.Attributes.fileInfo = fileInfo;
                    fileUploading.Attributes.filename = fileInfo.name.split('.')[0].replace(/ /g, '') + '' + parseInt(fileUploading.Events.GetUniqueID()) + "." + fileInfo.name.substr((fileInfo.name.lastIndexOf('.') + 1));
                    fileUploading.Attributes.ContentType = fileInfo.type;
                    fileUploading.Attributes.FileExtension = fileInfo.name.split('.').pop().toLowerCase();
                    fileUploading.Attributes.dataAttributes = [];
                    fileUploading.Attributes.dataObject = [];
                    var attrs = e.target.attributes;
                    for (var i = 0, len = attrs.length; i < len; i++) {
                        var attr = attrs[i];
                        if (attr.name.match(/^datac-/)) {
                            fileUploading.Attributes.dataAttributes.push({ "datakey": attr.name.replace("datac-", ""), "datavalue": attr.value });
                        } else if (attr.name.match(/^datao-/)) {
                            fileUploading.Attributes.dataObject.push({ "datakey": attr.name.replace("datao-", ""), "datavalue": attr.value });
                        }
                    }
                }
            }
        },
        myFunc: function (MultiUploadURL, UploadCompleteURL, frm) {
            MultiUploadURL = app_def.apiurl + "/api/" + MultiUploadURL;
            UploadCompleteURL = app_def.apiurl + "/api/" + UploadCompleteURL;
            var filename = fileUploading.Attributes.filename;
            var fileInfo = fileUploading.Attributes.fileInfo;
            var uploadCompleted = function () {
                debugger;
                frm.ReqData.Item.fileName = encodeURIComponent(filename);
                frm.ReqData.Item.complete = "1";
                frm.ReqData.Item.fileNameIOrignal = encodeURIComponent(fileUploading.Attributes.filename);
                frm.ReqData.Item.SourceFileName = encodeURIComponent(fileInfo.name);
                try {
                    $.ajax({
                        type: "post",
                        url: UploadCompleteURL,
                        data: JSON.stringify(frm.ReqData),
                        datatype: "json",
                        contentType: "application/json",
                        success: function (data) {
                            fileUploading.Res = JSON.parse(data);
                            frm.FileUploaded(fileUploading);
                            progressBarUpdate(100);
                            progressBarComplete();
                        }
                    });
                } catch (e) {
                    var k = e;
                }
            }
            var multiUpload = function (count, counter, blob, completed, start, end, bytesPerChunk) {
                try {
                    counter = counter + 1;
                    if (counter <= count) {
                        var chunk = blob.slice(start, end);
                        var xhr = new XMLHttpRequest();
                        xhr.onload = function () {
                            start = end;
                            end = start + bytesPerChunk;
                            if (count == counter) {
                                uploadCompleted();
                            } else {
                                var percentage = (counter / count) * 100;
                                progressBarUpdate(Math.floor(percentage));
                                multiUpload(count, counter, blob, completed, start, end, bytesPerChunk)
                            }
                        }
                        xhr.open("POST", "" + MultiUploadURL + "?id=" + counter.toString() + "&fileName=" + escape(filename));
                        xhr.send(chunk);
                    }
                } catch (e) {

                }
            }
            if (!fileUploading.Events.fnCheckExtention(fileInfo)) {
                return false;
            }
            var progressBarStart = function () {
                $('.percent').html("0" + "%");
                $(".percent").width("0" + "%");
                $(".progress").show();
            }
            var progressBarUpdate = function (percentage) {
                $('.percent').html(percentage.toString() + "%");
                $(".percent").width(percentage.toString() + "%");
            }
            var progressBarComplete = function () {
                $(".progress").fadeOut(2000);
            }
            var file = fileInfo;
            if (file != undefined && file != null && file.name != '') {
                event.preventDefault();
                var blob = file;
                var bytesPerChunk = 3757000;
                size = blob.size;
                var start = 0;
                var end = bytesPerChunk;
                var completed = 0;
                var count = size % bytesPerChunk == 0 ? size / bytesPerChunk : Math.floor(size / bytesPerChunk) + 1;
                if (count == 0) {
                    count = 1;
                }
                var counter = 0;
                progressBarStart();
                multiUpload(count, counter, blob, completed, start, end, bytesPerChunk);
            }
        },
        fnCheckExtention: function (name) {
            if (fileUploading.Extensions != null && fileUploading.Extensions.length > 0) {
                var ext = name.name.split('.').pop().toLowerCase();
                if ($.inArray(ext, fileUploading.Extensions) == -1) {
                    Swal.fire({
                        type: 'warning',
                        title: "<i>Invalid Extension</i>",
                        html: "Please check your file Extension!",
                        confirmButtonText: "<u>Okay</u>",
                    });
                    return false;
                }
                else {
                    return true;
                }
            }
            return true;
        },
        GetUniqueID: function () {
            return parseInt(Math.floor(10000000 + Math.random() * 99999999 * Math.random()));
        }
    }
}