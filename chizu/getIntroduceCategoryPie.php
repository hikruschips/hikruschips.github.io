<?php

	require_once('connection.php');

	$prefecture = $_POST['prefecture'];
	$branch = $_POST['branch'];
	$city = $_POST['city'];
	
	try{
		
		$stmt = $conn->prepare("select destination.category,count(introduce_input.s_no)as count from destination,(select distinct * from introduce_input)as introduce_input where introduce_input.name=destination.name and destination.prefecture like :prefecture and destination.city like :city and introduce_input.branch like :branch group by destination.category;");
		
		$stmt->execute(array(":prefecture"=>$prefecture,":branch"=>$branch,":city"=>$city));
	
		$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
