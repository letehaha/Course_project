<?php

	require('../../db-connect.php');

	$date = $_POST['date'];

	$date = intval($date);

	$sql_accommodation = $db->prepare("CALL hide_accommodation()");
	$sql_accommodation->execute();

	$accommodations = $sql_accommodation->fetchAll(PDO::FETCH_ASSOC);

?>

	<div class="list__info accommodation__info">
		<div class="list__item_cell js-ac_date-in">Дата заселения</div>
		<div class="list__item_cell js-ac_date-out">Дата выселения</div>
		<div class="list__item_cell js-ac_booking">Бронь</div>
		<div class="list__item_cell js-ac_room">Номер комнаты</div>
		<div class="list__item_cell js-ac_payment">Номер платежа</div>
		<div class="list__item_cell js-ac_client">Клиент</div>
	</div>
<?php foreach ($accommodations as $value) { ?>
	<div class="list__item accommodation__item <?php

		 if($value['booking_status'] == '1'){
		 	echo 'data-booking-true';
		 }

		 ?>" data-client-id="<?=$value['id_accommodation'] ?>">
		<div class="list__item_cell js-ac_date-in"><?=$value['date_in'] ?></div>
		<div class="list__item_cell js-ac_date-out"><?=$value['date_out'] ?></div>
		<div class="list__item_cell js-ac_booking js-change-booking-value"><?=$value['booking_status'] ?></div>
		<div class="list__item_cell js-ac_room js-rooms__item js-info-popup" data-room-id="<?=$value['id_room'] ?>"><?=$value['room_number'] ?></div>
		<div class="list__item_cell js-ac_payment js-payment__item js-info-popup" data-payment-id="<?=$value['payments_id_payment'] ?>"><?=$value['payments_id_payment']?></div>
		<div class="list__item_cell js-ac_client js-client__item js-info-popup" data-client-id="<?=$value['id_client'] ?>"><?=$value['first_name']?> <?=$value['middle_name']?> <?=$value['second_name']?></div>
	</div>
<?php } ?>
