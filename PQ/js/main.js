// JavaScript Document

define(function(require, exports, module){
	var $ = require('jquery'),
		jqueryMobile = require('jqueryMobile');//这里是jqueryMobile模块的引用
	jqueryMobile($);//执行jqueryMobile 的默认操作（這是重點）
	//下面就可以使用jqueryMobile的一些命令了，舉個栗子...
	//$(document).ready(function(e) {
//        $("#btn1").click(function(){
//			$("#div1").animate({"left":"600px","top":"500px","width":"500px","height":"500px","borderRadius":"500px","opacity":"1"},500,"linear");
//			})
//    });
	//$(document).bind('pageshow',function(){
//		//$.mobile.showPageLoadingMsg();
//		//alert(123)
//	});
	//运行了之后你会发现页面中有一个loading图片，这就是“$.mobile.showPageLoadingMsg()”的运行效果

var tab = require('tabMod');
var playPic = require('playPic');
var goTop = require('goTop');
var dropMenu = require('dropMenu');
var smallSlide = require('smallslider');

$(document).ready(function(){
	//促销活动
	$.tab("#tabHnadle1","#tabBody1","on","mouseenter");
	//热销排行
	$.tab("#tabHnadle2","#tabBody2","on","mouseenter");
	//眼睛百科
	$.tab("#tabHnadle3","#tabBody3","on","mouseenter");
	//用户中心
        $("li.u-center").hover(
		function(){

			$(this).addClass("u-center-active").children(".u-center-con").show();
			},
		function(){
			$(this).removeClass("u-center-active").children(".u-center-con").hide();
			}
		)
		//我的购物车
		$("#J_cart").hover(
		function(){
			$(this).find(".mycart").slideDown(100);

			},
		function(){
			$(this).find(".mycart").slideUp(100);

			}
		)
	//热销排行
		$(".sales-rank>li").eq(0).addClass("active");
        $(".sales-rank>li").hover(function(){

			$(this).addClass("active").siblings("li").removeClass("active");
			})


});


/****************jcarousel滚动插件************************/

//jQuery.easing['BounceEaseOut'] = function(p, t, b, c, d) {
//	if ((t/=d) < (1/2.75)) {
//		return c*(7.5625*t*t) + b;
//	} else if (t < (2/2.75)) {
//		return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
//	} else if (t < (2.5/2.75)) {
//		return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
//	} else {
//		return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
//	}
//};
//
//jQuery(document).ready(function() {
//    jQuery('#mycarousel').jcarousel({
//        easing: 'BounceEaseOut',
//        animation: 1000
//    });
//});

/****************jcarousel滚动插件 end************************/

 $(document).ready(function(){
        $('#flashbox,#flashbox2').smallslider({
		showButtons:true,
		showText : 0,
        onImageStop:true,
        switchEffect:'ease',switchEase: 'easeOutSine',
        switchPath: 'left',switchMode: 'hover',
        showText:true,textSwitch:2
        });
	});
/******************smallslider插件end************/


})