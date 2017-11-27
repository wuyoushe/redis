<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>注册</title>
</head>
<body>

	<?php

		session_start();
		if (@$_SESSION['msg']) {
			echo '<div>'.$_SESSION['msg'].'</div>';
			unset($_SESSION['msg']);
		}
	?>
	
	<form action="./doRegister.php" method="post">
		
		用户名：<input type="text" name="uname" /><br/>
		密码：<input type="password" name="pass"><br>
		<button>注册</button>
	</form>
</body>
</html>