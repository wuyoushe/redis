# redis-register-login
使用Redis，MySQL实现高性能注册,登录功能


## 说明

1. 本功能只关注核心功能，对于安全等其他方面不做考虑。所以请不要直接用于生产环境
2. 为了方便大家学习，代码使用过程化的代码编写。


## 目录说明

	index.php 首页
	login.php 显示登录页面
	doLogin.php 处理登录的业务代码
	doRegister.php 处理注册的业务代码
	register.php 显示注册页面
	shell-addUserToMySQL.php 负责将redis中数据插入到MySQL，需要用计划任务执行
	
