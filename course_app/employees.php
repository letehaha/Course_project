<?php
	
	require_once('./db-connect.php');

	// echo list of the employees

	$sql_employees = $db->prepare('SELECT * FROM employees, employeeposition WHERE employees.id_position = employeeposition.id_position');
	$sql_employees->execute();

	$employees = $sql_employees->fetchAll(PDO::FETCH_ASSOC);


	// echo list of the positions

	$sql_posiitons = $db->prepare('SELECT id_position, position FROM employeeposition');
	$sql_posiitons->execute();

	$positions = $sql_posiitons->fetchAll(PDO::FETCH_ASSOC);


?>
<div class="list_wrapper employees_wrapper">
	<div class="list employees__list">

	</div>
	<div>
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
		</form>
		<div class="empl js-employees-content"></div>
	</div>
</div>