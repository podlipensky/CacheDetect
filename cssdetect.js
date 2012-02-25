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
    //find existing stylesheet and remove it
    links = head.getElementsByTagName('link');
    var len = links.length;
    for (var i = 0; i < len; i++) {
        if (/cssdetect.ashx$/.test(links[i].href)) {
            head.removeChild(links[i]);
            break;
        }
    }
        
    var link = document.createElement('link');
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = "cssdetect.ashx";
    head.appendChild(link);

    window.setTimeout(function () {
        console.log('cache: ' + (w != div.offsetWidth ? 'disabled (fresh)' : 'enabled (from cache)'));
    }, 1000);
}

isCacheEnabled();