<?php

	require_once('connection.php');

	$address = $_POST['address'];
	
	
	try{
		
	$stmt = $conn->prepare("select distinct json from addressjsonCache where address like :address;");

	$stmt->execute(array(":address"=>$address));

	$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);
	
	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;


	

?>
