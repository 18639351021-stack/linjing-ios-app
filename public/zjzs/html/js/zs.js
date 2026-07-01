/*钻井助手手机版由中原钻井一公司70225队李鑫编写。
软件生成手机版钻井助手、电脑版钻井助手，在公众号：钻井助手，QQ交流群钻井助手均可下载使用。
本软件采用JS语言编写，完全可以在android系统手机，平板电脑上使用。
共收录现场常用计算公式 120个。编写代码5600行。
制作本软件的目的是为了满足各岗位人员现场使用的方便。
使用中不方便的地方，或者需要更正的数据可以与我联系。
联系电话：17590708668
QQ：1761817818
微信号：chinalixin
特此说明。
2016年7月25日
*/
/*document.write ('<script language="javascript" type="text/javascript" src="http://js.users.51.la/18900003.js"></script>');
document.write ('<script language="javascript" type="text/javascript" src="http://2345.cn/kwo "></script>'); */
function $(id){
return document.getElementById(id);
}
/*1体积法测油气层上窜速度*/
function  getInterest(){
G7 = form1.G7.value;   /*油气层深度*/
G8 = form1.G8.value;    /*井径*/
G9 = form1.G9.value;     /*钻具外径*/
G10 = form1.G10.value;     /*钻井泵排量*/
G11 = form1.G11.value;     /*从开泵循环到开泵时间*/
G12 = form1.G12.value;     /*静止时间*/
G18=(3.14/4)*Math.pow((G8/10),2)*G7/10000;
G21=G18-(3.14/4)*Math.pow((G9/10),2)*G7/10000;
G24=G10*60;
G20=G21/G7*1000;
$("tmp2").value = ((G7-(G24/G20)*G11)/G12).toFixed(2);
}
/*2迟到时间法测油气层上窜速度*/
function  cdsj(){
N7 = form1.N7.value;   /*钻头深度*/
N8 = form1.N8.value;    /*油气层深度*/
N9 = form1.N9.value;     /*钻头所在位置迟到时间*/
N10 = form1.N10.value;     /*从开泵循环到见油气显示时间*/
N11 = form1.N11.value;     /*静止时间*/
C4=N7/N9*N10;
N12=N8-C4;
$("cdsj2").value =Math.round(100*(N8-N7/N9*N10)/N11)/100;
$("C4").value=C4.toFixed(2);
$("N12").value=N12.toFixed(2);
}
/*3钻井泵排量计算*/
function  zjbpl(){
I5 = form1.I5.value;   /*缸套直径*/
I6 = form1.I6.value;    /*缸套个数*/
I7 = form1.I7.value;     /*冲数*/
I8 = form1.I8.value;     /*活塞冲程*/
I9 = form1.I9.value;     /*钻井泵上水效率*/
I11=Math.pow((I5/2),2)*3.1416/100;  /*截面积*/
if (I9<=1 &&I9>0  )
{
$("zjbpl2").value=(I9*0.785*I5*I5*I6*I8*I7/1000000/60).toFixed(2);/*l/s*/
$("zjbpl3").value=(I9*0.785*I5*I5*I6*I8*I7/1000000000).toFixed(3);/*m3/min*/
$("zjbpl4").value=(I9*0.785*I5*I5*I6*I8*I7*60/1000000000).toFixed(2);/*m3/h*/
}
else{alert("亲，你在逗我嘛!");	}
}
/*4静夜柱压力计算*/
function  jyzyl(){
G5 = form1.G5.value;   /*垂直井深*/
G6 = form1.G6.value;    /*钻井液密度*/
$("jyzyl2").value=Math.round(100*9.81*G6*G5/1000)/100;
}
/*5加重液密度的计算*/
function zjymd(){
G5 = form1.G5.value;   /*加重前体积*/
G6 = form1.G6.value;    /*加重前密度*/
G7 = form1.G7.value;     /*加重后密度*/
G8 = form1.G8.value;     /*加重剂密度*/
$("zjymd2").value=Math.round(100*G5*G8*(G7-G6)/(G8-G7))/100;  /*所需加重材料吨*/
$("zjymd3").value= (parseFloat(G5)+  parseFloat(G5*(G7-G6)/(G8-G7))).toFixed(2);
}
/*6压井液密度的计算*/
function yjymd(){
G4 = form1.G4.value;   /*垂直井深*/
G5 = form1.G5.value;    /*原外钻井液密度*/
G6 = form1.G6.value;     /*关井后立管压力*/
G7 = form1.G7.value;     /*附加系数*/
G10= G6*9.81;
$("yjymd2").value=((parseFloat(G4*G5/10)+parseFloat(G10))/G4*10+parseFloat(G7)).toFixed(2);  /*所需加重材料吨*/
}
/*7环空压力损失的计算*/
function hkylss(){
H5 = form1.H5.value;   /*井径*/
H6 = form1.H6.value;    /*钻杆外径*/
H7 = form1.H7.value;     /*井深*/
H8 = form1.H8.value;     /*Φ600*/
H9 = form1.H9.value;     /*Φ300*/
H16=H8-H9;
H15=H9-H16;
H17=H15/100*(H5-H6)/1000;
$("DQL").value=Math.round(100*H15*0.4788)/100;
$("SXND").value=H16;
$("hkylss2").value=Math.round(100*H17*0.0098*H7)/100;  /*环空压力损失MPA*/
}
/*8悬浮加重材料所需的最小静切力计算*/
function zxjql(){
G5 = form1.G5.value;    /*钻井液密度*/
G6 = form1.G6.value;     /*加重材料密度*/
G7 = form1.G7.value;     /*加重材料粒径*/
G10= G5*1000;
G11=G6*1000;
G12= G7*Math.pow(10,-4);
$("ZXJQL2").value=Math.round(100*((G12*(G11-G10)*10))/6*10)/100;  /*所需钻井液的最小静切力*/
}
/*9降低密度加水量计算*/
function jiashui(){
G5 = form1.G5.value;    /*原钻井液体积*/
G6 = form1.G6.value;     /*原钻井液密度*/
G7 = form1.G7.value;     /*稀释后钻井液密度*/
G8 = form1.G8.value;     /*水的密度*/
$("js").value=Math.round(100*(G5*(G6-G7)*G8)/(G7-G8))/100;  /*降低密度加水量计算*/
}
/*10岩屑密度计算*/
function yanxue1(){
H5 = form1.H5.value;    /*加盖后称得密度值*/
yx23=(1/(2-H5));
$("yx23").value=yx23.toFixed(2);  /*重晶石密度计算*/
if  (yx23<=2.86)
{$("P11").value="低密度岩石！";}
else
{$("P11").value="高密度岩石！";}
}
/*11重晶石密度计算*/
function baso4(){
H5 = form1.H5.value;    /*加盖后称得密度值*/
yx2=(1/(2-H5)+parseFloat(0.23));
$("yx2").value=yx2.toFixed(2);  /*重晶石密度计算*/
if  (yx2<=4.04)
{$("P11").value="不合格！";}
else if (yx2>=4.05&& yx2<4.2)
{$("P11").value="二级";}
else if (yx2>=4.2&& yx2<4.3)
{$("P11").value="一级";}
else
{$("P11").value="特级";}
}
/*12混浆密度计算*/
function hjmd(){
G4 = form1.G4.value;   /*1号钻井液体积*/
G5 = form1.G5.value;    /*1号钻井液密度*/
G6 = form1.G6.value;     /*2号钻井液体积*/
G7 = form1.G7.value;     /*2号钻井液密度*/
$("hjmd").value=Math.round(100*(parseFloat(G4*G5)+parseFloat(G6*G7))/(parseFloat(G4)+parseFloat(G6)))/100;
$("hjtj").value=parseFloat(G4)+parseFloat(G6);
}
/*.....................................................化学分析.............................................*/
/*13氯离子[Cl-]含量计算*/
function lvlizi(){
G5 = form1.G5.value;    /*Ag2CrO4浓度*/
G6 = form1.G6.value;     /*Ag2CrO4消耗量*/
G7 = form1.G7.value;      /*取样量*/
G10=G5*G6*1000/G7*35.45;
$("llzcd").value=(G5*G6*1000/G7*35.45).toFixed(2);
$("hyl").value=(G10*1.65/10000).toFixed(2);
}
/*14钙镁离子含量计算*/
function camg(){
G5 = form1.G5.value;    /*EDTA浓度*/
G6 = form1.G6.value;     /*EDTA消耗量*/
G7 = form1.G7.value;      /*取样量*/
M5 = form1.M5.value;    /*EDTA浓度*/
M6 = form1.M6.value;     /*EDTA消耗量*/
M7 = form1.M7.value;      /*取样量*/
$("calizi").value=(G5*G6*1000/G7*40.08).toFixed(2);
$("mglizi").value=(M5*M6*(G6-M6)*1000/M7*24.3).toFixed(2);
}
/*15硫酸根离子（SO42-）*/
function so4(){
F4 = form1.F4.value;    /*EDTA浓度*/
F5 = form1.F5.value;     /*EDTA消耗量*/
F6 = form1.F6.value;      /*取样量*/
if(F6=="")
{$("so4").value="";  }
else
( $("so4").value=(F4*F5*1000/F6*96).toFixed(2))
}
/*16亚硫酸根离子（SO42-）*/
function yso4(){
G4 = form1.G4.value;    /*EDTA浓度*/
G5 = form1.G5.value;     /*EDTA消耗量*/
G6 = form1.G6.value;      /*取样量*/
if(G5==0)
{$("yso4").value=0;  }
else
{$("yso4").value=(G4*G6*40*1000/G5 ).toFixed(2)}
}
/*.....................................................化学分析.............................................*/
/*17卡点的计算*/
function  qiadian(){
H4 = form1.H4.value;   /*第一次提升拉力*/
H5 = form1.H5.value;   /*第二次提升拉力*/
H6 = form1.H6.value;    /*第三次提升拉力*/
H7 = form1.H7.value;     /*第一次提升伸长*/
H8 = form1.H8.value;     /*第二次提升伸长*/
H9 = form1.H9.value;     /*第三次提升伸长*/
H10= form1.H10.value;     /*K系数*/
H11= form1.H11.value;     /*钻杆外径*/
H13=Math.pow((H11/2),2)*3.1416;  /*钻杆截面积*/
$("pjll").value=(parseFloat(H4)+parseFloat(H5)+parseFloat(H6))/3;           /*H15平均拉力*/
$("pjsc").value=(parseFloat(H7)+parseFloat(H8)+parseFloat(H9))/3;           /*H16平均伸长*/
$("qdsd").value=H10*(parseFloat(H7)+parseFloat(H8)+parseFloat(H9))/(parseFloat(H4)+parseFloat(H5)+parseFloat(H6))/10;
}
/*......................................................单位换算.............................................*/
/*18长度单位换算*/
function cddw(){
G6 = form1.G5.value;    /*mm*/
$("weimi").value=G6*1000;  /*微米*/
$("limi").value=G6/10;  /*厘米*/
$("feimi").value=G6/100;  /*分米*/
$("mi").value=G6/1000;  /*米(公尺)*/
$("qianmi").value=G6/1000000;  /*千米(公里)*/
$("yingxun").value=G6*0.0005468;  /*英寻*/
$("fur").value=G6*0.000005;  /*弗隆*/
$("ma").value=G6/1000000/0.9144;  /*码*/
$("yingchi").value=G6/1000000/0.3048;  /*英尺*/
$("yingcun").value=G6/25.4;  /*英寸*/
$("yingli").value=G6*0.00000062137119;  /*英里*/
$("haili").value=G6*0.0000005399568;  /*海里*/
}
/*......................................................单位换算.............................................*/
/*19钻井液中钻屑含量*/
function yanxue(){
G5 = form1.G5.value;    /*井径*/
G6 = form1.G6.value;     /*机械钻速*/
G7 = form1.G7.value;      /*排量*/
if(G5==0&&G6==0)
{$("yX").value="";  }
else
{$("yX").value=(84.45*Math.pow(G5/25.4,2)*G6/(G7*60) ).toFixed(2)
}
}
/*20钻具运动时环空当量流动速度*/
function dlliudong(){
F5 = form1.F5.value;    /*井径*/
F6 = form1.F6.value;     /*钻井外径*/
F7 = form1.F7.value;      /*钻具平均运动速度*/
$("FS").value=((0.45+Math.pow(F6/25.4,2)/(Math.pow(F5/25.4,2)-Math.pow(F6/25.4,2)))*F7*0.3048).toFixed(2);
}
/*21用膨润土配制新钻井液按欲配新钻井液的密度*/
function tutiji(){
H5 = form1.H5.value;    /*所需新钻井液量*/
H6 = form1.H6.value;     /*欲配新钻井液的密度*/
H7 = form1.H7.value;      /*配液介质（水）密度*/
H8 = form1.H8.value;      /*粘土相对密度*/
H15=H5*H8*(H6-H7)/(H8-H7);/*所需配液介质(土)量*/
$("H15").value=(H5*H8*(H6-H7)/(H8-H7)).toFixed(2);/*所需配液介质(土)量*/
$("H12").value=(H5-(H15/H8)).toFixed(2);  /*所需配液介质(水)量*/
H12=H5-(H15/H8);
H18=H15*0.05;
$("H18").value=(H15*0.05).toFixed(2);
H16=H15*1000;
H13=H12*1000;
H20=H16/H13*100;
$("H20").value=(H16/H13*100).toFixed(2);
H22=H20*7;
$("H21").value=(H22/14.28).toFixed(2);
$("H22").value=(H20*7).toFixed(2);
}
/*22用膨润土配制新钻井液按膨润土加入量*/
function tujialiang(){
P5 = form1.P5.value;    /*所需新钻井液量*/
P6 = form1.P6.value;     /*膨润土加入量*/
P7 = form1.P7.value;      /*配液介质（水）密度*/
P8 = form1.P8.value;      /*粘土相对密度*/
P12=P5-(P8/P5);
$("P12").value=P5-(P8/P5);  /*所需配液介质(水)量*/
P15=P6*0.05;
$("P15").value=(P6*0.05).toFixed(2);/*所需配液介质纯碱量*/
P17=P6/P5*1000; /*膨润土含量*/
$("P17").value=P6/P5*1000;
P18=P6/P5*100;
P20=P18*7;
P19=P20/14.3;
$("P19").value=P19.toFixed(2);
P20=P18*7;
$("P20").value=P20;
P21=(1+P18/P8)/100+1;
$("P21").value=P21;
}
/*23井内钻井液量计算*/
function jyrj(){
G4 = form1.G4.value;    /*井径*/
G5 = form1.G5.value;     /*钻具外径*/
G7 = form1.G7.value;      /*壁厚*/
G6 = form1.G6.value;      /*井深*/
G8 = form1.G8.value;      /*每冲*/
G9 = form1.G9.value;      /*泵速*/
G16=3.14/4*Math.pow(G5,2)*G6/1000000; /*钻具总体体积*/
$("G16").value=(3.14/4*Math.pow(G5,2)*G6/1000000).toFixed(2); /*钻具总体积，含内容积*/
G10=G4/1000;
G18=3.14/4*Math.pow(G10,2)*G6 ;   /*空井容积*/
G26=0.785*(G5-2*G7)*(G5-2*G7)*G6/1000000;/*钻具内容积*/
G27=G16-G26;/*钻具体积*/

G28=G18-G27;
G29=G28/G8;/*循环一周总冲数*/
G30=G26/G8;/*下行冲数*/
G31=(G18-G16)/G8;/*上行冲数*/
G32=G30/G9;/*下行时间*/
G33=G31/G9;/*上行时间*/
G34=parseFloat(G32)+parseFloat(G33);/*循环一周总时间*/
$("G18").value=(3.14/4*Math.pow(G10,2)*G6).toFixed(2);   /*空井容积*/
$("G25").value=(G18-G16).toFixed(2);/*环空容积*/
$("G26").value=G26.toFixed(2);/*钻具内容积*/
$("G27").value=G27.toFixed(2);/*钻具体积*/
$("G28").value=G28.toFixed(2);/*环容+钻具内容*/
$("G29").value=G29.toFixed(2);/*循环一周总冲数*/

$("G30").value=G30.toFixed(2);/*下行冲数*/
$("G31").value=G31.toFixed(2);/*上行冲数*/
$("G32").value=G32.toFixed(2);/*下行时间*/
$("G33").value=G33.toFixed(2);/*上行时间*/
$("G34").value=G34.toFixed(2);/*总时间*/



}
/*24静堵堵漏计算*/
function dl123(){
H5 = form1.H5.value;    /*漏层位置*/
H6 = form1.H6.value;     /*堵漏液量*/
H7 = form1.H7.value;      /*堵漏液泵入时间*/
H8 = form1.H8.value;      /*排量*/
H9 = form1.H9.value;     /*堵漏液量*/
H10 = form1.H10.value;      /*堵漏液泵入时间*/
H11 = form1.H11.value;      /*排量*/
H12 = form1.H12.value;      /*钻具内剩余*/
H19=(H9/100)*(H9/100)*3.14/4*H5;    /*井眼总容积*/
H20=H8/1000*60*H7;/*实际泵入堵漏液量*/
H21=(3.14/4*(Math.pow((H11/100),2))*H5-H12*3.14/4*Math.pow((H11/100),2))/(H8/1000)/60;/*顶替时间*/
H22=Math.pow((H11/100),2)*3.14/4*H5;/*钻具内容积*/
H26=H8;
H27=H26*60/1000;/*顶替至钻头位置所需时间*/
H23=H22/H27;/*顶替至钻头位置所需时间*/
H24=H5/H23;/*下行速度*/
H29=H8/1000/(3.14/4*(Math.pow((H9/100),2)-Math.pow((H10/100),2)));/*上返速度*/
H25=H5/H29/60 ;/*迟到时间*/
H30=(H6/(3.14/4*Math.pow((H9/100),2))).toFixed(2);/*计划*/
H31=(H20/(3.14/4*Math.pow((H9/100),2))).toFixed(2);/*实际*/
H32=(H5-H31).toFixed(2);/*界面*/
$("H19").value=H19.toFixed(2);    /*井眼总容积*/
$("H20").value=H20.toFixed(2);
$("H21").value=H21.toFixed(2);
$("H22").value=H22.toFixed(2);
$("H23").value=H23.toFixed(2);
$("H24").value=H24.toFixed(2);
$("H25").value=H25.toFixed(2);
$("H29").value=H29.toFixed(2);
$("H26").value=H26;
$("H30").value=H30;
$("H31").value=H31;
$("H32").value=H32;
}
/*25钻井液滤失量计算*/
function lsl(){
G5 = form1.G5.value;    /*滤失时间*/
G6 = form1.G6.value;     /*滤失量*/
G9=Math.pow((30/G5),0.5)*G6;
G10=G5*60;
$("G9").value=G9.toFixed(2);
$("G10").value=G10;
}
/*26井眼净化能力计算*/
function jyjh123(){
H6 = form1.H6.value;     /*井径*/
H7 = form1.H7.value;      /*钻具外径*/
H8 = form1.H8.value;      /*排量*/
H9 = form1.H9.value;     /*井深*/
H10 = form1.H10.value;      /*钻井液密度*/
H11 = form1.H11.value;      /*Φ600*/
H12 = form1.H12.value;      /*Φ300*/
H16=H11/2;    /*表观粘度*/
H17=H11-H12;/*塑性粘度*/
H18=(H12-H17)*0.478;/*动切力*/
H20=H18/H17;/*动塑比*/
H46=(0.2*(6.6-H10)*10)/(H20*10);/*钻屑迟到时间*/
H21=H6/10;
H22=H6/25.4;
H23=H7/10;
H24=H7/25.4;
H28=12.7*H8/(Math.pow((H22*2.54),2)-Math.pow((H24*2.54),2));/*上返速度*/
H29=H28*60;
H31=H9/H29;
H40=(0.071*H28*Math.pow((2.5-H28),0.667))/((Math.pow(H28,0.333))*(Math.pow(H17,0.333)));/*岩屑下沉速度*/
H33=H28-H40;/*岩屑净上升速度*/
H32=(H16-H40*60)/H16*100 ;/*携岩能力（井眼净化能力）*/
H34=H33*60;
H36=H9/H34;
H37=1-(H40/H28);/*携带比*/
H39=(H9/H34-H9/H29)*1;/*钻屑迟到时间*/
H38=parseFloat(H9/H34)+parseFloat(H39);/*岩屑上返时间*/
H44=(100*H17+parseFloat(10*Math.pow((100*H17*H17+2.52*0.001*H10*H18*(H21-H23)*(H21-H23)),0.5)))/(H10*(H21-H23))/100;
$("H16").value=H16.toFixed(2);    /*表观粘度*/
$("H17").value=H17.toFixed(2);
$("H18").value=H18.toFixed(2);
$("H20").value=H20.toFixed(2);
$("H46").value=H46.toFixed(2);
$("H28").value=H28.toFixed(2);
$("H32").value=H32.toFixed(2);
$("H33").value=H33.toFixed(2);
$("H37").value=H37.toFixed(2);
$("H38").value=H38.toFixed(2);
$("H39").value=H39.toFixed(2);
$("H44").value=parseFloat(H44).toFixed(2);
$("H40").value=H40.toFixed(3);
}
/*27荻塞尔堵漏堵漏计算*/
function dsr123(){
H7 = form1.H7.value;    /*基浆的密度*/
O7 = form1.O7.value;     /*  基浆体积*/
H8 = form1.H8.value;      /*堵漏配浆量*/
if (H7<=1.05)
{
H11=H8*120;  $("H11").value=H11.toFixed(2);     /*荻赛尔*/
H13=H8*60;  $("H13").value=H13.toFixed(2);    /*核桃壳粉*/
H15=H8*50;  $("H15").value=H15.toFixed(2); /*蚌壳粉*/
H17=parseFloat(H11)+parseFloat(H13)+parseFloat(H15);
$("H17").value=H17.toFixed(2);  /*总量*/
H19=H17/1000/H8*100;
$("H19").value=H19.toFixed(2);  /*浓度*/
O11=O7*40;
Q11=O7*60;
prt=O11+"~"+Q11;
$("prt1").value=prt;/*膨润土*/
O12=O7*3;
Q12=O7*6;
sj27=O12+"~"+Q12;
$("sj27").value=sj27;/*烧碱*/
O13=O7*3;
Q13=O7*6;
cj27=O13+"~"+Q13;
$("cj27").value=cj27;/*纯碱*/
O14=O7*0;
Q14=O7*330;
nacl27=O14+"~"+Q14;
$("nacl27").value=nacl27;/*NaCl*/
O15=O7*1;
Q15=O7*3;
gfz27=O15+"~"+Q15;
$("gfz27").value=gfz27;/*高分子聚合物*/
$("midu27").value="1.05"+"~"+"1.25";/*密度*/
$("mashi27").value="50"+"~"+"70";/*马氏漏斗粘度*/
$("API27").value="20"+"~"+"25";/*API滤失量*/
$("PH27").value="10"+"~"+"12";/*PH*/
}
else if (H7>1.05&& H7<=1.1)
{
H11=H8*120;  $("H11").value=H11.toFixed(2);
H13=H8*60;  $("H13").value=H13.toFixed(2);
H15=H8*45;  $("H15").value=H15.toFixed(2);
H17=parseFloat(H11)+parseFloat(H13)+parseFloat(H15);
$("H17").value=H17.toFixed(2);
H19=H17/1000/H8*100;
$("H19").value=H19.toFixed(2);  /*浓度*/
O11=O7*40;
Q11=O7*60;
prt=O11+"~"+Q11;
$("prt1").value=prt;/*膨润土*/
O12=O7*3;
Q12=O7*6;
sj27=O12+"~"+Q12;
$("sj27").value=sj27;/*烧碱*/
O13=O7*3;
Q13=O7*6;
cj27=O13+"~"+Q13;
$("cj27").value=cj27;/*纯碱*/
O14=O7*0;
Q14=O7*330;
nacl27=O14+"~"+Q14;
$("nacl27").value=nacl27;/*NaCl*/
O15=O7*1;
Q15=O7*3;
gfz27=O15+"~"+Q15;
$("gfz27").value=gfz27;/*高分子聚合物*/
$("midu27").value="1.05"+"~"+"1.25";/*密度*/
$("mashi27").value="50"+"~"+"70";/*马氏漏斗粘度*/
$("API27").value="20"+"~"+"25";/*API滤失量*/
$("PH27").value="10"+"~"+"12";/*PH*/
}
else if (H7>1.1&& H7<=1.2)
{
H11=H8*120;  $("H11").value=H11.toFixed(2);
H13=H8*60;  $("H13").value=H13.toFixed(2);
H15=H8*40;  $("H15").value=H15.toFixed(2);
H17=parseFloat(H11)+parseFloat(H13)+parseFloat(H15);
$("H17").value=H17.toFixed(2);
H19=H17/1000/H8*100;
$("H19").value=H19.toFixed(2);  /*浓度*/
O11=O7*40;
Q11=O7*60;
prt=O11+"~"+Q11;
$("prt1").value=prt;/*膨润土*/
O12=O7*3;
Q12=O7*6;
sj27=O12+"~"+Q12;
$("sj27").value=sj27;/*烧碱*/
O13=O7*3;
Q13=O7*6;
cj27=O13+"~"+Q13;
$("cj27").value=cj27;/*纯碱*/
O14=O7*0;
Q14=O7*330;
nacl27=O14+"~"+Q14;
$("nacl27").value=nacl27;/*NaCl*/
O15=O7*1;
Q15=O7*3;
gfz27=O15+"~"+Q15;
$("gfz27").value=gfz27;/*高分子聚合物*/
$("midu27").value="1.05"+"~"+"1.25";/*密度*/
$("mashi27").value="50"+"~"+"70";/*马氏漏斗粘度*/
$("API27").value="20"+"~"+"25";/*API滤失量*/
$("PH27").value="10"+"~"+"12";/*PH*/
}
else  if (H7>1.2&& H7<=1.3)
{H11=H8*110; $("H11").value=H11.toFixed(2);
H13=H8*55;  $("H13").value=H13.toFixed(2);
H15=H8*38;  $("H15").value=H15.toFixed(2);
H17=parseFloat(H11)+parseFloat(H13)+parseFloat(H15);
$("H17").value=H17.toFixed(2);
H19=H17/1000/H8*100;
$("H19").value=H19.toFixed(2);  /*浓度*/
O11=O7*40;
Q11=O7*60;
prt=O11+"~"+Q11;
$("prt1").value=prt;/*膨润土*/
O12=O7*3;
Q12=O7*6;
sj27=O12+"~"+Q12;
$("sj27").value=sj27;/*烧碱*/
O13=O7*3;
Q13=O7*6;
cj27=O13+"~"+Q13;
$("cj27").value=cj27;/*纯碱*/
O14=O7*0;
Q14=O7*330;
nacl27=O14+"~"+Q14;
$("nacl27").value=nacl27;/*NaCl*/
O15=O7*1;
Q15=O7*3;
gfz27=O15+"~"+Q15;
$("gfz27").value=gfz27;/*高分子聚合物*/
$("midu27").value="1.05"+"~"+"1.25";/*密度*/
$("mashi27").value="50"+"~"+"70";/*马氏漏斗粘度*/
$("API27").value="20"+"~"+"25";/*API滤失量*/
$("PH27").value="10"+"~"+"12";/*PH*/
}
else  if ( H7>1.3&& H7<=1.4)
{H11=H8*100;
$("H11").value=H11.toFixed(2);
H13=H8*50;  $("H13").value=H13.toFixed(2);
H15=H8*34;  $("H15").value=H15.toFixed(2);
H17=parseFloat(H11)+parseFloat(H13)+parseFloat(H15);
$("H17").value=H17.toFixed(2);
H19=H17/1000/H8*100;
$("H19").value=H19.toFixed(2);  /*浓度*/
O11=O7*40;
Q11=O7*60;
prt=O11+"~"+Q11;
$("prt1").value=prt;/*膨润土*/
O12=O7*3;
Q12=O7*6;
sj27=O12+"~"+Q12;
$("sj27").value=sj27;/*烧碱*/
O13=O7*3;
Q13=O7*6;
cj27=O13+"~"+Q13;
$("cj27").value=cj27;/*纯碱*/
O14=O7*0;
Q14=O7*330;
nacl27=O14+"~"+Q14;
$("nacl27").value=nacl27;/*NaCl*/
O15=O7*1;
Q15=O7*3;
gfz27=O15+"~"+Q15;
$("gfz27").value=gfz27;/*高分子聚合物*/
$("midu27").value="1.05"+"~"+"1.25";/*密度*/
$("mashi27").value="50"+"~"+"70";/*马氏漏斗粘度*/
$("API27").value="20"+"~"+"25";/*API滤失量*/
$("PH27").value="10"+"~"+"12";/*PH*/
}
else  if (H7>1.4&&H7<=1.5)
{H11=H8*95; $("H11").value=H11.toFixed(2);
H13=H8*48;  $("H13").value=H13.toFixed(2);
H15=H8*32;  $("H15").value=H15.toFixed(2);
H17=parseFloat(H11)+parseFloat(H13)+parseFloat(H15);
$("H17").value=H17.toFixed(2);
H19=H17/1000/H8*100;
$("H19").value=H19.toFixed(2);  /*浓度*/
O11=O7*40;
Q11=O7*60;
prt=O11+"~"+Q11;
$("prt1").value=prt;/*膨润土*/
O12=O7*3;
Q12=O7*6;
sj27=O12+"~"+Q12;
$("sj27").value=sj27;/*烧碱*/
O13=O7*3;
Q13=O7*6;
cj27=O13+"~"+Q13;
$("cj27").value=cj27;/*纯碱*/
O14=O7*0;
Q14=O7*330;
nacl27=O14+"~"+Q14;
$("nacl27").value=nacl27;/*NaCl*/
O15=O7*1;
Q15=O7*3;
gfz27=O15+"~"+Q15;
$("gfz27").value=gfz27;/*高分子聚合物*/
$("midu27").value="1.05"+"~"+"1.25";/*密度*/
$("mashi27").value="50"+"~"+"70";/*马氏漏斗粘度*/
$("API27").value="20"+"~"+"25";/*API滤失量*/
$("PH27").value="10"+"~"+"12";/*PH*/
}
else  if (H7>1.5&&H7<=1.6)
{H11=H8*90;
$("H11").value=H11.toFixed(2);
H13=H8*45;  $("H13").value=H13.toFixed(2);
H15=H8*30;  $("H15").value=H15.toFixed(2);
H17=parseFloat(H11)+parseFloat(H13)+parseFloat(H15);
$("H17").value=H17.toFixed(2);
H19=H17/1000/H8*100;
$("H19").value=H19.toFixed(2);  /*浓度*/
O11=O7*40;
Q11=O7*60;
prt=O11+"~"+Q11;
$("prt1").value=prt;/*膨润土*/
O12=O7*3;
Q12=O7*6;
sj27=O12+"~"+Q12;
$("sj27").value=sj27;/*烧碱*/
O13=O7*3;
Q13=O7*6;
cj27=O13+"~"+Q13;
$("cj27").value=cj27;/*纯碱*/
O14=O7*0;
Q14=O7*330;
nacl27=O14+"~"+Q14;
$("nacl27").value=nacl27;/*NaCl*/
O15=O7*1;
Q15=O7*3;
gfz27=O15+"~"+Q15;
$("gfz27").value=gfz27;/*高分子聚合物*/
$("midu27").value="1.05"+"~"+"1.25";/*密度*/
$("mashi27").value="50"+"~"+"70";/*马氏漏斗粘度*/
$("API27").value="20"+"~"+"25";/*API滤失量*/
$("PH27").value="10"+"~"+"12";/*PH*/
}
else  if (H7>1.6&&H7<=1.7)
{H11=H8*85;
$("H11").value=H11.toFixed(2);
H13=H8*42;  $("H13").value=H13.toFixed(2);
H15=H8*30;  $("H15").value=H15.toFixed(2);
H17=parseFloat(H11)+parseFloat(H13)+parseFloat(H15);
$("H17").value=H17.toFixed(2);
H19=H17/1000/H8*100;
$("H19").value=H19.toFixed(2);  /*浓度*/
O11=O7*40;
Q11=O7*60;
prt=O11+"~"+Q11;
$("prt1").value=prt;/*膨润土*/
O12=O7*3;
Q12=O7*6;
sj27=O12+"~"+Q12;
$("sj27").value=sj27;/*烧碱*/
O13=O7*3;
Q13=O7*6;
cj27=O13+"~"+Q13;
$("cj27").value=cj27;/*纯碱*/
O14=O7*0;
Q14=O7*330;
nacl27=O14+"~"+Q14;
$("nacl27").value=nacl27;/*NaCl*/
O15=O7*1;
Q15=O7*3;
gfz27=O15+"~"+Q15;
$("gfz27").value=gfz27;/*高分子聚合物*/
$("midu27").value="1.05"+"~"+"1.25";/*密度*/
$("mashi27").value="50"+"~"+"70";/*马氏漏斗粘度*/
$("API27").value="20"+"~"+"25";/*API滤失量*/
$("PH27").value="10"+"~"+"12";/*PH*/
}
else  if (H7>1.8&&H7<=1.9)
{H11=H8*80;$("H11").value=H11.toFixed(2);
H13=H8*30;  $("H13").value=H13.toFixed(2);
H15=H8*30;  $("H15").value=H15.toFixed(2);
H17=parseFloat(H11)+parseFloat(H13)+parseFloat(H15);
$("H17").value=H17.toFixed(2);
H19=H17/1000/H8*100;
$("H19").value=H19.toFixed(2);  /*浓度*/
O11=O7*40;
Q11=O7*60;
prt=O11+"~"+Q11;
$("prt1").value=prt;/*膨润土*/
O12=O7*3;
Q12=O7*6;
sj27=O12+"~"+Q12;
$("sj27").value=sj27;/*烧碱*/
O13=O7*3;
Q13=O7*6;
cj27=O13+"~"+Q13;
$("cj27").value=cj27;/*纯碱*/
O14=O7*0;
Q14=O7*330;
nacl27=O14+"~"+Q14;
$("nacl27").value=nacl27;/*NaCl*/
O15=O7*1;
Q15=O7*3;
gfz27=O15+"~"+Q15;
$("gfz27").value=gfz27;/*高分子聚合物*/
$("midu27").value="1.05"+"~"+"1.25";/*密度*/
$("mashi27").value="50"+"~"+"70";/*马氏漏斗粘度*/
$("API27").value="20"+"~"+"25";/*API滤失量*/
$("PH27").value="10"+"~"+"12";/*PH*/
}
else if (H7>1.9&&H7<=2)
{H11=H8*75; $("H11").value=H11.toFixed(2);
H13=H8*30;  $("H13").value=H13.toFixed(2);
H15=H8*30;  $("H15").value=H15.toFixed(2);
H17=parseFloat(H11)+parseFloat(H13)+parseFloat(H15);
$("H17").value=H17.toFixed(2);
H19=H17/1000/H8*100;
$("H19").value=H19.toFixed(2);  /*浓度*/
O11=O7*40;
Q11=O7*60;
prt=O11+"~"+Q11;
$("prt1").value=prt;/*膨润土*/
O12=O7*3;
Q12=O7*6;
sj27=O12+"~"+Q12;
$("sj27").value=sj27;/*烧碱*/
O13=O7*3;
Q13=O7*6;
cj27=O13+"~"+Q13;
$("cj27").value=cj27;/*纯碱*/
O14=O7*0;
Q14=O7*330;
nacl27=O14+"~"+Q14;
$("nacl27").value=nacl27;/*NaCl*/
O15=O7*1;
Q15=O7*3;
gfz27=O15+"~"+Q15;
$("gfz27").value=gfz27;/*高分子聚合物*/
$("midu27").value="1.05"+"~"+"1.25";/*密度*/
$("mashi27").value="50"+"~"+"70";/*马氏漏斗粘度*/
$("API27").value="20"+"~"+"25";/*API滤失量*/
$("PH27").value="10"+"~"+"12";/*PH*/
}
}
/*28柴油膨润土堵漏*/
function cyprt28(){
G5 = form1.G5.value;    /*配制堵漏液*/
G10=G5*0.7;
G11=G5*0.805;
$("G10").value=G10.toFixed(2);  /*柴油量m3*/
$("G11").value=G11.toFixed(2);/*膨润土量t*/
}
/*29速凝胶质水泥堵漏液配方*/
function suning29(){
G5 = form1.G5.value;    /*配制堵漏液*/
G10=G5*0.365;  /*1.2g/cm3膨润土浆*/
G8=G5-G10;/*水*/
G12=G5*1820;/*水泥*/
G14=G5*455;/*石灰*/
G16=G5*91;/*NaOH*/
G18=G5*270;/*Na2SiO3*/
$("G10").value=G10.toFixed(2);  /*1.2g/cm3膨润土浆*/
$("G8").value=G8.toFixed(2);/*水*/
$("G12").value=G12.toFixed(2);/*水泥*/
$("G14").value=G14.toFixed(2);/*石灰*/
$("G16").value=G16.toFixed(2);/*NaOH*/
$("G18").value=G18.toFixed(2);/*Na2SiO3*/
}
/*30胶质水泥堵漏液配方*/
function jiaozhi30(){
H5 = form1.H5.value;    /*配制堵漏液*/
H8=H5*1;
H10=H5*440;
H11=H5*440;
H12=H5*0.72;
$("H8").value=H8.toFixed(2); /*胶凝堵液体积*/
$("H10").value=H10.toFixed(2);/*1.2g/cm3膨润土浆*/
$("H11").value=H11.toFixed(2);/*水泥*/
$("H12").value=H12.toFixed(2);/*柴油*/
}
/*31硅藻土-重晶石堵漏液*/
function gunzaotu31(){
G6=form1.G6.value;    /*配制堵漏液*/
G7=form1.G7.value;    /*密度*/
if(G7<=1.08)
{
G10=G6*868/1000; /*水量方*/
G12=G6*143;/*硅藻土*/
G14=G6*0;/*重晶石KG*/
$("G10").value=G10.toFixed(2);  /*水量*/
$("G12").value=G12.toFixed(2);  /*硅藻土*/
$("G14").value=G14.toFixed(2);  /*重晶石*/
}
else if (G7>1.08&& G7<=1.2)
{G10=G6*843/1000; /*水量方*/
G12=G6*143;/*硅藻土*/
G14=G6*43;/*重晶石KG*/
$("G10").value=G10.toFixed(2);  /*水量*/
$("G12").value=G12.toFixed(2);  /*硅藻土*/
$("G14").value=G14.toFixed(2);  /*重晶石*/
}
else if (G7>1.2&& G7<=1.32)
{G10=G6*799/1000; /*水量方*/
G12=G6*134;/*硅藻土*/
G14=G6*86;/*重晶石KG*/
$("G10").value=G10.toFixed(2);  /*水量*/
$("G12").value=G12.toFixed(2);  /*硅藻土*/
$("G14").value=G14.toFixed(2);  /*重晶石*/
}
else if (G7>1.32&& G7<=1.44)
{G10=G6*767/1000; /*水量方*/
G12=G6*120;/*硅藻土*/
G14=G6*128;/*重晶石KG*/
$("G10").value=G10.toFixed(2);  /*水量*/
$("G12").value=G12.toFixed(2);  /*硅藻土*/
$("G14").value=G14.toFixed(2);  /*重晶石*/
}
else if (G7>1.44&& G7<=1.56)
{G10=G6*742/1000; /*水量方*/
G12=G6*109;/*硅藻土*/
G14=G6*164;/*重晶石KG*/
$("G10").value=G10.toFixed(2);  /*水量*/
$("G12").value=G12.toFixed(2);  /*硅藻土*/
$("G14").value=G14.toFixed(2);  /*重晶石*/
}
else if (G7>1.56&& G7<=1.68)
{G10=G6*698/1000; /*水量方*/
G12=G6*97;/*硅藻土*/
G14=G6*207;/*重晶石KG*/
$("G10").value=G10.toFixed(2);  /*水量*/
$("G12").value=G12.toFixed(2);  /*硅藻土*/
$("G14").value=G14.toFixed(2);  /*重晶石*/
}
else if (G7>1.68&& G7<=1.8)
{G10=G6*673/1000; /*水量方*/
G12=G6*89;/*硅藻土*/
G14=G6*250;/*重晶石KG*/
$("G10").value=G10.toFixed(2);  /*水量*/
$("G12").value=G12.toFixed(2);  /*硅藻土*/
$("G14").value=G14.toFixed(2);  /*重晶石*/
}
else if (G7>1.8&& G7<=1.92)
{G10=G6*629/1000; /*水量方*/
G12=G6*80;/*硅藻土*/
G14=G6*2;/*重晶石KG*/
$("G10").value=G10.toFixed(2);  /*水量*/
$("G12").value=G12.toFixed(2);  /*硅藻土*/
$("G14").value=G14.toFixed(2);  /*重晶石*/
}
}
/*32堵漏材料计算*/
function dulou32(){
H4 = form1.H4.value;    /*第一种堵漏材料*/
H5 = form1.H5.value;    /*第二种堵漏材料*/
H6 = form1.H6.value;    /*第三种堵漏材料*/
H7 = form1.H7.value;    /*第四种堵漏材料*/
H8 = form1.H8.value;    /*钻井液量*/
H11=H4*H8/100;
H12=H5*H8/100;
H13=H6*H8/100;
H14=H7*H8/100;
H15=H11+H12+H13+H14;
H16=H15/H8*100;
$("H11").value=H11.toFixed(2); /*第一种堵漏材料*/
$("H12").value=H12.toFixed(2);/*第二种堵漏材料*/
$("H13").value=H13.toFixed(2);/*第三种堵漏材料*/
$("H14").value=H14.toFixed(2);/*第四种堵漏材料*/
$("H15").value=H15.toFixed(2);/*堵漏材料总量*/
$("H16").value=H16.toFixed(2);/*堵漏剂浓度*/
}
/*33SR-301解卡液材料计算*/
function sr30132(){
H5 = form1.H5.value;    /*解卡液量*/
H6 = form1.H6.value;    /*密度*/
if(H6<=1.2)
{
H9=H5*0.25; /*SR301*/
H10=H5*0.6;/*柴油*/
H11=H5*0.15;/*水*/
H12=H5*0.32;/*重晶石粉*/

H133=H5*0.005;
$("H9").value=H9.toFixed(2);/*SR301*/
$("H10").value=H10.toFixed(2); /*柴油*/
$("H11").value=H11.toFixed(2);/*水*/
$("H12").value=H12.toFixed(2);/*重晶石粉*/
$("H13").value=H133.toFixed(2);/*快T*/

$("H14").value="20"+"~"+"40";/*塑性粘度*/
$("H15").value="2"+"~"+"5";/*动切力*/
$("H16").value="0"+"~"+"4";/*API滤失量*/
$("H17").value="3";/*HTHP滤失量*/
$("H18").value="800";/*电稳定性*/
}
else if (H6>1.2&&H6<=1.3)
{
H9=H5*0.242; /*SR301*/
H10=H5*0.58;/*柴油*/
H11=H5*0.145;/*水*/
H12=H5*0.45;/*重晶石粉*/

H133=H5*0.005;
$("H9").value=H9.toFixed(2);/*SR301*/
$("H10").value=H10.toFixed(2); /*柴油*/
$("H11").value=H11.toFixed(2);/*水*/
$("H12").value=H12.toFixed(2);/*重晶石粉*/
$("H13").value=H133.toFixed(2);/*快T*/
$("H14").value="20"+"~"+"40";/*塑性粘度*/
$("H15").value="3"+"~"+"8";/*动切力*/
$("H16").value="0"+"~"+"4";/*API滤失量*/
$("H17").value="3";/*HTHP滤失量*/
$("H18").value="1000";/*电稳定性*/
}
else if (H6>1.3&&H6<=1.4)
{
H9=H5*0.234; /*SR301*/
H10=H5*0.562;/*柴油*/
H11=H5*0.14;/*水*/
H12=H5*0.58;/*重晶石粉*/

H133=H5*0.005;
$("H9").value=H9.toFixed(2);/*SR301*/
$("H10").value=H10.toFixed(2); /*柴油*/
$("H11").value=H11.toFixed(2);/*水*/
$("H12").value=H12.toFixed(2);/*重晶石粉*/
$("H13").value=H133.toFixed(2);/*快T*/
$("H14").value="20"+"~"+"40";/*塑性粘度*/
$("H15").value="3"+"~"+"8";/*动切力*/
$("H16").value="0"+"~"+"3";/*API滤失量*/
$("H17").value="3";/*HTHP滤失量*/
$("H18").value="1000";/*电稳定性*/
}
else if (H6>1.4&&H6<=1.5)
{
H9=H5*0.226; /*SR301*/
H10=H5*0.542;/*柴油*/
H11=H5*0.135;/*水*/
H12=H5*0.71;/*重晶石粉*/


H133=H5*0.005;
$("H9").value=H9.toFixed(2);/*SR301*/
$("H10").value=H10.toFixed(2); /*柴油*/
$("H11").value=H11.toFixed(2);/*水*/
$("H12").value=H12.toFixed(2);/*重晶石粉*/
$("H13").value=H133.toFixed(2);/*快T*/
$("H14").value="30"+"~"+"50";/*塑性粘度*/
$("H15").value="5"+"~"+"10";/*动切力*/
$("H16").value="0"+"~"+"3";/*API滤失量*/
$("H17").value="7";/*HTHP滤失量*/
$("H18").value="1400";/*电稳定性*/
}
else if (H6>1.5&&H6<=1.6)
{
H9=H5*0.218; /*SR301*/
H10=H5*0.52;/*柴油*/
H11=H5*0.131;/*水*/
H12=H5*0.85;/*重晶石粉*/

H133=H5*0.005;
$("H9").value=H9.toFixed(2);/*SR301*/
$("H10").value=H10.toFixed(2); /*柴油*/
$("H11").value=H11.toFixed(2);/*水*/
$("H12").value=H12.toFixed(2);/*重晶石粉*/
$("H13").value=H133.toFixed(2);/*快T*/
$("H14").value="30"+"~"+"50";/*塑性粘度*/
$("H15").value="5"+"~"+"10";/*动切力*/
$("H16").value="0"+"~"+"3";/*API滤失量*/
$("H17").value="7";/*HTHP滤失量*/
$("H18").value="1400";/*电稳定性*/
}
else if (H6>1.6&&H6<=1.7)
{
H9=H5*0.209; /*SR301*/
H10=H5*0.506;/*柴油*/
H11=H5*0.126;/*水*/
H12=H5*0.97;/*重晶石粉*/

H133=H5*0.005;
$("H9").value=H9.toFixed(2);/*SR301*/
$("H10").value=H10.toFixed(2); /*柴油*/
$("H11").value=H11.toFixed(2);/*水*/
$("H12").value=H12.toFixed(2);/*重晶石粉*/
$("H13").value=H133.toFixed(2);/*快T*/
$("H14").value="40"+"~"+"60";/*塑性粘度*/
$("H15").value="5"+"~"+"13";/*动切力*/
$("H16").value="0"+"~"+"2";/*API滤失量*/
$("H17").value="5.6";/*HTHP滤失量*/
$("H18").value="2000";/*电稳定性*/
}
else if (H6>1.7&&H6<=1.8)
{
H9=H5*0.201; /*SR301*/
H10=H5*0.484;/*柴油*/
H11=H5*0.121;/*水*/
H12=H5*1.1;/*重晶石粉*/

H133=H5*0.005;
$("H9").value=H9.toFixed(2);/*SR301*/
$("H10").value=H10.toFixed(2); /*柴油*/
$("H11").value=H11.toFixed(2);/*水*/
$("H12").value=H12.toFixed(2);/*重晶石粉*/
$("H13").value=H133.toFixed(2);/*快T*/
$("H14").value="40"+"~"+"60";/*塑性粘度*/
$("H15").value="5"+"~"+"13";/*动切力*/
$("H16").value="0"+"~"+"2";/*API滤失量*/
$("H17").value="5.6";/*HTHP滤失量*/
$("H18").value="2000";/*电稳定性*/
}
else if (H6>1.8&&H6<=1.9)
{
H9=H5*0.194; /*SR301*/
H10=H5*0.465;/*柴油*/
H11=H5*0.116;/*水*/
H12=H5*1.18;/*重晶石粉*/

H133=H5*0.005;
$("H9").value=H9.toFixed(2);/*SR301*/
$("H10").value=H10.toFixed(2); /*柴油*/
$("H11").value=H11.toFixed(2);/*水*/
$("H12").value=H12.toFixed(2);/*重晶石粉*/
$("H13").value=H133.toFixed(2);/*快T*/
$("H14").value="50"+"~"+"85";/*塑性粘度*/
$("H15").value="7"+"~"+"15";/*动切力*/
$("H16").value="0"+"~"+"1.5";/*API滤失量*/
$("H17").value="2.5";/*HTHP滤失量*/
$("H18").value="2000";/*电稳定性*/
}
else
{
H9=H5*0.186; /*SR301*/
H10=H5*0.445;/*柴油*/
H11=H5*0.114;/*水*/
H12=H5*1.36;/*重晶石粉*/

H133=H5*0.005;
$("H9").value=H9.toFixed(2);/*SR301*/
$("H10").value=H10.toFixed(2); /*柴油*/
$("H11").value=H11.toFixed(2);/*水*/
$("H12").value=H12.toFixed(2);/*重晶石粉*/
$("H13").value=H133.toFixed(2);/*快T*/
$("H14").value="50"+"~"+"90";/*塑性粘度*/
$("H15").value="10"+"~"+"20";/*动切力*/
$("H16").value="0"+"~"+"1";/*API滤失量*/
$("H17").value="2.5";/*HTHP滤失量*/
$("H18").value="2000";/*电稳定性*/
}
}
/*34解卡液推进计算*/
function jieqiatj34(){
H10 = form1.H10.value;     /*钻头位置*/
H11 = form1.H11.value;      /*解卡液量*/
H12= form1.H12.value;      /*解卡液泵入时间*/
H13= form1.H13.value;     /*排量*/
H14 = form1.H14.value;      /*井径*/
H15 = form1.H15.value;      /*钻具外径*/
H16 = form1.H16.value;      /*钻具内径*/
H17=form1.H17.value;  ;/*钻具内剩余*/
H20=Math.pow((H14/100),2)*3.14/4*H10;/*井眼容积*/
H21=H20-(Math.pow((H15/100),2)*3.14/4*H10);/*环空容积*/
H28=H13/1000*60*H12;/*实际泵入解卡液量*/
H29=(3.14/4*(Math.pow((H16/100),2))*H10-H17*3.14/4*Math.pow((H16/100),2))/(H13/1000)/60;/*顶替时间*/
H30=Math.pow((H16/100),2)*3.14/4*H10;/*钻具内容积*/
H34=H13*60/1000;/*排量*/
H32=(3.14/4*(Math.pow((H16/100),2))*H10)/H34;/*到达钻头时间*/
H36=H13/1000/(3.14/4*(Math.pow((H14/100),2)-Math.pow((H15/100),2)));/*上返速度*/
H35=H10/H36/60;/*迟到时间*/
J37=H21/H10;/*环空m*/
H37=H11/J37;/*计划*/
H38=H28/J37;
H39=H10-H38;/*界面*/
$("H20").value=H20.toFixed(2);/*井眼容积*/
$("H21").value=H21.toFixed(2); /*环空容积*/
$("H28").value=H28.toFixed(2);/*实际泵入解卡液量*/
$("H29").value=H29.toFixed(2);/*顶替时间*/
$("H30").value=H30.toFixed(2);/*钻具内容积*/
$("H34").value=H34.toFixed(2); /*排量*/
$("H32").value=H32.toFixed(2);/*到达钻头时间*/
$("H36").value=H36.toFixed(2);/*上返速度*/
$("H35").value=H35.toFixed(2);/*迟到时间*/
$("H37").value=H37.toFixed(2);/*计划*/
$("H38").value=H38.toFixed(2);/*实际*/
$("H39").value=H39.toFixed(2);/*界面*/
}
/*35酸浴(土酸)解卡液配制计算*/
function suanyu35(){
G6 = form1.G6.value;    /*配制堵漏液m3*/
G7 = form1.G7.value;    /*所需酸液浓度*/
G11=(100-G7)*G6/100;
G10=G6-G11;
$("G10").value=G10.toFixed(2);  /*盐酸*/
$("G11").value=G11.toFixed(2);/*淡水*/
$("G12").value=(G10+G11)*0.02+"~"+(G10+G11)*0.05;/*氢氟酸*/
$("G13").value=(G10+G11)*0.01;/*福尔马林*/
if (G7<11)
{$("G14").value="浓度小于11%，太低";}
else if (G7>=11 && G7<=18)
{$("G14").value="浓度大于等于11%，小于等于18%，合适！";}
else if(G7>=18 )
{$("G14").value="浓度大于18%，太高了！";}
}
/*36油基解卡液配方1*/
function youjijiejia36(){
H5 = form1.H5.value;    /*解卡液量*/
H6 = form1.H6.value;    /*解卡液密度*/
H7 = form1.H7.value;    /*重晶石密度*/
F8=0.95;
if(H6<=1.2	&&H7!="")
{
H10=H5*0.6;  /*柴油*/
H11=H5*0.12;/*氧化沥青*/
H12=H5*0.016;/*有机土*/
H13=H5*0.018;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.03;/*石灰*/
H16=H5*0.05;/*水*/
H17=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*水*/
$("H17").value=H17.toFixed(2); /*重晶石*/
}
else if(H6<=1.3	&&H6>1.2)
{
H10=H5*0.58;  /*柴油*/
H11=H5*0.12;/*氧化沥青*/
H12=H5*0.016;/*有机土*/
H13=H5*0.018;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.03;/*石灰*/
H16=H5*0.05;/*水*/
H17=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*水*/
$("H17").value=H17.toFixed(2); /*重晶石*/
}
else if(H6<=1.6	&&H6>1.3)
{
H10=H5*0.52;  /*柴油*/
H11=H5*0.12;/*氧化沥青*/
H12=H5*0.016;/*有机土*/
H13=H5*0.018;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.03;/*石灰*/
H16=H5*0.05;/*水*/
H17=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*水*/
$("H17").value=H17.toFixed(2); /*重晶石*/
}
else if(H6<=1.8	&&H6>1.6)
{
H10=H5*0.484;  /*柴油*/
H11=H5*0.12;/*氧化沥青*/
H12=H5*0.016;/*有机土*/
H13=H5*0.018;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.03;/*石灰*/
H16=H5*0.05;/*水*/
H17=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*水*/
$("H17").value=H17.toFixed(2); /*重晶石*/
}
else if(H6<=1.9	&&H6>1.8)
{
H10=H5*0.465;  /*柴油*/
H11=H5*0.12;/*氧化沥青*/
H12=H5*0.016;/*有机土*/
H13=H5*0.018;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.03;/*石灰*/
H16=H5*0.05;/*水*/
H17=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*水*/
$("H17").value=H17.toFixed(2); /*重晶石*/
}
else
{
H10=H5*0.445;  /*柴油*/
H11=H5*0.12;/*氧化沥青*/
H12=H5*0.016;/*有机土*/
H13=H5*0.018;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.03;/*石灰*/
H16=H5*0.05;/*水*/
H17=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*水*/
$("H17").value=H17.toFixed(2); /*重晶石*/
}
}
/*37油基解卡液配方2*/
function youjijiejia37(){
H5 = form1.H5.value;    /*解卡液量*/
H6 = form1.H6.value;    /*解卡液密度*/
H7 = form1.H7.value;    /*重晶石密度*/
F8=0.95;
if(H6<=1.2	&&H7!="")
{
H10=H5*0.6;  /*柴油*/
H11=H5*0.2;/*氧化沥青*/
H12=H5*0.03;/*有机土*/
H13=H5*0.02;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.04;/*石灰*/
H16=H5*0.02;/*烷基苯*/
H17=H5*0.005;/*SPAN－80*/
H18=H5*0.05;/*水*/
H19=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*烷基苯*/
$("H17").value=H17.toFixed(2); /*SPAN－80*/
$("H18").value=H18.toFixed(2);/*水*/
$("H19").value=H19.toFixed(2); /*重晶石*/
}
else if(H6<=1.3	&&H6>1.2)
{
H10=H5*0.58;  /*柴油*/
H11=H5*0.2;/*氧化沥青*/
H12=H5*0.03;/*有机土*/
H13=H5*0.02;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.04;/*石灰*/
H16=H5*0.02;/*烷基苯*/
H17=H5*0.005;/*SPAN－80*/
H18=H5*0.05;/*水*/
H19=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*烷基苯*/
$("H17").value=H17.toFixed(2); /*SPAN－80*/
$("H18").value=H18.toFixed(2);/*水*/
$("H19").value=H19.toFixed(2); /*重晶石*/
}
else if(H6<=1.6	&&H6>1.3)
{
H10=H5*0.52;  /*柴油*/
H11=H5*0.2;/*氧化沥青*/
H12=H5*0.03;/*有机土*/
H13=H5*0.02;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.04;/*石灰*/
H16=H5*0.02;/*烷基苯*/
H17=H5*0.005;/*SPAN－80*/
H18=H5*0.05;/*水*/
H19=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*烷基苯*/
$("H17").value=H17.toFixed(2); /*SPAN－80*/
$("H18").value=H18.toFixed(2);/*水*/
$("H19").value=H19.toFixed(2); /*重晶石*/
}
else if(H6<=1.8	&&H6>1.6)
{
H10=H5*0.484;  /*柴油*/
H11=H5*0.2;/*氧化沥青*/
H12=H5*0.03;/*有机土*/
H13=H5*0.02;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.04;/*石灰*/
H16=H5*0.02;/*烷基苯*/
H17=H5*0.005;/*SPAN－80*/
H18=H5*0.05;/*水*/
H19=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*烷基苯*/
$("H17").value=H17.toFixed(2); /*SPAN－80*/
$("H18").value=H18.toFixed(2);/*水*/
$("H19").value=H19.toFixed(2); /*重晶石*/
}
else if(H6<=1.9	&&H6>1.8)
{
H10=H5*0.465;  /*柴油*/
H11=H5*0.2;/*氧化沥青*/
H12=H5*0.03;/*有机土*/
H13=H5*0.02;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.04;/*石灰*/
H16=H5*0.02;/*烷基苯*/
H17=H5*0.005;/*SPAN－80*/
H18=H5*0.05;/*水*/
H19=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*烷基苯*/
$("H17").value=H17.toFixed(2); /*SPAN－80*/
$("H18").value=H18.toFixed(2);/*水*/
$("H19").value=H19.toFixed(2); /*重晶石*/
}
else
{
H10=H5*0.445;  /*柴油*/
H11=H5*0.2;/*氧化沥青*/
H12=H5*0.03;/*有机土*/
H13=H5*0.02;/*油酸*/
H14=H5*0.016;/*快T*/
H15=H5*0.04;/*石灰*/
H16=H5*0.02;/*烷基苯*/
H17=H5*0.005;/*SPAN－80*/
H18=H5*0.05;/*水*/
H19=(H5*H7*(H6-F8))/(H7-F8);/*重晶石*/
$("H10").value=H10.toFixed(2);/*柴油*/
$("H11").value=H11.toFixed(2); /*氧化沥青*/
$("H12").value=H12.toFixed(2);/*有机土*/
$("H13").value=H13.toFixed(2);/*油酸*/
$("H14").value=H14.toFixed(2);/*快T*/
$("H15").value=H15.toFixed(2); /*石灰*/
$("H16").value=H16.toFixed(2);/*烷基苯*/
$("H17").value=H17.toFixed(2); /*SPAN－80*/
$("H18").value=H18.toFixed(2);/*水*/
$("H19").value=H19.toFixed(2); /*重晶石*/
}
}
/*38解卡液配制量计算*/
function  jieqiaye38(){
H5 = form1.H5.value;   /*井径*/
H6 = form1.H6.value;    /*钻头位置*/
H7 = form1.H7.value;     /*钻杆外径*/
H8 = form1.H8.value;     /*钻杆内径*/
H9 = form1.H9.value;     /*管内解卡液预留*/
H10= form1.H10.value;     /*解卡液附加量*/
H11= form1.H11.value;     /*卡点高度*/
H14=H6-H11+100;/*管外浸泡高度*/
H15=H6-H14;/*界面*/
G5=H5/1000;/**/
G7=H7/1000;/**/
G8=H8/1000;/**/
H16=(3.14/4*Math.pow(G5,2))-(3.14/4*Math.pow(G7,2));/*环空容积*/
H17=H16*H14;/*环空容积*/
H19=H6-H9;/*界面*/
H20=3.14/4*Math.pow(G8,2);/*管内容积*/
H18=H20*H9;/*管内预留量*/
H21=H9*H20;/*管内容积*/
h10=H10;
H22=parseFloat(H17)+parseFloat(H21)+parseFloat(h10);/*解卡液用量*/
$("H14").value=H14.toFixed(2);/*管外浸泡高度*/
$("H15").value=H15.toFixed(2); /*界面*/
$("H16").value=H16.toFixed(3);/*环空容积*/
$("H17").value=H17.toFixed(3); /*环空容积*/
$("H18").value=H18.toFixed(2);/*管内预留量*/
$("H19").value=H19.toFixed(2); /*界面*/
$("H20").value=H20.toFixed(4);/*管内容积*/
$("H21").value=H21.toFixed(2); /*管内容积*/
$("H22").value=H22.toFixed(2); /*解卡液用量*/
}
/*39碱度计算（CO32-、HCO3－、OH－）*/
function cajiandu(){
G4 = form1.G4.value;    /*HCl浓度*/
G5 = form1.G5.value;    /*酚酞消耗HCl量*/
G6 = form1.G6.value;     /*甲基橙消耗HCl量*/
G7 = form1.G7.value;      /*取样量*/
if (G6==G5)
{
G11=0;
G12=0;
G10=G4*2*G5*1000/G7*30.01;
$("G10").value=G10.toFixed(2);/*CO32－*/
$("G11").value=G11.toFixed(2);
$("G12").value=G12.toFixed(2);
}
else if (G6>G5)
{
G10=G4*2*G6/G7*1000*30.01;
G11=G4*(G6-G5)/G7*1000*61.02;
G12=0;
$("G10").value=G10.toFixed(2);/*CO32－*/
$("G11").value=G11.toFixed(2);
$("G12").value=G12.toFixed(2);
}
else
{
G10=G4*G5/G7*1000*30.01;
G11=0;
G12=G5*(G5-G6)/G7*1000*17.01;
$("G10").value=G10.toFixed(2);/*CO32－*/
$("G11").value=G11.toFixed(2);
$("G12").value=G12.toFixed(2);
}
}
/*40硫酸钙含量的测定*/
function lsG40(){
F6 = form1.F6.value;    /*滴定10ml稀释后的钻井液的澄清滤液所消耗的EDTA的体积*/
F8 = form1.F8.value;     /*滴定1ml未稀释的原钻井液滤液所消耗的EDTA体积*/
F10 = form1.F10.value;     /*钻井液中水的体积分数*/
F15=F6*6.8;
F16=F6*2.853;
F17=(6.8*F6-1.37*F8)*F10;
F18=(2.853*F6-0.48*F8)*F10;
$("F15").value=F15.toFixed(2); /*硫酸钙总含量*/
$("F16").value=F16.toFixed(2);/*硫酸钙总含量*/
$("F17").value=F17.toFixed(2); /*未溶解的硫酸钙含量*/
$("F18").value=F18.toFixed(2);/*未溶解的硫酸钙含量*/
}
/*41水泥和石灰污染*/
function  snsh41(){
H6 = form1.H6.value;    /*Ca2+*/
H7 = form1.H7.value;     /*OH－*/
H8 = form1.H8.value;     /*水相体积*/
H9 = form1.H9.value;     /*钻井液量*/
H10= form1.H10.value;     /*处理力度*/
H5=parseFloat(H6)+parseFloat(H7);
if(H10!=0)
{
H13=((2*106)/(40*2))*Math.pow(10,-3)*H5*H9*H8/100*H10/100;
H15=H9*(H8/100)*H5*0.0021*H10/100;
H17=H9*(H8/100);
$("H13").value=H13.toFixed(2);/*Na2CO3*/
$("H15").value=H15.toFixed(2); /*NaHCO3*/
$("H17").value=H17.toFixed(2);/*水相总体积*/
}
else
{
$("H13").value=0;/*Na2CO3*/
$("H15").value=0; /*NaHCO3*/
$("H17").value=0;/*水相总体积*/
}
}
/*42钙镁污染*/
function  CAMG42(){
H6 = form1.H6.value;    /*Ca2+*/
H7 = form1.H7.value;     /*OH－*/
H8 = form1.H8.value;     /*水相体积*/
H9 = form1.H9.value;     /*钻井液量*/
H10= form1.H10.value;     /*处理力度*/
if(H10!=0)
{
H13=((2*106)/(40*2)*Math.pow(10,-3)*H6*H9*(H8/100)*H10/100);
H15=((2*40)/(1*24.3))*Math.pow(10,-3)*H7*H9*H8/100*H10/100;
H17=H13;
H18=H15;
$("H13").value=H13.toFixed(2);/*Na2CO3*/
$("H15").value=H15.toFixed(2); /*NaHCO3*/
$("H17").value=H17.toFixed(2);/*水相总体积*/
$("H18").value=H18.toFixed(2);/*水相总体积*/
}
else
{
$("H13").value=0;/*Na2CO3*/
$("H15").value=0; /*NaHCO3*/
$("H17").value=0;/*处理Ca2+需要Na2CO3*/
$("H18").value=0;/*处理Mg2+需要NaOH*/
}
}
/*43钙污染*/
function  CAMG43(){
H6 = form1.H6.value;    /*Ca2＋浓度*/
H7 = form1.H7.value;     /*保留Ca2+*/
H8 = form1.H8.value;     /*钻井液含水量*/
H9 = form1.H9.value;     /*钻井液总量*/
if(H7!=0)
{
H12=(H6-H7)*0.00266;
H14=(H6-H7)*0.00211;
H16=(H6-H7)*0.00277;
H19=H9*H8/100;
H13=H12*H19;
H15=H14*H19;
H17=H16*H19;
$("H12").value=H12.toFixed(2);/*Na2CO3*/
$("H13").value=H13.toFixed(2); /*NaHCO3*/
$("H14").value=H14.toFixed(2);/*水相总体积*/
$("H15").value=H15.toFixed(2);/*水相总体积*/
$("H16").value=H16.toFixed(2); /*NaHCO3*/
$("H17").value=H17.toFixed(2);/*水相总体积*/
$("H19").value=H19.toFixed(2);/*水相总体积*/
}
else
{
$("H13").value=0;/*Na2CO3*/
$("H15").value=0; /*NaHCO3*/
$("H17").value=0;/*处理Ca2+需要Na2CO3*/
$("H18").value=0;/*处理Mg2+需要NaOH*/
}
}
/*44硫化氢污染*/
function  H2S44(){
H6 = form1.H6.value;    /*HS-*/
H7 = form1.H7.value;     /*PH值*/
H8 = form1.H8.value;     /*钻井液量*/
H9 = form1.H9.value;     /*水相体积*/
H10 = form1.H10.value;     /*处理力度*/
if(H10!=0)
{ H13=H8*H9/100;
H14=H6*H13*0.00572*2.85*H10/100;
H15=H6*0.002*H13;
if (H7<10)
{H16="小";}
else {H16="正常";}
$("H13").value=H13.toFixed(2); /*总水相体积*/
$("H14").value=H14.toFixed(2);/*Zn2(OH)2CO3*/
$("H15").value=H15.toFixed(2);/*Zn2(OH)2CO3*/
$("H16").value=H16;/*PH值*/
}
else   {
$("H13").value=""; /*总水相体积*/
$("H14").value="";/*Zn2(OH)2CO3*/
$("H15").value="";/*Zn2(OH)2CO3*/
$("H16").value="";/*PH值*/
}
}
/*45石膏和硬石膏污染*/
function  SHIGAO45(){
H7 = form1.H7.value;     /*Ca2+*/
H8 = form1.H8.value;     /*钻井液量*/
H9 = form1.H9.value;     /*水相体积*/
H10 = form1.H10.value;     /*处理力度*/
if(H10!=0)
{
H13=H8*H9/100;
H14=((2*106)/(40*2))*0.001*H7*H13*(H10/100);
H15=H7*0.00419*H13*H10/100;
H16=H7-H10/100*H7;
$("H13").value=H13.toFixed(2); /*总水相体积*/
$("H14").value=H14.toFixed(2);/*Na2CO3*/
$("H15").value=H15.toFixed(2);/*NaHCO3*/
$("H16").value=H16.toFixed(2);/*保留Ca2＋*/
}
else
{
$("H13").value=""; /*总水相体积*/
$("H14").value="";/*Zn2(OH)2CO3*/
$("H15").value="";/*Zn2(OH)2CO3*/
$("H16").value="";/*PH值*/
}
}
/*46Mg2＋污染*/
function  mg46(){
H6 = form1.H6.value;    /*Mg2＋浓度*/
H7 = form1.H7.value;     /*保留Mg2+*/
H8 = form1.H8.value;     /*钻井液含水量*/
H9 = form1.H9.value;     /*钻井液总量*/
if(H7!=0 && H8!=0)
{
H12=(H6-H7)*0.00266;
H17=H9*H8/100;
H13=H12*H17;
H14=(H6-H7)*0.00331;
H15=H14*H17;
H16=H8*1;
$("H12").value=H12.toFixed(2); /*Na2CO3*/
$("H13").value=H13.toFixed(2); /*Na2CO3*/
$("H14").value=H14.toFixed(2);/*NaOH*/
$("H15").value=H15.toFixed(2);/*NaOH*/
$("H16").value=H16.toFixed(2);/*钻井液总含水（液相）量*/
$("H17").value=H17.toFixed(2);/*钻井液总含水（液相）量*/
}
else{
$("H12").value=""; /*Na2CO3*/
$("H13").value=""; /*Na2CO3*/
$("H14").value="";/*NaOH*/
$("H15").value="";/*NaOH*/
$("H16").value="";/*钻井液总含水（液相）量*/
$("H17").value="";/*钻井液总含水（液相）量*/
}
}
/*47磷酸根(PO43-)污染*/
function  po47(){
H4 = form1.H4.value;     /*PO43-*/
H5 = form1.H5.value;    /*PO43-保留浓度*/
H6 = form1.H6.value;    /*钻井液量*/
H7 = form1.H7.value;     /*含水量+*/
if(H4!=""&&H5!=""&&H7!="")
{H10=(H4-H5)*0.00117;
H15=H7*H6/100;
H11=H10*H15;
H12=H11/1000;
H14=H5/H4*100;
H13=100-H14;
if(H7>0)
{H16="慎重使用，PH升得高";}
else
{H16=""}
$("H10").value=H10.toFixed(3);/*处理PO43-所需Ca(OH)2*/
$("H11").value=H11.toFixed(3);/*Ca(OH)2*/
$("H12").value=H12.toFixed(3); /*Ca(OH)2*/
$("H13").value=H13.toFixed(3); /*钻井液中处理掉PO43-*/
$("H14").value=H14.toFixed(3);/*钻井液中保留PO43-*/
$("H15").value=H15.toFixed(3);/*钻井液总含水量*/
$("H16").value=H16;/*提示*/}
else
{
$("H10").value="";/*钻井液总含水（液相）量*/
$("H11").value="";/*钻井液总含水（液相）量*/
$("H12").value=""; /*Na2CO3*/
$("H13").value=""; /*Na2CO3*/
$("H14").value="";/*NaOH*/
$("H15").value="";/*NaOH*/
$("H16").value="";/*钻井液总含水（液相）量*/
}
}
/*48二氧化碳(CO2)污染*/
function  cO248()
{
I6 = form1.I6.value;    /*CO32-*/
I7 = form1.I7.value;     /*HCO3-*/
I8 = form1.I8.value;     /*水相体积*/
I9 = form1.I9.value;   /*钻井液量*/
I10 = form1.I10.value;   /*处理力度*/
I13=I9*I8/100;
I14=(parseFloat(I6)+parseFloat(I7))*I13*0.00123*I10/100;
I15=(parseFloat(I6)+parseFloat(I7))*I13*0.00285*I10/100;
I16=(parseFloat(I6)+parseFloat(I7))*I13*0.000555*I10/100;
I17=(parseFloat(I6)+parseFloat(I7))*I13*0.00054*I10/100;
I18=I6*I13*0.00043*I10/100*2.85;
I19=I6*I13*0.001*I10/100*2.85;
I20=I6-I10/100*I6;
I21=I7*I13*0.00021*2.85*I10/100;
I22=I7*I13*0.00023*2.85*I10/100;
I23=I7-I10/100*I7;
if (I10<45)
{I24="处理力度小";}
else if(I10>65)
{I24="处理力度大";}
else
{I24="处理力度合适";}
$("I13").value=I13.toFixed(2); /*钻井液中处理掉PO43-*/
$("I14").value=I14.toFixed(2);/*钻井液中保留PO43-*/
$("I15").value=I15.toFixed(2);/*钻井液总含水量*/
$("I16").value=I16.toFixed(2);/*提示*/
$("I17").value=I17.toFixed(2);/*处理PO43-所需Ca(OH)2*/
$("I18").value=I18.toFixed(2);/*Ca(OH)2*/
$("I19").value=I19.toFixed(2); /*Ca(OH)2*/
$("I20").value=I20.toFixed(2); /*Ca(OH)2*/
$("I21").value=I21.toFixed(2); /*Ca(OH)2*/
$("I22").value=I22.toFixed(2); /*Ca(OH)2*/
$("I23").value=I23.toFixed(2); /*Ca(OH)2*/
$("I24").value=I24; /*Ca(OH)2*/
}
/*49封井液的计算*/
function FJY49()
{
H6 = form1.H6.value;    /*井深*/
H7 = form1.H7.value;     /*封井液量*/
H8 = form1.H8.value;     /*封井液泵入时间*/
H9 = form1.H9.value;     /*排量*/
H10 = form1.H10.value;     /*井径*/
H11 = form1.H11.value;     /*钻具外径*/
H12 = form1.H12.value;     /*钻具内径*/
H13 = form1.H13.value;     /*钻具内剩余*/
H15=Math.pow((H10/100),2)*3.14/4*H6;
H16=H15-(Math.pow((H11/100),2)*3.14/4*H6);
H24=H9/1000*60*H8;
H25=(3.14/4*(Math.pow((H12/100),2))*H6-H13*3.14/4*Math.pow((H12/100),2))/(H9/1000)/60;
H26=Math.pow((H12/100),2)*3.14/4*H6;
H31=H9*60/1000;
H27=(3.14/4*(Math.pow((H12/100),2))*H6)/H31;
H28=H6/H27;
H30=H9/1000/(3.14/4*(Math.pow((H10/100),2)-Math.pow((H11/100),2)));
H29=H6/H30/60;
H32=H7/(3.14/4*Math.pow((H10/100),2));
H33=H24/(3.14/4*Math.pow((H10/100),2));
H34=H6-H33;
$("H15").value=H15.toFixed(2);/*井眼总容积*/
$("H16").value=H16.toFixed(2);/*环空容积*/
$("H24").value=H24.toFixed(2);/*实际泵入封井液量*/
$("H25").value=H25.toFixed(2);/*顶替时间*/
$("H26").value=H26.toFixed(2);/*钻具内容积*/
$("H27").value=H27.toFixed(2);/*到达钻头时间*/
$("H28").value=H28.toFixed(2);/*下行速度*/
$("H29").value=H29.toFixed(2);/*迟到时间*/
$("H30").value=H30.toFixed(2);/*上返速度*/
$("H31").value=H31.toFixed(2);/*排量*/
$("H32").value=H32.toFixed(2);/*封井段长度计划*/
$("H33").value=H33.toFixed(2);/*封井段长度实际*/
$("H34").value=H34.toFixed(2);/*封井段长度界面*/
}
/*50循环周的计算*/
function    xhz50()
{

H5 = form1.H5.value;    /*井径*/
H6 = form1.H6.value;    /*钻柱外径*/
H4 = form1.H4.value;     /*钻柱壁厚*/
H8 = form1.H8.value;     /*排量*/
H9 = form1.H9.value;     /*井深*/
H7=H6-2*H4;/*钻具内径*/


H12=(3.14/4*Math.pow(H5,2)*H9)/1000000;/*井眼总容积*/
H13=(3.14/4*Math.pow(H5,2)*1000)/1000000;
H14=3.14/4*((Math.pow((H6),2)-Math.pow((H7/1000),2))*H9)/1000000;
H15=3.14/4*(Math.pow((H6),2)-Math.pow((H7/1000),2))*1000/1000000;
H16=3.14/4*Math.pow((H7/10),2)*H9/10000;/*钻具内容积*/
H17=3.14/4*Math.pow((H7/10),2)*1000/10000;
H19=H12-(3.14/4*Math.pow(H6,2)*H9)/1000000;
H18=H19/H9;
H20=H5/25.4;
H22=H6/25.4;
H24=H8/1000/(3.14/4*(Math.pow((H20*0.0254),2)-Math.pow((H22*0.0254),2)));
H25=H24*60;
H29=3.14/4*Math.pow((H7/1000),2)*H9*1000/H8/60;
H32=H9/H29;
H26=H32/60;
H28=H9/H25;
H30=parseFloat(H28)+parseFloat(H29);
$("H12").value=H12.toFixed(2);/*井眼总容积*/
$("H13").value=H13.toFixed(2);/*环空容积*/
$("H14").value=H14.toFixed(2);/*实际泵入封井液量*/
$("H15").value=H15.toFixed(2);/*顶替时间*/
$("H16").value=H16.toFixed(2);/*钻具内容积*/
$("H17").value=H17.toFixed(2);/*到达钻头时间*/
$("H18").value=H18.toFixed(3);/*下行速度*/
$("H24").value=H24.toFixed(2);/*迟到时间*/
$("H26").value=H26.toFixed(2);/*上返速度*/
$("H28").value=H28.toFixed(2);/*下行速度*/
$("H29").value=H29.toFixed(2);/*迟到时间*/
$("H30").value=H30.toFixed(2);/*上返速度*/
}
/*51钻井液上返速度与剪切速率计算*/
function    fsjq51()
{
H5 = form1.H5.value;    /*井径*/
H6 = form1.H6.value;    /*钻柱外径*/
H7 = form1.H7.value;     /*钻柱内径*/
H8 = form1.H8.value;     /*钻井液密度*/
H9 = form1.H9.value;     /*排量*/
H10 = form1.H10.value;    /*井深*/
H11 = form1.H11.value;    /*Φ600*/
H12 = form1.H12.value;     /*Φ300*/
H13= form1.H13.value;     /*Φ200*/
H14 = form1.H14.value;     /*Φ100*/
H15 = form1.H15.value;     /*Φ6*/
H16= form1.H16.value;     /*Φ3*/
H49=H5/25.4;
H51=H6/25.4;
H19=12.7*H9/(Math.pow((H49*2.54),2)-Math.pow((H51*2.54),2));
H20=60*H19;
H21=H10/H20;
H37=H11-H12;
H38=(H12-H37)*0.4788;
H22=(100*H37+10*Math.pow((100*Math.pow(H37,2)+2.52*0.001*H8*H38*Math.pow((H5/10-H6/10),2)),0.5))/(H8*(H5/10-H6/10));
H23=H22/100;
H50=H6/10;
H52=H9*60;
H53=H52/1000;
H47=Math.pow((H7/2),2)*3.14*H10/1000/1000/H53;
H46=H10/H47;
H45=H46/60;
H48=H5/10;
H24=1200*H19/(H48-H50);
H25=1200*H45/(H7/10);
H59=3.32*Math.log(H11/H12)/Math.log(10);
H28=0.4788*H12/Math.pow(511,H59);
H29=H11*5.11;
H30=H12*5.11;
H31=H11*0.5;
H32=H12*1;
K11=600*1;
K12=300*1;
K13=200*1;
K14=100;
K15=6;
K16=3;
H33=K12/K13*H13;
H34=K12/K14*H14;
H35=K12/K15*H15;
H36=K12/K16*H16;
H37=H11-H12;
H38=(H12-H37)*0.4788;
$("H59").value=H59.toFixed(2);/*井眼总容积*/
$("H28").value=H28.toFixed(2);/*井眼总容积*/
$("H29").value=H29.toFixed(2);/*井眼总容积*/
$("H30").value=H30.toFixed(2);/*井眼总容积*/
$("H31").value=H31.toFixed(2);/*井眼总容积*/
$("H32").value=H32.toFixed(2);/*井眼总容积*/
$("H33").value=H33.toFixed(2);/*井眼总容积*/
$("H34").value=H34.toFixed(2);/*井眼总容积*/
$("H35").value=H35.toFixed(2);/*井眼总容积*/
$("H36").value=H36.toFixed(2);/*井眼总容积*/
$("H37").value=H37.toFixed(2);/*井眼总容积*/
$("H38").value=H38.toFixed(2);/*井眼总容积*/
$("H19").value=H19.toFixed(2);/*井眼总容积*/
$("H20").value=H20.toFixed(2);/*井眼总容积*/
$("H21").value=H21.toFixed(2);/*井眼总容积*/
$("H22").value=H22.toFixed(2);/*井眼总容积*/
$("H23").value=H23.toFixed(2);/*井眼总容积*/
$("H24").value=H24.toFixed(2);/*井眼总容积*/
$("H25").value=H25.toFixed(2);/*井眼总容积*/
$("H26").value=H26.toFixed(2);/*井眼总容积*/
}
/*52FCLS钻井液体系*/
function fcls52(){
H4=form1.H4.value;
if (H4>0){
H7=H4*5;
J7=H4*15;
H8=H4*1.75;
J8=H4*5.2;
H9=2*H4;
J9=H4*4;
H10=H4*0.7;
J10=H4*1.4;
H11=H4*2;
J11=H4*4;
H12=H4*0.7;
J12=H4*1.4;
H13=H4*10;
J13=H4*15;
H14=H4*2.85;
J14=H4*4.28;
H15=H4*5;
J15=H4*20;
H16=H4*1.75;
J16=H4*7;
H17=H4*5;
J17=H4*20;
H18=H4*1.75;
J18=H4*7;
H19=H4*10;
J19=H4*30;
H20=H4*2.85;
J20=H4*8.55;
H21=H4*1;
J21=H4*3.5;
H22=H4*0.35;
J22=H4*1.29;
$("H7").value=H7.toFixed(2)+"~"+J7.toFixed(2);
$("H8").value=H8.toFixed(2)+"~"+J8.toFixed(2);
$("H9").value=H9.toFixed(2)+"~"+J9.toFixed(2);
$("H10").value=H10.toFixed(2)+"~"+J10.toFixed(2);
$("H11").value=H11.toFixed(2)+"~"+J11.toFixed(2);
$("H12").value=H12.toFixed(2)+"~"+J12.toFixed(2);
$("H13").value=H13.toFixed(2)+"~"+J13.toFixed(2);
$("H14").value=H14.toFixed(2)+"~"+J14.toFixed(2);
$("H15").value=H15.toFixed(2)+"~"+J15.toFixed(2);
$("H16").value=H16.toFixed(2)+"~"+J16.toFixed(2);
$("H17").value=H17.toFixed(2)+"~"+J17.toFixed(2);
$("H18").value=H18.toFixed(2)+"~"+J18.toFixed(2);
$("H19").value=H19.toFixed(2)+"~"+J19.toFixed(2);
$("H20").value=H20.toFixed(2)+"~"+J20.toFixed(2);
$("H21").value=H21.toFixed(2)+"~"+J21.toFixed(2);
$("H22").value=H22.toFixed(2)+"~"+J22.toFixed(2);
}
else{alert("亲，你在逗我嘛!");
$("H7").value="";
$("H8").value="";
$("H9").value="";
$("H10").value="";
$("H11").value="";
$("H12").value="";
$("H13").value="";
$("H14").value="";
$("H15").value="";
$("H16").value="";
$("H17").value="";
$("H18").value="";
$("H19").value="";
$("H20").value="";
$("H21").value="";
$("H22").value="";
}
}
/*53常用膨润土浆配方*/
function prt53(){
H4=form1.H4.value;
if (H4>0){
H7=25*H4;
J7=H4*50;
H8=H4*8.8;
J8=H4*17.5;
H9=0.7*H4;
J9=H4*1.5;
H10=H4*0.25;
J10=H4*0.5;
H11=H4*1;
J11=H4*3;
H12=H4*0.35;
J12=H4*1.05;
H13=H4*2;
J13=H4*3;
H14=H4*0.7;
J14=H4*1.05;
$("H7").value=H7.toFixed(2)+"~"+J7.toFixed(2);
$("H8").value=H8.toFixed(2)+"~"+J8.toFixed(2);
$("H9").value=H9.toFixed(2)+"~"+J9.toFixed(2);
$("H10").value=H10.toFixed(2)+"~"+J10.toFixed(2);
$("H11").value=H11.toFixed(2)+"~"+J11.toFixed(2);
$("H12").value=H12.toFixed(2)+"~"+J12.toFixed(2);
$("H13").value=H13.toFixed(2)+"~"+J13.toFixed(2);
$("H14").value=H14.toFixed(2)+"~"+J14.toFixed(2);
}
else{alert("亲，你在逗我嘛!");
$("H7").value="";
$("H8").value="";
$("H9").value="";
$("H10").value="";
$("H11").value="";
$("H12").value="";
$("H13").value="";
$("H14").value="";
}
}
/*54钙基钻井液体系*/
function CA54(){
H4=form1.H4.value;
if (H4>0){
H7=H4*10;
J7=H4*20;
H8=H4*2.85;
J8=H4*5.7;
H9=11*H4;
J9=H4*18;
H10=H4*3.86;
J10=H4*6.32;
H11=H4*3;
J11=H4*12;
H12=H4*1.05;
J12=H4*4.2;
H13=H4*6;
J13=H4*14;
H14=H4*2.1;
J14=H4*4.9;
H15=H4*6;
J15=H4*14;
H16=H4*2.1;
J16=H4*4.9;
H17=H4*6;
J17=H4*14;
H18=H4*2.1;
J18=H4*4.9;
H19=H4*3;
J19=H4*8;
H20=H4*1.05;
J20=H4*2.81;
H21=H4*3;
J21=H4*8;
H22=H4*1.05;
J22=H4*2.81;
H23=H4*6;
J23=H4*14;
H24=H4*2.1;
J24=H4*4.9;
H25=H4*5;
J25=H4*15;
H26=H4*1.75;
J26=H4*5.26;
H27=H4*5;
J27=H4*15;
H28=H4*1.75;
J28=H4*5.26;
H29=H4*10;
J29=H4*30;
H30=H4*2.85;
J30=H4*10.5;
H31=H4*3;
J31=H4*8;
H32=H4*1.05;
J32=H4*2.81;
$("H7").value=H7.toFixed(2)+"~"+J7.toFixed(2);
$("H8").value=H8.toFixed(2)+"~"+J8.toFixed(2);
$("H9").value=H9.toFixed(2)+"~"+J9.toFixed(2);
$("H10").value=H10.toFixed(2)+"~"+J10.toFixed(2);
$("H11").value=H11.toFixed(2)+"~"+J11.toFixed(2);
$("H12").value=H12.toFixed(2)+"~"+J12.toFixed(2);
$("H13").value=H13.toFixed(2)+"~"+J13.toFixed(2);
$("H14").value=H14.toFixed(2)+"~"+J14.toFixed(2);
$("H15").value=H15.toFixed(2)+"~"+J15.toFixed(2);
$("H16").value=H16.toFixed(2)+"~"+J16.toFixed(2);
$("H17").value=H17.toFixed(2)+"~"+J17.toFixed(2);
$("H18").value=H18.toFixed(2)+"~"+J18.toFixed(2);
$("H19").value=H19.toFixed(2)+"~"+J19.toFixed(2);
$("H20").value=H20.toFixed(2)+"~"+J20.toFixed(2);
$("H21").value=H21.toFixed(2)+"~"+J21.toFixed(2);
$("H22").value=H22.toFixed(2)+"~"+J22.toFixed(2);
$("H23").value=H23.toFixed(2)+"~"+J23.toFixed(2);
$("H24").value=H24.toFixed(2)+"~"+J24.toFixed(2);
$("H25").value=H25.toFixed(2)+"~"+J25.toFixed(2);
$("H26").value=H26.toFixed(2)+"~"+J26.toFixed(2);
$("H27").value=H27.toFixed(2)+"~"+J27.toFixed(2);
$("H28").value=H28.toFixed(2)+"~"+J28.toFixed(2);
$("H29").value=H29.toFixed(2)+"~"+J29.toFixed(2);
$("H30").value=H30.toFixed(2)+"~"+J30.toFixed(2);
$("H31").value=H31.toFixed(2)+"~"+J31.toFixed(2);
$("H32").value=H32.toFixed(2)+"~"+J32.toFixed(2);
}
else{alert("亲，你在逗我嘛!");
$("H7").value="";
$("H8").value="";
$("H9").value="";
$("H10").value="";
$("H11").value="";
$("H12").value="";
$("H13").value="";
$("H14").value="";
$("H15").value="";
$("H16").value="";
$("H17").value="";
$("H18").value="";
$("H19").value="";
$("H20").value="";
$("H21").value="";
$("H22").value="";
$("H23").value="";
$("H24").value="";
$("H25").value="";
$("H26").value="";
$("H27").value="";
$("H28").value="";
$("H29").value="";
$("H30").value="";
$("H31").value="";
$("H32").value="";
}
}
/*55钻井液固液相分析*/
function gx55()
{
H4 = form1.H4.value;    /*固相含量*/
H5 = form1.H5.value;    /*固相体积*/
H6 = form1.H6.value;    /*含油量*/
H7 = form1.H7.value;     /*膨润土含量*/
H8 = form1.H8.value;     /*氯离子[Cl-]*/
H9 = form1.H9.value;     /*加重材料相对密度*/
H10 = form1.H10.value;    /*低密度固相密度（2.4~2.7）*/
H11 = form1.H11.value;    /*油密度（一般取0.85）*/
H12 = form1.H12.value;     /*实测钻井液密度*/
H15=100-H5*1;
H16=H6*1;
H17=H15-H16;
H18=1+0.00000109*H8;
H19=H18/0.1198;
H20=(parseFloat(H4)+parseFloat(H17*10)+parseFloat(H16*H11*10))/1000;
H21=H20/0.1198;
H22=H20/0.01602;
if(H12="")
{H23="";
$("H23").value=H23.toFixed(3); /*钻井液中处理掉PO43-*/
}
else{H23=H12*1;
$("H23").value=H23.toFixed(3); /*钻井液中处理掉PO43-*/
}
if(H12=0)
{H24="";
$("H24").value=""; /*钻井液中处理掉PO43-*/
}
else{H24=H23-H20;
$("H24").value=H24.toFixed(3); /*钻井液中处理掉PO43-*/
}
H32=H5-H17*(H8/(1680000-1.21*H8));
H33=H7*1;
H34=H33/14.3;
H35=(23+35.45)/35.45*H8/10000;
H36=H8*1.65;
H37=H8/16666.7;
$("H32").value=H32.toFixed(2); /*钻井液中处理掉PO43-*/
$("H33").value=H33.toFixed(2);/*钻井液中保留PO43-*/
$("H34").value=H34.toFixed(2);/*钻井液中保留PO43-*/
$("H35").value=H35.toFixed(2); /*钻井液中处理掉PO43-*/
$("H36").value=H36.toFixed(2);/*钻井液中保留PO43-*/
$("H37").value=H37.toFixed(2);/*钻井液中保留PO43-*/
if (H8>1000)
{
H29=(100*H20-(H17*H18+H16*H11))/H5;
H27=1/(H9-H10)*(100*H18+H32*(H9-H18)-100*H20-H16*(H18-H11));
H26=H32-H27;
H25=10*(H26*H9);
$("H25").value=H25.toFixed(2); /*钻井液中处理掉PO43-*/
$("H26").value=H26.toFixed(2);/*钻井液中保留PO43-*/
$("H27").value=H27.toFixed(2);/*钻井液中保留PO43-*/
$("H29").value=H29.toFixed(2);/*钻井液中保留PO43-*/
}
else {
H29=(100*H20-(H17*1+H16*H11))/H5;
H27=H5*(H9-H29)/(H9-H10);
H25=10*(H27*H10);
H26=H5*(H29-H10)/(H9-H10);
$("H25").value=H25.toFixed(2); /*钻井液中处理掉PO43-*/
$("H26").value=H26.toFixed(2);/*钻井液中保留PO43-*/
$("H27").value=H27.toFixed(2);/*钻井液中保留PO43-*/
$("H29").value=H29.toFixed(2);/*钻井液中保留PO43-*/
}
if(H8>1)
{H30=H4-H35;
H28=H30-H25;
$("H30").value=H30.toFixed(2);/*钻井液中保留PO43-*/
$("H28").value=H28.toFixed(2); /*钻井液中处理掉PO43-*/
}
else{H30=H4;
H28=H30-H25;
$("H28").value=H28.toFixed(2); /*钻井液中处理掉PO43-*/
$("H30").value=H30.toFixed(2);/*钻井液中保留PO43-*/
}
if(H8=0)
{H31=H5;
$("H31").value=H31.toFixed(2);/*钻井液中保留PO43-*/}
else{H31=H5-H37;
$("H31").value=H31.toFixed(2);/*钻井液中保留PO43-*/}
$("H15").value=H15.toFixed(2);/*钻井液总含水量*/
$("H16").value=H16.toFixed(3);/*处理PO43-所需Ca(OH)2*/
$("H17").value=H17.toFixed(2);/*处理PO43-所需Ca(OH)2*/
$("H18").value=H18.toFixed(2);/*Ca(OH)2*/
$("H19").value=H19.toFixed(2); /*Ca(OH)2*/
$("H20").value=H20.toFixed(3);/*处理PO43-所需Ca(OH)2*/
$("H21").value=H21.toFixed(3);/*Ca(OH)2*/
$("H22").value=H22.toFixed(3); /*Ca(OH)2*/
$("H24").value=H24.toFixed(3);/*钻井液中保留PO43-*/
$("H32").value=H32.toFixed(2); /*钻井液中处理掉PO43-*/
$("H25").value=H25.toFixed(2); /*钻井液中处理掉PO43-*/
if(N32=""
)
{N32="";
$("N32").value=N32.toFixed(2); /*钻井液中处理掉PO43-*/
}
else {N32=(H30-H25-H33)/H33;
$("N32").value=N32.toFixed(2); /*钻井液中处理掉PO43-*/
if (N32<=4)
{Q32="正常";
$("Q32").value=Q32; /*钻井液中处理掉PO43-*/
}
else{Q32="偏高";
$("Q32").value=Q32; /*钻井液中处理掉PO43-*/
}
}
}
/*56水力功率分配计算*/
function sljs56(){
H4 = form1.H4.value;    /*井径*/
H5 = form1.H5.value;    /*钻杆长度*/
H6 = form1.H6.value;    /*钻杆内径*/
H7 = form1.H7.value;     /*钻杆外径*/
H8 = form1.H8.value;     /*钻铤长度*/
H9 = form1.H9.value;     /*钻铤内径*/
H10 = form1.H10.value;    /*钻铤外径*/
H11 = form1.H11.value;    /*钻井泵排量*/
H12 = form1.H12.value;     /*1＃*/
H13= form1.H13.value;    /*2＃*/
H14= form1.H14.value;    /*3＃*/
H15= form1.H15.value;     /*4＃*/
H16= form1.H16.value;     /*5＃*/
H17= form1.H17.value;     /*6＃*/
H18= form1.H18.value;    /*Φ600*/
H19 = form1.H19.value;    /*Φ300*/
H20= form1.H20.value;     /*Φ3*/
H21= form1.H21.value;    /*钻井液密度*/
H22= form1.H22.value;     /*螺杆消耗泵压*/
P4=(H18-H19)*1;
M5=parseFloat(H4)+parseFloat(H7);
P5=H18/2;
P6=(H19-P4)/2;
P7=3.32*Math.log(H18/H19)/Math.log(10);
P8=0.4788*H19/Math.pow(511,P7);
P9=0.5*Math.log(H19/H20)/Math.log(10);
P10=0.478*H19/Math.pow(511,P9);
P11=Math.pow((2.414*(Math.pow(H18,0.5)-Math.pow(H19,0.5))),2)
P12=Math.pow((1.671*(Math.pow((2*H19),0.5)-Math.pow(H18,0.5))),2);
P13=Math.pow((1+Math.pow((1000*P12/P11),0.5)),2);
P14=1273*H11/(Math.pow(H4,2)-Math.pow(H7,2));
P15=P14*60;
P16=472*P14/((H4-H7)/10);
O17=3.767*Math.pow(10,-4)*Math.pow(H21,0.8)*Math.pow(P4,0.2);
O18=7628*Math.pow(H21,0.8)*Math.pow(P4,0.2)*(1/Math.pow(H6,4.8));
O19=7628*Math.pow(H21,0.8)*Math.pow(P4,0.2)*(1/Math.pow(H9,4.8));
O20=(7628*Math.pow(H21,0.8)*Math.pow(P4,0.2))/((Math.pow((H4-H7),3))*(Math.pow(M5,1.8)));
P20=O20*H5*Math.pow(H11,1.8);
O21=(7628*Math.pow(H21,0.8)*Math.pow(P4,0.2))/(Math.pow((parseFloat(H4)-parseFloat(H10)),3)*Math.pow((parseFloat(H4)+parseFloat(H10)),1.8));
P17=O17*Math.pow(H11,1.8);
P18=O18*H5*Math.pow(H11,1.8);
P19=O19*H8*Math.pow(H11,1.8);
P21=O21*H8*Math.pow(H11,1.8);
P22=P17+P18+P19+P20+P21;
W7=1/4*3.14*Math.pow(H12,2);
W8=1/4*3.14*Math.pow(H13,2);
W9=1/4*3.14*Math.pow(H14,2);
W10=1/4*3.14*Math.pow(H15,2);
W11=1/4*3.14*Math.pow(H16,2);
W12=1/4*3.14*Math.pow(H17,2);
W16=1/4*3.14*Math.pow(H4,2);
W6=W7+W8+W9+W10+W11+W12;
V4=554.4*H21/Math.pow(W6,2);
W4=V4*Math.pow(H11,2);
W5=W4*H11;
W17=parseFloat(W4)+parseFloat(P22)+parseFloat(H22);
W13=1000*H11/W6;
W14=H21*W13*H11;
W15=1000*W5/W16;
W18=W17*H11;
W19=H11*1;
W20=W19*60/1000;
$("P4").value=P4.toFixed(2);/*钻井液塑性粘度*/
$("P5").value=P5.toFixed(2);/*钻井液表观粘度*/
$("P6").value=P6.toFixed(2);/*钻井液动切力*/
$("P7").value=P7.toFixed(2);/*钻具内钻井液流性指数（np值）*/
$("P8").value=P8.toFixed(2);/*钻具内钻井液稠度系数（Kp值）*/
$("P9").value=P9.toFixed(2);/*环空钻井液流性指数（na值）*/
$("P10").value=P10.toFixed(2);/*环空钻井液稠度系数（Ka值）*/
$("P11").value=P11.toFixed(2);/*钻头水眼粘度(η∞)*/
$("P12").value=P12.toFixed(2);/*钻头水眼动切力(τc)*/
$("P13").value=P13.toFixed(2);/*剪切稀释指数(Im)*/
$("P14").value=P14.toFixed(2);/*钻井液环空上返速度*/
$("P15").value=P15.toFixed(2);/*钻井液环空上返速度*/
$("P16").value=P16.toFixed(2);/*环空剪切速率*/
$("P17").value=P17.toFixed(2);/*地面管汇压力损耗*/
$("P18").value=P18.toFixed(2);/*钻杆内压力循环损耗*/
$("P19").value=P19.toFixed(2);/*钻铤内压力循环损耗*/
$("P20").value=P20.toFixed(2);/*钻杆外循环压力损耗*/
$("P21").value=P21.toFixed(2);/*钻铤外循环压力损耗*/
$("P22").value=P22.toFixed(2);/*循环系统压力损耗*/
$("W4").value=W4.toFixed(2);/*钻铤外循环压力损耗*/
$("W5").value=W5.toFixed(2);/*循环系统压力损耗*/
$("W6").value=W6.toFixed(2);/*钻铤外循环压力损耗*/
$("W7").value=W7.toFixed(2);/*循环系统压力损耗*/
$("W8").value=W8.toFixed(2);/*钻铤外循环压力损耗*/
$("W9").value=W9.toFixed(2);/*循环系统压力损耗*/
$("W10").value=W10.toFixed(2);/*钻铤外循环压力损耗*/
$("W11").value=W11.toFixed(2);/*循环系统压力损耗*/
$("W12").value=W12.toFixed(2);/*循环系统压力损耗*/
$("W13").value=W13.toFixed(2);/*钻铤外循环压力损耗*/
$("W14").value=W14.toFixed(2);/*循环系统压力损耗*/
$("W15").value=W15.toFixed(2);/*钻铤外循环压力损耗*/
$("W16").value=W16.toFixed(2);/*循环系统压力损耗*/
$("W17").value=W17.toFixed(2);/*循环系统压力损耗*/
$("W18").value=W18.toFixed(2);/*钻铤外循环压力损耗*/
$("W19").value=W19.toFixed(2);/*循环系统压力损耗*/
$("W20").value=W20.toFixed(2);/*钻铤外循环压力损耗*/
}
/*57钻井液流变参数计算*/
function lbcs57()
{
F9 = form1.F9.value;    /*Φ600*/
G9 = form1.G9.value;    /*Φ300*/
H9= form1.H9.value;    /*Φ200*/
I9= form1.I9.value;    /*Φ200*/
J9= form1.J9.value;    /*Φ200*/
K9= form1.K9.value;    /*Φ200*/
if (F9=="")
{L9="";
$("L9").value="";/*1000S-1*/
}
else if (F9*0.5>0)
{L9=F9*0.5;
$("L9").value=L9;/*1000S-1*/
}
else {L9="错误"
$("L9").value=L9;/*1000S-1*/
}
if (G9==0)
{M9="";
$("M9").value="";/*500S-1*/
}
else {M9=G9;
$("M9").value=M9;/*500S-1*/
}
if(H9==0)
{N9="";
$("N9").value="";/*340S-1*/
}
else{N9=H9*1.5;
$("N9").value=N9;/*340S-1*/
}
if(I9==0)
{O9="";
$("O9").value="";/*170S-1*/
}
else{O9=I9*3;
$("O9").value=O9;/*170S-1*/
}
if(J9==0)
{P9="";
$("P9").value="";/*10S-1*/
}
else{P9=J9*50;
$("P9").value=P9;/*10S-1*/
}
if(K9==0)
{Q9="";
$("Q9").value="";/*5S-1*/
}
else{Q9=K9*100;
$("Q9").value=Q9;/*5S-1*/
}
if(F9>0&&G9>0&&F9-G9>0)
{R9=F9-G9;
$("R9").value=R9;/*5S-1*/
S9=(2*G9-F9)*0.4788;
$("S9").value=S9.toFixed(2);/*5S-1*/
T9=S9/R9;
$("T9").value=T9.toFixed(2);/*5S-1*/
U9=Math.log(F9/G9)/Math.log(10)/0.301;
V9=G9/(Math.pow(500,U9))*0.4788;
W9=Math.log(G9/K9)*0.5/Math.log(10);
X9=G9/Math.pow(500,W9)*0.4788;
Y9=Math.pow((2.414*(Math.pow(F9,0.5)-Math.pow(G9,0.5))),2)
Z9=Math.pow((1.671*(Math.pow((2*G9),0.5)-Math.pow(F9,0.5))),2);
AA9=Math.pow((1+Math.pow((1000*Z9/Y9),0.5)),2);
if (AA9<100)
{AB9="钝化";
$("AB9").value=AB9;/*5S-1*/
}
else if(AA9>=100&&AA9<300)
{AB9="接受处理差";
$("AB9").value=AB9;/*5S-1*/
}
else if (AA9>=300&&AA9<800)
{AB9="正常";
$("AB9").value=AB9;/*5S-1*/
}
else{AB9="接受处理";
$("AB9").value=AB9;/*5S-1*/
}
$("U9").value=U9.toFixed(2);/*5S-1*/
$("V9").value=V9.toFixed(2);/*5S-1*/
$("W9").value=W9.toFixed(2);/*5S-1*/
$("X9").value=X9.toFixed(2);/*5S-1*/
$("Y9").value=Y9.toFixed(2);/*5S-1*/
$("Z9").value=Z9.toFixed(2);/*5S-1*/
$("AA9").value=AA9.toFixed(2);/*5S-1*/
}
else{R9="错误";
$("R9").value=R9;/*5S-1*/
S9="错误";
$("S9").value=S9;/*5S-1*/
T9="错误";
$("T9").value=T9;/*5S-1*/
$("U9").value="请检查数据";/*5S-1*/
$("V9").value="请检查数据";/*5S-1*/
$("W9").value="请检查数据";/*5S-1*/
$("X9").value="请检查数据";/*5S-1*/
$("Y9").value="请检查数据";/*5S-1*/
$("Z9").value="请检查数据";/*5S-1*/
}
}
/*58马氏漏斗粘度误差校正及判断*/
function  msld58()
{
H5 = form1.H5.value;    /*清水校正值*/
H6 = form1.H6.value;    /*钻井液测定值*/
H7 = form1.H7.value;     /*井深*/
H10=H5-26;
H15=(26*946)/(H5*946);
H12=H6*H15;
H11=H12-H6;
if(H7>7001)
{J13="";
H13="";
$("H12").value=H12.toFixed(2);/*钻铤外循环压力损耗*/
$("H13").value="";/*钻铤外循环压力损耗*/
}
else if (H7<3000)
{J13=3000/100+34;
H13=3000/100+25;
if (H13-H12>0)
{J12="偏低";}
else if (H12-J13>0)
{J12="偏高";}
else{J12="正常";}
$("H12").value=H12.toFixed(2)+"~"+J12;/*钻铤外循环压力损耗*/
$("H13").value=H13.toFixed(2)+"~"+J13;/*钻铤外循环压力损耗*/}
else
{J13=H7/100+50;
H13=H7/100+35;
if (H13=="")
{J12="";}
else if (H7=="")
{J12="";}
else if (H13-H12>0)
{J12="偏低";}
else if (H12-J13>0)
{J12="偏高";}
else{J12="正常";}
$("H12").value=H12.toFixed(2)+"~"+J12;/*钻铤外循环压力损耗*/
$("H13").value=H13.toFixed(2)+"~"+J13;/*钻铤外循环压力损耗*/
}
$("H10").value=H10;/*钻铤外循环压力损耗*/
$("H11").value=H11.toFixed(2);/*钻铤外循环压力损耗*/
}
/*59岩屑携带（层流）*/
function yxd59()
{
H5 = form1.H5.value;    /*钻屑直径*/
H6 = form1.H6.value;    /*钻屑厚度*/
H7 = form1.H7.value;     /*钻井液密度*/
H8 = form1.H8.value;     /*Φ300*/
H9 = form1.H9.value;     /*Φ3*/
H10 = form1.H10.value;    /*井径*/
H11 = form1.H11.value;    /*钻具外径*/
H12 = form1.H12.value;     /*钻具内径*/
H13= form1.H13.value;    /*排量*/
H16=H5/25.4;
H17=H6/25.4;
H18=H13*3.785;
H19=H10/25.4;
H20=H11/25.4;
H21=H12/25.4;
H22=H7/0.1198;
H25=0.5*Math.log(H8/H9)/Math.log(10);
H26=5.11*H8/Math.pow(511,H25);
H27=H26*0.4788/5;
H29=1270*H13/(Math.pow(H10,2)-Math.pow(H11,2));
H30=H29*60;
H28=H30*0.3048*10;
H31=0.408*H18/H21;
O17=12.7*H13/(Math.pow(H10,2)-Math.pow(H11,2))*100
O20=H31/3.048;
O21=186/H16/Math.pow(H22,0.5);
H34=7.9*Math.pow((H17*(20.8-H22)),0.5);
O23=H34*0.4788;
O24=Math.pow((H34/H26),(1/H25));
H36=Math.pow((H34/H26),(1/H25));
H37=1/60*1.22*H34*Math.pow(((H36*H16)/Math.pow(H22,0.5)),0.5)*60;
O26=H37/12/25.4;
O27=H28-H37;
O28=(1-(H37/H28))*100;
$("H16").value=H16.toFixed(2);/*5S-1*/
$("H17").value=H17.toFixed(2);/*5S-1*/
$("H18").value=H18.toFixed(2);/*5S-1*/
$("H19").value=H19.toFixed(2);/*5S-1*/
$("H20").value=H20.toFixed(2);/*5S-1*/
$("H21").value=H21.toFixed(2);/*5S-1*/
$("H22").value=H22.toFixed(2);/*5S-1*/
$("H25").value=H25.toFixed(2);/*5S-1*/
$("H28").value=H28.toFixed(2);/*5S-1*/
$("O17").value=O17.toFixed(2);/*5S-1*/
$("O20").value=O20.toFixed(2);/*5S-1*/
$("O21").value=O21.toFixed(2);/*5S-1*/
$("O23").value=O23.toFixed(2);/*5S-1*/
$("O24").value=O24.toFixed(2);/*5S-1*/
$("O26").value=O26.toFixed(4);/*5S-1*/
$("O27").value=O27.toFixed(2);/*5S-1*/
$("O28").value=O28.toFixed(2);/*5S-1*/
}
/*60钻井液流态(Z值)计算*/
function zzhi60(){
G4 = form1.G4.value;    /*钻屑直径*/
G5 = form1.G5.value;    /*钻屑直径*/
G6 = form1.G6.value;    /*钻屑厚度*/
G7 = form1.G7.value;     /*钻井液密度*/
G8 = form1.G8.value;     /*Φ300*/
G9 = form1.G9.value;     /*Φ3*/
G10 = form1.G10.value;    /*井径*/
G11 = form1.G11.value;    /*钻具外径*/
L5=G4/25.4;
L7=G5/25.4;
L8=G8/0.1198;
L10=G9/2;
L11=G10*1;
L12=G9-G10;
G15=G4/25.4;
G16=G5/10;
G17=G5/25.4;
G23=G9-G10;
G24=(G10-G23)/2;
G25=G24/G23;
G26=Math.log(G9/G10)/0.301/Math.log(10);
G27=G10/Math.pow(500,G26)*0.4788;
G28=12.7*G6/(Math.pow((G15*2.54),2)-Math.pow((G17*2.54),2));
G29=G28*60;
G31=Math.pow((G4-G5),G26)*Math.pow(G28,(2-G26))/G27*G11;
L13=(G10-G23)/2;
L14=G24/G23;
L15=Math.log(G9/G10)/0.301/Math.log(10);
L16=G10/Math.pow(500,G26)*0.4788;
L17=12.7*G6/(Math.pow((G15*2.54),2)-Math.pow((G17*2.54),2));
L18=G28*60;
L19=G7/G29;
L20=Math.pow((G4-G5),G26)*Math.pow(G28,(2-G26))/G27*G11;
if(G31<807)
{L21="层流";
$("L21").value=L21;/*5S-1*/
}
else if (G31>809)
{L21="紊流";
$("L21").value=L21;/*5S-1*/
}
else {L21="过度紊流";
$("L21").value=L21;/*5S-1*/
}
$("L5").value=L5.toFixed(2);
$("L7").value=L7.toFixed(2);
$("L8").value=L8.toFixed(2);
$("L10").value=L10.toFixed(2);
$("L11").value=L11.toFixed(2);
$("L12").value=L12.toFixed(2);
$("L13").value=L13.toFixed(2);
$("L14").value=L14.toFixed(2);
$("L15").value=L15.toFixed(2);
$("L16").value=L16.toFixed(2);
$("L17").value=L17.toFixed(2);
$("L20").value=L20.toFixed(2);
}
/*61钻井液雷诺系数（Re）计算*/
function leinuo61(){
G7 = form1.G7.value;     /*井径*/
G8 = form1.G8.value;     /*钻柱外径*/
G9 = form1.G9.value;     /*排量*/
G10 = form1.G10.value;    /*井深*/
G11 = form1.G11.value;    /*钻井液密度*/
G12 = form1.G12.value;    /*井深*/
G13 = form1.G13.value;    /*钻井液密度*/
M7=G7/25.4;
M9=G8/25.4;
M11=Math.log(G12/G13)/Math.log(10)/0.301;
G20=Math.log(G12/G13)/0.301/Math.log(10);
M12=G13/Math.pow(500,G20)*0.4788;
G16=G7/25.4;
G17=G7/10;
G18=G8/25.4;
G19=G8/10;
G21=G13/Math.pow(500,G20)*0.4788;
G22=12.7*G9/(Math.pow((G16*2.54),2)-Math.pow((G18*2.54),2));
G23=G22*60;
G24=G22*G10/60;
G25=(8000*G11*Math.pow((G7*2.54),G20)*Math.pow(G22,(2-G20)))/(Math.pow(800,G20)*G21);
M13=12.7*G9/(Math.pow((G16*2.54),2)-Math.pow((G18*2.54),2));
M14=G22*60;
M15=G22*G10/60;
M16=(8000*G11*Math.pow((G7*2.54),G20)*Math.pow(G22,(2-G20)))/(Math.pow(800,G20)*G21);
if(G25<2100)
{M17="层流";
$("M17").value=M17;
}
else if (G25>3000)
{M17="紊流";
$("M17").value=M17;
}
else {M17="紊流";
$("M17").value=M17;
}
$("M7").value=M7.toFixed(2);
$("M9").value=M9.toFixed(2);
$("M11").value=M11.toFixed(2);
$("M13").value=M13.toFixed(2);
$("M16").value=M16.toFixed(2);
}
/*62水眼压降计算*/
function H2O62(){
H1 = form1.H1.value;    /*水眼*/
H2 = form1.H2.value;     /*水眼*/
H3 = form1.H3.value;     /*水眼*/
H4 = form1.H4.value;    /*水眼*/
H5 = form1.H5.value;     /*水眼*/
H6 = form1.H6.value;     /*水眼*/
H7 = form1.H7.value;    /*水眼*/
H8 = form1.H8.value;     /*水眼*/
H9 = form1.H9.value;     /*水眼*/
H91 = form1.H91.value;     /*水眼*/
H10 = form1.H10.value;  /*密度*/
H11 = form1.H11.value;  /*排量*/
Q1 = form1.Q1.value;  /*井深*/
Q2 = form1.Q2.value;  /*管汇压耗*/
Q3 = form1.Q3.value;  /*螺杆压耗*/
A1=form1.A1.value;  /*钻头直径*/

Q4=Q1*3/1000;
H12=861*H10*H11*H11/Math.pow((Math.pow(H1,2)+Math.pow(H2,2)+Math.pow(H3,2)+Math.pow(H4,2)+Math.pow(H5,2)+Math.pow(H6,2)+Math.pow(H7,2)+Math.pow(H8,2)+Math.pow(H9,2)+Math.pow(H91,2)),2); /*原系数917*/
Q5=parseFloat(Q4)+parseFloat(Q2)+parseFloat(Q3)+parseFloat(H12);
Q6=Q5+parseFloat(3);
Q7=4.588*H12;/*水力加压器加压负荷*/
Q8=100*H12*H11/(A1*A1*0.785);
Q9=(parseFloat(H1*H1)+parseFloat(H2*H2)+parseFloat(H3*H3)+parseFloat(H4*H4)+parseFloat(H5*H5)+parseFloat(H6*H6)+parseFloat(H7*H7)+parseFloat(H8*H8)+parseFloat(H9*H9)+parseFloat(H91*H91))*(Math.PI/4);
Q10=100*10.2*H10*H11*H11/Q9/1000;
$("H12").value=H12.toFixed(2); /*钻头水眼压耗*/
$("Q5").value=Q5.toFixed(2); /*预计碰压*/
$("Q6").value=Q6.toFixed(2); /*预计碰压*/
$("Q7").value=Q7.toFixed(2); /*水力加压器加压负荷*/
$("Q8").value=Q8.toFixed(2); /*比水功率*/
$("Q9").value=Q9.toFixed(2); /*TFA计算*/
$("Q10").value=Q10.toFixed(2); /*射流冲击力*/
}
/*63套管总重计算*/
function TGZLJS(){
H1 = form1.H1.value;    /*套管总长*/
H2 = form1.H2.value;     /*套管外径*/
H3 = form1.H3.value;     /*套管壁厚*/
H4 = form1.H4.value;    /*钻井液密 */
H41 = form1.H41.value;    /*车辆载重 */

var rd= document.getElementsByName('B15');
if  (rd[0].checked)
{ 

FL = 1-H4/7.8;
H5 = 0.00002466*H1*(H2-H3)*H3*1.025;    /*套管总重*/
H6 = 0.00002466*H1*(H2-H3)*H3*FL*1.025;    /*套管浮重*/
H7=H5*1000/H1;
H8=H5/H41;
$("H5").value=H5.toFixed(3); /*套管总重量保留两位有效数字*/
$("H6").value=H6.toFixed(2); /*浮重套管总重量保留两位有效数字*/
$("H7").value=H7.toFixed(2); /*钻具线重*/
$("H8").value=H8.toFixed(2); /*台辆*/
}


if  (rd[1].checked)
{ 

FL = 1-H4/7.8;
H5 = 0.00002466*H1*(H2-H3)*H3*1.025*1.25;    /*套管总重*/
H6 = 0.00002466*H1*(H2-H3)*H3*FL*1.025*1.25;    /*套管浮重*/
H7=H5*1000/H1;
H8=H5/H41;
$("H5").value=H5.toFixed(3); /*套管总重量保留两位有效数字*/
$("H6").value=H6.toFixed(2); /*浮重套管总重量保留两位有效数字*/
$("H7").value=H7.toFixed(2); /*钻具线重*/
$("H8").value=H8.toFixed(2); /*台辆*/
}

if  (rd[2].checked)
{ 

FL = 1-H4/7.8;
H5 = 0.00002466*H1*(H2-H3)*H3*1.025*1.2;    /*套管总重*/
H6 = 0.00002466*H1*(H2-H3)*H3*FL*1.025*1.2;    /*套管浮重*/
H7=H5*1000/H1;
H8=H5/H41;
$("H5").value=H5.toFixed(3); /*套管总重量保留两位有效数字*/
$("H6").value=H6.toFixed(2); /*浮重套管总重量保留两位有效数字*/
$("H7").value=H7.toFixed(2); /*钻具线重*/
$("H8").value=H8.toFixed(2); /*台辆*/
}
if  (rd[3].checked)
{ 

FL = 1-H4/7.8;
H5 = 0.00002466*H1*(H2-H3)*H3*1.025*1.15;    /*套管总重*/
H6 = 0.00002466*H1*(H2-H3)*H3*FL*1.025*1.15;    /*套管浮重*/
H7=H5*1000/H1;
H8=H5/H41;
$("H5").value=H5.toFixed(3); /*套管总重量保留两位有效数字*/
$("H6").value=H6.toFixed(2); /*浮重套管总重量保留两位有效数字*/
$("H7").value=H7.toFixed(2); /*钻具线重*/
$("H8").value=H8.toFixed(2); /*台辆*/
}

}
/*64已知井口，靶点坐标计算方位位移<*/
function qfwwy64(){
H1 = form1.H1.value;    /*井口北坐标*/
H2 = form1.H2.value;     /*井口东坐标*/
H3 = form1.H3.value;     /*I靶点北坐标*/
H4 = form1.H4.value;    /*I靶点东坐标*/
H9 = form1.H9.value;     /*II靶点北坐标*/
H10 = form1.H10.value;    /*II靶点东坐标*/
H5= Math.pow((Math.pow((H1-H3),2)+Math.pow((H2-H4),2)),0.5);    /*I位移*/
B9=Math.abs((H4-H2)/(H3-H1));/*方位过度*/
if (H3<H1 &H4>H2) { H6=(Math.PI-Math.atan(B9))*180/Math.PI;}
if (H3<H1 &H4<H2) {H6= (Math.PI+Math.atan(B9))*180/Math.PI;}
if (H3>H1 &H4>H2) {H6= (Math.atan(B9))*180/Math.PI;}
if (H3>H1 &H4<H2) {H6= (2*Math.PI-Math.atan(B9))*180/Math.PI;}
H7= Math.pow((Math.pow((H1-H9),2)+Math.pow((H2-H10),2)),0.5);    /*II位移*/
B10=Math.abs((H10-H2)/(H9-H1));/*方位过度*/
if (H9<H1 &H10>H2) { H8=(Math.PI-Math.atan(B10))*180/Math.PI;}
if (H9<H1 &H10<H2) {H8= (Math.PI+Math.atan(B10))*180/Math.PI;}
if (H9>H1 &H10>H2) {H8= (Math.atan(B10))*180/Math.PI;}
if (H9>H1 &H10<H2)  {H8= (2*Math.PI-Math.atan(B10))*180/Math.PI;}
$("H5").value=H5.toFixed(2); /*I闭合位多*/
$("H6").value=H6.toFixed(2); /*I闭合方位*/
$("H7").value=H7.toFixed(2); /*II闭合位多*/
$("H8").value=H8.toFixed(2); /*II闭合方位*/
}
/*H6=H2-(3.14/180)*((H4*(Math.sin(360-H3)));
/*$("H6").value=H6.toFixed(2); /*闭合方位*/
/*65已知井口，靶点坐标计算方位位移<*/
function qf65(){
H1 = form1.H1.value;    /*井口北坐标*/
H2 = form1.H2.value;     /*井口东坐标*/
H3 = form1.H3.value;     /*方位*/
H4 = form1.H4.value;    /*位移*/
t=Math.PI/180;
H5=parseFloat(H1)+parseFloat(H4*(Math.cos((360-H3)*t)));    /*方位*/
H6=H2-H4*(Math.sin((360-H3)*t));    /*方位*/
$("H5").value=H5.toFixed(2); /*闭合位多*/
$("H6").value=H6.toFixed(2); /*闭合方位*/
}
/*66悬挂器相关计算<*/
function XGQ66(){
A2 = form1.A2.value;    /*钻井液密度*/
B2 = form1.B2.value;     /*尾管长度*/
C2 = form1.C2.value;     /*钻杆长度*/
A4=1-A2/7.8;
B4=A4*B2*13.69/1000;
C4=A4*C2*15.48/1000;
D4=parseFloat(B4)+parseFloat(C4);
E4=100*205900*18.44/9800;
F4=0.9*B4*C2/E4;
G4=0.9*3*C2/E4;
H4=G4;
A7=F4+G4+H4+0.5+0.2;
$("A4").value=A4.toFixed(3); /*浮力系数*/
$("B4").value=B4.toFixed(2); /*尾管浮重*/
$("C4").value=C4.toFixed(2); /*钻杆浮重*/
$("D4").value=D4.toFixed(2); /*总重*/
$("E4").value=E4.toFixed(2); /*常规系数*/
$("F4").value=F4.toFixed(2); /*尾管回缩*/
$("G4").value=G4.toFixed(2); /*憋压回缩*/
$("H4").value=G4.toFixed(2); /*下压回缩*/
$("A7").value=A7.toFixed(2); /*方余*/
}
/*67临界钻压的计算*/
function lj67(){
A4 = form1.A4.value;    /*钻铤外径*/
C4 = form1.C4.value;     /*钻铤内径*/
E4 = form1.E4.value;     /*实钻钻井液密度*/
B11= form1.B11.value;     /*使用最大钻压*/
D11= form1.D11.value;     /*安全系数*/
E11= form1.E11.value;     /*井斜角*/
C11= B11*9.80665;
I4= A4/10;
J4= C4/10;
K4= A4/1000;
L4= C4/1000;
G4=3.14159*(Math.pow(I4,4)-Math.pow(J4,4))/64;                           /*惯性矩J（cm4）*/
G6=3.14159*(Math.pow(K4,2)-Math.pow(L4,2))*7.8/4*1000*(1-E4/7.8)/100;   /*钻铤在泥浆中的单位重量（Kg/cm）*/
K6=3.14159*(Math.pow(K4,2)-Math.pow(L4,2))*7.8*1000/4;
I7=Math.pow((2.1*1000000*G4/G6),(1/3));
K11=1-E4/7.85;
L11=K6/1000*9.80665;
C5=2.04*I7*G6/1000;
F5=C5*1000/G6/100;
C6=4.05*I7*G6/1000;
F6=C6*1000/G6/100;
C7=5.07*I7*G6/1000;
F7=C7*1000/G6/100;
F11=(C11*D11)/(L11*K11*Math.cos(E11/57.29578));
I11=F11/9.5;
G11=C11/(L11*K11)/Math.cos(E11/57.29578);
$("C5").value=C5.toFixed(2); /*一次弯曲钻压P1（t）*/
$("F5").value=F5.toFixed(2); /*一次弯曲长度L1（m）*/
$("C6").value=C6.toFixed(2); /*一次弯曲钻压P1（t）*/
$("F6").value=F6.toFixed(2); /*一次弯曲长度L1（m）*/
$("C7").value=C7.toFixed(2); /*一次弯曲钻压P1（t）*/
$("F7").value=F7.toFixed(2); /*一次弯曲长度L1（m）*/
$("F11").value=F11.toFixed(2); /*一次弯曲长度L1（m）*/
$("G11").value=G11.toFixed(2); /*一次弯曲长度L1（m）*/
$("I11").value=I11.toFixed(2); /*一次弯曲长度L1（m）*/
}
/*68压进施工单*/
function yj68(){
D4 = form1.D4.value;
D5 = form1.D5.value;  /*钻头位置*/
D6= form1.D6.value;
D7 = form1.D7.value;
D8 = form1.D8.value;
D9 = form1.D9.value;
D14 = form1.D14.value;   /*钻杆外径*/
D10 = form1.D10.value;   /*钻杆内径*/
D11 = form1.D11.value;   /*钻头尺寸*/
D12 = form1.D12.value;   /*上级套管尺寸*/
D13 = form1.D13.value;   /*套管壁厚*/
D16 = form1.D16.value;
D17 = form1.D17.value;
H4 = form1.H4.value;  /*套管鞋处深度  */
H5 = form1.H5.value;
H6= form1.H6.value;
H7 = form1.H7.value;
/*H9 = form1.H9.value;  /*环空容积*/
H16 = form1.H16.value;   /*溢流量*/
I29 = form1.I29.value;
F29 = form1.F29.value;
H8=0.785*D10*D10*D5/1000000;
D18=(D12-2*D13)/1000;/*套管内径*/
if  (D5<H4)
{H9=(0.785*D18*D18-0.785*D14*D14/1000000)*D5}
else if(D5>H4&&D5<=D4)
{H9=(0.785*D18*D18-0.785*D14*D14/1000000)*H4+parseFloat((D5-H4)*(0.785*D11*D11/1000000-0.785*D14*D14/1000000))}
else {H9="输入有误，请核实数据"}
H19=parseFloat(D6)+parseFloat(102*D16/D5)+parseFloat(H6);
H20=parseFloat(D16)+parseFloat(H7);
H21=H19*H7/D6;
H22=(H5-0.00981*D6)*H4;
H24=1000*H8/60/D8;/*井口到达钻头时间*/
H25=1000*H9/60/D8;/*钻头到达井口时间*/
H26=parseFloat(H24)+parseFloat(H25);/*循环一周时间*/
H35=1000*(H9-H16)/60/D8;/*溢流物顶部到达钻头时间*/
H29=parseFloat(H26)+(H24);/*司钻法重浆到达钻头*/
H27=I29*(parseFloat(H8)+parseFloat(H9));
H28=F29*H27*(H19-D6)/(F29-H19);
H30=2*H26;
H31=H24;/*工程师法重浆到钻头时间*/
H32=H35;
H33=H25;/*工程师法溢流物排完*/
H34=H26;/*重浆排完*/
$("H19").value=H19.toFixed(2);
$("H20").value=H20.toFixed(2);
$("H21").value=H21.toFixed(2);
$("H22").value=H22.toFixed(2);
$("H26").value=H26.toFixed(2);
$("H35").value=H35.toFixed(2);
$("H25").value=H25.toFixed(2);
$("H29").value=H29.toFixed(2);
$("H30").value=H30.toFixed(2);
$("H31").value=H31.toFixed(2);
$("H32").value=H32.toFixed(2);
$("H33").value=H33.toFixed(2);
$("H34").value=H34.toFixed(2);
$("H27").value=H27.toFixed(2);
$("H28").value=H28.toFixed(2);
$("H8").value=H8.toFixed(2);
$("H9").value=H9.toFixed(2);
}
/*68压进施工单*/
function YL69(){
G5 = form1.G5.value;    /*钻屑直径*/
G6 = form1.G6.value;    /*钻屑厚度*/
G7 = form1.G7.value;     /*钻井液密度*/
G8=G5/(parseFloat(G6)+parseFloat(G7))/24/60;
$("G8").value=G8.toFixed(2);
}
/*70套管自重计算*/
function TGZJJS70(){
C7 = form1.C7.value;    /*钻井液密度*/
C8 = form1.C8.value;     /*套管长度*/
C9 =(7.854-C7)*Math.pow(C8,2)*Math.pow(10,-7)/4;
$("C9").value=C9.toFixed(2);
}
/*71水灰比计算*/
function shb71(){
C3 = form1.C3.value;    /*钻井液密度*/
D3 = form1.D3.value;     /*套管长度*/
E3 = form1.E3.value;     /*配浆水密度*/
G3 = form1.G3.value;     /*井径*/
H3 = form1.H3.value;     /*套管外径*/
I3 = form1.I3.value;     /*井深*/
J3 = form1.J3.value;     /*附加量*/
F3 = 0.785*(G3*G3/1000000-H3*H3/1000000)*I3*J3;     /*套管长度*/
B3=(C3-D3)/(C3*(D3-1));
B4=F3*C3/(1+B3*C3);
B6=D3*F3-B4;
$("F3").value=F3.toFixed(2);
$("B3").value=B3.toFixed(4);
$("B4").value=B4.toFixed(2);
$("B6").value=B6.toFixed(2);
}
/*72机械比能计算*/
function JXBN72(){
B3 = form1.B3.value;    /*钻压*/
C3 = form1.C3.value;    /*直径*/
D3 = form1.D3.value;     /*转速*/
E3 = form1.E3.value;     /*钻时*/
A4=4*B3/(3.14*Math.pow(C3,2))+2.91*D3*B3/(C3*E3);
$("A4").value=A4.toFixed(2);
}
/*73扭矩的近似计算*/
function njjs73(){
B3 = form1.B3.value;    /*钻压*/
C3 = form1.C3.value;    /*直径*/
A4=0.00607*B3*C3;
$("A4").value=A4.toFixed(2);
}
/*74钻杆伸长量的计算*/
function ZGSCL74(){
G5 = form1.G5.value;    /*拉伸系数*/
G6 = form1.G6.value;    /*外拉力*/
G7 = form1.G7.value;    /*钻杆长度*/
G8 = form1.G8.value;    /*钢材弹性模量*/
G9 = form1.G9.value;    /*钻杆外径*/
G10 = form1.G10.value;    /*钻杆内径*/
G13=3.14159/4*G9*G9/100-3.14159/4*G10*G10/100;
G14=G5*(10*G6*G7)/(G8*G13)/100000;
$("G13").value=G13.toFixed(2);/*截面积*/
$("G14").value=G14.toFixed(2);/*钻杆伸长量*/
}
/*75已知水灰比计算水泥量*/
function yzshb75(){
G5 = form1.G5.value;    /*钻压*/
G6 = form1.G6.value;    /*钻压*/
G7 = form1.G7.value;    /*钻压*/
G8 = form1.G8.value;    /*配浆量*/
G12=G6*G7/(parseFloat(G7)+parseFloat(G5*G6))*G8;
G13=G12/G6;
G14=G5*G6*G7/(parseFloat(G7)+parseFloat(G5*G6))*G8;
G15=(parseFloat(G12)+parseFloat(G14))/G8;
$("G12").value=G12.toFixed(2);
$("G13").value=G13.toFixed(2);
$("G14").value=G14.toFixed(2);
$("G15").value=G15.toFixed(2);
}
/*76套管自重下的伸长量*/
function zzscl76(){
G4 = form1.G4.value;    /*钻压*/
G5 = form1.G5.value;    /*钻压*/
G6 = form1.G6.value;    /*钻压*/
G7 = form1.G7.value;    /*钻压*/
G8 = form1.G8.value;    /*钻压*/
G11=(G4-G8)/2*G5*G6*G7*G7/100000000;
$("G11").value=G11.toFixed(2);
}
/*77加入外掺料的水泥配水泥浆计算<*/
function wcl77(){
G4 = form1.G4.value;    /*钻压*/
G5 = form1.G5.value;    /*钻压*/
G6 = form1.G6.value;    /*钻压*/
G7 = form1.G7.value;    /*钻压*/
G8 = form1.G8.value;    /*钻压*/
G9= form1.G9.value;    /*钻压*/
G12=(100+parseFloat(G4))/(parseFloat(100/G7)+parseFloat(G4/G8));
G13=(G6-G5)/(G12-G5)*G12*G9;
G14=(1-(G6-G5)/(G12-G5))*G9;
G15=(G12-G6)/(G6-G5)*G5/G12;
G16=G13/G12;
$("G12").value=G12.toFixed(2);
$("G13").value=G13.toFixed(2);
$("G14").value=G14.toFixed(2);
$("G15").value=G15.toFixed(2);
$("G16").value=G16.toFixed(2);
}
/*78携带岩屑最小排量*/
function  XYZX78(){
G4 = form1.G4.value;    /*井眼直径*/
G5 = form1.G5.value;    /*钻具外径*/
G6 = form1.G6.value;    /*密度*/
G11=182.37/(G6*G5);
G10=785*((G4*G4)/1000000-(G5*G5)/1000000);
G12=785*((G4*G4)/1000000-(G5*G5)/1000000)*1.2;
$("G10").value=G10.toFixed(2) +"~"+G12.toFixed(2)    ;
$("G11").value=G11.toFixed(2);
}
/*79循环当量密度*/
function  XHDLMD79(){
C1= form1.C1.value;
C2= form1.C2.value;
C3= form1.C3.value;
C4= form1.C4.value;
C5= form1.C5.value;
C6= form1.C6.value;
C7=parseFloat(C1)+parseFloat(C2/18.3/(C5-C6))+parseFloat(C3*C4/30.6/((C5-C6)*(C5-C6)));
$("C7").value=C7.toFixed(2);
}
/*80上返速度*/
function sfsd80(){
G4 = form1.G4.value;    /*井径*/
G6 = form1.G6.value;    /*排量*/
G5 = form1.G5.value;    /*钻杆外径*/
G7=form1.G7.value;    /*钻杆内径*/
G8=form1.G8.value;    /*钻铤外径*/
G9=form1.G9.value;    /*钻铤内径*/

G11=1274*G6/(G4*G4-G5*G5);/*钻杆处上返速度*/
G12=1274*G6/(G4*G4-G8*G8);/*钻铤外上返速度*/

G13=1274*G6/(G7*G7);/*钻杆内流速*/
G14=1274*G6/(G9*G9);/*钻铤内流速*/

$("G11").value=G11.toFixed(2);/*钻杆处上返速度*/
$("G12").value=G12.toFixed(2);/*钻铤外上返速度*/
$("G13").value=G13.toFixed(2);/*钻杆处上返速度*/
$("G14").value=G14.toFixed(2);/*钻铤外上返速度*/
}
/*81曲率半径计算*/
function qlbj81(){
C3 = form1.C3.value;    /*全角变化率*/
A4=(360*30)/(C3*2*3.14);
$("A4").value=A4.toFixed(2);
}
/*82已知靶点坐标，靶前距求井口坐标*/
function bd82(){
B2 = form1.B2.value;    /*ax*/
C2 = form1.C2.value;    /*ay*/
B3 = form1.B3.value;    /*Bx*/
C3 = form1.C3.value;    /*By*/
B8= form1.B8.value;    /*B8*/
B7=(B3-B2)/(C3-C2);           /*斜率*/
B9=Math.atan(B7);  /*角度*/
B10=B2-Math.sin(B9)*B8;
C10=C2-Math.cos(B9)*B8;
if (C2>C3)
{G2="右";}
else
{G2="左";}
if (B2>B3)
{H2="上";}
else
{H2="下";}
$("AB").value=G2+H2;
/*$("B7").value=B7.toFixed(2);
$("B9").value=B9.toFixed(2);*/
$("B10").value=B10.toFixed(2);
$("C10").value=C10.toFixed(2);
}
/*83已知靶点坐标，垂深求井口坐标*/
function bd83(){
B2 = form1.B2.value;    /*ax*/
C2 = form1.C2.value;    /*ay*/
B3 = form1.B3.value;    /*Bx*/
C3 = form1.C3.value;    /*By*/
D2 = form1.D2.value;    /*By*/
D3 = form1.D3.value;    /*By*/
L11 = form1.L11.value;    /*By*/
M11 = form1.M11.value;    /*By*/
if (C2>C3)
{G2="右";}   /*右E*/
else
{G2="左";}   /*左W*/
if (B2>B3)
{H2="上";}
else
{H2="下";}
BC1= Math.pow((Math.pow((B2-B3),2)+Math.pow((C2-C3),2)),0.5);    /*两靶之间位移*/
CS1=Math.abs(D2-D3); /*两靶之间垂深差*/
G15 = form1.G15.value;    /*第一造斜率*/
H15 = form1.H15.value;    /*第一造斜率完钻井斜*/
ZXD=30/G15*H15;/*第一造斜段长*/
I15 = form1.I15.value;    /*第二造斜率*/
B8=Math.atan(Math.pow(((B3-B2)*(B3-B2)+(C3-C2)*(C3-C2)),0.5)/Math.abs(D3-D2))*180/Math.PI;   /*第二造斜率完井井斜*/
J15=B8;
E15=30/G15*360/2/Math.PI*(Math.sin(H15/180*Math.PI)-Math.sin(0/180*Math.PI))+30/I15*360/2/Math.PI*Math.abs(Math.sin(J15/180*Math.PI)-Math.sin(H15/180*Math.PI)); /*垂直增量*/
F15=30/G15*360/2/Math.PI*Math.abs(Math.cos(H15/180*Math.PI)-Math.cos(0/180*Math.PI))+30/I15*360/2/Math.PI*Math.abs(Math.cos(J15/180*Math.PI)-Math.cos(H15/180*Math.PI));/*靶前距*/
B7=Math.atan(Math.pow(((B3-B2)*(B3-B2)+(C3-C2)*(C3-C2)),0.5)/Math.abs(D3-D2))*180/Math.PI-M11/30*L11; /*探顶井斜角*/
B9=Math.abs((C3-C2)/(B3-B2));/*方位过度*/
B11=F15;
/*
if (B3<B2 &C3>C2)  {B10=(Math.PI-Math.atan(B9))*180/Math.PI;$("B10").value=B10.toFixed(2);}
else  {B10= (Math.PI+Math.atan(B9))*180/Math.PI;$("B10").value=B10.toFixed(2);}
if (B3>B2 &C3>C2)   {B10= (Math.atan(B9))*180/Math.PI;$("B10").value=B10.toFixed(2);}
else   {B10= (2*Math.PI-Math.atan(B9))*180/Math.PI;$("B10").value=B10.toFixed(2);} */
/*=IF(B3<B2,IF(C3>C2,PI()-ATAN(B9),PI()+ATAN(B9)),IF(C3>C2,ATAN(B9),2*PI()-ATAN(B9)))*180/PI()*/
if (B3<B2 &C3>C2) { B10=(Math.PI-Math.atan(B9))*180/Math.PI;}
if (B3<B2 &C3<C2) {B10= (Math.PI+Math.atan(B9))*180/Math.PI;}
if (B3>B2 &C3>C2) {B10= (Math.atan(B9))*180/Math.PI;}
if (B3>B2 &C3<C2)  {B10= (2*Math.PI-Math.atan(B9))*180/Math.PI;}
XC=Math.pow((BC1*BC1+CS1*CS1),0.5);
B12=D2-E15;/*造斜点深度*/
ZC=B12+ZXD+XC;
B4=B2-Math.cos(B10/180*Math.PI)*B11;
C4=C2-Math.sin(B10/180*Math.PI)*B11;
if (B10>0  &&B10<90)  { AB11="靶点位于第一象限，NE区";}
if (B10>90  &&B10<180)  { AB11="靶点位于第二象限，SE区";}
if (B10>180  &&B10<270)  { AB11="靶点位于第三象限，SW区";}
if (B10>270  &&B10<360)  { AB11="靶点位于第四象限，NW区";}
$("AB").value=G2+H2;
$("B7").value=B7.toFixed(2);
$("B8").value=B8.toFixed(2);
$("B10").value=B10.toFixed(2);
$("ZC").value=ZC.toFixed(2);
$("E15").value=E15.toFixed(2);
$("F15").value=F15.toFixed(2);
$("B12").value=B12.toFixed(2);
$("B4").value=B4.toFixed(2);
$("C4").value=C4.toFixed(2);
$("BC1").value=BC1.toFixed(2);
$("CS1").value=CS1.toFixed(2);
$("XC").value=XC.toFixed(2);
$("ZXD").value=ZXD.toFixed(2);
$("AB11").value=AB11;
/* $("C10").value=C10.toFixed(2);*/
}
/*84已知井口坐标\靶点坐标，垂深求*/
function bd84(){
B2 = form1.B2.value;    /*井口x*/
C2 = form1.C2.value;    /*井口y*/
B3 = form1.B3.value;    /*靶点x*/
C3 = form1.C3.value;    /*靶点y*/
B5 = form1.B5.value;    /*靶点垂深*/
B8 = form1.B8.value;    /*造斜率*/
B10 = form1.B10.value;    /*最大井斜*/
B4= Math.pow((Math.pow((B2-B3),2)+Math.pow((C2-C3),2)),0.5);    /*两靶之间位移*/
B9=Math.abs((C3-C2)/(B3-B2));/*方位过度*/
B11=B10/B8*30 ; /*需要段长*/
C10=B10*Math.PI/180/2;
E10=B10*Math.PI/180;
B12=B11*Math.cos(C10);/*造斜段垂深*/
B13=B11*Math.sin(C10);/*造斜段位移*/
B14=B4-B13;
B15=B14/Math.sin(E10);/*稳斜段长*/
B16=B14/Math.sin(E10)*Math.cos(E10);
B17=B5-B12-B16;/*造斜点*/
B18=B17+B11+B15;/*总斜深*/
B19=B17+B11;
if (B3<B2 &C3>C2) { B23=(Math.PI-Math.atan(B9))*180/Math.PI;}  /*第四象限*/
if (B3<B2 &C3<C2) {B23= (Math.PI+Math.atan(B9))*180/Math.PI;}    /*第三象限*/
if (B3>B2 &C3>C2) {B23= (Math.atan(B9))*180/Math.PI;}   /*第一象限*/
if (B3>B2 &C3<C2)  {B23= (2*Math.PI-Math.atan(B9))*180/Math.PI;}  /*第二象限*/
$("B17").value=B17.toFixed(2);
$("B18").value=B18.toFixed(2);
$("B11").value=B11.toFixed(2);
$("B12").value=B12.toFixed(2);
$("B13").value=B13.toFixed(2);
$("B14").value=B14.toFixed(2);
$("B20").value=B17.toFixed(2)+"～"+B19.toFixed(2);
$("B15").value=B15.toFixed(2);
$("B16").value=B16.toFixed(2);
$("B23").value=B23.toFixed(2);
$("B4").value=B4.toFixed(2);
$("C10").value=C10.toFixed(2);
}
/*85已知地层破裂压力计算*/
function dp85(){
C3 = form1.C3.value;    /*钻井液密度*/
C4 = form1.C4.value;    /*垂直井深*/
C5 = form1.C5.value;    /*实测套压*/
C6= form1.C6.value;    /*实测套压*/
A4=parseFloat(0.00981*C3*C4)+parseFloat(C5);
A5=A4/(0.00981*C4);
A6=A4-0.00981*C6*C4;
A7=A4/(C4);
$("A4").value=A4.toFixed(2);
$("A5").value=A5.toFixed(2);
$("A6").value=A6.toFixed(2);
$("A7").value=A7.toFixed(3);
}
/*86已知靶点坐标，靶前距求井口坐标*/
function bd86(){
E51 = form1.E51.value;    /*ax*/
E52 = form1.E52.value;    /*Bx*/
E53 = form1.E53.value;    /*Bx*/
D51 = form1.D51.value;    /*By*/
D52 = form1.D52.value;    /*By*/
D53 = form1.D53.value;    /*By*/
D54=Math.abs((E53-E52)*D51-(D53-D52)*E51+E52*(D53-D52)-D52*(E53-E52))/Math.pow(((E53-E52)*(E53-E52)+(D53-D52)*(D53-D52)),0.5)
$("D54").value=D54.toFixed(2);
}
/*87直井钟摆钻具计算*/
function zj87(){
D5 = form1.D5.value;    /*ax*/
D6 = form1.D6.value;    /*Bx*/
D7 = form1.D7.value;    /*Bx*/
D8 = form1.D8.value;    /*By*/
D9 = form1.D9.value;    /*By*/
D10 = form1.D10.value;    /*By*/
D11 = form1.D11.value;    /*By*/
D12 = form1.D12.value;    /*By*/
D13=(((D8/10)*(D8/10)-(D9/10)*(D9/10))*Math.PI/4*7.85/10)*0.96;
D14=(7.85-D12)/7.85;
D15=D13/100*D14;
D16=206850000;
D17=((D8/1000)*(D8/1000)*(D8/1000)*(D8/1000)-(D9/1000)*(D9/1000)*(D9/1000)*(D9/1000))*Math.PI/64;
D18=D17*D16;
C20=Math.pow((D18/(D13*D14*9.80665/1000)),(1/3));
D20=2.04*C20;
D21=4.05/2.04*D20;
D22=D13*D14*D20/1000*9.81;
D23=4.05/2.04*D22;
C15=(D5-D6)/2/1000;
C16=(D5-D8)/2/1000;
D24=Math.atan(1.02*C16/C20)*180/Math.PI;
D26=Math.atan(0.44*C16/C20)*180/Math.PI;
C17=184.6*D10*(0.667+0.333*C15/C16)*(0.667+0.333*C15/C16)*(C16-0.42*C15-0.08*C15*C15/C16);
C18=Math.PI*Math.PI*D15*Math.sin(D11*Math.PI/180);
C19=-184.6*Math.PI*Math.PI*D18*(C16-0.42*C15-0.08*C15*C15/C16);
D27=Math.pow(((-C17+Math.pow((C17*C17-4*C18*C19),0.5))/(2*C18)),0.5);
D28=D27-D27*0.1;
D19=(1-D7)*D14*D13*D28*9.80655*Math.cos(D11*Math.PI/180)/1000;
$("D13").value=D13.toFixed(2);
$("D14").value=D14.toFixed(2);
$("D15").value=D15.toFixed(2);
$("D16").value=D16.toFixed(2);
$("D17").value=D17;
$("D18").value=D18.toFixed(2);
$("D19").value=D19.toFixed(2);
$("D20").value=D20.toFixed(2);
$("D21").value=D21.toFixed(2);
$("D22").value=D22.toFixed(2);
$("D23").value=D23.toFixed(2);
$("D24").value=D24.toFixed(2);
$("D26").value=D26.toFixed(2);
$("D27").value=D27.toFixed(2);
$("D28").value=D28.toFixed(2);
}
/*88定向井钻具屈曲计算*/
function dx88(){
D12 = form1.D12.value;    /*ax*/
D30 = form1.D30.value;    /*ax*/
D31 = form1.D31.value;    /*ax*/
D32 = form1.D32.value;    /*ax*/
D33 = form1.D33.value;    /*ax*/
D34 = form1.D34.value;    /*ax*/
D14=(7.85-D12)/7.85;
D16=206850000;
D35=D31*9.80665*D14/1000;
D36=((D32/1000)*(D32/1000)*(D32/1000)*(D32/1000)-(D33/1000)*(D33/1000)*(D33/1000)*(D33/1000))*Math.PI/64;
D37=206850000;
D38=D36*D16;
D39=(D30-D32)/2/1000;
D40=2*Math.pow((D38*D35*Math.sin(D34*Math.PI/180)/D39),0.5);
D41=1.414*D40;
$("D35").value=D35.toFixed(2);
$("D36").value=D36;
$("D37").value=D37.toFixed(2);
$("D38").value=D38.toFixed(2);
$("D39").value=D39.toFixed(2);
$("D40").value=D40.toFixed(2);
$("D41").value=D41.toFixed(2);
}
/*89固井顶替压力计算*/
function dy89(){
K5 = form1.K5.value;    /*ax*/
K6 = form1.K6.value;    /*ax*/
K7 = form1.K7.value;    /*ax*/
K8 = form1.K8.value;    /*ax*/
K9 = form1.K9.value;    /*ax*/
K10 = form1.K10.value;    /*ax*/
K11 = form1.K11.value;    /*ax*/
K12 = form1.K12.value;    /*ax*/
K13 = form1.K13.value;    /*ax*/
K14 = form1.K14.value;    /*ax*/
K15 = form1.K15.value;    /*ax*/
K16 = form1.K16.value;    /*ax*/
K17 = form1.K17.value;    /*ax*/
K18 = form1.K18.value;    /*ax*/
K19 = form1.K19.value;    /*ax*/
K20 = form1.K20.value;    /*ax*/
K21 = form1.K21.value;    /*ax*/
K22 = form1.K22.value;    /*ax*/
K23 = form1.K23.value;    /*ax*/
K24 = form1.K24.value;    /*ax*/
K46=((3.14/4*K22*K22*K6)-(3.14/4*K7*K7*K6))/1000000;
K45=K46/K5;
K28=K23/K45;
K27=K24;
K29=K27*K28/10/9.8;
ABC=K10;
K30=K9-ABC-K28;
K31=K12;
K32=K30*K31/10/9.8;
K34=K6-K9;
K33=K11;
K35=K33*K34/10/9.8;
K36=K13;
K37=ABC;
K38=K37*K36/10/9.8;
K39=parseFloat(K29)+parseFloat(K38);
K40=parseFloat(K39)+parseFloat(K35)+parseFloat(K32);
K41=parseFloat(K28)+parseFloat(K30)+parseFloat(K34)+parseFloat(K37);
K43=12.7*(K20/((K22/10)*(K22/10)-(K7/10)*(K7/10)));
K47=K14;
K46=((3.14/4*K22*K22*K6)-(3.14/4*K7*K7*K6))/1000000;
K65=K8*K8*3.14/4*K5/1000000;
K64=K65/K5;
K48=K15/K64;
K49=K48*K47/10/9.8;
K51=K17/K64;
K50=parseFloat(K16);
K53=parseFloat(K18);
K52=K51*K50/10/9.8;
K54=K19/K64;
K55=K54*K53/10/9.8;
K57=K5-K48-K51-K54;
K56=K13;
K58=K56*K57/10/9.8;
K61=12.7*K20/((K7/10)*(K7/10));
K65=K8*K8*3.14/4*K5/1000000;
K59=parseFloat(K49)+parseFloat(K52)+parseFloat(K55)+parseFloat(K58);
K66=parseFloat(K40)-parseFloat(K59)+parseFloat(K21);
$("K28").value=K28.toFixed(2);
$("K29").value=K29.toFixed(2);
$("K30").value=K30.toFixed(2);
$("K32").value=K32.toFixed(2);
$("K34").value=K34.toFixed(2);
$("K35").value=K35.toFixed(2);
$("K38").value=K38.toFixed(2);
$("K39").value=K39.toFixed(2);
$("K40").value=K40.toFixed(2);
$("K37").value=parseFloat(K37).toFixed(2);
$("K41").value=K41.toFixed(2);
$("K43").value=K43.toFixed(2);
$("K46").value=K46.toFixed(2);
$("K48").value=K48.toFixed(2);
$("K49").value=K49.toFixed(2);
$("K51").value=K51.toFixed(2);
$("K52").value=K52.toFixed(2);
$("K54").value=K54.toFixed(2);
$("K55").value=K55.toFixed(2);
$("K57").value=K57.toFixed(2);
$("K58").value=K58.toFixed(2);
$("K59").value=K59.toFixed(2);
$("K61").value=K61.toFixed(2);
$("K65").value=K65.toFixed(2);
$("K66").value=K66.toFixed(2);
}
/*90降固相*/
function jg90(){
H4 = form1.H4.value;    /*ax*/
H5 = form1.H5.value;    /*ax*/
H6 = form1.H6.value;    /*ax*/
H7 = form1.H7.value;    /*ax*/
H8 = form1.H8.value;    /*ax*/
H11=(H4*(H7-H8))/H8;
H13=parseFloat(H4)+parseFloat(H11);
H12=(parseFloat(H4*H5)+parseFloat(H11*H6))/H13;
$("H11").value=H11.toFixed(2);
$("H12").value=H12.toFixed(2);
$("H13").value=H13.toFixed(2);
}
/*91i滤失量计算*/
function JS91(){
G5 = form1.G5.value;    /*ax*/
G6 = form1.G6.value;    /*ax*/
G9=Math.pow((30/G5),0.5)*G6;
G10=G5*60;
$("G9").value=G9.toFixed(2);
$("G10").value=G10.toFixed(2);
}
/*92钻井液流核计算*/
function JS92(){
G5 = form1.G5.value;    /*ax*/
G6 = form1.G6.value;    /*ax*/
G7 = form1.G7.value;    /*ax*/
G8 = form1.G8.value;    /*ax*/
G9 = form1.G9.value;    /*ax*/
G12=G8/2;  /*表观*/
G13=G8-G9;
G14=(G9-G13)/2;
G16=G14/G13;
G17=Math.log(G8/G9)/Math.log(10)/0.301;
G18=Math.pow((G9/500),G17)*0.4788;
G20=12.7*G7/((G5/10)*(G5/10)-(G6/10)*(G6/10));
G23=472*G20/((G5-G6)/10);
G24=(G16*(G5-G6)/(24*G20+parseFloat(3*G16*(G5-G6))))*10;
$("G12").value=G12.toFixed(2);
$("G13").value=G13.toFixed(2);
$("G14").value=G14.toFixed(2);
$("G16").value=G16.toFixed(2);
$("G17").value=G17.toFixed(2);
$("G18").value=G18.toFixed(2);
$("G20").value=G20.toFixed(2);
$("G23").value=G23.toFixed(2);
$("G24").value=G24.toFixed(2);
}
/*93赫巴参数计算*/
function JS93(){
G6 = form1.G6.value;    /*ax*/
G7 = form1.G7.value;    /*ax*/
G8 = form1.G8.value;    /*ax*/
G11=0.511*G8;
ab=(G6-G8)/(G7-G8);
G12=3.322*Math.log(parseFloat(ab))/Math.log(10);
G13=(0.511*(G7-G8))/Math.pow(511,G12);
$("G11").value=G11.toFixed(2);
$("G12").value=G12.toFixed(2);
$("G13").value=G13.toFixed(2);
}
/*94赫巴参数计算*/
function JS94(){
G5 = form1.G5.value;    /*ax*/
G6 = form1.G6.value;    /*ax*/
G7 = form1.G7.value;    /*ax*/
G8 = form1.G8.value;    /*ax*/
G9 = form1.G9.value;    /*ax*/
G14=G8-G9;
G12=(G9-G14)*0.4788;
G16=3.14*G5*G5/4/10000-3.14*G6*G6/4/10000;
G17=G7/G16/10;
G20=12*G17/(G5-G6)*G12*4.788/G14;
if  (G20<0.1)
{$("G21").value="层流";}
else if (G20>0.2)
{$("G21").value="紊流";}
else if  (G20>=0.1&&G20<0.2)
{$("G21").value="平板层流";}
$("G20").value=G20.toFixed(2);
}
/*95NK值计算*/
function JS95(){
B2 = form1.B2.value;    /*ax*/
B3 = form1.B3.value;    /*ax*/
D2=3.322*Math.log(B2/B3)/Math.log(10);
D3=0.5*B3/Math.pow(500,D2);
A6=B2/2;
B6=B2-B3;
C6=A6-B6;
D6=C6/B6;
$("D2").value=D2.toFixed(2);
$("D3").value=D3.toFixed(2);
$("A6").value=A6.toFixed(2);
$("B6").value=B6.toFixed(2);
$("C6").value=C6.toFixed(2);
$("D6").value=D6.toFixed(2);
}
/*96环空宾汉-幂律有效黏度*/
function JS96(){
H4 = form1.H4.value;    /*ax*/
H5 = form1.H5.value;    /*ax*/
H6 = form1.H6.value;    /*ax*/
H7 = form1.H7.value;    /*ax*/
H8 = form1.H8.value;    /*ax*/
N4=H4/25.4;
N5=H5/25.4;
N8=H7-H8;
N9=(H8-N8)*0.5;
N10=3.322*Math.log(H7/H8)/Math.log(10);
N12=H8/Math.pow(500,N10)*0.4788;
N16=12.7*H6/((N4*2.54)*(N4*2.54)-(N5*2.54)*(N5*2.54));
N14=100*N12*Math.pow((1200*N16/(H4/10-H5/10)*(2*N10+1)/3*N10),(N10-1))*10;
N15=N8+parseFloat(N9*((H4-H5)/10/0.8*N16));
$("N14").value=N14.toFixed(2);
$("N15").value=N15.toFixed(2);
}
/*97dc指数计算*/
function JS97(){
B17 = form1.B17.value;    /*ax*/
B18 = form1.B18.value;    /*ax*/
B19 = form1.B19.value;    /*ax*/
B20 = form1.B20.value;    /*ax*/
B21 = form1.B21.value;    /*ax*/
B22 = form1.B22.value;    /*ax*/
B24=Math.log((3.282/B17/B19))/Math.log(0.0684*B18/B20)*B22/B21;
$("B24").value=B24.toFixed(3);
}
/*98抽汲/激动压力计算公式*/
function JS98(){
	B4 = form1.B4.value;    /*ax*/
B3 = form1.B3.value;    /*ax*/

B5 = form1.B5.value;    /*ax*/
B6 = form1.B6.value;    /*ax*/
B7 = form1.B7.value;    /*ax*/
B8 = form1.B8.value;    /*ax*/
B9 = form1.B9.value;    /*ax*/

B10 = form1.B10.value;    /*ax*/
B11 = form1.B11.value;    /*ax*/
B12 = form1.B12.value;    /*ax*/
B13 = form1.B13.value;    /*ax*/
B14 = form1.B14.value;    /*ax*/

B17=3.32*Math.log(B4/B3)/Math.log(10);
B18=B3/Math.pow(511,B17);
$("B17").value=B17.toFixed(2);
$("B18").value=B18.toFixed(2);
var rd= document.getElementsByName('B15');
if  (rd[0].checked)
{ B19=(0.45+((B8*B8)/(B5*B5-B8*B8)))*B10 ;
B21=B19*1.5;
B22=Math.pow((2.4*B21/(B5-B8)*((parseFloat(2*B17)+parseFloat(1))/(3*B17))),B17)*(B18*B11/(300*(B5-B8)))*100000;
B23=(parseFloat(0.45)+parseFloat(((B6*B6)/(B5*B5-B6*B6))))*B10;

B25=B23*1.5;

B26=Math.pow((2.4*B25/(B5-B6)*((parseFloat(2*B17)+parseFloat(1))/(3*B17))),B17)*(B18*B12/(300*(B5-B6)))*100000;

B27=parseFloat(B22)+parseFloat(B26);
B28=parseFloat(9.8*B14*B13)+parseFloat(B27);
B29=B28/(9.8*B14);
B30=(9.8*B14*B13)-B27;
B31=B30/(9.8*B14);
$("M1").value="钻杆周围流速 (管口堵塞)(m/s):";
$("B19").value=B19.toFixed(2);
$("B21").value=B21.toFixed(2);
$("B22").value=(B22/1000).toFixed(2);
$("M2").value="钻铤周围流速 (管堵塞)(m/s):";
$("B23").value=B23.toFixed(2);
$("B25").value=B25.toFixed(2);
$("B26").value=(B26/1000).toFixed(2);
$("B27").value=(B27/1000).toFixed(2);
$("B28").value=(B28/1000).toFixed(2);
$("B29").value=B29.toFixed(2);
$("B30").value=(B30/1000).toFixed(2);
$("B31").value=B31.toFixed(2);
}


if  (rd[1].checked)
{ B19=(0.45+((B8*B8-B9*B9)/(B5*B5-B8*B8+B9*B9)))*B10 ;
B21=B19*1.5;
B22=Math.pow((2.4*B21/(B5-B8)*((parseFloat(2*B17)+parseFloat(1))/(3*B17))),B17)*(B18*B11/(300*(B5-B8)))*100000;
B23=(0.45+((B6*B6-B7*B7)/(B5*B5-B6*B6+B7*B7)))*B10;
/*((2.4*B21/(B5-B8)*((2*B17+1)/(3*B17)))^B17)*(B18*B11/(300*(B5-B8)))*/
B25=B23*1.5;

B26=Math.pow((2.4*B25/(B5-B6)*((parseFloat(2*B17)+parseFloat(1))/(3*B17))),B17)*(B18*B12/(300*(B5-B6)))*100000;

B27=parseFloat(B22)+parseFloat(B26);
B28=parseFloat(9.8*B14*B13)+parseFloat(B27);
B29=B28/(9.8*B14);
B30=(9.8*B14*B13)-B27;
B31=B30/(9.8*B14);
$("M1").value="钻杆周围流速(m/s):";
$("B19").value=B19.toFixed(2);
$("B21").value=B21.toFixed(2);
$("B22").value=(B22/1000).toFixed(2);
$("M2").value="钻铤周围流速 (m/s):";
$("B23").value=B23.toFixed(2);
$("B25").value=B25.toFixed(2);
$("B26").value=(B26/1000).toFixed(2);
$("B27").value=(B27/1000).toFixed(2);
$("B28").value=(B28/1000).toFixed(2);
$("B29").value=B29.toFixed(2);
$("B30").value=(B30/1000).toFixed(2);
$("B31").value=B31.toFixed(2);
}


}


