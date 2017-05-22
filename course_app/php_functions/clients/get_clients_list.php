<?php

	require('../../db-connect.php');

	$sql_clients = $db->prepare('SELECT * FROM clients');
	$sql_clients->execute();

	$clients = $sql_clients->fetchAll(PDO::FETCH_ASSOC);

?>

	<div class="list__info employees__info">
		<div class="list__item_cell js-cl_fname">Имя</div>
		<div class="list__item_cell js-cl_sname">Фамилия</div>
		<div class="list__item_cell js-cl_mname">Отчество</div>
		<div class="list__item_cell js-cl_pass">Паспорт</div>
		<div class="list__item_cell js-cl_tel">Телефон</div>
		<div class="list__item_cell js-cl_mail">email</div>
		<div class="list__item_cell js-cl_country">Страна</div>
		<div class="list__item_cell list__item_cell--auto-width js-cl_comment">Комментарий</div>
	</div>
<?php foreach ($clients as $value) { ?>
	<div class="list__item client__item js-client__item js-info-popup" data-client-id="<?=$value['id_client'] ?>">
		<div class="list__item_cell js-cl_fname"><?=$value['first_name'] ?></div>
		<div class="list__item_cell js-cl_sname"><?=$value['second_name'] ?></div>
		<div class="list__item_cell js-cl_mname"><?=$value['middle_name'] ?></div>
		<div class="list__item_cell js-cl_pass"><?=$value['passport_data'] ?></div>
		<div class="list__item_cell js-cl_tel"><?=$value['phone_number']?></div>
		<div class="list__item_cell js-cl_mail"><?=$value['email']?></div>
		<div class="list__item_cell js-cl_country"><?=$value['country']?></div>
		<div class="list__item_cell list__item_cell--auto-width js-cl_comment"><?=$value['comment']?></div>
	</div>
<?php } ?>
