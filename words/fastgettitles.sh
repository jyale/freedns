#!/bin/bash
# script to read a file and lookup all .com domains and dump name and IP
# to output file

# cat weak | xargs -0 -I % echo %

# dig google.com +short | head -n 1

while read p; do
  q="http://"$p;
  #echo $q;

  out=$(wget $q -O - -nv -q --timeout=1 -t 1| awk -vRS="</title>" '/<title>/{gsub(/.*<title>|\n+/,"");print;exit}');
  done=$p", "$out
  echo $done >> fasttitles.out;
  echo $done;
done < linuxdomains.csv
