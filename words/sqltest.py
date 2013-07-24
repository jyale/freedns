import _mysql

db=_mysql.connect(host="localhost",user="root",
                      passwd="mysqlrootuser",db="freedns")

db.query("""select * from domains where url like 'zebra.com';""")
r = db.store_result()

while 1:
    row = r.fetch_row()
    if not row: break
    print row

print "WEAKKK!!!"
