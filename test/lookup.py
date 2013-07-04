#!/usr/bin/env python

"""
Prints the results of an Address record lookup, Mail-Exchanger record
lookup, and Nameserver record lookup for the given hostname for a
given hostname.

To run this script:
$ python testdns.py <hostname>
e.g.:
$ python testdns.py www.google.com
"""
import sys

from twisted.names import client
from twisted.internet import defer, reactor
from twisted.names import dns, error

# Google dns server
r = client.Resolver('8.8.8.8')
# client default dns server
# r = client.Resolver('/etc/resolv.conf')

def formatResult(a, heading):
	answer, authority, additional = a
	lines = ['# ' + heading]
	for a in answer:
		line = str(a.payload)
		line = line.replace('<A address=','')
		line = line.split(' ttl=')[0]
		return line
		# line = [
			# a.name,
			# dns.QUERY_CLASSES.get(a.cls, 'UNKNOWN (%d)' % (a.cls,)),
			# a.payload]
		# line = [line.replace('<A address=','')]
		# line = weak.split(' ttl=')[0]
		# line = [weak]
		# lines.append(' '.join(str(word) for word in line))

	# return '\n'.join(line for line in lines)
	return lines[1]


def printError(f):
	f.trap(defer.FirstError)
	f = f.value.subFailure
	f.trap(error.DomainError)
	print f.value.__class__.__name__, f.value.message.queries


def printResults(res):
	# for r in res:
	print res[0].replace('\n','')
		# print


if __name__ == '__main__':
	domainname = sys.argv[1]

	d = defer.gatherResults([
			r.lookupAddress(domainname).addCallback(formatResult,'Addresses'),], consumeErrors=True)
	d.addCallback(printResults)

	d.addBoth(lambda ign: reactor.stop())

	reactor.run()
