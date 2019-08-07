<?php

	require_once('connection.php');

	$name = $_POST['destinationName'];
	$city = $_POST['destinationCity'];
	$address = $_POST['destinationAddress'];
	$phone = $_POST['destinationPhone'];
	$fax = $_POST['destinationFax'];
	
	$rank = $_POST['destinationRank'];
	$category = $_POST['destinationCategory'];
	
	try{
		
		$stmt = $conn->prepare("insert into destination(name,city,address,phone,fax,rank,category) values(:name,:city,:address,:phone,:fax,:rank,:category);");

		$stmt->execute(array(":name"=>$name,":city"=>$city,":address"=>$address,":phone"=>$phone,":fax"=>$fax,":rank"=>$rank,":category"=>$category));
	
		echo "入力完了しました。" . "name: " . $name . "city" . $city . "address" . $address . "phone" . $phone . "fax" . $fax . "rank" . $rank . "category" . $category;

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
