(function() {
	const Cc = Components.classes;
	const Ci = Components.interfaces;
	var __scope = this;
	this.ccc = function ccc(contract, interface) {
		return Cc[contract].createInstance(Ci[interface]);
	}

	this.ccs = function ccs(contract, interface) {
		return Cc[contract].getService(Ci[interface]);
	}

	__readAndEVal("Home",["文档","app2.js"]);
	__readAndEVal("Home",["文档","snippet2.js"]);
	new __Menus(__scope);

	
	// 以下不需要改动
	function  __readAndEVal() {
		
		var data = "",file = null;
		Components.utils.import("resource://gre/modules/FileUtils.jsm");
		if(arguments.length==1){
			file = new FileUtils.File(arguments[0]);			
		}else if(arguments.length==2){
			file = FileUtils.getFile(arguments[0], arguments[1]);	
		}
		if(file==null ){	
			return;
		}
		alert(file.path)
		var fstream = ccc("@mozilla.org/network/file-input-stream;1", "nsIFileInputStream");
		var cstream = ccc("@mozilla.org/intl/converter-input-stream;1", "nsIConverterInputStream");
		fstream.init(file, - 1, 0, 0);
		cstream.init(fstream, "UTF-8", 0, 0);
		var str = {}
		var read = 0;
		do {
			read = cstream.readString(0xffffffff, str);
			data += str.value;
		} while (read != 0);
		cstream.close();
		eval.call(__scope, data)
	}
	
	function __Menus(scope) {
		var _scope = this;
		var content = ""
		init(function(rootItem) {
			for (var key in scope.__customMenus) {
				rootItem.create(scope.__customMenus[key], scope[key])
			}
		});

		function init(customFn) {
			var rootItem = new MenuItem("选择操作，输入编号")
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
				if (typeof this.processor == "function") {
					this.processor()
				} else if (typeof this.processor == "object") {
					this.processor.process.apply(this.processor)
				}
			}

			this.getLineString = function() {
				var status = this.items.length == 0 ? "*": ""
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

