
function Hello(){
	var name = 'lishangxi';
	var sex = '男'
	this.sayName = function(){
		console.log(this.name);
	};
	this.saySex = function(){
		console.log(this.sex)
	}
}
module.exports = Hello;