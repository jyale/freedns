<!--
Welcome <?php echo $_POST["number"]; ?>!<br>
IP address: <?php echo $_POST["ipaddr"]; ?><br>
IP address: <?php echo $_POST["code"]; ?>
-->
<?php
$code = $_POST["code"];
$number = $_POST["number"];
$ipaddr = $_POST["ipaddr"];

$savedcode = file_get_contents($number . ".code");
//echo $savedcode;
//echo '<br><br>';
//echo $code;
//echo '<br><br>';

if($savedcode == $code){
	echo("Success!");
	file_put_contents('cellphonedomains/' . $number, $ipaddr);
} else {
	echo("Failure!");
}


?>
