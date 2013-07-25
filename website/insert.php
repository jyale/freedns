<?php
$cid=$_POST[firstname];
$ip=$_POST[lastname];
$title=$_POST[age];

echo $title;
echo exec('./insert.py ' . $cid . ' ' . $ip . ' ' . $title);

?>


