var kvc={};
kvc.create = function(parent, name, val, ctrl){
	var kvca = document.createElement("tr");
	kvca.className = "kvc";
	var n = document.createElement("td");
	n.className = "label";
	n.innerHTML = name;
	var v = document.createElement("td");
	v.className = "edit";
	v.innerHTML = val;
	//v.size = 5;
	//v.appendChild(i);
	kvca.appendChild(n);
	kvca.appendChild(v);
	/*
	if(ctrl)
	{
		var c = document.createElement("div");
		c.className = "control";
		var i = document.createElement("input");
		i.value = ctrl;
		c.appendChild(i);
		kvca.appendChild(c);
	}
	*/
	parent.appendChild(kvca);
};
kvc.list={};
kvc.list.create = function(parent, list, name){
	var kvcla = document.createElement("div");
	kvcla.className = "kvclist";
	kvcla.kvc={};
	kvcla.kvc.key=[];
	kvcla.kvc.value=[];
	//kvcla.kvc.ctrl=[];
	var kvclb = document.createElement("table");
	kvclb.className = "kvcbody";
	kvclb.border = 0;
	kvclb.cellSpacing=0;
	if(list)
	{
		for(var i=0;i<list.key.length;i++)
		{
			if(list.key[i] === null)
				continue;
			kvcla.kvc.key[i] = list.key[i];
			kvcla.kvc.value[i] = list.value[i];
			//kvcla.kvc.ctrl[i] = list.ctrl[i];
			kvc.create(kvclb, list.key[i], list.value[i]);
		}
	}
	var kvcll = document.createElement("div");
	kvcll.className = "label";
	kvcll.innerHTML = name || "default";
	kvcla.appendChild(kvcll);
	
	
	var kvclcp = document.createElement("div");
	kvclcp.className = "controlPanel";
	var btn = document.createElement("button");
	btn.type = "button";
	btn.className = "button";
	btn.innerHTML = "Add";
	kvclcp.appendChild(btn);
	btn = document.createElement("button");
	btn.type = "button";
	btn.className = "button";
	btn.innerHTML = "Send";
	kvclcp.appendChild(btn);
	
	kvcla.appendChild(kvclcp);
	kvcla.appendChild(kvclb);
	parent.appendChild(kvcla);
};
kvc.list.add = function(list, obj){
	
};

window.addEventListener("load",function(){
	var a={};
	a.key = "7:00,7:10-7:30,tTree,SZ4th".split(",");
	a.value = "Подъём, Зарядка,yes,apple,me".split(",");
	a.ctrl = "v,...,!,x".split(",");
	kvc.list.create(document.body, a, "first");
});