var console = window.console || { log: function (value) { alert(value); } };

function isCacheEnabled(prevVersion) {    
        var iframe = document.createElement('iframe');
        iframe.setAttribute("width", "0");
        iframe.setAttribute("height", "0");
        iframe.setAttribute("frameborder", "0");
        iframe.src = "iframe-htmldetect.ashx";        
        var fn = function () {
            var iframeWindow = iframe.contentWindow || iframe.contentDocument.parentWindow;
            var doc = iframeWindow.document;
            var version = doc.firstChild.textContent || doc.firstChild.innerText;
            if (prevVersion === undefined && version != undefined) {
                isCacheEnabled(version);
            }
            else {
                console.log('cache:' + (prevVersion != version ? 'disabled (fresh)' : 'enabled (from cache)'));
            }
        };
        if (iframe.attachEvent) {
            iframe.attachEvent("onload", fn);
        }
        else {
            iframe.onload = fn;
        }
        document.body.appendChild(iframe);
}

isCacheEnabled();