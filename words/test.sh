#!/bin/bash
# script to read a file and lookup all .com domains and dump name and IP
# to output file

# cat weak | xargs -0 -I % echo %

# dig google.com +short | head -n 1

while read p; do
  a='.com';
  q=$p$a;
  out=$(dig $q +short | head -n 1);
  done=$q", "$out;
  echo $done >> weak.out
done < weak
