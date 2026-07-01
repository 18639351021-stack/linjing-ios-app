var ab=[["watt [W]",1],["gigawatt [GW]",1e9],["megawatt [MW]",1e6],["kilowatt [kW]",1e3],["joule/hour",0.0002777777777777778],["joule/minute",0.016666666666666666],["joule/second",1],["calorie(th)/hour",0.001162222222222222],["calorie(th)/minute",0.069733333333333333],["calorie(th)/second",4.184],["kilocalorie(th)/hour",1.162222222222222222],["kilocalorie(th)/minute",69.73333333333333333],["kilogram-force meter/hour",0.002724],["kilogram-force meter/minute",0.163444],["foot pound-force/minute",0.022597],["foot pound-force/second",1.35582],["horsepower(electric)",746],["horsepower(international)",745.69987158227022],["horsepower(water)",746.043],["horsepower(metric)",735.4988],["Btu/hour",0.293071],["Btu/minute",17.584267],["Btu/second",1055.056]];var bb;function hl(db){var eb=window.onload;if(typeof window.onload!="function"){window.onload=db;}
else{window.onload=function(){eb();db();}
}
;}
function il(db){var gb=window.onunload;if(typeof window.onunload!="function"){window.onunload=db;}
else{window.onunload=function(){gb();db();}
}
;}
hl(jl);il(kl);function ll(kb,value,lb){var mb=new Date();mb.setDate(mb.getDate()+lb);document.cookie=kb+"="+escape(value)+((lb==null)?"":";expires="+mb.toGMTString());}
function ml(kb){if(document.cookie.length>0){ob=document.cookie.indexOf(kb+"=");if(ob!=-1){ob=ob+kb.length+1;pb=document.cookie.indexOf(";",ob);if(pb==-1)pb=document.cookie.length;return unescape(document.cookie.substring(ob,pb));}
}
return"";}
function jl(){nl();if(document.getElementById('valuetopower1')){ol();cc_power1();}
}
function nl(){bb=pl();}
function ol(){var tb=ql("selectfrompower1",0);var vb=ql("selecttopower1",0);rl('selectfrompower1',tb);rl('selecttopower1',vb);document.getElementById('valuefrompower1').value=ql("valuefrompower1",1);}
function kl(){if(document.getElementById('valuetopower1')){var xb;xb=document.getElementById('selectfrompower1');ll('selectfrompower1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('selecttopower1');ll('selecttopower1',xb.options[xb.selectedIndex].value,365);xb=document.getElementById('valuefrompower1');ll('valuefrompower1',xb.value,365);}
}
function rl(yb,zb){var xb=document.getElementById(yb);if((zb>=0)&&(zb<xb.options.length)){xb.selectedIndex=zb;}
}
function sl(_b,X){X=(!X?6:X);return Math.round(_b*Math.pow(10,X))/Math.pow(10,X);}
function ql(ac,bc){var cc=ml(ac);if(cc===false){return bc;}
else{return cc;}
}
function pl(){return parseInt(ql("floatnumber",6));}
function tl(ec){var ValidChars="0123456789.";for(i=0;i<ec.length;i++){if(ValidChars.indexOf(ec.charAt(i))==-1){return false;}
}
return true;}
function ins_power1(fc){document.writeln('<select name="'+fc+'" id="'+fc+'" size="1" onchange="cc_power1()">');for(i=0;i<ab.length;i++){document.writeln('<option value="'+i+'">'+ab[i][0]+'</option>');}
document.writeln('</select>');}
function ul(hc,vv,ic){var jc=ab[hc];var kc=ab[ic];;if(tl(jc[1])){vv=vv*jc[1];}
else{vv=eval(jc[1]);}
if(tl(kc[1])){vv=vv/kc[1];}
else{vv=eval(kc[2]);}
return sl(vv,bb);}
function cc_power1(){var lc=parseFloat(document.getElementById('valuefrompower1').value);if(isNaN(lc)){document.getElementById('valuetopower1').value='';}
else{var tb=document.getElementById('selectfrompower1').selectedIndex;var vb=document.getElementById('selecttopower1').selectedIndex;document.getElementById('valuetopower1').value=ul(tb,lc,vb);mc=document.getElementById('valueresultpower1').tagName;if(mc=="SPAN")document.getElementById('valueresultpower1').innerHTML=lc+" "+nc(document.getElementById('selectfrompower1').options[document.getElementById('selectfrompower1').selectedIndex].text)+" = "+document.getElementById('valuetopower1').value+" "+nc(document.getElementById('selecttopower1').options[document.getElementById('selecttopower1').selectedIndex].text);else
document.getElementById('valueresultpower1').value=lc+" "+nc(document.getElementById('selectfrompower1').options[document.getElementById('selectfrompower1').selectedIndex].text)+" = "+document.getElementById('valuetopower1').value+" "+nc(document.getElementById('selecttopower1').options[document.getElementById('selecttopower1').selectedIndex].text);}
}
function ccb_power1(){var lc=parseFloat(document.getElementById('valuetopower1').value);if(isNaN(lc)){document.getElementById('valuefrompower1').value='';}
else{var tb=document.getElementById('selecttopower1').selectedIndex;var vb=document.getElementById('selectfrompower1').selectedIndex;document.getElementById('valuefrompower1').value=ul(tb,lc,vb);document.getElementById('valueresultpower1').value=document.getElementById('valuefrompower1').value+" "+nc(document.getElementById('selectfrompower1').options[document.getElementById('selectfrompower1').selectedIndex].text)+" = "+lc+" "+nc(document.getElementById('selecttopower1').options[document.getElementById('selecttopower1').selectedIndex].text);}
}
function nc(oc){return oc;var pc;if((oc.indexOf('(')==-1)&&(oc.indexOf('[')==-1))pc=oc.split();else{var qc=oc.indexOf(' ');if(qc==-1)qc=999;var rc=oc.indexOf('(');if(rc==-1)rc=999;var sc=oc.indexOf('[');if(sc==-1)sc=999;var tc=' ';if(rc<qc){tc='(';if(sc<rc){tc='[';}
}
else{tc=' ';if(sc<qc){tc='[';}
}
pc=oc.split(tc);}
return pc[0];}
