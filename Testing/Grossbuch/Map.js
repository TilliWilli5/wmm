function addRecord(s, parent)
{
	var a = s.split("|");
	var t = document.createElement("div");
	t.className = "recordTitle";
	t.innerHTML = a[0];
	var b = document.createElement("div");
	b.className = "recordBody";
	b.innerHTML = a[1];
	var r = document.createElement("div");
	r.className = "record";
	r.appendChild(t);
	r.appendChild(b);
	parent.appendChild(r);
	parent.innerHTML +="<hr/>";
}
window.onload = function(){
	addRecord("Budget:|1000\u00a3", document.body);
	addRecord("Count of convoys:|\u2605\u2605\u2605\u2605", document.body);
	addRecord("Count of battles:|\u2620\u2620\u2620", document.body);
	addRecord("Profit:|569\u00a3\u25b2", document.body);
	addRecord("Charges:|343\u00a3\u25bc", document.body);
	
	var e = document.getElementById("map");
	var c = e.getContext("2d");
	c.font = "30px Chiller";
	c.fillText("Rivle-rusche\u25cf", 100, 100);
	c.fillText("BigHutch\u25cf", 200, 170);
	c.fillText("NewLoney\u25cf", 250, 560);
}