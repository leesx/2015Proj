// JavaScript Document

define(function(require, exports, module){
	var $ = require('jquery')($);
    exports.foo = 'lishangxi';
    exports.alertW = function() {
        alert('1')
    };
    //接口使用方法 模块名 doSomething.alertW()

    /*function alertW(ele){
        var html = $(ele).html();
        alert('11')
    }*/

    /*return {
        foo: 'bar',
        alertW: function() {
            alert('1')
        }
    };*/


});





