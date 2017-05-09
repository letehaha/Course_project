<?php

	require_once('../../db-connect.php');

	$fname = $_POST['fname'];
	$sname = $_POST['sname'];
	$mname = $_POST['mname'];
	$passport = $_POST['passport'];
	$tel = $_POST['tel'];
	$email = $_POST['email'];
	$country = $_POST['country'];
	$comment = $_POST['comment'];

	$sql = $db->prepare('INSERT INTO clients (first_name, second_name, middle_name, passport_data, phone_number, email, country, comment) VALUES (:first_name, :second_name, :middle_name, :passport, :tel, :email, :country, :comment)');
	$sql->execute([
		':first_name' => $fname,
		':second_name' => $sname,
		':middle_name' => $mname,
		':passport' => $passport,
		':tel' => $tel,
		':email' => $email,
		':country' => $country,
		':comment' => $comment
	]);

?>