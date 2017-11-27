	//将ajax封装为对象的格式
	$$.ajax({
		method:"POST",
		url:'data.xml',
		data:'name=amao&age=30',
		dataType:'xml',
		success:function(result)
		{
			//处理请求数据之后的逻辑
			console.log(result);
		}
	});
	var $$ = {
		ajax:function(options){
				try{
				//主流浏览器
				var xhr  = new XMLHttpRequest();
			}catch(err){
				try{
					//非主流浏览器（ version >=IE6 ）
					var xhr = new ActiveXObject("Msxml2.XMLHTTP");
				}catch(err){
					//小于IE6
					alert('你的浏览器太破了,请重新下载浏览器');
					location.href = 'www.baidu.com';
				}
			}
			if(options.method=='GET')
			{
				xhr.open(options.method,options.url+'?'+options.data+'&'+Math.random(),true);
				xhr.send();
			}else if(options.method=='GET'){
				xhr.open(options.method,options.url,true);
				xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
				//post方式是以send方式发出参数
				xhr.send(options.data);
			}
			xhr.open(options.method,"dataType.php",true);
			xhr.send();
			xhr.onreadystatechange = function(){
				//通过xhr对象的readyState属性获得状态的变化
				// alert(xhr.readyState);	//3. 表示正在处理中，4，表示请求已完成（不代表成功了）
				//还需要判断服务器是否成功响应了：如果是200表示请求成功，如果是404表示请求失败
				if(xhr.readyState == 4 && xhr.status == 200){
					//接收服务器回应的数据,通过xhr对象的responseText属性
					//eval()函数将字符串作为表达式运行一下即可
					//将返回的数据传入函数里
					if(options.dataType=='text')
					{
						options.success(xhr.responseText);
					}else if(options.dataType=='json')
					{
						var result = eval('var result='+xhr.responseText);
						options.success(result);
					}else if(options.dataType=='xml')
					{
						options.success(xhr.responseXML);
					}
					
				}
			}
		}
		
	}
		//1. 实例化ajax对象