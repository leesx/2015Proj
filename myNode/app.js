var http = require('http');
http.createServer(function(req, res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<h1>Node.js</h1>');
    res.end('<P>Hello World</P>');
}).listen(300);
console.log('HTTP server js listening at port 3000');

var MYAPP = MYAPP || {};
MYAPP.event = {
    addListener : null,
    removeLinstener : null
};

if(typeof window.addEventListener === 'function'){
    MYAPP.event.addListener = function(el,type,fn){
        el.addEventListener(type,fn,false);
    };
    MYAPP.event.removeLinstener = function(el,type,fn){
        el.removeLinstener(type,fn,false)
    }
}else if(typeof document.attachEvent === 'function'){
    MYAPP.event.addListener = function(el,type,fn){
        el.attachEvent('on'+type,fn,false)
    };
    MYAPP.event.removeLinstener = function(el,type,fn){
        el.detach('on'+type,fn,false)
    }
}

var MYNAME = MYNAME || {};
MYNAME.myEvent = {
    addLinstener : function(el,type,fn){
        if(typeof el.addEventListener === 'function'){
            MYNAME.myEvent.addLinstener = function(el,type,fn){
                el.addEventListener(type,fn,false);
            }
        }else if(typeof  el.attachEvent === 'function'){
            MYNAME.myEvent.addLinstener = function(el,type,fn){
                el.attachEvent('on'+type,fn)
            }
        }

        MYNAME.myEvent.addLinstener(el,type,fn);
    }


};

var MYBUTTON = {};
MYBUTTON.dom = {};
MYBUTTON.dom.Button = function(type,config){
    var text = config.text || '点击';
    var color = config.color || '#ccc';
    var b = document.createElement('input');
    b.type = type || 'submit';
    b.value = text;
    return b;
};

var b1 = new MYBUTTON.dom.Button('button',config);

var config = {
    type :'submit',
    text :'按钮',
    color : 'red'
};