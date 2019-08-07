<?php

	require_once('connection.php');

	$name = $_POST['name'];
	$incharge = $_POST['incharge'];
	$date = $_POST['date'];
	$content = $_POST['content'];
	$mendansya = $_POST['mendansya'];
	
	try{
		
		$stmt = $conn->prepare("delete from input where name=:name and incharge=:incharge and date=:date and content=:content and mendansya=:mendansya;");
		
		$stmt->execute(array(":name"=>$name,":incharge"=>$incharge,":date"=>$date,":content"=>$content,":mendansya"=>$mendansya));
	
		echo "以下の内容を削除しました：\n名前：" . $name . "\n担当者：" . $incharge . "\n日時：" . $date . "\n内容：" . $content . "\n面談者：" . $mendansya;

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
