var NODEBARN=[];
//******************************************************************************************************************************************************************************************************************
//******************************************************************************************************************************************************************************************************************
//******************************************************************************************************************************************************************************************************************
function nIndexOf(s,sub,n){
	var i=0;
	var c = 0;
	while(c!=n)
		if( (i = s.indexOf(sub,i)) !=-1)
		{
			c++;
			i++;
		}
		else
			break;
	if(c==n)
		return i-1;
	else
		return -1;
}


function disasmFunc(source){
	disasmFunc.code=source;
	var paramStart = source.indexOf("(");
	var paramEnd = source.indexOf(")");
	//console.log("[code]:"+source);
	//console.log(paramStart+"\t"+paramEnd);
	disasmFunc.parameters = source.slice(paramStart+1, paramEnd);
	disasmFunc.parameters = disasmFunc.parameters.split(",");
	//console.log("[params]:"+disasmFunc.parameters);

	var bodyStart = source.indexOf("{");
	var bodyEnd = source.lastIndexOf("}");
	disasmFunc.body = source.slice(bodyStart+1, bodyEnd);
	//console.log("[body]:"+disasmFunc.body);
	
	disasmFunc.nick = "default";
}
disasmFunc.code;
disasmFunc.nick;
disasmFunc.parameters="";
disasmFunc.body;

function asmFunc(source){
	//console.log("[asm/paramPre]:"+source.parameters);
	//console.log("[asm/bodyPre]:"+source.body);
	console.log("[asmFunc/pre]:"+"function "+source.nick+"(){"+source.body+"};");
	for(var i=0;i<source.parameters.length;i++)
	{
		source.body = source.body.replace(new RegExp("\\b"+source.parameters[i]+"\\b","gm"),"this.IN["+i+"]");
		source.parameters[i] = source.parameters[i].replace(new RegExp("\\b"+source.parameters[i]+"\\b","gm"),"this.IN["+i+"]");
	}
	source.body = source.body.replace(new RegExp("return","gm"),"this.OUT[0]=");
	//console.log("[asm/paramPost]:"+source.parameters);
	//console.log("[asm/bodyPost]:"+source.body);
	
	console.log("[asmFunc/result]:"+"function "+source.nick+"(){"+source.body+"};");
}


function asmNode(source){
	console.log("[asmNode/pre]:"+source.code);
	asmNode.create = "var "+source.nick+NODEBARN.length+"=new Node('"+source.nick+NODEBARN.length+"');";
	asmNode.init="";
	for(var i=0;i<source.parameters.length;i++)
	{
		asmNode.init += source.nick+NODEBARN.length+".IN["+i+"]=0;";
		source.body = source.body.replace(new RegExp("\\b"+source.parameters[i]+"\\b","gm"),"this.IN["+i+"]");
		source.parameters[i] = source.parameters[i].replace(new RegExp("\\b"+source.parameters[i]+"\\b","gm"),"this.IN["+i+"]");
	}
	source.body = source.body.replace(new RegExp("return","gm"),"this.OUT[0]=");
	asmNode.prog =source.nick+NODEBARN.length+".program=function (){"+source.body+"};";
	asmNode.associate = "NODEBARN["+NODEBARN.length+"]="+source.nick+NODEBARN.length+";";
	console.log("[asmNode.create]:"+asmNode.create);
	console.log("[asmNode.init]:"+asmNode.init);
	console.log("[asmNode.prog]:"+asmNode.prog);
	console.log("[asmNode.associate]:"+asmNode.associate);
	//console.log("[asmNode.body]:"+"function (){"+source.body+"};");
};
asmNode.create;
asmNode.init;
asmNode.prog;
asmNode.associate;

funcToNode.count = 0;
function funcToNode(source){
	var funcArrSup = source.split("};");
	var i =0;
	var funcArrCon = [];
	for(var j=0;j<funcArrSup.length;j++)
	{
		funcArrSup[j] +="};";
		//console.log(j+"#\n[Supposed]:"+funcArrSup[j]);
		if(funcArrSup[j].indexOf("function")!=-1)
		{
			funcArrCon[i++] = funcArrSup[j];
			//console.log(j+"#\n[Confirmed]:"+funcArrSup[j]);
			disasmFunc(funcArrSup[j]);
			//asmFunc(disasmFunc);
			asmNode(disasmFunc);
			eval(asmNode.create+asmNode.init+asmNode.prog+asmNode.associate);
		}
	}
	
	funcToNode.count = funcArrCon.length;
	//console.log("Count: "+funcToNode.count);
}
function update(){
var content = document.getElementById("content").value;


};
window.onload=function(){
console.log(nIndexOf("012345]78]this string","]",2) );
var content = document.getElementById("content").value;
funcToNode(content);

console.log("012345]78]this string".indexOf("]"));
console.log("012345]78]this string".indexOf("]",7));
console.log("012345]78]this string".indexOf("*",7));
setInterval(update, 2000);
};
/*var arr = content.split("};");
var pi=0;
var arr2 = [];
for(var i=0; i<arr.length; i++)
{
	if(arr[i].indexOf("function")!=-1)
	{
		arr2[pi++] = arr[i];
		var f1 = arr2[pi].indexOf("{");
		arr[i] = arr2[pi].slice(f1+1);
		arr2
		var arrAux = 
	}
}

content = "";
for(var i=0;i<arr.length;i++)
{
	content += arr[i]+"\n\n";
}
document.getElementById("appearance").innerHTML = "<pre>"+content+"</pre>";
console.log("updated");*/