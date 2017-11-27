<?php
	
	session_start();
	$name = $_POST['uname'];

	$pass = $_POST['pass'];

	$redis = new Redis;

	$redis->connect('localhost', 6379);


	require('./functions.php');

	//登录： 先查询Redis,如果redis中有，则直接登录成功。如果redis中没有，则需要查询MySQL数据库
	$res = checkUserExists($name);


	//判断用户名是否存在
	if ($res['status'] == 1404) {

		$_SESSION['msg'] = '用户名不存在';
		header('Location:./login.php');
		exit;

	}

	// var_dump($res);exit;

	//验证密码是否正确
	if (!password_verify($pass, $res['data']['pass'])) {
		$_SESSION['msg'] = '密码错误';
		header('Location:./login.php');
		exit;
	}

	unset($res['data']['pass']);
	//用户登录成功，数据记录到SESSION中
	$_SESSION['home-user-data'] = $res['data'];


	header('Location:./index.php');
	exit;




