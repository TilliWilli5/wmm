function quad(){
	var o = {};
	o.in = new Array();
	o.out = new Array();
	
	function quad(x){
		return x*x*x*x;
	}
	o.in = [];
	o.out = [];
	o.in['data'] = 0;
	o.out['value'] = o.in['data'];
	
	return o;
};
var quad = {};
	quad.in = new Array();
	quad.out = new Array();
	quad.do = function(){
		this.in['data'] = 0;
	this.out['value'] = this.in['data']
	}
	
	var minus = {};
	minus.in = new Array();
	minus.out = new Array();
	minus.do = function(){
		this.in['digit'] = 0;
	this.in['before'] = 0;
	this.out['after'] = o.in['before'] - o.in['digit'];
	}
function minus(){
	var o = {};
	o.in = new Array();
	o.out = new Array();
	
	o.in['digit'] = 0;
	o.in['before'] = 0;
	o.out['after'] = o.in['before'] - o.in['digit'];
	
	return o;
}
//console.log(minus.o.in['digit']);
var obj1 = quad();
var obj2 = minus();
function tie(o1, o2){
	o2 = o1;
}

obj1.in['date'] = 3;
tie(obj2.in['before'],obj1.out['value']);
obj2.in['digit'] = 10;
