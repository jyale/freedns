#!/usr/bin/env python
import sys
from mechanize import Browser
br = Browser()

# print sys.argv[1]

fname="weak.out"
with open(fname) as f:
    content = f.readlines()
for line in content[10]:
	url = line.split(',')[0]
	br.open("http://" + url)
	print br.title()
