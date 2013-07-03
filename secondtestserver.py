from twisted.names import dns, server, client, cache
from twisted.application import service, internet
import string
from twisted.python import log

class MapResolver(client.Resolver):
	"""
	Resolves names by looking in a mapping. 
	If `name in mapping` then mapping[name] should return a IP
	else the next server in servers will be asked for name	
	"""
	def __init__(self, mapping, servers):
		self.mapping = mapping
		client.Resolver.__init__(self, servers=servers)
		self.ttl = 10

	# lookup A records (IP addresses)
	def lookupAddress(self, name, timeout = None):
		# check if name is in mapping
		# if name in self.mapping:
		if name.endswith('.freedns'):
			# get the result from mapping
			# result = self.mapping[name] 
			shortname = name.replace('.freedns','')
			
			log.msg('Hello world.')
			log.msg('url:' + name)
			
			# if have an invalid name redirect to google.com
			result = '74.125.28.113'			
			# now check if name is in fact valid 32 chars for dsa fingerprints, 40 chars for sha1 hashes
			if(len(shortname) == 32) or (len(shortname) == 40):
				if(all(c in string.hexdigits for c in shortname)):
					# redirect to DeDIS group web page if we have a valid freedns name (ssh-keygen public key fingerprint)
					# example valid freedns name: 6f700b83be72c6e24c45612e04717103.freedns
					result = '128.36.233.146'
				#else:		
				# yale.edu ip addr
				# result = '130.132.35.53' 
			
			log.msg('result:' + result)
			
			if(shortname == "bryan-at-gmail.com"):
				x = self._lookup("brynosaurus.com", dns.IN, dns.A, timeout)
				log.msg("bryan " + str(x.name))
				return x
				
			def packResult( value ):
				return [
						(dns.RRHeader(name, dns.A, dns.IN, self.ttl, dns.Record_A(value, self.ttl)),), (), ()
				]
			#x = packResult(result) # put it in a A Record
			x = packResult(result)
			
			
			log.msg("DNS record: " + str(dns.Record_A(result, self.ttl)))
			log.msg("CNAME test: " + str(dns.Record_CNAME('see-mail.herokuapp.com',self.ttl)))
			y = [(dns.RRHeader(name, dns.CNAME, dns.IN, self.ttl, dns.Record_CNAME('see-mail.herokuapp.com',self.ttl)),), (), ()]
			log.msg("Packed result: " + str(x))
			log.msg("Packed CNAME: " + str(y))
			
			return x
		else:
			x = self._lookup(name, dns.IN, dns.A, timeout)
			print x
			return x
	
	# CNAME lookups
	def lookupCanonicalName(self, name, timeout=None):
		log.msg("CNAME lookup!!!" + name)
		y = [(dns.RRHeader(name, dns.CNAME, dns.IN, self.ttl, dns.Record_CNAME('see-mail.herokuapp.com',self.ttl)),), (), ()]
		
		x = self._lookup(name, dns.IN, dns.A, timeout)
		return x
	

## this sets up the application
application = service.Application('dnsserver', 1, 1)

## set up the mapping
# only relevant if we want to actually map to new addresses instead of 
# just redirect .freedns names to one page
mapping = {'google.com' : '127.0.0.1', 'yale.edu' : '74.125.228.73', 'weakabcd.com' : '74.125.228.73'}

# set up a resolver that uses the mapping or a secondary nameserver
p2presolver = MapResolver(mapping, servers=[('8.8.8.8', 53)])

# create the protocols
f = server.DNSServerFactory(caches=[cache.CacheResolver()], clients=[p2presolver])
p = dns.DNSDatagramProtocol(f)
f.noisy = p.noisy = False

# register as tcp and udp
ret = service.MultiService()
PORT=53

for (klass, arg) in [(internet.TCPServer, f), (internet.UDPServer, p)]:
	s = klass(PORT, arg)
	s.setServiceParent(ret)

# run all of the above as a twistd application
ret.setServiceParent(service.IServiceCollection(application))

# run it through twistd
if __name__ == '__main__':
	import sys
	print "Usage: twistd -y %s" % sys.argv[0]