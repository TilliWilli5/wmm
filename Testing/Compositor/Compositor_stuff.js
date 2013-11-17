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
			this.theEcho = "";
			this.type = (sv) ? "composite" : typeof(tv);
			this.contribution = tv;
			this.subVoices = sv || [];
			this.count = (sv) ? sv.length : 0;
			
			//var self = this;
			this.doAudition = function(){
				this.contribution = this.theVoice;
				for(var i = 0; i< this.count; i++)
				{
					this.subVoices[i].doAudition();
					this.contribution += " " + this.subVoices[i].contribution;
				}
				this.contribution += this.theEcho;
				return this.contribution;
			}
			this.addVoices = function(a){	//a must be an array i.e like this [v1, v2] or just simple[v1] but with brackets
				for(var i=0;i<a.length;i++)
					this.subVoices[this.count + i] = a[i];
				this.count += a.length;
			}
		}
		function WriteLine(s)
		{
			document.getElementById("ID_output").innerHTML += "<pre>"+ s + "\n" + "</pre>";
		}
		function ShowVoiceDiv(v)
		{
			var vdiv = document.createElement("div");
			var text = document.createTextNode(v.label);
			vdiv.appendChild(text);
			vdiv.id = "voice"+v.id;
			vdiv.className = "voice";
			vdiv.onclick = ShowDivContent;
			document.getElementById("ID_ansemble").appendChild(vdiv);
		}
		function ShowDivContent()
		{
			alert(this.id);
		}