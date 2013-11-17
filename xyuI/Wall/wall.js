var ui = {};
ui.deleteElement = function(element){
	element.parentNode.removeChild(element);
};

var brick = {};
brick.create =  function(ancestor, parent){
	var b = document.createElement("div");
	b.className = "brick";
	b.ancestor = ancestor;
	b.innerHTML = ancestor.name || "none";
	if(ancestor.length !== 0)
	{
		b.onmouseover = function(event){
			var element = event.target;
			var next = {};
			while(next = element.parentNode.nextSibling)
				ui.deleteElement(next);
			layer.create(element.ancestor, element.parentNode.parentNode);
		};
	}
	parent.appendChild(b);
	return b;
};
var layer = {};
layer.create = function(ancestor, parent){
	if(ancestor.length !== 0)
	{
		var l = document.createElement("div");
		l.className = "layer";
		l.ancestor = ancestor;
		for(var i=0;i<ancestor.length;i++)
		{
			var b = brick.create(ancestor[i], l);
			l.appendChild(b);
		}
		parent.appendChild(l);
		return l;
	}
};
var wall = {};
wall.create = function(arrangement, parent){
	var w = document.createElement("div");
	w.className = "wall";
	
	var l1 = layer.create(arrangement, w);
	w.appendChild(l1);
	
	parent.appendChild(w);
};

//***********************************************************************************************************************************************************************************************************************
//***********************************************************************************************************************************************************************************************************************
window.addEventListener("load", function(){
	var arr = [];
	
	arr[0] = [];
	arr[1] = [];
	arr[2] = [];
	arr[3] = [];
	arr[4] = [];
	arr[0].name = "Sport";
	arr[1].name = "Games";
	arr[2].name = "Poker";
	arr[3].name = "Forex";
	arr[4].name = "Job";
	
	arr[0][0] = {};
	arr[0][1] = {};
	arr[0][2] = {};
	arr[0][3] = {};
	arr[0][0].name = "Football";
	arr[0][1].name = "Skies";
	arr[0][2].name = "Hokkey";
	arr[0][3].name = "Table tennis";
	
	arr[1][0] = [];
	arr[1][0].name = "RPG online";
	arr[1][0][0] = {};
	arr[1][0][1] = {};
	arr[1][0][2] = {};
	arr[1][0][0].name = "Lineage";
	arr[1][0][1].name = "Ragnarok online";
	arr[1][0][2].name = "Tera";
	
	
	/*
	for(var i=0;i<10;i++)
	{
		arr[i] = [];
		arr[i].name = "Lvl1-"+i;
		for(var j=0;j<5;j++)
		{
			arr[i][j] = [];
			arr[i][j].name = "Lvl2-"+i;
			for(var k=0;k<5;k++)
			{
				arr[i][j][k] = [];
				arr[i][j][k].name = "Lvl3-"+i;
			}
		}
	}
	*/
	var w = wall.create(arr, document.body);
});
