// JavaScript Document

/*var m1 = angular.module('mHello',[]);
m1.factory('hello',function(){
	return {
		name : '123',
		show : function(){
			console.log(this.name);
		}
	};
});*/

var m1 = angular.module('mHello',[]);
m1.provider('hello',function(){
	return {
		str : '123',
		$get : function(){
			return{
				name : this.str,
				show : function(){
					console.log(this.name);
				}
			}
		}
	};
});