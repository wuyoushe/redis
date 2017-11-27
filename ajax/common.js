//封装DOM 2级事件监听
//参数1：监视的节点对象
//参数2：事件类型
//参数3：事件发生时执行的代码
function bindEvent(obj,eventType,fn){
	if(obj.addEventListener){
		//主流浏览器
		obj.addEventListener(eventType, fn, false);
	}else{
		//非主流浏览器
		obj.attachEvent('on'+eventType, fn);
	}
}


//获得任意css属性的值
//参数1: 获得哪一个html标签的css样式
//参数2：获得哪一个css属性的值
function getStyle(element,cssName)
{
	if(window.getComputedStyle){
		//说明是主流浏览器
		return getComputedStyle(element,false)[cssName];
	}else{
		//非主流浏览器:IE 6 7 8
		return element.currentStyle[cssName];
	}
}


//参数1：element,让哪个元素执行动画
//参数2：mudidi，元素到达的目的地,json格式的对象: {width:200px,height:200px,opacity:100}
//参数3：回调函数：fn = function(){}
function animate(element,json,fn){
	//清除旧的计时器
	clearInterval(element.timer);
	element.timer = setInterval(function(){
		//1. 计算该元素执行动画的css样式的当前的值
		var flag = true;
		for(var attr in json){
			if(attr == 'opacity'){
				var now = parseInt(getStyle(element,'opacity') * 100);	// 10 20 30 。。。。
			}else{
				var now = parseInt(getStyle(element,attr));  //100px ---> 100
			}
			
			//2. 获取到达的目的地
			var mudidi = parseInt(json[attr]);

			//3. 每次移动的距离：速度,让速度有一定的曲线，开始时快，离目的地越近越慢
			// 速度 = （目的地 - 起点）/ 10; 
			var speed = (mudidi - now) / 10;
			// document.title = speed;

			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			//4. 让元素当前值 + 速度，赋值给元素的style属性
			if(attr == 'opacity'){
				element.style[attr] = (now + speed)/100;
			}else{
				element.style[attr] = (now + speed) + 'px';
			}

			//5. 如果到达目的地停止动画
			if(now != mudidi){
				flag = false;
			}
		}

		if(flag){
			clearInterval(element.timer);
			if(fn){
				fn();
			}
		}
	}, 50);
}

//根据id查询节点对象
function $(id){
	return document.getElementById(id);
}

//removeClass: 封装删除class类的方法
//参数1：element，元素对象，删除哪个元素身上的class
//参数2：clsName，删除的类名
//例如：class="page show" 结果：class = "page"
function removeClass(element,clsName){
	//1. 先获得当前的类名
	var cName = element.className;		//"page show"

	var arr = cName.split(' ');			//["page", "show"]

	for(var i=0;i<arr.length;i++){
		if(arr[i] == clsName){
			arr.splice(i,1);
		}
	}
	// console.log(arr);				//["page"]
	//将数组拼接成字符串赋值给element
	element.className = arr.join(' ');
}

//addClass,给指定标签增加class样式
//参数1：element，给哪个元素增加class属性
//参数2：clsName，给标签增加什么类
//例如：class="page" 增加类之后： class="page show"
function addClass(element,clsName){
	//1. 先判断是否有class属性，如果没有class，则直接赋值
	var cName = element.className;	
	if(!cName){
		element.className = clsName;
		return;
	}
	//2. 执行到这里说明，有class类		// class="page show"
	// 判断是否有我们要添加的这个class
	var arr = cName.split(' ');
	for(var i=0;i<arr.length;i++){
		if(arr[i] == clsName){
			//说明class属性中有要添加的class类
			return;
		}
	}
	//3. 执行到这里，说明现在的class属性中没有show类
	element.className += ' '+clsName;
}

//封装ajax操作
//ajax对象的调用
// $$.ajax({
// 				method:"GET",
// 				URL:'promotion.php',
// 				data:'',
// 				dataType:'json',
// 				success:function(result)
// 				{
// 					console.log(result);
// 				}

// 			})
//封装
var $$ = {
	ajax:function(options){
		try{
			var xhr = new XMLHttpRequest();
		}catch(error){
			try{
				var xhr = new ActiveXObject("Msxml2.XMLHTTP");
			}catch(error){
				alert('你的浏览器太破了,不值得拥有');
				location.href = 'http://www.baidu.com';
			}
		}

		//get请求时解决缓存的问题
		if(options.method == 'GET'){
			xhr.open(options.method,options.url+'?'+options.data+'&'+Math.random(),true);
			xhr.send();
		}else if(options.method == 'POST'){
			xhr.open(options.method,options.url,true);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhr.send(options.data);
		}
		
		xhr.onreadystatechange = function(){
			if(xhr.readyState==4 && xhr.status==200){
				if(options.dataType=='text'){
					options.success(xhr.responseText);
				}else if(options.dataType=='json'){
					eval('var result='+xhr.responseText);
					options.success(result);
				}else if(options.dataType=='xml'){
					options.success(xhr.responseXML);
				}
			}
		}
	}
};
