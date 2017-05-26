<?php

	require_once('../../db-connect.php');

	$id = $_POST['id'];

	$sql_get_info_about_employee = $db->prepare("SELECT * FROM employees, employeeposition WHERE employees.id_employee='$id' AND employees.id_position = employeeposition.id_position");
	$sql_get_info_about_employee->execute();

	$employee = $sql_get_info_about_employee->fetchAll(PDO::FETCH_ASSOC);

	$sql_posiitons = $db->prepare('SELECT id_position, position FROM employeeposition');
	$sql_posiitons->execute();

	$positions = $sql_posiitons->fetchAll(PDO::FETCH_ASSOC);
    
?>

<?php foreach ($employee as $value) { ?>
    <div class="employeer-item-info">
        <form class="new-form" id="js-employee-info-form" data-employee-id="<?= $value['id_employee'] ?>">
          <div class="form-wrapper">
            <label class="form-wrapper_child" for="first_name">
              <p>Имя</p>
              <input id="first_name" class="js-changeValue" name="first_name" type="text" disabled value="<?= $value['first_name'] ?>">
            </label>
            <label class="form-wrapper_child" for="second_name">
              <p>Фамилия</p>
              <input id="second_name" class="js-changeValue" name="second_name" type="text" disabled value="<?= $value['second_name'] ?>">
            </label>
            <label class="form-wrapper_child" for="second_name">
              <p>Отчество</p>
              <input class="js-changeValue" name="middle_name" type="text" disabled value="<?= $value['middle_name'] ?>">
            </label>
          </div>
          <div class="form-wrapper">
            <label class="form-wrapper_child" for="second_name">
              <p>Должность</p>
              <select name="employee-list-position" id="employee-list-position" class="is-hide">
              	<option disabled selected value="<?= $value['id_position'] ?>"><?= $value['position'] ?></option>
                  <?php foreach ($positions as $val) { ?>
                      <option value="<?= $val['id_position'] ?>"><?= $val['position'] ?></option>
                  <?php } ?>
              </select>
              <input class="js-changeValue" name="position" id="employee-position" type="text" disabled value="<?= $value['position'] ?>" data-id="<?= $value['id_position'] ?>">
            </label>
            <label class="form-wrapper_child" for="second_name">
              <p>Зарплата</p>
              <input name="salary" type="text" disabled value="<?= $value['salary'] ?>">
            </label>
          </div>
          <button type="button" class="change-employee">Изменить</button>
          <button type="submit" id="js-save-change-employee" class="save-change-employee is-hide" data-id="<?= $id ?>">Сохранить изменения</button>
        </form>
        <button type="button" class="delete" data-employee-id="<?= $value['id_employee'] ?>">Удалить</button>
    </div>
<?php } ?>
