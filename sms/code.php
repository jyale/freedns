<?php
$number = $_POST["number"];
$ip = $_POST["ipaddr"];
file_put_contents($number,$ip);
echo exec("./write.py " + $number + " " + $ip);

?>

<html>
<body>

Welcome <?php echo $_POST["number"]; ?>!<br>
IP address: <?php echo $_POST["ipaddr"]; ?>


</body>
</html> 