#!/bin/bash
# Shell script to kill running servers
# Must run as Sudo otherwise will get error

# kill the processes if they're already running
pkill python
pkill -9 twistd
