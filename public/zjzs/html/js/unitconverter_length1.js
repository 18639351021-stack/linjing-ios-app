var ab=[["meter [m]",1],["kilometer [km]",1000],["hectometer [hm]",100],["decimeter [dm]",0.1],["centimeter [cm]",0.01],["millimeter [mm]",0.001],["micrometer [um]",1e-6],["nanometer [nm]",1e-9],["picometer [pm]",1e-12],["angstrom [A]",1e-10],["inch [in]",0.0254],["foot (US) [ft]",0.3048],["yard [yd]",0.9144],["mile (international) [mi]",1609.344],["thou",0.0000254],["mil",0.0000254],["nautical mile(international)",1852],["nautical mile(UK)",1853.184],["em (pica)",0.0042333],["parsec [pc]",3.0856776e16],["hand",0.1016],["astronomical unit [AU]",149598550000],["light year",9.460528405e15],["barleycorn",0.008467],["cable",182.88],["chain (surveyor's)",20.116840233680467360934721869444],["ell (UK)",0.875],["fathom [fath]",1.8288],["furlong",201.168]];var bb;function hj(db){var eb=window.onload;if(typeof window.onload!="function"){window.onload=db;}
else{window.onload=function(){eb();db();}
}
;}
function ij(db){var gb=window.onunload;if(typeof window.onunload!="function"){window.onunload=db;}
else{window.onunload=function(){gb();db();}
}
;}
hj(jj);ij(kj);function lj(kb,value,lb){var mb=new Date();mb.setDate(mb.getDate()+lb);document.cookie=kb+"="+escape(value)+((lb==null)?"":";expires="+mb.toGMTString());}
function mj(kb){if(document.cookie.length>0){ob=document.cookie.indexOf(kb+"=");if(ob!=-1){ob=ob+kb.length+1;pb=document.cookie.indexOf(";",ob);if(pb==-1)pb=document.cookie.length;return unescape(document.cookie.substring(ob,pb));}
}
return"";}
function jj(){nj();if(document.getElementById('valuetolength1')){oj();cc_length1();}
}
function nj(){bb=pj();}
function oj(){var tb=qj("selectfromlength1",0);var vb=qj("selecttolength1",0);rj('selectfromlength1',tb);rj('selecttolength1',vb);document.getElementById('valuefromlength1').value=qj("valuefromlength1",1);}
function kj(){if(document.getElementById('valuetolength1')){var xb;xb=document.getElementById('selectfromlength1');lj('selectfromlength1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('selecttolength1');lj('selecttolength1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('valuefromlength1');lj('valuefromlength1',xb.value,365);}
}
function rj(yb,zb){var xb=document.getElementById(yb);if((zb>=0)&&(zb<xb.options.length)){xb.selectedIndex=zb;}
}
function sj(_b,X){X=(!X?6:X);return Math.round(_b*Math.pow(10,X))/Math.pow(10,X);}
function qj(ac,bc){var cc=mj(ac);if(cc===false){return bc;}
else{return cc;}
}
function pj(){return parseInt(qj("floatnumber",6));}
function tj(ec){var ValidChars="0123456789.";for(i=0;i<ec.length;i++){if(ValidChars.indexOf(ec.charAt(i))==-1){return false;}
}
return true;}
function ins_length1(fc){document.writeln('<select name="'+fc+'" id="'+fc+'" size="1" onchange="cc_length1()">');for(i=0;i<ab.length;i++){document.writeln('<option value="'+i+'">'+ab[i][0]+'</option>');}
document.writeln('</select>');}
function uj(hc,vv,ic){var jc=ab[hc];var kc=ab[ic];;if(tj(jc[1])){vv=vv*jc[1];}
else{vv=eval(jc[1]);}
if(tj(kc[1])){vv=vv/kc[1];}
else{vv=eval(kc[2]);}
return sj(vv,bb);}
function cc_length1(){var lc=parseFloat(document.getElementById('valuefromlength1').value);if(isNaN(lc)){document.getElementById('valuetolength1').value='';}
else{var tb=document.getElementById('selectfromlength1').selectedIndex;var vb=document.getElementById('selecttolength1').selectedIndex;document.getElementById('valuetolength1').value=uj(tb,lc,vb);mc=document.getElementById('valueresultlength1').tagName;if(mc=="SPAN")document.getElementById('valueresultlength1').innerHTML=lc+" "+nc(document.getElementById('selectfromlength1').options[document.getElementById('selectfromlength1').selectedIndex].text)+" = "+document.getElementById('valuetolength1').value+" "+nc(document.getElementById('selecttolength1').options[document.getElementById('selecttolength1').selectedIndex].text);else
document.getElementById('valueresultlength1').value=lc+" "+nc(document.getElementById('selectfromlength1').options[document.getElementById('selectfromlength1').selectedIndex].text)+" = "+document.getElementById('valuetolength1').value+" "+nc(document.getElementById('selecttolength1').options[document.getElementById('selecttolength1').selectedIndex].text);}
}
function ccb_length1(){var lc=parseFloat(document.getElementById('valuetolength1').value);if(isNaN(lc)){document.getElementById('valuefromlength1').value='';}
else{var tb=document.getElementById('selecttolength1').selectedIndex;var vb=document.getElementById('selectfromlength1').selectedIndex;document.getElementById('valuefromlength1').value=uj(tb,lc,vb);document.getElementById('valueresultlength1').value=document.getElementById('valuefromlength1').value+" "+nc(document.getElementById('selectfromlength1').options[document.getElementById('selectfromlength1').selectedIndex].text)+" = "+lc+" "+nc(document.getElementById('selecttolength1').options[document.getElementById('selecttolength1').selectedIndex].text);}
}
function nc(oc){return oc;var pc;if((oc.indexOf('(')==-1)&&(oc.indexOf('[')==-1))pc=oc.split();else{var qc=oc.indexOf(' ');if(qc==-1)qc=999;var rc=oc.indexOf('(');if(rc==-1)rc=999;var sc=oc.indexOf('[');if(sc==-1)sc=999;var tc=' ';if(rc<qc){tc='(';if(sc<rc){tc='[';}
}
else{tc=' ';if(sc<qc){tc='[';}
}
pc=oc.split(tc);}
return pc[0];}
