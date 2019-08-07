<?php

	require_once('connection.php');

	$name = $_POST['name'];
	$introducer = $_POST['introducer'];
	$introduced = $_POST['introduced'];
	$date = $_POST['date'];
	$conditions = $_POST['conditions'];
	$branch = $_POST['branch'];
	
	try{
		
		$stmt = $conn->prepare("delete from introduce_input where name=:name and introducer=:introducer and introduced=:introduced and date=:date and conditions=:conditions and branch =:branch;");
		
		$stmt->execute(array(":name"=>$name,":introducer"=>$introducer,":introduced"=>$introduced,":date"=>$date,":conditions"=>$conditions,":branch"=>$branch));
	
		echo "以下の内容を削除しました：\n名前：" . $name . "\n紹介者：" . $introducer . "\n被紹介者：" . $introduced . "\n日時：" . $date . "\n状態：" . $conditions;

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
