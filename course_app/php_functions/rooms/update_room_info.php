<?php

	require_once('../../db-connect.php');

	$first_name 	= $_POST['first_name'];
	$second_name	= $_POST['second_name'];
	$middle_name	= $_POST['middle_name'];
	$id_position	= $_POST['id_position'];
	$id_employee 	= $_POST['id_employee'];

	$sql = $db->prepare("UPDATE employees SET first_name = :first_name, second_name = :second_name, middle_name = :middle_name, id_position = :id_position WHERE id_employee = :id_employee");

	$sql->execute([
		':first_name' => $first_name,
		':second_name' => $second_name,
		':middle_name' => $middle_name,
		':id_position' => $id_position,
		':id_employee' => $id_employee
	]);

?>