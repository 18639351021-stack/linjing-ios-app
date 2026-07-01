var ab=[["gram/cubic centimeter",1],["gram/liter",1e-3],["gram/milliliter",1],["kilogram/cubic meter",1e-3],["kilogram/liter",1],["megagram/cubic meter",1],["milligram/milliliter",1e-3],["milligram/liter",1e-6],["ounce/cubic inch",1.729994044],["ounce/gallon (UK)",0.006236023],["ounce/gallon (US)",0.007489152],["pound/cubic inch",27.679904],["pound/cubic foot",0.016018463],["pound/gallon (UK)",0.099776373],["pound/gallon (US)",0.119826427],["grain/gallon (UK)",0.000014253948343691203],["grain/gallon (US)",0.000017118011571775823],["tonne/cubic meter",1],["ton (UK)/cubic yard",1.328939184],["ton (US)/cubic yard",1.186552843],["slug/cubic foot",0.51531788206]];var bb;function ge(db){var eb=window.onload;if(typeof window.onload!="function"){window.onload=db;}
else{window.onload=function(){eb();db();}
}
;}
function he(db){var gb=window.onunload;if(typeof window.onunload!="function"){window.onunload=db;}
else{window.onunload=function(){gb();db();}
}
;}
ge(ie);he(je);function ke(kb,value,lb){var mb=new Date();mb.setDate(mb.getDate()+lb);document.cookie=kb+"="+escape(value)+((lb==null)?"":";expires="+mb.toGMTString());}
function le(kb){if(document.cookie.length>0){ob=document.cookie.indexOf(kb+"=");if(ob!=-1){ob=ob+kb.length+1;pb=document.cookie.indexOf(";",ob);if(pb==-1)pb=document.cookie.length;return unescape(document.cookie.substring(ob,pb));}
}
return"";}
function ie(){me();if(document.getElementById('valuetodensity1')){ne();cc_density1();}
}
function me(){bb=oe();}
function ne(){var tb=pe("selectfromdensity1",0);var vb=pe("selecttodensity1",0);qe('selectfromdensity1',tb);qe('selecttodensity1',vb);document.getElementById('valuefromdensity1').value=pe("valuefromdensity1",1);}
function je(){if(document.getElementById('valuetodensity1')){var xb;xb=document.getElementById('selectfromdensity1');ke('selectfromdensity1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('selecttodensity1');ke('selecttodensity1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('valuefromdensity1');ke('valuefromdensity1',xb.value,365);}
}
function qe(yb,zb){var xb=document.getElementById(yb);if((zb>=0)&&(zb<xb.options.length)){xb.selectedIndex=zb;}
}
function re(_b,X){X=(!X?6:X);return Math.round(_b*Math.pow(10,X))/Math.pow(10,X);}
function pe(ac,bc){var cc=le(ac);if(cc===false){return bc;}
else{return cc;}
}
function oe(){return parseInt(pe("floatnumber",6));}
function se(ec){var ValidChars="0123456789.";for(i=0;i<ec.length;i++){if(ValidChars.indexOf(ec.charAt(i))==-1){return false;}
}
return true;}
function ins_density1(fc){document.writeln('<select name="'+fc+'" id="'+fc+'" size="1" onchange="cc_density1()">');for(i=0;i<ab.length;i++){document.writeln('<option value="'+i+'">'+ab[i][0]+'</option>');}
document.writeln('</select>');}
function te(hc,vv,ic){var jc=ab[hc];var kc=ab[ic];;if(se(jc[1])){vv=vv*jc[1];}
else{vv=eval(jc[1]);}
if(se(kc[1])){vv=vv/kc[1];}
else{vv=eval(kc[2]);}
return re(vv,bb);}
function cc_density1(){var lc=parseFloat(document.getElementById('valuefromdensity1').value);if(isNaN(lc)){document.getElementById('valuetodensity1').value='';}
else{var tb=document.getElementById('selectfromdensity1').selectedIndex;var vb=document.getElementById('selecttodensity1').selectedIndex;document.getElementById('valuetodensity1').value=te(tb,lc,vb);mc=document.getElementById('valueresultdensity1').tagName;if(mc=="SPAN")document.getElementById('valueresultdensity1').innerHTML=lc+" "+nc(document.getElementById('selectfromdensity1').options[document.getElementById('selectfromdensity1').selectedIndex].text)+" = "+document.getElementById('valuetodensity1').value+" "+nc(document.getElementById('selecttodensity1').options[document.getElementById('selecttodensity1').selectedIndex].text);else
document.getElementById('valueresultdensity1').value=lc+" "+nc(document.getElementById('selectfromdensity1').options[document.getElementById('selectfromdensity1').selectedIndex].text)+" = "+document.getElementById('valuetodensity1').value+" "+nc(document.getElementById('selecttodensity1').options[document.getElementById('selecttodensity1').selectedIndex].text);}
}
function ccb_density1(){var lc=parseFloat(document.getElementById('valuetodensity1').value);if(isNaN(lc)){document.getElementById('valuefromdensity1').value='';}
else{var tb=document.getElementById('selecttodensity1').selectedIndex;var vb=document.getElementById('selectfromdensity1').selectedIndex;document.getElementById('valuefromdensity1').value=te(tb,lc,vb);document.getElementById('valueresultdensity1').value=document.getElementById('valuefromdensity1').value+" "+nc(document.getElementById('selectfromdensity1').options[document.getElementById('selectfromdensity1').selectedIndex].text)+" = "+lc+" "+nc(document.getElementById('selecttodensity1').options[document.getElementById('selecttodensity1').selectedIndex].text);}
}
function nc(oc){return oc;var pc;if((oc.indexOf('(')==-1)&&(oc.indexOf('[')==-1))pc=oc.split();else{var qc=oc.indexOf(' ');if(qc==-1)qc=999;var rc=oc.indexOf('(');if(rc==-1)rc=999;var sc=oc.indexOf('[');if(sc==-1)sc=999;var tc=' ';if(rc<qc){tc='(';if(sc<rc){tc='[';}
}
else{tc=' ';if(sc<qc){tc='[';}
}
pc=oc.split(tc);}
return pc[0];}