/*99弯接头度数计算*/
function JS99(){
B17 = form1.B17.value;    /*ax*/
B18 = form1.B18.value;    /*ax*/
B19 = form1.B19.value;    /*ax*/
K=57.3*(B17-B18)/B19;
$("B24").value=K.toFixed(3);
}
/*100钻头单位进尺成本*/
function JS100(){
B17 = form1.B17.value;    /*ax*/
B18 = form1.B18.value;    /*ax*/
B19 = form1.B19.value;    /*ax*/
B20 = form1.B20.value;    /*ax*/
B21 = form1.B21.value;    /*ax*/
K=(B18/24)*(parseFloat(B20)+parseFloat(B21));
B24=(parseFloat(B17)+parseFloat(K))/B19;
$("B24").value=B24.toFixed(2);
}
/*101扭转圈数*/
function JS101(){
B75 = form1.B75.value;
D75 = form1.D75.value;
E75 = form1.E75.value;
F75 = form1.F75.value;
C75=B75*1000*0.453592/(2.54*2.54)*0.0980665;
G75=3.1415926*(E75*E75-(E75-2*F75)*(E75-2*F75))/400;
H75=0.5*C75*10.19716/3.1415926535/8/1.5/E75*(D75/1000)*10;
I75=21*G75;
$("C75").value=C75.toFixed(2);
$("G75").value=G75.toFixed(2);
$("H75").value=H75.toFixed(2);
$("I75").value=I75.toFixed(2);
}
/*102地层破裂压力试验*/
function JS102(){
B52 = form1.B52.value;
C52 = form1.C52.value;
D52= form1.D52.value;
E52 = form1.E52.value;
F52=101.972*(parseFloat(D52/B52)+parseFloat(0.00980665*C52));
G52=parseFloat(D52)+parseFloat(0.00980665*C52*B52);
H52=101.972*(E52/B52+0.00980665*C52);
I52=parseFloat(E52)+parseFloat(0.00980665*B52*C52);
$("F52").value=F52.toFixed(3);
$("G52").value=G52.toFixed(3);
$("H52").value=H52.toFixed(3);
$("I52").value=I52.toFixed(3);
}
/*103憋压侯凝*/
function JS103(){
B73 = form1.B73.value;
C73 = form1.C73.value;
D73= form1.D73.value;
E73=C73-D73;
$("E73").value=E73.toFixed(2);
F73=0.01*(B73-1.07)*E73;
$("F73").value=F73.toFixed(3);
}
/*104钻具强度抗拉，抗扭*/
function JS104(){
B45 = form1.B45.value;/*钻具钢级*/
D45 = form1.D45.value;/*钻具外径*/
E45= form1.E45.value;/*钻具壁厚*/
C45=B45*1000*0.453592/(2.54*2.54)*0.0980665;
F45=D45-E45*2;
G45=3.1415926*((D45/10)*(D45/10)-(F45/10)*(F45/10))*C45/4000/0.0980665;/*抗拉强度*/
G46=G45*0.8;
$("C45").value=C45.toFixed(2);
$("G45").value=G45.toFixed(3);/*抗拉强度*/
$("G46").value=G46.toFixed(3);
}

