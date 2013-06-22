freedns
=======

FreeDNS project

FreeDNS custom DNS Server
smorz:53
FreeDNS socks proxy
smorz:1080

// dump all active processes to test.txt
ps aux > test.txt
// view all open ports
netstat -tlnp
// test socks 4 proxy
curl --socks4 localhost:1080 google.freedns

// set firefox to use smorz:1080 as socks proxy
// edit firefox about:conf to send DNS over socks 
// (set network.proxy.socks_remote_dns to true)
// edit resolv.conf on smorz to add freedns custom dns server

// alternatively can send all DNS requests over freedns by
// changing system settings to use smorz:53 as the dns server
// do this in control panel in windows or resolv.conf in linux
