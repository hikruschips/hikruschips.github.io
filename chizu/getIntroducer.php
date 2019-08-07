<?php

	require_once('connection.php');

	$name = $_POST['name'];
	$introducer = $_POST['introducer'];
	
	try{
		
	$stmt = $conn->prepare("select distinct introducer,introduced,date,conditions,branch from introduce_input where name=:name and introducer like :introducer order by date desc,s_no desc;");

	$stmt->execute(array(":name"=>$name,":introducer"=>$introducer));

	$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);
	
	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;


	

?>
