#!/usr/bin/env python
import re
from mechanize import Browser
import urllib2

br = Browser()
br.open("http://mahan.webfactional.com/sms/freedns/sms/cellphonedomains/")

# words to exclude irrelevant links
words = ['Name','Last modified','Size','Description','Parent Directory']

mapping = dict()

# get all the cellphone numbers with registered IP addresses
# .links() optionally accepts the keyword args of .follow_/.find_link()
for link in br.links():
    if link.text not in words:
	print link.text
	# get the corresponding IP address
	ipaddr = urllib2.urlopen('http://mahan.webfactional.com/sms/freedns/sms/cellphonedomains/' + link.text).read()
	mapping[link.text] = ipaddr

print mapping
    #br.follow_link(link)  # takes EITHER Link instance OR keyword args
    #br.back()
