var UNIT = 31;
var xOff = 17;
var yOff = 3;
function createCity(name, x, y, parent, type, id){
	var city = document.createElement("div");
	city.className = "city";
	city.id = id;
	city.innerHTML = "\u25c9"+name;
	city.style.left = UNIT*x+xOff+"px";
	city.style.top = UNIT*y+yOff+"px";
	parent.appendChild(city);
};
function createMap(h, w, parent){
	var map = document.createElement("div");
	map.className = "map";
	map.scale = 1;
	map.unit = 31;
	map.style.height = UNIT*h +"px"|| "620px";
	map.style.width = UNIT*w +"px"|| "620px";
	parent = parent || document.body;
	parent.appendChild(map);
	createCity("Costa Bravo", 5, 10, map);
	createCity("Barcelona", 38, 15, map);
	createCity("Andora", 15, 27, map);
	return map;
}
window.onload = function(){
	var mapConteiner = document.createElement("div");
	mapConteiner.className = "mapConteiner";
	document.body.appendChild(mapConteiner);
	createMap(100,100,mapConteiner);
	/*addRecord("Budget:|1000\u00a3", document.body);
	addRecord("Count of convoys:|\u2605\u2605\u2605\u2605", document.body);
	addRecord("Count of battles:|\u2620\u2620\u2620", document.body);
	addRecord("Profit:|569\u00a3\u25b2", document.body);
	addRecord("Charges:|343\u00a3\u25bc", document.body);*/
	
}