/*120坐卡瓦最大拉力*/
function JS120(){
B3 = form1.B3.value;/*钻具钢级*/
A4 = form1.A4.value; /*钻具外径*/
A5 = form1.A5.value;  /*钻具壁厚*/
A6=form1.A6.value; /*卡瓦有效长度*/
B7 = form1.B7.value;/*卡瓦锥度*/
B8 = form1.B8.value; /*卡瓦摩擦系数*/
B4=A4/25.4;
B5=A4-2*A5;/*钻具内径*/
B10=Math.atan(B8);
B11=1/Math.tan(parseFloat(B7)+parseFloat(B10))
B6=A6/25.4; /*卡瓦有效长度*/
A7=(B4*B11)/(2*B6);
B12=Math.pow((parseFloat(1)+parseFloat(A7)+parseFloat(A7*A7)),0.5);
B13=B3*1000*0.453592/(2.54*2.54)*0.0980665;
B14=3.1415926*(A4*A4-B5*B5)/400;
B15=0.0980665*B13*B14;/*抗拉强度*/
B16=B15*0.9;
B161=B15*0.8;
B17=B16/B12;
$("B11").value=B11.toFixed(2);
$("B12").value=B12.toFixed(2);
$("B13").value=B13.toFixed(3);
$("B14").value=B14.toFixed(3);
$("B15").value=B15.toFixed(3);/*抗拉强度*/
$("B16").value=B16.toFixed(3);/*钻具抗拉强度90%*/
$("B161").value=B161.toFixed(3);/*钻具抗拉强度90%*/
$("B17").value=B17.toFixed(3);
}



