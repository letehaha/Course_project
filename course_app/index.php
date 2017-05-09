<!DOCTYPE html>
<html lang="en">
<head>
	<title>Hotel | Admin Panel</title>
	<link rel="stylesheet" href="css/main.css"/>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF8">
	<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
	<!-- <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700" rel="stylesheet"> -->
	<link rel="stylesheet" href="libs/font-awesome/css/font-awesome.min.css">
	<script src="libs/jquery/jquery.min.js"></script>
	<script src="js/main.js"></script>
</head>
<body>

	<main class="main-page">
		<?php require 'sidebar.php'; ?>
		<section class="pjax-content">
			<?php require 'accommodation.php'; ?>
		</section>
	</main>
	
</body>
</html>