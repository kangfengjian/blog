var personal_data;//全局变量，对象，用来存储一个人的各项数据
var category = ['总体', '心脑血管', '心脏', '大脑', '代谢', '肾', '血压',];
var radar_data;//雷达图的数据
var bar_data;//柱状图的数据
radar_data = {
  '总体': { '理想值': 80, '警戒值': 20, '平均值': 64, '当前值': 88, },
  '心脑血管': { '理想值': 85, '警戒值': 30, '平均值': 70, '当前值': 88, },
  '大脑': { '理想值': 79, '警戒值': 25, '平均值': 63, '当前值': 88, },
  '心脏': { '理想值': 82, '警戒值': 20, '平均值': 72, '当前值': 55, },
  '代谢': { '理想值': 93, '警戒值': 35, '平均值': 64, '当前值': 88, },
  '肾': { '理想值': 98, '警戒值': 40, '平均值': 59, '当前值': 88, },
  '血压': { '理想值': 85, '警戒值': 35, '平均值': 75, '当前值': 88, },
};
bar_data = {
  '总体': { '良好人数': 102, '正常人数': 1153, '危险人数': 245, '我的排名': 100, },
  '心脑血管': { '良好人数': 365, '正常人数': 491, '危险人数': 644, '我的排名': 542, },
  '大脑': { '良好人数': 521, '正常人数': 633, '危险人数': 346, '我的排名': 314, },
  '心脏': { '良好人数': 458, '正常人数': 296, '危险人数': 746, '我的排名': 347, },
  '代谢': { '良好人数': 658, '正常人数': 695, '危险人数': 147, '我的排名': 34, },
  '肾': { '良好人数': 841, '正常人数': 345, '危险人数': 314, '我的排名': 346, },
  '血压': { '良好人数': 354, '正常人数': 779, '危险人数': 367, '我的排名': 347, },
};
var range_data = {//人群范围
  '年龄': [0, 100],
  '性别': '男',
  '文化程度': '大专',
  '职业': ['专业技术人员', '专业技术人员',],
  '收入': [0, 100],
  '婚姻': '未婚',
  '地区': ['山东省', '聊城市', '茌平县',],
};
function getPersonalData(id) {
  personal_data = {
    "编号": 1,
    "姓名": "张三",
    "性别": "男",
    "生日": "1995-10-05",
    "籍贯": "山东省聊城市",
    "户口所在地": "山东省聊城市",
    "现居地": "山东省济南市",
    "民族": "汉族",
    "工作": "学生",
    "文化程度": "本科",
    "收入": "500",
    "婚姻状况": "未婚",
    "就诊经历": ["2009-7-1", "轻微鼻炎", "2019-2-1", "脚踝扭伤", '2019年2月2日', '感冒',],
    "身高": 172,
    "体重": 55,
    "吸烟": "不吸烟",
    "收缩压": 120,
    "舒张压": 80,
    "体质指数": 18.59,
    "空腹血糖": 3.88,
    "血肌酐": 100,
    "甘油三酯": 1.56,
    "总胆固醇": 10,
    "高密度脂蛋白胆固醇": 1.9,
    "低密度脂蛋白胆固醇": 3.38,
    "白细胞计数": 3.6,
    "红细胞计数": 3.9,
    "淋巴细胞计数": 2.0,
    "中性粒细胞计数": 5,
    "红细胞比容": 40,
    "饮酒": "不饮酒",
    "高血压": "否",
    "糖尿病": "否",
    "贫血": "否",
    "心血管疾病": "否",
  }
}
var options = {
  '年龄': '不限',
  '性别': '不限',
  '学历': '不限',
  '职业': '不限,不限',
  '收入': '不限',
  '婚姻': '不限',
  '地区': '不限,不限',
};
var options_temp = {
  '年龄': '不限',
  '性别': '不限',
  '学历': '不限',
  '职业': '不限,不限',
  '收入': '不限',
  '婚姻': '不限',
  '地区': '不限,不限',
};
var data_charts = {};
//一切从这里开始************************************************************************************************
$(document).ready(function () {
  var str = window.location.href
  var n = str.indexOf("id=");
  if (n != -1) {
    //有id输入
    id = parseInt(str.substring(n + 3));
    if (isNaN(id)) {
      //id格式有误，加载无id页面并弹出警告
      loadByNoId();
      alert("ID格式有误");
    }
    else {
      //成功获取id
      loadById(id);
    }
  }
  else {
    //没有id输入
    loadByNoId();
  }
});
//在有id的情况下加载页面****
function loadById(id) {
  showTime();
  drawPersonInfo(id);
  showOptions();
  // drawCureProcess(id);
  // drawTotalHealthIndex(id);
  // drawParts(id);
  // drawDiseaseTendency(id);
  // getDataCharts(id);
    
  // }
  // $("#test2020").text(s);
  // // var myDate = ;
  // var year = myDate; //获取当前年
}
//在没有id的情况下加载页面***
function loadByNoId() {
  showTime();
  searchDiv();
  showOptions();
  // drawCureProcess('no_id');
  // drawTotalHealthIndex('no_id');
  // drawParts('no_id');
  // drawDiseaseTendency('no_id');
}
//时间***********
function showTime() {
  var myDate = new Date;
  var year = myDate.getFullYear(); //获取当前年
  var mon = myDate.getMonth() + 1; //获取当前月
  var date = myDate.getDate(); //获取当前日
  var week = myDate.getDay();
  var weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  time_str = year + "-" + mon + "-" + date + " " + weeks[week];
  $("#now_time").append('<span class="iconfont icon-riqi font-big1_5"> </span>');
  $("#now_time").append('<div>' + time_str + '</div>');
}
//绘制个人信息****
function drawPersonInfo(id) {
  $('#a_personal').attr('href', 'personal_bigscreen.html?id=' + id);
  $('#a_group').attr('href', 'group_bigscreen.html?id=' + id);
  $('#title_name').show();
  $('#title_info').show();
  var myDate = new Date();
  $('#title_name_h1').text(data_person[id]['姓名']);
  $('#title_info_sex').text(data_person[id]['性别']);
  $('#title_info_age').text(myDate.getFullYear() - parseInt(data_person[id]['生日']) + '岁');
  $('#title_info_nation').text(data_person[id]['民族']);
  $('#title_info_job').text(data_person[id]['工作']);
  $('#title_info_address').text(data_person[id]['现居地']);
  $('#title_name_search').click(function () {
    searchDiv();
  });
}
//显示搜索框***
function searchDiv() {
  //该隐藏的都隐藏
  $("#title_name").css("cssText", 'display:none !important');
  $("#title_info").css("cssText", 'display:none !important');
  $('#search_div').show();
  //输入回车或点击搜索按钮后
  $("input#search_input").keydown(function (e) {
    if (e.which == 13) {
      $("#search_button").trigger("click");
      return false;
    }
  });
  $("#search_button").click(function () {
    var str = $("#search_input").val();
    var id = parseInt(str);
    var ajaxjson;
    if (!isNaN(id)) {
      //搜索的是id
      //调用函数获取搜索结果列表，结果的内容是姓名、性别、生日、现居地。
      ajaxjson = get_person_brief_info_by_id_from_js(id);
    }
    else {
      //搜索的是名字
      //调用函数获取搜索结果列表，结果的内容是姓名、性别、生日、现居地。
      ajaxjson = get_person_brief_info_by_name_from_js(str);
    }
    var str_append = '';
    if (ajaxjson.length == 0) {
      str_append = '<li class="list-group-item" style="line-height:10px;">未找到相关信息</li>';
    }
    else {
      for (var i = 0; i < ajaxjson.length; i++) {
        str_append += '<li class="list-group-item" style="line-height:10px;"><a href="group_bigscreen.html?id=' + ajaxjson[i][0] + '">' + ajaxjson[i][1] + '</a></li>';
      }
    }
    $('#search_ul').empty();
    $("#search_ul").append(str_append);
    $("#search_list").show();
  });
}
function get_person_brief_info_by_id_from_js(id) {
  // alert(data_person[0]['姓名']);姓名、性别、生日、现居地
  // 根据id查找人并返回信息，如果查找不到则返回空集。返回结果是一个数组，数组里含有多条查找到得信息，每条数据是一个id加一个字符串
  if (id in data_person) {
    return [[id, data_person[id]['姓名'] + ' ' + data_person[id]['性别'] + ' ' + data_person[id]['生日'] + ' ' + data_person[id]['现居地']]];
  }
  else {
    return [];
  }
}
function get_person_brief_info_by_name_from_js(name) {
  var ar = [];
  for (key in data_person) {
    if (data_person[key]['姓名'] == name) {
      ar.push([key, data_person[key]['姓名'] + ' ' + data_person[key]['性别'] + ' ' + data_person[key]['生日'] + ' ' + data_person[key]['现居地']]);
    }
  }
  return ar;
}
function showOptions() {
  $("#second_row_options").show();
  listen_age();
  listen_gender();
  listen_edubg();
  listen_occupation();
  listen_income();
  listen_marriage();
  listen_region();
  listen_submit();
}
function listen_age() {
  // 鼠标移入范围
  $("#options_age_range").mouseenter(function () {
    $(this).css("background-color", "#17A2B8");
    $("#options_age_range>input").css("background-color", "white");
    $("#options_age_range>input").css("color", "black");
    $("#options_age_range_button").show();
  });
  // 鼠标移出范围
  $("#options_age_range").mouseleave(function () {
    if ($(this).attr("value") == 'false') {
      $(this).css("background-color", "transparent");
      $("#options_age_range>input").css("background-color", "white");
      $("#options_age_range>input").css("color", "black");
    }
    else {
      $(this).css("background-color", "#17A2B8");
      $("#options_age_range>input").css("background-color", "#17A2B8");
      $("#options_age_range>input").css("color", "white");
    }
    $("#options_age_range_button").hide();
  });
  // 点击确定按钮
  $('#options_age_range_button').click(function () {
    var a = parseInt($('#options_age_range_min').val());
    var b = parseInt($('#options_age_range_max').val());
    if (!isNaN(a) && !isNaN(b) && a <= b) {
      // range_data['年龄'][0] = a;
      // range_data['年龄'][1] = b;
      options_temp['年龄'] = a + ',' + b;
      $('#options_age_no').attr("value", "false");
      $('#options_age_no').css("background-color", "transparent");
      $('#options_age_range>input').css("background-color", "#17A2B8");
      $('#options_age_range>input').css("color", "white");
      $('#options_age_range').attr("value", 'true');
      $(this).hide();
    }
    else {
      alert('输入有误!!');
      $('#options_age_range').attr("value", 'false');
      $('#options_age_no').css('background-color', "#17A2B8");
    }
  });
  // 不限年龄按钮
  $('#options_age_no').click(function () {
    $('#options_age_range_min').val('');
    $('#options_age_range_max').val('');
    if ($(this).attr("value") == 'false') {
      options_temp['年龄'] = '不限';
      $(this).attr("value", 'true');
      $(this).css("background-color", "#17A2B8");
      $("#options_age_range").attr("value", "false");
      $("#options_age_range>input").css("background-color", "white");
      $("#options_age_range>input").css("color", "black");
      $("#options_age_range").css("background-color", "transparent");
    }
  });
}
function listen_gender() {
  $("#options_gender_man").click(function () {
    if ($(this).attr('value') == 'false') {
      $(this).css('background-color', '#17A2B8');
      $(this).attr('value', 'true');
      $('#options_gender_woman').css('background-color', 'transparent');
      $('#options_gender_woman').attr('value', 'false');
      $('#options_gender_no').css('background-color', 'transparent');
      $('#options_gender_no').attr('value', 'false');
      options_temp['性别'] = '男';
    }
  });
  $("#options_gender_no").click(function () {
    if ($(this).attr('value') == 'false') {
      $(this).css('background-color', '#17A2B8');
      $(this).attr('value', 'true');
      $('#options_gender_woman').css('background-color', 'transparent');
      $('#options_gender_woman').attr('value', 'false');
      $('#options_gender_man').css('background-color', 'transparent');
      $('#options_gender_man').attr('value', 'false');
      options_temp['性别'] = '不限';
    }
  });
  $("#options_gender_woman").click(function () {
    if ($(this).attr('value') == 'false') {
      $(this).css('background-color', '#17A2B8');
      $(this).attr('value', 'true');
      $('#options_gender_man').css('background-color', 'transparent');
      $('#options_gender_man').attr('value', 'false');
      $('#options_gender_no').css('background-color', 'transparent');
      $('#options_gender_no').attr('value', 'false');
      options_temp['性别'] = '女';
    }
  });
}
function listen_edubg() {
  $("#options_eduction_doctor").click(function (e) {
    $("#options_education_name").text(e.target.innerHTML);
    options_temp['学历'] = e.target.innerHTML;
  });
  $("#options_eduction_master").click(function (e) {
    $("#options_education_name").text(e.target.innerHTML);
    options_temp['学历'] = e.target.innerHTML;
  });
  $("#options_eduction_bachelor").click(function (e) {
    $("#options_education_name").text(e.target.innerHTML);
    options_temp['学历'] = e.target.innerHTML;
  });
  $("#options_eduction_junior").click(function (e) {
    $("#options_education_name").text(e.target.innerHTML);
    options_temp['学历'] = e.target.innerHTML;
  });
  $("#options_eduction_seniorhigh").click(function (e) {
    $("#options_education_name").text(e.target.innerHTML);
    options_temp['学历'] = e.target.innerHTML;
  });
  $("#options_eduction_juniorhigh").click(function (e) {
    $("#options_education_name").text(e.target.innerHTML);
    options_temp['学历'] = e.target.innerHTML;
  });
  $("#options_eduction_primary").click(function (e) {
    $("#options_education_name").text(e.target.innerHTML);
    options_temp['学历'] = e.target.innerHTML;
  });
  $("#options_eduction_illiteracy").click(function (e) {
    $("#options_education_name").text(e.target.innerHTML);
    options_temp['学历'] = e.target.innerHTML;
  });
  $("#options_eduction_no").click(function (e) {
    $("#options_education_name").text(e.target.innerHTML);
    options_temp['学历'] = e.target.innerHTML;
  });
}
function listen_occupation() {
  $('#job_bigjob').empty();
  for (var bigjob_code in classificationOfOccupations[86]) {
    str = '<a class="dropdown-item font-small9" id="zy' + bigjob_code + '">' + classificationOfOccupations[86][bigjob_code] + '</a>'
    $('#job_bigjob').append(str);
    // 大类的点击
    $('#zy' + bigjob_code).click(function (e) {
      options_temp['职业'] = e.target.innerHTML + ',不限';
      var bigjob_str = e.target.innerHTML;
      if (bigjob_str.length > 12) {
        bigjob_str = bigjob_str.substring(0, 12) + '…';
      }
      $('#bigjob_name').text(bigjob_str);
      $('#smalljob_name').text('不限');
      var bigjob_code2 = e.target.id.substring(2);
      // 初始化小类菜单
      $('#job_smalljob').empty();
      for (smalljob_code in classificationOfOccupations[bigjob_code2]) {
        var smalljob_str = '<a class="dropdown-item font-small9" id="zy' + smalljob_code + '">' + classificationOfOccupations[bigjob_code2][smalljob_code] + '</a>';
        $('#job_smalljob').append(smalljob_str);
        // 小类的点击
        $('#zy' + smalljob_code).click(function (ee) {
          options_temp['职业'] = options_temp['职业'].substring(0, options_temp['职业'].indexOf(',')) + ',' + ee.target.innerHTML;
          var smalljob_str2 = ee.target.innerHTML;
          if (smalljob_str2.length > 12) {
            smalljob_str2 = smalljob_str2.substring(0, 12) + '…';
          }
          $('#smalljob_name').text(smalljob_str2);
        });
      }
      $('#job_smalljob').append('<div class="dropdown-divider"></div>');
      $('#job_smalljob').append('<a class="dropdown-item font-small9" id="smalljob_no">不限</a>');
      $('#smalljob_no').click(function () {
        $('#smalljob_name').text('不限');
      });
      // 初始化小类菜单结束
    });
  }
  $('#job_bigjob').append('<div class="dropdown-divider"></div>');
  $('#job_bigjob').append('<a class="dropdown-item font-small9" id="bigjob_no">不限</a>');
  $('#bigjob_no').click(function () {
    options_temp['职业'] = '不限,不限';
    $('#job_smalljob').empty();
    $('#bigjob_name').text('不限');
    $('#smalljob_name').text('不限');
  });
}
function listen_income() {
  // 鼠标移入范围收入
  $("#options_income_range").mouseenter(function () {
    $(this).css("background-color", "#17A2B8");
    $("#options_income_range>input").css("background-color", "white");
    $("#options_income_range>input").css("color", "black");
    $("#options_income_range_button").show();
  });
  // 鼠标移出范围收入
  $("#options_income_range").mouseleave(function () {
    if ($(this).attr("value") == 'false') {
      $(this).css("background-color", "transparent");
      $("#options_income_range>input").css("background-color", "white");
      $("#options_income_range>input").css("color", "black");
    }
    else {
      $(this).css("background-color", "#17A2B8");
      $("#options_income_range>input").css("background-color", "#17A2B8");
      $("#options_income_range>input").css("color", "white");
    }
    $("#options_income_range_button").hide();
  });
  // 点击确定按钮收入
  $('#options_income_range_button').click(function () {
    var a = parseInt($('#options_income_range_min').val());
    var b = parseInt($('#options_income_range_max').val());
    if (!isNaN(a) && !isNaN(b) && a <= b) {
      // range_data['收入'][0] = a;
      // range_data['收入'][1] = b;
      options_temp['收入'] = a + ',' + b;
      $('#options_income_no').attr("value", "false");
      $('#options_income_no').css("background-color", "transparent");
      $('#options_income_range>input').css("background-color", "#17A2B8");
      $('#options_income_range>input').css("color", "white");
      $('#options_income_range').attr("value", 'true');
      $(this).hide();
    }
    else {
      alert('输入有误!!');
      $('#options_income_range').attr("value", 'false');
      $('#options_income_no').css('background-color', "#17A2B8");
    }
  });
  // 不限收入按钮
  $('#options_income_no').click(function () {
    if ($(this).attr("value") == 'false') {
      // range_data['收入'][0] = 0;
      // range_data['收入'][1] = 150;
      options_temp['收入'] = '不限';
      $(this).attr("value", 'true');
      $(this).css("background-color", "#17A2B8");
      $("#options_income_range").attr("value", "false");
      $("#options_income_range>input").css("background-color", "white");
      $("#options_income_range>input").css("color", "black");
      $("#options_income_range").css("background-color", "transparent");
    }
  });
}
function listen_marriage() {
  // 未婚
  $("#options_marriage_lonely").click(function () {
    if ($(this).attr('value') == 'false') {
      $(this).css('background-color', '#17A2B8');
      $(this).attr('value', 'true');
      $('#options_marriage_happy').css('background-color', 'transparent');
      $('#options_marriage_happy').attr('value', 'false');
      $('#options_marriage_sorry').css('background-color', 'transparent');
      $('#options_marriage_sorry').attr('value', 'false');
      $('#options_marriage_likedead').css('background-color', 'transparent');
      $('#options_marriage_likedead').attr('value', 'false');
      $('#options_marriage_no').css('background-color', 'transparent');
      $('#options_marriage_no').attr('value', 'false');
      options_temp['婚姻'] = '未婚';
    }
  });
  // 已婚
  $("#options_marriage_happy").click(function () {
    if ($(this).attr('value') == 'false') {
      $(this).css('background-color', '#17A2B8');
      $(this).attr('value', 'true');
      $('#options_marriage_lonely').css('background-color', 'transparent');
      $('#options_marriage_lonely').attr('value', 'false');
      $('#options_marriage_sorry').css('background-color', 'transparent');
      $('#options_marriage_sorry').attr('value', 'false');
      $('#options_marriage_likedead').css('background-color', 'transparent');
      $('#options_marriage_likedead').attr('value', 'false');
      $('#options_marriage_no').css('background-color', 'transparent');
      $('#options_marriage_no').attr('value', 'false');
      options_temp['婚姻'] = '已婚';
    }
  });
  // 离婚
  $("#options_marriage_sorry").click(function () {
    if ($(this).attr('value') == 'false') {
      $(this).css('background-color', '#17A2B8');
      $(this).attr('value', 'true');
      $('#options_marriage_happy').css('background-color', 'transparent');
      $('#options_marriage_happy').attr('value', 'false');
      $('#options_marriage_lonely').css('background-color', 'transparent');
      $('#options_marriage_lonely').attr('value', 'false');
      $('#options_marriage_likedead').css('background-color', 'transparent');
      $('#options_marriage_likedead').attr('value', 'false');
      $('#options_marriage_no').css('background-color', 'transparent');
      $('#options_marriage_no').attr('value', 'false');
      options_temp['婚姻'] = '离婚';
    }
  });
  // 丧偶
  $("#options_marriage_likedead").click(function () {
    if ($(this).attr('value') == 'false') {
      $(this).css('background-color', '#17A2B8');
      $(this).attr('value', 'true');
      $('#options_marriage_happy').css('background-color', 'transparent');
      $('#options_marriage_happy').attr('value', 'false');
      $('#options_marriage_sorry').css('background-color', 'transparent');
      $('#options_marriage_sorry').attr('value', 'false');
      $('#options_marriage_lonely').css('background-color', 'transparent');
      $('#options_marriage_lonely').attr('value', 'false');
      $('#options_marriage_no').css('background-color', 'transparent');
      $('#options_marriage_no').attr('value', 'false');
      options_temp['婚姻'] = '丧偶';
    }
  });
  // 不限
  $("#options_marriage_no").click(function () {
    if ($(this).attr('value') == 'false') {
      $(this).css('background-color', '#17A2B8');
      $(this).attr('value', 'true');
      $('#options_marriage_happy').css('background-color', 'transparent');
      $('#options_marriage_happy').attr('value', 'false');
      $('#options_marriage_sorry').css('background-color', 'transparent');
      $('#options_marriage_sorry').attr('value', 'false');
      $('#options_marriage_likedead').css('background-color', 'transparent');
      $('#options_marriage_likedead').attr('value', 'false');
      $('#options_marriage_lonely').css('background-color', 'transparent');
      $('#options_marriage_lonely').attr('value', 'false');
      options_temp['婚姻'] = '不限';
    }
  });
}
function listen_region() {
  $('#distract_province').empty();
  for (var province_code in ChineseDistricts[86]) {
    str = '<a class="dropdown-item font-small9" id="dq' + province_code + '">' + ChineseDistricts[86][province_code] + '</a>'
    $('#distract_province').append(str);
    // 省份的点击
    $('#dq' + province_code).click(function (e) {
      options_temp['地区'] = e.target.innerHTML + ',不限';
      $('#province_name').text(e.target.innerHTML);
      $('#city_name').text('不限');
      var province_code2 = e.target.id.substring(2);
      // 初始化市级菜单
      $('#distract_city').empty();
      for (city_code in ChineseDistricts[province_code2]) {
        city_str = '<a class="dropdown-item font-small9" id="dq' + city_code + '">' + ChineseDistricts[province_code2][city_code] + '</a>';
        $('#distract_city').append(city_str);
        // 市级的点击
        $('#dq' + city_code).click(function (ee) {
          // range_data['地区'][1] = ee.target.innerHTML;          
          options_temp['地区'] = options_temp['地区'].substring(0, options_temp['地区'].indexOf(',')) + ',' + ee.target.innerHTML;
          // range_data['地区'][2] = '不限';
          $('#city_name').text(ee.target.innerHTML);
          // $('#county_name').text('不限');
          var city_code2 = ee.target.id.substring(2);
          // 初始化县级菜单
          // $('#distract_county').empty();
          // for (county_code in ChineseDistricts[city_code2]) {
          //   // $('#test').text(county_code);
          //   county_str = '<a class="dropdown-item font-small9" id="dq' + county_code + '">' + ChineseDistricts[city_code2][county_code] + '</a>';
          //   $('#distract_county').append(county_str);
          //   // 县级的点击
          //   $('#dq' + county_code).click(function (eee) {
          //     range_data['地区'][2] = eee.target.innerHTML;
          //     $('#county_name').text(eee.target.innerHTML);
          //     getData(id);
          //     drawRadar();
          //     drawBar();
          //   });
          // }
          // $('#distract_county').append('<div class="dropdown-divider"></div>');
          // $('#distract_county').append('<a class="dropdown-item font-small9" id="county_no">不限</a>');
          // $('#county_no').click(function () {
          //   range_data['地区'][2] = '不限';
          //   $('#county_name').text('不限');
          //   getData(id);
          //   drawRadar();
          //   drawBar();
          // });
          //初始化县菜单结束
          // getData(id);
          // drawRadar();
          // drawBar();
        });
      }
      $('#distract_city').append('<div class="dropdown-divider"></div>');
      $('#distract_city').append('<a class="dropdown-item font-small9" id="city_no">不限</a>');
      $('#city_no').click(function () {
        // range_data['地区'][1] = '不限';
        // range_data['地区'][2] = '不限';
        $('#distract_county').empty();
        $('#city_name').text('不限');
        $('#county_name').text('不限');
        // getData(id);
        // drawRadar();
        // drawBar();
      });
      // 初始化市级菜单结束
      // 重新获取数据并画图
      // getData(id);
      // drawRadar();
      // drawBar();
    });

  }
  $('#distract_province').append('<div class="dropdown-divider"></div>');
  $('#distract_province').append('<a class="dropdown-item font-small9" id="province_no">不限</a>');
  $('#province_no').click(function () {
    // range_data['地区'][0] = '不限';
    // range_data['地区'][1] = '不限';
    // range_data['地区'][1] = '不限';
    options_temp['地区'] = '不限,不限';
    $('#distract_city').empty();
    $('#distract_county').empty();
    $('#province_name').text('不限');
    $('#city_name').text('不限');
    $('#county_name').text('不限');
    // getData(id);
    // drawRadar();
    // drawBar();
  });
}
function listen_submit() {
  $('#options_submit').click(function () {
    for (i in options) {
      options[i] = options_temp[i];
    }
    drawtu();
    // var s = ''
    // for (i in options) {
    //   s += i + ':';
    //   s += options[i] + '\n';
    // }
    // $("#test2020").text(s);
  });
}
function getDataCharts(id) {
  var parts = [];
  var num = 1;
  for (i in data_part) {
    data_charts[i] = {};
    data_charts[i]['common'] = data_part[i]['common'];
    data_charts[i]['good'] = data_part[i]['good'];
    data_charts[i]['score'] = data_person[id][i + '得分'];
    data_charts[i]['average'] = data_person[id][i + '得分'];
    data_charts[i]['good_num'] = 0;
    data_charts[i]['common_num'] = 0;
    data_charts[i]['danger_num'] = 0;
    data_charts[i]['myrank'] = 1;
    if (data_person[id][i + '得分'] >= data_charts[i]['good']) {
      data_charts[i]['good_num'] += 1;
    }
    else if (data_person[id][i + '得分'] >= data_charts[i]['common']) {
      data_charts[i]['common_num'] += 1;
    }
    else {
      data_charts[i]['danger_num'] += 1;
    }
    parts.push(i);
  }
  for (i in data_person) {
    if (i == id) {
      continue;
    }
    if (person_in_range(data_person[i])){
      num += 1;
      for (k in parts) {
        var j=parts[k];
        data_charts[j]['average'] = data_charts[j]['average'] * (num - 1 / num) + data_person[i][j + '得分'] * (1 / num);
        if (data_person[i][j + '得分'] >= data_charts[j]['good']) {
          data_charts[j]['good_num'] += 1;
        }
        else if (data_person[i][j + '得分'] >= data_charts[j]['common']) {
          data_charts[j]['common_num'] += 1;
        }
        else {
          data_charts[j]['danger_num'] += 1;
        }
        if (data_person[i][j + '得分'] > data_person[id][j + '得分']) {
          data_charts[j]['myrank'] += 1;
        }
      }
    }
  }
  data_charts['num']=num;
}
function person_in_range(p) {
  // alert(p['姓名']);
  if (options['年龄'] != '不限' && (new Date().getFullYear() - parseInt(p['生日']) < parseInt(options['年龄'].split(',')[0]) || new Date().getFullYear() - parseInt(p['生日']) > parseInt(options['年龄'].split(',')[1]))) {
    return false;
  }
  if (options['性别'] != '不限' && options['性别'] != p['性别']) {
    return false;
  }
  if (options['学历'] != '不限' && options['学历'] != p['学历']) {
    return false;
  }
  if (options['婚姻'] != '不限' && options['婚姻'] != p['婚姻状况']) {
    return false;
  }
  if (options['收入'] != '不限' && (p['收入'] < parseInt(options['收入'].split(',')[0]) || p['收入'] > parseInt(options['收入'].split(',')[1]))) {
    return false;
  }
  if (options['职业'].split(',')[0] != '不限' && options['职业'].split(',')[0] != p['工作'].split(',')[0]) {
    return false;
  }
  if (options['职业'].split(',')[1] != '不限' && options['职业'].split(',')[1] != p['工作'].split(',')[1]) {
    return false;
  }
  if (options['地区'].split(',')[0] != '不限' && options['现居地'].split(',')[0] != p['工作'].split(',')[0]) {
    return false;
  }
  if (options['地区'].split(',')[1] != '不限' && options['现居地'].split(',')[1] != p['工作'].split(',')[1]) {
    return false;
  }
  
  return true;
}

