xyui.table.str2arr = function(s, rows, cols, del){
	var arr = [];
	var temp = s.split(/\s*\^\s*/);
	if(!rows)
		arr = temp;
	else
	{
		for(var i=0;i<rows;i++)
		{
		arr[i] = [];
			for(var j=0;j<cols;j++)
			{
				arr[i][j] = temp[i*cols+j];
			}
		}
	}
	return arr;
};
xyui.table.mat2it = function(material, rows, cols, del){
	var items = {};
	if(typeof material === "string")
		items = xyui.table.str2arr(material, rows, cols, del);
	else
		items = material;
	return items;
};
xyui.table.fulfil = function(fn){
		for(var i=0;i<this.sizeV;i++)
			for(var j=0;j<this.sizeH;j++)
				fn(this.item[i][j],i,j);
};
xyui.table.fill = function(material){
	var items = xyui.table.mat2it(material, this.sizeV, this.sizeH);
	for(var i=0;i<this.sizeV;i++)
		for(var j=0;j<this.sizeH;j++)
		{
			if(items[i][j])
				this.item[i][j].innerHTML = items[i][j];
		}
};
xyui.table.fillB = function(material){
	var items = xyui.table.mat2it(material, this.sizeV-1, this.sizeH-1);
	for(var i=0;i<this.sizeV-1;i++)
		for(var j=0;j<this.sizeH-1;j++)
		{
			if(items[i][j])
				this.body[i][j].innerHTML = items[i][j];
		}
};
xyui.table.fillHH = function(s){
		var items = xyui.table.str2arr(s);
		for(var i=0;i<this.sizeH-1;i++)
			if(items[i])
				this.headH[i].innerHTML = items[i];
};
xyui.table.fillHV = function(s){
		var items = xyui.table.str2arr(s);
		for(var i=0;i<this.sizeV-1;i++)
			if(items[i])
				this.headV[i].innerHTML = items[i];
};
xyui.table.import = function(specification, index){
	var arr = [];
	if(specification === "hh")
	{
		for(var i=0;i<this.item[0].length;i++)
			arr[i] = this.item[0][i].innerHTML;
	}
	if(specification === "hv")
	{
		for(var i=0;i<this.item.length;i++)
			arr[i] = this.item[i][0].innerHTML;
	}
	if(specification === "row")
	{
		for(var i=0;i<this.item[index].length;i++)
			arr[i] = this.item[index][i].innerHTML;
	}
	if(specification === "column")
	{
		for(var i=0;i<this.item.length;i++)
			arr[i] = this.item[i][index].innerHTML;
	}
	return arr;
};
xyui.table.hl = function(event){
	var t = xyui.table.find(event.target);
	var obj = t.ancestor;
	var rc = xyui.table.getCellrc(event.target);
	var row = rc.row;
	var col = rc.column;
	var color = obj.specification.hlcolor || xyui.table.hl.color;
	if(obj.specification.hl === "x")
	{
		for(var i=0;i<obj.sizeV;i++)
			obj.item[i][col].style.backgroundColor = color;
		for(var j=0;j<obj.sizeH;j++)
			obj.item[row][j].style.backgroundColor = color;
	}
	else if(obj.specification.hl === "h")
	{
		for(var j=0;j<obj.sizeH;j++)
			obj.item[row][j].style.backgroundColor = color;
	}
	else
	{
		for(var i=0;i<obj.sizeV;i++)
			obj.item[i][col].style.backgroundColor = color;
	}
};
xyui.table.hl.color = "rgba(0,0,0,0.3)";
xyui.table.ll = function(event){
	/*
	var t = xyui.table.find(event.target);
	var obj = t.ancestor;
	var row = Array.prototype.indexOf.call(t.childNodes, event.target.parentNode);
	var col = Array.prototype.indexOf.call(event.target.parentNode.childNodes, event.target);
	*/
	var t = xyui.table.find(event.target);
	var obj = t.ancestor;
	var rc = xyui.table.getCellrc(event.target);
	var row = rc.row;
	var col = rc.column;
	if(obj.specification.hl === "x")
	{
		for(var i=0;i<obj.sizeV;i++)
		{
			if(obj.item[i][col].className === "xyuiCell")
				obj.item[i][col].style.backgroundColor = xyui.table.ll.colorCell;
			if(obj.item[i][col].className === "xyuiHeadH")
				obj.item[i][col].style.backgroundColor = xyui.table.ll.colorHeadH;
			if(obj.item[i][col].className === "xyuiHeadV")
				obj.item[i][col].style.backgroundColor = xyui.table.ll.colorHeadV;
			if(obj.item[i][col].className === "xyuiHeadX")
				obj.item[i][col].style.backgroundColor = xyui.table.ll.colorHeadX;
		}
			//obj.item[i][col].style.backgroundColor = "deepskyblue";
		for(var j=0;j<obj.sizeH;j++)
		{
			if(obj.item[row][j].className === "xyuiCell")
				obj.item[row][j].style.backgroundColor =xyui.table.ll.colorCell;
			if(obj.item[row][j].className === "xyuiHeadH")
				obj.item[row][j].style.backgroundColor =xyui.table.ll.colorHeadH;
			if(obj.item[row][j].className === "xyuiHeadV")
				obj.item[row][j].style.backgroundColor =xyui.table.ll.colorHeadV;
			if(obj.item[row][j].className === "xyuiHeadX")
				obj.item[row][j].style.backgroundColor =xyui.table.ll.colorHeadX;
		}
			//obj.item[row][j].style.backgroundColor = "deepskyblue";
		//obj.item[0][col].style.backgroundColor = xyui.table.ll.colorHeadH;
		//obj.item[0][0].style.backgroundColor = xyui.table.ll.colorHeadX;
		//obj.item[row][0].style.backgroundColor = xyui.table.ll.colorHeadV;
	}
	else if(obj.specification.hl === "h")
	{
		
		for(var j=0;j<obj.sizeH;j++)
		{
			if(obj.item[row][j].className === "xyuiCell")
				obj.item[row][j].style.backgroundColor =xyui.table.ll.colorCell;
			if(obj.item[row][j].className === "xyuiHeadH")
				obj.item[row][j].style.backgroundColor =xyui.table.ll.colorHeadH;
			if(obj.item[row][j].className === "xyuiHeadV")
				obj.item[row][j].style.backgroundColor =xyui.table.ll.colorHeadV;
			if(obj.item[row][j].className === "xyuiHeadX")
				obj.item[row][j].style.backgroundColor =xyui.table.ll.colorHeadX;
		}
	}
	else
	{
		for(var i=0;i<obj.sizeV;i++)
		{
			if(obj.item[i][col].className === "xyuiCell")
				obj.item[i][col].style.backgroundColor = xyui.table.ll.colorCell;
			if(obj.item[i][col].className === "xyuiHeadH")
				obj.item[i][col].style.backgroundColor = xyui.table.ll.colorHeadH;
			if(obj.item[i][col].className === "xyuiHeadV")
				obj.item[i][col].style.backgroundColor = xyui.table.ll.colorHeadV;
			if(obj.item[i][col].className === "xyuiHeadX")
				obj.item[i][col].style.backgroundColor = xyui.table.ll.colorHeadX;
		}
	}
};
xyui.table.ll.colorHeadH = "slategrey";
xyui.table.ll.colorHeadV = "deepskyblue";
xyui.table.ll.colorHeadX = "slategrey";
xyui.table.ll.colorCell = "deepskyblue";
xyui.table.create = function(rows, cols, parent, material, specification){
	//-------------------------Creating and specifying ancsetor object
	var obj = {};
	obj.specification = {};
	obj.avatar = {};
	obj.headH = [];
	obj.headV = [];
	obj.headX = {};
	obj.body = [];
	obj.item = [];
	obj.litter = [];
	obj.modified = [];
	obj.fulfil = xyui.table.fulfil;
	obj.fill = xyui.table.fill;
	obj.fillB = xyui.table.fillB;
	obj.fillHH = xyui.table.fillHH;
	obj.fillHV = xyui.table.fillHV;
	obj.import = xyui.table.import;
	obj.add = xyui.table.add;
	obj.update = xyui.table.update;
	//--------------------------------------------------Table shell and table
	var shell = document.createElement("div");
	shell.className = "xyuiTableShell";
	var t = document.createElement("table");
	t.className = "xyuiTable";
	t.ancestor = obj;
	t.border = 0;
	t.cellSpacing = 0;
	var btnAdd = document.createElement("button");
	btnAdd.type="button";
	btnAdd.className = "buttonAdd";
	btnAdd.innerHTML = "+";
	btnAdd.onclick = function(){obj.add();};//event.target.parentNode.getElementsByClassName("xyuiTable")[0]
	shell.appendChild(btnAdd);
	var btnUpd = document.createElement("button");
	btnUpd.type="button";
	btnUpd.className = "buttonUpd";
	btnUpd.innerHTML = "U";
	btnUpd.onclick = function(){obj.update();};
	shell.appendChild(btnUpd);
	//---------------------------Creating of new table
	var items = {};
	if(typeof material === "string")
		items = xyui.table.str2arr(material, rows, cols);
	else
		items = material;
	for(var i=0;i<rows;i++)
	{
		obj.item[i] = [];
		var tr = document.createElement("tr");
		for(var j=0;j<cols;j++)
		{
			var td = document.createElement("td");
			td.className = "xyuiCell";
			td.addEventListener("mouseover", xyui.table.hl);
			td.addEventListener("mouseout", xyui.table.ll);
			td.addEventListener("click", xyui.table.change);
			//td.innerHTML = items[i][j];
			obj.item[i][j] = td;
			tr.appendChild(td);
		}
		t.appendChild(tr);
	}
	
	//---------------------------Setup returning object
	obj.avatar = t;
	obj.sizeH = cols;
	for(var i=0;i<cols-1;i++)
		obj.headH[i] = t.firstElementChild.children[i+1];
	obj.sizeV = rows;
	for(var i=0;i<rows-1;i++)
		obj.headV[i] = t.children[i+1].firstElementChild;
	obj.headX = t.firstElementChild.children[0];
	
	for(var i=0;i<rows-1;i++)
	{
		obj.body[i] = [];
		for(var j=0;j<cols-1;j++)
		{
			obj.body[i][j] = obj.item[i+1][j+1];
		}
	}
	//---------------------------Setup table
	if(material)
	{
		var items = xyui.table.mat2it(material, rows, cols);
		for(var i=0;i<rows;i++)
			for(var j=0;j<cols;j++)
			{
				
				obj.item[i][j].innerHTML = items[i][j];
			}
	}
	if(specification)
	{
		if(specification.headH)
		{
			for(var i=0;i<cols-1;i++)
				obj.headH[i].className = "xyuiHeadH";
		}
		if(specification.headV)
		{
			for(var i=0;i<rows-1;i++)
				obj.headV[i].className = "xyuiHeadV";
		}
		if(specification.headX)
			obj.headX.className = "xyuiHeadX";
		obj.specification = specification;
	}
	//---------------------------------------Hidden form for exchange data with mysql
	/*
	var form = document.createElement("form");
	form.method = "post";
	form.action = 
	var req = document.createElement("input");
	req.type = "text";
	req.name = 
	*/
	//----------------------------------Add to HTMLDOM and show tables on page
	parent = parent || document.body;
	shell.appendChild(t);
	parent.appendChild(shell);
	//parent.appendChild(t);
	return obj;
};
xyui.table.add = function(){
	var temp = xyui.modal.showDialog(this.import("hh").join(",,"));
	var tr = document.createElement("tr");
	var n = this.sizeV;
	(this.sizeV)++;
	this.item[n] = [];
	this.litter.push([]);
	for(var i=0;i<this.sizeH;i++)
	{
		var td = document.createElement("td");
		td.className = "xyuiCell";
		td.addEventListener("mouseover", xyui.table.hl);
		td.addEventListener("mouseout", xyui.table.ll);
		td.innerHTML = temp[i];
		this.item[n][i] = td;
		tr.appendChild(td);
		this.litter[this.litter.length-1][i] = temp[i];
	}
	this.avatar.appendChild(tr);
};
xyui.table.change = function(event){
	var ans = xyui.modal.showDialog(event.target.innerHTML)[0];
	event.target.innerHTML = ans;
	var t = xyui.table.find(event.target);
	var obj = t.ancestor;
	var rc = xyui.table.getCellrc(event.target);
	var row = rc.row;
	var col = rc.column;
	if(!obj.modified[obj.item[row][0].innerHTML])
		obj.modified[obj.item[row][0].innerHTML] = [];
	obj.modified[obj.item[row][0].innerHTML][col] = ans;
};
xyui.table.update = function(){
	var req = [];
	req[0] = this.litter;
	req[1] = this.modified;
	req[2] = this.tableName;
	req[3] = window.prompt();
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST","updateSQLTable.php");
	var data = JSON.stringify(req);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200)
			alert(xhr.responseText);
			//xyui.modal.showDialog(xhr.responseText);
	};
	xhr.send(data);
};
xyui.table.find = function(element){
	if(element.parentNode.className !== "xyuiTable")
		return xyui.table.find(element.parentNode);
	else
		return element.parentNode;
};
xyui.table.getCellrc = function(c){
	var rc = {};
	var t = xyui.table.find(c);
	rc.row = Array.prototype.indexOf.call(t.childNodes, c.parentNode);
	rc.column = Array.prototype.indexOf.call(c.parentNode.childNodes, c);
	return rc;
};
xyui.table.transpose = function(material){
	var t = [];
	for(var i=0;i<material[0].length;i++)
	{
		t[i] = [];
		for(var j=0;j<material.length;j++)
			t[i][j] = material[j][i];
	}
	return t;
};
xyui.table.togglePanel = function(material, pattern){
	var t = [];
	var aux = xyui.table.transpose(material);
	var k = 0;
	for(var j=0;j<material[0].length;j++)
	{
		if(pattern[j] === "1")
		{
			t[k++] = aux[j];
		}
	}
	return xyui.table.transpose(t);
};
function fillTable(cell, i, j)
{
	cell.innerHTML = "R:"+i + " C:"+j;
}