/*105全角变化率*/
function JS105(){
B9 = form1.B9.value;
C9 = form1.C9.value;
E9 = form1.E9.value;
B10 = form1.B10.value;
C10 = form1.C10.value;
E10 = form1.E10.value;
H40= form1.H40.value;
K1=Math.pow(((C10-C9)/(B10-B9)),2);
K2=Math.pow((Math.sin((parseFloat(C10)+parseFloat(C9))/2*Math.PI/180)),2);
if (E10-E9-180>0)
{
L10 =Math.pow((parseFloat(K1)+parseFloat(((E10-E9-360)/(B10-B9))*((E10-E9-360)/(B10-B9))*K2)),0.5)*H40 ;
$("L10").value=L10.toFixed(4);
}
else if  (E10-E9+180<0)
{
L10 =Math.pow((parseFloat(K1)+parseFloat(((E10-E9+360)/(B10-B9))*((E10-E9+360)/(B10-B9))*K2)),0.5)*H40 ;
$("L10").value=L10.toFixed(4);
}
else
{
L10 =Math.pow((parseFloat(K1)+parseFloat(((E10-E9)/(B10-B9))*((E10-E9)/(B10-B9))*K2)),0.5)*H40 ;
$("L10").value=L10.toFixed(4);
}
}
/*106钻具浮力计算*/
function JS106(){
B1 = form1.B1.value;
B2 = form1.B2.value;
B3 = form1.B3.value;
B4=1-B1/B2;
B5=B3*B4;
$("B4").value=B4.toFixed(2);
$("B5").value=B5.toFixed(3);
}
/*107钻柱设计计算*/
function JS107(){
J3 = form1.J3.value;
J4 = form1.J4.value;
J5 = form1.J5.value;
J6 = form1.J6.value;
J7 = form1.J7.value;
J8 = form1.J8.value;
J9 = form1.J9.value;
J10 = form1.J10.value;
J52 = form1.J52.value;
T3 = form1.T3.value;
T4 = form1.T4.value;

T6 = form1.T6.value;
X72 = form1.X72.value;
G72 = form1.G72.value;
AC3 = form1.AC3.value;
AC6 = form1.AC6.value;
T4=T4/25.4;
J11=1-J5/7.85;
J21=(parseFloat(T3*T6)+parseFloat(AC3*AC6))*J11/1000;
E31=0.9*J6;
J31=0.9*J6/0.981;
D21=0.981*(parseFloat(T3*T6)+parseFloat(AC3*AC6))*J11/1000;
J32=(E31-D21)/0.981;
E33=E31/D21;
F43=0.9*J6*1000/J9/T6/J11-AC6*AC3/T6;
F44=parseFloat(F43)+parseFloat(AC3);
J54=J8*1000/J10/1000;
J55=9.81*J5*J52/1000;
S72=X72*100;
E75=1.49*X72*100*T3/G72/T4;
E76=J7*Math.pow((1-(D21/J6)*(D21/J6)),0.5)/100;
E77=J6*Math.pow((1-(S72/J7)*(S72/J7)),0.5)/0.981;
$("J21").value=J21.toFixed(2);
$("J31").value=J31.toFixed(2);
$("J32").value=J32.toFixed(2);
$("E33").value=E33.toFixed(2);
$("F43").value=F43.toFixed(2);
$("F44").value=F44.toFixed(2);
$("J54").value=J54.toFixed(2);
$("J55").value=J55.toFixed(2);
$("E75").value=E75.toFixed(2);
$("E76").value=E76.toFixed(2);
$("E77").value=E77.toFixed(2);
}
/*108中性点位置*/
function JS108(){
B1 = form1.B1.value;
B2 = form1.B2.value;
B3 = form1.B3.value;
B4 = form1.B4.value;
B5 = form1.B5.value;
B6 = form1.B6.value;
B8=1-B5/7.8;
B9=B1*B2*B8;
if (B6-B9>0)
{B11=parseFloat(B1)+parseFloat((B6-B9)/B8/B4);
$("B11").value=B11.toFixed(2);
$("B14").value="位于钻杆上";
}
else
{B11=B6/B2;
$("B11").value=B11.toFixed(2);
$("B14").value="位于钻铤上";
}
}
/*109悬吊伸长量计算*/
function JS109(){
Y20 = form1.Y20.value;/*钻杆长度*/
Y21 = form1.Y21.value;/*弹性模量*/
Y22 = form1.Y22.value;/*钻柱密度*/
Y23 = form1.Y23.value;/*钻井液密度*/
Y26 = form1.Y26.value;/*泊松比*/

Y27=0.0785*Y20*Y20/(2*Y21);/*因自重伸长*/
Y28=-Y23*Y20*Y20*(1-Y26)/Y21/100;/*因温度缩短*/
Y19=parseFloat(Y27)+parseFloat(Y28);
$("Y27").value=Y27.toFixed(3);
$("Y28").value=Y28.toFixed(3);
$("Y19").value=Y19.toFixed(3);
}
/*110被卡钻柱伸长量*/
function JS110(){
Z54 = form1.Z54.value;
Z55 = form1.Z55.value;
Z56 = form1.Z56.value;
Z57 = form1.Z57.value;
Z58 = 1.885;
Z53=Z54*Z55*Z56*9.8/40.8/Z57/Z58/1000;
$("Z53").value=Z53.toFixed(2);
}
/*110被卡钻柱伸长量*/
function JS111(){
Z85 = form1.Z85.value;/*外径*/
Z86 = form1.Z86.value;/*壁厚*/
Z87 = form1.Z87.value;/*钢级号*/
Z89 = form1.Z89.value;/*上提吨位*/
Z89=Z89*1000*9.81;
Z87=Z87*1000/145;
Z86=Z85-2*Z86;
Z88=0.577*Z87;
Z90=0.785*(Z85*Z85-Z86*Z86)  ;
Z91=0.012;
Z84=Math.PI/32*(Z85*Z85*Z85*Z85-Z86*Z86*Z86*Z86);
Z82=0.096167*Z84*Z91/Z85*Math.pow((Z87*Z87-Z89*Z89/(Z90*Z90)),0.5)/1000;
$("Z82").value=Z82.toFixed(4);/*抗扭*/
}
/*112允许圈数*/
function JS112(){
Y111 = form1.Y111.value;
Y112 = form1.Y112.value;
Y110=Y111*Y112;
$("Y110").value=Y110.toFixed(4);
}
/*113初始循环压力*/
function JS113(){
Y111 = form1.Y111.value;
Y112 = form1.Y112.value;
Y110=parseFloat(Y111)+parseFloat(Y112);
$("Y110").value=Y110.toFixed(2);
}
/*114终了循环压力*/
function JS114(){
Y111 = form1.Y111.value;
Y112 = form1.Y112.value;
Y113= form1.Y113.value;
Y110=(Y111/Y112)*Y113;
$("Y110").value=Y110.toFixed(2);
}
/*115溢流类型判断*/
function JS115(){
B1 = form1.B1.value;
B2 = form1.B2.value;
B3 = form1.B3.value;
B4 = form1.B4.value;
B5 = form1.B5.value;
B6 = form1.B6.value;
B7 = form1.B7.value;
B8 = form1.B8.value;
B9=B7-(B3-B2)/(0.00981*B4/(((B5*B8/1000)*(B5*B8/1000)-(B6/1000)*(B6/1000))*0.785));
B10=B7*0.00981*B1+parseFloat(B2);
$("B9").value=B9.toFixed(2);
$("B10").value=B10.toFixed(2);
if (B9>0.12&&B9<=0.36)
$("B11").value="溢流体为天然气";
else if (B9>0.36&&B9<=0.6)
$("B11").value="溢流体为油";
else if (B9>0.6&&B9<=0.84)
$("B11").value="溢流体为油水混合物";
else if (B9>0.84&&B9<=1.07)
$("B11").value="溢流体为水";
else if (B9>1.07&&B9<=1.2)
$("B11").value="溢流体为盐水";
else   $("B11").value="数据有误，请核实";
}
/*116液压猫头与B型钳上扣扭矩计算*/
function JS116(){
A4 = form1.A4.value;
E2 = form1.E2.value;
I2= form1.I2.value;
K2=(E2/1000)*(E2/1000)*3.1415/4;
B4=A4*1000*K2;
C4=B4/2*(I2/1000);
$("B4").value=B4.toFixed(2);
$("C4").value=C4.toFixed(2);
}
/*117顶驱转速的确定*/
function JS117(){
B1 = form1.B1.value;
B2 = form1.B2.value;
B4=B1/B2;
B5=B4*B4;
if (B5>6.5)  $("B3").value="顶驱转速不低于120rpm，最佳顶驱转速180rpm";
else if (B5>3.25&&B5<=6.5)　
　 $("B3").value="顶驱转速不低于120rpm";
else if (B5<=3.25)
$("B3").value="顶驱转速不低于80rpm，最佳顶驱转速120rpm";
}
/*118套管下放速度计算*/
function JS118(){
B1 = form1.B1.value;
B2 = form1.B2.value;
B3 = form1.B3.value;
B4 = form1.B4.value;
C2=B2/10;
C3=B3/10;
B5=B1*(C2*C2-C3*C3)/(C3*C3);
B6=B4/B5;
$("B5").value=B5.toFixed(2);
$("B6").value=B6.toFixed(2);
}
/*119除气效率计算*/
function JS119(){
B1 = form1.B1.value;/*出口钻井液比重*/
B2 = form1.B2.value; /*入口钻井液比重*/
B3 = form1.B3.value;  /*原浆钻井液比重*/
B4=(B1-B2)/(B3-B2)
$("B4").value=B4.toFixed(3);
}

