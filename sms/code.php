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

<!DOCTYPE html>   
<html lang="en">   
<head>   
<meta charset="utf-8">   
<title>Register cellphone</title>   
<meta name="description" content="weak">   
<link href="assets/css/bootstrap.css" rel="stylesheet">  

</head>  
<body>  


<form class='form-horizontal' enctype="multipart/form-data" action="insert.php" method="POST">
<fieldset>
 <legend>Enter the security code sent to your phone: </legend>

<input type="text" class="hide" name="number" value="<? echo $number ?>" hidden>
<input type="text" class="hide" name="ipaddr" value="<? echo $ip ?>" hidden>

 <div class="control-group">  
		
	     <label class="control-label" for="area">Security code: </label>  
            <div class="controls">  
              <input class="text" name="code"></input>  
            </div>  
          </div>  
<div class="form-actions">  
<button type="submit" class="btn btn-primary">Next &raquo</button>  
</div>    

 </fieldset> 
</form>  
</body>  
</html>  


