function update(){
var content = document.getElementById("content").value;
document.getElementById("appearance").innerHTML = content;
console.log("updated");
};
window.onload=function(){
setInterval(update, 2000);
};