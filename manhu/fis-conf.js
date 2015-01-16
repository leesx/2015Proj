fis.config.merge({
    roadmap : {
        domain : {
            //所有css文件添加http://localhost:8080作为域名
            '**.css' : 'http://localhost:8080/'
        },
        path : [
            {
                //所有的js文件
                reg : '**.js',
                //是模块化的js文件（标记为这种值的文件，会进行amd或者闭包包装）
                isMod : true,
                //默认依赖lib.js
                requires : [ 'lib.js' ],
                //向产出的map.json文件里附加一些信息
                extras : { say : '123' },
                //发布到/static/js/xxx目录下
                release : '/static/$&'
            },
            {
                //所有的css文件
                reg : '**.css',
                //发布到/static/css/xxx目录下
                release : '/static/$&'
            },
            {
                //所有image目录下的.png，.gif文件
                reg : /^\/images\/(.*\.(?:png|gif))/i,
                //发布到/static/pic/xxx目录下
                release : '/static/pic/$1'
            }
        ]
    }
});


//如果要兼容低版本ie显示透明png图片，请使用pngquant作为图片压缩器，
//否则png图片透明部分在ie下会显示灰色背景
//使用spmx release命令时，添加--optimize或-o参数即可生效
//fis.config.set('settings.optimzier.png-compressor.type', 'pngquant');

//设置jshint插件要排除检查的文件，默认不检查lib、jquery、backbone、underscore等文件
//使用pure release命令时，添加--lint或-l参数即可生效
// fis.config.set('settings.lint.jshint.ignored', [ 'lib/**', /jquery|backbone|underscore/i ]);

//csssprite处理时图片之间的边距，默认是3px
// fis.config.set('settings.spriter.csssprites.margin', 20);