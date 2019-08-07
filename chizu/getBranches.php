<?php

	require_once('connection.php');

	$prefecture = $_POST['prefecture'];
	$city = $_POST['city'];
	
	try{
		
		$stmt = $conn->prepare("select * from branch where prefecture like :prefecture and city like :city;");
		
		$stmt->execute(array(":prefecture"=>$prefecture,":city"=>$city));
	
		$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
