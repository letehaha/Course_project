<?php

	require('../../db-connect.php');

	$client_id = $_POST['client_id'];
	$sql_delete = $db->prepare("DELETE FROM clients WHERE clients.id_client = ".$client_id."");
	$sql_delete->execute();
	echo $client_id;

?>