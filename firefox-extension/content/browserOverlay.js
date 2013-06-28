/**
 * XULSchoolChrome namespace.
 */
if ("undefined" == typeof(XULSchoolChrome)) {
  var XULSchoolChrome = {};
};

/**
 * Controls the browser overlay for the Hello World extension.
 */
XULSchoolChrome.BrowserOverlay = {
  /**
   * Says 'Hello' to the FreeDNS underworld.
   */
  sayHello : function(aEvent) {
    let stringBundle = document.getElementById("xulschoolhello-string-bundle");
    var message = stringBundle.getString("xulschoolhello.greeting.label");
	var message2 = "You are no longer connected to FreeDNS";
	// set about:config to proxy dns reqs
	// Get the "accessibility." branch
	var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService).getBranch("network.proxy.");
	// prefs is an nsIPrefBranch.
	// Look in the above section for examples of getting one.
	var value = prefs.getIntPref("type"); // get a pref (accessibility.typeaheadfind)
	if(value != 1){
		prefs.setIntPref("type", 1); // set a pref (accessibility.typeaheadfind)
	}else{
		prefs.setIntPref("type", 5); // set a pref (accessibility.typeaheadfind)
	}
	
	prefs.setBoolPref("socks_remote_dns", 1); // set a pref (accessibility.typeaheadfind)
	prefs.setIntPref("socks_port", 1080);
	prefs.setIntPref("socks_version", 4);
	prefs.setCharPref("socks", "128.36.231.74");
    var rightPanel = document.getElementById('right-panel');
	if(value != 1){
		window.alert(message);
		rightPanel.label = "Connected to FreeDNS";
		//myFunction();
	}else{
		window.alert(message2);
		rightPanel.label = "Disconnected from FreeDNS";
	}
  }
  
  /**
   * Says 'Goodbye' to the FreeDNS underworld.
   */
   /*
  sayGoodbye : function(aEvent) {
    
	let stringBundle = document.getElementById("xulschoolhello-string-bundle");
    //let message = "FreeDNS access has been disabled...";
	
	// set about:config to proxy dns reqs
	// Get the "accessibility." branch
	var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService).getBranch("network.proxy.");
	// prefs is an nsIPrefBranch.
	// Look in the above section for examples of getting one.
	//var value = prefs.getBoolPref("socks_remote_dns"); // get a pref (accessibility.typeaheadfind)
	prefs.setBoolPref("socks_remote_dns", 0); // set a pref (accessibility.typeaheadfind)	
	prefs.setIntPref("type", 5); // set a pref (accessibility.typeaheadfind)
	prefs.setIntPref("socks_port", 0);
	prefs.setIntPref("socks_version", 5);
	prefs.setCharPref("socks", "");
   
	window.alert("message");
  }
   */
  
};


  function myFunction()
	{
		var newURL = window.top.getBrowser().selectedBrowser.contentWindow.location.href;
		var samplePanel = document.getElementById('status-bar-sample-1');
		// alert("Hello World! \n\n" + newURL + " \n\n" + Sha1.hash(newURL));
		var shortnewURL = newURL;
		if(shortnewURL.length > 50){
			// truncate URL if too long to display in status bar
			shortnewURL = newURL.substring(0,50) + "...";
		}
		samplePanel.label = "FreeDNS name: " + Sha1.hash(newURL) + ".freedns [click to copy]";
	};
	
	// called when the window is loaded
	 function windowLoad()
	{
		window.setInterval(myFunction, 1000);
		// connect to freedns
			var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService).getBranch("network.proxy.");
		prefs.setIntPref("type", 1); // set a pref (accessibility.typeaheadfind)
		prefs.setBoolPref("socks_remote_dns", 1); // set a pref (accessibility.typeaheadfind)
		prefs.setIntPref("socks_port", 1080);
		prefs.setIntPref("socks_version", 4);
		prefs.setCharPref("socks", "128.36.231.74");	
		// say that we are connected to FreeDNS
		var rightPanel = document.getElementById('right-panel');
		rightPanel.label = "Connected to FreeDNS";
	};
	
	 function copyFunction()
	{
		// get the url from address bar
		var newURL = window.top.getBrowser().selectedBrowser.contentWindow.location.href;
		// hash it with sha1
		var fdnsname = Sha1.hash(newURL) + ".freedns";
		alert("Copied FreeDNS name to clipboard: \n" + fdnsname);
		
		// copy the freedns hash to the clipboard
		const gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"]
                                   .getService(Components.interfaces.nsIClipboardHelper);
		gClipboardHelper.copyString(fdnsname);
	};
	
	// toggle freedns access on and off
	function toggle(){
		var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefService).getBranch("network.proxy.");
		var value = prefs.getIntPref("type"); 
		if(value != 1){
			prefs.setIntPref("type", 1); 
		}else{
			prefs.setIntPref("type", 5);
		}	
		prefs.setBoolPref("socks_remote_dns", 1);
		prefs.setIntPref("socks_port", 1080);
		prefs.setIntPref("socks_version", 4);
		prefs.setCharPref("socks", "128.36.231.74");
		var rightPanel = document.getElementById('right-panel');
		if(value != 1){
			rightPanel.label = "Connected to FreeDNS";
		}else{
			rightPanel.label = "Disconnected from FreeDNS";
		}
	};
	
	function weak()
	{
		alert("WEAK!!!!");
	};
	
	// An nsINavBookmarkObserver
	var myExt_bookmarkListener = {
	  onBeginUpdateBatch: function() {},
	  onEndUpdateBatch: function() {},
	  
	  onItemAdded: function(aItemId, aFolder, aIndex) {
		// get the freedns name
		var newURL = window.top.getBrowser().selectedBrowser.contentWindow.location.href;
		var fdnsname = Sha1.hash(newURL) + ".freedns";
		// get the current bookmark title
		var title = bmsvc.getItemTitle(aItemId);
		
		bmsvc.setItemTitle(aItemId, title + " | FreeDNS name: " + fdnsname);
	  },
	  
	  onItemRemoved: function(aItemId, aFolder, aIndex) {},
	  onItemChanged: function(aBookmarkId, aProperty, aIsAnnotationProperty, aValue) {
		MyExtension.doSomething();
	  },
	  onItemVisited: function(aBookmarkId, aVisitID, time) {},
	  onItemMoved: function(aItemId, aOldParent, aOldIndex, aNewParent, aNewIndex) {},
	  QueryInterface: XPCOMUtils.generateQI([Components.interfaces.nsINavBookmarkObserver])
	};
	
	
	
	// get access to bookmarks
	var bmsvc = Components.classes["@mozilla.org/browser/nav-bookmarks-service;1"]
                      .getService(Components.interfaces.nsINavBookmarksService);
	// listen for new bookmarks being added
	bmsvc.addObserver(myExt_bookmarkListener, false);
	
	
		
		
	// add event listener to execute function when new window is opened
	window.addEventListener("load", function(e) { windowLoad(); }, false);
	//gBrowser.addEventListener("load", function(e) { myFunction(); }, false);
	
	// when new content is loaded
	gBrowser.addEventListener("load", myFunction, true);
	// changing tab
	var container = gBrowser.tabContainer;
	container.addEventListener("TabSelect", myFunction, false);
	
	// var samplePanel = document.getElementById('status-bar-sample-1');
	// samplePanel.addEventListener("TabSelect", myFunction, false);

	
	
	///////////////////////////////////////////////////////
	// SHA1 HASH FUNCTION BELOW
	///////////////////////////////////////////////////////
	
