
/*
* 选项卡插件参数配置
* tabMenu 		选项卡标题菜单容器ID
* cls			当前状态的class
* tabContent　	选项卡内容容器ID
* event　		选项卡绑定的事件
*/
jQuery.tab = function(tabMenu,tabContent,cls,event) {
	$(tabContent).children(':gt(0)').hide();//隐藏所有的内容项
	$(tabMenu).children(':first').addClass(cls).show();//默认第一个菜单显示
	$(tabContent).children(':first').show();//默认第一个内容显示
	$(tabMenu).children().bind(event,function(){
		$(this).addClass(cls).siblings().removeClass(cls); 
		var activeindex = $(tabMenu).children().index(this);
		$(tabContent).children().eq(activeindex).show().siblings().hide();
		return false;
	});
};


$(document).ready(function(){
	//必备应用tab
	$.tab("#tabHnadle1","#tabBody1","active","mouseenter");
    //精品推荐
    $('#excellentApp li.item').hover(function(){
        $(this).find('.app_dl').hide().next().show();
    },function(){
        $(this).find('.app_dl').show().next().hide();
    });
    //必备应用
	$('.app_rank_list dl').hover(function(){
       $(this).addClass('on').siblings().removeClass('on')
    });
	//返回顶部
     $("#toTop").click(function(){
        $("html,body").animate({scrollTop:0},"slow");
        return false;
    });
    //弹出层
    $('#popBox .close').click(function(){
        $('#mask,#popBox ').remove();
    });
    //详情页展开——收起
    var appDecMod = $('.desc_mod');
    var appDec = $('.desc_mod .word');
    var descMore = $('.desc_mod .aw_btn');
    if(appDec.height()>125){
        descMore.show();
        appDec.height(125);
    }

    descMore.click(function(){
        if($(this).prev().height() == 125){
            $(this).addClass('aw_btn_expend').find('span').text('收起');
            $(this).prev().height('auto');
        }else{
            $(this).removeClass('aw_btn_expend').find('span').text('展开');
            $(this).prev().height(125);
        }

    });

});

$(document).ready(function(){
    //截图滚动
    var screenUl = $('.J_screenshot ul');
    var screenLi = $('.J_screenshot ul li');
    var liWidth = screenLi.outerWidth();
    var liSize = screenLi.size();
    var i = 0;
    screenUl.width((liWidth+6)*liSize);
    $('.J_screenshot .prev_btn').click(function(e){
        e.preventDefault();
        i++;
        screenUl.animate({'left':-i*liWidth},600);
        if(i >liSize-3){
            screenUl.animate({'left':0},600);
            i= 0;
        }


    });
    $('.J_screenshot .next_btn').click(function(e){
        e.preventDefault();
        i--;
        screenUl.animate({'left':i*liWidth},600);
        if(i < -1){
            screenUl.animate({'left':0},600);
            i = 0;
        }


    })
});
