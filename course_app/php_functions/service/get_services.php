<?php

	$sql_services = $db->prepare('SELECT * FROM services');
	$sql_services->execute();

	$services = $sql_services->fetchAll(PDO::FETCH_ASSOC);

?>

<select name="payment_method" data-method id="accommodation-select-payment-method" class="required">
<?php foreach ($services as $value) { 	?>
		<option value="<?=$value['id_service']?>"><?=$value['service_name']?></option>
<?php } ?>
</select>
