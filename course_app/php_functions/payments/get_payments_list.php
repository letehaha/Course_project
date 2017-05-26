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
            <p>Оплачено</p>
            <input class="js-changeValue" name="second_name" type="text" required disabled value="<?= $value['amount_pay'] ?>">
            <p>К оплате</p>
            <input class="js-changeValue" name="middle_name" type="text" required disabled value="<?= $value['amount_to_pay'] ?>">
            <p>Тип оплаты</p>
            <input class="js-changeValue" name="country" type="text" required disabled value="<?= $value['payment_method'] ?>">
            <label for="amount_to_pay_booking" class="amount_to_pay_booking-label booking-change-true">
                <p>К доплате</p>
                <input class="js-changeValue" type="text" disabled id="amount_to_pay_booking">
            </label>
            <input class="js-changeValue booking-change-true" type="text" placeholder="Доплатить" id="booking-payed">
            <button id="change-booking-submit" disabled type="submit">Принять</button>
        </form>
    </div>
<?php } ?>
