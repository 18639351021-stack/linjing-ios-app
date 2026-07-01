var ab=[["square meter",1],["square kilometer",1e6],["hectare [ha]",1e4],["are",100],["square centimeter[cm^2]",1e-4],["square millimeter",1e-6],["acre [ac]",4046.8564224],["square mile",2589988.110336],["square yard",0.83612736],["square foot(US,UK)",0.09290304],["square foot(US survey)",0.092903411613],["square inch",0.00064516],["square rod(or pole)",25.29285264],["circular inch",0.000506707479],["rood",1011.7141056],["township",93239571.972]];var bb;function gd(db){var eb=window.onload;if(typeof window.onload!="function"){window.onload=db;}
else{window.onload=function(){eb();db();}
}
;}
function hd(db){var gb=window.onunload;if(typeof window.onunload!="function"){window.onunload=db;}
else{window.onunload=function(){gb();db();}
}
;}
gd(id);hd(jd);function kd(kb,value,lb){var mb=new Date();mb.setDate(mb.getDate()+lb);document.cookie=kb+"="+escape(value)+((lb==null)?"":";expires="+mb.toGMTString());}
function ld(kb){if(document.cookie.length>0){ob=document.cookie.indexOf(kb+"=");if(ob!=-1){ob=ob+kb.length+1;pb=document.cookie.indexOf(";",ob);if(pb==-1)pb=document.cookie.length;return unescape(document.cookie.substring(ob,pb));}
}
return"";}
function id(){md();if(document.getElementById('valuetoarea1')){nd();cc_area1();}
}
function md(){bb=od();}
function nd(){var tb=pd("selectfromarea1",0);var vb=pd("selecttoarea1",0);qd('selectfromarea1',tb);qd('selecttoarea1',vb);document.getElementById('valuefromarea1').value=pd("valuefromarea1",1);}
function jd(){if(document.getElementById('valuetoarea1')){var xb;xb=document.getElementById('selectfromarea1');kd('selectfromarea1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('selecttoarea1');kd('selecttoarea1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('valuefromarea1');kd('valuefromarea1',xb.value,365);}
}
function qd(yb,zb){var xb=document.getElementById(yb);if((zb>=0)&&(zb<xb.options.length)){xb.selectedIndex=zb;}
}
function rd(_b,X){X=(!X?6:X);return Math.round(_b*Math.pow(10,X))/Math.pow(10,X);}
function pd(ac,bc){var cc=ld(ac);if(cc===false){return bc;}
else{return cc;}
}
function od(){return parseInt(pd("floatnumber",6));}
function sd(ec){var ValidChars="0123456789.";for(i=0;i<ec.length;i++){if(ValidChars.indexOf(ec.charAt(i))==-1){return false;}
}
return true;}
function ins_area1(fc){document.writeln('<select name="'+fc+'" id="'+fc+'" size="1" onchange="cc_area1()">');for(i=0;i<ab.length;i++){document.writeln('<option value="'+i+'">'+ab[i][0]+'</option>');}
document.writeln('</select>');}
function td(hc,vv,ic){var jc=ab[hc];var kc=ab[ic];;if(sd(jc[1])){vv=vv*jc[1];}
else{vv=eval(jc[1]);}
if(sd(kc[1])){vv=vv/kc[1];}
else{vv=eval(kc[2]);}
return rd(vv,bb);}
function cc_area1(){var lc=parseFloat(document.getElementById('valuefromarea1').value);if(isNaN(lc)){document.getElementById('valuetoarea1').value='';}
else{var tb=document.getElementById('selectfromarea1').selectedIndex;var vb=document.getElementById('selecttoarea1').selectedIndex;document.getElementById('valuetoarea1').value=td(tb,lc,vb);mc=document.getElementById('valueresultarea1').tagName;if(mc=="SPAN")document.getElementById('valueresultarea1').innerHTML=lc+" "+nc(document.getElementById('selectfromarea1').options[document.getElementById('selectfromarea1').selectedIndex].text)+" = "+document.getElementById('valuetoarea1').value+" "+nc(document.getElementById('selecttoarea1').options[document.getElementById('selecttoarea1').selectedIndex].text);else
document.getElementById('valueresultarea1').value=lc+" "+nc(document.getElementById('selectfromarea1').options[document.getElementById('selectfromarea1').selectedIndex].text)+" = "+document.getElementById('valuetoarea1').value+" "+nc(document.getElementById('selecttoarea1').options[document.getElementById('selecttoarea1').selectedIndex].text);}
}
function ccb_area1(){var lc=parseFloat(document.getElementById('valuetoarea1').value);if(isNaN(lc)){document.getElementById('valuefromarea1').value='';}
else{var tb=document.getElementById('selecttoarea1').selectedIndex;var vb=document.getElementById('selectfromarea1').selectedIndex;document.getElementById('valuefromarea1').value=td(tb,lc,vb);document.getElementById('valueresultarea1').value=document.getElementById('valuefromarea1').value+" "+nc(document.getElementById('selectfromarea1').options[document.getElementById('selectfromarea1').selectedIndex].text)+" = "+lc+" "+nc(document.getElementById('selecttoarea1').options[document.getElementById('selecttoarea1').selectedIndex].text);}
}
function nc(oc){return oc;var pc;if((oc.indexOf('(')==-1)&&(oc.indexOf('[')==-1))pc=oc.split();else{var qc=oc.indexOf(' ');if(qc==-1)qc=999;var rc=oc.indexOf('(');if(rc==-1)rc=999;var sc=oc.indexOf('[');if(sc==-1)sc=999;var tc=' ';if(rc<qc){tc='(';if(sc<rc){tc='[';}
}
else{tc=' ';if(sc<qc){tc='[';}
}
pc=oc.split(tc);}
return pc[0];}
