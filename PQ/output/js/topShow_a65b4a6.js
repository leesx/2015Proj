// JavaScript Document

define(function(require,exports,module){ //参数写法是固定
	
	//exports : 对外提供的接口
	var $ = require('jquery');
	function topShow(){
		h = $(window).height();
		t = $(document).scrollTop();
		
		if(t > h){
			$('#gotop,#gotop2').show();
				
		}else{
			$('#gotop,#gotop2').hide();
			//alert(t)
		}
	}
	
	exports.topShow = topShow;

});
