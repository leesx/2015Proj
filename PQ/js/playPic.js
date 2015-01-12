define(function(require, exports, module){
    var $ = require('jquery');

    //焦点图
    $(function(){

        $("#playShow_1 li").each(function(index, li) {
            var title=$("#playShow_1 li").eq(index).find("img").attr('alt');
            $("#playNum_1 li").eq(index).find("span").html(title);
        });

        $("#playNum_1 li").mouseover(function(){
            n_1 = $(this).attr("data-num");
            show(n_1);
        });
        tt_1 = setInterval(showAuto_1(), 2000);//控制自动播放时间
        $("#rotateAdv_1").hover(function(){
            clearInterval(tt_1);
            $("#scroller-prev").animate({left: 0}, {queue: false,duration:200}).unbind().click(function(){//控制左边按钮滑入时间
                    n_1 = n_1 < 2 ? count_1 : --n_1;
                    show(n_1);
                  }).bind("mouseover",function(){$(this).addClass("prev-on");})
                    .bind("mouseout",function(){$(this).removeClass("prev-on");});
            $("#scroller-next").animate({right: 0}, {queue: false,duration:200}).unbind().click(function(){//控制右边按钮滑出时间
                    n_1 = n_1 > (count_1 - 1) ? 1 : ++n_1;
                    show(n_1);
                  }).bind("mouseover",function(){$(this).addClass("next-on");})
                    .bind("mouseout",function(){$(this).removeClass("next-on");});
        }, function(){

                $("#scroller-prev").animate({left: -50}, {queue: false,duration:200});//控制右边按钮滑出时间
                $("#scroller-next").animate({right: -50}, {queue: false,duration:200});//控制左边按钮滑出时间
                tt_1 = setInterval(showAuto_1(), 3000);
            });
    })
    function showAuto_1(n_1){
        n_1 = n_1 > (count_1 - 1) ? 1 : ++n_1;
        show(n_1);
    }
    function show(n_1){
        $("#playShow_1 li").eq(n_1-1).siblings().hide();
        $("#playNum_1 li").eq(n_1-1).addClass("curr").siblings().removeClass("curr");
        $("#playShow_1 li").eq(n_1-1).fadeIn();
        //$("#playNum_1 .curr").find("span").show();
    }

})