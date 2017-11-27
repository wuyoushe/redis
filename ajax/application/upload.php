<?php
$file = icon('utf-8','gbk',$_FILES['user_pic']['name']);
if(move_uploaded_file($_FILES['user_pic']['tmp_name'],'./uploads/'.$_FILES['user_pic']['name']))
{
	echo "上传成功";
}else
{
	echo "上传失败";
}