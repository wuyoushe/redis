<?php

	session_start();
	$name = $_POST['uname'];

	$pass = password_hash($_POST['pass'], PASSWORD_DEFAULT);

	$redis = new Redis;

	$redis->connect('localhost', 6379);


	$userKey = 'user:data:'.$name;

	require('./functions.php');

	//判断用户名是否存在redis中
	$res = checkUserExists($name);

	if ($res['status'] == 1200) {

		$_SESSION['msg'] = '用户名存在';
		header('Location:./register.php');
		exit;
	}

	$uid = $redis->incr('user:id');

	//将用户数据存放到hash中
	$redis->hMSet($userKey, ['name' => $name, 'pass' => $pass, 'id' => $uid]);

	//用户的hash的键存放到队列中
	$redis->lPush('user:register:queue', $userKey);

	$redis->set('user:id:'.$uid, $userKey);

	//注册成功
	header('Location:./login.php');






