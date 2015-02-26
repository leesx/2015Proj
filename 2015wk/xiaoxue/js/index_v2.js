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
	//首页校园新闻
	$.tab("#tabHnadle1","#tabBody1","cur","mouseenter");
	//教育教学
	$.tab("#tabHnadle2","#tabBody2","cur","mouseenter");
    //学生园地
    $.tab("#tabHnadle3","#tabBody3","cur","mouseenter");
    //教师天地
    $.tab("#tabHnadle4","#tabBody4","cur","mouseenter");
	//新闻资讯  
    $('#flashbox').smallslider({
        onImageStop:false,
        switchEffect:'ease',
        switchEase: 'easeOutBounce',
        buttonPosition:'leftTop',
        switchPath: 'up',
        switchMode: 'hover',
        textSwitch:2,
        textPosition: 'bottom',
        textAlign:'center'
    });



});