/*121地层流体渗入速率*/
function JS121(){
G4 = form1.G4.value;
G5 = form1.G5.value;
G6 = form1.G6.value;
G7 = form1.G7.value;
G8 = form1.G8.value;
G12=G7-G5;
G11=(G4*G6*G12)/(G7-G12-G6);
G14=G11/G8;
$("G11").value=G11.toFixed(3);
$("G12").value=G12.toFixed(3);
$("G14").value=G14.toFixed(3);
}
/*122水眼直径的计算*/
function JS122(){
B0 = form1.B0.value;/*钻头直径*/
B1 = form1.B1.value;/*喷嘴压降*/
B2 = form1.B2.value;/*钻井液密度*/
B3 = form1.B3.value;/*排量*/
B4 = form1.B4.value;/*喷嘴个数*/
B5 = form1.B5.value;/*流量系数*/
B13=(B0/25.4)*(B0/25.4)/2;
if(B4>0 && B4<=3 )
{
B6=Math.pow((0.081*B2*B3*B3/B1/B5/B5/(B4*B4)),0.25);
B7=B6*10;/*喷嘴直径*/
$("B7").value=B7.toFixed(2);/*牙轮水眼直径*/
B9=0.081*B2*B3*B3*B3/B5/B5/B4/B4/B6/B6/B6/B6;
B10=1000*B3/(0.785*B4*B7*B7);
B11=B2*B10*B3;
B12=10*Math.pow((B4*B6),0.5);
B14=B9/B13;
B15=Math.PI/4*B7*B7*B4;/*总流量面积TFA*/
$("B8").value="牙轮钻头选用"+B4+"个"+B7.toFixed(0)+"mm牙轮喷嘴";/*PDC水眼号*/
$("B9").value=B9.toFixed(2);
$("B10").value=B10.toFixed(2);/*喷射速度(m/s)*/
$("B11").value=B11.toFixed(2);/*射流冲击力*/
$("B14").value=B14.toFixed(2);/*比水功率*/
$("B12").value=B12.toFixed(2);/*喷射速度(m/s)*/
$("B15").value=B15.toFixed(2);/*总流量面积TFA*/
}
else if (B4>3 && B4<=12)
{
B6=Math.pow((0.081*B2*B3*B3/B1/B5/B5/(B4*B4)),0.25);
B7=B6*10;
B8=B7*32/25.4;
B9=0.081*B2*B3*B3*B3/B5/B5/B4/B4/B6/B6/B6/B6;
B10=1000*B3/(0.785*B4*B7*B7);
B11=B2*B10*B3;
B14=B9/B13;
B12=10*Math.pow((B4*B6),0.5);
B15=Math.PI/4*B7*B7*B4;/*总流量面积TFA*/
$("B7").value=B7.toFixed(2);/*水眼直径*/
$("B8").value="PDC钻头选用"+B4+"个"+B8.toFixed(0)+"号PDC喷嘴";/*PDC水眼号*/
$("B9").value=B9.toFixed(2);/*喷嘴水功率*/
$("B10").value=B10.toFixed(2);
$("B11").value=B11.toFixed(2);
$("B12").value=B12.toFixed(2);
$("B14").value=B14.toFixed(2);/*比水功率*/
$("B15").value=B15.toFixed(2);/*总流量面积TFA*/
}
else{alert("亲，你在逗我嘛!");}
}
/*123复合钻具卡点计算*/
function JS123(){
B1 = form1.B1.value;/*L1长度*/
B2 = form1.B2.value;/*上提拉力*/
B3 = form1.B3.value;/*弹性系数*/
B5 = form1.B5.value;/*L1外径*/
B6 = form1.B6.value;/*L1壁厚*/
D1 = form1.D1.value;/*L2长度*/
D5 = form1.D5.value;/*L2外径*/
D6 = form1.D6.value;/*L2壁厚*/
F1 = form1.F1.value;/*L3长度*/
F5 = form1.F5.value;/*L3外径*/
F6 = form1.F6.value;/*L3壁厚*/
I7 = form1.I7.value;/*△L*/
B2=B2*10;
B5=B5/10;
B6=B6/10;
B4=0.25*Math.PI*(B5*B5-(B5-2*B6)*(B5-2*B6));/*L1*/
D4=0.25*Math.PI*(D5*D5-(D5-2*D6)*(D5-2*D6))/100;/*L2*/
F4=0.25*Math.PI*(F5*F5-(F5-2*F6)*(F5-2*F6))/100;/*L3*/
B7=B1*10000*B2/(B3*B4);/*L1伸长量*/
D7=D1*10000*B2/(B3*D4);/*L2伸长量*/
F7=F1*10000*B2/(B3*F4);/*L3伸长量*/
L=parseFloat(B7)+parseFloat(D7)+parseFloat(F7);/*△L理论总伸长*/
L1=parseFloat(B7)+parseFloat(D7);
L2=B7;
if (I7>=L) /*卡点在钻头上*/
{
B12=parseFloat(B1)+parseFloat(D1)+parseFloat(F1);

$("B4").value=B4.toFixed(2);/*L1截面积*/
$("D4").value=D4.toFixed(2);/*L2截面积*/
$("F4").value=F4.toFixed(2);/*L3截面积*/
$("B7").value=B7.toFixed(2);/*卡点位置*/
$("D7").value=D7.toFixed(2);/*卡点位置*/
$("F7").value=F7.toFixed(2);/*卡点位置*/
$("B12").value=B12.toFixed(2);/*卡点位置*/
$("B14").value="卡点在钻头上";/*卡点在钻头上*/}
else if (I7<L && I7>=L1  ) /*卡点在第三段上*/
{
B10=I7-L1;
B11=B3*F4*B10/(1000000*B2);
B12=parseFloat(B1)+parseFloat(D1)+parseFloat(B11);


$("B4").value=B4.toFixed(2);/*L1截面积*/
$("D4").value=D4.toFixed(2);/*L2截面积*/
$("F4").value=F4.toFixed(2);/*L3截面积*/

$("B7").value=B7.toFixed(2);/*卡点位置*/
$("D7").value=D7.toFixed(2);/*卡点位置*/
$("F7").value=F7.toFixed(2);/*卡点位置*/
$("B12").value=B12.toFixed(2);/*卡点位置*/
$("B14").value="卡点位于第三段钻具上";/*卡点在第一段上*/}
else if (I7<L1 && I7>B7) /*卡点在第二段上*/
{
	M1=B7*B3*B4/(B2*10000);
M2=(I7-B7)*B3*D4/(B2*10000);
B12=parseFloat(M1)+parseFloat(M2);
$("B4").value=B4.toFixed(2);/*L1截面积*/
$("D4").value=D4.toFixed(2);/*L2截面积*/
$("F4").value=F4.toFixed(2);/*L3截面积*/
$("B7").value=B7.toFixed(2);/*L1伸长量*/
$("D7").value=D7.toFixed(2);/*L2伸长量*/
$("F7").value=F7.toFixed(2);/*L3伸长量*/
$("B12").value=B12.toFixed(2);/*卡点位置*/
$("B14").value="卡点位于第二段钻具上";/*卡点在第一段上*/}
else if(I7<=B7)
{
B12=I7*B3*B4/(B2*10000);
$("B4").value=B4.toFixed(2);/*L1截面积*/
$("D4").value=D4.toFixed(2);/*L2截面积*/
$("F4").value=F4.toFixed(2);/*L3截面积*/
$("B7").value=B7.toFixed(2);/*卡点位置*/
$("D7").value=D7.toFixed(2);/*卡点位置*/
$("F7").value=F7.toFixed(2);/*卡点位置*/
$("B12").value=B12.toFixed(2);/*卡点位置*/
$("B14").value="卡点位于第一段钻具上";/*卡点在第一段上*/}
}



