var EXPORT = [__customMenus, openSelectionLinks, saveSelectedImage, saveSelectedImage2];

var __customMenus = {
	"copySimpleTxtToClipBoard": "复制简单文字",
	"showSelectionSource": "查看选中的代码",
	"saveSelectedTxt": "保存选中的文字",
	"openSelectionLinks": "打开选中链接",
	"openSelectionLinks2": "打开选中链接(正则)",
	"saveSelectedImage": "下载选中图片",
	"saveSelectedImage2": "下载选中图片(正则)",
	"saveReguralImages": "批量下载器",
}

this.saveReguralImages = function() {
	var rslt = prompt("批量下载器\n\n 输入格式: url样式 \n  http://a.com/b{13-18}.jpg \n");
	if (rslt.trim()) {
		var ranges = rslt.match(/\{\d+\-\d+\}/)[0].slice(1,-1).split("-");
		var len = ranges[0].length;
		rslt = rslt.replace(/\{\d+\-\d+\}/,"$");	

		if (!confirm(app.p("下载数量为%1,是否继续", ranges[1] - ranges[0] + 1))) {
			return;
		}

		var s = parseInt(ranges[0]),e = parseInt(ranges[1]);

	   for (var i = s; i <=e ; i++) { (function(i) {
				var str = app.fillChar(i,len,"0");
				setTimeout(function() {
					app.saveImage(rslt.replace("$",str));
				},
				1500 * (i - s));
			})(i);
		}
	}
}

var saveSelectedImage2 = function() {
	var links = saveSelectedImage(true)

	var list = links.slice(0, 10).reduce(function(l, l2) {
		return l + "\n" + l2
	})

	if (links.length > 0) {
		var re = prompt(app.p("部分数据供参考：\n %1 \n输入正则...", list), "")
		if (!re.trim()) {
			return;
		}
	}
	var reg = new RegExp(re);
	links.forEach(function(link) {
		reg.test(link) && app.saveImage(link)
	})
}

var saveSelectedImage = function(evalFlg) {
	var source = app.getSelectionSource();
	var data = source.match(/src=\"[^"]*(gif|ioc|jpg|png)\"/g)
	var hostname = content.document.location.hostname
	var links = data.map(function(link) {
		link = link.slice(5, - 1)
		if (!/^http(|s)/.test(link)) {
			link = "http://" + hostname + "/" + link
		}
		return link
	})
	if (!evalFlg) {
		links.forEach(function(link) {
			if (link) app.saveImage(link);
		})
	}
	return links
}

var openSelectionLinks = function(evalFlg) {
	var source = app.getSelectionSource();
	var data = source.match(/href=\"[^"]*\"/g);
	var hostname = content.document.location.hostname;
	var links = data.map(function(link) {
		link = link.slice(6, - 1);
		if (/^\#/.test(link)) {
			return "";
		}
		if (!/^http(|s)/.test(link)) {
			link = (hostname + "/" + link);
		}
		return link;
	})
	if (!evalFlg) {
		var checked={}
		links.forEach(function(link) {
			if (link && !checked[link]) gBrowser.addTab(link)
			checked[link]=1
		})
	}
	return links
}

this.openSelectionLinks2 = function() {
	var links = openSelectionLinks(true)

	var list = links.slice(0, 10).reduce(function(l, l2) {
		return l + "\n" + l2;
	})

	if (links.length > 0) {
		var re = prompt(app.p("部分数据供参考：\n %1 \n输入正则...", list), "");
		if (!re.trim()) {
			return;
		}
	}
	
	var reg = new RegExp(re);
	var checked={};
	links.forEach(function(link) {
		reg.test(link)  && !checked[link] && gBrowser.addTab(link);
		checked[link]=1;
	});
}

this.showSelectionSource = function() {
	try {
		alert(app.getSelectionSource());
	} catch(e) {
		//alert("error : " + e)
	}
}

this.saveSelectedTxt = function() {
	app.saveAsTextFile(app.getSelectedTxt())
}

this.copySimpleTxtToClipBoard = function () {
	var copytext = new String(app.getSelectedTxt());
	app.setClipBoard({
		"text/unicode": copytext,
		"text/html": copytext
	})
}

