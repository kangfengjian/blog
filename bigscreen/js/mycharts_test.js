// 画流程图
function draw_process(id) {
    var process_con = document.getElementById(id);
    var a = $('#' + id).width() / 12;
    res = '<div class="row">'+
          '<div class="col" ></div>'+
          '<div class="col-1 no-padding d-flex justify-content-center align-items-center">'+
          '<span class="iconfont icon-arrow_left text-dark" style="font-size:'+a/3.0+'px;"></span>'+
          '</div>'+
          '<div class="col-1 no-padding d-flex justify-content-center align-items-center">'+
          '<span class="iconfont icon-ribbon text-danger" style="font-size:'+2.7*a+'px;"></span>'+
          '</div>'+
          '<div class="col-1 no-padding d-flex justify-content-center align-items-center">右连接</div>'+
          '<div class="col"></div>'+
          '</div >'+
          '<div class="row" style="margin-top:'+(-2*a)+'px;">'+
          '<div class="col"></div>'+
          '<div class="col-1 no-padding d-flex justify-content-center align-items-center">'+
          '<span class="iconfont icon-ribbon text-danger" style="font-size:'+2.7*a+'px;"></span>'+
          '</div>'+
          '<div class="col"></div>'+
          '</div>';
    $('#' + id).html(res);
}
draw_process('test');