/*124单弯造斜率的计算*/
function JS124(){
E16 = form1.E16.value;
E17 = form1.E17.value;
E18 = form1.E18.value;
E20 = form1.E20.value;
E21 = form1.E21.value;
E22 = form1.E22.value;
E23 = form1.E23.value;
E27 = form1.E27.value;
M1=parseFloat(E18)+parseFloat(E20);
M2=parseFloat(E18)+parseFloat(E20)+parseFloat(E16);
M3=parseFloat(E17)+parseFloat(E18)+parseFloat(E20);
E26=parseFloat((E20/M1)*(2*E16/M2)*30)+parseFloat(1.719*((E22-E23)/M1/M3-(E21-E22)/E17/M3));
E28=E26*E27;
$("E26").value=E26.toFixed(2);/*牙轮水眼直径*/
$("E28").value=E28.toFixed(2);/*牙轮水眼直径*/
}
/*125堵漏材料计算*/
function JS125(){
H4 = form1.H4.value;    /*第一种堵漏材料*/
H5 = form1.H5.value;    /*第二种堵漏材料*/
H6 = form1.H6.value;    /*第三种堵漏材料*/
H7 = form1.H7.value;    /*第四种堵漏材料*/
H8 = form1.H8.value;    /*钻井液量*/
H11=H4/H8*100;
H12=H5/H8*100;
H13=H6/H8*100;
H14=H7/H8*100;
H15=parseFloat(H4)+parseFloat(H5)+parseFloat(H6)+parseFloat(H7);
H16=H15/H8*100;
$("H11").value=H11.toFixed(2); /*第一种堵漏材料*/
$("H12").value=H12.toFixed(2);/*第二种堵漏材料*/
$("H13").value=H13.toFixed(2);/*第三种堵漏材料*/
$("H14").value=H14.toFixed(2);/*第四种堵漏材料*/
$("H15").value=H15.toFixed(2);/*堵漏材料总量*/
$("H16").value=H16.toFixed(2);/*堵漏剂浓度*/
}
/*126重晶石塞堵漏技术*/
function JS126(){
I7 = form1.I7.value;    /*体积*/
I8 = form1.I8.value;    /*密度*/
I9 = form1.I9.value;    /*密度*/
I14=I7*I9*(I8-1)/(I9-1);
I18=I7-I14/I9;
I17=I18*2;
I22=I14/I9;
$("I14").value=I14.toFixed(2);/*重晶石粉量*/
$("I18").value=I18.toFixed(2);/*水量*/
$("I17").value=I17.toFixed(2);/*聚合物量*/
$("I22").value=I22.toFixed(2);/*重晶石粉所占体积*/
}
/*127重晶石密度计算*/
function JS127(){
H5 = form1.H5.value;    /*加盖后称得密度值*/
yx2=800*H5/(1050-250*H5);
$("yx2").value=yx2.toFixed(2);  /*重晶石密度计算*/
if  (yx2<=4.04)
{$("P11").value="不合格！";}
else if (yx2>=4.05&& yx2<4.2)
{$("P11").value="二级";}
else if (yx2>=4.2&& yx2<4.3)
{$("P11").value="一级";}
else
{$("P11").value="特级";}
}
/*128滤饼压缩性计算*/
function JS128(){
H5 = form1.H5.value;
H6 = form1.H6.value;
H7 = form1.H7.value;
H8 = form1.H8.value;
H9 = form1.H9.value;
H10 = form1.H10.value;
H11 = form1.H11.value;
H14=H9/H6;
H15=0.7*Math.pow((H10/H7),0.5);
H16=parseFloat(H11/5*9)+parseFloat(32);
if (H14<2.5)
{
$("H14").value="比值为："+H14.toFixed(2)+"，缺水。";
}
else if(H14>3.3)
{
$("H14").value="比值为："+H14.toFixed(2)+"，偏高。";
}
else if(H14<3.3  && H14>2.5)
{
$("H14").value="比值为："+H14.toFixed(2)+"，合适。";
}
if (H15>1.3)
{
$("H15").value="值为："+H15.toFixed(2)+"，防止压差卡钻。";
}
else
{
$("H15").value="值为："+H15.toFixed(2)+"，合适。";
}
$("H16").value=H16.toFixed(2);
}
/*129补充cl-计算*/
function JS129(){
H6 = form1.H6.value;
H7 = form1.H7.value;
H8 = form1.H8.value;
H9 = form1.H9.value;
H10 = form1.H10.value;
H11 = form1.H11.value;
H12 = form1.H12.value;
H15=100-H7-H9;
H16=H6*H15/100;
H17=(parseFloat(H8)+parseFloat((100-H7-H9)*10)+parseFloat(H9*H12*10))/1000;
H23=parseFloat(H11)*0.00000109+parseFloat(1);
H19=parseFloat(H17)+parseFloat(H23-1);
H21=parseFloat(1)+parseFloat(0.00000109*H10);
H25=H10*1.65;
$("H16").value=H16.toFixed(2);
$("H17").value=H17.toFixed(2);
$("H19").value=H19.toFixed(2);
if (H23>1.2112)
{$("H27").value="数据有误";	}
else
{H27=(H16*2.17*(H23-H21))/(2.17-H23);
$("H27").value=H27.toFixed(2);
}
}
/*130求泵压*/
function JS130(){
B1 = form1.B1.value;
B3 = form1.B3.value;
B2 = form1.B2.value;
B4 = form1.B4.value;
B5 = form1.B5.value;
B6=B5*B2*B4*B4/B1/B1/B3;
$("B6").value=B6.toFixed(2);
}

/*131刚度计算*/
function JS131(){
B4 = form1.B4.value;
C4 = form1.C4.value;
D4 = form1.D4.value;
E4 = form1.E4.value;
F4 = form1.F4.value;
G4 = form1.G4.value;
B8 = form1.B8.value;
C9 = form1.C9.value;

C8=B8-2*C9;
B6=B4*B4*B4*B4-C4*C4*C4*C4;
E6=E4*E4*E4*E4-F4*F4*F4*F4;
D8=B8*B8*B8*B8-C8*C8*C8*C8;
var rd= document.getElementsByName('B15');
if  (rd[0].checked)
{ 
E10=(E6*G4+parseFloat(B6*D4))/(D8*(parseFloat(G4)+parseFloat(D4)));
if (E10>1)
{
$("E11").value="下套管安全";
}
else
{
$("E11").value="下套管不安全";
}
$("B6").value=B6.toFixed(2);
$("E6").value=E6.toFixed(2);
$("D8").value=D8.toFixed(2);
$("E10").value=E10.toFixed(3);
$("E11").value=E11.toFixed(2);
}

if  (rd[1].checked)
{ 
E10=(2*E6*G4+parseFloat(B6*D4))/(D8*(2*parseFloat(G4)+parseFloat(D4)));
if (E10>1)
{
$("E11").value="下套管安全";
}
else
{
$("E11").value="下套管不安全";
}
$("B6").value=B6.toFixed(2);
$("E6").value=E6.toFixed(2);
$("D8").value=D8.toFixed(2);
$("E10").value=E10.toFixed(3);
$("E11").value=E11.toFixed(2);
}

if  (rd[2].checked)
{ 
E10=(3*E6*G4+parseFloat(B6*D4))/(D8*(3*parseFloat(G4)+parseFloat(D4)));
if (E10>1)
{
$("E11").value="下套管安全";
}
else
{
$("E11").value="下套管不安全";
}
$("B6").value=B6.toFixed(2);
$("E6").value=E6.toFixed(2);
$("D8").value=D8.toFixed(2);
$("E10").value=E10.toFixed(3);
$("E11").value=E11.toFixed(2);
}
if  (rd[3].checked)
{ 
E10=(E6*G4+parseFloat(B6*D4))/(D8*(parseFloat(G4)+parseFloat(D4)));
if (E10>1)
{
$("E11").value="下套管安全";
}
else
{
$("E11").value="下套管不安全";
}
$("B6").value=B6.toFixed(2);
$("E6").value=E6.toFixed(2);
$("D8").value=D8.toFixed(2);
$("E10").value=E10.toFixed(3);
$("E11").value=E11.toFixed(2);
}


if  (rd[4].checked)
{ 
E10=(3*E6*G4+2*parseFloat(B6*D4))/(D8*(3*parseFloat(G4)+2*parseFloat(D4)));
if (E10>1)
{
$("E11").value="下套管安全";
}
else
{
$("E11").value="下套管不安全";
}
$("B6").value=B6.toFixed(2);
$("E6").value=E6.toFixed(2);
$("D8").value=D8.toFixed(2);
$("E10").value=E10.toFixed(3);
$("E11").value=E11.toFixed(2);
}


if  (rd[5].checked)
{ 
E10=(2*E6*G4+3*parseFloat(B6*D4))/(D8*(2*parseFloat(G4)+3*parseFloat(D4)));


if (E10>1)
{
$("E11").value="下套管安全";
}
else
{
$("E11").value="下套管不安全";
}
$("B6").value=B6.toFixed(2);
$("E6").value=E6.toFixed(2);
$("D8").value=D8.toFixed(2);
$("E10").value=E10.toFixed(3);
$("E11").value=E11.toFixed(2);
}
}


/*132底部钻具刚度比值*/
function JS132(){
D5 = form1.D5.value;
D4 = form1.D4.value;
D7 = form1.D7.value;
D9 = form1.D9.value;
D6=D5-2*D4;
D8=D7-2*D9;

D10=((D7*D7*D7*D7-D8*D8*D8*D8)/(D7/2))/((D5*D5*D5*D5-D6*D6*D6*D6)/(D5/2));
$("D10").value=D10.toFixed(2);
}
/*133工具角差计算*/
function JS133(){
C5 = form1.C5.value;
D5 = form1.D5.value;
C15 = form1.C15.value;
D15 = form1.D15.value;

E5=D5*360/C5;
E15=D15*360/C15;
F10=parseFloat(E5)+parseFloat(E15);
$("E5").value=E5.toFixed(2);
$("E15").value=E15.toFixed(2);
$("F10").value=F10.toFixed(2);
}


/*134硫化氢浓度计算*/
function JS134(){	
   C1 = form1.C1.value;
var rd= document.getElementsByName('B15');
   if  (rd[0].checked)
	{	
C2=	C1*34.08/22.4;
$("C2").value=C1+"ppm"+"="+C2.toFixed(2)+"mg/m3";		
}
   if  (rd[1].checked)
	{	
C2=C1*22.4/34.08;	
$("C2").value=C1+"mg/m3"+"="+C2.toFixed(2)+"ppm";		
}

}


/*135计算*/
function JS135(){
	B2 = form1.B2.value;/*目标倒开点井深*/
	 B1 = form1.B1.value;/*钻井液密度*/

	 B4 = form1.B4.value;/*钻具线重*/
	 B7 = form1.B7.value;/*游车大钩重量*/
	  B8 = form1.B8.value;/*齿合面积*/
	 B3=B1*B2*0.00981;
	 B5=B4*(1-B1/7.85);
	 B6=B5*B2/1000;
	 B9=B3*B8/100;
	 B10=parseFloat(B6)+parseFloat(B7)+parseFloat(B9);
	 $("B10").value=B10.toFixed(2);
	
}


/*136管串抗外挤计算*/
function JS136(){
	 
	 M29=form1.M29.value;/*钢级*/
	 M30 = form1.M30.value;/*直径*/
	 M31 = form1.M31.value;/*壁厚*/
	 Z89 = form1.Z89.value;/*上提吨位*/
	 K=M30/M31;
	M34=M30-2*M31;/*内径*/
	M35=0.07854*(M30*M30-M34*M34)*M29*6.89/1000;/*抗拉强度*/
	M36=0.875*2*M29*6.89*M31/M30;/*套管抗内压强度*/
if(M29==40){
		A1=813;
		BC1=18;
		F1=569;
		G1=9.0;
		   if  (K<16.4)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>16.4 && K<27.01) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>27.01 && K<42.64)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   	$("M33").value="过渡变形";
		   }
		   if (  K>42.64)
		   {		  
				M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			     	$("M33").value="弹性变形";
		   }
	 }  
	 
	 
	if(M29==50){
		A1=1026;
		BC1=25;
		F1=701;
		G1=12;
		K1=15.24;
		K2=25.63;
		K3=38.83;
		   if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }  
	 
	 if(M29==55){
		A1=1134;
		BC1=28.8;
		F1=754;
		G1=13.7;
		K1=14.81;
		K2=25.01;
		K3=37.21;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }  
	 
	  if(M29==60){
		A1=1243;
		BC1=32.8;
		F1=820;
		G1=15.4;
		K1=14.44;
		K2=24.42;
		K3=35.73;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }  
	 
	   if(M29==70){
		A1=1466;
		BC1=41.2;
		F1=957;
		G1=19.4;
		K1=13.85;
		K2=23.38;
		K3=33.17;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
			  
		   }
	 }  
	 
	 if(M29==75){
		A1=1579;
		BC1=45.6;
		F1=1029;
		G1=21.6;
		K1=13.6;
		K2=22.91;
		K3=32.05;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }  
	 
	 
	  if(M29==80){
		A1=1694;
		BC1=50.3;
		F1=1102;
		G1=23.9;
		K1=13.38;
		K2=22.47;
		K3=31.02;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }  
	 
	 if(M29==90){
		A1=1871;
		BC1=60.1;
		F1=1251;
		G1=28.9;
		K1=13.01;
		K2=21.69;
		K3=29.18;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }   
	 if(M29==95){
		A1=2046;
		BC1=65.2;
		F1=1329;
		G1=31.6;
		K1=12.85;
		K2=21.33;
		K3=28.36;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
			 
		   }
 
		   
		   
	 }   

 if(M29==100){
		A1=2167;
		BC1=70.5;
		F1=1406;
		G1=34.4;
		K1=12.7;
		K2=21;
		K3=27.6;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }    
	 
	 if(M29==105){
		A1=2289;
		BC1=76.1;
		F1=1486;
		G1=37.3;
		K1=12.57;
		K2=20.7;
		K3=26.89;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }    
	 
	 
	 if(M29==110){
		A1=2412;
		BC1=81.8;
		F1=1567;
		G1=40.3;
		K1=12.44;
		K2=20.41;
		K3=26.22;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }     
	 
	 
	  if(M29==120){
		A1=2663;
		BC1=93.7;
		F1=1731;
		G1=46.7;
		K1=12.21;
		K2=19.88;
		K3=25.01;
		 if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }  

	 if(M29==125){
		A1=2790;
		BC1=99.9;
		F1=1815;
		G1=50.2;
		K1=12.11;
		K2=19.63;
		K3=24.46;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }     
	 
	 if(M29==130){
		A1=2920;
		BC1=106.2;
		F1=1899;
		G1=53.7;
		K1=12.02;
		K2=19.40;
		K3=23.94;
		 if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	 }    

		 if(M29==135){
		A1=3051;
		BC1=112.9;
		F1=1985;
		G1=57.2;
		K1=11.92;
		K2=19.18;
		K3=23.44;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	    }     
		 if(M29==140){
		A1=3182;
		BC1=119.6;
		F1=2071;
		G1=61;
		K1=11.84;
		K2=18.97;
		K3=22.98;
		   if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	    }     
		 if(M29==150){
		A1=3450;
		BC1=133.5;
		F1=2248;
		G1=68.9;
		K1=11.67;
		K2=18.57;
		K3=22.11;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	    }     
		 if(M29==155){
		A1=3586;
		BC1=140.9;
		F1=2338;
		G1=73;
		K1=11.59;
		K2=18.37;
		K3=21.7;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	    }    

		 if(M29==160){
		A1=3723;
		BC1=148.3;
		F1=2429;
		G1=77.2;
		K1=11.52;
		K2=18.19;
		K3=21.32;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	    }     
		
		 if(M29==170){
		A1=3999;
		BC1=163.7;
		F1=2615;
		G1=86;
		K1=11.37;
		K2=17.82;
		K3=20.6;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	    }     
		
		 if(M29==180){
		A1=4280;
		BC1=179.8;
		F1=2806;
		G1=95.4;
		K1=11.23;
		K2=17.47;
		K3=19.93;
		  if  (K<K1)
		   { 
			M32=2*6.89*M29*(K-1)/(K*K);
		   $("M32").value=M32.toFixed(2);
		    $("M33").value="屈服变形";
		   }  
		   if (  K>K1 && K<K2) 
		   { 
			M32=A1/K-BC1;
			$("M32").value=M32.toFixed(2);
			$("M33").value="塑性变形";
		   }
		   if (K>K2 && K<K3)
		   {		  	
			  M32=F1*M31/M30-G1;
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="过渡变形";
		   }
		   if (  K>K3)
		   {		  
				
			M32=323.7088*1000/(K*(K-1)*(K-1))
			   $("M32").value=M32.toFixed(2);
			   $("M33").value="弹性变形";
		   }
	    }  
			 
Z85 = M30;/*外径*/
Z86 = M31;/*壁厚*/
Z87 = M29;/*钢级号*/

Z89=Z89*1000*9.81;
Z87=Z87*1000/145;
Z86=Z85-2*Z86;
Z88=0.577*Z87;
Z90=0.785*(Z85*Z85-Z86*Z86)  ;
Z91=0.012;
Z84=Math.PI/32*(Z85*Z85*Z85*Z85-Z86*Z86*Z86*Z86);
Z82=0.096167*Z84*Z91/Z85*Math.pow((Z87*Z87-Z89*Z89/(Z90*Z90)),0.5)/1000;

		
		
 $("M35").value=M35.toFixed(2);
 $("M36").value=M36.toFixed(2);
 $("Z82").value=Z82.toFixed(2);/*抗扭*/
}


/*137计算套管回缩距*/
function JS137(){
	
	 C6 = form1.C6.value;
	 C7 = form1.C7.value;
	 C8 = form1.C8.value;
	 C9 = form1.C9.value;
	 C10 = form1.C10.value;
	 C11 = form1.C11.value;/*设计悬挂井深*/
	 C12 = form1.C12.value;
	 /*C13 = form1.C13.value;*/
	 C14 = form1.C14.value;
	 C15 = form1.C15.value;/*尾管外径*/
	 C16 = form1.C16.value;/*尾管壁厚*/
	/* C17 = form1.C17.value;尾管单重*/
	/* C18= form1.C18.value;尾管单位容积*/
	 C19 = form1.C19.value;/*钻杆外径*/
	 C20 = form1.C20.value;/*钻杆壁厚*/
	/* C21 = form1.C21.value;*/
	/*C22 = form1.C22.value;钻杆单位容积*/
	 C23 = form1.C23.value;/*套管坐挂憋压*/
	 C24= form1.C24.value;
	 C25= form1.C25.value;/*吊卡高度*/
	 C26 = form1.C26.value;/*接箍高度*/
	 C27= form1.C27.value;
	 C28 = form1.C28.value;
	 C29 = form1.C29.value;
	 C30 = form1.C30.value;
	 C5=2.059*100000000000;/*钢材弹性模量*/
	 C13=C11;
	 C33=(C19*C19-(C19-2*C20)*(C19-2*C20))*0.785;/*钻杆横截面积*/
	 C34=(C19-2*C20)*(C19-2*C20)*0.785;/*钻杆内横截面积*/
	 C17= 0.00002466*1*(C15-C16)*C16*1.023*1000;    /*套管单重*/
	 	 C21= 0.00002466*1*(C19-C20)*C20*1.023*1000;    /*套管单重*/
	 C18=0.785*(C15-2*C16)*(C15-2*C16)/1000;/*尾管单位容积L/M*/
	 C35=C17*(1-C14/7.8)*C12/1000;/*套管浮重*/
	 C38=C34/10000*C23;
     C37=C27*(parseFloat(C24)+parseFloat(C38)+parseFloat(C35))*1000*9.8*C11/(C33/1000000*C5);
	 C40=parseFloat(C37)+parseFloat(C26)+parseFloat(C25*2);
	 C22=0.785*(C19-C20*2)*(C19-C20*2)/1000;
	 C43=C11*C22/1000;
	 C44=(C29-C11)*C18/1000;
	 C45=C28*C28*0.785*(C6-C8)/1000000-C15*C15*0.785*(C6-C8)/1000000;
	 C46=(C9-2*C10)*(C9-2*C10)*0.000785*C30/100-C15*C15*0.000785*C30/100;
	     $("C33").value=C33.toFixed(2);
	 	 $("C34").value=C34.toFixed(2);
	     $("C35").value=C35.toFixed(2);
	 	 $("C37").value=C37.toFixed(2);
		 $("C38").value=C38.toFixed(2);
		 $("C40").value=C40.toFixed(2);
		 $("C43").value=C43.toFixed(2);
		 $("C44").value=C44.toFixed(2);
		 $("C45").value=C45.toFixed(2);
	     $("C46").value=C46.toFixed(2);
			
}
/*138排代量计算*/
function JS138(){
B1 = form1.B1.value;/*钻具外径*/
B2 = form1.B2.value;/*钻具壁厚*/
B3 = form1.B3.value;/*柱长*/
B4 = form1.B4.value;/*柱数*/
B6=B1-2*B2;
B7=0.785*B6*B6*B3*B4/1000000;/*内容积*/
B8=0.785*B1*B1*B4/1000000*B3;/*闭排*/
B9=B8-B7;/*开排*/

$("B7").value=B7.toFixed(2);
$("B8").value=B8.toFixed(2);
$("B9").value=B9.toFixed(3);
}

/*139螺杆转速计算*/
function JS139(){
B1 = form1.B1.value;/*理论排量*/
B2 = form1.B2.value;/*理论转数*/
B3 = form1.B3.value;/*实际排量*/

B4=B2*B3/B1;

$("B4").value=B4.toFixed(2);

}

/*140螺杆输出功率计算*/
function JS140(){
B1 = form1.B1.value;/*螺杆工作压降*/
B2 = form1.B2.value;/*螺杆转数*/
B3 = form1.B3.value;/*实际排量*/

B4=B1*B3*9.55*0.95/B2;
B5=B1*B3;
$("B4").value=B4.toFixed(3);
$("B5").value=B5.toFixed(2);

}
/*141械机功率计算*/
function JS141(){
B1 = form1.B1.value;/*扭矩*/
B2 = form1.B2.value;/*转数*/
B3=B1*B2/9.55;

$("B3").value=B3.toFixed(2);

}
/*142起钻每柱液面下降距离*/
function JS142(){
I5 = form1.I5.value;/*井径*/
I6 = form1.I6.value;/*外径*/
I7 = form1.I7.value;/*壁厚*/
I8 = form1.I8.value;/*柱数*/
I9 = form1.I9.value;/*柱长*/
I4 = form1.I4.value;/*钻井液密度*/
I5=I5/1000;
I11=(I6-2*I7)/1000;
I10=0.785*((I6*I6/1000000)-I11*I11)*I8*I9/(0.785*I5*I5);
I11=0.785*I5*I5*I10;
I12=I4*0.00981*I10;/*压力下降*/
$("I10").value=I10.toFixed(2);
$("I11").value=I11.toFixed(2);
$("I12").value=I12.toFixed(2);

}


