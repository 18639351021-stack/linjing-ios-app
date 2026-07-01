var ab=[["kilogram [kg]",1],["tonne [t]",1000],["gram [g]",1e-3],["carat [car,ct]",0.0002],["pound (US,UK) [lb,lbs]",0.45359237],["pound (troy,precious metals)",0.3732417216],["ounce (US,UK) [oz]",0.028349523125],["ounce (troy,precious metals)",0.0311034768],["ton,long (UK)",1016.0469088],["ton,short (US)",907.18474],["grain",0.00006479891],["cental",45.359237],["hundredweight (US)",45.359237],["hundredweight (UK)",50.80234544],["slug (g-pound)",14.593903],["stone",6.35029318],["Earth mass",5.980e24],["Solar mass",1.989e30]];var bb;function jr(db){var eb=window.onload;if(typeof window.onload!="function"){window.onload=db;}
else{window.onload=function(){eb();db();}
}
;}
function kr(db){var gb=window.onunload;if(typeof window.onunload!="function"){window.onunload=db;}
else{window.onunload=function(){gb();db();}
}
;}
jr(lr);kr(mr);function nr(kb,value,lb){var mb=new Date();mb.setDate(mb.getDate()+lb);document.cookie=kb+"="+escape(value)+((lb==null)?"":";expires="+mb.toGMTString());}
function or(kb){if(document.cookie.length>0){ob=document.cookie.indexOf(kb+"=");if(ob!=-1){ob=ob+kb.length+1;pb=document.cookie.indexOf(";",ob);if(pb==-1)pb=document.cookie.length;return unescape(document.cookie.substring(ob,pb));}
}
return"";}
function lr(){pr();if(document.getElementById('valuetoWeight_Mass1')){qr();cc_Weight_Mass1();}
}
function pr(){bb=rr();}
function qr(){var tb=sr("selectfromWeight_Mass1",0);var vb=sr("selecttoWeight_Mass1",0);tr('selectfromWeight_Mass1',tb);tr('selecttoWeight_Mass1',vb);document.getElementById('valuefromWeight_Mass1').value=sr("valuefromWeight_Mass1",1);}
function mr(){if(document.getElementById('valuetoWeight_Mass1')){var xb;xb=document.getElementById('selectfromWeight_Mass1');nr('selectfromWeight_Mass1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('selecttoWeight_Mass1');nr('selecttoWeight_Mass1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('valuefromWeight_Mass1');nr('valuefromWeight_Mass1',xb.value,365);}
}
function tr(yb,zb){var xb=document.getElementById(yb);if((zb>=0)&&(zb<xb.options.length)){xb.selectedIndex=zb;}
}
function ur(_b,X){X=(!X?6:X);return Math.round(_b*Math.pow(10,X))/Math.pow(10,X);}
function sr(ac,bc){var cc=or(ac);if(cc===false){return bc;}
else{return cc;}
}
function rr(){return parseInt(sr("floatnumber",6));}
function vr(ec){var ValidChars="0123456789.";for(i=0;i<ec.length;i++){if(ValidChars.indexOf(ec.charAt(i))==-1){return false;}
}
return true;}
function ins_Weight_Mass1(fc){document.writeln('<select name="'+fc+'" id="'+fc+'" size="1" onchange="cc_Weight_Mass1()">');for(i=0;i<ab.length;i++){document.writeln('<option value="'+i+'">'+ab[i][0]+'</option>');}
document.writeln('</select>');}
function wr(hc,vv,ic){var jc=ab[hc];var kc=ab[ic];;if(vr(jc[1])){vv=vv*jc[1];}
else{vv=eval(jc[1]);}
if(vr(kc[1])){vv=vv/kc[1];}
else{vv=eval(kc[2]);}
return ur(vv,bb);}
function cc_Weight_Mass1(){var lc=parseFloat(document.getElementById('valuefromWeight_Mass1').value);if(isNaN(lc)){document.getElementById('valuetoWeight_Mass1').value='';}
else{var tb=document.getElementById('selectfromWeight_Mass1').selectedIndex;var vb=document.getElementById('selecttoWeight_Mass1').selectedIndex;document.getElementById('valuetoWeight_Mass1').value=wr(tb,lc,vb);mc=document.getElementById('valueresultWeight_Mass1').tagName;if(mc=="SPAN")document.getElementById('valueresultWeight_Mass1').innerHTML=lc+" "+nc(document.getElementById('selectfromWeight_Mass1').options[document.getElementById('selectfromWeight_Mass1').selectedIndex].text)+" = "+document.getElementById('valuetoWeight_Mass1').value+" "+nc(document.getElementById('selecttoWeight_Mass1').options[document.getElementById('selecttoWeight_Mass1').selectedIndex].text);else
document.getElementById('valueresultWeight_Mass1').value=lc+" "+nc(document.getElementById('selectfromWeight_Mass1').options[document.getElementById('selectfromWeight_Mass1').selectedIndex].text)+" = "+document.getElementById('valuetoWeight_Mass1').value+" "+nc(document.getElementById('selecttoWeight_Mass1').options[document.getElementById('selecttoWeight_Mass1').selectedIndex].text);}
}
function ccb_Weight_Mass1(){var lc=parseFloat(document.getElementById('valuetoWeight_Mass1').value);if(isNaN(lc)){document.getElementById('valuefromWeight_Mass1').value='';}
else{var tb=document.getElementById('selecttoWeight_Mass1').selectedIndex;var vb=document.getElementById('selectfromWeight_Mass1').selectedIndex;document.getElementById('valuefromWeight_Mass1').value=wr(tb,lc,vb);document.getElementById('valueresultWeight_Mass1').value=document.getElementById('valuefromWeight_Mass1').value+" "+nc(document.getElementById('selectfromWeight_Mass1').options[document.getElementById('selectfromWeight_Mass1').selectedIndex].text)+" = "+lc+" "+nc(document.getElementById('selecttoWeight_Mass1').options[document.getElementById('selecttoWeight_Mass1').selectedIndex].text);}
}
function nc(oc){return oc;var pc;if((oc.indexOf('(')==-1)&&(oc.indexOf('[')==-1))pc=oc.split();else{var qc=oc.indexOf(' ');if(qc==-1)qc=999;var rc=oc.indexOf('(');if(rc==-1)rc=999;var sc=oc.indexOf('[');if(sc==-1)sc=999;var tc=' ';if(rc<qc){tc='(';if(sc<rc){tc='[';}
}
else{tc=' ';if(sc<qc){tc='[';}
}
pc=oc.split(tc);}
return pc[0];}
