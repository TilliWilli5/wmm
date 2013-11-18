var xyui = {};
xyui.modal = {};
xyui.modal.args = {};
xyui.modal.form = {};
xyui.modal.arg2form = function(){
	window.returnValue = {};
	xyui.modal.args = window.dialogArguments.split(",");
	var t = document.createElement("table");
	xyui.modal.form = t;
	for(var i=0;i<xyui.modal.args.length;i++)
	{
		window.returnValue[xyui.modal.args[i]] = null;
		var tr = document.createElement("tr");
		var label = document.createElement("td");
		label.innerHTML = xyui.modal.args[i];
		var inputCell = document.createElement("td");
		var input = document.createElement("input");
		//if(i === 0)
			//window.addEventListener("load",function(){input.autofocus = "true";});
			//window.addEventListener("load",function(){input.focus();});//input.setAttribute("autofocus","autofocus");
			//input.focus();
		input.type="text";
		input.onkeydown = function(event){if(event.keyCode === 13)window.close();};
		inputCell.appendChild(input);
		tr.appendChild(label);
		tr.appendChild(inputCell);
		t.appendChild(tr);
	}
	document.body.appendChild(t);
	document.getElementsByTagName("input")[0].focus();
	var btn = document.createElement("button");
	btn.type="button";
	btn.innerHTML = "confirm";
	btn.onclick = window.close;
};
xyui.modal.form2arg = function(event){
	var ans = document.getElementsByTagName("input");
	for(var i=0;i<xyui.modal.args.length;i++)
		window.returnValue[xyui.modal.args[i]] = ans[i].value;
};
xyui.modal.showDialog = function(list){
	var dialogheight = list.split(",").length*32;
	var dialogwidth = 250;
	return window.showModalDialog("modal.html", list, "dialogheight:"+dialogheight+"; dialogwidth:"+dialogwidth);
};
xyui.modal.init = function(){
	window.addEventListener("load",function(){
		xyui.modal.arg2form();
	});
	window.addEventListener("unload",function(){
		xyui.modal.form2arg();
	});
};