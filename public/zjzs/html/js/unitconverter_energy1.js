var ab=[["joule [J]",1],["gigajoule [GJ]",1e9],["megajoule [MJ]",1e6],["kilojoule [kJ]",1e3],["watt second [Ws]",1],["kilowatt hour [kWh]",3600000],["watt hour [Wh]",3600],["newton meter [Nm]",1],["calorie (IT)",4.1868],["calorie (th)",4.184],["calorie (mean)",4.19002],["calorie (15C)",4.18580],["calorie (20C)",4.18190],["calorie (nutritional)",4186],["kilocalorie (IT)",4186.8],["kilocalorie (th)",4184],["Btu (th)",1054.350],["Btu (mean)",1055.87],["centigrade heat unit",1900.4],["electron volt [eV]",1.60219e-19],["horsepower hour",2684520],["kilogram-force meter",9.80665],["foot-pound force [ft.lbf]",1.3558179483314004],["inch-pound force [in.lbf]",0.11298482902761668],["therm",105505585.257348],["erg",1e-7],["foot poundal",0.042140]];var bb;function hg(db){var eb=window.onload;if(typeof window.onload!="function"){window.onload=db;}
else{window.onload=function(){eb();db();}
}
;}
function ig(db){var gb=window.onunload;if(typeof window.onunload!="function"){window.onunload=db;}
else{window.onunload=function(){gb();db();}
}
;}
hg(jg);ig(kg);function lg(kb,value,lb){var mb=new Date();mb.setDate(mb.getDate()+lb);document.cookie=kb+"="+escape(value)+((lb==null)?"":";expires="+mb.toGMTString());}
function mg(kb){if(document.cookie.length>0){ob=document.cookie.indexOf(kb+"=");if(ob!=-1){ob=ob+kb.length+1;pb=document.cookie.indexOf(";",ob);if(pb==-1)pb=document.cookie.length;return unescape(document.cookie.substring(ob,pb));}
}
return"";}
function jg(){ng();if(document.getElementById('valuetoenergy1')){og();cc_energy1();}
}
function ng(){bb=pg();}
function og(){var tb=qg("selectfromenergy1",0);var vb=qg("selecttoenergy1",0);rg('selectfromenergy1',tb);rg('selecttoenergy1',vb);document.getElementById('valuefromenergy1').value=qg("valuefromenergy1",1);}
function kg(){if(document.getElementById('valuetoenergy1')){var xb;xb=document.getElementById('selectfromenergy1');lg('selectfromenergy1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('selecttoenergy1');lg('selecttoenergy1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('valuefromenergy1');lg('valuefromenergy1',xb.value,365);}
}
function rg(yb,zb){var xb=document.getElementById(yb);if((zb>=0)&&(zb<xb.options.length)){xb.selectedIndex=zb;}
}
function sg(_b,X){X=(!X?6:X);return Math.round(_b*Math.pow(10,X))/Math.pow(10,X);}
function qg(ac,bc){var cc=mg(ac);if(cc===false){return bc;}
else{return cc;}
}
function pg(){return parseInt(qg("floatnumber",6));}
function tg(ec){var ValidChars="0123456789.";for(i=0;i<ec.length;i++){if(ValidChars.indexOf(ec.charAt(i))==-1){return false;}
}
return true;}
function ins_energy1(fc){document.writeln('<select name="'+fc+'" id="'+fc+'" size="1" onchange="cc_energy1()">');for(i=0;i<ab.length;i++){document.writeln('<option value="'+i+'">'+ab[i][0]+'</option>');}
document.writeln('</select>');}
function ug(hc,vv,ic){var jc=ab[hc];var kc=ab[ic];;if(tg(jc[1])){vv=vv*jc[1];}
else{vv=eval(jc[1]);}
if(tg(kc[1])){vv=vv/kc[1];}
else{vv=eval(kc[2]);}
return sg(vv,bb);}
function cc_energy1(){var lc=parseFloat(document.getElementById('valuefromenergy1').value);if(isNaN(lc)){document.getElementById('valuetoenergy1').value='';}
else{var tb=document.getElementById('selectfromenergy1').selectedIndex;var vb=document.getElementById('selecttoenergy1').selectedIndex;document.getElementById('valuetoenergy1').value=ug(tb,lc,vb);mc=document.getElementById('valueresultenergy1').tagName;if(mc=="SPAN")document.getElementById('valueresultenergy1').innerHTML=lc+" "+nc(document.getElementById('selectfromenergy1').options[document.getElementById('selectfromenergy1').selectedIndex].text)+" = "+document.getElementById('valuetoenergy1').value+" "+nc(document.getElementById('selecttoenergy1').options[document.getElementById('selecttoenergy1').selectedIndex].text);else
document.getElementById('valueresultenergy1').value=lc+" "+nc(document.getElementById('selectfromenergy1').options[document.getElementById('selectfromenergy1').selectedIndex].text)+" = "+document.getElementById('valuetoenergy1').value+" "+nc(document.getElementById('selecttoenergy1').options[document.getElementById('selecttoenergy1').selectedIndex].text);}
}
function ccb_energy1(){var lc=parseFloat(document.getElementById('valuetoenergy1').value);if(isNaN(lc)){document.getElementById('valuefromenergy1').value='';}
else{var tb=document.getElementById('selecttoenergy1').selectedIndex;var vb=document.getElementById('selectfromenergy1').selectedIndex;document.getElementById('valuefromenergy1').value=ug(tb,lc,vb);document.getElementById('valueresultenergy1').value=document.getElementById('valuefromenergy1').value+" "+nc(document.getElementById('selectfromenergy1').options[document.getElementById('selectfromenergy1').selectedIndex].text)+" = "+lc+" "+nc(document.getElementById('selecttoenergy1').options[document.getElementById('selecttoenergy1').selectedIndex].text);}
}
function nc(oc){return oc;var pc;if((oc.indexOf('(')==-1)&&(oc.indexOf('[')==-1))pc=oc.split();else{var qc=oc.indexOf(' ');if(qc==-1)qc=999;var rc=oc.indexOf('(');if(rc==-1)rc=999;var sc=oc.indexOf('[');if(sc==-1)sc=999;var tc=' ';if(rc<qc){tc='(';if(sc<rc){tc='[';}
}
else{tc=' ';if(sc<qc){tc='[';}
}
pc=oc.split(tc);}
return pc[0];}