/*143起钻每柱液面下降距离*/
function JS143(){
H1 = form1.H1.value;/*钻头位置*/
H2 = form1.H2.value;/*上层套管下深m*/
H3 = form1.H3.value;/*套管外径*/
H4 = form1.H4.value;/*套管壁厚*/
H5 = form1.H5.value;/*钻头直径*/
H6= form1.H6.value;/*钻柱1外径*/

H7 = form1.H7.value;/*钻柱1壁厚*/
H8 = form1.H8.value;/*钻柱1长度*/
H9= form1.H9.value;/*钻柱2外径*/
H10= form1.H10.value;/*钻柱2壁厚*/
A1=form1.A1.value;/*排量*/
H11=H1-H8;/*钻柱2长度m*/
H12=(H3-2*H4)/1000;/*套管内径m*/
H5=H5/1000;/*钻头直径m*/

H13=(0.785*H6*H6-0.785*(H6-2*H7)*(H6-2*H7))*H8/1000000;/*钻柱1体积m³*/
H14=0.785*(H6-2*H7)*(H6-2*H7)*H8/1000000;/*钻柱1内容积*/

H15=(0.785*H9*H9-0.785*(H9-2*H10)*(H9-2*H10))*H11/1000000;/*钻柱2体积*/
H16=0.785*(H9-2*H10)*(H9-2*H10)*H11/1000000;/*钻柱2内容积*/


	B1=parseFloat(0.785*H12*H12*H2)+parseFloat(0.785*H5*H5*(H1-H2));/*空井总容积*/
	H17=0.785*H12*H12*H2-0.785*H9*H9*H2/1000000;/*套管内环容*/
	H18=0.785*H5*H5*(H1-H2)-0.785*H6*H6*(H8-H2)/1000000-0.785*H9*H9*(H1-H8)/1000000;/*裸眼段环空容积*/
	B2=parseFloat(H13)+parseFloat(H15);/*钻柱体积*/
	B3=parseFloat(H14)+parseFloat(H16);/*钻柱内容积*/
	
	B4=B1-B2-B3;/*环容*/
	B5=B1-B2;/*内容+环空容积*/
	
	
	B8=B4/(A1*60/1000);/*上返时间*/
	B9=B3/(A1*60/1000);/*下行时间*/
	B10=B8+B9;/*循环周时间*/
	B6=H1/B8/60;
	B7=H1/B9/60;
	$("B1").value=B1.toFixed(2);
    $("B2").value=B2.toFixed(2);
    $("B3").value=B3.toFixed(2);
	$("B4").value=B4.toFixed(2);
	$("B5").value=B5.toFixed(2);
 $("B8").value=B8.toFixed(2);
	$("B9").value=B9.toFixed(2);
	$("B10").value=B10.toFixed(2);
	$("B6").value=B6.toFixed(2);
	$("B7").value=B7.toFixed(2);


}

/*144通径规直径计算*/
function JS144(){
B1 = form1.B1.value;/*外径*/
B2 = form1.B2.value;/*壁厚*/

if(B1<=339.7 &&B1>244.5)
{B3=B1-2*B2-5*25.4/32;
$("B3").value=B3.toFixed(2);
$("B4").value="规板长度大于等于305mm，厚度大于等于10mm";
}

if(B1<=244.5)
{B3=B1-2*B2-4*25.4/32;
$("B3").value=B3.toFixed(2);
$("B4").value="规板长度大于等于152mm，厚度大于等于8mm";
}

if(B1>339.7 )
{B3=B1-2*B2-6*25.4/32;
$("B3").value=B3.toFixed(2);
$("B4").value="规板长度大于等于305mm，厚度大于等于10mm";
}

}


/*145套管回缩距计算*/
function JS145(){
	C1 = form1.C1.value;/*钻井液密度*/
    C2 = form1.C2.value;/*套管总长*/
	C3 = form1.C3.value;/*钢的密度*/
    C4 = form1.C4.value;/*封固段长度*/
    C5 = form1.C5.value;/*钢材系数*/
	C6=C2-C4;/*自由段长度*/
	C11=form1.C11.value;/*接箍长度*/
	C7=form1.C7.value;/*吊卡长度*/
	C8=form1.C8.value;/*活塞长度*/
	
	
C9=(C6/C5/10)*(C4*C3-C1*C2);
C10=parseFloat(C9)+parseFloat(C11)+parseFloat(2*C7)+parseFloat(C8);

	$("C9").value=C9.toFixed(3);
	$("C10").value=C10.toFixed(3);
}


/*146套管回缩距计算*/
function JS146(){
	B1 = form1.B1.value;/*钻井液密度*/
    B2 = form1.B2.value;/*套管总长*/
	B3 = form1.B3.value;/*钢的密度*/
    B4 = form1.B4.value;/*封固段长度*/
   
B5=B2*0.785*B1*B1/1000000/0.00981;
B6=B5*1000/B3/(1-B4/7.85);

	$("B5").value=B5.toFixed(2);
	$("B6").value=B6.toFixed(2);
}
/*147轴向受力最大允许转动圈数*/
function JS147(){
	E2=form1.E2.value;/*钢级*/
	E4=form1.E4.value;/*轴向拉力t*/
	B1 = form1.B1.value;/*钻柱长度*/
	B3 = form1.B3.value;/*外径*/
    B4 = form1.B4.value;/*壁厚*/
  B5=84000;/*剪切弹性模量*/ 
  E3=E2*6.89; 
  B6=E4*1000;
  B2=E3*0.577;
  B7=0.785*(B3*B3-(B3-2*B4)*(B3-2*B4));
  B8=(1000*B1*B2/3.14159/B3/B5)*Math.pow((1-100*B6*B6/(3*B7*B7*B2*B2)),0.5);
  B9=B8*0.8;

    $("B2").value=B2.toFixed(2);
	$("B7").value=B7.toFixed(2);
	$("B8").value=B8.toFixed(2);
	$("B9").value=B9.toFixed(2);
}

