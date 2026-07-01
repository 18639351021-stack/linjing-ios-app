var ab=[["gram/cubic centimeter",1],["gram/liter",1e-3],["gram/milliliter",1],["kilogram/cubic meter",1e-3],["kilogram/liter",1],["megagram/cubic meter",1],["milligram/milliliter",1e-3],["milligram/liter",1e-6],["ounce/cubic inch",1.729994044],["ounce/gallon (UK)",0.006236023],["ounce/gallon (US)",0.007489152],["pound/cubic inch",27.679904],["pound/cubic foot",0.016018463],["pound/gallon (UK)",0.099776373],["pound/gallon (US)",0.119826427],["grain/gallon (UK)",0.000014253948343691203],["grain/gallon (US)",0.000017118011571775823],["tonne/cubic meter",1],["ton (UK)/cubic yard",1.328939184],["ton (US)/cubic yard",1.186552843],["slug/cubic foot",0.51531788206]];var bb;function ue(db){var eb=window.onload;if(typeof window.onload!="function"){window.onload=db;}
else{window.onload=function(){eb();db();}
}
;}
function ve(db){var gb=window.onunload;if(typeof window.onunload!="function"){window.onunload=db;}
else{window.onunload=function(){gb();db();}
}
;}
ue(we);ve(xe);function ye(kb,value,lb){var mb=new Date();mb.setDate(mb.getDate()+lb);document.cookie=kb+"="+escape(value)+((lb==null)?"":";expires="+mb.toGMTString());}
function ze(kb){if(document.cookie.length>0){ob=document.cookie.indexOf(kb+"=");if(ob!=-1){ob=ob+kb.length+1;pb=document.cookie.indexOf(";",ob);if(pb==-1)pb=document.cookie.length;return unescape(document.cookie.substring(ob,pb));}
}
return"";}
function we(){$e();if(document.getElementById('valuetodensity2')){_e();cc_density2();}
}
function $e(){bb=af();}
function _e(){var tb=bf("selectfromdensity2",0);var vb=bf("selecttodensity2",0);cf('selectfromdensity2',tb);cf('selecttodensity2',vb);document.getElementById('valuefromdensity2').value=bf("valuefromdensity2",1);}
function xe(){if(document.getElementById('valuetodensity2')){var xb;xb=document.getElementById('selectfromdensity2');ye('selectfromdensity2',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('selecttodensity2');ye('selecttodensity2',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('valuefromdensity2');ye('valuefromdensity2',xb.value,365);}
}
function cf(yb,zb){var xb=document.getElementById(yb);if((zb>=0)&&(zb<xb.options.length)){xb.selectedIndex=zb;}
}
function df(_b,X){X=(!X?6:X);return Math.round(_b*Math.pow(10,X))/Math.pow(10,X);}
function bf(ac,bc){var cc=ze(ac);if(cc===false){return bc;}
else{return cc;}
}
function af(){return parseInt(bf("floatnumber",6));}
function ef(ec){var ValidChars="0123456789.";for(i=0;i<ec.length;i++){if(ValidChars.indexOf(ec.charAt(i))==-1){return false;}
}
return true;}
function ins_density2(fc){document.writeln('<select name="'+fc+'" id="'+fc+'" size="1" onchange="cc_density2()">');for(i=0;i<ab.length;i++){document.writeln('<option value="'+i+'">'+ab[i][0]+'</option>');}
document.writeln('</select>');}
function ff(hc,vv,ic){var jc=ab[hc];var kc=ab[ic];;if(ef(jc[1])){vv=vv*jc[1];}
else{vv=eval(jc[1]);}
if(ef(kc[1])){vv=vv/kc[1];}
else{vv=eval(kc[2]);}
return df(vv,bb);}
function cc_density2(){var lc=parseFloat(document.getElementById('valuefromdensity2').value);if(isNaN(lc)){document.getElementById('valuetodensity2').value='';}
else{var tb=document.getElementById('selectfromdensity2').selectedIndex;var vb=document.getElementById('selecttodensity2').selectedIndex;document.getElementById('valuetodensity2').value=ff(tb,lc,vb);mc=document.getElementById('valueresultdensity2').tagName;if(mc=="SPAN")document.getElementById('valueresultdensity2').innerHTML=lc+" "+nc(document.getElementById('selectfromdensity2').options[document.getElementById('selectfromdensity2').selectedIndex].text)+" = "+document.getElementById('valuetodensity2').value+" "+nc(document.getElementById('selecttodensity2').options[document.getElementById('selecttodensity2').selectedIndex].text);else
document.getElementById('valueresultdensity2').value=lc+" "+nc(document.getElementById('selectfromdensity2').options[document.getElementById('selectfromdensity2').selectedIndex].text)+" = "+document.getElementById('valuetodensity2').value+" "+nc(document.getElementById('selecttodensity2').options[document.getElementById('selecttodensity2').selectedIndex].text);}
}
function ccb_density2(){var lc=parseFloat(document.getElementById('valuetodensity2').value);if(isNaN(lc)){document.getElementById('valuefromdensity2').value='';}
else{var tb=document.getElementById('selecttodensity2').selectedIndex;var vb=document.getElementById('selectfromdensity2').selectedIndex;document.getElementById('valuefromdensity2').value=ff(tb,lc,vb);document.getElementById('valueresultdensity2').value=document.getElementById('valuefromdensity2').value+" "+nc(document.getElementById('selectfromdensity2').options[document.getElementById('selectfromdensity2').selectedIndex].text)+" = "+lc+" "+nc(document.getElementById('selecttodensity2').options[document.getElementById('selecttodensity2').selectedIndex].text);}
}
function nc(oc){return oc;var pc;if((oc.indexOf('(')==-1)&&(oc.indexOf('[')==-1))pc=oc.split();else{var qc=oc.indexOf(' ');if(qc==-1)qc=999;var rc=oc.indexOf('(');if(rc==-1)rc=999;var sc=oc.indexOf('[');if(sc==-1)sc=999;var tc=' ';if(rc<qc){tc='(';if(sc<rc){tc='[';}
}
else{tc=' ';if(sc<qc){tc='[';}
}
pc=oc.split(tc);}
return pc[0];}
