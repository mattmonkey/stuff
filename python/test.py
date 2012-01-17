#!/usr/bin/python
# -*- coding: utf8 -*-

import os
import argparse

try:
	os.system("ls > /test.txt")
except Exception , e:
	print(type(e))


#parser = argparse.ArgumentParser(description='Process some integers.')
#parser.add_argument('integers', metavar='N', type=int, nargs='+',
                   #help='an integer for the accumulator')
#parser.add_argument('--sum', dest='accumulate', action='store_const',
                   #const=sum, default=max,
                   #help='sum the integers (default: find the max)')

#args = parser.parse_args()
#print args.accumulate(args.integers)	
