<?php

	require_once('../../db-connect.php');

	$id_client 		= $_POST['id_client'];
	$first_name		= $_POST['first_name'];
	$second_name	= $_POST['second_name'];
	$middle_name	= $_POST['middle_name'];
	$passport 		= $_POST['passport'];
	$phone 			= $_POST['phone'];
	$email 			= $_POST['email'];
	$country 		= $_POST['country'];
	$comment 		= $_POST['comment'];

	$sql = $db->prepare('
		UPDATE clients 
		SET first_name 		= :first_name, 
			second_name 	= :second_name, 
			middle_name 	= :middle_name, 
			passport_data 	= :passport,
			phone_number 	= :phone,
			email 			= :email,
			country 		= :country,
			comment 		= :comment
		WHERE id_client = :id_client
	');

	$sql->execute([
		':id_client' => $id_client,
		':first_name' => $first_name,
		':second_name' => $second_name,
		':middle_name' => $middle_name,
		':passport' => $passport,
		':phone' => $phone,
		':email' => $email,
		':country' => $country,
		':comment' => $comment
	]);

?>