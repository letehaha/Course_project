<?php

	require_once('../../db-connect.php');

	$id = $_POST['id'];


	$sql_get_info_about_client = $db->prepare("SELECT * FROM clients WHERE clients.id_client='$id'");
	$sql_get_info_about_client->execute();

	$client = $sql_get_info_about_client->fetchAll(PDO::FETCH_ASSOC);

?>

<?php foreach ($client as $value) { ?>
    <div class="client-item-info">
        <form class="form" id="js-client-info-form" data-client-id="<?= $value['id_client'] ?>">
            <div class="form-wrapper">
                <label class="form-wrapper_child" for="first_name">
                    <p>Имя</p>
                    <input class="js-changeValue" id="first_name" placeholder="Имя" name="first_name" type="text" required disabled value="<?= $value['first_name'] ?>">
                </label>
                <label class="form-wrapper_child" for="first_name">
                    <p>Фамилия</p>
                    <input class="js-changeValue" placeholder="Фамилия" name="second_name" type="text" required disabled value="<?= $value['second_name'] ?>">
                </label>
                <label class="form-wrapper_child" for="first_name">
                    <p>Отчество</p>
                    <input class="js-changeValue" placeholder="Отчество" name="middle_name" type="text" required disabled value="<?= $value['middle_name'] ?>">
                </label>
            </div>
            <div class="form-wrapper">
                <label class="form-wrapper_child" for="first_name">
                    <p>Паспорт</p>
                    <input class="js-changeValue" placeholder="Паспорт" name="passport" type="text" required disabled value="<?= $value['passport_data'] ?>" maxlength="10">
                </label>
                <label class="form-wrapper_child" for="first_name">
                    <p>Номер телефона</p>
                    <input class="js-changeValue" placeholder="Номер телефона" name="phone" type="text" required disabled value="<?= $value['phone_number'] ?>">
                </label>
            </div>
            <div class="form-wrapper">
                <label class="form-wrapper_child" for="first_name">
                    <p>E-mail</p>
                    <input class="js-changeValue" placeholder="E-mail" name="email" type="email" required disabled value="<?= $value['email'] ?>">
                </label>
                <label class="form-wrapper_child" for="first_name">
                    <p>Страна</p>
                    <input class="js-changeValue" placeholder="Страна" name="country" type="text" required disabled value="<?= $value['country'] ?>">
                </label>
            </div>
            <div class="form-wrapper">
                <label class="form-wrapper_child" for="first_name">
                    <p>Комментарий</p>
                    <textarea class="js-changeValue js-changeText textarea--default" placeholder="Комментарий" name="comment" cols="20" rows="3" disabled value="<?= $value['comment'] ?>"><?= $value['comment'] ?></textarea>
                </label>
            </div>
            <button type="button" class="change-client">Изменить</button>
            <button type="submit" id="js-save-change-client" class="save-change-client is-hide" data-id="<?= $id ?>">Сохранить изменения</button>
        </form>
       <!-- <button type="button" class="delete" data-client-id="<?= $value['id_client'] ?>">Удалить</button> -->
    </div>
<?php } ?>
