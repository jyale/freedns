#!/usr/bin/env python
import sys
from mechanize import Browser
br = Browser()

# print sys.argv[1]

fname="domains.csv"
with open(fname) as f:
    content = f.readlines()
for line in content:
	print line
	br.open("http://" + line)
	print br.title()
