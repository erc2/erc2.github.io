function ctl(){
	var lng=window["ctl:lang"],a1=document.head,t1=a1.querySelector("title"),lnk=ctl_list_link(),nod=ctl_list_node();

	for(var a,i=0,c=nod.length;i<c;i++){
		if(!(nod[i][0]+".css" in lnk)){
			nlink(nod[i][0]+".css");
			if(nod[i][1].indexOf("-lang")>=0&&"ctl:lang" in window&&!(nod[i][0]+"+"+lng+".css" in lnk))nlinkl(nod[i][0]);
		}
		if(nod[i][1].indexOf("-js")>=0){
			a=document.createElement("script");
			a.src=nod[i][0]+".js";
			a.onerror=a.onload=function(){
				document.head.removeChild(this);
			};
			a1.insertBefore(a,t1);
		}
	}

	for(var n,i=nod.length-1;i>=0;i--){
		n=nod[i][0];
		delete lnk[n+".css"];
		delete lnk[n+"+"+lng+".css"];
		delete lnk[n+"+en-US.css"];
	}
	for(var n in lnk){
		lnk[n].sheet.disabled=true;
		document.head.removeChild(lnk[n]);
	}

	function nlinkl(a){
		nlink(a+"+"+lng+".css",function(){
			nlink(a+"+en-US.css");
		});
	}
	function nlink(b,c){
		var a=document.createElement("link");
		a.title="ctl";
		a.rel="stylesheet";
		a.href=b;
		if(c)a.onerror=c;
		a1.insertBefore(a,t1);
	}
}
function ctlcls(p){
	for(var c=p.querySelectorAll(".ctl"),i=c.length-1;i>=0;i--)if(c[i].onblur)c[i].onblur();
}
function ctljs(n,proc){
	for(var l=document.querySelectorAll(".ctl."+n),i=l.length-1;i>=0;i--){
		if(!l[i].onload){
			l[i].onload=proc;
			l[i].onload();
		}
	}
}
function ctl_lang(pref){
	var a,lang_text;
	if("localStorage" in window&&"ctl:lang" in localStorage){
		window["ctl:lang_text"]=lang_text=localStorage["ctl:lang_text"];
		window["ctl:lang"]=localStorage["ctl:lang"];
	}else{
		for(var m,q,l=navigator.languages,i=0,c=l.length;i<c;i++){
			q=new RegExp("([^\\t]*)\\t?("+(l[i].indexOf("-")<0?l[i]+"-\\w+":l[i])+")","i");
			if(m=pref.match(q)){
				window["ctl:lang_text"]=lang_text=m[1];
				window["ctl:lang"]=m[2];
				if("localStorage" in window)localStorage["ctl:lang_text"]=m[1],localStorage["ctl:lang"]=m[2];
				break;
			}
		}
	}
	if(a=document.querySelector(".lang .text"))a.textContent=lang_text;
}
function ctl_list_link(){
	var r={};

	for(var l=document.querySelectorAll("[title=ctl]"),i=l.length-1;i>=0;i--){
		r[l[i].getAttribute("href")]=l[i];
	}

	return r;
}
function ctl_list_node(){
	var l=document.querySelectorAll(".ctl"),r=new Array(l.length);

	for(var a,m,n,i=l.length-1;i>=0;i--){
		a=l[i].getAttribute("data-ctl-u");
		if(!a){
			m=/ctl\s*(.*)/.exec(l[i].className);
			a=m[1].replace(/\s/g,"");
		}
		m=/((?:\s|^)\-[\-\w]+)/.exec(l[i].className);
		if(n=l[i].getAttribute("data-ctl-ug")){
			n=n.split(",");
			a=a.replace(new RegExp(n[0]),n[1]);
		}
		r[i]=[a,m?m[1]:""];
	}

	return r;
}