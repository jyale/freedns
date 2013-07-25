#!/usr/bin/env python

import sys, _mysql

url = 'NULL'
cid = sys.argv[1]
ip = sys.argv[2]
title=''
sublist = sys.argv[3:]
for x in sublist:
	title += x + " "
print title

# connect to the mySQL server
db=_mysql.connect(host="localhost",user="root",passwd="mysqlrootuser",db="freedns")
db.query("""INSERT INTO domains (url,cid,ip,title) VALUES('NULL','""" + cid + """','""" + ip + """','""" + title + """');""")
