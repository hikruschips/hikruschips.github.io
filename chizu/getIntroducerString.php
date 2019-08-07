<?php

	require_once('connection.php');

	$name = $_POST['name'];
	
	try{
		
	$stmt = $conn->prepare("select distinct introducer from introduce_input where name like :name;");

	$stmt->execute(array(":name"=>$name));

	$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);
	
	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;


	

?>