function drawtu(){
  getDataCharts(id);
  var s = data_person[0]['姓名'];
  for (i in data_charts){
    s+=i+':';
    s+=data_charts[i];
    // for(j in data_charts[i]){
    //   s+=j+',';
    //   s+=data_charts[i][j]+';';

    // }
    
    
  }
  $("#test2020").text(s);
  // var myDate = ;
  // var year = myDate; //获取当前年
  alert("sfa");
}



// 雷达图
function drawRadar() {
  var radar = echarts.init(document.getElementById("radar"));
  radar_option = null;
  radar_option = {
    title: {
      text: '多部位情况',
      top: 'top',
      textStyle: {
        color: 'white',
      },
    },
    // backgroundColor: 'rgba(255,255,255,0.1)',
    tooltip: {
      trigger: 'axis'
    },
    color: ['#28A745', '#007BFF', '#DC3545', '#FFC107'],
    legend: {
      x: 'right',
      data: ['理想值', '平均值', '警戒值', '当前值'],
      textStyle: {
        color: 'white',
      },
    },
    radar: [
      {
        indicator: [

          { name: category[0], max: 100, color: 'white' },
          { name: category[1], max: 100 },
          { name: category[2], max: 100 },
          { name: category[3], max: 100 },
          { name: category[4], max: 100 },
          { name: category[5], max: 100 },
          { name: category[6], max: 100 },
        ],
        shape: 'circle',
        center: ['50%', '55%'],
        radius: '70%',
        startAngle: 90,
        name: {
          color: 'white',
        }
      }
    ],
    series: [
      {
        type: 'radar',
        radarIndex: 0,
        itemStyle: { normal: { areaStyle: { type: 'default' } } },
        data: [
          {
            name: '理想值',
            value: [
              radar_data['总体']['理想值'],
              radar_data['心脑血管']['理想值'],
              radar_data['大脑']['理想值'],
              radar_data['心脏']['理想值'],
              radar_data['代谢']['理想值'],
              radar_data['肾']['理想值'],
              radar_data['血压']['理想值'],
            ],
            symbol: 'none',
            areaStyle: {
              color: '#28A745',
            },
            lineStyle: {
              color: '#28A745',
            },
          },
          {
            name: '平均值',
            value: [
              radar_data['总体']['平均值'],
              radar_data['心脑血管']['平均值'],
              radar_data['大脑']['平均值'],
              radar_data['心脏']['平均值'],
              radar_data['代谢']['平均值'],
              radar_data['肾']['平均值'],
              radar_data['血压']['平均值'],
            ],
            symbol: 'none',
            areaStyle: {
              color: '#007BFF',
            },
            lineStyle: {
              color: '#007BFF',
            },
          },
          {
            name: '警戒值',
            value: [
              radar_data['总体']['警戒值'],
              radar_data['心脑血管']['警戒值'],
              radar_data['大脑']['警戒值'],
              radar_data['心脏']['警戒值'],
              radar_data['代谢']['警戒值'],
              radar_data['肾']['警戒值'],
              radar_data['血压']['警戒值'],
            ],
            areaStyle: {
              color: '#DC3545',
            },
            symbol: 'none',
            lineStyle: {
              color: '#DC3545',
            },
          },
          {
            name: '当前值',
            value: [
              radar_data['总体']['当前值'],
              radar_data['心脑血管']['当前值'],
              radar_data['大脑']['当前值'],
              radar_data['心脏']['当前值'],
              radar_data['代谢']['当前值'],
              radar_data['肾']['当前值'],
              radar_data['血压']['当前值'],
            ],
            symbol: 'none',
            areaStyle: {
              color: '#FFC107',
            },
            lineStyle: {
              color: '#FFC107',
            },
          }
        ]
      }
    ]
  };
  if (radar && typeof radar_option === "object") {
    radar.setOption(radar_option, true);
  }
}
// 柱状图
function drawBar() {
  var bar = echarts.init(document.getElementById("bar"));
  bar_option = null;
  bar_option = {
    title: {
      text: '各部分评分与等级分布',
      textStyle: {
        color: 'white',
      },
    },
    // backgroundColor: 'rgba(255,255,255,0.1)',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        var total = bar_data[params[0].name]['良好人数'] + bar_data[params[0].name]['正常人数'] + bar_data[params[0].name]['危险人数'];
        var me = bar_data[params[0].name]['我的排名'];
        var res = params[0].name + '<br>';
        res += '<span style="color:' + params[params.length - 1].color + ';font-size:1.5em;">●</span>' +
          params[params.length - 1].seriesName + '：' + me + '/' + total + '（' + (me * 100 / total).toFixed(1) + '%）<br>';
        for (var i = params.length - 2; i >= 0; i--) {
          res += '<span style="color:' + params[i].color + ';font-size:1.5em;">●</span>' +
            params[i].seriesName + '：' + params[i].data + '<br>';
        }
        return res;
      }
    },
    color: ['#C23531', '#2F4554', '#61A0AB', '#FFC107'],
    // color: ['#28A745', '#007BFF', '#DC3545', '#FFC107'],
    legend: {
      data: [
        '良好',
        '正常',
        '危险',
        {
          name: '我的位置',
          icon: 'circle',
          textStyle: {
            color: 'white'
          },
        }
      ],
      selectedMode: false,
      x: 'right',
      textStyle: {
        color: 'white',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: category,
        axisLine: {
          lineStyle: {
            color: 'white',
          },
        },
      },
    ],
    yAxis: [
      {
        name: '人数',
        type: 'value',
        axisLine: {
          lineStyle: {
            color: 'white',
          },
        },
      }
    ],
    series: [
      {
        name: '危险',
        type: 'bar',
        stack: '等级',
        data: [
          bar_data[category[0]]['危险人数'],
          bar_data[category[1]]['危险人数'],
          bar_data[category[2]]['危险人数'],
          bar_data[category[3]]['危险人数'],
          bar_data[category[4]]['危险人数'],
          bar_data[category[5]]['危险人数'],
          bar_data[category[6]]['危险人数'],
        ],

      },
      {
        name: '正常',
        type: 'bar',
        stack: '等级',

        data: [
          bar_data[category[0]]['正常人数'],
          bar_data[category[1]]['正常人数'],
          bar_data[category[2]]['正常人数'],
          bar_data[category[3]]['正常人数'],
          bar_data[category[4]]['正常人数'],
          bar_data[category[5]]['正常人数'],
          bar_data[category[6]]['正常人数'],
        ],
      },
      {
        name: '良好',
        type: 'bar',
        stack: '等级',

        data: [
          bar_data[category[0]]['良好人数'],
          bar_data[category[1]]['良好人数'],
          bar_data[category[2]]['良好人数'],
          bar_data[category[3]]['良好人数'],
          bar_data[category[4]]['良好人数'],
          bar_data[category[5]]['良好人数'],
          bar_data[category[6]]['良好人数'],
        ],
      },
      {
        name: '我的位置',
        type: 'bar',
        stack: '等级',
        data: [0, 0, 0, 0, 0, 0, 0],
        markPoint: {
          symbol: 'circle',
          symbolOffset: [0, 0],
          symbolSize: 8,
          itemStyle: {
            color: '#FFC107',
          },
          data: [
            { coord: [category[0], bar_data[category[0]]['良好人数'] + bar_data[category[0]]['正常人数'] + bar_data[category[0]]['危险人数'] - bar_data[category[0]]['我的排名']] },
            { coord: [category[1], bar_data[category[1]]['良好人数'] + bar_data[category[1]]['正常人数'] + bar_data[category[1]]['危险人数'] - bar_data[category[1]]['我的排名']] },
            { coord: [category[2], bar_data[category[2]]['良好人数'] + bar_data[category[2]]['正常人数'] + bar_data[category[2]]['危险人数'] - bar_data[category[2]]['我的排名']] },
            { coord: [category[3], bar_data[category[3]]['良好人数'] + bar_data[category[3]]['正常人数'] + bar_data[category[3]]['危险人数'] - bar_data[category[3]]['我的排名']] },
            { coord: [category[4], bar_data[category[4]]['良好人数'] + bar_data[category[4]]['正常人数'] + bar_data[category[4]]['危险人数'] - bar_data[category[4]]['我的排名']] },
            { coord: [category[5], bar_data[category[5]]['良好人数'] + bar_data[category[5]]['正常人数'] + bar_data[category[5]]['危险人数'] - bar_data[category[5]]['我的排名']] },
            { coord: [category[6], bar_data[category[6]]['良好人数'] + bar_data[category[6]]['正常人数'] + bar_data[category[6]]['危险人数'] - bar_data[category[6]]['我的排名']] },
          ],
        }
      },
    ]
  };
  if (bar && typeof bar_option === "object") {
    bar.setOption(bar_option, true)
  }
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
  $('#title_info_address').text(personal_data['籍贯']);
  // 填写总体健康指数
  $('#total_health_index').text(getTotalHealthIndex());
  // 获取雷达图和柱状图的数据
  getData(0);
  // 画雷达图
  drawRadar();
  // 画柱状图
  drawBar();
  handle_options(id);
  // $('#test').text(ChineseDistricts[86][370000]);


}