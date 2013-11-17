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
}