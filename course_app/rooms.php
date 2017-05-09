<?php
	
	// require_once('./db-connect.php');

	// echo list of the rooms

	// $sql_rooms = $db->prepare('SELECT * FROM rooms, roomtype WHERE rooms.id_room_type = roomtype.id_room_type');
	// $sql_rooms->execute();

	// $rooms = $sql_rooms->fetchAll(PDO::FETCH_ASSOC);

?>

<div class="list_wrapper rooms_wrapper">
	<div class="list rooms__list">
		
	</div>
<!-- 	<div>
		<form action="#" id="add-employee">
			<input type="text" autocomplete="off" required name="f_name" placeholder="Имя">
			<input type="text" autocomplete="off" required name="s_name" placeholder="Фамилия">
			<input type="text" autocomplete="off" required name="m_name" placeholder="Отчество">
			<select name="list-position" id="list-position">
			<?php foreach ($positions as $value) { ?>
				<option value="<?=$value['id_position']?>"><?=$value['position']?></option>
			<?php } ?>
			</select>
			<button type="submit">Добавить</button>
		</form>

		<form action="#" id="remove-employee" style="margin-top: 100px;">
			<input type="search" id="employee-remove" autocomplete="off" placeholder="Поиск сотрудника по ФИО" list="employee-remove-search-list" required>
			<datalist id="employee-remove-search-list">
			<?php foreach ($employees as $value) { ?>
					<option data-employee-id="<?=$value['id_employee']?>" value="<?=$value['first_name']?> <?=$value['second_name']?> <?=$value['middle_name']?>"></option>
			<?php } ?>
			</datalist>
			<button type="submit">Поиск</button>
		</form> -->
	<div class="empl js-rooms-content"></div>
	<!-- </div> -->
</div>