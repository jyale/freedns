#!/usr/bin/env python

import urllib2

response = urllib2.urlopen('http://mahan.webfactional.com/sms/freedns/sms/cellphonedomains/')
html = response.read()

print html
