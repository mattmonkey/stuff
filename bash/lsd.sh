#!/bin/bash
# 列出子目录
# 2012年 03月 02日 星期五 23:05:54 CST

ls -Al | grep '^d' | awk '{print $9}'
