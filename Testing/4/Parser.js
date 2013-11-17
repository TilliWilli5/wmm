function loadResource(){
	var r = document.getElementById("resource").value;
	var f = document.getElementById("file").files[0];
	var u = window.URL.createObjectURL(f);
	
	var request = new XMLHttpRequest();
	request.open("GET",u);
	//request.setRequestHeader("Origin", "https://www.google.ru/");
	//request.setRequestHeader("Content-Type", "text/plain");
	//request.responseType = "text";
	request.onreadystatechange=function(){
		if(request.readyState===4)
		{
			var d = document.getElementById("resource");
			d.value = request.responseText;
		}
	
	}
	request.send();
};

function evalResource(){
	//var script = document.createElement("script");
	//script.innerHTML = document.getElementById("resource").value;
	//document.body.appendChild(script);
	eval(document.getElementById("resource").value);
};

window.onload=function(){

};