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
            <input class="js-changeValue" name="room_number" type="text" disabled value="<?= $value['room_number'] ?>">
            <input class="js-changeValue" name="room_status" type="text" disabled value="<?= $value['room_status'] ?>">
            <input class="js-changeValue" name="room_size" type="text" disabled value="<?= $value['room_size'] ?>">
            <input class="js-changeValue" name="room_type" type="text" disabled value="<?= $value['room_type'] ?>">
            <input class="js-changeValue" name="price" type="text" disabled value="<?= $value['price'] ?>">
            <select class="js-changeValue" name="" id="" disabled>
                <?php 
                    for($i = 0; $i < count($services); $i++){
                        if($services[$i]['id_room'] == $value['id_room']){ ?>
                            <option value="<?= $services[$i]['id_service'] ?>"><?= $services[$i]['service_name'] ?></option>
                    <?php }
                    }
                ?>
            </select>
            <button type="button" class="change-room">Изменить</button>
            <button type="submit" id="js-save-change-room" class="save-change-room is-hide" data-id="<?= $id ?>">Сохранить изменения</button>
        </form>
        <!-- <button type="button" class="delete" data-employee-id="<?= $value['id_employee'] ?>">Удалить</button> -->
    </div>
    <pre>
        <?php
        print_r($services);
        ?>
    </pre>
<?php } ?>