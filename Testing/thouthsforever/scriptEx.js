var catharsisPool = ["Unpredictable","Inspiration","Desire","Sensational","Awful","Sick","Awesome","Obsessed"];


function createItem(type)
{
	var item = document.createElement("div");
	var text = document.createTextNode(catharsisPool[Math.ceil(Math.random()*catharsisPool.length)]);
	item.appendChild(text);
	return item;
}
function createDrop(id)
{
	var shell = document.createElement("div");
	shell.id = "ID_drop"+id;
	shell.className = "CLASS_drop";
	
	var item = document.createElement("div");
	//var text = document.createTextNode(catharsisPool[Math.ceil(Math.random()*catharsisPool.length)]);
	//item.appendChild(text);
	item.innerHTML = catharsisPool[Math.floor(Math.random()*catharsisPool.length)];
	
	shell.appendChild(item);
	document.body.appendChild(shell);
	shell.style.top = Math.floor(Math.random()*(window.innerHeight - shell.clientHeight) + shell.clientHeight)+"px";
	shell.style.left = Math.floor(Math.random()*(window.innerWidth - shell.clientWidth) + shell.clientWidth)+"px";
	window.console.log("Created drop#"+id+"\nHeight:"+shell.clientHeight+"\tWidth:"+shell.clientWidth+"\nShell.style.top:"+shell.style.top+"\tshell.style.left:"+shell.style.left);
	//return shell;
}
function createShower(q)
{
	for(var i=0;i<q;i++)
		createDrop(i);
}