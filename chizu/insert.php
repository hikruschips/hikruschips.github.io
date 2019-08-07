<?php

	require_once('connection.php');

	$name = $_POST['name'];
	$incharge = $_POST['incharge'];
	$date = $_POST['date'];
	$content = $_POST['content'];
	$mendansya = $_POST['mendansya'];
	
	try{
		
		$stmt = $conn->prepare("insert into input(name,incharge,date,content,mendansya) values(:name,:incharge,:date,:content,:mendansya) on duplicate key update name=:name,incharge=:incharge,date=:date,content=:content,mendansya=:mendansya;");

		$stmt->execute(array(":name"=>$name,":incharge"=>$incharge,":date"=>$date,":content"=>$content,":mendansya"=>$mendansya));
	
		echo "入力完了しました。以下の通りです：\n営業先：" . $name . "\n担当者：" . $incharge . "\n面談者：" . $mendansya . "\n日時：" . $date . "\n内容：" . $content . "\n" . "お疲れ様です。";

	}
	catch(PDOException $e){
		echo $stmt . "<br>" . $e->getMessage();
	}

	$conn = null;

?>
