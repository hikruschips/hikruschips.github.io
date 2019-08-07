<?php

	require_once('connection.php');

	$name = $_POST['name'];
	
	$date = $_POST['date'];
	$introducer = $_POST['introducer'];
	$introduced = $_POST['introduced'];
	$conditions = $_POST['conditions'];
	$branch = $_POST['branch'];
	
	try{
		
		$stmt = $conn->prepare("insert into introduce_input(name,date,introducer,introduced,conditions,branch) values(:name,:date,:introducer,:introduced,:conditions,:branch) on duplicate key update name=:name,date=:date,introducer=:introducer,introduced=:introduced,conditions=:conditions,branch=:branch;");

		$stmt->execute(array(":name"=>$name,":date"=>$date,":introducer"=>$introducer,":introduced"=>$introduced,":conditions"=>$conditions,":branch"=>$branch));
	
		echo "紹介者入力完了しました。以下の通りです：\n名前：" . $name . "\n拠点：" . $branch . "\n紹介者：" . $introducer . "\n被紹介者：" . $introduced . "\n日時：" . $date . "\n状態：" . $conditions . "\nお疲れ様です。";

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
