<?php


	session_start();

	if (@$_SESSION['home-user-data']) {
		var_dump($_SESSION);
	}

	echo '首页';