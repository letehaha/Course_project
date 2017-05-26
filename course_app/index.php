<?php require 'header.php'; ?>
	<?php 

	require_once('./db-connect.php');

	$rooms = $db->prepare('SELECT count(id_room) AS rooms FROM rooms');
	$rooms->execute();
	$rooms_count = $rooms->fetchAll(PDO::FETCH_ASSOC);

	$clients = $db->prepare('SELECT count(id_client) AS clients FROM clients');
	$clients->execute();
	$clients_count = $clients->fetchAll(PDO::FETCH_ASSOC);

	$emp = $db->prepare('SELECT count(id_employee) AS emp FROM employees');
	$emp->execute();
	$emp_count = $emp->fetchAll(PDO::FETCH_ASSOC);

	$accom = $db->prepare('SELECT count(id_accommodation) AS accom FROM accommodation');
	$accom->execute();
	$accom_count = $accom->fetchAll(PDO::FETCH_ASSOC);


	 ?>

	<main class="main-page">
		<?php require 'sidebar.php'; ?>
		<div class="pjax-content">
			<h2>Количество номеров: <?php 
				foreach ($rooms_count as $v) { ?> 
					<?=$v['rooms'] ?>
				<?php } ?>
			</h2>
			<h2>Количество постояльцев: <?php 
				foreach ($clients_count as $v) { ?> 
					<?=$v['clients'] ?>
				<?php } ?>
			</h2>
			<h2>Количество сотрудников: <?php 
				foreach ($emp_count as $v) { ?> 
					<?=$v['emp'] ?>
				<?php } ?>
			</h2>
			<h2>Количество постояльцев: <?php 
				foreach ($accom_count as $v) { ?> 
					<?=$v['accom'] ?>
				<?php } ?>
			</h2>
		</div>
	</main>

	
</body>
</html>
