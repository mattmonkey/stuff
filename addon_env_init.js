// preference setting of firefox add-on dev
(function(){ 
     var data=[],STATUS = true
     data.push('nglayout.debug.disable_xul_fastload');
     data.push('extensions.logging.enabled');    
     data.push('devtools.chrome.enabled');
     data.push('javascript.options.strict');
     data.push('browser.dom.window.dump.enabled');
     data.push('nglayout.debug.disable_xul_cache');
     data.push('javascript.options.showInConsole');
     for each(var key in data){
         Application.prefs.setValue(key, STATUS)
     }
 })():
