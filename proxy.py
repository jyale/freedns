#! /usr/bin/python
from twisted.internet import reactor
from twisted.protocols import socks
# import socks 

if '__main__' == __name__:
    reactor.listenTCP(1080,socks.SOCKSv4Factory("./socks.log"))
    reactor.run()