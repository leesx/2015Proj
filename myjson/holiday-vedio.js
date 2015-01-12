/**
 * 2014-12-22
 * 寒假预科班.
 */
/*jQuery.tab = function (tabMenu, tabContent, cls, event) {
 $(tabContent).children(':gt(0)').hide();//隐藏所有的内容项
 $(tabMenu).children(':first').addClass(cls).show(); //默认第一个菜单显示
 $(tabContent).children(':first').show(); //默认第一个内容显示
 $(tabMenu).children().bind(event, function () {
 $(this).addClass(cls).siblings().removeClass(cls);
 var activeindex = $(tabMenu).children().index(this);
 $(tabContent).children().eq(activeindex).show().siblings().hide();
 return false;
 });
 };*/

jQuery.tab = function (tabMenu, tabContent, cls, event) {
    $(tabContent).children(':gt(0)').css('visibility','hidden');//隐藏所有的内容项
    $(tabMenu).children(':first').addClass(cls).css('visibility','visible'); //默认第一个菜单显示
    $(tabContent).children(':first').show(); //默认第一个内容显示
    $(tabMenu).children().bind(event, function () {
        $(this).addClass(cls).siblings().removeClass(cls);
        var activeindex = $(tabMenu).children().index(this);
        $('#conner-bg').animate({'left':activeindex*170},300,'easeOutBack');//背景滑动效果
        $(tabContent).children().eq(activeindex).css('visibility','visible').siblings().css('visibility','hidden');
        return false;
    });
};

function formatVideo(file,image,id){
    var playerVersion = new Date().getTime();
    var hasPlayed = false;//当前页面是否播放过
    var $myVideo = jwplayer('vedio').setup({
        flashplayer: '/site_media/common/js/jwplayer/jwplayer.flash.swf?v='+playerVersion,
        file: file,
        primary: "flash",//设置以flash格式显示视频
        width: '100%',
        height: '100%',
        image:image,
        autostart:false,
        events: {
            onComplete: function () {
                $.post('/holiday/post/sumbitvideo/',{"knowledge_id":id},function(){});
                $('#artlist').find('li[knowledge_id='+ id +']').find('i').addClass('on');
            }
        }
    });
}


