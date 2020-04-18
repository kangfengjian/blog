//全局变量
var category = ['总体', '血压', '心脏', '大脑', '代谢', '胃', '肺',];
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
//一切从这里开始****************************************************************
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
  showOptions(id);
  getDataCharts(id);
  drawRadar();
  drawBar();
  showEvaluate(id);
  showWarning();
}
//在没有id的情况下加载页面***
function loadByNoId() {
  showTime();
  searchDiv();
  showOptions('no_id');
  getDataCharts('no_id');
  drawRadar();
  drawBar();
  showEvaluate('no_id');
  showWarning();
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
  var zhiye0 = data_person[id]['工作'].split(',')[0];
  var zhiye1 = data_person[id]['工作'].split(',')[1];
  if (zhiye1 == '不限') {
    zhiye = zhiye0;
  }
  else {
    zhiye = zhiye1;
  }
  $('#title_info_job').text(zhiye);
  $('#title_info_address').text(data_person[id]['现居地'].replace(',', ''));
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
    return [[id, data_person[id]['姓名'] + ' ' + data_person[id]['性别'] + ' ' + data_person[id]['生日'] + ' ' + data_person[id]['现居地'].replace(',', '')]];
  }
  else {
    return [];
  }
}
function get_person_brief_info_by_name_from_js(name) {
  var ar = [];
  for (key in data_person) {
    if (data_person[key]['姓名'] == name) {
      ar.push([key, data_person[key]['姓名'] + ' ' + data_person[key]['性别'] + ' ' + data_person[key]['生日'] + ' ' + data_person[key]['现居地'].replace(',', '')]);
    }
  }
  return ar;
}
function showOptions(id) {
  $("#second_row_options").show();
  listen_age();
  listen_gender();
  listen_edubg();
  listen_occupation();
  listen_income();
  listen_marriage();
  listen_region();
  listen_submit(id);
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
          options_temp['地区'] = options_temp['地区'].substring(0, options_temp['地区'].indexOf(',')) + ',' + ee.target.innerHTML;
          $('#city_name').text(ee.target.innerHTML);
          var city_code2 = ee.target.id.substring(2);
        });
      }
      $('#distract_city').append('<div class="dropdown-divider"></div>');
      $('#distract_city').append('<a class="dropdown-item font-small9" id="city_no">不限</a>');
      $('#city_no').click(function () {
        options_temp['地区'] = options_temp['地区'].substring(0, options_temp['地区'].indexOf(',')) + ',不限';
        $('#distract_county').empty();
        $('#city_name').text('不限');
        $('#county_name').text('不限');
      });
    });

  }
  $('#distract_province').append('<div class="dropdown-divider"></div>');
  $('#distract_province').append('<a class="dropdown-item font-small9" id="province_no">不限</a>');
  $('#province_no').click(function () {
    options_temp['地区'] = '不限,不限';
    $('#distract_city').empty();
    $('#distract_county').empty();
    $('#province_name').text('不限');
    $('#city_name').text('不限');
    $('#county_name').text('不限');
  });
}
function listen_submit(id) {
  $('#options_submit').click(function () {
    for (i in options) {
      options[i] = options_temp[i];
    }
    getDataCharts(id);
    drawRadar();
    drawBar();
    showEvaluate(id);
  });
}
function getDataCharts(id) {
  var parts = [];
  var num = 0;
  for (i in data_part) {
    data_charts[i] = {};
    data_charts[i]['common'] = data_part[i]['common'];
    data_charts[i]['good'] = data_part[i]['good'];
    data_charts[i]['score'] = data_person[id][i + '得分'];
    data_charts[i]['average'] = 0;
    data_charts[i]['good_num'] = 0;
    data_charts[i]['common_num'] = 0;
    data_charts[i]['danger_num'] = 0;
    data_charts[i]['myrank'] = 1;
    parts.push(i);
  }
  data_charts['总体'] = {};
  data_charts['总体']['common'] = 60;
  data_charts['总体']['good'] = 80;
  data_charts['总体']['score'] = data_person[id]['总体得分'];
  data_charts['总体']['average'] = 0;
  data_charts['总体']['good_num'] = 0;
  data_charts['总体']['common_num'] = 0;
  data_charts['总体']['danger_num'] = 0;
  data_charts['总体']['myrank'] = 1;
  parts.push('总体');
  for (i in data_person) {
    if (i == 'no_id') {
      continue;
    }
    if (person_in_range(data_person[i])) {
      num += 1;
      for (k in parts) {
        var j = parts[k];
        data_charts[j]['average'] = data_charts[j]['average'] * ((num - 1) / num) + data_person[i][j + '得分'] * (1 / num);
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
  data_charts['num_inrange'] = num;
  if (id == 'no_id') {
    data_charts['num_jisuan'] = num + 1;
  }
  else {
    if (!person_in_range(data_person[id])) {
      data_charts['num_jisuan'] = num + 1
      for (k in parts) {
        var j = parts[k];
        if (data_person[id][j + '得分'] >= data_charts[j]['good']) {
          data_charts[j]['good_num'] += 1;
        }
        else if (data_person[id][j + '得分'] >= data_charts[j]['common']) {
          data_charts[j]['common_num'] += 1;
        }
        else {
          data_charts[j]['danger_num'] += 1;
        }
      }
    }
    else {
      data_charts['num_jisuan'] = num;
    }
  }

}
function person_in_range(p) {
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
  if (options['地区'].split(',')[0] != '不限' && options['地区'].split(',')[0] != p['现居地'].split(',')[0]) {
    return false;
  }
  if (options['地区'].split(',')[1] != '不限' && options['地区'].split(',')[1] != p['现居地'].split(',')[1]) {
    return false;
  }
  return true;
}
// 雷达图
function drawRadar() {
  var radar = echarts.init(document.getElementById("radar"));
  radar_option = null;
  radar_option = {
    title: {
      text: '各部分情况',
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
      data: ['良好值', '平均值', '正常值', '当前值'],
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
            name: '良好值',
            value: [
              data_charts[category[0]]['good'],
              data_charts[category[1]]['good'],
              data_charts[category[2]]['good'],
              data_charts[category[3]]['good'],
              data_charts[category[4]]['good'],
              data_charts[category[5]]['good'],
              data_charts[category[6]]['good'],
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
              data_charts[category[0]]['average'],
              data_charts[category[1]]['average'],
              data_charts[category[2]]['average'],
              data_charts[category[3]]['average'],
              data_charts[category[4]]['average'],
              data_charts[category[5]]['average'],
              data_charts[category[6]]['average'],
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
            name: '正常值',
            value: [
              data_charts[category[0]]['common'],
              data_charts[category[1]]['common'],
              data_charts[category[2]]['common'],
              data_charts[category[3]]['common'],
              data_charts[category[4]]['common'],
              data_charts[category[5]]['common'],
              data_charts[category[6]]['common'],
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
              data_charts[category[0]]['score'],
              data_charts[category[1]]['score'],
              data_charts[category[2]]['score'],
              data_charts[category[3]]['score'],
              data_charts[category[4]]['score'],
              data_charts[category[5]]['score'],
              data_charts[category[6]]['score'],
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
        var total = data_charts['num_jisuan'];//总体人数
        var me = data_charts[params[0].name]['myrank'];
        var res = params[0].name + '<br>';
        res += '<span style="color:' + params[params.length - 1].color + ';font-size:1.5em;">●</span>' +
          params[params.length - 1].seriesName + '：' + me + '/' + total + '（' + ((total - me) * 100 / total).toFixed(2) + '%）<br>';
        for (var i = params.length - 2; i >= 0; i--) {
          res += '<span style="color:' + params[i].color + ';font-size:1.5em;">●</span>' +
            params[i].seriesName + '：' + params[i].data + '<br>';
        }
        return res;
      }
    },
    color: ['#C23531', '#2F4554', '#61A0AB', '#FFC107'],
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
          data_charts[category[0]]['danger_num'],
          data_charts[category[1]]['danger_num'],
          data_charts[category[2]]['danger_num'],
          data_charts[category[3]]['danger_num'],
          data_charts[category[4]]['danger_num'],
          data_charts[category[5]]['danger_num'],
          data_charts[category[6]]['danger_num'],
        ],

      },
      {
        name: '正常',
        type: 'bar',
        stack: '等级',

        data: [
          data_charts[category[0]]['common_num'],
          data_charts[category[1]]['common_num'],
          data_charts[category[2]]['common_num'],
          data_charts[category[3]]['common_num'],
          data_charts[category[4]]['common_num'],
          data_charts[category[5]]['common_num'],
          data_charts[category[6]]['common_num'],
        ],
      },
      {
        name: '良好',
        type: 'bar',
        stack: '等级',

        data: [
          data_charts[category[0]]['good_num'],
          data_charts[category[1]]['good_num'],
          data_charts[category[2]]['good_num'],
          data_charts[category[3]]['good_num'],
          data_charts[category[4]]['good_num'],
          data_charts[category[5]]['good_num'],
          data_charts[category[6]]['good_num'],
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
            normal: { label: { show: false } }
          },
          data: [
            { coord: [category[0], data_charts['num_jisuan'] - data_charts[category[0]]['myrank']+1] },
            { coord: [category[1], data_charts['num_jisuan'] - data_charts[category[1]]['myrank']+1] },
            { coord: [category[2], data_charts['num_jisuan'] - data_charts[category[2]]['myrank']+1] },
            { coord: [category[3], data_charts['num_jisuan'] - data_charts[category[3]]['myrank']+1] },
            { coord: [category[4], data_charts['num_jisuan'] - data_charts[category[4]]['myrank']+1] },
            { coord: [category[5], data_charts['num_jisuan'] - data_charts[category[5]]['myrank']+1] },
            { coord: [category[6], data_charts['num_jisuan'] - data_charts[category[6]]['myrank']+1] },
          ],
        }

      },
    ]
  };
  if (bar && typeof bar_option === "object") {
    bar.setOption(bar_option, true)
  }
}
// 显示评价信息
function showEvaluate(id) {
  $("#total_health_con").show();
  var str_age = '';
  if (options['年龄'] != '不限') {
    str_age += options['年龄'].split(',')[0] + "到" + options['年龄'].split(',')[1] + "岁的";
  }
  var str_income = '';
  if (options['收入'] != '不限') {
    str_income += '收入在' + options['收入'].split(',')[0] + "到" + options['收入'].split(',')[1] + "元范围内的";
  }
  var str_gender = '';
  if (options['性别'] != '不限') {
    str_gender += options['性别'] + '性，';
  }
  var str_marriage = '';
  if (options['婚姻'] != '不限') {
    str_marriage += options['婚姻'] + '人士，';
  }
  var str_greed = '';
  if (options['学历'] != '不限') {
    if (options['学历'] != '文盲或半文盲') {
      str_greed += options['学历'] + '学历';
    }
    else {
      str_greed += options['学历'];
    }

  }
  var zhiye1 = options['职业'].split(',')[0];
  var zhiye2 = options['职业'].split(',')[1];
  var str_zhiye = '';
  if (zhiye2 == '不限') {
    if (zhiye1 != '不限') {
      str_zhiye = '工作为' + zhiye1 + "的";
    }
  }
  else {
    str_zhiye = '工作为' + zhiye2 + "的";
  }
  var diqu1 = options['地区'].split(',')[0];
  var diqu2 = options['地区'].split(',')[1];
  var str_diqu = '';
  if (diqu2 == '不限') {
    if (diqu1 != '不限') {
      str_diqu = diqu1 + '人';
    }
  }
  else {
    str_diqu = diqu1+diqu2 + '人';
  }

  var s1='';
  var s2='';
  var s3='';
  var s4='';
  s1 = '系统中' + str_age + str_greed + str_gender + str_zhiye + str_income + str_marriage + str_diqu + "共" + (data_charts['num_inrange']) + '人。';
  if (data_charts['num_inrange'] == 0) {
    s = s1;
  }
  else {
    var defen = data_person[id]['总体得分'];
    var shuiping = "";
    if (defen >= 80) {
      shuiping += "良好";
    }
    else if (defen >= 60) {
      shuiping += "正常";
    }
    else {
      shuiping = "危险";
    }
    var bijiao = "";
    if (defen > data_charts['总体']['average']) {
      bijiao = '高';
    }
    else if (defen < data_charts['总体']['average']) {
      bijiao = '低';
    }
    else {
      bijiao = "等";
    }
    s2 = '您的总体健康水平得分为' + data_person[id]['总体得分'] + '，处于' + shuiping + '水平，' + bijiao + '于所选人群平均分(';
    s2 += data_charts['总体']['average'].toFixed(2) + '分)，高于' + (((data_charts['num_inrange'] - data_charts['总体']['myrank'] + 1) / data_charts['num_inrange'] * 100).toFixed(2)) + '%的人。'
    s3 = '您的';
    var lianghao = '';
    var zhengchang = '';
    var weixian = '';
    var zuiyou = '血压';
    var zuidi = '血压';
    for (j in category) {
      i = category[j];
      if (i == '总体') {
        continue;
      }
      if (data_person[id][i + '得分'] >= 80) {
        lianghao += i + '、';
      }
      else if (data_person[id][i + '得分'] >= 60) {
        zhengchang += i + '、';
      }
      else {
        weixian += i + '、';
      }
      if (data_person[id][i + '得分'] > data_person[id][zuiyou + '得分']) {
        zuiyou = i;
      }
      if (data_person[id][i + '得分'] < data_person[id][zuidi + '得分']) {
        zuidi = i;
      }
    }

    if (lianghao == '') {
      s3 += zuiyou + '得分' + data_person[id][zuiyou + '得分'] + '分，是所有项目中得分最高的，高于所选人群中' + (((data_charts['num_inrange'] - data_charts[zuiyou]['myrank'] + 1) / data_charts['num_inrange'] * 100).toFixed(2)) + '%的人。';
    }
    else if (lianghao.substring(0, lianghao.length - 1).indexOf('、') == -1) {
      lianghao = lianghao.substring(0, lianghao.length - 1);
      s3 += lianghao + '状况良好，得分' + data_person[id][lianghao + '得分'] + '分，是所有项目中得分最高的，高于所选人群中' + (((data_charts['num_inrange'] - data_charts[lianghao]['myrank'] + 1) / data_charts['num_inrange'] * 100).toFixed(2)) + '%的人。';
    }
    else {
      lianghao = lianghao.substring(0, lianghao.length - 1);
      var houweizhi = lianghao.lastIndexOf('、');
      lianghao = lianghao.substring(0, houweizhi) + '和' + lianghao.substring(houweizhi + 1);
      s3 += lianghao + '状况良好，其中' + zuiyou + '得分' + data_person[id][zuiyou + '得分'] + '分，是所有项目中得分最高的，高于所选人群中' + (((data_charts['num_inrange'] - data_charts[zuiyou]['myrank'] + 1) / data_charts['num_inrange'] * 100).toFixed(2)) + '%的人。';
    }
    s4 = '您的';
    if (weixian == '') {
      s4 += zuidi + '得分' + data_person[id][zuidi + '得分'] + '分，是所有项目中得分最低的，高于所选人群中' + (((data_charts['num_inrange'] - data_charts[zuidi]['myrank'] + 1) / data_charts['num_inrange'] * 100).toFixed(2)) + '%的人。';
    }
    else if (weixian.substring(0, weixian.length - 1).indexOf('、') == -1) {
      weixian = weixian.substring(0, weixian.length - 1);
      s4 += weixian + '状况较差，处于危险水平，得分' + data_person[id][weixian + '得分'] + '分，是所有项目中得分最低的，仅高于所选人群中' + (((data_charts['num_inrange'] - data_charts[weixian]['myrank'] + 1) / data_charts['num_inrange'] * 100).toFixed(2)) + '%的人。';
    }
    else {
      weixian = weixian.substring(0, weixian.length - 1);
      var houweizhi = weixian.lastIndexOf('、');
      weixian = weixian.substring(0, houweizhi) + '和' + weixian.substring(houweizhi + 1);
      s4 += weixian + '状况较差，处于危险水平，其中' + zuidi + '得分' + data_person[id][zuidi + '得分'] + '分，是所有项目中得分最低的，仅高于所选人群中' + (((data_charts['num'] - data_charts[zuidi]['myrank']) / data_charts['num'] * 100).toFixed(2)) + '%的人。';
    }
  }
  $("#evaluate_con").html(s1 + s2 + s3 + s4);
}
// 显示左下注意按钮
function showWarning() {
  $(document).ready(function () {
    $('#zhuyi_pop').popover({
      template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header text-dark"></h3><div class="popover-body"></div></div>',
      trigger: 'hover',
    }
    );
  });
}