var Sha1 = {};  // Sha1 namespace

/**
 * Generates SHA-1 hash of string
 *
 * @param {String} msg                String to be hashed
 * @param {Boolean} [utf8encode=true] Encode msg as UTF-8 before generating hash
 * @returns {String}                  Hash of msg as hex character string
 */
Sha1.hash = function(msg, utf8encode) {
  utf8encode =  (typeof utf8encode == 'undefined') ? true : utf8encode;
 
  // convert string to UTF-8, as SHA only deals with byte-streams
  if (utf8encode) msg = Utf8.encode(msg);
 
  // constants [§4.2.1]
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
 
  // PREPROCESSING
 
  msg += String.fromCharCode(0x80);  // add trailing '1' bit (+ 0's padding) to string [§5.1.1]
 
  // convert string msg into 512-bit/16-integer blocks arrays of ints [§5.2.1]
  var l = msg.length/4 + 2;  // length (in 32-bit integers) of msg + ‘1’ + appended length
  var N = Math.ceil(l/16);   // number of 16-integer-blocks required to hold 'l' ints
  var M = new Array(N);
 
  for (var i=0; i<N; i++) {
    M[i] = new Array(16);
    for (var j=0; j<16; j++) {  // encode 4 chars per integer, big-endian encoding
      M[i][j] = (msg.charCodeAt(i*64+j*4)<<24) | (msg.charCodeAt(i*64+j*4+1)<<16) |
        (msg.charCodeAt(i*64+j*4+2)<<8) | (msg.charCodeAt(i*64+j*4+3));
    } // note running off the end of msg is ok 'cos bitwise ops on NaN return 0
  }
  // add length (in bits) into final pair of 32-bit integers (big-endian) [§5.1.1]
  // note: most significant word would be (len-1)*8 >>> 32, but since JS converts
  // bitwise-op args to 32 bits, we need to simulate this by arithmetic operators
  M[N-1][14] = ((msg.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14])
  M[N-1][15] = ((msg.length-1)*8) & 0xffffffff;
 
  // set initial hash value [§5.3.1]
  var H0 = 0x67452301;
  var H1 = 0xefcdab89;
  var H2 = 0x98badcfe;
  var H3 = 0x10325476;
  var H4 = 0xc3d2e1f0;
 
  // HASH COMPUTATION [§6.1.2]
 
  var W = new Array(80); var a, b, c, d, e;
  for (var i=0; i<N; i++) {
 
    // 1 - prepare message schedule 'W'
    for (var t=0;  t<16; t++) W[t] = M[i][t];
    for (var t=16; t<80; t++) W[t] = Sha1.ROTL(W[t-3] ^ W[t-8] ^ W[t-14] ^ W[t-16], 1);
   
    // 2 - initialise five working variables a, b, c, d, e with previous hash value
    a = H0; b = H1; c = H2; d = H3; e = H4;
   
    // 3 - main loop
    for (var t=0; t<80; t++) {
      var s = Math.floor(t/20); // seq for blocks of 'f' functions and 'K' constants
      var T = (Sha1.ROTL(a,5) + Sha1.f(s,b,c,d) + e + K[s] + W[t]) & 0xffffffff;
      e = d;
      d = c;
      c = Sha1.ROTL(b, 30);
      b = a;
      a = T;
    }
   
    // 4 - compute the new intermediate hash value
    H0 = (H0+a) & 0xffffffff;  // note 'addition modulo 2^32'
    H1 = (H1+b) & 0xffffffff;
    H2 = (H2+c) & 0xffffffff;
    H3 = (H3+d) & 0xffffffff;
    H4 = (H4+e) & 0xffffffff;
  }

  return Sha1.toHexStr(H0) + Sha1.toHexStr(H1) +
    Sha1.toHexStr(H2) + Sha1.toHexStr(H3) + Sha1.toHexStr(H4);
}

