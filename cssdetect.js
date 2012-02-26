var console = window.console || { log: function (value) { alert(value); } };

function isCacheEnabled() {
    //create div
    var div = document.createElement('div');
    div.setAttribute("class", "cachedetect");
    div.setAttribute("style", "position: absolute; top: -10000px; left: -10000px;");
    document.body.appendChild(div);    

    appendStylesheet(div);
}

function appendStylesheet(div, w) {
    var head = document.getElementsByTagName("head")[0];
    var newStylesheetIndex = document.styleSheets.length;
    var reported = false; //ensure we execute callback only once
    var cssLoadedCallback = function () { //store div and its current width in the closure
        if (w === undefined) {//if this is a first stylesheet - measure width and load the second one
            w = div.offsetWidth;
            appendStylesheet(div, w);
        }
        else if (!reported) {
            console.log('cache: ' + (w != div.offsetWidth ? 'disabled (fresh)' : 'enabled (from cache)'));
        }
        reported = true;
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
            setTimeout(function () {
                callback();
            }, 250); //give browser a chance to apply styles
        } else {
            if (document.styleSheets[index].rules && document.styleSheets[index].rules.length) {
                callback();
            } else {
                setTimeout(function () {
                    runCallbackForStylesheet(index, callback);
                }, 250);
            }
        }
    }
    catch (e) {
        setTimeout(function () {
            runCallbackForStylesheet(index, callback);
        }, 250);
    }
}

isCacheEnabled();