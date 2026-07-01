var ab=[["liter [l,L]",1],["liter (1901-1964)",1.000028],["cubic decimeter[dm^3]",1],["cubic decameter[dam^3]",1e6],["cubic meter [m^3]",1e3],["deciliter",0.1],["centiliter",0.01],["cubic centimeter[cm^3]",1e-3],["milliliter",1e-3],["cubic millimeter[mm^3]",1e-6],["acre foot",1233481.83754752],["cubic yard [yd^3]",764.554857984],["cubic foot [ft^3]",28.316846592],["cubic inch [in^3]",0.016387064],["gallon(UK)",4.54609],["gallon(US dry)",4.40488377086],["gallon(US)",3.785411784],["barrel(oil)",158.987294928],["barrel(UK)",36.36872],["barrel(US)",35.23907016688],["fluid ounce(UK)",0.0284130625],["fluid ounce(US)",0.0295735295625],["pint(UK)",0.56826125],["pint(US dry)",0.5506104713575],["pint(US)",0.473176473],["quart(UK)",1.1365225],["quart(US dry)",1.101220942715],["quart(US)",0.946352946],["cup(US)",0.2365882365],["cup(metric)",0.25],["cup(UK)",0.284131],["table spoon(US)",0.01478676478125],["table spoon(metric)",0.015],["table spoon(UK)",0.017758],["tea spoon(US)",0.00492892159375],["tea spoon(metric)",0.005],["tea spoon(UK)",0.005919]];var bb;function jq(db){var eb=window.onload;if(typeof window.onload!="function"){window.onload=db;}
else{window.onload=function(){eb();db();}
}
;}
function kq(db){var gb=window.onunload;if(typeof window.onunload!="function"){window.onunload=db;}
else{window.onunload=function(){gb();db();}
}
;}
jq(lq);kq(mq);function nq(kb,value,lb){var mb=new Date();mb.setDate(mb.getDate()+lb);document.cookie=kb+"="+escape(value)+((lb==null)?"":";expires="+mb.toGMTString());}
function oq(kb){if(document.cookie.length>0){ob=document.cookie.indexOf(kb+"=");if(ob!=-1){ob=ob+kb.length+1;pb=document.cookie.indexOf(";",ob);if(pb==-1)pb=document.cookie.length;return unescape(document.cookie.substring(ob,pb));}
}
return"";}
function lq(){pq();if(document.getElementById('valuetovolume1')){qq();cc_volume1();}
}
function pq(){bb=rq();}
function qq(){var tb=sq("selectfromvolume1",0);var vb=sq("selecttovolume1",0);tq('selectfromvolume1',tb);tq('selecttovolume1',vb);document.getElementById('valuefromvolume1').value=sq("valuefromvolume1",1);}
function mq(){if(document.getElementById('valuetovolume1')){var xb;xb=document.getElementById('selectfromvolume1');nq('selectfromvolume1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('selecttovolume1');nq('selecttovolume1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('valuefromvolume1');nq('valuefromvolume1',xb.value,365);}
}
function tq(yb,zb){var xb=document.getElementById(yb);if((zb>=0)&&(zb<xb.options.length)){xb.selectedIndex=zb;}
}
function uq(_b,X){X=(!X?6:X);return Math.round(_b*Math.pow(10,X))/Math.pow(10,X);}
function sq(ac,bc){var cc=oq(ac);if(cc===false){return bc;}
else{return cc;}
}
function rq(){return parseInt(sq("floatnumber",6));}
function vq(ec){var ValidChars="0123456789.";for(i=0;i<ec.length;i++){if(ValidChars.indexOf(ec.charAt(i))==-1){return false;}
}
return true;}
function ins_volume1(fc){document.writeln('<select name="'+fc+'" id="'+fc+'" size="1" onchange="cc_volume1()">');for(i=0;i<ab.length;i++){document.writeln('<option value="'+i+'">'+ab[i][0]+'</option>');}
document.writeln('</select>');}
function wq(hc,vv,ic){var jc=ab[hc];var kc=ab[ic];;if(vq(jc[1])){vv=vv*jc[1];}
else{vv=eval(jc[1]);}
if(vq(kc[1])){vv=vv/kc[1];}
else{vv=eval(kc[2]);}
return uq(vv,bb);}
function cc_volume1(){var lc=parseFloat(document.getElementById('valuefromvolume1').value);if(isNaN(lc)){document.getElementById('valuetovolume1').value='';}
else{var tb=document.getElementById('selectfromvolume1').selectedIndex;var vb=document.getElementById('selecttovolume1').selectedIndex;document.getElementById('valuetovolume1').value=wq(tb,lc,vb);mc=document.getElementById('valueresultvolume1').tagName;if(mc=="SPAN")document.getElementById('valueresultvolume1').innerHTML=lc+" "+nc(document.getElementById('selectfromvolume1').options[document.getElementById('selectfromvolume1').selectedIndex].text)+" = "+document.getElementById('valuetovolume1').value+" "+nc(document.getElementById('selecttovolume1').options[document.getElementById('selecttovolume1').selectedIndex].text);else
document.getElementById('valueresultvolume1').value=lc+" "+nc(document.getElementById('selectfromvolume1').options[document.getElementById('selectfromvolume1').selectedIndex].text)+" = "+document.getElementById('valuetovolume1').value+" "+nc(document.getElementById('selecttovolume1').options[document.getElementById('selecttovolume1').selectedIndex].text);}
}
function ccb_volume1(){var lc=parseFloat(document.getElementById('valuetovolume1').value);if(isNaN(lc)){document.getElementById('valuefromvolume1').value='';}
else{var tb=document.getElementById('selecttovolume1').selectedIndex;var vb=document.getElementById('selectfromvolume1').selectedIndex;document.getElementById('valuefromvolume1').value=wq(tb,lc,vb);document.getElementById('valueresultvolume1').value=document.getElementById('valuefromvolume1').value+" "+nc(document.getElementById('selectfromvolume1').options[document.getElementById('selectfromvolume1').selectedIndex].text)+" = "+lc+" "+nc(document.getElementById('selecttovolume1').options[document.getElementById('selecttovolume1').selectedIndex].text);}
}
function nc(oc){return oc;var pc;if((oc.indexOf('(')==-1)&&(oc.indexOf('[')==-1))pc=oc.split();else{var qc=oc.indexOf(' ');if(qc==-1)qc=999;var rc=oc.indexOf('(');if(rc==-1)rc=999;var sc=oc.indexOf('[');if(sc==-1)sc=999;var tc=' ';if(rc<qc){tc='(';if(sc<rc){tc='[';}
}
else{tc=' ';if(sc<qc){tc='[';}
}
pc=oc.split(tc);}
return pc[0];}
