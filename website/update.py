#!/usr/bin/env python

import sys, _mysql, hashlib

url = 'NULL'
# string that hashes to get CID
string = sys.argv[1]
ip = sys.argv[2]
title=''
sublist = sys.argv[3:]
for x in sublist:
	title += x + " "
print title

cid = hashlib.sha1(string).hexdigest()

# connect to the mySQL server
db=_mysql.connect(host="localhost",user="root",passwd="mysqlrootuser",db="freedns")
# delete existing query
db.query("""DELETE FROM domains WHERE cid LIKE '""" + cid + """';""")
# insert new CID->IP mapping
db.query("""INSERT INTO domains (url,cid,ip,title) VALUES('NULL','""" + cid + """','""" + ip + """','""" + title + """');""")
