#!/usr/bin/python
# -*- coding: utf8 -*-
#conf_name = "/etc/lightdm/unity-greeter.conf"

import os,re,random,shutil  
dirs=["/media/resource_backup/SyncDisk/pic/1280X80/风景"];
target_pic="/home/matt/.simpleLigtDMManager/file.jpg"
pic_pattern = re.compile(".*\.(jpg|png|jpeg|gif)$")


def getNewContent(conf,nextpic):
    target_item="background="
    for aline in file(conf):
        if str(aline).startswith(target_item):
            aline=target_item + nextpic + "\n"
        yield aline

def getPics(dir):
    for root,dirs,files in os.walk(dir):
        for file in files:
            if pic_pattern.match(str(file)):
                yield os.path.join(root,file)


def getRandomPic(dirs):
    pics =[]
    for dir in dirs:
        pics+=getPics(dir)
    return pics[random.randint(0,len(pics)-1)]
    
nextpic = getRandomPic(dirs) 
shutil.copy(nextpic, target_pic); 
