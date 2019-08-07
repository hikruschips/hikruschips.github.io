<?php

	require_once('connection.php');

	$address = $_POST['address'];
	$json = $_POST['json'];
	
	try{
		
		$stmt = $conn->prepare("insert into addressjsonCache(address,json) values(:address,:json) on duplicate key update json=:json;");

		$stmt->execute(array(":address"=>$address,":json"=>$json));
	
		echo "";

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
