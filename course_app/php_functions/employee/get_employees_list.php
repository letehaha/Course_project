<?php

	require('../../db-connect.php');

	$sql_employees = $db->prepare('SELECT * FROM employees, employeeposition WHERE employees.id_position = employeeposition.id_position');
	$sql_employees->execute();

	$employees = $sql_employees->fetchAll(PDO::FETCH_ASSOC);

?>

	<div class="list__info employees__info">
		<div class="list__item_cell employees__item_cell employees__first-name">Имя</div>
		<div class="list__item_cell employees__item_cell employees__second-name">Фамилия</div>
		<div class="list__item_cell employees__item_cell employees__middle-name">Отчество</div>
		<div class="list__item_cell employees__item_cell employees__position">Должность</div>
		<div class="list__item_cell employees__item_cell employees__salary">Зарплата</div>
	</div>
<?php foreach ($employees as $value) { ?>
	<div class="list__item employees__item js-employees__item js-info-popup" data-employee-id="<?=$value['id_employee'] ?>">
		<div class="list__item_cell employees__item_cell employees__first-name js-employees__first-name"><?=$value['first_name'] ?></div>
		<div class="list__item_cell employees__item_cell employees__second-name js-employees__second-name"><?=$value['second_name'] ?></div>
		<div class="list__item_cell employees__item_cell employees__middle-name js-employees__middle-name"><?=$value['middle_name'] ?></div>
		<div class="list__item_cell employees__item_cell employees__position js-employees__position" data-id-position="<?=$value['id_position'] ?>"><?=$value['position'] ?></div>
		<div class="list__item_cell employees__item_cell employees__salary js-employees__salary"><?=$value['salary']?></div>
	</div>
<?php } ?>
