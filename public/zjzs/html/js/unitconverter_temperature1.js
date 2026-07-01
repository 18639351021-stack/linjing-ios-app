var ab=[["Celsius [&#176C]",'vv + 273.15','vv - 273.15'],["Fahrenheit [&#176F]",'5/9 * (vv + 459.67)','9/5 * vv - 459.67'],["Kelvin [K]",1],["Rankine [&#176R]",'5/9 * vv','9/5 * vv'],["Reaumure [&#176r]",'5/4 * vv + 273.15','4/5 * (vv - 273.15)']];var bb;function jo(db){var eb=window.onload;if(typeof window.onload!="function"){window.onload=db;}
else{window.onload=function(){eb();db();}
}
;}
function ko(db){var gb=window.onunload;if(typeof window.onunload!="function"){window.onunload=db;}
else{window.onunload=function(){gb();db();}
}
;}
jo(lo);ko(mo);function no(kb,value,lb){var mb=new Date();mb.setDate(mb.getDate()+lb);document.cookie=kb+"="+escape(value)+((lb==null)?"":";expires="+mb.toGMTString());}
function oo(kb){if(document.cookie.length>0){ob=document.cookie.indexOf(kb+"=");if(ob!=-1){ob=ob+kb.length+1;pb=document.cookie.indexOf(";",ob);if(pb==-1)pb=document.cookie.length;return unescape(document.cookie.substring(ob,pb));}
}
return"";}
function lo(){po();if(document.getElementById('valuetotemperature1')){qo();cc_temperature1();}
}
function po(){bb=ro();}
function qo(){var tb=so("selectfromtemperature1",0);var vb=so("selecttotemperature1",0);to('selectfromtemperature1',tb);to('selecttotemperature1',vb);document.getElementById('valuefromtemperature1').value=so("valuefromtemperature1",1);}
function mo(){if(document.getElementById('valuetotemperature1')){var xb;xb=document.getElementById('selectfromtemperature1');no('selectfromtemperature1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('selecttotemperature1');no('selecttotemperature1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('valuefromtemperature1');no('valuefromtemperature1',xb.value,365);}
}
function to(yb,zb){var xb=document.getElementById(yb);if((zb>=0)&&(zb<xb.options.length)){xb.selectedIndex=zb;}
}
function uo(_b,X){X=(!X?6:X);return Math.round(_b*Math.pow(10,X))/Math.pow(10,X);}
function so(ac,bc){var cc=oo(ac);if(cc===false){return bc;}
else{return cc;}
}
function ro(){return parseInt(so("floatnumber",6));}
function vo(ec){var ValidChars="0123456789.";for(i=0;i<ec.length;i++){if(ValidChars.indexOf(ec.charAt(i))==-1){return false;}
}
return true;}
function ins_temperature1(fc){document.writeln('<select name="'+fc+'" id="'+fc+'" size="1" onchange="cc_temperature1()">');for(i=0;i<ab.length;i++){document.writeln('<option value="'+i+'">'+ab[i][0]+'</option>');}
document.writeln('</select>');}
function wo(hc,vv,ic){var jc=ab[hc];var kc=ab[ic];;if(vo(jc[1])){vv=vv*jc[1];}
else{vv=eval(jc[1]);}
if(vo(kc[1])){vv=vv/kc[1];}
else{vv=eval(kc[2]);}
return uo(vv,bb);}
function cc_temperature1(){var lc=parseFloat(document.getElementById('valuefromtemperature1').value);if(isNaN(lc)){document.getElementById('valuetotemperature1').value='';}
else{var tb=document.getElementById('selectfromtemperature1').selectedIndex;var vb=document.getElementById('selecttotemperature1').selectedIndex;document.getElementById('valuetotemperature1').value=wo(tb,lc,vb);mc=document.getElementById('valueresulttemperature1').tagName;if(mc=="SPAN")document.getElementById('valueresulttemperature1').innerHTML=lc+" "+nc(document.getElementById('selectfromtemperature1').options[document.getElementById('selectfromtemperature1').selectedIndex].text)+" = "+document.getElementById('valuetotemperature1').value+" "+nc(document.getElementById('selecttotemperature1').options[document.getElementById('selecttotemperature1').selectedIndex].text);else
document.getElementById('valueresulttemperature1').value=lc+" "+nc(document.getElementById('selectfromtemperature1').options[document.getElementById('selectfromtemperature1').selectedIndex].text)+" = "+document.getElementById('valuetotemperature1').value+" "+nc(document.getElementById('selecttotemperature1').options[document.getElementById('selecttotemperature1').selectedIndex].text);}
}
function ccb_temperature1(){var lc=parseFloat(document.getElementById('valuetotemperature1').value);if(isNaN(lc)){document.getElementById('valuefromtemperature1').value='';}
else{var tb=document.getElementById('selecttotemperature1').selectedIndex;var vb=document.getElementById('selectfromtemperature1').selectedIndex;document.getElementById('valuefromtemperature1').value=wo(tb,lc,vb);document.getElementById('valueresulttemperature1').value=document.getElementById('valuefromtemperature1').value+" "+nc(document.getElementById('selectfromtemperature1').options[document.getElementById('selectfromtemperature1').selectedIndex].text)+" = "+lc+" "+nc(document.getElementById('selecttotemperature1').options[document.getElementById('selecttotemperature1').selectedIndex].text);}
}
function nc(oc){return oc;var pc;if((oc.indexOf('(')==-1)&&(oc.indexOf('[')==-1))pc=oc.split();else{var qc=oc.indexOf(' ');if(qc==-1)qc=999;var rc=oc.indexOf('(');if(rc==-1)rc=999;var sc=oc.indexOf('[');if(sc==-1)sc=999;var tc=' ';if(rc<qc){tc='(';if(sc<rc){tc='[';}
}
else{tc=' ';if(sc<qc){tc='[';}
}
pc=oc.split(tc);}
return pc[0];}
