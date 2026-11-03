ID='tulip';TITLE='Tulip Mania Was The First Bubble';SOURCE='Wikipedia "Tulip mania"';DATE='2026-11-03'
DESC="Tulip mania was a period during the Dutch Golden Age when contract prices for some bulbs of the recently introduced and fashionable tulip reached extraordinarily high levels. The major acceleration started in 1634 and then dramatically collapsed in February 1637, and it is generally considered the first recorded speculative bubble in history. A bulb of a tulip called the Viceroy was offered at an auction in 1637 for 3,000 to 4,200 guilders depending on weight, when a skilled artisan earned about 300 guilders per year. Yet Wikipedia notes it was more of a socio-economic phenomenon than a significant economic crisis, with no critical influence on the prosperity of the Dutch Republic.\n\nSource: Wikipedia, 'Tulip mania'.\n\nWhat's the best bubble you remember? Tell us in the comments.\n\n#shorts #history #economics #netherlands #lowpoly"
TAGS=['tulip mania','speculative bubble','dutch golden age','economic history','netherlands','history shorts','money facts','did you know']
PINNED="Prices were extraordinary, but the article says the crash had no critical effect on the Dutch Republic's prosperity. What's the best bubble you remember? Tell me below 👇"
PROPS="""function tulip(col){const g=new THREE.Group();cyl(.04,.04,.9,5,M(0x3a9a3a),0,.45,0,g);const f=new THREE.Mesh(new THREE.SphereGeometry(.25,8,6),M(col));f.scale.set(1,1.3,1);f.position.y=1.0;g.add(f);for(const sx of[-1,1]){const l=cone(.1,.5,4,M(0x3a9a3a),sx*.16,.3,0,g);l.rotation.z=-sx*.4}cyl(.14,.12,.18,8,M(0xc86a3a),0,.09,0,g);S.add(g);ACT.push(g);return g}
const TU=[0xc4202a,0xf0c030,0xc84ac8,0xf08a20].map(c=>tulip(c));
const COINS=(()=>{const g=new THREE.Group();for(let i=0;i<10;i++){const c=cyl(.3,.3,.06,10,M(0xf0c030),0,.04+i*.07,0,g)}S.add(g);ACT.push(g);return g})();
const DUT=stgPerson('#2a2a3a','#3a3a3a','#6a4220','#efc2a2',{tails:1});stgHat(DUT,'top',0x16161a);
const ART=stgPerson('#8a6a3a','#5a5a62','#3a2418','#dca47e',{boots:1});
const U1=stgSign('1634','PRICES CLIMB','#f4e8c0','#2a6a2a',1.8),U2=stgSign('FEB 1637','CRASH','#f4e8c0','#8a1a2a',1.7),U3=stgSign('THE VICEROY:','3,000-4,200 GUILDERS','#f4e8c0','#8a1a2a',2.4),U4=stgSign('ARTISAN:','300 / YEAR','#f4e8c0','#2a2a6a',1.9),U5=stgSign('NO CRITICAL','EFFECT','#f4e8c0','#2a2a6a',1.8)"""
SHOTS={
'hook':"{env:'paper',props:[[TU[0],-1.2,0,2.2,1.3,0],[TU[1],-.4,0,2.0,1.3,0],[TU[2],.4,0,2.2,1.3,0],[TU[3],1.2,0,2.0,1.3,0]],tag:['TULIP MANIA','THE FIRST BUBBLE?']}",
's2':"{env:'paper',props:[[TU[0],-.9,0,2.2,1.4,0],[TU[1],.9,0,2.2,1.4,0]],who:[[DUT,0,1.0,0,'shock','panic']],stamp:'WILD PRICES',stampAt:.5}",
's3':"{env:'paper',props:[[COINS,-.9,0,2.2,1.0,0],[COINS,.1,0,2.2,1.5,0],[COINS,1.0,0,2.2,2.0,0]],signs:[[U1,0,3.4,1.0,.9,.2]]}",
's4':"{env:'paper',props:[[COINS,-.9,0,2.2,2.0,0],[TU[0],.9,0,2.2,1.5,0]],signs:[[U2,0,3.4,1.0,.9,.2]],stamp:'COLLAPSE',sc:'#c4202a',stampAt:.5}",
's5':"{env:'hall',props:[[TU[0],0,0,2.2,1.8,0]],signs:[[U3,0,3.6,1.0,.8,.2]]}",
's6':"{env:'paper',who:[[ART,0,1.8,0,'sad','shrug']],signs:[[U4,0,3.4,1.0,.9,.2]]}",
's7':"{env:'paper',who:[[DUT,0,1.8,0,'smug','shrug']],stamp:'SOCIAL, NOT ECON',sc:'#2a2a6a',stampAt:.6}",
's8':"{env:'paper',who:[[DUT,0,1.8,0,'happy','cheer']],signs:[[U5,0,3.4,1.0,.9,.2]]}"}
LINES=[
("Tulip mania in the Dutch Golden Age is generally called the first speculative bubble in history.",['hook'],"OK | \"generally considered to have been the first recorded speculative bubble or asset bubble in history\""),
("Contract prices for some tulip bulbs reached extraordinarily high levels.",['s2'],"OK | \"contract prices for some bulbs ... reached extraordinarily high levels\""),
("The big rise started in 1634.",['s3'],"OK | \"The major acceleration started in 1634\""),
("It dramatically collapsed in February 1637.",['s4'],"OK | \"dramatically collapsed in February 1637\""),
("One bulb of a tulip called the Viceroy was offered for three thousand to four thousand two hundred guilders.",['s5'],"OK | caption: \"Its bulb was offered for sale between 3,000-4,200 [guilders], depending on weight\""),
("A skilled artisan at the time earned about three hundred guilders a year.",['s6'],"OK | \"A skilled artisan at the time earned about 300 per year\""),
("Still, the article says it was more a socio-economic phenomenon than a significant economic crisis.",['s7'],"OK | \"the tulip mania was more of a socio-economic phenomenon than a significant economic crisis\""),
("It had no critical influence on the prosperity of the Dutch Republic.",['s8'],"OK | \"It had no critical influence on the prosperity of the Dutch Republic\""),
]
COVER=("TULIP MANIA","THE FIRST","BUBBLE","{env:'paper',props:[[TU[0],-.9,0,2.0,2.0,0],[TU[1],.9,0,2.0,2.0,0]],cam:[0,2.2,5.6,0,1.6,1.8,54]}")
