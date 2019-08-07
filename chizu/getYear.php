<?php

	require_once('connection.php');
	
	try{
		
	$stmt = $conn->prepare("select distinct year(date) as year from input where date is not null;");

	$stmt->execute();
	$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print_r (json_encode($result_array));
	
	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;


	

?>
