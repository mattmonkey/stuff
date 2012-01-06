The Origin 安装使用
===================

使用理由
^^^^^^^^^^
-  脚本可无限配置,不用再纠结和取舍那些不常用的小功能。
-  支持独立的js文件，可以使用喜欢的编辑器编写。
-  没有缓存，即改即生效。

安装和使用方法
^^^^^^^^^^^^^^
1.  安装 Keyconfig_ 后浏览器重启。
#.  按 **Shift-Ctrl-F12** ,新建一个Key。添加 `The Origin`_ 的内容。给Key添加一个快捷键。

        .. image:: keyconfig.png

#.  解压 `预装脚本`_ 到指定目录。 [1]_

    ::
    
        默认需要解压到Firefox配置文件下


#.  按设置好的快捷键,打开对话框系统

        .. image:: menus.png


自带脚本含以下功能
^^^^^^^^^^^^^^^^^^

    1.  图片批量下载器
    #.  打开选中链接    
    #.  打开选中链接（正则）
    #.  下载选中图片:
    #.  下载选中图片（正则）
    #.  查看选中代码
    #.  复制简单文字 (非HTML)
    #.  保存选中文字 
    #.  复制标题
    #.  复制标题和链接
    #.  复制UserAgent
    #.  打开配置文件
    #.  复制扩展列表
    #.  禁用/启用Restartless扩展
    
| 
|   
| 

.. [1] 特定目录参照表
        
    按此表修改 `The Origin`_  14~18行的代码可以自定义脚本目录

=============== ====================
 String 	       Meaning     
=============== ====================
 ProfD 	        profile directory   
 DefProfRt 	    user (for example /root/.mozilla)
 UChrm 	        %profile%/chrome
 DefRt 	        %installation%/defaults
 PrfDef 	    %installation%/defaults/pref
 ProfDefNoLoc   %installation%/defaults/profile
 APlugns        %installation%/plugins
 AChrom         %installation%/chrome
 ComsD          %installation%/components
 CurProcD       installation (usually)
 Home           OS root (for example /root)
 TmpD           OS tmp (for example /tmp)
 ProfLD         Local Settings on windows; where the network cache and fastload files are stored
 resource:app   application directory in a XULRunner app
 Desk           Desktop directory (for example ~/Desktop on Linux, C:\Documents and Settings\username\Desktop on Windows)
=============== ====================



|

|

|

            
                        

.. _The Origin: core/core.js
.. _预装脚本: https://github.com/mattmonkey/stuff/downloads
.. _Keyconfig: http://forums.mozillazine.org/viewtopic.php?t=72994
