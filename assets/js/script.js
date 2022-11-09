function download() {
    var url = document.getElementById("url").value;
    var format = document.getElementById("format").value;
    var quality = document.getElementById("quality").value;
    var file = document.getElementById("file").value;
    var filename = document.getElementById("filename").value;
    var url = "download.php?url=" + url + "&format=" + format + "&quality=" + quality + "&file=" + file + "&filename=" + filename;
    window.location.href = url;
}

function copy() {
    var copyText = document.getElementById("copyText");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

