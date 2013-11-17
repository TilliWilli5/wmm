var rabbits = {};
var ui = {};
ui.anim = {};
ui.anim.kfi=0;
/*
ui.anim.createKF = function(kfText){
	var kfName = "kf"+document.styleSheets[0].cssRules.length;
	var kf = "@keyframes "+kfName+ "{0%{"+property+from+"}100%{"+property+to+"}}";
	var kfIndex = document.styleSheets[0].cssRules.length;
	document.styleSheets[0].insertRule(kf, kfIndex);
	
};
ui.anim.addState = function(rule){
	
};
*/
ui.anim.move = function(rabbit, property, from, to, duration){
	var kfName = "kf"+document.styleSheets[0].cssRules.length;
	var kf = "@keyframes "+kfName+ "{0%{"+property+from+"}100%{"+property+to+"}}";
	var kfIndex = document.styleSheets[0].cssRules.length;
	document.styleSheets[0].insertRule(kf, kfIndex);
	rabbit.style.animationDuration=duration;
	rabbit.style.animationName = kfName;
	//rabbit.addEventListener("animationend", function(){document.styleSheets[0].deleteRule(kfIndex)});
};
ui.anim.create = function(rabbit, rules, duration){
	var kfIndex = document.styleSheets[0].cssRules.length;
	var kfName = "kf"+ui.anim.kfi;
	ui.anim.kfi++;
	var kf = "@keyframes "+kfName+ "{" + rules  + "}";
	document.styleSheets[0].insertRule(kf, kfIndex);
	rabbit.style.animationDuration=duration;
	var oldAnim = rabbit.style.animationName;
	rabbit.style.animationName = kfName;
	ui.anim.kill(oldAnim);
	//ui.anim.suicide(rabbit);
	//rabbit.addEventListener("animationend", function(){document.styleSheets[0].deleteRule(kfIndex)});
};
ui.anim.suicide = function(rabbit){
	rabbit.addEventListener("animationend", function(){
		var name = rabbit.style.animationName;
		var length = document.styleSheets[0].cssRules.length;
		var rules = document.styleSheets[0].cssRules;
		for(var i=0;i<length;i++)
		{
			if(rules[i].name === name)
			{
			document.styleSheets[0].deleteRule(i);
			break;
			}
		}
	});
};
ui.anim.kill = function(name){
	if(name)
	{
		var length = document.styleSheets[0].cssRules.length;
		var rules = document.styleSheets[0].cssRules;
		for(var i=0;i<length;i++)
		{
			if(rules[i].name === name)
			{
				document.styleSheets[0].deleteRule(i);
				break;
			}
		}
	}
};
ui.anim.createBatch = function(hatch, rules, duration, delay){
	
	var index = 0;
	ui.anim.create(hatch[0], rules, duration);
	var timer = setInterval(moveCheck, delay);
	function moveCheck(){
		index++;
		if(hatch[index])
		{
			ui.anim.create(hatch[index], rules, duration);
		}
		else
		{
			clearInterval(timer);
		}
	};
};
ui.anim.moveBatch = function(hatch, property, from, to, duration, delay){
	
	var index = 0;
	ui.anim.move(hatch[0], property, from, to, duration);
	var timer = setInterval(moveCheck, delay);
	function moveCheck(){
		index++;
		if(hatch[index])
		{
			ui.anim.move(hatch[index], property, from, to, duration);
		}
		else
		{
			clearInterval(timer);
		}
	};
};
/*
ui.anim.ssi = 0;
ui.initialization = function(){
	ui.anim.ssi = document.styleSheets.length;
	var ss = document.createElement("style");
	ss.type = "text/css";
	ss.title = "animation";
	document.head.appendChild(ss);
	document.styleSheets[ui.anim.ssi] = ss;
};
*/
window.onload = function(){
	//ui.initialization();
	rabbits = document.getElementsByClassName("rabbit");
	for(var i=0;i<rabbits.length;i++)
	{
		rabbits[i].addEventListener("mouseover",function(){
			ui.anim.createBatch(this.parentNode.children,"0%{top:0px;opacity:0}100%{top:100px;opacity:1}","1s",100);
			//ui.anim.createBatch(this.parentNode.children,"opacity:","0","1","0.4s",100);
		});
	}
	
};