/*function VoiceDummyLabel(label)
		{
			this.label = label || "empty";
		}
		function VoiceDummyNumber(n)
		{
			this.number = n || 0;
		}*/
		var GVI = [];
		GVI.index=0;
		function Voice(lab, tv, sv)
		{
			GVI[GVI.index] = this;
			this.id = GVI.index++;
			
			this.label = lab || "empty";	//to show people some label, cocise description string
			this.theVoice = tv || "";
			this.priorEcho="";
			this.Echo = "";
			this.type = (sv) ? "composite" : typeof(tv);
			this.contribution = tv;
			this.subVoices = sv || [];
			this.count = (sv) ? sv.length : 0;
			
			
		}
		Voice.prototype = {
			doAudition: function(){
				this.contribution = this.priorEcho + this.theVoice;
				for(var i = 0; i< this.count; i++)
				{
					this.subVoices[i].doAudition();
					this.contribution += " " + this.subVoices[i].contribution;
				}
				this.contribution += this.Echo;
				return this.contribution;
			},
			addVoices: function(a){	//a must be an array i.e like this [v1, v2] or just simple[v1] but with brackets
				for(var i=0;i<a.length;i++)
					this.subVoices[this.count + i] = a[i];
				this.count += a.length;
			},
			quote: function(s){
				switch(s)
				{
					case "'": this.priorEcho="'";this.Echo="'";break;
					case "\"": this.priorEcho="\"";this.Echo="\"";break;
					case "(": this.priorEcho="(";this.Echo=")";break;
					case "{": this.priorEcho="{";this.Echo="}";break;
					case "[": this.priorEcho="[";this.Echo="]";break;
					case "<": this.priorEcho="<";this.Echo=">";break;
					default: this.priorEcho=s;this.Echo=s;break;
				}
			},
		};
		
		function createVoiceAvatar(id, v)
		{
			var VA = document.createElement("div");
			VA.className = "CLASS_voiceAvatar";
			VA.id = "ID_vAv"+id;
			VA.dataset.id = v.id;
			//VA.setUserData("self",v,null);
			if(v.type==="composite")
				VA.innerHTML = v.label;
			else
			{
				var input = document.createElement("input");
				input.type = "text";
				input.value = v.contribution;
				VA.appendChild(input);
			}
			VA.onclick = function(){
				if(GVI[this.dataset.id].type=="composite")
					ShowComposition(GVI[this.dataset.id],document.body);
			};
			return VA;
		}
			
			
		function WriteLine(s)
		{
			document.getElementById("ID_output").innerHTML += "<pre>"+ s + "\n" + "</pre>";
		}
		
		function ShowComposition(v, root)
		{
			var parent = root || document.body;
			var composition = document.createElement("div");
			composition.className = "CLASS_composition";
			composition.id = "ID_composition"+v.id;
			composition.dataset.id=v.id;
			for(var i=0;i<v.count;i++)
			{
				composition.appendChild( createVoiceAvatar(i, v.subVoices[i]) );
			}
			var bclose = document.createElement("button");
			bclose.type = "button";
			bclose.className = "CLASS_tool";
			bclose.onclick = function (){this.parentNode.parentNode.removeChild(this.parentNode);};
			bclose.innerHTML= "\u2620";
			var bupdate = document.createElement("button");
			bupdate.type = "button";
			bupdate.className = "CLASS_tool";
			bupdate.onclick = function (){alert("Update");};
			bupdate.innerHTML= "\u2692";
			
			composition.appendChild( bclose );
			composition.appendChild( bupdate );
			parent.appendChild(composition);
		}