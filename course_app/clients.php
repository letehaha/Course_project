<?php
	
	require_once('./db-connect.php');

	// echo list of the clients

	$sql_clients = $db->prepare('SELECT * FROM clients');
	$sql_clients->execute();

	$clients = $sql_clients->fetchAll(PDO::FETCH_ASSOC);

?>
<?php require 'header.php'; ?>

	<main class="main-page">
		<?php require 'sidebar.php'; ?>
		<div class="pjax-content">
			<div class="clients_wrapper">
				<div>
					<form class="form" id="add-client" form-page="contacts">
						<div class="form-wrapper">
							<label class="form-wrapper_child" for="add-client-name">
								<p>Имя</p>
								<input id="add-client-name" type="text" required name="fname" placeholder="Имя">
							</label>
							<label class="form-wrapper_child" for="add-client-sname">
								<p>Фамилия</p>
								<input id="add-client-sname" type="text" required name="sname" placeholder="Фамилия">
							</label>
							<label class="form-wrapper_child" for="add-client-mname">
								<p>Отчество</p>
								<input id="add-client-mname" type="text" required name="mname" placeholder="Отчество">
							</label>
						</div>
						<div class="form-wrapper">
							<label class="form-wrapper_child" for="add-client-passport">
								<p>Паспортные данные</p>
								<input id="add-client-passport" type="text" required name="passport" placeholder="Паспорт" maxlength="10">
							</label>
							<label class="form-wrapper_child" for="add-client-tel">
								<p>Номер телефона</p>
								<input id="add-client-tel" type="text" required name="tel" placeholder="Телефон">
							</label>
						</div>
						<div class="form-wrapper">
							<label class="form-wrapper_child" for="add-client-email">
								<p>E-mail</p>
								<input id="add-client-email" type="email" required name="email" placeholder="E-mail">
							</label>
							<label class="form-wrapper_child" for="add-client-country">
								<p>Страна</p>
								<input id="add-client-country" type="text" required name="country" placeholder="Страна">
							</label>
						</div>
						<div class="form-wrapper">
							<label class="form-wrapper_child add-client__comment-label" for="add-client-comment">
								<p>Комментарий</p>
								<textarea id="add-client-comment" class="textarea--default add-client__comment" name="comment" cols="30" rows="3" placeholder="Комментарий"></textarea>
							</label>
							<button class="btn btn--blue-style add-client__submit form-wrapper_child" type="submit">Добавить</button>
						</div>
					</form>

					<div class="empl js-client-content"></div>
				</div>
				<div class="list clients__list">

				</div>
			</div>
		</div>
	</main>
	
</body>
</html>
