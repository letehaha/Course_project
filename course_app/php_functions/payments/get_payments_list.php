<?php

    require_once('../../db-connect.php');

    $id = $_POST['id'];

	$sql_payments = $db->prepare("
        SELECT * FROM payments, paymentmethod 
        WHERE payments.id_payment = '$id' 
        AND payments.payment_method = paymentmethod.id_payment
    ");
	$sql_payments->execute();

	$payments = $sql_payments->fetchAll(PDO::FETCH_ASSOC);

?>

<?php foreach ($payments as $value) { ?>
    <div class="payment-item-info">
        <form class="new-form" id="js-payment-info-form" data-payment-id="<?= $value['id_payment'] ?>">
            <!-- <input class="js-changeValue" placeholder="Имя" name="first_name" type="text" required disabled value="<?= $value['id_client'] ?>"> -->
            <input class="js-changeValue" placeholder="Фамилия" name="second_name" type="text" required disabled value="<?= $value['amount_pay'] ?>">
            <input class="js-changeValue" placeholder="Отчество" name="middle_name" type="text" required disabled value="<?= $value['amount_to_pay'] ?>">
            <input class="js-changeValue" placeholder="Страна" name="country" type="text" required disabled value="<?= $value['payment_method'] ?>">
        </form>
    </div>
<?php } ?>
