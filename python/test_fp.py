#!/usr/bin/python
# -*- coding: utf8 -*-

def compare(o1, o2):
    return o2 - o1 #逆序
lst = list(range(-15,5))
print lst
#lst.sort(compare)
lst.sort(lambda o1, o2: o2-o1)
print lst

lst2 = filter(lambda n: n > 0, lst)
print lst2
