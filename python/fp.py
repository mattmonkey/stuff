#!/usr/bin/python
# -*- coding: utf8 -*-
# 2012-02-07

def curry(f, *args, **kws):
	rq = f.func_code.co_argcount - len(f.func_defaults or ())
	def nf(*fargs, **fkws):
		nargs, nkws = args+fargs, kws.copy()
		nkws.update(fkws)
		if len(nargs)+len(nkws) >= rq:
			return f(*nargs, **nkws)
		return curry(f, *nargs, **nkws)
	return nf 

def add(x,y):
	return x+y

add2 = curry(add,1)
print add2(100)

def thisIsliving(fun):
	def living(*args, **kw):
		return fun(*args, **kw) + '活着就是吃嘛。'
	return living

@thisIsliving
def whatIsLiving():
	"什么是活着"
	return '对啊，怎样才算活着呢？'

print whatIsLiving()
print whatIsLiving.__doc__

print

from functools import update_wrapper
def thisIsliving(fun):
	def living(*args, **kw):
		return fun(*args, **kw) + '活着就是吃嘛。'
	return update_wrapper(living, fun)

@thisIsliving
def whatIsLiving():
	"什么是活着"
	return '对啊，怎样才算活着呢？'

print whatIsLiving()
print whatIsLiving.__doc__
