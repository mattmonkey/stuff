var EXPORT = [__customMenus,getAddonsList,switchRestartless];

var __customMenus = {
	"switchRestartless": "Addons.切换RestartLess扩展(输入序号如:1,2)",
	"getAddonsList": "Addons.复制扩展列表和简单统计",
}


var getAddonsList = function() {
	Components.utils.import("resource://gre/modules/AddonManager.jsm");
	AddonManager.getAllAddons(function(addons) {
		var rslt = "",cnt=0,cnt2=0;
		for each(var addon in addons) {
			if (addon.type == "extension") {
				if(addon.isActive){
					rslt += (addon.name + "\n");
					cnt++; // 生效扩展
				}
				cnt2++ // 扩展
			}
		}
		app.simpleCopy(app.p("%1\n\n共安装各类扩展,插件,主题共%2个;\n其中扩展%3个,启用扩展%4个",
				rslt,addons.length,cnt2,cnt));
		alert("done");
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
}


