<!doctype html>
<html <?php language_attributes(); ?> class="no-js">

	<head>
		<meta charset="<?php bloginfo('charset'); ?>">
		<title><?php wp_title(''); ?><?php if(wp_title('', false)) { echo ' :'; } ?> <?php bloginfo('name'); ?></title>

		<link href="//www.google-analytics.com" rel="dns-prefetch">
        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
        <link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">
		<!-- <link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/img/rolling.css"> -->

		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="google-site-verification" content="eF5TfaFUMt70ChgiVKLAfDpiCCXaXuBwpR8GV3M1_lg" />

		<?php wp_head(); ?>
		<script>
        // conditionizr.com
        // configure environment tests
        conditionizr.config({
            assets: '<?php echo get_template_directory_uri(); ?>',
            tests: {}
        });
    </script>

		<script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyBpYpLF1OtkMcw3lAVZHqY-M134dGLUmbc"></script>

	</head>
	<body <?php body_class(); ?>>
	<div id="bodyBG"></div>

		<!-- wrapper -->
		<div class="wrapper">

			<!-- header -->
			<header class="header clear" role="banner">
					<div id='timeheader'>
					<img src="<?php echo get_template_directory_uri(); ?>/img/buttons/clock_grey.png">
					</div>
					<div id='placeheader'>
						<img src="<?php echo get_template_directory_uri(); ?>/img/buttons/place_grey.png">
					</div>
					<div class="logo">
						<a href="<?php echo home_url(); ?>">
							<img src="<?php echo get_template_directory_uri(); ?>/img/JDJlogoheader.png" alt="Logo" class="logo-img">
							<img src="<?php echo get_template_directory_uri(); ?>/img/JDJlogoheader2.png" alt="Logo" class="logo-img-2">
						</a>
						<div class="logo-lgd">Drame chorégraphique dans la ville en 24 heures</div>
					</div>
					<div id='inscriptionheader'>
						<img src="<?php echo get_template_directory_uri(); ?>/img/buttons/inscription_grey.png">
					</div>
					<div id='infosheader'>
						<img src="<?php echo get_template_directory_uri(); ?>/img/buttons/info_grey.png">
					</div>
					<div id='tweetsheader'>
						<img src="<?php echo get_template_directory_uri(); ?>/img/buttons/hashtag_grey.png">
					</div>

					<div id='socialheader'>
						<a href="https://www.facebook.com/profile.php?id=100009185365151" target="blank">
							<img src="<?php echo get_template_directory_uri(); ?>/img/buttons/social_f.png">
						</a>
						<a href="https://twitter.com/AileJDJ" target="blank">
							<img src="<?php echo get_template_directory_uri(); ?>/img/buttons/social_t.png">
						</a>
					<!--	<a href="https://www.instagram.com/" target="blank">
							<img src="<?php echo get_template_directory_uri(); ?>/img/buttons/social_i.png">
						</a>-->
					</div>

					<!-- nav -->
					<!-- <nav class="nav" role="navigation">
						<?php html5blank_nav(); ?>
					</nav> -->
					<!-- /nav -->

			</header>
			<!-- /header -->