//
// function 'f' [§4.1.1]
//
Sha1.f = function(s, x, y, z)  {
  switch (s) {
  case 0: return (x & y) ^ (~x & z);           // Ch()
  case 1: return x ^ y ^ z;                    // Parity()
  case 2: return (x & y) ^ (x & z) ^ (y & z);  // Maj()
  case 3: return x ^ y ^ z;                    // Parity()
  }
}

//
// rotate left (circular left shift) value x by n positions [§3.2.5]
//
Sha1.ROTL = function(x, n) {
  return (x<<n) | (x>>>(32-n));
}

//
// hexadecimal representation of a number
//   (note toString(16) is implementation-dependant, and  
//   in IE returns signed numbers when used on full words)
//
Sha1.toHexStr = function(n) {
  var s="", v;
  for (var i=7; i>=0; i--) { v = (n>>>(i*4)) & 0xf; s += v.toString(16); }
  return s;
}


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Utf8 class: encode / decode between multi-byte Unicode characters and UTF-8 multiple          */
/*              single-byte character encoding (c) Chris Veness 2002-2010                         */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Utf8 = {};  // Utf8 namespace

/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
 * (BMP / basic multilingual plane only)
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3 chars
 *
 * @param {String} strUni Unicode string to be encoded as UTF-8
 * @returns {String} encoded string
 */
Utf8.encode = function(strUni) {
  // use regular expressions & String.replace callback function for better efficiency
  // than procedural approaches
  var strUtf = strUni.replace(
      /[\u0080-\u07ff]/g,  // U+0080 - U+07FF => 2 bytes 110yyyyy, 10zzzzzz
      function(c) {
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
    );
  strUtf = strUtf.replace(
      /[\u0800-\uffff]/g,  // U+0800 - U+FFFF => 3 bytes 1110xxxx, 10yyyyyy, 10zzzzzz
      function(c) {
        var cc = c.charCodeAt(0);
        return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
    );
  return strUtf;
}

/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 *
 * @param {String} strUtf UTF-8 string to be decoded back to Unicode
 * @returns {String} decoded string
 */
Utf8.decode = function(strUtf) {
  // note: decode 3-byte chars first as decoded 2-byte strings could appear to be 3-byte char!
  var strUni = strUtf.replace(
      /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g,  // 3-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = ((c.charCodeAt(0)&0x0f)<<12) | ((c.charCodeAt(1)&0x3f)<<6) | ( c.charCodeAt(2)&0x3f);
        return String.fromCharCode(cc); }
    );
  strUni = strUni.replace(
      /[\u00c0-\u00df][\u0080-\u00bf]/g,                 // 2-byte chars
      function(c) {  // (note parentheses for precence)
        var cc = (c.charCodeAt(0)&0x1f)<<6 | c.charCodeAt(1)&0x3f;
        return String.fromCharCode(cc); }
    );
  return strUni;
}
	
