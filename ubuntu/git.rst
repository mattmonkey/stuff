git
===

配置参数
-----------
    
    设置    

    ::
    
        git config --global user.name "mattmonkey"
        git config --global user.email "mattmonkey@sina.com"


    列出
    
    ::

        git config --list
        git config --global --list
        git config --local --list

    颜色

    ::

        git config --global color.branch auto
        git config --global color.diff auto
        git config --global color.interactive auto
        git config --global color.status auto
        git config --global color.ui auto

    别名

    ::

        git config --global alias.st status
        git config --global alias.ci commit
        git config --global alias.co checkout
        git config --global alias.br branch

    其他

    ::

        git config format.pretty oneline



辅助工具
---------

:qgit: 查看历史
:gitk: git默认的gui管理工具
:lighttpd: web server
:git instaweb: web based 管理工具


.. index::
   single: ssh ; ssh-keygen

生成SSH Key
-----------

    生成SSH Key

    ::

        cd ~/.ssh
        ssh-keygen -t rsa -C "mattmonkey@sina.com"

    添加Key到 `github ssh <https://github.com/settings/ssh>`_

    ::

        cat id_rsa.pub | xsel -b
    
    测试有效性

    ::

        ssh -T git@github.com
        
    

git重置提交者 
-------------
    
    ::
        
        git commit --amend --reset-author


gh-pages分支
-------------

* 库已经存在，切换到gh-pages分支

  ::

    git clone git@github.com:mattmonkey/CtrlCtrl ctrlctrl
    git checkout gh-pages



* 新建gh-pages分支


查看和比较
--------------------


* 某个版本某个文件

    查看
    
    ::

        git show  HEAD:chrome/content/ctrlctrl.js 


    比较

    ::

        git diff HEAD  -- chrome/content/search.js
        

* 比较某个版本

    列出简要差别

    ::

        git diff HEAD --stat
        git diff HEAD~2 --stat
        git diff --stat
