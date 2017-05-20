<?php

	require_once('../../db-connect.php');

	$args_length = $_POST['args'];

	$date_in 			= $_POST['date_in'];
	$date_out 			= $_POST['date_out'];
	$booking_checkbox 	= $_POST['booking_checkbox'];
	$room_number 		= $_POST['room_number'];
	$payment_method 	= $_POST['payment_method'];
	$client_id 			= $_POST['client_id'];
	$check_new_client 	= $_POST['check_new_client'];
	$amount_to_pay 		= $_POST['amount_to_pay'];
	$amount_pay 		= $_POST['amount_pay'];
	$amount_to_booking 	= $_POST['amount_to_booking'];

	

	if($args_length == '1'){
		$add_payment = $db->prepare('INSERT INTO payments (payment_method, id_client, amount_to_pay, amount_pay) VALUES (:payment_method, :client_id, :amount_to_pay, :amount_pay)');
		$add_payment->execute([
			':payment_method' 	=> $payment_method,
			':client_id' 		=> $client_id,
			':amount_to_pay' 	=> $amount_to_pay,
			':amount_pay' 		=> $amount_pay
		]);
		$payment_id = $db->lastInsertId(); // get id payments for the id to accommodation

		if($booking_checkbox == 'true'){
			$add_accommodation = $db->prepare('
				INSERT INTO accommodation (date_in, date_out, booking_status, id_room, payments_id_payment, clients_id_client) 
				VALUES (:date_in, :date_out, :booking_status, :room_number, :payment_id, :client_id)
			');
			$add_accommodation->execute([
				':date_in' 			=> $date_in,
				':date_out' 		=> $date_out,
				':booking_status' 	=> true,
				':room_number' 		=> $room_number,
				':payment_id' 		=> $payment_id,
				':client_id' 		=> $client_id
			]);
		} else if($booking_checkbox == 'false'){
			$add_accommodation = $db->prepare('
				INSERT INTO accommodation (date_in, date_out, booking_status, id_room, payments_id_payment, clients_id_client) 
				VALUES (:date_in, :date_out, :booking_status, :room_number, :payment_id, :client_id)
			');
			$add_accommodation->execute([
				':date_in' 			=> $date_in,
				':date_out' 		=> $date_out,
				':booking_status' 	=> false,
				':room_number' 		=> $room_number,
				':payment_id' 		=> $payment_id,
				':client_id' 		=> $client_id
			]);
		}
	} else if($args_length == '2'){
		$fname 		= $_POST['fname'];
		$sname 		= $_POST['sname'];
		$mname 		= $_POST['mname'];
		$passport 	= $_POST['passport'];
		$tel 		= $_POST['tel'];
		$email 		= $_POST['email'];
		$country 	= $_POST['country'];
		$comment 	= $_POST['comment'];

		$add_client = $db->prepare('
			INSERT INTO clients (first_name, second_name, middle_name, passport_data, phone_number, email, country, comment) 
			VALUES (:fname, :sname, :mname, :passport, :tel, :email, :country, :comment)
		');
		$add_client->execute([
			':fname' 	=> $fname,
			':sname' 	=> $sname,
			':mname' 	=> $mname,
			':passport' => $passport,
			':tel' 		=> $tel,
			':email' 	=> $email,
			':country' 	=> $country,
			':comment' 	=> $comment
		]);
		$client_id = $db->lastInsertId(); // get id payments for the id to accommodation


		$add_payment = $db->prepare('INSERT INTO payments (payment_method, id_client, amount_to_pay, amount_pay) VALUES (:payment_method, :client_id, :amount_to_pay, :amount_pay)');
		$add_payment->execute([
			':payment_method' 	=> $payment_method,
			':client_id' 		=> $client_id,
			':amount_to_pay' 	=> $amount_to_pay,
			':amount_pay' 		=> $amount_pay
		]);
		$payment_id = $db->lastInsertId(); // get id payments for the id to accommodation

		if($booking_checkbox == 'true'){
			$add_accommodation = $db->prepare('
				INSERT INTO accommodation (date_in, date_out, booking_status, id_room, payments_id_payment, clients_id_client) 
				VALUES (:date_in, :date_out, :booking_status, :room_number, :payment_id, :client_id)
			');
			$add_accommodation->execute([
				':date_in' 			=> $date_in,
				':date_out' 		=> $date_out,
				':booking_status' 	=> true,
				':room_number' 		=> $room_number,
				':payment_id' 		=> $payment_id,
				':client_id' 		=> $client_id
			]);
		} else if($booking_checkbox == 'false'){
			$add_accommodation = $db->prepare('
				INSERT INTO accommodation (date_in, date_out, booking_status, id_room, payments_id_payment, clients_id_client) 
				VALUES (:date_in, :date_out, :booking_status, :room_number, :payment_id, :client_id)
			');
			$add_accommodation->execute([
				':date_in' 			=> $date_in,
				':date_out' 		=> $date_out,
				':booking_status' 	=> false,
				':room_number' 		=> $room_number,
				':payment_id' 		=> $payment_id,
				':client_id' 		=> $client_id
			]);
		}
	}

?>