//获取题目
function getQuestions(qid){
    $.post('/holiday/post/getquestion/',{"knowledge_id":qid},function(d){
        if (d.response === 'ok') {
            var data = d.data;
            if (!data) {
                // 如果没有数据
                $('#knowledge').html('<div class="nothing"><P>本知识点没有合适的测试内容</P><button class="self_btn self_btng">去学习新的内容</button></div>')
                return false
            }
            var temp = '';
            var oTsubject = data.subject;
            if (!oTsubject){
                temp += ( '<dl><dt><i class="q-icon"></i></dt>' );
            }else{
                temp += ( '<dl><dt><i class="q-icon"></i>' + oTsubject.content + ( oTsubject.image && oTsubject.image.url ? ( '<img src="' + oTsubject.image.url + '" alt="" />' ) : '' ) + '</dt>' );
            }


            if(data instanceof Array){
                var oQuetionsType = data[0].display;
            }else{
                var oQuetionsType = data.display;
            }


            //选择题
            if(oQuetionsType == 1){
                if(data instanceof Array){
                    var oQuestions = data[0].question;
                }else{
                    var oQuestions = data.question;
                }
                if(oQuestions!=null){
                    $.each(oQuestions,function(i){
                        var oTitle = this.subject;


                        temp += ('<dd ask_id="' + this.ask_id + '" ans="' + this.answer[0].option + '"><p>' + oTitle.content + ( oTitle.image.url ? ( '<img src="' + oTitle.image.url + '" alt="" />' ) : '' ) + '</p>');

                        if (this.status){
                         //已做过
                            var oOption = this.option;
                            $.each(oOption,function(i){
                                temp += '<p class="option"><label>' + this.option + '：' + this.content + (this.image.url ? '<img src="' + this.image.url + '" alt="">' : '') + '</label></p>'
                            });
                            temp += '</dd>';
                            var rightAns = this.answer[0].option;
                            var myAns = this.my_answer;
                            temp += ('<dd class="light-blue"><i class="a-icon"></i>正确答案：' + rightAns + '</dd>');
                            if (rightAns == myAns) {
                                temp += ('<dd class="light-green"><i class="right-icon"></i>我的答案：' + myAns + '</dd>');
                            }else{
                                temp += ('<dd class="dark-orange"><i class="error-icon"></i>我的答案：' + myAns + '</dd>');
                            }
                        }else{
                            var oOption = this.option;
                            $.each(oOption,function(j){
                                temp += '<p class="option"><label><input type="radio" name="option' + i + '" id="option' + i + j + '" value="' + this.option + '" />' + this.option + '：' + this.content + (this.image.url ? '<img src="' + this.image.url + '" alt="">' : '') + '</label></p>'
                            });
                            temp += '</dd>'

                        }
                    });
                }
            }
            //填空题
            if(oQuetionsType == 4){
                if(data instanceof Array){
                    var oQuestions = data[0].question;
                }else{
                    var oQuestions = data.question;
                }

                if(oQuestions!=null){
                    $.each(oQuestions,function(i){
                        var oTitle = this.subject;
                        temp += ('<dd ask_id="' + this.ask_id + '"><p>' + oTitle.content + ( oTitle.image.url ? ( '<img src="' + oTitle.image.url + '" alt="" />' ) : '' ) + '</p>');
                        if (this.status){
                            //已做过
                            var oAnswer = this.answer;
                            temp +=('<div class="fill-blank J_fillBlank" ask_id="' + this.ask_id + '" ans="' + this.answer[0].option + '"><dl class="myanswer" style="display: block;"><dt></dt><dd class="button"><p class="rt">答案：</p>');
                            $.each(oAnswer,function(j){
                                temp +='<p class="ansbox">'+ this.content + (this.image.url ? '<img src="'+ this.image.url +'" alt="" />' : '') +'</p>'
                            });

                            if(this.result == 1){
                                temp += '<span class="btnbox"><a result="1" href="javascript:;" class="righton"><i></i>我做对了</a></span></dd></dl></div>';
                            }else{
                                temp += '<span class="btnbox"><a result="0" href="javascript:;" class="wrongon"><i></i>我做错了</a></span></dd></dl></div>';
                            }
                        }else{
                            var oAnswer = this.answer;
                            temp +=('<div class="fill-blank J_fillBlank" ask_id="' + this.ask_id + '" ans="' + this.answer[0].option + '"><button  class="anshandler" >核对答案</button><dl class="myanswer"><dt></dt><dd class="button"><p class="rt">你做对了吗？</p>');
                            $.each(oAnswer,function(j){
                                temp +='<p class="ansbox">'+ this.content + (this.image.url ? '<img src="'+ this.image.url +'" alt="" />' : '') +'</p>'
                            });
                            temp += '<span class="btnbox"><a result="1" href="javascript:;" class="right"><i></i>我做对了</a><a result="0" href="javascript:;" class="wrong"><i></i>我做错了</a></span></dd></dl></div>'

                        }
                    });
                }
            }

            temp += '</dl>';
            if(oQuestions != undefined && oQuestions[0].status){
                $('#knowledge').html(temp);
                MathJax.Hub.Queue(['Typeset',MathJax.Hub,$('#knowledge')[0]]);
                return false;
            }


            if(oQuetionsType == 4){
                temp += '<input type="button" class="self_btn self_btng disabled-btn" id="submitQuestion" disabled value="提交答案" />';
                $('#submitQuestion').attr('disabled','disabled');
            }else{
                temp += '<input type="button" class="self_btn self_btng" id="submitQuestion" value="提交答案">';
            }
            $('#knowledge').html(temp);
            picLoaded();

            MathJax.Hub.Queue(['Typeset',MathJax.Hub,$('#knowledge')[0]]);
            //填空题 ——核对答案
            $('div.J_fillBlank').on('click' ,'.anshandler',function(){
                $(this).next().show();
            });

            $('.btnbox a').click(function(){
                if($(this).hasClass('right')){
                    $(this).attr('class','righton').next().attr('class','wrong');
                }else{
                    $(this).attr('class','wrongon').prev().attr('class','right');
                }
                $(this).addClass('selected').siblings().removeClass('seleted');
                $('#submitQuestion').removeClass('disabled-btn').attr('disabled',false);
            });
            //提交答案
            $('#submitQuestion').click(function(){
                var that = this;
                $(this).disabled({flag:true,img:true});
                var o = {};
                var questions = [];
                o.question_ask_list = [];
                var flag = false;
                //提交填空题答案
                if(oQuetionsType == 4){
                    var btnBox = $('#knowledge .btnbox');
                    var oAsk = {};
                    oAsk.my_answer = '';
                    oAsk.question_ask_id = btnBox.parents('.J_fillBlank').attr('ask_id');
                    oAsk.result = btnBox.find('a.selected').attr('result');
                    o.question_ask_list.push(oAsk);
                    questions.push(oAsk);

                }else{
                    $('#knowledge dd').each(function(){
                        var oAsk = {};
                        oAsk.my_answer = $(this).find('input:checked').val() || '';
                        if (!oAsk.my_answer) {
                            flag = true;
                            $.dialog.alert('请答完题再提交！');
                            return false;
                        }
                        oAsk.question_ask_id = $(this).attr('ask_id');
                        oAsk.result = '';
                        o.question_ask_list.push(oAsk);
                        questions.push(oAsk);
                    });
                }

                if (flag) {
                    $(that).disabled({flag:false,img:false});
                    return false;
                }
                o.question_id = data.question_id;
                o.knowledge_id = qid;
                o.question_ask_list = JSON.stringify(o.question_ask_list);
                $.post('/holiday/post/sumbitquestion/',o,function(d){
                    $(that).disabled({flag:false,img:false});
                    if (d.response === 'ok') {
                        $('#submitQuestion').hide();
                        if(oQuetionsType == 4){
                            $('.J_fillBlank .rt').text('答案：');
                            $('.btnbox a').unbind("click");
                            $('.J_fillBlank .anshandler').hide();
                            $('#knowledge .btnbox a:not(".selected")').hide();

                        }else{
                            $('#knowledge .option').find(':radio').attr("disabled",true);
                            $('#knowledge dd').each(function(i){
                                var rightAns = $(this).attr('ans');
                                var myAns = questions[i].my_answer;
                                var html = '<dd class="light-blue"><i class="a-icon"></i>正确答案：' + rightAns + '</dd>';
                                if (rightAns == myAns) {
                                    html += ('<dd class="light-green"><i class="right-icon"></i>我的答案：' + myAns + '</dd>');
                                }else{
                                    html += ('<dd class="dark-orange"><i class="error-icon"></i>我的答案：' + myAns + '</dd>');
                                }
                                $(this).after(html);
                            })
                        }
                    }else{
                        $.dialog.alert(d.error);
                    }
                },'json');
            })

        }else{
            //$.dialog.alert(d.error)
        }
    },'json')
}
// 图片加载完成后等比缩放
function picLoaded(){
    var $img = $('#knowledge img');
    var len = $img.length-1;
    $img.each(function (n) {
        if (this.complete){
            setImg(this);
        }else{
            $(this).load(function () {
                setImg(this);
            }).error(function () {
                $(this).attr('alt','图片加载失败');
            })
        }
    })
}
// 图片等比缩放
function setImg(img){
    var maxWidth = $.browser.msie && $.browser.version == 6.0?450:$(img).parent().width();
    if ($(img).width()>maxWidth) {
        $(img).width(maxWidth)
    }
}
//判断没有视频时_学习文本存在
function completeWord(id){
    var wordLen=$('#learnBox').find('.word').length;
    if(wordLen){
        $.post('/holiday/post/sumbitvideo/',{"knowledge_id":id},function(){});
        $('#artlist').find('li[knowledge_id='+ id +']').find('i').addClass('on');
    }

}

