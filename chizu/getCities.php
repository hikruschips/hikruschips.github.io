<?php

	require_once('connection.php');

	$prefecture = $_POST['prefecture'];
	
	try{
		
		$stmt = $conn->prepare("select distinct city from destination where prefecture like :prefecture;");
		
		$stmt->execute(array(":prefecture"=>$prefecture));
	
		$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