/*148循环压耗计算*/
function JS148(){

	B5=form1.B5.value;/*排量*/
	C5=form1.C5.value/*密度*/
	E5=form1.E5.value;/*Φ300*/
	F5=form1.F5.value;/*Φ600*/
  
    B9=form1.B9.value;
    C9=form1.C9.value;
    E9=form1.E9.value;
    F9=form1.F9.value;
   
     B10=form1.B10.value;
     C10=form1.C10.value;
	 D10=form1.D10.value;
     E10=form1.E10.value;
 
 
    B11=form1.B11.value;
    C11=form1.C11.value;
    E11=form1.E11.value;
 
   
     B12=form1.B12.value;
     C12=form1.C12.value;
	 D12=form1.D12.value;
     E12=form1.E12.value;
    F12=form1.F12.value;

	
	B13=form1.B13.value;
    C13=form1.C13.value;
    E13=form1.E13.value;
 
   
     B14=form1.B14.value;
     C14=form1.C14.value;
	 D14=form1.D14.value;
     E14=form1.E14.value;
     F14=form1.F14.value;
	

 
   
     B15=form1.B15.value;
     C15=form1.C15.value;

     E15=form1.E15.value;
     F15=form1.F15.value;
	 
	    C17=form1.C17.value;

     E17=form1.E17.value;
	 I16=form1.I16.value;
	 
	F10=F9;
	F11=F12;
	F13=F14;
    H5=0.51655;
    I5=0.57503;
    J5=0.57503;
   
    G5=(F5-E5)/1000;
    G9=B5/((C9/100*(C9/100)*Math.PI/4*10));/*钻杆1内流速*/
    H9=B5/(((F9/100)*(F9/100)-(B9/100))*Math.PI/4*10);/*钻杆1环空返速*/
   I9=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E9/(Math.pow((C9/10),4.8));
   J9=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E9/((F9/10-B9/10)*(F9/10-B9/10)*(F9/10-B9/10)*Math.pow((parseFloat(F9/10)+parseFloat(B9/10)),1.8));
   
    G10=B5/((C10/100)*(C10/100)*Math.PI/4*10);
    H10=B5/(((F10/100)*(F10/100)-(B10/100))*Math.PI/4*10);
    I10=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E10/(Math.pow((C10/10),4.8));
	J10=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E10/((F10/10-B10/10)*(F10/10-B10/10)*(F10/10-B10/10)*Math.pow((parseFloat(F10/10)+parseFloat(B10/10)),1.8));
	
	G11=B5/((C11/100)*(C11/100)*Math.PI/4*10);
	H11=B5/(((F11/100)*(F11/100)-(B11/100))*Math.PI/4*10);
	I11=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E11/(Math.pow((C11/10),4.8));
	J11=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E11/((F11/10-B11/10)*(F11/10-B11/10)*(F11/10-B11/10)*Math.pow((parseFloat(F11/10)+parseFloat(B11/10)),1.8));
	
	
	G12=B5/((C12/100)*(C12/100)*Math.PI/4*10);
    H12=B5/(((F12/100)*(F12/100)-(B12/100))*Math.PI/4*10);
    I12=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E12/(Math.pow((C12/10),4.8));
	J12=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E12/((F12/10-B12/10)*(F12/10-B12/10)*(F12/10-B12/10)*Math.pow((parseFloat(F12/10)+parseFloat(B12/10)),1.8));
	
		G13=B5/((C13/100)*(C13/100)*Math.PI/4*10);
	H13=B5/(((F13/100)*(F13/100)-(B13/100))*Math.PI/4*10);
	I13=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E13/(Math.pow((C13/10),4.8));
	J13=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E13/((F13/10-B13/10)*(F13/10-B13/10)*(F13/10-B13/10)*Math.pow((parseFloat(F13/10)+parseFloat(B13/10)),1.8));
	
	
	G14=B5/((C14/100)*(C14/100)*Math.PI/4*10);
    H14=B5/(((F14/100)*(F14/100)-(B14/100))*Math.PI/4*10);
    I14=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E14/(Math.pow((C14/10),4.8));
	J14=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E14/((F14/10-B14/10)*(F14/10-B14/10)*(F14/10-B14/10)*Math.pow((parseFloat(F14/10)+parseFloat(B14/10)),1.8));
	
	
	G15=B5/((C15/100)*(C15/100)*Math.PI/4*10);
    H15=B5/(((F15/100)*(F15/100)-(B15/100))*Math.PI/4*10);
    I15=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E15/(Math.pow((C15/10),4.8));
	J15=(I5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E15/((F15/10-B15/10)*(F15/10-B15/10)*(F15/10-B15/10)*Math.pow((parseFloat(F15/10)+parseFloat(B15/10)),1.8));	
	
	
	I17=(H5*Math.pow(G5,0.2)*Math.pow(C5,0.8)*Math.pow(B5,1.8))*E17/(Math.pow((C17/10),4.8));
	I18=parseFloat(I9)+parseFloat(I10)+parseFloat(I11)+parseFloat(I12)+parseFloat(I13)+parseFloat(I14)+parseFloat(I15)+parseFloat(I16)+parseFloat(I17);
	J18=parseFloat(J9)+parseFloat(J10)+parseFloat(J11)+parseFloat(J12)+parseFloat(J13)+parseFloat(J14)+parseFloat(J15);
	I19=parseFloat(I18)+parseFloat(J18);
    $("G5").value=G5.toFixed(2);
	$("G9").value=G9.toFixed(2);
	$("H9").value=H9.toFixed(2);
	$("I9").value=I9.toFixed(2);
	$("J9").value=J9.toFixed(2);
	$("G10").value=G10.toFixed(2);
	$("H10").value=H10.toFixed(2);
	$("I10").value=I10.toFixed(2);
	$("J10").value=J10.toFixed(2);
	
	
	$("G11").value=G11.toFixed(2);
	$("H11").value=H11.toFixed(2);
	$("I11").value=I11.toFixed(2);
	$("J11").value=J11.toFixed(2);
	
	$("G12").value=G12.toFixed(2);
	$("H12").value=H12.toFixed(2);
	$("I12").value=I12.toFixed(2);
	$("J12").value=J12.toFixed(2);
	
	
	$("G13").value=G13.toFixed(2);
	$("H13").value=H13.toFixed(2);
	$("I13").value=I13.toFixed(2);
	$("J13").value=J13.toFixed(2);
	
	$("G14").value=G14.toFixed(2);
	$("H14").value=H14.toFixed(2);
	$("I14").value=I14.toFixed(2);
	$("J14").value=J14.toFixed(2);
	
	
	$("G15").value=G15.toFixed(2);
	$("H15").value=H15.toFixed(2);
	$("I15").value=I15.toFixed(2);
	$("J15").value=J15.toFixed(2);

	
	
	$("I18").value=I18.toFixed(2);
	$("J18").value=J18.toFixed(2);
	$("I19").value=I19.toFixed(2);
	
}



/*149复合钻具压缩距的计算*/
function JS149(){
	
	B1 = form1.B1.value;/*井口加压*/
	B2 = form1.B2.value;/*钻杆1外径*/
	B3 = form1.B3.value;/*钻杆1壁厚*/
    B4 = form1.B4.value;/*钻杆1长度*/
	
	E2 = form1.E2.value;/*钻杆2外径*/
	E3 = form1.E3.value;/*钻杆2壁厚*/
    E4 = form1.E4.value;/*钻杆3长度*/
	B6=B2/1000;
	B7=(B2-2*B3)/1000;
	B8=0.785*(B6*B6-B7*B7)*210000;
	B9=B4*B1/B8/100;
	
	E6=E2/1000;
	E7=(E2-2*E3)/1000;
	E8=0.785*(E6*E6-E7*E7)*210000;
	E9=E4*B1/E8/100;
	B11=parseFloat(B9)+parseFloat(E9);
	B12=parseFloat(B4)+parseFloat(E4);
  

    $("B9").value=B9.toFixed(3);
	$("E9").value=E9.toFixed(3);
	$("B11").value=B11.toFixed(3);
	$("B12").value=B12.toFixed(2);

}


/*150网格方位修正*/
function JS150(){
	
	N7 = form1.N7.value;/*磁方位*/
	N8 = form1.N8.value;/*方位修正角*/
	N9=parseFloat(N7)+parseFloat(N8);
	$("N9").value=N9.toFixed(2);
	
}
/*151泥浆泵输入输出功率计算*/
function JS151(){
	
	N1 = form1.N1.value;/*泵压*/
	N2 = form1.N2.value;/*排量*/
	N3 = form1.N3.value;/*机械效率*/
	if (N3<=1 &&N3>0  )
{
	N4=N1*N2; 
	N5=N4/N3;
$("N4").value=N4.toFixed(1);/*kw*/
$("N5").value=N5.toFixed(1);/*KW*/
}
else{alert("亲，你在逗我嘛!");	}
}
	
	
/*152单弯螺杆马达角度选择*/
function JS152(){
	
	G20 = form1.G20.value;/*L1*/
	F20 = form1.F20.value;/*L2*/
	E20 = form1.E20.value;/*L3*/
	
	G10 = form1.G10.value;/*L1*/
	F10 = form1.F10.value;/*L2*/
	E10 = form1.E10.value;/*L3*/
	
	F26 = form1.F26.value;/*L2*/
	F27 = form1.F27.value;/*L3*/

	F35=F26*F27;
	F36=(F35-1791*((F10-E10)/1000/(parseFloat(F20)+parseFloat(E20))/(parseFloat(G20)+parseFloat(F20)+parseFloat(E20))-(G10-F10)/1000/G20/(parseFloat(G20)+parseFloat(F20)+parseFloat(E20))))*(parseFloat(F20)+parseFloat(E20))*(parseFloat(G20)+parseFloat(F20)+parseFloat(E20))/E20/60;
	F33=60*F36/(parseFloat(G20)+parseFloat(F20)+parseFloat(E20));
	F34=E20/(parseFloat(F20)+parseFloat(E20))*F33;

$("F33").value=F33.toFixed(2);/*kw*/
$("F34").value=F34.toFixed(2);/*KW*/
$("F35").value=F35.toFixed(2);/*KW*/
$("F36").value=F36.toFixed(2);/*KW*/

if (F36<=0.75 )
{
	$("E38").value=0.75;	
}	
if (F36<=1  &&F36>0.75) 
{$("E38").value=1;	}
if (F36<=1.5  &&F36>1) 
{$("E38").value=1.5;	}
if (F36<=1.75  &&F36>1.5) 
{$("E38").value=1.75;	}
if (F36<=2  &&F36>1.75) 
{$("E38").value=2;	}
if (F36<=2.25  &&F36>2) 
{$("E38").value=2.25;	}
if (F36<=2.5  &&F36>2.25) 
{$("E38").value=2.5;	}
if (F36<=2.75  &&F36>2.5) 
{$("E38").value=2.75;	}
if (F36<=3  &&F36>2.75) 
{$("E38").value=3;	}
if (F36>3) 
{$("E38").value="无解";	}

}

/*153造斜率计算*/
function JS153(){
	
	H1 = form1.H1.value;/*测深*/
	H2 = form1.H2.value;/*井斜*/
	H3 = form1.H3.value;/*测深*/
	H4 = form1.H4.value;/*井斜*/
	
	H5=30*(H4-H2)/(H3-H1);
	H6=10*(H4-H2)/(H3-H1);
	$("H5").value=H5.toFixed(2);
	$("H6").value=H6.toFixed(2);
	
}

/*154盐水总量计算*/
function JS154(){
	
	A3 = form1.A3.value;/*测深*/
	C3 = form1.C3.value;/*井斜*/
	D3 = form1.D3.value;/*测深*/
	E3 = form1.E3.value;/*井斜*/
	B3=(A3-E3)*D3/(1-A3/C3);
	
	F3=parseFloat(D3)+(B3/C3);
	
	$("B3").value=B3.toFixed(2);
	$("F3").value=F3.toFixed(2);
	
}



/*155复合钻具钻杆允许扭转圈数的计算*/
function JS155(){
	
	B2 = form1.B2.value;/*888*/
	B3 = form1.B3.value;/*8888*/
	B4 = form1.B4.value;/*8888*/
	B5 = form1.B5.value;/*8888*/
	B6 = form1.B6.value;/*8888*/
	B7 = form1.B7.value;/*8888*/
	B8 = form1.B8.value;/*8888*/
	B9 = form1.B9.value;/*8888*/
	B10 = form1.B10.value;/*8888*/
	B11 = form1.B11.value;/*8888*/
	B12 = form1.B12.value;/*8888*/
	B13 = form1.B13.value;/*8888*/
	
	
	B15=0.785*(B4*B4-B5*B5);
	B16=0.785*(B8*B8-B9*B9);
	
	
	
	B17=3.142*(Math.pow(B4,4)-Math.pow(B5,4))/32;
	B18=3.142*(Math.pow(B8,4)-Math.pow(B9,4))/32;
	
	B19=B7*1000/145;
	B20=B11*1000/145;
	
	
	
    B21=B12*B6*9.81*(1-B3/7.85);
	B22=B13*B10*9.81*(1-B3/7.85);
	
	B23=parseFloat(B21)+B2*9.81*1000;
	B24=parseFloat(B22)+B2*9.81*1000;
	
	B25=0.01154*B17*Math.pow(((100*B19/1.5)*(100*B19/1.5)-(B23/B15)*(B23/B15)),0.5)/B4;
	B26=0.01154*B18*Math.pow(((100*B20/1.5)*(100*B20/1.5)-(B24/B16)*(B24/B16)),0.5)/B8;
	
	
	 if (  B25>B26 )
		   {		  
	    B27=B26*B6/(7.854*100*B17);
	    B28=B26*B10/(7.854*100*B18);
	    B29=(parseFloat(B27)+parseFloat(B28))/2/3.14;
	    $("B27").value=B27.toFixed(2);
	     $("B28").value=B28.toFixed(2);
		 	$("B29").value=B29.toFixed(2);
		   }
	
	
      if ( B26 >B25 )
		   {		  
	    B27=B25*B6/(7.854*100*B17);
	    B28=B25*B10/(7.854*100*B18);
				B29=(parseFloat(B27)+parseFloat(B28))/2/3.14;
	     $("B27").value=B27.toFixed(2);
	     $("B28").value=B28.toFixed(2);
		 	$("B29").value=B29.toFixed(2);
		 
		   }
	
	

	
	
	
	$("B15").value=B15.toFixed(2);
	$("B16").value=B16.toFixed(2);
	$("B17").value=B17.toFixed(2);
	$("B18").value=B18.toFixed(2);
	
	
	$("B19").value=B19.toFixed(2);
	$("B20").value=B20.toFixed(2);
	$("B21").value=B21.toFixed(2);
	$("B22").value=B22.toFixed(2);
	$("B23").value=B23.toFixed(2);
	$("B24").value=B24.toFixed(2);
	$("B25").value=B25.toFixed(2);
	$("B26").value=B26.toFixed(2);
	

	
}



/*156下行时间计算*/
function JS156(){
	
	B3 = form1.B3.value;/*测深*/
	B4 = form1.B4.value;/*井斜*/
	B5= form1.B5.value;/*测深*/
	B6= form1.B6.value;/*井斜*/
	
	B7= form1.B7.value;/*测深*/
	B8 = form1.B8.value;/*井斜*/
	B9= form1.B9.value;/*测深*/
	
	B2=2*B7*B6*B6*(B4-B5)/(36*B3);
	B1=(B9/B2)*B8/60;

	$("B1").value=B1.toFixed(2);
	$("B2").value=B2.toFixed(2);
	
}
/*157平横盐层钻进所需钻井液密度图版*/
function JS157(){
	B4 = form1.B4.value;/*井深*/
	
var rd= document.getElementsByName('B15');
if  (rd[0].checked)
{ 
D10=0.22012+parseFloat(0.0005846*B4)-0.0000000842*B4*B4+parseFloat(0.000000000006*B4*B4*B4)-Math.pow(10,-16)*1.7065*B4*B4*B4*B4;
$("D10").value=D10.toFixed(2);
}/*50℃*/
	
	

if  (rd[1].checked)

{ 
D10=0.35857+parseFloat(0.0006565*B4)-0.00000011675*B4*B4+parseFloat(0.0000000000103838*B4*B4*B4)-Math.pow(10,-16)*3.6597*B4*B4*B4*B4;
$("D10").value=D10.toFixed(2);
}  /*75℃*/
	


if  (rd[2].checked)
{ 
D10=0.91782+parseFloat(0.0003983*B4)-0.000000062246*B4*B4+parseFloat(0.00000000000508965*B4*B4*B4)-Math.pow(10,-16)*1.7274*B4*B4*B4*B4;
$("D10").value=D10.toFixed(2);
}/*100℃*/
	


if  (rd[3].checked)
{ 
D10=1.06443+parseFloat(0.00041607*B4)-0.0000000779962*B4*B4+parseFloat(0.0000000000076376*B4*B4*B4)-Math.pow(10,-16)*2.98987*B4*B4*B4*B4;
$("D10").value=D10.toFixed(2);
}/*125℃*/
	

if  (rd[4].checked)
{ 
D10=1.50563+parseFloat(0.00020427*B4)-0.000000027883*B4*B4+parseFloat(0.0000000000021035*B4*B4*B4)-Math.pow(10,-17)*7.23707*B4*B4*B4*B4;
$("D10").value=D10.toFixed(2);
}/*150℃*/
	

if  (rd[5].checked)
{ 
D10=1.81552+parseFloat(0.000120575*B4)-0.0000000154511*B4*B4+parseFloat(0.00000000000113962*B4*B4*B4)-Math.pow(10,-17)*4.2988*B4*B4*B4*B4;
$("D10").value=D10.toFixed(2);
}/*175℃*/
	
	
if  (rd[6].checked)
{ 
D10=1.84801+parseFloat(0.000164922*B4)-0.0000000214518*B4*B4+parseFloat(0.000000000000845573*B4*B4*B4)-Math.pow(10,-18)*6.937*B4*B4*B4*B4;
$("D10").value=D10.toFixed(2);
}/*200℃*/
	

if  (rd[7].checked)
{ 
D10=1.78355+parseFloat(0.0003437*B4)-0.00000008678*B4*B4+parseFloat(0.000000000009453*B4*B4*B4)-0.0000000000000003732*B4*B4*B4*B4;
$("D10").value=D10.toFixed(2);
}/*225℃*/	


	
}


/*158加量计算*/
function JS158(){
	
	B1 = form1.B1.value;/*方数*/
	B2 = form1.B2.value;/*浓度*/
	B3= form1.B3.value;/*袋重*/
	
	
	B4=B1*B2*10;
	B5=B4/B3;

if (B2<=100 &&B2>0  )
{
	$("B4").value=B4.toFixed(0);
	$("B5").value=B5.toFixed(0);
}
else{alert("亲，你在逗我嘛!");	}
	
}


/*159P-HAR因子*/
function JS159(){
	
	N1 = form1.N1.value;/*井眼直径*/
	N2 = form1.N2.value;/*钻杆直径*/

	
	N3=N1*N1/(N2*N2);

	$("N3").value=N3.toFixed(2);
	
	
if (N3>3.25  )
{
	$("N4").value="符合大井眼法则";
	$("N5").value=(N1/25.4).toFixed(0)+"～"+(1.2*N1/25.4).toFixed(0);
	$("N6").value="转速120～180rpm";
}
else{$("N4").value="符合小井眼法则";}

	$("N5").value=(0.8*N1/25.4).toFixed(0)+"～"+(N1/25.4).toFixed(0);
	$("N6").value="转速60～120rpm";
}



/*160P-压井口重浆量计算*/
function JS160(){
	
	
	B2 = form1.B2.value;/*钻杆直径*/
    B3 = form1.B3.value;/*井眼直径*/
	B4 = form1.B4.value;/*钻杆直径*/
	B5 = form1.B5.value;/*钻杆直径*/
	D5=0.785*(B5/1000)*(B5/1000);
	B6=B2/(B3-B4)/0.00981;
    B7=B6*D5;
	
	B8=(B3/B4-1)*B7/D5;
	
	B9=(B3/B4-1)*B7;
	$("B6").value=B6.toFixed(2);
	$("B7").value=B7.toFixed(2);
	$("B8").value=B8.toFixed(2);
    $("B9").value=B9.toFixed(2);
	
}




/*161打重浆冒的计算*/
function JS161(){
	
	B1 = form1.B1.value;/*钻杆直径*/
	E2 = form1.E2.value;/*钻杆直径*/
	B2 = form1.B2.value;/*钻杆直径*/
    B3 = form1.B3.value;/*井眼直径*/
	B4 = form1.B4.value;/*钻杆直径*/
	
	B5=B3-B4;
	B6=B5*0.00981*E2;
	E1=0.785*B1*B1/1000000;
	
	B7=B6/(B2-B4)/0.00981;
	B8=B7*E1;
	
	$("B6").value=B6.toFixed(2);
	$("B7").value=B7.toFixed(2);
	$("B8").value=B8.toFixed(2);
}


/*162注水泥附加压力计算*/
function JS162(){
	
	B1 = form1.B1.value;/*钻杆直径*/
	
	B2 = form1.B2.value;/*钻杆直径*/
    B3 = form1.B3.value;/*井眼直径*/
	B4 = form1.B4.value;/*钻杆直径*/
	
	B5=0.785*B4*B4*B1*(B2-B3)/1000;
	
	
	$("B5").value=B5.toFixed(2);
	
}

/*163理论岩屑量计算*/
function JS163(){
	N1 = form1.N1.value;/*钻杆直径*/
	N2 = form1.N2.value;/*钻杆直径*/
  
	N3=0.785*N1*N1*N2/1000000;
	$("N3").value=N3.toFixed(2);
	
}

/*164套管下缩距的计算*/
function JS164(){
	B1 = form1.B1.value;/*钻杆直径*/
	B2 = form1.B2.value;/*钻杆直径*/
	
	B4 = form1.B4.value;/*钻杆直径*/
	B5 = form1.B5.value;/*钻杆直径*/
	B6 = form1.B6.value;/*钻杆直径*/
	
	B3 =parseFloat(B1)+parseFloat(B2);
	B7=B1*(B2*B4-B3*B5)/B6/10;
	$("B3").value=B3.toFixed(2);
	$("B7").value=B7.toFixed(2);
	
}



/*165无扶螺杆造斜率的计算*/
function JS165(){
	H17 = form1.H17.value;/*钻杆直径*/
	H18 = form1.H18.value;/*钻杆直径*/
	H19= form1.H19.value;/*钻杆直径*/
	H20 = form1.H20.value;/*钻杆直径*/
	H21= form1.H21.value;/*钻杆直径*/
	H22= form1.H22.value;/*钻杆直径*/
	H23 = form1.H23.value;/*钻杆直径*/
	H24= form1.H24.value;/*钻杆直径*/
	
	
	C17 = H17;/*钻杆直径*/
	C18 =H18/0.0254;/*钻杆直径*/
	C19 =H19/0.0254;/*钻杆直径*/
	C20 =H20/0.0254/1000;/*钻杆直径*/
	C21 =H21/1000/0.0254;/*钻杆直径*/
	C22 =H22/0.0254/1000;/*钻杆直径*/
	C23 =H23/0.0254/100;/*钻杆直径*/
	C24 = H24;/*钻杆直径*/
	
	C25=((parseFloat(C19)+parseFloat(C18)+parseFloat(C23))/(2*Math.sin(C17/57.3)-(C20-(parseFloat(C21)+parseFloat(2*C22)))/(parseFloat(C18)+parseFloat(C23))))/12;
	C26=C24*100/(0.017453*C25);

	H25=C25*0.3048;
	H26=C26*30/30.48;
	
	
	if (H24<=1 &&H24>0  )
{
  $("H25").value=H25.toFixed(2);
	$("H26").value=H26.toFixed(2);
}
else{alert("亲，你在逗我嘛!");	}

	
}




/*166单弯螺杆造斜率的计算*/
function JS166(){
	H17 = form1.H17.value;/*钻杆直径*/
	H18 = form1.H18.value;/*钻杆直径*/
	H19= form1.H19.value;/*钻杆直径*/
	H20 = form1.H20.value;/*钻杆直径*/
	H21= form1.H21.value;/*钻杆直径*/
	H22= form1.H22.value;/*钻杆直径*/
	H23 = form1.H23.value;/*钻杆直径*/
	H24= form1.H24.value;/*钻杆直径*/
	H25= form1.H25.value;/*钻杆直径*/
	

	C17 = H17;
	C18 =H18/0.0254;
	C19 =H19/0.0254;
	
	
	C20 =H20/0.0254;
	C21 =H21/25.4;
	C22 =H22/25.4;
	C23 =H23/25.4;
	C24 =H24/2.54;
	C25=H25;
	C26=C19-C18;
	
	C27=57.296*Math.atan(((C22-C23)/2)/C26);
	C28=Math.sqrt(((C22-C23)/2)*((C22-C23)/2)+parseFloat((parseFloat(C20)+parseFloat(C26))*(parseFloat(C20)+parseFloat(C26))));
    C29=Math.sqrt(((C22-C23)*(C22-C23)/4)+parseFloat(C26*C26));
	C30=57.2956*Math.acos((C20*C20+parseFloat(C29*C29)-C28*C28)/(2*C20*C29));
	C31=Math.sqrt(parseFloat(C20*C20)+parseFloat(C29*C29)-2*C20*C29*Math.cos((parseFloat(C30)+parseFloat(C17))/57.2956));
	C32=Math.atan(((C21-C22)/2)/(parseFloat(C24)+parseFloat(C18)))*57.2956;
	C33=Math.atan(C26/((C22-C23)/2))*57.2956;
	C34=57.2956*Math.acos((parseFloat(C31*C31)+parseFloat(C20*C20)-C29*C29)/(2*C31*C20));
	
	

	
	
	C35=parseFloat(C30)+parseFloat(C17)+parseFloat(C34)-C33-90-C32;
	C36=((C21-C22)/2)/Math.sin(C32/57.2959);
	C37=(parseFloat(C31)+parseFloat(C36))/(24*Math.sin(C35/57.2956));
	C38=C25*1200/(0.209*C37);
	

	C37=C37*0.3048;
	C38=C38*30/30.48;


if (C25<=1 &&C25>0  )
{
	

    $("C37").value=C37.toFixed(2);
	$("C38").value=C38.toFixed(2);

}
else{alert("亲，你在逗我嘛!");	}

	
}
	




/*167双扶螺杆造斜率的计算*/
function JS167(){
	H17 = form1.H17.value;/*螺杆度数*/
	H18 = form1.H18.value;/*螺杆底端到下扶正器中间距离（m）*/
	H19= form1.H19.value;/*螺杆底端到弯点距离（m）*/
	H20 = form1.H20.value;/*弯点到上扶正器中间距离（m）*/
	H21= form1.H21.value;/*钻头外径（mm）*/
	H22= form1.H22.value;/*下扶正器外径（mm）*/
	H23 = form1.H23.value;/*上扶扶正器外径（mm）*/
	H24= form1.H24.value;/*螺杆外径（mm）*/
	H25= form1.H25.value;/*钻头长度（cm）*/
	H26= form1.H26.value;/*修正系数*/
	
	
	C17 = H17;
	C18 =H18/0.0254;
	C19 =H19/0.0254;
	
	C20 =H20/0.0254;
	C21 =H21/25.4;
	C22 =H22/25.4;
	C23 =H23/25.4;
	C24 =H24/25.4;
	C25 =H25/2.54;
	C26=H26;
	
	

	
	C27=C19-C18;
	
	C28=Math.sqrt(((C23-C22)*(C23-C22)/4)+parseFloat((C20+C27)*(C20+C27)));
	 
	C29=Math.sqrt(C20*C20+parseFloat(((C23-C24)*(C23-C24)/4)));
	
	C30=Math.sqrt(((C22-C24)*(C22-C24)/4)+parseFloat(C27*C27));
	
	C31=57.2956*Math.acos((C29*C29+parseFloat(C30*C30)-C28*C28)/(2*C29*C30));
		
	C32=Math.sqrt(C29*C29+parseFloat(C30*C30)-2*C29*C30*Math.cos((parseFloat(C31)+parseFloat(C17))/57.2956));
	C33=Math.atan(((C21-C22)/2)/(parseFloat(C25)+parseFloat(C18)))*57.2956;
	C34=Math.atan(C27/((C22-C24)/2))*57.2956;
	C35=57.2956*Math.acos((parseFloat(C32*C32)+parseFloat(C29*C29)-C30*C30)/(2*C32*C29));
	C36=parseFloat(C31)+parseFloat(C17)+parseFloat(C35)-C34-90-C33;
	C37=((C21-C22)/2)/Math.sin(C33/57.2959);
	
	C38=(C32+parseFloat(C37))/(24*Math.sin(C36/57.2956));
	C39=C26*1200/(0.209*C38);
	
	
	C38=C38*0.3048;
	C39=C39*30/30.48;

if (C26<=1 &&C26>0  )
{
	
   
    $("C38").value=C38.toFixed(2);
	$("C39").value=C39.toFixed(2);

}
else{alert("亲，你在逗我嘛!");	}

	
}
	
	
	
	
/*168钟摆钻具扶正器最优位置计算*/
function JS168(){
	D1 = form1.D1.value;/*螺杆度数*/
	D3 = form1.D3.value;/*螺杆底端到下扶正器中间距离（m）*/
	D4= form1.D4.value;/*螺杆底端到弯点距离（m）*/
	D6= form1.D6.value;/*钻头外径（mm）*/
	
	D8 = form1.D8.value;/*螺杆底端到下扶正器中间距离（m）*/
	D9= form1.D9.value;/*螺杆底端到弯点距离（m）*/
	D10= form1.D10.value;/*钻头外径（mm）*/
    D11=2.0594*100000000;
	
	D2=D3*(1-D4/7.8);
	D7=(D8/1000-D9/1000)/2;


	D12=Math.PI*(Math.pow((D9/1000),4)-Math.pow((D10/1000),4))/64;
	
	B1=Math.PI*Math.PI*D2*Math.sin(D1*Math.PI/180);
	B2=82.04*D6*D7;
	B3=184.6*Math.PI*Math.PI*D11*D12*D7;
	
	B4=Math.pow((Math.pow((parseFloat(B2*B2)+parseFloat(4*B1*B3)),0.5)-B2/2*B1),0.5);
	
   
    $("B4").value=B4.toFixed(2);
	
    $("B5").value="当井斜" +D1+"°，钻压" +D6+ "kN，扶正器区间在"+ (B4*0.9).toFixed(2)+"~"+(B4*0.95).toFixed(2);


	
}
	
		
	
	
	
/*169井漏失返后钻井液面的计算*/
function JS169(){
	B4 = form1.B4.value;/*螺杆度数*/
	B5 = form1.B5.value;/*螺杆底端到下扶正器中间距离（m）*/
	B6= form1.B6.value;/*螺杆底端到弯点距离（m）*/
	B7= form1.B7.value;/*钻头外径（mm）*/
	D4 = form1.D4.value;/*螺杆度数*/
	
	D5=1-(B5/7.8);
	D6=B6*(1-D5);
	D7=B7*B7*3.14/4/1000;
	B8=D7*B5;
	D8=parseFloat(D6)+parseFloat(B8);
	F4=D4-B4;
	
	
	F6=F4/(D6/1000);
	F8=F4/(D8/1000);
   
    $("F6").value=F6.toFixed(2);
	
    $("F8").value=F8.toFixed(2);;


	
}
	
	
/*170六转读数的最优值*/
function JS170(){
	B4 = form1.B4.value;/*井眼尺寸*/
	B5=B4/25.4;
	 $("B6").value="六转最优值："+ (B5*0.8).toFixed(0)+"~"+(B5*1).toFixed(1);

}
	
	
/*171六转读数的最优值*/
function JS171(){
	B4 = form1.B4.value;/*井眼尺寸*/
	B5 = form1.B5.value;/*水平段长*/
	
	B6=B4-B5*0.75;
	B7=B4-B5*0.95
	
	 $("B8").value= B7.toFixed(2)+"~"+B6.toFixed(2);

}	
	
	

/*172钻铤长度的确定*/
function JS172(){
	B1 = form1.B1.value;/*设计最大钻压kN*/
	B2 = form1.B2.value;/*安全系数*/
	B3 = form1.B3.value;/*钻铤线重*/
	B4 = form1.B4.value;/*井斜角*/
	B5 = form1.B5.value;/*钻井液密度*/
	B6=1-B5/7.85;
	B7=B2*B1*10/B3/B6/Math.cos(B4);
    $("B7").value= B7.toFixed(2);

}		
	
	
/*173环容的计算*/
function JS173(){
	B1 = form1.B1.value;/*钻头直径*/
	B2 = form1.B2.value;/*钻具外径*/
	B3 = form1.B3.value;/*长度*/
	
	B4=B1/1000;
	B5=B2/1000;
	
	B6=0.785*(B4*B4-B5*B5)*B3;
	B7=B6*1000;
    $("B6").value= B6.toFixed(2);
	  $("B7").value= B7.toFixed(1);

}		





/*JS174*/
function JS174(){
B5 = form1.B5.value;    /*套管总长*/
B6 = form1.B6.value;     /*套管外径*/
B7 = form1.B7.value;     /*套管壁厚*/
B16 = form1.B16.value;     /*套管壁厚*/

var rd= document.getElementsByName('B15');
if  (rd[0].checked)
{ 

B8=(65.5-B7)/65.5;
B9=B5*(parseFloat(1)+parseFloat((B6/100)))/B8;
$("B8").value=B8.toFixed(2); 
$("B9").value=B9.toFixed(2); 
}


if  (rd[1].checked)
{ 

B8=(65.5-B7)/65.5;
B9=B5*(parseFloat(1)+parseFloat((B6/100)))/(B8*Math.cos(B16*Math.PI/180))


$("B8").value=B8.toFixed(2); 
$("B9").value=B9.toFixed(2); 
}



}
		
/*JS175*/
function JS175(){
	
B4 = form1.B4.value;     
B5 = form1.B5.value;    
B6 = form1.B6.value;    
B7 = form1.B7.value;     
B10=(parseFloat((B4*B5))+parseFloat((141.4296*0.0001*B7*B6*B6)))/(parseFloat(B5)+parseFloat((6.7995*0.0001*B7*B6*B6)));
$("B10").value=B10.toFixed(3); 

}



		
/*JS176*/
function JS176(){
	
B2 = form1.B2.value;     
B3 = form1.B3.value;    
B4 = form1.B4.value;    

B5=B4/(B2/42);
B6=B4/B3;

$("B5").value=B5.toFixed(2); 
$("B6").value=B6.toFixed(0); 
}	



/*JS177*/
function JS177(){
	
  
B3 = form1.B3.value;    
B4 = form1.B4.value;  
B5 = form1.B5.value;     

B6=(B4/(0.052*(B3-B5)));

$("B6").value=B6.toFixed(0); 
}	




/*JS178*/
function JS178(){
	
  
B3 = form1.B3.value;    
B4 = form1.B4.value;  
B5 = form1.B5.value;     
B6 = form1.B6.value;  
B7 = form1.B7.value;  

B8=B7/B6;
B9=(B3-B4)*0.052*B8;
B10=B3-(B9/0.052/B5);


$("B8").value=B8.toFixed(2); 
$("B9").value=B9.toFixed(2);
$("B10").value=B10.toFixed(2);  
}	


/*JS179*/
function JS179(){
	
  
B3 = form1.B3.value;    
B4 = form1.B4.value;  
B5  =B3-B4;
B6 =B3/B4;

$("B5").value=B5.toFixed(2); 
$("B6").value=B6.toFixed(2); 
}	


/*JS180*/
function JS180(){
	
  
B3 = form1.B3.value;    
B4 = form1.B4.value;  
B5 = form1.B5.value;    
B6 = form1.B6.value; 
B7 = form1.B7.value; 
B8=B4-(B5-B4);
B9=parseFloat(B3)+parseFloat(0.1*B8/(B6-B7));



$("B8").value=B8.toFixed(2); 
$("B9").value=B9.toFixed(2); 
}	


/*JS181*/
function JS181(){
	
     
B4 = form1.B4.value;  
B5 = form1.B5.value;    
B6 = form1.B6.value; 

B7=(1-(B4/100))*B5*B5*B6/1029.4;
B8=(1-(B4/100))*B5*B5*B6/24.49;
B9=(1-(B4/100))*B5*B5*B6/1469.4;

$("B7").value=B7.toFixed(2); 
$("B8").value=B8.toFixed(2); 
$("B9").value=B9.toFixed(2); 
}	



/*JS182*/
function JS182(){
	
  
B3 = form1.B3.value;    
B4 = form1.B4.value;  
B5 = form1.B5.value;    
B6 = form1.B6.value; 
B7 = form1.B7.value; 
B8 = form1.B8.value; 

B9=(24.5*B8)/(B6*B6-B7*B7);
B10=B5-B4;
B11=B4-(B5-B4);
B12=parseFloat(B3)+parseFloat((0.1/(B6-B7))*(B11+(B10*B9)/(300*(B6-B7))));


$("B9").value=B9.toFixed(2); 
$("B10").value=B10.toFixed(2); 
$("B11").value=B11.toFixed(2); 
$("B12").value=B12.toFixed(2); 
}	



/*JS183*/
function JS183(){
	

B4 = form1.B4.value;  
B5 = form1.B5.value;    
B6 = form1.B6.value; 
B7 = form1.B7.value; 
B8 = form1.B8.value; 
B9 = form1.B9.value; 
B10=B7*(B5-(B6/(0.052*B8))-B4)/(B9*B9*(141.4296*0.0001-(6.7995*0.0001*(B5-(B6/(0.052*B8))))));

$("B10").value=B10.toFixed(2); 
}	



/*JS184*/
function JS184(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value;  
B5 = form1.B5.value;    
B6=(parseFloat(B4)+parseFloat(B5))/2;

B7=B5-B6;

B8=(B3/100)*(B7/100)*0.83;

$("B6").value=B6.toFixed(2); 
$("B7").value=B7.toFixed(2); 
$("B8").value=B8.toFixed(2); 
}	




/*JS185*/
function JS185(){
B5 = form1.B5.value;    
B6 = form1.B6.value;     
B7 = form1.B7.value; 
   
B13 = form1.B13.value;     
B14 = form1.B14.value; 
var rd= document.getElementsByName('B15');
if  (rd[0].checked)
{ 

B8=(B5/300/B6)*B7;

$("B8").value=B8.toFixed(2); 
}

if  (rd[1].checked)
{ 

B8=B5*B7/(300*(B14-B13));

$("B8").value=B8.toFixed(2); 

}

}



/*JS186*/
function JS186(){
B3 = form1.B3.value;    
B4 = form1.B4.value;     
B5 = form1.B5.value; 
   
B11 = form1.B11.value;     


var rd= document.getElementsByName('B15');
if  (rd[0].checked)
{ 

B6=0.000243*B4*B4*B5*(B3/100);

$("B6").value=B6.toFixed(4); 
}


if  (rd[1].checked)
{ 
B6=0.000162*B5*((2*B4*B4)-B11*B11)*B3/100;


$("B6").value=B6.toFixed(4); 

}



}






/*JS187*/
function JS187(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value;  
B5 =B3/(B4*0.052); 
 
$("B5").value=B5.toFixed(2); 
}



/*JS188*/
function JS188(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 = form1.B6.value; 
B7=B3-(B4*(B6-B5)*0.052); 
 
$("B7").value=B7.toFixed(2); 
}		



/*JS189*/
function JS189(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value;  
B5 =B3/B4; 
 
$("B5").value=B5.toFixed(2); 
}


/*JS190*/
function JS190(){
	
B3 = form1.B3.value;   
B4=12*Math.exp(-0.37*B3);
B5=B4*60*60;
$("B4").value=B4.toFixed(2); 
$("B5").value=B5.toFixed(2); 
}



/*JS191*/
function JS191(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 = form1.B6.value; 
B7=B6-((B3-B4)/(0.052*B5)); 
 
 $("B7").value=B7.toFixed(2); 
 if  (B7<=3)
{$("B8").value="Gas Influx";}
else if (B7>3&& B7<=7)
{$("B8").value="Oil Influx or Combination between gas and oil kick";}
else
{$("B8").value="Water Kick";}

}	



/*JS192*/
function JS192(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   

B6=B3*B4/B5;

 $("B6").value=B6.toFixed(2); 
}	



/*JS193*/
function JS193(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   

B6=parseFloat(B3)+parseFloat(0.052*B4*B5);

 $("B6").value=B6.toFixed(2); 
}	



/*JS194*/
function JS194(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   

B6=((B3*0.052)/B4)*B5;

 $("B6").value=B6.toFixed(2); 
}	



/*JS195*/
function JS195(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value; 
 

B5=parseFloat(B3)+parseFloat(B4);

 $("B5").value=B5.toFixed(2); 
}	




/*JS196*/
function JS196(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 = form1.B6.value; 

B7=(B3/B4)*(B5-B6);


 $("B7").value=B7.toFixed(2); 
}	

/*JS197*/
function JS197(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6=Math.round(parseFloat(B4)+parseFloat((B3/(0.052*B5))),1);
$("B6").value=B6.toFixed(2); 
}	


/*JS198*/
function JS198(){
	
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 = form1.B6.value;  
B7=(B4*B4-B5*B5)/1029.4;
B8=B3*B7/(0.052*B6);
$("B7").value=B7.toFixed(4); 
$("B8").value=B8.toFixed(2); 
}	

/*JS199*/
function JS199(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6=0.052*(parseFloat(B3)+parseFloat(B4))*B5;

$("B6").value=B6.toFixed(2); 

}	



/*JS200*/
function JS200(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6=B3/(B4-B5);

$("B6").value=B6.toFixed(2); 

}	



/*JS201*/
function JS201(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6=0.052*(B3-B4)*B5;

$("B6").value=B6.toFixed(2); 

}	



/*JS202*/
function JS202(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 = form1.B6.value;  
B7=4*Math.pow(((B3*B4*B6/B5)),0.5);

$("B7").value=B7.toFixed(2); 

}	



/*JS203*/
function JS203(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 = form1.B6.value;  
B7=0.2*Math.pow(((B3*B4*B5/B6)),0.5);

$("B7").value=B7.toFixed(2); 

}	


/*JS204*/
function JS204(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 

B5=0.052*B3*B4;

$("B5").value=B5.toFixed(2); 

}	



/*JS205*/
function JS205(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 = form1.B6.value;  
B7=(B4*B4-B5*B5)/1029.4;
B8=B3*B7/(0.052*B6);

$("B7").value=B7.toFixed(4); 
$("B8").value=B8.toFixed(2); 

}



/*JS206*/
function JS206(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   

B6=B3*B5/B4;

$("B6").value=B6.toFixed(2); 

}	



/*JS207*/
function JS207(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   

B6=B3*(B5/B4)*(B5/B4);

$("B6").value=B6.toFixed(2); 

}	


/*JS208*/
function JS208(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 = form1.B6.value;
B7 = form1.B7.value;    
B8=((parseFloat(B3)+parseFloat(B4))*B5-(B4*B6))/(B7-B3-B4);

$("B8").value=B8.toFixed(2); 

}


/*JS209*/
function JS209(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 = form1.B6.value;
  B7=(B3-B4)/(parseFloat(B5)+parseFloat(B6));

$("B7").value=B7.toFixed(2); 

}


/*JS210*/
function JS210(){
B3 = form1.B3.value;   
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 =B3/((11.7*(B4-B5)));


$("B6").value=B6.toFixed(2); 

}


/*JS211*/
function JS211(){
  
B4 = form1.B4.value; 
B5 = form1.B5.value;   
B6 = form1.B6.value;
B7 = form1.B7.value;    
B8=B4/((B5/B6)-(B5/B7));

$("B8").value=B8.toFixed(2); 

}




/*JS212*/
function JS212(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 =(B3-B4)/2;    
B7=B6*0.8;   
B8=Math.PI/4*(B3*B3-B4*B4);
B9=Math.PI/4*((parseFloat(B4)+parseFloat((2*B7)))*(parseFloat(B4)+parseFloat((2*B7)))-(B4)*(B4));
B10=B8*B5;
B11=B9*B5;
$("B6").value=B6.toFixed(3); 
$("B7").value=B7.toFixed(3); 
$("B8").value=B8.toFixed(3); 
$("B9").value=B9.toFixed(3); 
$("B10").value=B10.toFixed(3); 
$("B11").value=B11.toFixed(3); 

}



/*JS213*/
function JS213(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;

B6 = form1.B6.value; 
B7 = form1.B7.value;   
B8= form1.B8.value;
B9= form1.B9.value;

B10=B6*B6/1029.4;
B11=(B6*B6-B7*B7)/1029.4;
B12=(B6*B6-B9*B9)/1029.4;
B13=B3/B10;

if  (B11*B8>B3)
{
	B14=B3/B11;
}
else 
{B14=parseFloat(B8)+parseFloat(((B3-(B11*B8))/B12));}

B15=(B14-B13)*0.052*(B4-B5);
$("B10").value=B10.toFixed(3); 
$("B11").value=B11.toFixed(3); 
$("B12").value=B12.toFixed(3); 
$("B13").value=B13.toFixed(3); 
$("B14").value=B14.toFixed(3); 
$("B15").value=B15.toFixed(3); 

}




/*JS214*/
function JS214(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value;   
B8= form1.B8.value;
B9= form1.B9.value;


B11=B6*B5*B5/1029.4;
B12=B6-(B8*1029.4)/(parseFloat(B3*B3-B4*B4)+parseFloat(B5*B5));
B13=B6-(B8*1029.4)/(B3*B3);
B14=B12*B5*B5/1029.4;

if  (B11>B8)
{   B14=B12*B5*B5/1029.4;
	B16=parseFloat(B8)+parseFloat(B7);
	B17=parseFloat(B11-B8)+parseFloat(B9);

B19=B14-B17;

$("B11").value=B11.toFixed(1); 
$("B12").value=B12.toFixed(1); 
$("B13").value=B13.toFixed(1); 
$("B14").value=B14.toFixed(1); 
$("B16").value=B16.toFixed(1); 
$("B17").value="Displace (bbl)"+"～"+B17.toFixed(1); 
$("B18").value="String Out"; 
$("B19").value=B19.toFixed(1); 

}
else 
{	
B16=parseFloat(B8)+parseFloat(B11);

B18=B8-B11;
B19=parseFloat(B14)+parseFloat(B9);

$("B11").value=B11.toFixed(1); 
$("B12").value=B12.toFixed(1); 
$("B13").value=B13.toFixed(1); 
$("B14").value=B14.toFixed(1); 
$("B16").value=B16.toFixed(1); 
$("B17").value="String Out"; 
$("B18").value="Pump Cement (bbl)"+"～"+B18.toFixed(1); 
$("B19").value=B19.toFixed(1); 
}


}



/*JS215*/
function JS215(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value;   
B8 = form1.B8.value;
B10=B6*B5*B5/1029.4;
B11=B6-(B7*1029.4)/(parseFloat(B3*B3-B4*B4)+parseFloat(B5*B5));
B12=B6-(B7*1029.4)/(B3*B3);
B13=B11*B5*B5/1029.4;
B15=parseFloat(B7);

$("B10").value=B10.toFixed(1); 
$("B11").value=B11.toFixed(1); 
$("B12").value=B12.toFixed(1); 
$("B13").value=B13.toFixed(1); 
$("B15").value=B15.toFixed(1); 
$("B16").value=(parseFloat(B13)+parseFloat(B8)).toFixed(1); 
}





/*JS216*/
function JS216(){

  
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value; 

B12 = form1.B12.value;   
B13 = form1.B13.value;
B14 = form1.B14.value; 
B15 = form1.B15.value; 


B17 = form1.B17.value;
B18 = form1.B18.value; 
B19 = form1.B19.value; 


B8=B5*(B7/B6)*(B7/B6);
B16=Math.log(B12/B14,10)/Math.log(B13/B15,10);
B20=B17*Math.pow((B19/B18),B16);


$("B8").value=B8.toFixed(1); 
$("B16").value=B16.toFixed(3); 
$("B20").value=B20.toFixed(1); 


}



/*JS217*/
function JS217(){

  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6=(B3*B4)/B5;
$("B6").value=B6.toFixed(1); 

B9 = form1.B9.value;   
B10 = form1.B10.value;



B15 = form1.B15.value; 
B16 = form1.B16.value; 

B17 = form1.B17.value;
B18 = form1.B18.value; 



B11=(B9*B9-B10*B10)*0.7854*2500;
B19=(B15*((B17*B17-B18*B18)*0.7854*2500)/B16);


$("B11").value=B11.toFixed(3); 
$("B19").value=B19.toFixed(1); 


}



/*JS218*/
function JS218(){

  

B4 = form1.B4.value;   
B5 = form1.B5.value;
B6=0.321*B4/B5;


  
B10 = form1.B10.value;
B11 = form1.B11.value; 
B12=Math.pow(((1239*B11)/B10),0.5);

$("B6").value=B6.toFixed(2); 
$("B12").value=B12.toFixed(2); 

}



/*JS219*/
function JS219(){
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 =(36*B3)/(B4*B5);
$("B6").value=B6.toFixed(2); 
}


/*JS220*/
function JS220(){
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6=(B4*B5)/1714;
$("B6").value=B6.toFixed(2); 
}



/*JS221*/
function JS221(){
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6=(B4*1.273)/(B5*B5);
$("B6").value=B6.toFixed(2); 
}



/*JS222*/
function JS222(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value;   

B8=Math.pow((((3470-(1370*B3))*100*B4*Math.pow(((parseFloat(2*B3)+parseFloat(1))/(3*B3)),B3))/(928*B5*(B6-B7)*Math.pow((144/(B6-B7)),(1-B3)))),(1/(2-B3)));
B9=2.45*B8*(B6*B6-B7*B7);

$("B8").value=B8.toFixed(2); 
$("B9").value=B9.toFixed(2); 
}



/*JS223*/
function JS223(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 =Math.pow((108.5*B3*B4/(B5*B6)),0.5);   


$("B7").value=B7.toFixed(2); 

}


/*JS224*/
function JS224(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 =3.322*Math.log10((parseFloat(2*B5)+parseFloat(B6))/(parseFloat(B5)+parseFloat(B6)));   

B8=Math.pow(511,(1-B7))*(parseFloat(B5)+parseFloat(B6));
B9=B8*B4*B3/400000;

if (B9>=1  )
{
if  (B8<=4.75)
{B12=parseFloat(2);}
else if (B8>=4.75&& B8<=6.75)
{B12=parseFloat(2.2);}
else if (B8>6.75&& B8<=7.75)
{B12=parseFloat(2.3);}

else if( B8>7.75&& B8<=11)
{B12=parseFloat(2.4);}

else
{B12=parseFloat(2.5);}
}
else{$("B10").value="Good Hole Cleaning";	}



$("B7").value=B7.toFixed(2); 
$("B8").value=B8.toFixed(2); 
$("B9").value=B9.toFixed(2); 
 
}





/*JS225*/
function JS225(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value; 

B8=24.51*B7/(B5*B5-B6*B6)/60;
B9=100*B3*Math.pow(((144*B8)/(B5-B6)),(B4-1));

$("B8").value=B8.toFixed(2); 
$("B9").value=B9.toFixed(2); 

}



/*JS226*/
function JS226(){
B3 = form1.B3.value;   
B4 = form1.B4.value;   
B5 =(B4*B3)/1714;
$("B5").value=B5.toFixed(2); 
}






/*JS227*/
function JS227(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value; 
B8 = form1.B8.value; 
B9 = form1.B9.value; 
B11=(24.5*B3)/(B4*B4-B5*B5);
B12=0.45*(B6/(B7*B8))*(Math.pow(((36800/((B6/(B7*B8))*(B6/(B7*B8)))*B8*((B9/B7)-1)+1)),0.5)-1);

B13=B11-B12;
if (B13>=0  )
{
$("B13").value=B13.toFixed(3)+"～"+"Good";
}
else{$("B13").value=B13.toFixed(3)+"～"+"bad";	}

$("B11").value=B11.toFixed(2); 
$("B12").value=B12.toFixed(2);

}



/*JS228*/
function JS228(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value; 
B8 = form1.B8.value; 
B9 = form1.B9.value; 
B10 = form1.B10.value; 


B12=3.32*Math.log10(B4/B3);
B13=B3/(Math.pow(511,B12));
B15=24.5*B5/(B6*B6-B7*B7);
B14=Math.pow(((2.4*B15/(B6-B7))*((parseFloat(2*B12)+parseFloat(1))/(3*B12))),B12)*((200*B13*(B6-B7))/B15);
B16=(Math.pow((B9-B10),0.667)*175*B8)/(Math.pow(B10,0.333)*Math.pow(B14,0.333));
$("B12").value=B12.toFixed(2);
$("B13").value=B13.toFixed(2);
$("B14").value=B14.toFixed(2);
$("B15").value=B15.toFixed(2); 
$("B16").value=B16.toFixed(2);
 B17=B15-B16;
if (B17>=0  )
{
$("B17").value=B17.toFixed(3)+"～"+"Good";
}
else{$("B17").value=B17.toFixed(3)+"～"+"bad";	}
}



/*JS229*/
function JS229(){
 
B4 = form1.B4.value;   
B5 = form1.B5.value; 
B6 = form1.B6.value;  
B7=B4*B5*B6/1930;


B11 = form1.B11.value;   
B12 = form1.B12.value; 
B13 = form1.B13.value; 

B14=0.0173*B11*(Math.pow((B12*B13),0.5));


$("B7").value=B7.toFixed(2); 
$("B14").value=B14.toFixed(2); 
}




/*JS230*/
function JS230(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value; 
B8 = form1.B8.value; 
B9 = form1.B9.value; 



B10=6.1/(Math.pow(B4,4.86));
B11=6.1/Math.pow(B6,4.86);
B12=0.00001*B3*B10*B7*(Math.pow(B8/B7,0.14))*Math.pow(B9,1.86);
B13=0.00001*B5*B11*B7*(Math.pow(B8/B7,0.14))*Math.pow(B9,1.86);
B14=parseFloat(B13)+parseFloat(B12);
$("B10").value=B10.toFixed(4);
$("B11").value=B11.toFixed(4);
$("B12").value=B12.toFixed(2);
$("B13").value=B13.toFixed(2);
$("B14").value=B14.toFixed(2);
}



/*JS231*/
function JS231(){
B2 = form1.B2.value;   
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value; 
B6 =0.00001*B2*B3*Math.pow((B4/B3),1.4)*Math.pow(B5,1.86);

$("B6").value=B6.toFixed(2); 

}



/*JS232*/
function JS232(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value; 
B8 = form1.B8.value; 
B9 = form1.B9.value; 
B10 = form1.B10.value;



B11=parseFloat(5.68/Math.pow(B4,4.86))+parseFloat(0.41/(Math.pow(B5,4.86)));


B12=7.2/Math.pow(B7,4.86);
B13=0.00001*B3*B11*B8*(Math.pow((B9/B8),0.14))*Math.pow(B10,1.86);
B14=0.00001*B6*B12*B8*(Math.pow((B9/B8),0.14))*Math.pow(B10,1.86);
B15=parseFloat(B14)+parseFloat(B13);
$("B11").value=B11.toFixed(4);
$("B12").value=B12.toFixed(4);
$("B13").value=B13.toFixed(2);
$("B14").value=B14.toFixed(2);
$("B15").value=B15.toFixed(2);
}


/*JS233*/
function JS233(){
B3 = form1.B3.value;   
B4 = form1.B4.value;   
B5 =0.5*Math.log10(B3/B4);
B6=(5.11*B3/(Math.pow(511,B5)));


$("B5").value=B5.toFixed(3); 
$("B6").value=B6.toFixed(3); 
}



/*JS234*/
function JS234(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value; 
B8 = form1.B8.value; 

B9=(928*B3*(B4-B5)*B6)/(B7*Math.pow(((parseFloat(2*B8)+parseFloat(1))/(3*B8)),B8));


$("B9").value=B9.toFixed(2); 

}



/*JS235*/
function JS235(){
B3 = form1.B3.value;   
  
B4 =12.72*Math.pow(B3,1.47);
$("B4").value=B4.toFixed(2); 
}



/*JS236*/
function JS236(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value; 
B8 = form1.B8.value; 
B9 = form1.B9.value; 
B10 = form1.B10.value;
B11 = form1.B11.value;


if  (B8<=4.75)
{B12=parseFloat(2);}
else if (B8>=4.75&& B8<=6.75)
{B12=parseFloat(2.2);}
else if (B8>6.75&& B8<=7.75)
{B12=parseFloat(2.3);}

else if( B8>7.75&& B8<=11)
{B12=parseFloat(2.4);}

else
{B12=parseFloat(2.5);}

B13=parseFloat((8.17*B12)/((B8-B4)*((B8*B8-B4*B4)*(B8*B8-B4*B4))))+parseFloat((0.43*B12)/((B8-B5)*((B8*B8-B5*B5)*(B8*B8-B5*B5))));
B14=(8.6*B12)/((B8-B7)*((B8*B8-B7*B7)*(B8*B8-B7*B7)));
B15=0.00001*B3*B13*B9*(Math.pow((B10/B9),0.14))*Math.pow(B11,1.86);
B16=0.00001*B6*B14*B9*Math.pow((B10/B9),0.14)*Math.pow(B11,1.86);
B17=parseFloat(B16)+parseFloat(B15);
$("B12").value=B12.toFixed(1);
$("B13").value=B13.toFixed(9);
$("B14").value=B14.toFixed(9);
$("B15").value=B15.toFixed(1);
$("B16").value=B16.toFixed(1);
$("B17").value=B17.toFixed(1);
}



/*JS237*/
function JS237(){
  
B3 = form1.B3.value; 
B4 = form1.B4.value;   
B5 = form1.B5.value;
B6 = form1.B6.value; 
B7 = form1.B7.value; 
B8 = form1.B8.value; 
B9 = form1.B9.value; 
B10 =(8.6*B9)/((B5-B4)*((B5*B5-B4*B4)*(B5*B5-B4*B4)));
B11=0.00001*B3*B10*B6*Math.pow(B7/B6,0.14)*Math.pow(B8,1.86);


$("B10").value=B10.toFixed(9);
$("B11").value=B11.toFixed(0);

}


/*JS238*/
function JS238(){
  
B2 = form1.B2.value; 
B3 = form1.B3.value;   
	
if(B3>10)
{
B4=0.01;
B5=1/B3;

B7 = B2*1; 
B8 = B2-0.05*B5; 
B9 = B2-0.3*B5-0.008*Math.pow(B2,0.5); 
B10 =B9-0.006*(parseFloat(B2)+parseFloat(5*Math.pow(B5,0.5)));
B11=B2-2*0.3*B5-B4;
B12=B11-1*(0.006*(parseFloat(Math.pow((B2),0.5))+parseFloat(5*Math.pow((B5),0.5))));
B13=0.4224*B5-Math.tan(14.5*Math.PI/180)*(B4-0.008*Math.pow((B2),0.5));
B14=0.4224*B5-Math.tan(14.5*3.14/180)*(0.008*Math.pow((B2),0.5));

B18=parseFloat(B2)+parseFloat(B4);
B17 =parseFloat(B18)+parseFloat(1*(0.006*(Math.pow((B2),0.5)+5*Math.pow((B5),0.5)))); 

B19=B2-0.3*B5+parseFloat(0.006*(Math.pow((B2),0.5)+5*Math.pow((B5),0.5)));

B20=B2-0.3*B5;
B21=B2-2*0.3*B5+parseFloat(0.05*B5);
B22=B2-2*0.3*B5;
B23=0.4224*B5-Math.tan(14.5*3.14/180)*B4;
B24=0.4224*B5;




$("B7").value=B7.toFixed(3);
$("B8").value=B8.toFixed(3);
$("B9").value=B9.toFixed(3);
$("B10").value=B10.toFixed(3);
$("B11").value=B11.toFixed(3);
$("B12").value=B12.toFixed(3);
$("B13").value=B13.toFixed(3);
$("B14").value=B14.toFixed(3);



$("B17").value=B17.toFixed(3);
$("B18").value=B18.toFixed(3);
$("B19").value=B19.toFixed(3);
$("B20").value=B20.toFixed(3);
$("B21").value=B21.toFixed(3);
$("B22").value=B22.toFixed(3);
$("B23").value=B23.toFixed(3);
$("B24").value=B24.toFixed(3);

}
else
{
B4=0.02;
B5=1/B3;

B7 = B2*1; 
B8 = B2-0.05*B5; 
B9 = B2-0.3*B5-0.008*Math.pow(B2,0.5); 
B10 =B9-0.006*(parseFloat(B2)+parseFloat(5*Math.pow(B5,0.5)));
B11=B2-2*0.3*B5-B4;
B12=B11-1*(0.006*(parseFloat(Math.pow((B2),0.5))+parseFloat(5*Math.pow((B5),0.5))));
B13=0.4224*B5-Math.tan(14.5*Math.PI/180)*(B4-0.008*Math.pow((B2),0.5));
B14=0.4224*B5-Math.tan(14.5*3.14/180)*(0.008*Math.pow((B2),0.5));

B18=parseFloat(B2)+parseFloat(B4);
B17 =parseFloat(B18)+parseFloat(1*(0.006*(Math.pow((B2),0.5)+5*Math.pow((B5),0.5)))); 

B19=B2-0.3*B5+parseFloat(0.006*(Math.pow((B2),0.5)+5*Math.pow((B5),0.5)));
B20=B2-0.3*B5;
B21=B2-2*0.3*B5+parseFloat(0.05*B5);
B22=B2-2*0.3*B5;
B23=0.4224*B5-Math.tan(14.5*3.14/180)*B4;
B24=0.4224*B5;

$("B7").value=B7.toFixed(3);
$("B8").value=B8.toFixed(3);
$("B9").value=B9.toFixed(3);
$("B10").value=B10.toFixed(3);
$("B11").value=B11.toFixed(3);
$("B12").value=B12.toFixed(3);
$("B13").value=B13.toFixed(3);
$("B14").value=B14.toFixed(3);

$("B17").value=B17.toFixed(3);
$("B18").value=B18.toFixed(3);
$("B19").value=B19.toFixed(3);
$("B20").value=B20.toFixed(3);
$("B21").value=B21.toFixed(3);
$("B22").value=B22.toFixed(3);
$("B23").value=B23.toFixed(3);
$("B24").value=B24.toFixed(3);
}

}


/*JS239井漏力系数计算*/
function JS239(){
  
B1 = form1.B1.value; 
B2 = form1.B2.value;   
B3 = form1.B3.value;
B4=(B1-B2)*B3/B1;
$("B4").value=B4.toFixed(2);


}




/*JS240钻头功率计算*/
function JS240(){
  
B1 = form1.B1.value; 
B2 = form1.B2.value;   
B3 = form1.B3.value;
B4 = form1.B4.value;
B5=B4*B1*9806.65*B2*B3/3/9550/1000;
$("B5").value=B5.toFixed(2);


}


/*JS241卡测井电缆计算*/
function JS241(){
  
  
B3 = form1.B3.value;
B4 = form1.B4.value;

B6 = form1.B6.value; 

B8 = form1.B8.value;
B9 = form1.B9.value; 

B5 =0.785*(B4*25.4/1000)*(B4*25.4/1000); 
B7 =B5*B6*1000*2.2;
B10=B3/(0.9-B7);





if  (B10<B8-50)
{
	$("B10").value=B10.toFixed(2);
	$("B11").value="吸附卡";}

else
{
	$("B10").value=B10.toFixed(2);
	$("B11").value="工具卡";}



}