//当前视频显示置顶显示
function setTop(){
    var curIndex=$('.level2-box li.on').attr('index');
    var curH = $('.level2-box li.on').parent().prevAll('h4').length;
    var curScrollTop=39*(curIndex-1)+curH*42;
    $('#artlist').scrollTop(curScrollTop);
}
$(function($){
    //目录-知识检测
    $.tab("#J_tabHnadle1", "#J_tabBody1", "cur", "click");
    //目录收缩展开
    var $level1=$('#artlist ').find('.level1');
    var $level2=$('#artlist ').find('.level2');
    $level1.next().show();
    $level2.hover(function(){
        $(this).toggleClass('show-btn')
    });
    var knowledge_id = location.search.split('=')[1];
    var target = $('#artlist').find('li[knowledge_id='+knowledge_id+']');
    var url = target.attr('videourl');
    var image = target.attr('videoimage');
    var chapternum = target.parent().prev().find('.chapter-num').text();

    target.addClass('on')
        .parent().prev().trigger('click');
    //页面初始加载右侧当前知识点——置顶显示
    var curIndex = target.attr('index');
    var curH = target.parent().prevAll('h4').length;
    var curScrollTop=39*(curIndex-1)+curH*42;
    $('#artlist ').scrollTop(curScrollTop);

    // 首次加载题目
    getQuestions(knowledge_id);
    completeWord(knowledge_id);
    setTop();
    $('#courselearn .j-chapter').text(chapternum);
    if (url) {
        formatVideo(url,image,knowledge_id)
    }else{
        $('#vedio').removeClass().css({'width':'100%','height':'100%','backgroundColor':'#000'}).html('<div class="word">' + target.attr('content') + '</div>');
        MathJax.Hub.Queue(['Typeset',MathJax.Hub,$('#vedio')[0]]);
        $.post('/holiday/post/sumbitvideo/',{"knowledge_id":knowledge_id},function(){})
    }


});


