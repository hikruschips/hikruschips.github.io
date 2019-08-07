<?php

	require_once('connection.php');

	
	$branch = $_POST['branch'];
	
	try{
		
		$stmt = $conn->prepare("select*from introduce_input where branch like :branch order by date desc;");

		
	$stmt->execute(array(":branch"=>$branch));
	
		$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );

		print json_encode($result_array);
	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
