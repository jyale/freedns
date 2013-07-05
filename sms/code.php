<?php

$number = $_POST["number"];
$ip = $_POST["ipaddr"];

$code = uniqid();

file_put_contents($number,$code);

// Download/Install the PHP helper library from twilio.com/docs/libraries.
// This line loads the library
require('twilio/Services/Twilio.php');
// Your Account Sid and Auth Token from twilio.com/user/account
$sid = file_get_contents("sid");
$token = file_get_contents("token");
$client = new Services_Twilio($sid, $token);

echo $sid;
	$message = $client->account->sms_messages->create("+12037120067", $number, $code, array());
	echo $message->sid;
	echo '<br>weak<br>';

?>



<html>
<body>

Welcome <?php echo $_POST["number"]; ?>!<br>
IP address: <?php echo $_POST["ipaddr"]; ?>


</body>
</html> 