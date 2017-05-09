<?php
	
	$db_host = 'localhost';
	$db_name = 'hotel';
	$db_user = 'root';
	$db_pass = '';

	$db = new PDO('mysql:host='.$db_host.';dbname='.$db_name.';charset=UTF8', $db_user,  $db_pass);
	
?>