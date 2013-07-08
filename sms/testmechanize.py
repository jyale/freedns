#!/usr/bin/env python
import re
from mechanize import Browser

br = Browser()
br.open("http://mahan.webfactional.com/sms/freedns/sms/cellphonedomains/")

words = ['Name','Last modified','Size','Description','Parent Directory']

# ...

# .links() optionally accepts the keyword args of .follow_/.find_link()
for link in br.links():
    if link.text not in words:
	 print link.text
    #br.follow_link(link)  # takes EITHER Link instance OR keyword args
    #br.back()
