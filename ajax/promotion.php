<?php
$data['year'] = 2017;
$data['month'] = 10;
$data['date'] = [14,15];
//将数组转换成json格式再返回
echo json_encode($data);