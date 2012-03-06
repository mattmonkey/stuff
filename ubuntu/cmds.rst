****************
命令总结
****************


.. _mount-iso:

挂载ISO到光盘
-------------
        
    - **mount** 挂载命令  
    - **umount** 卸载命令
    - **-o loop** 指定选项,挂载 :term:`Loop device`  。默认是只读  
        
    ::
        
        sudo mount -t iso9660 -o loop /home/matt/precise-desktop-i386.iso /cdrom
        sudo umount /cdrom


    * 挂载时添加读写参数        

    ::

        sudo mount -t iso9660 -o loop,rw /home/matt/precise-desktop-i386.iso /cdrom



添加光盘源
-----------------------

    ::

        sudo apt-cdrom -d /cdrom -m -o=Dir::Media::MountPath=/cdrom add
 
    
压缩文件处理
-----------------

    * 解压bz2、gz、tgz。（bz2比gz **更小** ） 

        ::

            tar xvzf file.tar.gz
            tar jvzf file.tar.bz2
            tar xvzf file.tgz


    * 解压 rar
        
        ::

            unrar x file.rar /tmp


    * 使用7z

        ::

            7z x file.tar -o/tmp



查询软件包包含的文件
--------------------

    ::
    
        dpkg -L pkgname


启动更新管理器
--------------

    ::

        update-manager


    **在线升级版本**
    ::

        update-manger -d



检索历史命令(显示行号)
-----------------------

    1. cat 
        
        ::

            cat -b ~/.bash_history | grep ls
            !123

    #. history
        
        ::

            history | grep ls 

    #. alias
        
        ::

            alias searchistory="history | grep "



按日期备份
--------------

    ::

        tar cPizvf backup-`date +%Y%M%d-%S`.tar.gz /var/cache/apt/archives --exclude=/var/cache/apt/archivesapartial/* --exclude=/var/cache/apt/archives/lock
        

下载源码包
-----------

    对某个软件的源码感兴趣，可以直接下载相关的源码。

    ::

        apt-get source wmctrl
        

    如果不能自动解压，则需要安装dpkg-dev

    ::

        sudo aptitude install dpkg-dev


Terminal下查看图片
-------------------

    就是用那个 *图像查看器* 。它对应的命令叫做 ``eog``

    ::
        
        eog 1.jpg


