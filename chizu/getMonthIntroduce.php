<?php

	require_once('connection.php');

	$city = $_POST['city'];
	$prefecture = $_POST['prefecture'];
	$year = $_POST['year'];
	$branch = $_POST['branch'];
	
	try{
		
		$stmt = $conn->prepare("select a.mnth as month,coalesce(count(introduce_input.s_no),0)as count from (select 1 mnth union all select 2 mnth union all select 3 mnth union all select 4 mnth union all select 5 mnth union all select 6 mnth union all select 7 mnth union all select 8 mnth union all select 9 mnth union all select 10 mnth union all select 11 mnth union all select 12 mnth) a left join introduce_input on a.mnth=month(introduce_input.date) and year(introduce_input.date)=:year  and introduce_input.name in (select name from destination where prefecture like :prefecture and city like :city) and introduce_input.branch like :branch group by a.mnth;");
		
		$stmt->execute(array(":prefecture"=>$prefecture,":year"=>$year,":city"=>$city,":branch"=>$branch));
	
		$result_array = $stmt->fetchAll( PDO::FETCH_ASSOC );
	
	print json_encode($result_array);

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
