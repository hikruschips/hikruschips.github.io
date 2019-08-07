<?php

	require_once('connection.php');

	$name = $_POST['name'];
	$mendansya = $_POST['mendansya'];
	
	try{
		
	$stmt = $conn->prepare("select distinct incharge,date,content,mendansya from input where name=:name and mendansya like :mendansya order by date desc,s_no desc;");

	$stmt->execute(array(":name"=>$name,':mendansya'=>$mendansya));

	$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);
	
	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;


	

?>
