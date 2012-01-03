
var __customMenus = {
	"switchRestartless": "扩展管理.非启动类扩展(输入序号如:1,2)",
	"getAddonsList": "扩展管理.取已启用扩展列表到剪贴板",
	"getTitle": "小工具.取Title到剪贴版",
	"getAgent": "小工具.取UserAgent到剪贴板",
	"getTitleAndUrl": "小工具.取标题和链接到剪贴板",
	//"openProfileDirectory": "打开配置文件(window)",
	"openProfileDirectory2": "打开配置文件(ubuntu nautilus)",
	"copySimpleTxtToClipBoard": "复制简单文字",
	"showSelectionSource": "查看选中的代码",
	"saveSelectedTxt": "保存选中的文字",
	"openSelectionLinks": "打开选中链接",
	"restartBrowser": "重启"
}

var openSelectionLinks = function() {
	var source = app.getSelectionSource()

	var data = source.match(/\<a[^\>]*>/g)
	alert(data)
	for each(var c in data)
	alert(c)
}

var showSelectionSource = function() {
		try{
			alert(app.getSelectionSource());
		}catch(e){
			alert("error : " + e)
		}
}

var saveSelectedTxt = function() {
	app.saveAsFile(app.getSelectedTxt())
}

var getAddonsList = function() {
	Components.utils.import("resource://gre/modules/AddonManager.jsm");
	AddonManager.getAllAddons(function(addons) {
		var content = "";
		for each(var addon in addons) {
			if (addon.isActive && addon.type == "extension") {
				content += (addon.name + "\n")
			}
		}
		app.simpleCopy(content);
		alert("done");
	})
}

var copySimpleTxtToClipBoard = function() {
	var copytext = new String(app.getSelectedTxt());
	app.setClipBoard({
		"text/unicode": copytext,
		"text/html": copytext
	})
}

var switchRestartless = function() {
	Components.utils.import("resource://gre/modules/AddonManager.jsm");
	var rlAddons = {},
	content = "",
	indx = 1;
	AddonManager.getAllAddons(function(aAddons) {
		aAddons.sort(function(a) {
			return a.isActive
		})
		for (var index = 0; index < aAddons.length; index++) {
			var aAddon = aAddons[index];
			if (aAddon.hasResource && aAddon.hasResource("bootstrap.js")) {
				rlAddons[indx] = index;
				content += ((indx++) + " " + aAddon.isActive + " " + aAddon.name + "\n")
			}
		}
		var rslt = prompt(content).trim();
		for each(var index in rslt.split(",")) {
			var aAddon = aAddons[rlAddons[index]];
			aAddon.userDisabled = ! aAddon.userDisabled;
		}
	});
};

var openProfileDirectory = {
	process: function() {
		var prop = Cc["@mozilla.org/file/directory_service;1"].getService(Ci.nsIProperties);
		prop.get("ProfD", Ci.nsILocalFile).launch();
	}
};

var openProfileDirectory2 = function() {
	var currProfD = Services.dirsvc.get("ProfD", Ci.nsIFile);
	var profileDir = currProfD.path;
	var cmd = app.getAFile("/usr/bin/nautilus");
	app.executeCmd(cmd, [profileDir]);
}

var getTitle = function() {
	app.simpleCopy(document.title);
	alert("done");
};

var getTitleAndUrl = function() {
	app.simpleCopy(document.title + "\n" + location.href);
	alert("done");
}

var getAgent = function() {
	app.simpleCopy(window.navigator.userAgent);
	alert("done")
};

var restartBrowser = function() {
	//alert(window.document.getElementById("main-window"))
	Services.appinfo.invalidateCachesOnRestart() || Application.restart()
	// alert(14)
}

