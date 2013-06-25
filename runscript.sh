#!/bin/bash
# Shell script to run the DNS server and Socks proxy
# Must run as Sudo otherwise will get error

# kill the processes if they're already running
pkill python
pkill twistd
# now run the new DNS server
twistd -y secondtestserver.py
# run the Socks proxy
python proxy.py &
echo "done"
