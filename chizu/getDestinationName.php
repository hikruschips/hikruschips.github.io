<?php

	require_once('connection.php');

	$city=$_POST['city'];
	$prefecture = $_POST['prefecture'];
	$hospital = $_POST['hospital'];
	$rou = $_POST['rou'];
	$jyu = $_POST['jyu'];
	$other = $_POST['other'];

	$hospitalS = $_POST['hospitalS'];
	$rouS = $_POST['rouS'];
	$jyuS = $_POST['jyuS'];
	$otherS = $_POST['otherS'];

	$hospitalA = $_POST['hospitalA'];
	$rouA = $_POST['rouA'];
	$jyuA = $_POST['jyuA'];
	$otherA = $_POST['otherA'];

	$hospitalB = $_POST['hospitalB'];
	$rouB = $_POST['rouB'];
	$jyuB = $_POST['jyuB'];
	$otherB = $_POST['otherB'];

	$hospitalC = $_POST['hospitalC'];
	$rouC = $_POST['rouC'];
	$jyuC = $_POST['jyuC'];
	$otherC = $_POST['otherC'];

	$hospitalD = $_POST['hospitalD'];
	$rouD = $_POST['rouD'];
	$jyuD = $_POST['jyuD'];
	$otherD = $_POST['otherD'];
	
	try{
		
		/*
	$stmt = $conn->prepare("select*from branch where city like :city and prefecture like :prefecture union all (select distinct * from destination where city like :city and prefecture like :prefecture and (category like :hospital or category like :rou or category like :jyu or category like :other) order by category);");*/

	$stmt = $conn->prepare("select*from branch where city like :city and prefecture like :prefecture union all (select distinct * from destination where city like :city and prefecture like :prefecture and (
		((category like :hospital and rank like :hospitalS)or (category like :hospital and rank like :hospitalA)or(category like :hospital and rank like :hospitalB)or (category like :hospital and rank like :hospitalC)or(category like :hospital and rank like :hospitalD))
		or
		((category like :rou and rank like :rouS)or (category like :rou and rank like :rouA)or(category like :rou and rank like :rouB)or (category like :rou and rank like :rouC)or(category like :rou and rank like :rouD))
		or
		((category like :jyu and rank like :jyuS)or (category like :jyu and rank like :jyuA)or(category like :jyu and rank like :jyuB)or (category like :jyu and rank like :jyuC)or(category like :jyu and rank like :jyuD))
		or
		((category like :other and rank like :otherS)or (category like :other and rank like :otherA)or(category like :other and rank like :otherB)or (category like :other and rank like :otherC)or(category like :other and rank like :otherD))
		or
		(category like :hospital and (rank not like 'S' and rank not like 'A' and rank not like 'B' and rank not like 'C' and rank not like 'D'))
		or
		(category like :rou and (rank not like 'S' and rank not like 'A' and rank not like 'B' and rank not like 'C' and rank not like 'D'))
		or
		(category like :jyu and (rank not like 'S' and rank not like 'A' and rank not like 'B' and rank not like 'C' and rank not like 'D'))
		or
		(category like :other and (rank not like 'S' and rank not like 'A' and rank not like 'B' and rank not like 'C' and rank not like 'D'))
		
		) 

		order by category);");


	$stmt->execute(array(":city"=>$city,":prefecture"=>$prefecture,

		":hospital"=>$hospital,":hospitalS"=>$hospitalS,":hospitalA"=>$hospitalA,":hospitalB"=>$hospitalB,":hospitalC"=>$hospitalC,":hospitalD"=>$hospitalD,

		":rou"=>$rou,":rouS"=>$rouS,":rouA"=>$rouA,":rouB"=>$rouB,":rouC"=>$rouC,":rouD"=>$rouD,

		":jyu"=>$jyu,":jyuS"=>$jyuS,":jyuA"=>$jyuA,":jyuB"=>$jyuB,":jyuC"=>$jyuC,":jyuD"=>$jyuD,


		":other"=>$other,":otherS"=>$otherS,":otherA"=>$otherA,":otherB"=>$otherB,":otherC"=>$otherC,":otherD"=>$otherD
	));

	$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);
	
	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;


	

?>
