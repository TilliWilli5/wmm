function drag(el, ev){
	
	//var scroll = getScrollOffsets(); // A utility function from elsewhere
	var startX = ev.clientX + scrollX;
	var startY = ev.clientY + scrollY;
	var origX = el.offsetLeft;
	var origY = el.offsetTop;
	var deltaX = startX - origX;
	var deltaY = startY - origY;
	if (document.addEventListener) {
		document.addEventListener("mousemove", moveHandler, true);
		document.addEventListener("mouseup", upHandler, true);
	}
	ev.stopPropagation(); // Standard model
	ev.preventDefault();
	function moveHandler(e) {
		//var scroll = getScrollOffsets();
		var line = document.getElementById("junc");
		line.x2.baseVal.value = el.offsetLeft;
		line.y2.baseVal.value = el.offsetTop;
		el.style.left = (e.clientX + scrollX - deltaX) + "px";
		el.style.top = (e.clientY + scrollY - deltaY) + "px";
		e.stopPropagation();
	};
	function upHandler(e) {
		document.removeEventListener("mouseup", upHandler, true);
		document.removeEventListener("mousemove", moveHandler, true);
		e.stopPropagation(); // Standard model
	};


	/*var o = document.getElementById("d2");
	var report = "<pre>X:"+ev.clientX+"\nY:"+ev.clientY;
	report+= "\nTarget:"+ev.target;
	
	report+="</pre>"
	o.innerHTML = report;*/
};


function drop(ev){
	
};
function move(ev){
	
};
window.onload=function(){
	//document.getElementById("1").onclick=drag;
	document.getElementById("d1").onmousedown=function(ev){drag(ev.target,ev)};
	//document.body.onmousemove=drag;
	//document.body.onmousedown=drag;
};