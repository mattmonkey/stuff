var app = {
	simpleCopy: function(txt) {
		var gClipboardHelper = ccc("@mozilla.org/widget/clipboardhelper;1", "nsIClipboardHelper");
		gClipboardHelper.copyString(txt);
	},
	setClipBoard: function(data) {
		var trans = ccc("@mozilla.org/widget/transferable;1", "nsITransferable");
		if (!trans) return false;
		for (var flavor in data) {
			var copytext = new String(data[flavor]);
			var str = ccc("@mozilla.org/supports-string;1", "nsISupportsString");
			if (!str) return false;
			str.data = copytext
			trans.addDataFlavor(flavor);
			trans.setTransferData(flavor, str, copytext.length * 2);
		}

		var clipid = Components.interfaces.nsIClipboard;
		var clip = ccs("@mozilla.org/widget/clipboard;1", "nsIClipboard");
		if (!clip) return false;
		clip.setData(trans, null, clipid.kGlobalClipboard);
		return;
	},
	getAFile: function(path) {
		var localFile = ccc("@mozilla.org/file/local;1", "nsILocalFile");
		localFile.initWithPath(path);
		return localFile
	},

	getSelectionSource: function() {
		var range = content.getSelection().getRangeAt(0);
		var startContainer = range.startContainer;
		var spanNode = startContainer.ownerDocument.createElement("layer");
		var docfrag = range.cloneContents();
		spanNode.appendChild(docfrag);
		return spanNode.innerHTML;
	},

	executeCmd: function(cmd, args) {
		var processor = ccc("@mozilla.org/process/util;1", "nsIProcess");
		processor.init(cmd)
		processor.run(false, args, args.length)
	},

	getSelectedTxt: function() {
		return content.getSelection().toString();
	},

	saveAsFile: function(txt) {
		var filename = txt.slice(0, 5) + ".txt";
		txt = btoa(unescape(encodeURIComponent(txt)));
		saveImageURL("data:text/plain;charset=UTF-8;base64," + txt, filename);
	},

	loadScript: function(path) {
		var loader = ccs("@mozilla.org/moz/jssubscript-loader;1", "mozIJSSubScriptLoader");
		loader.loadSubScript(path, __scope, "utf-8")
	},

}

