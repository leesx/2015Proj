define(function(require, exports, module){
    var $ = require('jquery');
    /*****************主导航下拉*********************/
$(function(){
    var time = null;
    var list = $("#navlist");
    var box = $("#navbox");
    var lista = list.find("li:not(:first)");
        //alert(lista)
    for(var i=0,j=lista.length;i<j;i++){
        if(lista[i].className == "current"){
            var olda = i;
        }
    }

    var box_show = function(hei){
        box.stop().animate({
            height:hei,
            opacity:1
        },0);
    }

    var box_hide = function(){
        box.stop().animate({
            height:0,
            opacity:0
        },0);
    }


    lista.hover(function(){
        lista.removeClass("current");
        $(this).addClass("current");
        clearTimeout(time);
        var index = list.find("li").index($(this));
        box.find(".drop-menu").hide().eq(index-1).show();
        var _height = box.find(".drop-menu").eq(index).height();
        box_show(_height)
    },function(){
        time = setTimeout(function(){
            box.find(".drop-menu").hide();
            box_hide();
        },50);
        lista.removeClass("current");
        lista.eq(olda).addClass("current");
    });

    box.find(".drop-menu").hover(function(){
        var _index = box.find(".drop-menu").index($(this));
        lista.removeClass("current");
        lista.eq(_index).addClass("current");
        clearTimeout(time);
        $(this).show();
        var _height = $(this).height();
        box_show(_height);
    },function(){

        $(this).hide();
            box_hide();

        lista.removeClass("current");
        lista.eq(olda).addClass("current");
    });
})

})