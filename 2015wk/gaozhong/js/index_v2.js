
$(document).ready(function(){
	$('.nav > li').hover(function(){
        $(this).addClass('cur').find('.sub-menu').stop(true,true).slideDown();
    },function(){
        $(this).removeClass('cur').find('.sub-menu').hide();
    });
});

//首页slide
$(document).ready(function(){
    var _scroll = $('#J_slide');
    var _speed = 30;
    var _ul = _scroll.children('ul');
    var _lis = _ul.children('li');
    var _w = _lis.outerWidth(true) * _lis.length;
    if( _lis.length > 5) {
        _ul.css('width',2 * _w + 'px');
        _ul.append(_lis.clone());

        var _scrolling = setInterval(marquee,_speed);

        _scroll.hover(function(){
            clearInterval(_scrolling);
        },function(){
            _scrolling = setInterval(marquee,_speed);
        });
    }
    //滚动函数
    function marquee(){
        if(_scroll.scrollLeft() >= _w) {
            _scroll.scrollLeft(0);
        } else{
            _scroll.scrollLeft(_scroll.scrollLeft()+1);
        }
    }
});
