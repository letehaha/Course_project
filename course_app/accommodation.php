<?php
	
	require_once('./db-connect.php');

	// echo list of the clients

	$sql_clients = $db->prepare('SELECT * FROM clients');
	$sql_clients->execute();

	$clients = $sql_clients->fetchAll(PDO::FETCH_ASSOC);

	$sql_payment_methods = $db->prepare('SELECT * FROM paymentmethod');
	$sql_payment_methods->execute();

	$payment_methods = $sql_payment_methods->fetchAll(PDO::FETCH_ASSOC);

	$sql_rooms = $db->prepare('SELECT * FROM rooms, roomtype WHERE rooms.id_room_type = roomtype.id_room_type AND room_status = 1 ORDER BY rooms.room_number');
	$sql_rooms->execute();

	$rooms = $sql_rooms->fetchAll(PDO::FETCH_ASSOC);

	$sql_services = $db->prepare('SELECT * FROM services');
	$sql_services->execute();

	$services = $sql_services->fetchAll(PDO::FETCH_ASSOC);

?>
<?php require 'header.php'; ?>

	<main class="main-page">
		<?php require 'sidebar.php'; ?>
		<div class="pjax-content">
			<section class="accommodation-wrapper">

				<div class="accommodation-forms">

					<form class="form accommodation-form" id="accommodation-form">
						<h2 class="form-title">Информация о заселении</h2>

						<div class="form-wrapper">

							<label for="accommodation-date-in" class="form-wrapper_child" data-error="Дата заселения не может быть установлена задним числом">
								<p>Дата заселения</p>
								<input class="js-valid-date required" id="accommodation-date-in" type="date" name="date-in">
							</label>

							<label for="accommodation-date-out" class="form-wrapper_child" data-error="Дата выселения не может быть раньше даты заселения">
								<p>Дата выселения</p>
								<input class="js-valid-date required" id="accommodation-date-out" type="date" name="date-out">
								<input type="hidden" id="data-accommodation-days" data-accommodation-days>
							</label>

							<label for="accommodation-booking-checkbox" class="form-wrapper_child accommodation-booking-checkbox-label">
								<p>Бронь</p>
								<input id="accommodation-booking-checkbox" class="accommodation-booking-checkbox" type="checkbox" name="booking">
							</label>
						</div>
						<div class="form-wrapper">
							<label for="accommodation-select-room" class="form-wrapper_child">
								<p>Номер комнаты</p>
								<select name="room_number" data-price data-room-size id="accommodation-select-room" class="required">
						<?php 	foreach ($rooms as $value) { 	?>
									<option class="accommodation-select-room-item" data-price="<?=$value['price']?>" data-room-size="<?=$value['room_size']?>" value="<?=$value['id_room']?>"><?=$value['room_number']?> (<?=$value['room_size']?>)</option>
						<?php 	} 	?>
								</select>
							</label>

							<label for="accommodation-select-room" class="form-wrapper_child">
								<p>Способ оплаты</p>
								<select name="payment_method" data-method id="accommodation-select-payment-method" class="required">
							<?php 	foreach ($payment_methods as $value) { 	?>
										<option value="<?=$value['id_payment']?>"><?=$value['payment_method']?></option>
							<?php 	} 	?>
								</select>
							</label>
						</div>
						<div class="form-wrapper">
				<?php 	foreach ($services as $value) { 	?>
							<label for="service-<?=$value['id_service']?>">
								<p><?=$value['service_name']?> (<?=$value['service_price']?>)</p>
								<input class="accommodation-service-item" type="checkbox" id="service-<?=$value['id_service']?>" value="<?=$value['id_service']?>" data-price="<?=$value['service_price']?>">
							</label>
				<?php 	} 	?>
						</div>
						<div class="form-wrapper">
							<label style="width: 420px;" for="accommodation-field-quest" class="form-wrapper_child">
								<p>ФИО гостя</p>
								<input name="client_name" type="search" id="accommodation-select-client-field" placeholder="ФИО гостя" list="accommodation-client-list" class="form-wrapper_child required" autocomplete="off" data-selected-id-client>
								<datalist id="accommodation-client-list">
						<?php 	foreach ($clients as $value) { 	?>
									<option class="accommodation-client-list-item" data-id-client="<?=$value['id_client']?>" value="<?=$value['second_name'].' '.$value['first_name'].' '.$value['middle_name']?>"></option>
						<?php 	} 	?>
								</datalist>
							</label>
							<label for="accommodation-new-quest-checkbox" class="form-wrapper_child accommodation-new-quest-checkbox-label">
								<p>Новый гость</p>
								<input id="accommodation-new-quest-checkbox" class="accommodation-new-quest-checkbox" type="checkbox">
							</label>
						</div>
						<div class="form-wrapper">
							<label for="accommodation-count-to-pay" class="form-wrapper_child accommodation-count-to-pay-label">
								<p>К оплате</p>
								<input id="accommodation-amount-to-pay" class="accommodation-amount-to-pay" type="number"  data-amount-to-pay disabled>
							</label>
							<label for="accommodation-count-pay" class="form-wrapper_child accommodation-count-pay-label">
								<p>Оплачено</p>
								<input id="accommodation-amount-pay" class="accommodation-amount-pay required" type="number">
							</label>
						</div>
						<button type="submit" class="submit">Добавить</button>
					
						<div class="form client-form js-client-form">
							<h2 class="form-title">Информация о клиенте</h2>

							<div class="form-wrapper">
								<input type="text" autocomplete="off" name="fname" placeholder="Имя" class="form-wrapper_child required">
								<input type="text" autocomplete="off" name="sname" placeholder="Фамилия" class="form-wrapper_child required">
								<input type="text" autocomplete="off" name="mname" placeholder="Отчество" class="form-wrapper_child required">
							</div>

							<div class="form-wrapper">
								<input type="text" autocomplete="off" name="passport" placeholder="Паспорт" class="form-wrapper_child required">
								<input type="text" autocomplete="off" name="tel" placeholder="Телефон" class="form-wrapper_child required">
							</div>

							<div class="form-wrapper">
								<input type="text" autocomplete="off" name="email" placeholder="email" class="form-wrapper_child required">
								<input type="text" autocomplete="off" name="country" placeholder="Страна" class="form-wrapper_child required">
							</div>
							
							<textarea type="text" name="comment" autocomplete="off" placeholder="Коммент" rows="5" cols="49"></textarea>
						</div>

					</form>

				</div>
				<div  class="empl js-accom-content">
				</div>
			</section>
		</div>
	</main>
	
</body>
</html>
