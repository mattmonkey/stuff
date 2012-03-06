git
===

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
