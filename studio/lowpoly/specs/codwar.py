ID='codwar';TITLE='The Cod Wars';SOURCE='Wikipedia "Cod Wars"';DATE='2026-11-03'
DESC="Between 1958 and 1976 Iceland and the United Kingdom clashed in three Cod Wars over fishing limits. The Royal Navy escorted British trawlers while the Icelandic Coast Guard cut their nets with long hawsers, and ships from both sides suffered damage from ramming. Iceland threatened to leave NATO. A 1976 NATO-brokered agreement ended more than 500 years of unrestricted British fishing in these waters. Source: Wikipedia, Cod Wars."
TAGS=['cod wars','iceland','united kingdom','fishing','nato','weird history','history shorts','true story','1976']
PINNED="Only one death is confirmed across all three Cod Wars: an Icelandic engineer in a 1973 accident. Did you know this one? 🐟 Tell me below 👇"
PROPS="""function trawler(c,s){const g=new THREE.Group();box(3.0,.6,1.0,M(c),0,.3,0,g);box(1.0,.7,.9,M(0xf4f4f0),-.4,.95,0,g);cyl(.08,.08,.6,5,M(0x2a2a2a),-.4,1.5,0,g);box(.05,.9,.05,M(0x6a4a2a),.7,1.2,0,g);S.add(g);ACT.push(g);return g}
const TRB=trawler(0x2a3a5a),TRI=trawler(0x8a1a2a);
function netg(){const g=new THREE.Group();const m=new THREE.MeshBasicMaterial({color:0xe8e0b0});for(let i=-3;i<=3;i++){box(.02,1.2,.02,m,i*.18,.6,0,g);box(1.1,.02,.02,m,0,.6+i*.18,0,g)}for(let i=0;i<5;i++){const f=new THREE.Mesh(new THREE.SphereGeometry(.12,6,5),M(0x8ab0c8));f.scale.set(1.6,.7,.6);f.position.set(-.4+i*.2,.3+(i%2)*.4,0);g.add(f)}S.add(g);ACT.push(g);return g}
const NET=netg();
const UKC=stgPerson('#1c2a5c','#f4f4f4','#d8d8d8','#efc2a2',{stache:'#d8d8d8'});stgHat(UKC,'cap',0x1c2a5c);
const ICC=stgPerson('#c4202a','#2a3a6a','#e8c860','#efc2a2');stgHat(ICC,'cap',0x2a3a6a);
const C1=stgSign('1958-1976','3 COD WARS','#f4e8c0','#2a2a6a',1.8),C2=stgSign('ROYAL NAVY','ESCORTS','#f4e8c0','#1c2a5c',1.8),C3=stgSign('CUT THE','NETS','#f4e8c0','#8a1a2a',1.6),C4=stgSign('LEAVE','NATO?','#f4e8c0','#8a1a2a',1.5),C5=stgSign('1976','DEAL','#f4e8c0','#2a6a2a',1.5)"""
SHOTS={
'hook':"{env:'sea',props:[[TRB,-1.4,0,1.4,.8,.3],[TRI,1.4,0,.8,.8,-.3],[NET,0,0,2.8,1.6,0,(g,u)=>{g.rotation.z=Math.sin(u*3)*.1}]],tag:['BRITAIN VS ICELAND','OVER FISH']}",
's2':"{env:'sea',who:[[ICC,-.9,1.8,.5,'angry','point'],[UKC,.9,1.8,-.5,'angry','point']],signs:[[C1,0,3.5,1.0,.8,.2]]}",
's3':"{env:'sea',props:[[TRI,-1.0,0,.4,.8,.3]],who:[[ICC,.9,1.8,-.3,'angry','point']],cam:[0,2.2,6.4,0,1.4,1.7,56]}",
's4':"{env:'sea',props:[[TRB,-1.2,0,1.0,.8,-.2]],who:[[UKC,1.0,1.8,-.4,'smug','salute']],signs:[[C2,0,3.6,1.0,.8,.2]]}",
's5':"{env:'sea',props:[[TRI,-1.4,0,1.2,.8,.5],[NET,1.0,0,2.2,1.5,0]],who:[[ICC,0,1.0,.5,'happy','cheer']],signs:[[C3,0,3.7,1.0,.8,.5]]}",
's6':"{env:'sea',props:[[TRB,-1.4,0,1.4,.8,.5],[TRI,1.4,0,1.4,.8,-.5]],stamp:'RAMMING!',sc:'#8a1a2a',stampAt:.5}",
's7':"{env:'hall',who:[[ICC,0,1.8,0,'angry','point']],signs:[[C4,.2,3.2,1.2,.9,.2]]}",
's8':"{env:'sea',who:[[ICC,-.9,1.8,.5,'happy','salute'],[UKC,.9,1.8,-.5,'sad','sad']],signs:[[C5,0,3.4,1.0,.8,.2]]}"}
LINES=[
("Between 1958 and 1976, Britain and Iceland fought three Cod Wars over fish.",['hook'],"OK | \"First Cod War lasted from 1 September 1958\"; \"Third Cod War (November 1975 – June 1976)\""),
("Iceland kept extending its fishing limits.",['s2'],"OK | \"Iceland again extended its fishing limits\""),
("Britain sent Royal Navy ships to escort its fishing boats.",['s4'],"OK | \"British fishing boats were escorted to the fishing grounds by the Royal Navy\""),
("The Icelandic Coast Guard used long cables to cut the nets from British boats.",['s5'],"OK | \"use long hawsers to cut nets from the British boats\""),
("Ships from both sides were damaged by ramming.",['s6'],"OK | \"ships from both sides suffered damage from ramming attacks\""),
("Iceland even threatened to leave NATO.",['s7'],"OK | \"Iceland made threats it would withdraw from NATO\""),
("Only one death was confirmed, an engineer, in an accident in 1973.",['s3'],"OK | \"There was one confirmed death during the Cod Wars: an Icelandic engineer, who was accidentally killed in 1973\""),
("A deal in 1976 ended more than five hundred years of unrestricted British fishing there.",['s8'],"OK | \"The agreement brought to an end more than 500 years of unrestricted British fishing in these waters\""),
]
COVER=("THE COD","WARS","BRITAIN VS ICELAND","{env:'sea',props:[[TRB,-1.5,0,0,.8,.5],[TRI,1.5,0,0,.8,-.5]],who:[[ICC,.3,1.6,.9,'angry','point']],cam:[0,2.0,5.8,0,1.2,1.8,54]}")
