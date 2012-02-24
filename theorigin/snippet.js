var EXPORT = [__customMenus, restartBrowser, getTitle, getAgent, getTitleAndUrl, txt2image,getTitleAndUrl2HTML];

// __customMenus对象的内容会被注册成一个菜单。
// key是被调用的函数或者对象。value是菜单
// 父菜单和子菜单间用点号隔开，可以无限衍生
var __customMenus = {
	"getTitle": "小工具.复制标题",
	"getAgent": "小工具.复制UserAgent",
	"getTitleAndUrl": "小工具.复制标题和链接",
	"openProfileDirectory": "打开配置文件",
	"restartBrowser": "重启",
	"txt2image": "贴吧文字变图片",
	"getTitleAndUrl2HTML":"小工具.复制标题和链接的HTML格式",
	"dencodeThunder":"下载迅雷链接",
	"exeCmdStr":"执行页面命令",
	"cpCmdStr":"复制多行页面命令"
}


this.exeCmdStr = function(){
	var cmds = app.getSelectedTxt();
	cmds = cmds.replace(/\n/g,';')
	var args=["-e",cmds+" ;sleep 3"]
	app.executeCmd("/usr/bin/xterm",args)	
}

this.cpCmdStr = function(){
	var cmds = app.getSelectedTxt();
	cmds = cmds.replace(/\n/g,';')
	app.simpleCopy(cmds);
	alert("done")
}

this.dencodeThunder = function(){
	var elm = app.getActiveElm();
	if(elm==null || elm.tagName !="A") {
		alert("不是一个链接!")
		return;
	}else if(!/^thunder\:\/\//.test(elm.href)){
		alert("不是迅雷链接!")
	}	
	var newlink = content.atob(elm.href.slice(10)).slice(2,-2)
	app.saveImage(app.toUnicode("gbk",newlink));
}

// 1、注册对象/方法的方式一，使用this
// 2、对象的话，需要实现process，以便调用
this.openProfileDirectory = {
	process: function() {
		if (app.getOS() == "Linux") {
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
function getTitle() {
	app.simpleCopy(app.getTitle());
	alert("done");
}

// 导出方式三 导出数组 +  函数变量
var getTitleAndUrl = function() {
	app.simpleCopy(app.p("%1\n%2", app.getTitle(), app.getUrl()));
	alert("done");
}

var getAgent = function() {
	app.simpleCopy(window.navigator.userAgent);
	alert("done")
};

var restartBrowser = function() {
	Services.appinfo.invalidateCachesOnRestart() || Application.restart()
};

var getTitleAndUrl2HTML = function(){
	app.setClipBoard({
		//"text/unicode": app.p("%1/n%2",app.getTitle(),app.getUrl()),
		"text/unicode": app.p("<a href='%1'>%2</a>",app.getUrl(),app.getTitle()),
		"text/html": app.p("<a href='%1'>%2</a>",app.getUrl(),app.getTitle())
	})
}

//this.ubuntuInstaller = function(){
	//var cmdstr = app.getSelectedTxt().replace(/sudo/g,"&& sudo").slice(3);
	//var appname = cmdstr.match(/install\s.*/)[0].slice(8).trim()
	//cmdstr += (" && sudo apt-add-repository -r " + cmdstr.match(/ppa:[^\s]*\s/))
	//var args=["-e",cmdstr]
	//app.executeCmd("/usr/bin/xterm",args)
	//var shelllHead = "#!/bin/bash\n"
	//app.saveAsTextFile2(shelllHead+cmdstr,appname+".sh")
//}

function txt2image() {
	var req = new XMLHttpRequest();
	var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
	var ctx = canvas.getContext("2d");
	var rect = content.document.querySelector(".tb-editor-editarea").getClientRects()[0];
	canvas.width = rect.width - 20;
	canvas.height = rect.height;
	ctx.drawWindow(content, content.pageXOffset + rect.left, content.pageYOffset + rect.top, canvas.width, canvas.height, "rgb(255,255,255)");
	req.open("POST", "http://upload.tieba.baidu.com/upload/pic", false);
	req.setRequestHeader("Content-Type", "multipart/form-data; charset=ascii; boundary=----------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6", false);
	req.sendAsBinary(decodeURIComponent('------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22Filename%22%0A%0A38dbb6fd5266d016d5c0aa63972bd40734fa353b.jpg%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22tbs%22%0A%0A5b67dcdf42424dd2013257610020125500_1%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22file%22%3B%20filename%3D%2238dbb6fd5266d016d5c0aa63972bd40734fa359b.jpg%22%0AContent-Type%3A%20application%2Foctet-stream%0A%0Aimagedata%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6%0AContent-Disposition%3A%20form-data%3B%20name%3D%22Upload%22%0A%0ASubmit%20Query%0A------------gL6Ef1gL6gL6ei4ae0KM7ei4ae0gL6--%0A').replace("imagedata", (atob(canvas.toDataURL().replace(/.+?base64,/, "")))));
	content.document.querySelector(".tb-editor-editarea").innerHTML = "<img  class='BDE_Image' src =http://imgsrc.baidu.com/forum/pic/item/" + JSON.parse(req.responseText).info.pic_id_encode + ".jpg>";
}
//setTimeout(function () {content.document.querySelector("table *[type=submit]").click()},1000);

