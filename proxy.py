#! /usr/bin/python
from twisted.internet import reactor
#from twisted.protocols import socks
from AuthSOCKS import AuthSOCKS
# import socks 

if '__main__' == __name__:
    reactor.listenTCP(1080,AuthSOCKS("./socks.log"))
    reactor.run()