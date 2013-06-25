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
    if(value != 1){
		window.alert(message);
	}else{
		window.alert(message2);
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
