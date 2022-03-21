<?php

$type = $_POST['type'];
if ($type == 1) {    //根据编号或姓名提取部分信息用于列表显示,查询编号1，参数info
    $info = $_POST['info'];
    $s = '"';
    if(is_numeric($info)){     
        $sqlstr = "select id,姓名,性别,生日,现居地 from person where id={$s}{$info}{$s}";
    }
    else {   
        $sqlstr = "select id,姓名,性别,生日,现居地 from person where 姓名={$s}{$info}{$s}";     
    }
    echo json_encode(query($sqlstr),256);
} else if ($type == 2) {    //查询个人所有信息
    $id = $_POST['id'];
    $s = '"';
    $sqlstr = "select * from person where id={$s}{$id}{$s}";
    echo json_encode(query($sqlstr),256);
} else if ($type == 3) {    //查询各指标数据
    $sqlstr = "select * from items";
    echo json_encode(query($sqlstr),256);
} else if ($type == 4) {    //查询某个科室的所有病人
    $s = '"'; 
    $department = $_POST['department'];
    $sqlstr = "select patientName from patient_info where department={$s}{$department}{$s} limit 20 ";
    echo json_encode(query($sqlstr));
}else if($type==5) {   //查询数据总条数
    $sqlstr="select count(*) from patient_info";
    $arr = query($sqlstr);
    echo $arr[0]["count(*)"];
}else if($type==6){    //根据姓名查找基本信息
    $s = '"'; 
    $name = $_POST['name'];
    $sqlstr = "select distinct sex,job,birth_place from patient_info where patientName={$s}{$name}{$s}";
    echo json_encode(query($sqlstr));
} else if ($type == 7) {    //某个人群中，查询年龄段和病情，用于热力图
    $min = $_POST['min'];
    $max = $_POST['max'];
    $key = $_POST['key'];
    $equal = $_POST['equal'];
    $value = $_POST['value'];
    $illness = $_POST['illness'];
    $strequal;
    if($equal==1)$strequal="=";
    else if($equal==0)$strequal="!=";
    $s = '"';
    $sqlstr = "select count(*) from patient_info where age>={$min} and age <={$max} and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} ";
    $arr = query($sqlstr);
    echo $arr[0]["count(*)"];
}else if($type==8) {   //某个人群总人数
    $key = $_POST['key'];
    $equal = $_POST['equal'];
    $value = $_POST['value'];
    $strequal="=";
    if($equal==1)$strequal="=";
    else if($equal==0)$strequal="!=";
    $s = '"';
    $sqlstr="select count(*) from patient_info where {$key}{$strequal}{$s}{$value}{$s}";
    $arr = query($sqlstr);
    echo $arr[0]["count(*)"];
} else if ($type == 9) {    //某个人群中，查询年龄段和病情，用于热力图
    $key = $_POST['key'];
    $equal = $_POST['equal'];
    $value = $_POST['value'];
    $illness = $_POST['illness'];
    $strequal;
    if($equal==1)$strequal="=";
    else if($equal==0)$strequal="!=";
    $s = '"';
    // $sqlstr = "select count(age>50 or null)  as s20 from patient_info";
    $sqlstr = "select ".
    "count(age>= 1 and age <= 5 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n1,".
    "count(age>= 6 and age <=10 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n2,".
    "count(age>=11 and age <=15 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n3,".
    "count(age>=16 and age <=20 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n4,".
    "count(age>=21 and age <=25 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n5,".
    "count(age>=26 and age <=30 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n6,".
    "count(age>=31 and age <=35 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n7,".
    "count(age>=36 and age <=40 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n8,".
    "count(age>=41 and age <=45 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n9,".
    "count(age>=46 and age <=50 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n10,".
    "count(age>=51 and age <=55 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n11,".
    "count(age>=56 and age <=60 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n12,".
    "count(age>=61 and age <=65 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n13,".
    "count(age>=66 and age <=70 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n14,".
    "count(age>=71 and age <=75 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n15,".
    "count(age>=76 and age <=80 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n16,".
    "count(age>=81 and age <=85 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n17,".
    "count(age>=86 and age <=90 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n18,".
    "count(age>=91 and age <=95 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n19,".
    "count(age>=96 and age <=120 and {$key}{$strequal}{$s}{$value}{$s} and illness like {$s}%{$illness}%{$s} or null) as n20".
    " from patient_info";
    echo json_encode(query($sqlstr));
}

function query($sqlstr)
{
    $servername = "localhost";
    $username = "root";
    $password = "1234ABCDabcd@";
    $dbname = "healthy_picture";
    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare($sqlstr);
        // $stmt = $conn->prepare();
        $stmt->execute();
        $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
    // mysql_close();
    return $row;
    // echo json_encode($row,256);//可以显式显示汉字
}
