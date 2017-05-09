<?php

	switch ($_GET['link']) {
		case 'accommodation.php':
			include 'accommodation.php';
			break;
		case 'booking.php':
			include 'booking.php';
			break;
		case 'clients.php':
			include 'clients.php';
			break;
		case 'rooms.php':
			include 'rooms.php';
			break;
		case 'employees.php':
			include 'employees.php';
			break;
		case 'settings.php':
			include 'settings.php';
			break;
	}

?>