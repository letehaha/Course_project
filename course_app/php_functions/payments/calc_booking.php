<?php

    require_once('../../db-connect.php');

    $id = $_POST['id'];

    $id = intval($id);

	$sql_cost = $db->prepare("SELECT getBookingPrice('$id')");
	$sql_cost->execute();

	$cost = $sql_cost->fetchAll(PDO::FETCH_ASSOC);

    echo current(current($cost));

?>
