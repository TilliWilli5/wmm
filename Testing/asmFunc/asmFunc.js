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
function indexOfEnd(s){
	if(s.indexOf("{")==-1)
		return -1;
	var diff=0;
	for(var i=0; i<s.length;i++)
	{
		if(s[i] == "{")
			diff++;
		if(s[i] == "}")
			if(--diff == 0)
				return i;
	}
	return -1;
}
/*function indexOfEqual(s){
	//var alert = false;
	//var finded = false;
	for(var i=s.length;i>=0;i--)
	{
		if(s[i] == "=")
			return i;
		if( !(s[i] === " " || s[i] === "\t" || s[i] === "\n") )
			return -1;
		//if(s[i] > "a" && s[i] < "z") || (s[i] > "A" && s[i] < "Z") || (s[i] > "0" && s[i] < "9") || s[i] == "_"
	}
	return -1;
}*/
function indexOfStart(s){
	for(var i=s.length;i>=0;i--)
	{
		if(s[i] == ")" || s[i] == "}" || s[i] == ";")
			return i;
	}
	return 0;
}
function disasmFunc(source){
	//disasmFunc.code=source;
	var funcPoint = source.indexOf("function");
	var funcL = source.slice(0, funcPoint);
	var funcR = source.slice(funcPoint+8);
	console.log("[disasmFunc.funcL]:"+funcL+"|\n[disasmFunc.funcR]:"+funcR+"|");
	var funcEnd = indexOfEnd(funcR);
	funcR = funcR.slice(0,funcEnd+1);
	disasmFunc.nick = funcR.slice(0,funcR.indexOf("(")).trim();
	funcL = funcL.replace(new RegExp("\\s*=\\s*", "gm"),"=");
	if(funcL[funcL.length-1] === "=")
	{
		funcL = funcL.slice(indexOfStart(funcL), -1).trim();
		disasmFunc.alias = funcL;
	}
	
	console.log("[disasmFunc.funcL]:"+funcL+"|\n[disasmFunc.funcR]:"+funcR+"|"+funcEnd);
	console.log("x");
	var paramStart = funcR.indexOf("(");
	var paramEnd = funcR.indexOf(")");
	//console.log("[code]:"+source);
	//console.log(paramStart+"\t"+paramEnd);
	disasmFunc.parameters = funcR.slice(paramStart+1, paramEnd);
	disasmFunc.parameters = disasmFunc.parameters.split(",");
	

	var bodyStart = funcR.indexOf("{");
	var bodyEnd = funcR.lastIndexOf("}");
	disasmFunc.body = funcR.slice(bodyStart+1, bodyEnd);
	
	disasmFunc.nick = disasmFunc.nick || "default";
	disasmFunc.alias = disasmFunc.alias || "default";
	//console.log("[params]:"+disasmFunc.parameters);
	//console.log("[body]:"+disasmFunc.body);
	
	console.log("[disasmFunc.nick]:"+disasmFunc.nick+"[disasmFunc.alias]:"+disasmFunc.alias);
	console.log("[disasmFunc.parameters]:"+disasmFunc.parameters);
	console.log("[disasmFunc.body]:"+disasmFunc.body);
	//console.log("[]:");
}

disasmFunc.nick;
disasmFunc.alias;
disasmFunc.parameters="";
disasmFunc.body;
disasmFunc.code;

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
window.addEventListener("load",function(){
	var content = document.getElementById("content").value;
	funcToNode(content);
},false);