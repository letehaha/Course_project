<?php

    require_once('../../db-connect.php');

    $id = $_POST['id'];
    $val = $_POST['val'];

    $id = intval($id);
    $val = intval($val);

	$sql_cost = $db->prepare("CALL update_accommodation_value('$val','$id')");
	$sql_cost->execute();

	$cost = $sql_cost->fetchAll(PDO::FETCH_ASSOC);


?>
