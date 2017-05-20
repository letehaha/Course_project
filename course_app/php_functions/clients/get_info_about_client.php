<?php

	require_once('../../db-connect.php');

	$id = $_POST['id'];


	$sql_get_info_about_client = $db->prepare("SELECT * FROM clients WHERE clients.id_client='$id'");
	$sql_get_info_about_client->execute();

	$client = $sql_get_info_about_client->fetchAll(PDO::FETCH_ASSOC);

?>

<?php foreach ($client as $value) { ?>
    <div class="client-item-info">
        <form class="new-form" id="js-client-info-form" data-client-id="<?= $value['id_client'] ?>">
            <input class="js-changeValue" placeholder="Имя" name="first_name" type="text" required disabled value="<?= $value['first_name'] ?>">
            <input class="js-changeValue" placeholder="Фамилия" name="second_name" type="text" required disabled value="<?= $value['second_name'] ?>">
            <input class="js-changeValue" placeholder="Отчество" name="middle_name" type="text" required disabled value="<?= $value['middle_name'] ?>">
            <input class="js-changeValue" placeholder="Паспорт" name="passport" type="text" required disabled value="<?= $value['passport_data'] ?>">
            <input class="js-changeValue" placeholder="Номер телефона" name="phone" type="text" required disabled value="<?= $value['phone_number'] ?>">
            <input class="js-changeValue" placeholder="E-mail" name="email" type="email" required disabled value="<?= $value['email'] ?>">
            <input class="js-changeValue" placeholder="Страна" name="country" type="text" required disabled value="<?= $value['country'] ?>">
            <textarea class="js-changeValue js-changeText" placeholder="Комментарий" name="comment" cols="20" rows="3" disabled value="<?= $value['comment'] ?>"><?= $value['comment'] ?></textarea>
            <button type="button" class="change-client">Изменить</button>
            <button type="submit" id="js-save-change-client" class="save-change-client is-hide" data-id="<?= $id ?>">Сохранить изменения</button>
        </form>
       <!-- <button type="button" class="delete" data-client-id="<?= $value['id_client'] ?>">Удалить</button> -->
    </div>
<?php } ?>