//视频上下滚动
$(function($){
    var winHeight = $(window).height();
    var timer = null;
    $(window).resize(function(){
        timer && clearTimeout(timer);
        timer = setTimeout(function(){
            winHeight = $(window).height();
        },200);
    })
    // 视频滚动方法
    function scrolls(direction){
        // direction为true向上，反之向下
        var num = direction ? -winHeight : winHeight;
        var target = $("#courselearn");
        target.stop(true,true).animate({'top':num,'bottom':-num},600,function(){
            var top = target.position().top;
            if(top==num){
                target.css({'top':-num,'bottom':num})
                    .animate({'top':0,'bottom':0},600,"easeOutBack");
            }
        });
    }
    // 更换视频内容及title
    function changeVideo(qid){
        var target = $('#artlist li[knowledge_id='+qid+']');
        var name = target.attr('title');
        var videourl = target.attr('videourl');
        var videoimage = target.attr('videoimage');
        var knowledgenum = target.attr('knowledgenum');
        var chapternum = target.parent().prev().find('.chapter-num').text();
        $('#vedio').empty();
        if (videourl) {
            $('#learnBox').html('<div id="vedio">' + target.attr('content') + '</div>');
            formatVideo(videourl,videoimage,qid)
        }else{
            $('#learnBox').html('<div class="word">' + target.attr('content') + '</div>');

        }

        $('#courselearn .j-lessonnum').text(knowledgenum);
        $('#courselearn .j-lessonname').text(name);
        $('#courselearn .j-chapter').text(chapternum);
        MathJax.Hub.Queue(function(){
            $('#vedio')[0]
        },['Typeset',MathJax.Hub])
    }
    // 获取上一个/下一个的knowledge_id
    function getKnowledgeId(type){
        var index = (+$('#artlist').find('li.on').attr('index'));
        if (index == 1 && type == 0) {
            $.dialog.alert('已经是第一个知识点！');
            return false;
        }else if(index == $('#artlist').find('li').length && type != 0){
            $.dialog.alert('已经是最后一个知识点！');
            return false;
        }else if(type == 0){
            return $('#artlist').find('li[index='+(index-1)+']').attr('knowledge_id');
        }else{
            return $('#artlist').find('li[index='+(index+1)+']').attr('knowledge_id');
        }
    }
    // 设置当前播放知识点显示
    function setRightClass(id){
        // 将右侧列表的class设置
        $('#artlist li').removeClass('on')
            .filter('[knowledge_id='+id+']').addClass('on');
    }


    // 点击后执行的函数集合
    function movie(i){
        var id = getKnowledgeId(i);

        if (!id) {return false}

        setRightClass(id);
        scrolls(i);
        getQuestions(id);
        changeVideo(id);
        completeWord(id);
        setTop();
        updateUri(id);


    }

    //无刷新改变地址栏的url以及title
    function updateUri(id){
        var newTitle = $('#artlist').find('li[knowledge_id='+ id +']').attr('title');
        if(history.pushState){
            window.addEventListener('popstate', function(evt){
             var state = evt.state;
                console.log(state);
                window.history.pushState(null,newTitle, '/holiday/catalogknowledge/?knowledge_id='+id);
             }, false);
            window.history.pushState(null,newTitle, '/holiday/catalogknowledge/?knowledge_id='+id);
            document.title= '智能学测评 —— '+newTitle;
        }
    }
    //点击去学习新内容按钮
    $('#knowledge').on('click','.self_btn',function(){
        movie(1)
    });


    //点击右侧（开始学习）按钮
    $('.level2-box').on('click','.self_btn',function(e){
        e.preventDefault(); // 阻止默认的跳转操作
        var curId=$('.level2-box li.on').attr('knowledge_id');
        var clickId = $(this).parent().attr('knowledge_id');
        setRightClass(clickId);
        if(curId>clickId){
            scrolls(0);
        }else if(curId<clickId){
            scrolls(1);
        }
        getQuestions(clickId);
        changeVideo(clickId);
        completeWord(clickId);
        setTop();
        updateUri(clickId);
    });
    //点击 下一个视频按钮
    $("#J_next").click(function(){
        if($('#courselearn').is(':animated')){
            return false;
        }else{
            movie(1)
        }
    });
    //点击 上一个视频按钮
    $("#J_prev").click(function(){
        if($('#courselearn').is(':animated')){
            return false;
        }else{
            movie(0)
        }
    });

});
