define(function(require, exports, module){
    var $ = require('jquery');
    //返回顶部

    $(document).ready(function(e) {
        require('topShow').topShow();
        $('#gotop,#gotop2').click(function(){

            $(document).scrollTop(0);
        })
        $('#code').hover(function(){
                $(this).attr('id','code_hover');
                $('#code_img').show();
            },function(){
                $(this).attr('id','code');
                $('#code_img').hide();
        })
        $("#pq-kefu .close").click(function(){
            $("#pq-kefu").hide();
            $("#kefu-collapse").show();
            })
        $("#kefu-collapse .online").click(function(){
            $(this).parent().hide();
            $("#pq-kefu").show();
            })
        $(window).scroll(function(e){
            require('topShow').topShow();
        })
    });

})