<?php

	require('../../db-connect.php');

	$employee_id = $_POST['employee_id'];
	$sql_delete = $db->prepare("DELETE FROM employees WHERE employees.id_employee = ".$employee_id."");
	$sql_delete->execute();
	echo $employee_id;

?>