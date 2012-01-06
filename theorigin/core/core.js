(function() {
	const Cc = Components.classes;
	const Ci = Components.interfaces;
	var debug = true
	var anonymousScopes, nsmnger, scriptmnger, appFiles, jsFiles;

	nsmnger = new NamespacesManager();
	anonymousScopes = {};
	initialized();


	function initialized() {

		// 默认脚本目录为 $配置文件/theorigin
		scriptmnger = new ScriptManager("ProfD", ["theorigin"]);
	
		// 如果想指定脚本目录的话可以使用下面这句,并把上面注释掉
		//scriptmnger = new ScriptManager("/home/matt/mygit/stuff/theorigin");
		
		appFiles = scriptmnger.getAppScripts();
		jsFiles = scriptmnger.getScripts();

		for each(var file in appFiles) {
			nsmnger.loadScript(file, window)
		}

		for each(var file in jsFiles) {
			nsmnger.loadScriptByName(file, anonymousScopes)
		}

		new Menus(anonymousScopes)
	}

	// 读取文件目录的工具类
	function ScriptManager() {
		this.getAppScripts = function() {
			var appsDir = this.baseDir.clone();
			appsDir.append("apps")
			return this.getJSFilesFromFolder(appsDir)
		}

		this.getScripts = function() {
			return this.getJSFilesFromFolder(this.baseDir)
		}

		// 两种方式获得文件对象
		this.getFile = function() {
			Components.utils.import("resource://gre/modules/FileUtils.jsm");
			if (arguments.length == 1) {
				file = new FileUtils.File(arguments[0]);
			} else if (arguments.length == 2) {
				file = FileUtils.getFile(arguments[0], arguments[1]);
			}
			return file
		}

		// 从目录获得JS文件
		this.getJSFilesFromFolder = function(aDir) {
			if (aDir.exists() == false) {
				return null;
			}

			var entries = aDir.directoryEntries,
			array = [];

			while (entries.hasMoreElements()) {
				var entry = entries.getNext();
				entry.QueryInterface(Components.interfaces.nsIFile);
				if (entry.isFile() && /.js$/.test(entry.path)) {
					array.push(entry);
				}
			}
			return array;
		}

		this.baseDir = this.getFile.apply(null, arguments);
	}

	// 脚本导入控制
	function NamespacesManager(flg) {
		var isCached = flg
		var caches = {};	
		// 文件数据和缓存比较，判断是否需要重新加载
		this.loadCheck = function(file){
			var cacheKey = file.path
			if(caches[cacheKey]==null){
				log("this.loadCheck--->%1 文件信息未缓存,现已加入--> %2",file.leafName,file.lastModifiedTime)
				caches[cacheKey]=file.lastModifiedTime;
				return true
			}else if(file.lastModifiedTime > this.caches[cacheKey]){
				log("this.loadCheck--->%1 文件更新--> %2",file.leafName,file.lastModifiedTime)
				caches[cacheKey]=file.lastModifiedTime;
				return true
			}
			log("this.loadCheck--->%1 文件未更新 : %2",cacheKey,caches[cacheKey]);
			return false;
		}

		this.loadScript = function(file, scope, charset) {
			if(isCached && this.loadCheck(file)==false){
				return; 
			}
			try {
				var aScript = new ScriptBean(file);
				var tmpObj = this.evalScript(aScript);
				for (var key in tmpObj) {
					scope[key] = tmpObj[key]
				}
			} catch(e) {
				log(" NamespacesManager.loadScript ===>%1", e)
			}
		}

		this.loadScriptByName = function(file, scope, charset) {
			if(isCached && this.loadCheck(file)==false){
				return; 
			}
			try {
				var aScript = new ScriptBean(file);
				scope[aScript.name] = this.evalScript(aScript)
			} catch(e) {
				log(" NamespacesManager.loadScriptByName ===>%1", e)
			}
		}

		this.evalScript = function(bean) {
			try {
				return eval(bean.getScript());
			} catch(e) {
				log(" NamespacesManager.evalScrnsmngeript ===>%1", e)
			}
		}
	}

	// 表示一个脚本文件
	function ScriptBean(file) {
		// 读取一个文件的内容
		this.getFileContent = function(file) {
			var fstream = ccc("@mozilla.org/network/file-input-stream;1", "nsIFileInputStream");
			var cstream = ccc("@mozilla.org/intl/converter-input-stream;1", "nsIConverterInputStream");
			fstream.init(file, - 1, 0, 0);
			cstream.init(fstream, "UTF-8", 0, 0);
			var str = {}
			var data = ""
			var read = 0;
			do {
				read = cstream.readString(0xffffffff, str);
				data += str.value;
			} while (read != 0);
			cstream.close();
			return data
		}

		this.parseExports = function(code) {
			var exports = (code.slice(0, code.indexOf("\n")) || "").trim()
			if (/var\s*EXPORT\s*=\s*\[.*\]\s*\;*$/.test(exports)) {
				exports = exports.match(/\[.*\]/)[0].slice(1, - 1)
			}
			var data = exports.split(',').map(function(obj) {
				return "this.%1=%1;".replace(/\%1/g, obj)
			}).join("\n");
			return data
		}

		this.getScript = function() {
			return this.HEAD + this.originalCode + this.magicPart + this.END;
		}

		this.HEAD = "new function(){";

		this.END = "}";

		this.originalCode = this.getFileContent(file);
		this.path = file.path
		this.magicPart = this.parseExports(this.originalCode);
		this.lastModifiedTime = file.lastModifiedTime;
		this.name = file.leafName.slice(0, file.leafName.indexOf('.'));

	}

	function ccc(contract, inter) {
		return Cc[contract].createInstance(Ci[inter]);
	}

	function ccs(contract, inter) {
		return Cc[contract].getService(Ci[inter]);
	}

	function log() {
		Application.console.log(p.apply(null, arguments))
	}

	function p() {
		var pattern = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			pattern = pattern.replace("%" + i, arguments[i]);
		}
		return "The Origin :: " + pattern;
	}

	function Menus(scopes) {
		var _scope = this;
		var content = ""
		init(function(rootItem) {
			for each(var scope in scopes) {
				for (var key in scope.__customMenus) {
					try {
						rootItem.create(scope.__customMenus[key], scope[key])
					} catch(e) {
						log(" Menu.init ===>%1", e)
					}
				}
			}
		});

		function init(customFn) {
			var rootItem = new MenuItem("选择操作，输入编号  (*号是菜单) ")
			if (customFn) {
				customFn.call(_scope, rootItem)
			}
			rootItem.process()
		}

		function MenuItem(desc) {
			Item.call(this, desc, promptProcessor)
			this.register = function(item) {
				this.setItem(item)
				return item;
			}
		}

		function Item(desc, processor) {
			this.items = [];
			this.processor = processor;
			this.setItem = function(item) {
				this.items.push(item)
			}

			this.getDesc = function() {
				return desc
			}

			this.process = function() {
				try {
					if (typeof this.processor == "function") {
						this.processor()
					} else if (typeof this.processor == "object") {
						this.processor.process.apply(this.processor)
					}
				} catch(e) {
					log(" Menu.init ===>%1", e)
				}
			}

			this.getLineString = function() {
				var status = this.items.length == 0 ? "": " * "
				return this.getDesc() + status;
			}

			this.getPrettyString = function() {
				var content = this.getDesc() + "\n\n";
				for (var i = 0; i <= this.items.length - 1; i++) {
					var str = this.items[i].getLineString();
					content += (i + 1 + " " + str + "\n")
				}
				return content;
			}

			this.indexOf = function(menu) {
				for (var i = 0; i <= this.items.length - 1; i++) {
					if (this.items[i].getDesc() == menu) {
						return i;
					}
				}
				return - 1
			}

			this.create = function(menuStr, processor) {
				var menus = menuStr.split('.'),
				endFlg = (menus.length == 1),
				menu = menus[0]

				if (endFlg == true) {
					this.setItem(new Item(menu, processor))
				} else {
					var index = this.indexOf(menu);
					if (index == - 1) {
						this.setItem(new MenuItem(menu))
						index = this.items.length - 1;
					}
					this.items[index].create(menus.slice(1).join('.'), processor)
				}
			}
		}

		function promptProcessor() {
			var input = prompt(this.getPrettyString()),
			input = input ? input.trim() : input;
			if (this.items[input - 1]) {
				this.items[input - 1].process();
			}
		}
	}
})();

