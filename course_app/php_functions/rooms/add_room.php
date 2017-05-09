<?php

	require_once('../../db-connect.php');

	$f_name = $_POST['f_name'];
	$s_name = $_POST['s_name'];
	$m_name = $_POST['m_name'];
	$position = $_POST['list-position'];


	$sql = $db->prepare("INSERT INTO employees (first_name, second_name, middle_name, id_position) VALUES (:first_name, :second_name, :middle_name, :id_position)");
	$sql->execute([
		':first_name' => $f_name,
		':second_name' => $s_name,
		':middle_name' => $m_name,
		':id_position' => $position
	]);

?>