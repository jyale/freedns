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




?>




<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Crypto-Book</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- Le styles -->
    <link href="assets/css/bootstrap.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 60px;
        padding-bottom: 40px;
      }
    </style>
    <link href="assets/css/bootstrap-responsive.css" rel="stylesheet">

    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="assets/js/html5shiv.js"></script>
    <![endif]-->

    <!-- Fav and touch icons -->
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="assets/ico/apple-touch-icon-114-precomposed.png">
      <link rel="apple-touch-icon-precomposed" sizes="72x72" href="assets/ico/apple-touch-icon-72-precomposed.png">
                    <link rel="apple-touch-icon-precomposed" href="assets/ico/apple-touch-icon-57-precomposed.png">
                                   <link rel="shortcut icon" href="assets/ico/favicon.png">
  </head>
  
  
<BR>
  <body>

  
    <div class="container">

      <!-- Example row of columns -->
      <div class="row">
		<div class="span4">
          <h2>
<?php if($savedcode == $code){
	echo("Success!");
	file_put_contents('cellphonedomains/' . $number, $ipaddr);
} else {
	echo("Failure!");
}
?>
</h2>
<?
if($savedcode == $code){
	echo("<p>You have successfully registered your cellphone domain: <a href='http://" . $number . ".freedns'>" . $number . ".freedns</a></p><p>It may take up to 5 minutes for your changes to take effect</p>");

} else {
	echo("<p>You entered the incorrect code</p>");
}
?>
          <p><a class="btn" href="http://www.cs.yale.edu/homes/jrm95/freedns.html">FreeDNS homepage &raquo;</a></p>
		  
        </div>
       
      </div>

      <hr>

      <footer>
        <p>&copy; <a href="http://www.cs.yale.edu/homes/jrm95/freedns.html">FreeDNS</a> 2013.</p>
      </footer>    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/bootstrap-transition.js"></script>
    <script src="assets/js/bootstrap-alert.js"></script>
    <script src="assets/js/bootstrap-modal.js"></script>
    <script src="assets/js/bootstrap-dropdown.js"></script>
    <script src="assets/js/bootstrap-scrollspy.js"></script>
    <script src="assets/js/bootstrap-tab.js"></script>
    <script src="assets/js/bootstrap-tooltip.js"></script>
    <script src="assets/js/bootstrap-popover.js"></script>
    <script src="assets/js/bootstrap-button.js"></script>
    <script src="assets/js/bootstrap-collapse.js"></script>
    <script src="assets/js/bootstrap-carousel.js"></script>
    <script src="assets/js/bootstrap-typeahead.js"></script>

  </body>
</html>




