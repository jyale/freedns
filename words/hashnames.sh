#!/bin/bash
# script to read a file and lookup all .com domains and dump name and IP
# to output file

# cat weak | xargs -0 -I % echo %

# dig google.com +short | head -n 1

while read p; do
  out=$(echo -n $p | openssl sha1);
  done=$p", "$out;
  echo $done >> hashed.out;
  echo $done;
done < linuxdomains.csv
