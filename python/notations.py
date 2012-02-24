#!/usr/bin/python
# -*- coding: utf8 -*-
# 2012/2/6 简谱符号记忆练习

import sys,random
from functools import partial

notations=["do","re","me","fa","so","la","si"]


def highlight(forecolor,backcolor,text,colorpartten="%s[3%s;4%sm%s%s[0m"):
	return  colorpartten % (chr(27),str(forecolor),str(backcolor) ,text, chr(27))
	
rubric=partial(highlight,4,1)

def readint(text,errval=-1):
	rslt= raw_input(" %s 的简谱是： " % rubric(text) )
	if rslt.isdigit() : return int(rslt)
	return errval



while True:
	notation=random.choice(notations)
	rslt=readint(notation)
	if rslt < 0 : break
	if notations[rslt-1] != notation : print "===> " + rubric(notations.index(notation))
	
