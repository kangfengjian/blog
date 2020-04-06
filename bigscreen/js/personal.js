var personal_data;//全局变量，对象，用来存储一个人的各项数据
var category_data;//全局变量，对象，用来存储各小类的所属及其他信息
var items = {};//指标信息，用于第二列下部的展示，每个大类对应的指标信息
var illness_data = {};//存储疾病信息，包括近十年风险预测，危险因素和建议
// 获取类别数据
function getCategoryData() {
  category_data = [
    { "name": "吸烟", "type": ["心脑血管", "冠心病", "脑卒中", "糖尿病",], "min_normal_value": 0, "max_normal_value": 0 },
    { "name": "收缩压", "type": ["心脑血管", "冠心病", "脑卒中", "代谢综合征", "糖尿病", "慢性肾病", "高血压", "房颤",], "min_normal_value": 90, "max_normal_value": 139 },
    { "name": "舒张压", "type": ["心脑血管", "冠心病", "代谢综合征", "慢性肾病", "高血压", "房颤",], "min_normal_value": 60, "max_normal_value": 89 },
    { "name": "体质指数", "type": ["心脑血管", "冠心病", "脑卒中", "代谢综合征", "糖尿病", "慢性肾病", "高血压",], "min_normal_value": 18.5, "max_normal_value": 24 },
    { "name": "空腹血糖", "type": ["心脑血管", "冠心病", "脑卒中", "代谢综合征", "糖尿病", "慢性肾病", "高血压",], "min_normal_value": 3.89, "max_normal_value": 6.11 },
    { "name": "血肌酐", "type": ["心脑血管", "冠心病",], "min_normal_value": 0, "max_normal_value": 124 },
    { "name": "甘油三酯", "type": ["心脑血管", "代谢综合征", "高血压",], "min_normal_value": 0.3, "max_normal_value": 1.7 },
    { "name": "总胆固醇", "type": ["心脑血管", "冠心病", "脑卒中", "代谢综合征", "高血压",], "min_normal_value": 0, "max_normal_value": 6 },
    { "name": "高密度脂蛋白胆固醇", "type": ["心脑血管", "冠心病", "脑卒中", "糖尿病", "慢性肾病", "高血压",], "min_normal_value": 0.8, "max_normal_value": 2 },
    { "name": "低密度脂蛋白胆固醇", "type": ["心脑血管", "糖尿病", "慢性肾病",], "min_normal_value": 1, "max_normal_value": 3.37 },
    { "name": "白细胞计数", "type": ["心脑血管", "脑卒中", "代谢综合征", "糖尿病",], "min_normal_value": 3.5, "max_normal_value": 9.5 },
    { "name": "红细胞计数", "type": ["心脑血管",], "min_normal_value": 3.8, "max_normal_value": 5.8 },
    { "name": "淋巴细胞计数", "type": ["代谢综合征",], "min_normal_value": 1.1, "max_normal_value": 3.2 },
    { "name": "中性粒细胞计数", "type": ["代谢综合征",], "min_normal_value": 1.8, "max_normal_value": 6.3 },
    { "name": "红细胞比容", "type": ["心脑血管", "代谢综合征",], "min_normal_value": 37, "max_normal_value": 50 },
    { "name": "饮酒", "type": ["脑卒中",], "min_normal_value": 0, "max_normal_value": 0 },
    { "name": "高血压", "type": ["脑卒中",], "min_normal_value": 0, "max_normal_value": 0 },
    { "name": "糖尿病", "type": ["冠心病", "脑卒中",], "min_normal_value": 0, "max_normal_value": 0 },
    { "name": "贫血", "type": ["慢性肾病",], "min_normal_value": 0, "max_normal_value": 0 },
    { "name": "心血管疾病", "type": ["慢性肾病",], "min_normal_value": 0, "max_normal_value": 0 },
  ];
  var ajaxjson;
  $.ajax({
    url: "php/query.php", success: function (result) {
      ajaxjson = result;
    }, type: 'post', async: false, data: { 'type': 3, }
  });
  // $("#test").text(ajaxjson);
  category_data=JSON.parse(ajaxjson);
  for(var i=0;i<category_data.length;i++){
    category_data[i]["class"]=category_data[i]["class"].split('，');
  };
  // $("#test").text(JSON.stringify(category_data));
  // personal_data=obj[0];
  // category_data
}
//一切从这里开始
$(document).ready(function () {
  getCategoryData();
  show_time();
  getId(window.location.href);
  $('#title_name_search').click(function () {
    getIdBySearch();
  });
});
//获取id
function getId(str) {
  var id;
  // 在url中解析出id，成功则返回id
  var n = str.indexOf("id=");
  if (n != -1) {
    id = parseInt(str.substring(n + 3));
    if (isNaN(id)) {
      getIdBySearch();
    }
    else {

      drawHtml(id);
    }
  }
  else {
    getIdBySearch();
  }
}
// 通过搜索框获取id，当在url中获取失败是调用
function getIdBySearch() {
  $("#title_name").css("cssText", 'display:none !important')
  $("#title_info").css("cssText", 'display:none !important')
  $('#search_div').show();
  $("input#search_input").keydown(function (e) {
    if (e.which == 13) {
      $("#search_button").trigger("click");
      return false;
    }
  });
  $("#search_button").click(function () {
    var ajaxjson;
    $.ajax({
      url: "php/query.php", success: function (result) {
        ajaxjson = result;
      }, type: 'post', async: false, data: { 'type': 1, 'info': $("#search_input").val() }
    });
    var str_append = '';
    if (ajaxjson == "[]") {
      str_append = '<li class="list-group-item" style="line-height:10px;">未找到相关信息</li>';
    }
    else {
      obj = JSON.parse(ajaxjson);
      for (var i = 0; i < obj.length; i++) {
        str_append += '<li class="list-group-item" style="line-height:10px;" value="' + obj[i]["id"] + '">' + obj[i]['姓名'] + ' ' + obj[i]['性别'] + ' ' + obj[i]['生日'] + ' ' + obj[i]['现居地'] + '</li>';
      }
      // console.log(obj);
      // $('#test').text(str_append);
      // [{"姓名":"穆福伦","性别":"男","生日":"2005-07-29","现居地":"吉林省辽源市"}]
    }
    $('#search_ul').empty();
    $("#search_ul").append(str_append);
    $("#search_list").show();
    $("#search_ul>li").click(function () {
      // 隐藏搜索框
      // $("#search_div").css('display', 'none !important');
      $("#search_div").css("cssText", 'display:none !important');
      $("#search_list").hide();
      // 显示姓名标题
      $("#title_name").show();
      drawHtml($(this).attr("value"));
      // $("#test").text($(this).attr("value"));
    });
  });

}
// 获取个人数据
function getPersonalData(id) {
  var ajaxjson;
  $.ajax({
    url: "php/query.php", success: function (result) {
      ajaxjson = result;
    }, type: 'post', async: false, data: { 'type': 2, 'id': id }
  });
  // $("#test").text(ajaxjson);
  var obj=JSON.parse(ajaxjson);
  personal_data=obj[0];

}
// 画流程图
function draw_process(id, process_data) {
  process_data = process_data.split(',');
  var col_width = $('#' + id).width() / 12;
  var con_height = $('#' + id).height();
  var ribbon_size = col_width * 2.7;
  var row_margin = -1.8 * col_width;
  var arrow_size = col_width / 3;
  var row_height = ribbon_size / 2 * 3;
  if (con_height < row_height) {
    $('#' + id).text("容器高度不足以展示图表");
    return;
  }


  var max_rows = 0;
  if (process_data.length / 2 <= parseInt((con_height + row_margin) / (row_height + row_margin))) {
    max_rows = process_data.length / 2;
  }
  else {
    max_rows = parseInt((con_height + row_margin) / (row_height + row_margin));
  }


  var res = "";
  for (var i = 0, j = process_data.length; i < max_rows; i++) {
    if (i == 0) {
      a = 0;
    }
    else {
      a = row_margin;
    }
    if (i % 2 == 0) {
      res += '<div class="row" style="margin-top: ' + a + 'px;">' +
        '<div class="col align-items-center d-flex justify-content-end">' +
        '<div class="card">' +
        '<div class="card-header bg-primary text-white px-2 py-0 font-small9">' + process_data[j-2] + '</div>' +
        '<div class="card-body px-1 py-0">' +
        '<p class="card-text font-small9 text-dark" style="font-weight:bold;font-family:SimSun;">' + process_data[j-1] + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="col-1 no-padding d-flex justify-content-center align-items-center">' +
        '<span class="iconfont icon-arrow_left" style="color: rgb(223,225,237);font-size:' + arrow_size + 'px;"></span>' +
        '</div>' +
        '<div class="col-1 no-padding d-flex justify-content-center align-items-center">' +
        '<span class="iconfont icon-ribbon text-danger" style="text-shadow: 0 0 6px #DC3545;font-size:' + ribbon_size + 'px;"></span>' +
        '</div>' +
        '<div class="col-1 no-padding d-flex justify-content-center align-items-center"></div>' +
        '<div class="col"></div>' +
        '</div >';
        j-=2;
    }
    else {
      res += '<div class="row" style="margin-top: ' + a + 'px;">' +
        '<div class="col"></div>' +
        '<div class="col-1 no-padding d-flex justify-content-center align-items-center"></div>' +
        '<div class="col-1 no-padding d-flex justify-content-center align-items-center">' +
        '<span class="iconfont icon-ribbon text-info" style="text-shadow: 0 0 4px #17A2B8;font-size:' + ribbon_size + 'px;"></span>' +
        '</div>' +
        '<div class="col-1 no-padding d-flex justify-content-center align-items-center">' +
        '<span class="iconfont icon-arrow_right" style="color: rgb(223,225,237);font-size:' + arrow_size + 'px;"></span>' +
        '</div>' +
        '<div class="col  align-items-center d-flex justify-content-start">' +
        '<div class="card">' +
        '<div class="card-header bg-primary text-white px-1 py-0 font-small9">' + process_data[j-2] + '</div>' +
        '<div class="card-body px-1 py-0">' +
        '<p class="card-text font-small9 text-dark" style="font-weight:bold;font-family:SimSun;">' + process_data[j-1] + '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div >';
        j-=2;
    }
  }
  $('#' + id).html(res);
}
//计算总体健康指数
function getTotalHealthIndex() {
  return personal_data["总体评分"];
}
// 类别鼠标移上去事件
function categoryMouseEnter(n, categories_illness) {
  for (var i = 1; i <= 6; i++) {
    if (i != n) {
      $('#category' + i + '_icon').css('cssText', 'border-color:white !important');
      $('#category' + i + '_icon>span').css('cssText', 'color:#28A745 !important');
      $('#category' + i + '_text').css('cssText', 'border-color:white !important');
      $('#category' + i + '_score').css('cssText', 'border-color:white !important;background-color:#007BFF !important;');
    }
    else {
      $('#category' + i + '_icon').css('cssText', 'border-color:#FFC107 !important;color:#FFC107 !important');
      $('#category' + i + '_icon>span').css('cssText', 'color:#FFC107 !important');
      $('#category' + i + '_text').css('cssText', 'border-color:#FFC107 !important');
      $('#category' + i + '_score').css('cssText', 'border-color:#FFC107 !important;background-color:#FFC107 !important;');
      var temp = items[categories_illness[n - 1]];
      $('#items_tbody').empty();
      for (var j = 0; j < temp.length && j<14; j++) {
        $("#items_tbody").append(
          '<tr>' +
          '<th scope="row"><span class="iconfont icon-zhibiao fs9"></span></th>' +
          '<td class="fs9">' + temp[j].name + '</td>' +
          '<td class="fs9 text-nowrap">' + temp[j].index + '</td>' +
          '<td class="fs9 text-nowrap">' + temp[j].min + ' ~ ' + temp[j].max + '</td>' +
          '</tr>'
        )
      }
    }
  }

}
// 绘制大类得分及相关指标
function draw_categories() {
  var categories = ['血压', '心脏', '大脑', '代谢', '胃', '肺',];
  var categories_illness = ['血压', '心脏', '大脑', '代谢', '胃', '肺',];
  // 填写大类数据
  $('#categories_div').show();
  $('#category1_icon').html('<span style="color:#28A745;"class=" iconfont icon-zhongliuxinnaoxieguanjibing font-big1_5"></span>');
  $('#category1_text').text(categories[0]);
  $('#category1_score').text(personal_data["血压评分"]);

  $('#category2_icon').html('<span class="text-success iconfont icon-xinzang font-big1_5"></span>');
  $('#category2_text').text(categories[1]);
  $('#category2_score').text(personal_data["心脏评分"]);

  $('#category3_icon').html('<span class="text-success iconfont icon-danao- font-big1_5"></span>');
  $('#category3_text').text(categories[2]);
  $('#category3_score').text(personal_data["大脑评分"]);

  $('#category4_icon').html('<span class="text-success iconfont icon-tubiaozhizuomoban font-big1_5"></span>');
  $('#category4_text').text(categories[3]);
  $('#category4_score').text(personal_data["代谢评分"]);

  $('#category5_icon').html('<span class="text-success iconfont icon-shenzang font-big1_5"></span>');
  $('#category5_text').text(categories[4]);
  $('#category5_score').text(personal_data["胃评分"]);

  $('#category6_icon').html('<span class="text-success iconfont icon-xieya font-big1_5"></span>');
  $('#category6_text').text(categories[5]);
  $('#category6_score').text(personal_data["肺评分"]);
  // 生成指标列表
  for (var i = 0; i < categories_illness.length; i++) {
    items[categories_illness[i]] = [];
  }
  for (var i = 0; i < category_data.length; i++) {
    var item_object = {};
    item_object.name = category_data[i].name;
    item_object.index = personal_data[item_object.name];
    item_object.min = 0;
    item_object.max = 0;
    for (var j = 0; j < category_data[i].class.length; j++) {
      if (categories_illness.indexOf(category_data[i].class[j]) > -1) {
        items[category_data[i].class[j]].push(item_object);
      }
    }
  }
  // 对大类添加监听-改变样式，并显示对应指标
  $('#category_items').show();
  categoryMouseEnter(1, categories_illness);
  $('#category1').mouseenter(function () { categoryMouseEnter(1, categories_illness); });
  $('#category2').mouseenter(function () { categoryMouseEnter(2, categories_illness); });
  $('#category3').mouseenter(function () { categoryMouseEnter(3, categories_illness); });
  $('#category4').mouseenter(function () { categoryMouseEnter(4, categories_illness); });
  $('#category5').mouseenter(function () { categoryMouseEnter(5, categories_illness); });
  $('#category6').mouseenter(function () { categoryMouseEnter(6, categories_illness); });
}
// 获取疾病预测数据
function getIllnessData() {
  illness_data = {
    '高血压': { 'numbers': [10, 15, 20, 18, 16, 12, 10, 6, 4, 4, 4], 'items': '高血压的危险因素有很多，分为可控制因素和不可控制因素。可控制因素，比如压力大、吃的太咸、运动太少等，这些都是可以控制的；不可控制因素，比如家庭遗传倾向，父母或者祖父母都有高血压，这些因素是不可能去掉的。', 'suggestion': '建议低盐饮食、低脂肪饮食，不要过多的热量的摄入，另外一方面一定要禁烟禁酒，而且要避免激动情绪，有高血脂的必须要同时治疗，否则降压效果不会太好，同时要在医生指导下选择降压药。' },
    '脑卒中': { 'numbers': [40, 30, 35, 41, 45, 40, 52, 45, 43, 46, 45], 'items': '引起脑中风的危险因素有：年龄、遗传、高血压、 低血压 、 心脏病 、 心律失常 、眼底动脉硬化、 糖尿病 、 高脂血症 、吸烟、饮酒、 肥胖 ，饮食因素如高盐、多肉、高动物油饮食，饮浓咖啡浓茶、体力活动过量等，均被认为是脑卒中的危险因素。', 'suggestion': '如患者伴有高血压病，相关康复训练应慎重进行，运动训练量多少需随时监测。如患者伴有心脏病，进行训练与评估前评价患者整体情况，进行相关运动处方界定。' },
    '冠心病': { 'numbers': [40, 39, 38, 42, 52, 59, 65, 75, 74, 72, 73], 'items': '高血压是冠心病的主要危险因素，收缩压和舒张压均与冠心病发病率显著相关，而且随着血压升高，冠心病的发病率和死亡率均呈上升趋势。', 'suggestion': '心情放松对心脏功能的保护有很大的好处，建议患者平时可通过瑜伽、闭目养神等途径来达到身心健康的目的。而在生活中，遇事要沉着冷静，做到面对和处理事物时能保持坦然的心态。' },
  };
}
// 绘制折线图
function drawLineChart(conId, title, age) {
  var ages = new Array();
  for (var i = 0; i <= 10; i++) {
    ages.push((age + i) + '岁');
  }
  var hypertension_risk_prediction = echarts.init(document.getElementById(conId));
  hypertension_risk_prediction_option = null;
  hypertension_risk_prediction_option = {
    title: {
      text: title + '十年发展趋势',
      left: 'center',
      color: 'white',
      textStyle: {
        color: 'white',
      }
    },
    left: 0,
    bottom: 0,
    grid: {
      left: '10%',
      right: '2%',
      top: '20%',
      bottom: '15%',
    },
    //  backgroundColor: 'rgba(255,255,255,0.1)',
    xAxis: {
      type: 'category',
      data: ages,
      axisPointer: {
        show: true,
        label: {
          show: true,
          color: 'black',
        },
      },
      nameTextStyle: {
        color: 'white',
      },
      axisLine: {
        lineStyle: {
          color: 'white',
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '发病率',
      axisLabel: {
        formatter: function (value) {
          return value + '%';
        }
      },
      nameTextStyle: {
        color: 'white',
      },
      axisLine: {
        lineStyle: {
          color: 'white',
        }
      }
    },
    series: [{
      data: illness_data[title].numbers,
      type: 'line',
      smooth: true,
    }]
  };
  if (hypertension_risk_prediction && typeof hypertension_risk_prediction_option === "object") {
    hypertension_risk_prediction.setOption(hypertension_risk_prediction_option, true);
  }
  $('#' + conId + '_up').show();
}
//添加事件监听,第三列
function showIllnessMessage(id, name) {
  $('#illness' + id + '_up').click(function () {
    for (var i = 1; i <= 3; i++) {
      if (i != id) {
        $('#illness' + i + '_row').hide();
      }
    }
    $("#illness_message").show();
    $("#illness_items").text(illness_data[name].items);
    $("#illness_suggestion").text(illness_data[name].suggestion);

    $('#illness' + id + '_down').show();
    $(this).hide();
  });
  $('#illness' + id + '_down').click(function () {
    $("#illness_message").hide();
    for (var i = 1; i <= 3; i++) {
      if (i != id) {
        $('#illness' + i + '_row').show();
      }
    }
    $("#illness" + id + "_up").show();
    $(this).hide();
  });
}
// 绘制第三列：风险预测
function draw_thirdcol() {
  //先获取数据
  getIllnessData();
  //画折线图
  var myDate = new Date();
  var age = myDate.getFullYear() - parseInt(personal_data['生日']);
  drawLineChart('illness1', '冠心病', age);
  drawLineChart('illness2', '脑卒中', age);
  drawLineChart('illness3', '高血压', age);
  //添加事件监听
  showIllnessMessage(1, '冠心病');
  showIllnessMessage(2, '脑卒中');
  showIllnessMessage(3, '高血压');
}
//时间
function show_time() {
  var myDate = new Date;
  var year = myDate.getFullYear(); //获取当前年
  var mon = myDate.getMonth() + 1; //获取当前月
  var date = myDate.getDate(); //获取当前日
  // var h = myDate.getHours();//获取当前小时数(0-23)
  // var m = myDate.getMinutes();//获取当前分钟数(0-59)
  // var s = myDate.getSeconds();//获取当前秒
  var week = myDate.getDay();
  var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  time_str = year + "-" + mon + "-" + date + " " + weeks[week];
  $("#now_time").append('<span class="iconfont icon-riqi font-big1_5"> </span>');
  $("#now_time").append('<div>' + time_str + '</div>');
}
function show_something() {
  $("#total_health_con").show();
}
//绘制整个页面
function drawHtml(id) {
  $('#a_personal').attr('href', 'personal_bigscreen.html?id=' + id);
  $('#a_group').attr('href', 'group_bigscreen.html?id=' + id);
  getPersonalData(id);
  // 首先显示
  show_something();
  // 填写标题数据
  $('#title_name').show();
  $('#title_info').show();
  var myDate = new Date();
  $('#title_name_h1').text(personal_data['姓名']);
  $('#title_info_sex').text(personal_data['性别']);
  $('#title_info_age').text(myDate.getFullYear() - parseInt(personal_data['生日']) + '岁');
  $('#title_info_nation').text(personal_data['民族']);
  $('#title_info_job').text(personal_data['工作']);
  $('#title_info_address').text(personal_data['现居地']);
  // 绘制就诊流程图
  draw_process('process_con', personal_data['就诊记录']);
  // 填写总体健康指数
  $('#total_health_index').text(getTotalHealthIndex());
  // 绘制大类得分及相关指标
  draw_categories();
  // 绘制第三列：风险预测
  draw_thirdcol();

}
/*
{
"id":"55","姓名":"巫胜时","性别":"男","生日":"1957-02-17","籍贯":"河北省衡水市","户口所在地":"广东省清远市",
"现居地":"甘肃省临夏回族自治州","工作":"无","民族":"汉族","学历":"大专","收入":"8700","婚姻状况":"未婚",
"高血压家族史":"1","高血压早发家族史":"0","高盐饮食":"0","总胆固醇":"3.78","甘油三酯":"0.63","低密度脂蛋白":"4.67",
"高密度脂蛋白":"2.51","吸烟":"2","被动吸烟":"1","经常大量饮酒":"0","蔬菜摄入不足":"1","水果摄入不足":"1",
"缺乏体育锻炼":"1","生活工作压力":"0","高血压负性事件":"1","冠心病家族史":"0","冠心病早发家族史":"0","心脏病":"0",
"高血压":"0","糖尿病":"0","冠心病负性事件":"0","糖尿病家族史":"0","妊娠糖尿病史":"0","空腹血糖":"0.09",
"餐后血糖":"6.51","体力活动不足":"1","胃癌家族史":"0","其他肿瘤家族史":"1","A型血型":"1","慢性胃疾病":"0",
"幽门螺杆菌感染":"0","不规律饮食":"0","高腌制品摄入":"0","豆类食品摄入不足":"0","胃癌负性事件":"1","肺癌家族史":"0",
"肺部疾病史":"1","煤烟及油烟污染":"1","粉尘及有害气体等职业暴露史":"1","吸烟支数":"4",
"就诊记录":"1963-03-20,低血压,2008-03-23,糖尿病肾病,2011-09-20,斜颈,2015-02-27,腹痛,2015-10-16,肾炎,2016-07-07,糖尿病肾病,2018-06-20,低血压",
"血压评分":"24","心脏评分":"43","大脑评分":"39","代谢评分":"34","胃评分":"54","肺评分":"-8","总体评分":"31",
"身高":"130","体重":"74","脑卒中家族史":"0","脑卒中早发家族史":"1","无症状颈动脉狭窄":"0","慢性房颤":"0","其他心脏病":"0"
}
*/