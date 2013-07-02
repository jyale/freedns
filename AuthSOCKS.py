#! /usr/bin/python
from twisted.protocols import socks
from twisted.python import log

class AuthSOCKS(socks.SOCKSv4Factory):
	def __init__(self, logfile):
		# print logfile
		log.startLogging(open('weak.log', 'w'))
		socks.SOCKSv4Factory.__init__(self, logfile)   
	   
	def buildProtocol(self, addr):
		# the ip address of the user connecting to the socks proxy
		ipaddr = addr.host
		print ipaddr
		# limit socks proxy access to yale network
		# yale ip address range from:
		# http://its.yale.edu/how-to/finding-your-ip-and-network-hardware-addresses

		# log all connections
		log.msg("New client connected: " + ipaddr)

		# uncomment following line to limit access to Yale network
		if ipaddr.startswith('130.132.') or ipaddr.startswith('128.36.'):
			return socks.SOCKSv4Factory.buildProtocol(self,addr)
				
	   
	 
