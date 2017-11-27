<?php

	//这个文件通过计划任务运行。

	/*
		$ crontab -e
			15  4  *  * *  /usr/local/php/bin/php /usr/local/apache2/htdocs/xdl/test/shell-addUserToMySQL.php


	 */

	//作用：将注册时放到redis中的用户数据，插入到MySQL中
	
	$redis = new Redis;

	$redis->connect('localhost', 6379);

	//去到存放到队列中的用户hash键
	while ( $userKey = $redis->rpop('user:register:queue') ) {

		//根据hash键，拿到用户数据
		$userData = $redis->hGetAll($userKey);

		//将从redis中拿到的用户数据，放到MySQL中
		addUserDataToMySQL($userData);
		sleep(1);

	}


	function addUserDataToMySQL($userData)
	{
		$dsn = 'mysql:host=localhost;dbname=lamp;charset=utf8';

	
		$pdo = new PDO($dsn, 'root', '123456');

		$sql = 'insert into user(name, pass) values(:name, :pass)';

		$stmt = $pdo->prepare($sql);

		$stmt->execute([
			'name' => $userData['name'],
			'pass' => $userData['pass'],
		]);


	}

	

