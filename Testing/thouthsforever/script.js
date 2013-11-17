getPosNDim.minDim = 125;			//Dimensions in px
getPosNDim.maxDim = 400;
getPosNDim.h = window.innerHeight;
getPosNDim.w = window.innerWidth;
function getPosNDim()
{
	var PosNDim={};
	PosNDim.radius = Math.floor(Math.random()*(getPosNDim.maxDim - getPosNDim.minDim) + 4);
	PosNDim.top = Math.floor(Math.random()*(getPosNDim.h-PosNDim.radius));	
	PosNDim.left = Math.floor(Math.random()*(getPosNDim.w-PosNDim.radius));
	return PosNDim;
}
function createBlobs(quantity)
{
	for(var i=0; i<quantity;i++)
	{
		var blob = document.createElement("img");
		//blob.style.position = "fixed";
		var PnD = getPosNDim();
		blob.height = PnD.radius;
		blob.width = PnD.radius;
		blob.style.top = PnD.top +"px";
		blob.style.left = PnD.left +"px";
		blob.src = "design/blobyes.png";
		
		blob.setAttribute("id","ID_blob"+i);
		blob.setAttribute("class","CLASS_blob");
		
		blob.onmouseover = blobFlash;
		document.body.appendChild(blob);
	}
}
blobFlash.state = true;
function blobFlash()
{
	//this.src = "desing/BloodCross.png";
	//document.body.innerHTML = "XUI";
	//this.style.animationName = "flash";
	//this.style.animationName = "none";
	//this.style.animationName = "flash";
	//this.style.animationPlayState = "running";
	if(blobFlash.state)
		this.style.animationDirection = "alternate-reverse";
	else
		this.style.animationDirection = "alternate";
	this.style.animationPlayState = "running";
	blobFlash.state = !blobFlash.state;
}