var EXPORT = [__customMenus, restartBrowser, getTitle, getAgent, getTitleAndUrl];

// __customMenus对象的内容会被注册成一个菜单。
// key是被调用的函数或者对象。value是菜单
// 父菜单和子菜单间用点号隔开，可以无限衍生
var __customMenus = {
	"getTitle": "小工具.复制标题",
	"getAgent": "小工具.复制UserAgent",
	"getTitleAndUrl": "小工具.复制标题和链接",
	"openProfileDirectory": "打开配置文件",
	"restartBrowser": "重启"
}

// 1、注册对象/方法的方式一，使用this
// 2、对象的话，需要实现process，以便调用
this.openProfileDirectory = {
	process: function() {
		if (app.getOS ()== "Linux") {
			var currProfD = Services.dirsvc.get("ProfD", Ci.nsIFile);
			var profileDir = currProfD.path;
			var cmd = app.getAFile("/usr/bin/nautilus");
			app.executeCmd(cmd, [profileDir]);
		} else {
			var prop = app.ccs("nsIProperties");
			prop.get("ProfD", Ci.nsILocalFile).launch();
		}
	}
};

// 导出方式二 导出数组 + 普通函数
function getTitle () {
	app.simpleCopy(document.title);
	alert("done");
}

// 导出方式三 导出数组 +  函数变量
var getTitleAndUrl = function() {
	app.simpleCopy(app.p("%1\n%2", document.title, document.location.href));
	alert("done");
}

var getAgent = function() {
	app.simpleCopy(window.navigator.userAgent);
	alert("done")
};

var restartBrowser = function() {
	Services.appinfo.invalidateCachesOnRestart() || Application.restart()
}

