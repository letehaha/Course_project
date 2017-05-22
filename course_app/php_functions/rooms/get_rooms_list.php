<?php

	require('../../db-connect.php');

	$sql_rooms = $db->prepare('SELECT * FROM rooms, roomtype WHERE rooms.id_room_type = roomtype.id_room_type');
	$sql_rooms->execute();

	$rooms = $sql_rooms->fetchAll(PDO::FETCH_ASSOC);

	$sql_services = $db->prepare('
		SELECT * 
		FROM servicetoroom 
		INNER JOIN rooms ON rooms.id_room = servicetoroom.id_room 
		INNER JOIN services ON services.id_service = servicetoroom.id_service
	');
	$sql_services->execute();

	$services = $sql_services->fetchAll(PDO::FETCH_ASSOC);
	// $result = $rooms + $services;
?>
<pre>
<?php
// print_r($result);
?>
</pre>
	<div class="list__info rooms__info">
		<div class="list__item_cell rooms__item_cell js-rooms__name">Номер</div>
		<div class="list__item_cell rooms__item_cell js-rooms__type">Тип</div>
		<div class="list__item_cell rooms__item_cell js-rooms__status">Статус</div>
		<div class="list__item_cell rooms__item_cell js-rooms__size">Размер</div>
		<div class="list__item_cell rooms__item_cell js-rooms__price">Цена</div>
		<div class="list__item_cell rooms__item_cell js-rooms__service">Сервисы</div>
	</div>
<?php foreach ($rooms as $value ) { ?>
	<div class="list__item rooms__item js-rooms__item js-info-popup" data-room-id="<?=$value['id_room'] ?>">
		<div class="list__item_cell rooms__item_cell rooms__name js-rooms__name"><?=$value['room_number'] ?></div>
		<div class="list__item_cell rooms__item_cell rooms__size js-rooms__type" data-id-room-type="<?=$value['id_room_type'] ?>"><?=$value['room_type'] ?></div>
		<div class="list__item_cell rooms__item_cell rooms__status js-rooms__status"><?=$value['room_status'] ?></div>
		<div class="list__item_cell rooms__item_cell rooms__size js-rooms__size"><?=$value['room_size'] ?></div>
		<div class="list__item_cell rooms__item_cell rooms__price js-rooms__price"><?=$value['price'] ?></div>
		<div class="list__item_cell rooms__item_cell rooms__service js-rooms__service">
			<?php 
			foreach ($services as $val ) {
				if($value['id_room'] == $val['id_room'])
					echo '<span>'.$val['service_name'].'</span>';
				}
			?>
		</div>

	</div>
<?php } ?>
