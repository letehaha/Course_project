<?php

	require_once('../db-connect.php');

	$password = $_POST['password'];

	$sql = $db->prepare('SELECT password FROM user_passwords');
	$sql->execute();

	$password = $sql->fetchAll(PDO::FETCH_ASSOC);

	foreach ($password as $value) {
		echo $value['password'];
	}

?>
