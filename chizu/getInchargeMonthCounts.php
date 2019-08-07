<?php

	require_once('connection.php');


	$city = $_POST['city'];
	$prefecture = $_POST['prefecture'];
	$year = $_POST['year'];
	$incharge = $_POST['incharge'];

	
	try{
		
		$stmt = $conn->prepare("select a.mnth as month,coalesce(count(input.s_no),0)as count from (select 1 mnth union all select 2 mnth union all select 3 mnth union all select 4 mnth union all select 5 mnth union all select 6 mnth union all select 7 mnth union all select 8 mnth union all select 9 mnth union all select 10 mnth union all select 11 mnth union all select 12 mnth) a left join (select distinct * from input) as input on a.mnth=month(input.date) and year(input.date)=:year and incharge = :incharge and name in (select name from destination where prefecture like :prefecture and city like :city) group by a.mnth;");
		
		$stmt->execute(array(":prefecture"=>$prefecture,":incharge"=>$incharge,":year"=>$year,":city"=>$city));
	
		$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
