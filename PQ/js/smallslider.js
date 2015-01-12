define(function(require, exports, module){
    var $ = require('jquery');
    var easing = require('easing');
    /**
 * smallslider插件
 * Usage:  $('#slider').smallslider({ onImageStop:true, switchEase: 'easeOutSine',switchPath: 'left'});
 *
 * @param elm 你想要使用的最外层
 * @param options 一些附加参数
 *
 * Valid options:
 * ---------------------------------------
 *  time:3000,                                  // 切换时间间隔，单位毫秒，1秒=1000毫秒
 *  autoStart:true,                         // 是否自动开始播放
 *  onImageStop : false ,             // 鼠标放在图片上时，是否停止播放
 *  switchMode:'hover',             // 图片切换的方式，click为单击切换，hover为鼠标移动到按钮上时切换
 *  switchEffect:'fadeOut',         // 切换特效,fadeOut, ease, none,
 *  switchPath: 'left' ,                 // 切换的方向，可选值为：up ， left ，即向上，向左
 *  switchEase : 'easeOutQuart' , // 可选值列表如下
 *  switchTime: 600,                    // 切换时间，单位毫秒，1秒=1000毫秒
 *  actionGap: 200,                     //[0.5版本新增]鼠标单击或移动触发切换，切换响应的时间间隔，0为立即响应，时间越大，响应越慢
 *  buttonPosition: 'rightBottom', // 按钮位置表示，共有四个值：leftTop，leftBottom, rightTop, rightBottom
 *  buttonOffsetX:10,               // 水平方向上的按钮偏移位置，指向中心部移动多少，这里是数值，不加px
 *  buttonOffsetY:4,                // 竖直方向上的按钮偏移位置，指向中心部移动多少，这里是数值，不加px
 *  buttonSpace:4,                  // 按钮之间的间隔 单位为像素，但不要加px
 *  showText: true,                 // 是否显示标题，如果不显示，则只显示按钮
 *  showButtons : true,         // 是否显示按钮，默认显示
 *  textLink : true,                // 是否给显示的标题加上链接，如果为false，则，只显示标题，标题不可单击，链接的地址自动和当前播放到的图片地址一致
 *  textSwitch : 0 ,            // 标题是否运动显示，如果为0则不动，1 标题动，2 标题和背景一起动。
 *  textPosition: '',       // 标题栏的位置，默认为空，即和按钮的位置一致，取值 top ,  bottom
 *  textAlign: ''       // 如果留空，则会默认和按钮位置的相反方向排列，取值：left, center, right
 */
(function($) {

    $.smallslider=function(elm, options){

    // this 为当前的smallslider对象，为了区别，使用 _this 替换
    var _this = this;
          _this.elm = elm ;     // elm 为当前的 DOM对象 ，即使用class="smallslider" 的那个div对象。
          _this.$elm = $(elm);  // $elm 为elm对象的jquery形式
          _this.opts=$.extend({},$.smallslider.defaults, options);
              _this.sliderTimer= null ;
              _this.actionGapTimer = null;
              _this.slideProcessing = false;
        // 初始化对象
        _this.init = function()
        {
            _this.$ul = _this.$elm.find('>ul') ;  // 为子元素ul
            _this.$lis = _this.$elm.find('li') ;  // 为所有ul下子元素li 数组
            _this.$ims = _this.$elm.find('img') ;  // 为所有li下子元素img 数组
            _this.itemNums = _this.$lis.length ;
            _this.width = _this.$elm.width();
            _this.height = _this.$elm.height();
            _this.current = 0 ;         // 当前的index索引

            if(_this.itemNums > 1)
            {
            if(_this.opts.switchEffect=='ease')
            {
                _this.$ul.css({
                position:'absolute',
                left:0,
                top: 0
                });
                if(_this.opts.switchPath=='left')
                {
                var width = _this.itemNums *  _this.width;
                _this.$lis.css({
                    'float' : 'left'
                });
                _this.$ul.css({
                    'width' : width
                });
                }
                else if(_this.opts.switchPath=='up')
                {
                var height = _this.itemNums *  _this.height;
                _this.$ul.css({
                    'height' : height
                });
                }
            }
            else if(_this.opts.switchEffect=='fadeOut')
            {
                _this.$ul.css({
                    position:'relative', width:'100%', height:'100%'
                });
                _this.$lis.css({
                position:'absolute',
                zIndex:1
                }).eq(0).css({
                zIndex:2
                });
            }
            if(_this.opts.showButtons)
            {
                _this.createButtons();  // 创建按钮。
            }
            if(_this.opts.showText)
            {
                _this.createText(); // 创建文字显示。
            }
            if(_this.opts.autoStart)
            {
                _this.startSlider(1);
            }
            if(_this.opts.onImageStop)
            {
                _this.onImage();
            }
            }
        };
        _this.createButtons = function()
        {
            var buttons='';
            for(var i=1; i <= _this.itemNums ; i++ ){
            buttons += '<span>'+i+'</span>';
            }
            buttons ='<div class="smallslider-btns">' + buttons + '</div>';
            var left=0,right=0,top =0,bottom=0;
            var style_btns={};
            switch(_this.opts.buttonPosition){
            case 'leftTop':
                left = _this.opts.buttonOffsetX;
                top  = _this.opts.buttonOffsetY;
                style_btns={left: left + 'px' , top: top+'px'};
                break;
            case 'rightTop':
                right = _this.opts.buttonOffsetX;
                top  = _this.opts.buttonOffsetY;
                style_btns={right: right + 'px' , top: top+'px'};
                break;
            case 'rightBottom':
                right = _this.opts.buttonOffsetX;
                bottom = _this.opts.buttonOffsetY;
                style_btns={right: right + 'px' ,bottom: bottom+'px'};
                break;
            case 'leftBottom':
                left = _this.opts.buttonOffsetX;
                bottom = _this.opts.buttonOffsetY;
                style_btns={left: left + 'px' ,bottom: bottom+'px'};
                break;
            }
            $(buttons).css(style_btns).appendTo(_this.$elm);
            _this.$btns = _this.$elm.find('span');
            _this.$elm.find('span:not(:first)').css({marginLeft: _this.opts.buttonSpace+'px'});
            _this.$btns.removeClass('current-btn');
            _this.$btns.eq(0).addClass('current-btn');
            if(_this.opts.switchMode=='click'){
            _this.$btns.click(function(){
                var ix = _this.$btns.index($(this));
                //_this.slideTo(ix); // 表示需要切换到哪一张
                             _this.actionSlide(ix);
            });
            }else if(_this.opts.switchMode=='hover'){
             _this.$btns.hover(function(){
                var ix = _this.$btns.index($(this));
                //_this.slideTo(ix);
                             _this.actionSlide(ix);
            });
            }
        };

        _this.actionSlide = function(ix){
           // console.log(_this.actionGapTimer);
            if(_this.actionGapTimer){
                clearTimeout(_this.actionGapTimer);
                _this.actionGapTimer = null ;
            }
            _this.actionGapTimer = setTimeout(function(){_this.slideTo(ix) ;}, _this.opts.actionGap);

        };
        // 创建标题标签
    _this.createText = function(){
        var style_tex={};
        switch(_this.opts.buttonPosition){
        case 'leftTop':
            style_tex={left:0,  top:0,textAlign:'right'};
            _this.textPosition = 'top';
            break;
        case 'rightTop':
            style_tex={left:0,  top:0,textAlign:'left'};
            _this.textPosition = 'top';
            break;
        case 'rightBottom':
            style_tex={left:0,bottom:0,textAlign:'left'};
            _this.textPosition = 'bottom';
            break;
        case 'leftBottom':
            style_tex={left:0,bottom:0,textAlign:'right'};
            _this.textPosition = 'bottom';
            break;
        }
        if(_this.opts.textPosition){
        switch(_this.opts.textPosition)
        {
            case 'top':
                style_tex.left = 0 ;style_tex.top = 0;
                break;
            case 'bottom':
                style_tex.left = 0 ;style_tex.bottom=0 ;
                break;
        }
        _this.textPosition = _this.opts.textPosition ;
        }
        if(_this.opts.textAlign)
        {
            style_tex.textAlign =_this.opts.textAlign;
        }
        $('<div class="smallslider-tex smallslider-lay"></div>').css(style_tex).css({
        opacity:0.39
        }).appendTo(_this.$elm);

        var tex0= _this.$ims.eq(0).attr('alt');
        if(_this.opts.textLink){
        tex0 = '<a href="'+_this.$ims.eq(0).parent('a').attr('href')+'">'+ tex0+'</a>';
        }
        $('<h3 class="smallslider-tex"></h3>').css(style_tex).html(tex0).appendTo(_this.$elm);
        _this.$h3 = _this.$elm.find('h3');
        _this.$lay = _this.$elm.find('div.smallslider-lay');
        _this.$tex = _this.$elm.find('.smallslider-tex');
    };
        _this.onImage =function(){
            _this.$ims.hover(function(){
                _this.stopSlider();
            }, function(){
                _this.slideTo(_this.current+1);
            });
        };

        _this.slideTo = function (index){
            _this.stopSlider(); // 先清掉以前的setTimeout;
            if(index > _this.itemNums -1) index = 0;
        if(index < 0 ) index = _this.itemNums -1 ;
        // 切换表示当前元素
            _this.$lis.removeClass('current-li').eq(index).addClass('current-li');
        if(_this.opts.showButtons)
        {
        _this.$btns.removeClass('current-btn');
        _this.$btns.eq(index).addClass('current-btn');
        }
        _this.slideText(index);
        var chAttr = '';
        var iC = 0;
        switch(_this.opts.switchPath)
        {
        case 'left':
            chAttr = 'left';
            iC =_this.width ;
            break;
        case 'up':
         default :
            chAttr = 'top';
            iC = _this.height ;
            break;
        }
        var iCx = -1 * index * iC; // Top或Left 变化量
        var switchEase = _this.opts.switchEase  ;
            switch( _this.opts.switchEffect){
                case 'fadeOut':
                    if(_this.current != index)
                    {
                        _this.slideProcessing = true ;
                        _this.$lis.stop(true,false);
                        _this.$lis.css({zIndex:1,opacity:1}).hide();
                        _this.$lis.eq(_this.current).css({zIndex:3}).show();
                        _this.$lis.eq(index).css({zIndex:2}).show();
                        _this.$lis.eq(_this.current).fadeOut(_this.opts.switchTime,function(){
                _this.$lis.css({zIndex:1});
                _this.$lis.eq(index).css({zIndex:3,opacity:1}).show();
                                _this.slideProcessing = false;
                    });
                    }
                    break;
        case 'ease':
            _this.$ul.stop(true,false);
            if(chAttr=='top')
            _this.$ul.animate({top : iCx}, {duration: _this.opts.switchTime, easing: switchEase, complete: function(){
                }
            });
            else if(chAttr=='left')
            _this.$ul.animate({left : iCx}, {duration: _this.opts.switchTime, easing: switchEase ,complete:function(){
            }});
            break;
                case 'none':
                default :
                    _this.$lis.eq(_this.current).hide();
                    _this.$lis.eq(index).show();
                    break;
            }
        _this.current = index ;
            _this.startSlider(index+1);
        };

    // 切换文字
    _this.slideText = function(index)
    {
        if(_this.opts.showText)
        {
            var tex = _this.$ims.eq(index).attr('alt');
            if(_this.opts.textLink){
            tex = '<a href="'+_this.$ims.eq(index).parent('a').attr('href')+'">'+ tex+'</a>';
            }
            _this.$h3.html(tex);
            if(_this.opts.textSwitch>0){
            var t_path = _this.$h3.height();
            var t_ani1 ={}, t_ani2 ={};
            if(_this.textPosition=='top'){
                t_ani1 = {top : -1*t_path};
                t_ani2 = {top : 0};
             }
            else if(_this.textPosition=='bottom'){
                t_ani1 = {bottom : -1*t_path};
                t_ani2 = {bottom : 0};
             }
             if(_this.opts.textSwitch==1) {
                 _this.$h3.stop(true, false).animate(t_ani1, {duration: 200, easing: 'easeOutQuad'}).animate(t_ani2, {duration: 200, easing: 'easeOutQuad'});
             }else if(_this.opts.textSwitch==2){
                 _this.$tex.stop(true, false).animate(t_ani1, {duration: 200, easing: 'easeOutQuad'}).animate(t_ani2, {duration: 200, easing: 'easeOutQuad'});
                //_this.$lay.animate(t_ani1, {duration: 200, easing: 'easeOutQuad'}).animate(t_ani2, {duration: 200, easing: 'easeOutQuad'});
             }
            }
        }
    };

    // 开始切换
        _this.startSlider = function(index){
            // 由第几个序号开始 初始为1
            var st =setTimeout(function(){
                _this.slideTo(index);
            },_this.opts.time);
        _this.sliderTimer = st ;
        };
    // 停止切换
        _this.stopSlider = function(){
        //if(_this.opts.switchEffect=='fadeOut') _this.$lis.stop();
      //  else if(_this.opts.switchEffect=='ease') _this.$ul.stop();
            if(_this.sliderTimer) {
        clearTimeout(_this.sliderTimer);
        }
            _this.sliderTimer = null;
        };

    _this.init();
    };

    $.smallslider.defaults={
            time:3000,
            autoStart:true,
        onImageStop : false ,
            switchMode:'hover',
            switchEffect:'fadeOut',
        switchPath: 'left' ,
        switchEase : 'easeOutQuart' ,
            switchTime: 600,
            actionGap: 200,
            buttonPosition: 'rightBottom',
            buttonOffsetX:10,
            buttonOffsetY:4,
            buttonSpace:4,
        showText: true,
        showButtons : true,
        textLink : true,
        textSwitch : 0 ,
        textPosition: '',
        textAlign: ''
    };

    $.fn.smallslider = function(options){
        // 遍历由$.smallslider类创建生成的smallslider对象。
        return this.each(function(i){
                (new $.smallslider(this, options));
       });
    };

})(jQuery);

$.smallslider.switchEases = ["easeInQuad", "easeOutQuad", "easeInOutQuad", "easeInCubic", "easeOutCubic",
 "easeInOutCubic", "easeInQuart", "easeOutQuart", "easeInOutQuart", "easeInQuint", "easeOutQuint", "easeInOutQuint",
 "easeInSine", "easeOutSine", "easeInOutSine", "easeInExpo", "easeOutExpo", "easeInOutExpo", "easeInCirc", "easeOutCirc", "easeInOutCirc", "easeInElastic",
 "easeOutElastic", "easeInOutElastic", "easeInBack", "easeOutBack", "easeInOutBack",
 "easeInBounce", "easeOutBounce", "easeInOutBounce"];

// t: current time, b: begInnIng value, c: change In value, d: duration

})