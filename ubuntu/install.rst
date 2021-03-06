************************
安装系统和软件
************************



本地升级
----------

:ref:`mount-iso`

配置
-----

- 鼠标主题
    
    ::

       解压到 /usr/share/icons目录下


下载 
----

- ubuntu-tweak

    ::
        
        https://launchpad.net/ubuntu-tweak/+download

- Adobe Air 2.6

    ::
        
        http://kb2.adobe.com/cps/853/cpsid_85304.html
        http://airdownload.adobe.com/air/lin/download/2.6/AdobeAIRInstaller.bin        


- pomodairo

    ::

        http://code.google.com/p/pomodairo/


- flashplugin
    
    ::

        http://get.adobe.com/cn/flashplayer/completion/?installer=Flash_Player_11_for_other_Linux_(.tar.gz)_32-bit
        /usr/lib/firefox-addons/plugins/

 
- indicator-places
  
  ::

    https://github.com/shamil/indicator-places

- feed indicator

    ::

        http://forum.ubuntu.org.cn/feed.php


deb备份和还原
-------------

1.  备份

    ::

        tar cPizvf backup.tar.gz /var/cache/apt/archives --exclude=/var/cache/apt/archivesapartial/* --exclude=/var/cache/apt/archives/lock


2.   还原  

    ::

        sudo tar xzvf backup.tar.gz -C / 

PPA
----

1.  classicmenu

    ::

        sudo apt-add-repository ppa:diesch/testing

#.  Simple LightDM Manager

    ::

        sudo apt-add-repository ppa:claudiocn/slm


#. pastie

    ::

        sudo add-apt-repository ppa:hel-sheep/pastie

#. rabbitvcs

   ::
        
        sudo add-apt-repository ppa:rabbitvcs/ppa

#. sopcast

    ::

        sudo add-apt-repository ppa:ferramroberto/sopcast

        sop://broker.sopcast.com:3912/6004  凤凰中文： 
        sop://broker.sopcast.com:3912/6005  凤凰资讯：

#. Unity Plugin Rotated

    ::

        sudo add-apt-repository ppa:paullo612/unityshell-rotated


.. index::
    single:Terminal;nautilus termianl

#. Nautilus Terminal

    ::

        sudo add-apt-repository ppa:flozz/flozz


    配置文件    
    
    ::

        [general]
        #调整终端高度
        def_term_height=8
        #在新的窗口终端默认可见？ （1：可见，0：隐藏）
        def_visible=0
        #终端位置 (1: 顶部, 0: 底部)
        #注意：不建议设置在底部
        term_on_top=1

        [terminal]
        #使用shell（Nautilus Terminal默认使用用户定义的shell）
        shell=/bin/bas


#. Ubuntu-tweak

    ::

        sudo add-apt-repository ppa:tualatrix/ppa
        


常用软件
--------

    ::

        sudo apt-get install aptitude  p7zip-full gvim gnome-sushi freemind smplayer wallch fcitx zim xbindkeys compizconfig-settings-manager gnome-core 7z unrar terminator git-core subversion chmsee python2.7-doc freepats debian-reference-zh-cn ubuntu-defaults-zh-cn debian-faq-zh-cn shutter gnome-tweak-tool amule manpages-zh python-docutils wmctrl ubuntu-restricted-extras classicmenu-indicator indicator-weather pysdm ntfs-config pastie gconf-editor sopcast-player wine simple-lightdm-manager unityshell-rotated libnux-1.0-0 curl mongodb virtualbox startupmanager sysadmin-guide nautilus-terminal nautilus-open-termianl exuberant-ctags ubuntu-tweak gitk qgit lighttpd rabbitvcs-core rabbitvcs-nautilus3 rabbitvcs-cli 




nvidia 驱动
------------
    
    ::

        #http://www.nvidia.com/page/drivers.html
        #http://cn.download.nvidia.com/XFree86/Linux-x86/295.20/NVIDIA-Linux-x86-295.20.run

        sudo add-apt-repository ppa:ubuntu-x-swat/x-updates 
        sudo apt-get update
        sudo apt-get install nvidia-current



修改grub2内核参数
------------------
        
    ::

        /etc/default/grub
        update-grub
        /boot/grub/grub.cfg


sopcast 缺少 ImportError\: No module named vlc_1_0_x
-------------------------------------------------------

    ::

        sudo gvim /usr/share/sopcast-player/lib/VLCWidget.py 


目录还原
---------

    ::
        ln -s /media/sda5/SyncDisk/book ~/resources/book
        ln -s /media/sda5/SyncDisk/pic/wallpaper ~/resources/wallpaper
        ln -s ~/resources/firefox/default ~/.mozilla/firefox/llbksq25.default
        ln -s ~/resources/.vim ~/.vim
        ln -s ~/resources/.bash_aliases ~/.bash_aliases
        ln -s /media/sda5/SyncDisk/ScrapBook ~/resources/scrapbook
        ln -s $BAKDISK/mp3 ~/Music/mp3      

autojump
---------

    ::

        git clone git://github.com/joelthelion/autojump.git autojump


nodejs / coffeescript
----------------------

    ::

        sudo aptitude install nodejs
        curl http://npmjs.org/install.sh | sudo sh
        sudo npm install -g coffee-script

