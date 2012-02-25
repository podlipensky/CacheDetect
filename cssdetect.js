var console = window.console || { log: function (value) { alert(value); } };

function isCacheEnabled() {
    //create div
    var div = document.createElement('div');
    div.setAttribute("class", "cachedetect");
    div.setAttribute("style", "position: absolute; top: -10000; left: -10000;");
    document.body.appendChild(div);
    //cache div's width
    var w = div.offsetWidth;
    // request the same cachedetect.js by adding <script> tag dynamically to <header>
    var head = document.getElementsByTagName("head")[0];
    //find existing stylesheet and remove it (trying to force IE to reload the resource for second time)
    links = head.getElementsByTagName('link');
    var len = links.length;
    for (var i = 0; i < len; i++) {
        if (/cssdetect.ashx$/.test(links[i].href)) {
            head.removeChild(links[i]);
            break;
        }
    }
    var newStylesheetIndex = document.styleSheets.length;
    var cssLoadedCallback = function () { //store div and its current width in the closure
        console.log('cache: ' + (w != div.offsetWidth ? 'disabled (fresh)' : 'enabled (from cache)'));
    };
    var link = document.createElement('link');
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "cssdetect.ashx";
    link.onload = cssLoadedCallback;
    link.onreadystatechange = function () { if (this.readyState == 'loaded' || this.readyState == 'complete') cssLoadedCallback(); }
    head.appendChild(link);
    runCallbackForStylesheet(newStylesheetIndex, cssLoadedCallback);
}

function runCallbackForStylesheet(index, callback) {//watch for the moment when requested css file is loaded
    try {
        if (document.styleSheets[index].cssRules) {//FF and Safari support
            callback();
        } else {
            if (document.styleSheets[index].rules && document.styleSheets[index].rules.length) {
                callback();
            } else {
                setTimeout(function () {
                    runCallbackForStylesheet(index);
                }, 250);
            }
        }
    }
    catch (e) {
        setTimeout(function () {
            runCallbackForStylesheet(index);
        }, 250);
    }
}

isCacheEnabled();