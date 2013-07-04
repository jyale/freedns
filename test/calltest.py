from os import system
import os

y = os.popen("python lookup.py google.com").read().replace('\n','')
print y
