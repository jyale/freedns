<?php
$string=$_POST[firstname];
$ip=$_POST[lastname];
$title=$_POST[age];

echo $title;

// replace spaces to allow passing by command line to python script
$string = str_replace(' ', '-', $string);

echo $string;


echo exec('./update.py ' . $string . ' ' . $ip . ' ' . $title);

?>


