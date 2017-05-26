<?php require 'header.php'; ?>

	<main class="main-page">
		<?php require 'sidebar.php'; ?>
		<div class="pjax-content">
			<form action="" id="change-pass-form">
				<p>Изменить пароль:</p>
				<br>
				<label for="old-pasword">
					<p>Старый пароль</p>
					<input type="password" id="old-pasword">
				</label>
				<br>
				<br>
				<label for="new-password">
					<p>Новый пароль</p>
					<input disabled type="password" id="new-password" minlength="6" maxlength="10">
				</label>
				<button disabled id="change-pass-submit" type="submit">Изменить</button>
			</form>
		</div>
	</main>
	
</body>
</html>
