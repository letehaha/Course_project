<?php

	require_once('../../db-connect.php');

	$id = $_POST['id'];


  // CALL get_info_about_room(?)
  $sql_get_info_about_room = $db->prepare("
    SELECT * 
    FROM rooms, roomtype 
    WHERE rooms.id_room='$id' 
    AND rooms.id_room_type = roomtype.id_room_type
  ");
  $sql_get_info_about_room->bindParam(1, $id, PDO::PARAM_STR, 4000); 
  // в $id передается число
  $sql_get_info_about_room->execute();

	$room = $sql_get_info_about_room->fetchAll(PDO::FETCH_ASSOC);


  $sql_get_info_about_status = $db->prepare('
    SELECT DISTINCT room_status 
    FROM rooms 
  ');

  $sql_get_info_about_status->execute();

  $statuses = $sql_get_info_about_status->fetchAll(PDO::FETCH_ASSOC);


	$sql_services = $db->prepare('
    SELECT * 
    FROM servicetoroom, services 
    WHERE servicetoroom.id_service = services.id_service
  ');
  // INNER JOIN rooms ON rooms.id_room = servicetoroom.id_room 
  // INNER JOIN services ON services.id_service = servicetoroom.id_service 
  $sql_services->execute();

  $services = $sql_services->fetchAll(PDO::FETCH_ASSOC);
    
?>

<?php foreach ($room as $value) { ?>
  <div class="room-item-info">
    <form class="new-form" id="js-room-info-form" data-room-id="<?= $value['id_room'] ?>">
      <div class="form-wrapper">
        <label class="form-wrapper_child" for="room_number">
          <p>Номер</p>
          <input id="room_number" name="room_number" type="text" disabled value="<?= $value['room_number'] ?>">
        </label>
        <label class="form-wrapper_child" for="room_status">
          <p>Статус</p>
          <input id="room_status" class="js-changeValue" name="room_status" type="text" disabled value="<?= $value['room_status'] ?>">
        </label>
        <label class="form-wrapper_child" for="room_size">
          <p>Размер</p>
          <input id="room_size" class="js-changeValue" name="room_size" type="text" disabled value="<?= $value['room_size'] ?>">
        </label>
        <label class="form-wrapper_child" for="room_type">
          <p>Тип</p>
          <input id="room_type" class="js-changeValue" name="room_type" type="text" disabled value="<?= $value['room_type'] ?>">
        </label>
        <label class="form-wrapper_child" for="price">
          <p>Цена</p>  
          <input id="price" name="price" type="text" disabled value="<?= $value['price'] ?>">
        </label>
        <label class="form-wrapper_child" for="first_name">
          <p id="first_name">Услуги</p>
          <?php 
          for($i = 0; $i < count($services); $i++){
            if($services[$i]['id_room'] == $value['id_room']){ ?>
              <input class="js-changeValue" type="text" disabled value="<?= $services[$i]['service_name'] ?>">
          <?php }
          } ?>
        </label>
      </div>
      <div class="form-wrapper">
        <label class="form-wrapper_child" for="price">
          <select class="js-changeValue" disabled>
            <option value="<?= $value['room_status'] ?>" selected disabled><?= $value['room_status'] ?></option>
          <?php foreach ($statuses as $value) { ?>
            <option name="price" type="text" value="<?= $value['room_status'] ?>"><?= $value['room_status'] ?></option>
          <?php } ?>
          </select>
        </label>
      </div>
      <button type="button" class="change-room">Изменить</button>
      <button type="submit" id="js-save-change-room" class="save-change-room is-hide" data-id="<?= $id ?>">Сохранить изменения</button>
    </form>
  </div>
<?php } ?>
