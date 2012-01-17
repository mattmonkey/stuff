var EXPORT = [app];
var app = {

	mapping: {
		"mozIJSSubScriptLoader": "@mozilla.org/moz/jssubscript-loader;1",
		"nsIProcess": "@mozilla.org/process/util;1",
		"nsIClipboardHelper": "@mozilla.org/widget/clipboardhelper;1",
		"nsILocalFile": "@mozilla.org/file/local;1",
		"nsITransferable": "@mozilla.org/widget/transferable;1",
		"nsISupportsString": "@mozilla.org/supports-string;1",
		"nsIClipboard": "@mozilla.org/widget/clipboard;1",
		"nsIProperties": "@mozilla.org/file/directory_service;1"
	},

	ccc: function(arg) {
		return ccc(app.mapping[arg], arg)
	},

	ccs: function(arg) {
		return ccs(app.mapping[arg], arg)
	},

	getOS: function() {
		return Services.appinfo.OS;
	},

	simpleCopy: function(txt) {
		var gClipboardHelper = app.ccc("nsIClipboardHelper");
		gClipboardHelper.copyString(txt);
	},

	setClipBoard: function(data) {
		var trans = app.ccc("nsITransferable");
		if (!trans) return false;
		for (var flavor in data) {
			var copytext = new String(data[flavor]);
			var str = app.ccc("nsISupportsString");
			if (!str) return false;
			str.data = copytext
			trans.addDataFlavor(flavor);
			trans.setTransferData(flavor, str, copytext.length * 2);
		}

		var clipid = Components.interfaces.nsIClipboard;
		var clip = app.ccs("nsIClipboard");
		if (!clip) return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
		return;
	},

	getAFile: function(path) {
		var localFile = app.ccc("nsILocalFile");
		localFile.initWithPath(path);
		return localFile
	},

	getSelectionSource: function() {
		var rslt = "",
		ranges = content.getSelection();
		for (var i = 0; i < ranges.rangeCount; i++) {
			var range = ranges.getRangeAt(i);
			if (range.collapsed) {
				continue;
			}
			var startContainer = range.startContainer;
			var spanNode = startContainer.ownerDocument.createElement("layer");
			var docfrag = range.cloneContents();
			spanNode.appendChild(docfrag);
			rslt += spanNode.innerHTML;
		};
		return rslt
	},

	executeCmd: function(cmd, args) {
		var processor = app.ccc("nsIProcess");
		if(typeof cmd =="string"){
			cmd = app.getAFile(cmd);
		}
		processor.init(cmd)
		processor.run(false, args, args.length)
	},

	getSelectedTxt: function() {
		return content.getSelection().toString();
	},

	saveAsTextFile2: function(txt,filename) {
		txt = btoa(unescape(encodeURIComponent(txt)));
		saveImageURL("data:text/plain;charset=UTF-8;base64," + txt, filename,0,0,1);

	},

	saveAsTextFile: function(txt) {
		var filename = txt.slice(0, 10) + ".txt";
		txt = btoa(unescape(encodeURIComponent(txt)));
		saveImageURL("data:text/plain;charset=UTF-8;base64," + txt, filename);

	},

	saveImage: function(url) {
		saveImageURL(url, 0, 0, 0, 1);
	},
	
	p: function() {
		var pattern = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			pattern = pattern.replace("%" + i, arguments[i]);
		}
		return pattern;
	},

	log: function() {
		Application.console.log(app.p.apply(null, arguments))
	},

	fillChar: function(str, len, char) {
		str = new String(str);
		len = len - str.length
		var str2 = ""
		while (len--) {
			str2 += char
		}
		return str2 + str
	},

	getTitle :function(){
		return 	document.title;	  
	},

	getUrl : function(){
		return content.document.location.href;		 
	}
}

