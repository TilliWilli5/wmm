
function createTable(rows, cols, parent)
{
	var root = parent || document.body;
	var table = document.createElement("table");
	table.border=1;
	table.cellSpacing=0;
	var head = document.createElement("tr");
	for(var i=0;i<cols+1;i++)
		head.appendChild(document.createElement("th"));
	table.appendChild(head);
	var obj = {};
	obj.vHead = [];
	obj.vSize = rows;
	for(var i=0;i<rows;i++)
	{
		var tr = document.createElement("tr");
		for(var j=0;j<cols+1;j++)
			tr.appendChild(document.createElement("td"));
		obj.vHead[i] = tr.firstElementChild;
		table.appendChild(tr);
	}
	obj.item = [];
	for(var i=0;i<rows;i++)
	{
		obj.item[i] = [];
		for(var j=0;j<cols;j++)
			obj.item[i][j] = table.children[i+1].children[j+1];
	}
	root.appendChild(table);
	obj.X = head.firstElementChild;
	obj.hHead = Array.slice(head.getElementsByTagName("th"), [1]);
	obj.hSize = cols;
	obj.element = table;
	obj.fill = function(fn){
		for(var i=0;i<this.vSize;i++)
			for(var j=0;j<this.hSize;j++)
				fn(this.item[i][j],i,j);
	}
	obj.fillHHead = function(s){
		var a = s.split(/\s*,\s*/);
		for(var i=0;i<this.hSize;i++)
			this.hHead[i].innerHTML = a[i];
	}
	obj.fillVHead = function(s){
		var a = s.split(/\s*,\s*/);
		for(var i=0;i<this.vSize;i++)
			this.vHead[i].innerHTML = a[i];
	}
	return obj;
}
function fillTable(cell, i, j)
{
	cell.innerHTML = "R:"+i + " C:"+j;
}