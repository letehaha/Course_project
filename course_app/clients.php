<?php
	
	require_once('./db-connect.php');

	// echo list of the clients

	$sql_clients = $db->prepare('SELECT * FROM clients');
	$sql_clients->execute();

	$clients = $sql_clients->fetchAll(PDO::FETCH_ASSOC);

?>
<div class="list_wrapper clients_wrapper">
	<div class="list clients__list">

	</div>
	<div>
		<form action="#" id="add-client" form-page="contacts">
			<input type="text" required name="fname" placeholder="Имя">
			<input type="text" required name="sname" placeholder="Фамилия">
			<input type="text" required name="mname" placeholder="Отчество">
			<input type="text" required name="passport" placeholder="Паспорт">
			<input type="text" required name="tel" placeholder="Телефон">
			<input type="email" required name="email" placeholder="E-mail">
			<input type="text" required name="country" placeholder="Страна">
			<textarea name="comment" cols="30" rows="3" placeholder="Комментарий"></textarea>
			<button type="submit">Добавить</button>
		</form>

		<div class="empl js-client-content"></div>
	</div>
</div>