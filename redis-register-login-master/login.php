<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>登录</title>
</head>
<body>

	<?php

		session_start();
		if (@$_SESSION['msg']) {
			echo '<div style="color:red">'.$_SESSION['msg'].'</div>';
			unset($_SESSION['msg']);
		}
	?>
	
	<form action="./doLogin.php" method="post">
		用户名：<input type="text" name="uname" /><br>
		密码：<input type="text" name="pass" /><br>
		<button>登录</button>
	</form>
</body>
</html>