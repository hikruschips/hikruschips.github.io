<?php

	require_once('connection.php');

	$prefecture = $_POST['prefecture'];
	$year = $_POST['year'];
	$month = $_POST['month'];
	$city=$_POST['city'];
	
	try{
		
		$stmt = $conn->prepare("select incharge,count(*) from input where name in(select name from destination where city like :city and prefecture like :prefecture) and year(date)=:year and month(date)=:month and incharge is not null group by incharge;");

	$stmt->execute(array(":prefecture"=>$prefecture,":year"=>$year,":month"=>$month,":city"=>$city));

	$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);
	
	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;


	

?>
