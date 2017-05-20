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
<?php require 'header.php'; ?>

	<main class="main-page">
		<?php require 'sidebar.php'; ?>
		<div class="pjax-content">
			<div class="employees_wrapper">
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
					<div class="empl js-employees-content"></div>
				</div>
				<div class="list employees__list">

				</div>
			</div>
		</div>
	</main>
	
</body>
</html>
