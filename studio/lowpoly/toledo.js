(()=>{
const OH=stgPerson('#2a4a8a','#3a3a4a','#4a3020','#dca47e',{stubble:1});stgHat(OH,'slouch',0x3a3a3a);
const MI=stgPerson('#2a6a3a','#3a3a4a','#6a4220','#e8b894');stgHat(MI,'cap',0x2a3a2a);
const GOV=stgPerson('#1c2a5c','#e8e0d0','#3a2418','#efc2a2',{tails:1});stgHat(GOV,'top',0x16161a);
const SUR=stgPerson('#6a5a3a','#5a5a62','#d8d8d8','#e8b894',{stache:'#d8d8d8'});
const CON=stgPerson('#2a2a3a','#5a5a62','#e8e8e8','#e8b894',{tails:1,beard:'#e8e8e8'});stgHat(CON,'top',0x16161a);
const RIV=stgBlock(8,.15,2.4,0x3a8ad0);
const S1=stgSign('TOLEDO WAR','1835-1836','#f4e8c0','#8a1a2a',2.0),S2=stgSign('MAUMEE RIVER','MOUTH','#f4e8c0','#2a2a6a',2.0),S3=stgSign('GREAT LAKES','???','#f4e8c0','#2a2a2a',1.8),S4=stgSign('AGE 24','BOY GOVERNOR','#f4e8c0','#2a6a2a',1.9),S5=stgSign('UPPER','PENINSULA','#f4e8c0','#2a2a6a',1.8)
const SH={hook:stgShot({env:'field',who:[[OH,-.85,1.8,.5,'angry','fight'],[MI,.85,1.8,-.5,'angry','fight']],tag:['OHIO VS MICHIGAN','A WAR OVER LAND']}),
s2:stgShot({env:'field',who:[[OH,-.85,1.8,.4,'happy','idle'],[MI,.85,1.8,-.4,'happy','idle']],signs:[[S1,0,3.3,1.0,1.0,.2]]}),
s3:stgShot({env:'field',props:[[RIV,0,0,1.0]],who:[[OH,-.95,2.2,.3,'neutral','point'],[MI,.95,2.2,-.3,'neutral','point']],signs:[[S2,0,3.1,.6,.8,.2]],cam:[0,2.2,7.2,0,1.2,1.4,56]}),
s4:stgShot({env:'room',who:[[SUR,0,1.8,0,'sweat','shrug']],signs:[[S3,0,3.2,1.2,.8,.2]]}),
s5:stgShot({env:'room',who:[[GOV,0,1.8,0,'smug','cheer',0,.85]],signs:[[S4,.2,3.0,1.2,.8,.2]]}),
s6:stgShot({env:'field',props:[[RIV,0,0,1.0]],who:[[OH,-.95,2.4,.5,'angry','cheer'],[MI,.95,2.4,-.5,'angry','shrug']],cam:[0,2.2,8.0,0,1.2,1.4,58],stamp:'MOSTLY TAUNTING',stampAt:.6}),
s7:stgShot({env:'room',who:[[CON,0,1.8,0,'smug','point']],signs:[[S5,.9,2.6,1.6,.7,.3]]}),
s8:stgShot({env:'field',who:[[MI,0,1.8,0,'happy','cheer']],stamp:'MINERAL WEALTH',sc:'#2a6a2a'})};
for(const k in SH)SHOTS['toledo_'+k]=SH[k];
SHOTS['toledocover']=stgShot({env:'field',who:[[OH,-.85,1.8,.5,'angry','fight'],[MI,.85,1.8,-.5,'angry','fight']],cam:[0,2.0,5.8,0,1.5,1.8,54]});
})();