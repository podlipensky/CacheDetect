//var version = [incrementally generated number here];
var cloneCallback;//function which will compare versions from two javascript files
var console = window.console || { log: function (value) { alert(value); } };
function isCacheEnabled() {
    if (!window.cloneCallback) {
        var currentVersion = version; //cache current version of the file
	   // request the same cachedetect.js by adding <script> tag dynamically to <header>
	   var head = document.getElementsByTagName("head")[0];
	   var script = document.createElement('script');
	   script.type = 'text/javascript';
	   script.src = "jsdetect.ashx";
       // newly loaded cachedetect.js will execute the same function isCacheEnabled, so we need to prevent it from loading the script for third time by checking for cloneCallback existence
	   cloneCallback = function () {
	       // once file will be loaded, version variable will contain different from currentVersion value in case when cache is disabled 
	       console.log('cache:' + (currentVersion != window.version ? 'disabled (fresh)' : 'enabled (from cache)'));
	   };
	   head.appendChild(script);
	}  else {
		window.cloneCallback();
	}
}

isCacheEnabled();