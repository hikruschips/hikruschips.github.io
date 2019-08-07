
<?php

	require_once('mysql_pw.php');
	
		$conn = new PDO("mysql:host=$servername;dbname=$dbname",$username,$password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
		//set the PDO error mode to exception
		$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
		
?>

