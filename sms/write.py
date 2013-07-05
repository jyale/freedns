#!/usr/bin/env python
import sys

f = open(sys.argv[1],"w")
f.write(sys.argv[2])
f.close
print "it's done!"

