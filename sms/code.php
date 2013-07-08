<?php

$number = $_POST["number"];
$ip = $_POST["ipaddr"];

$code = substr(uniqid(),7);

file_put_contents($number . ".code",$code);

require('twilio/Services/Twilio.php');
$sid = file_get_contents("sid");
$token = file_get_contents("token");
$client = new Services_Twilio($sid, $token);

//echo $code;
//echo('<br>');
	$message = $client->account->sms_messages->create("+12037120067", $number, $code, array());
//	echo $message->sid;
//	echo '<br>weak<br>';

?>



<html>
<body>

Phone number: <?php echo $_POST["number"]; ?><br>
IP address: <?php echo $_POST["ipaddr"]; ?>
<br>

<form action="insert.php" method="post">
<input type="text" name="number" value="<? echo $number ?>" hidden>
<input type="text" name="ipaddr" value="<? echo $ip ?>" hidden>
Code: <input type="text" name="code"><br>
<input type="submit" >
</form>


</body>
</html> 
