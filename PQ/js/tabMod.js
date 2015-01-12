define(function(require, exports, module){
    var $ = require('jquery');
/*
* 选项卡插件参数配置
* tabMenu       选项卡标题菜单容器ID
* cls           当前状态的class
* tabContent　   选项卡内容容器ID
* event　        选项卡绑定的事件
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
    console.log('tabMOd');
    // 对外提供 doSomething 方法
    //exports.tab = function() {};
})