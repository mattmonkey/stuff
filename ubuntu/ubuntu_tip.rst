ubuntu11.10
===========

software
---------

LightDM

    ::
    
        Light Display Manager
        
        sudo apt-add-repository ppa:claudiocn/slm
        sudo apt-get update
        sudo apt-get install simple-lightdm-manager


wallpaper

    ::

        设置墙纸的图片
        
        /home/matt/.cache/gnome-control-center/backgrounds

        gconftool-2 -t str --set /desktop/gnome/background/picture_filename "Path to the image file"
        


ubuntu-tweak

    ::

        sudo add-apt-repository ppa:tualatrix/ppa
        sudo apt-get update
        sudo apt-get install ubuntu-tweak 

Wallcn

    ::

        软件中心
        随机更换图片


PySDM

    ::
            
        启动时自动挂载分区


xdg-user-dirs

    ::

        定制Downloads、Documents等目录的语言
        
