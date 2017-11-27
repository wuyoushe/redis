<?php

	/**
	 * @author LiangZhi gzphper@163.com
	 * checkUserExists 检查用户是否存在
	 * @param  string $name 用户名
	 * @return array     
	 * 
	 *      存在对应用户，返回  ['msg' => 'ok', 'status' => 1200, 'data'  => 用户数据)];。 不存在对应用户，返回 return ['msg' => 'user not found', 'status' => 1404];
	 */
	function checkUserExists($name)
	{
		$redis = new Redis;

		$redis->connect('localhost', 6379);

		
		$userKey = 'user:data:'.$name;

		$res = $redis->hGet($userKey, 'id');

		if (!$res) {

			$dsn = 'mysql:host=localhost;dbname=lamp;charset=utf8';
			//redis中没有对应用户,查询MySQL中有无用户
			$pdo = new PDO($dsn, 'root', '123456');

			$sql = 'select id,name,pass from user where name = ?';

			$stmt = $pdo->prepare($sql);

			$stmt->execute([
				$name,
			]);

			$userData = $stmt->fetch(PDO::FETCH_ASSOC);

			if (!$userData) {

				return [
					'msg' => 'user not found',
					'status' => 1404,
				];
			}

			//返回用户数据
			return [
				'msg' => 'ok',
				'status' => 1200,
				'data' => $userData,
			];

			
		}


		//返回redis中用户数据
		return [
			'msg' => 'ok',
			'status' => 1200,
			'data'  => $redis->hGetAll($userKey),
		];


	}
