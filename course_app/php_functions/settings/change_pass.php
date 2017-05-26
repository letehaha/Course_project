<?php
	
	require_once('../../db-connect.php');
	
	$password = $_POST['password'];

	$sql_password = $db->prepare("
		UPDATE user_passwords 
		SET password = '$password' 
		WHERE id_password = 1
	");
	$sql_password->execute();


?>
