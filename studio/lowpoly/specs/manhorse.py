ID='manhorse';TITLE='Humans Race Horses Every Year In Wales';SOURCE='Wikipedia "Man versus Horse Marathon"';DATE='2026-11-03'
DESC="The Man versus Horse Marathon is an annual race in Llanwrtyd Wells, Wales, where runners compete against riders on horseback over road, trail and mountain terrain. It began in 1980 when a pub landlord, Gordon Green, overheard two men arguing over whether a man could match a horse over a long distance and decided to test it in public. In 2004, in the 25th race, Huw Lobb won in 2 hours 5 minutes 19 seconds, the first time a runner on foot won, claiming a prize fund that had grown by 1,000 pounds each year to 25,000 pounds. That year had the most competitors ever: 500 runners and 40 horses.\n\nSource: Wikipedia, 'Man versus Horse Marathon'.\n\nWho would win, you or a horse? Tell us in the comments.\n\n#shorts #funfacts #wales #running #lowpoly"
TAGS=['man versus horse marathon','wales','llanwrtyd wells','running','weird events','horse race','fun facts','did you know']
PINNED="Huw Lobb became the first runner to beat the horses overall in 2004, in the 25th race. Who would win, you or a horse? Tell me below 👇"
PROPS="""function horse(){const g=new THREE.Group();const m=M(0x8a5a30),dk=M(0x2a1a10);box(1.5,.7,.6,m,0,1.2,0,g);const nk=box(.3,.8,.3,m,.8,1.7,0,g);nk.rotation.z=-.4;box(.5,.3,.3,m,1.2,2.0,0,g);box(.1,.2,.08,dk,1.1,2.25,.1,g);box(.1,.2,.08,dk,1.1,2.25,-.1,g);box(.1,.5,.06,dk,.9,1.95,0,g).rotation.z=.4;
const lg=[];for(const x of[-.6,.6])for(const z of[-.2,.2]){const l=new THREE.Group();l.position.set(x,.95,z);g.add(l);box(.14,.95,.14,m,0,-.47,0,l);lg.push(l)}g.userData.lg=lg;const tl=box(.1,.7,.1,dk,-.85,1.1,0,g);tl.rotation.z=.4;S.add(g);ACT.push(g);return g}
const HRS=horse();
const RUN=stgPerson('#e8a020','#2a2a3a','#4a3020','#e8b894',{stubble:1});
const RID=stgPerson('#c4202a','#f4f4f4','#3a2418','#dca47e');stgHat(RID,'helmet',0x1a1a1e);
const LND=stgPerson('#6a4a2a','#3a3a4a','#d8c898','#e8b894',{stache:'#d8c898',beard:'#d8c898'});
const PUB=stgSign('NEUADD ARMS','PUB','#f4e8c0','#2a2a6a',1.9);
const M1=stgSign('LLANWRTYD','WELLS, 1980','#f4e8c0','#2a2a6a',1.9),M2=stgSign('2004','FIRST RUNNER WIN','#f4e8c0','#8a1a2a',2.0),M3=stgSign('2H 5M 19S','HUW LOBB','#f4e8c0','#2a2a6a',1.9),M4=stgSign('PRIZE','25,000 POUNDS','#f4e8c0','#2a6a2a',1.9),M5=stgSign('500 RUNNERS','40 HORSES','#f4e8c0','#2a2a6a',1.9)
const gal=(g,u)=>{g.userData.lg.forEach((l,i)=>l.rotation.z=Math.sin(u*11+(i%2)*3)*.6);g.position.y=Math.abs(Math.sin(u*11))*.08}"""
SHOTS={
'hook':"{env:'hill',props:[[HRS,.8,0,2.2,.9,Math.PI/2,gal]],who:[[RUN,-.9,1.8,Math.PI/2,'angry','run']],tag:['HUMANS VS HORSES','EVERY JUNE']}",
's2':"{env:'hill',who:[[RUN,-.8,1.8,.4,'happy','cheer']],props:[[HRS,1.0,0,1.8,.8,-.8]],signs:[[M1,0,3.4,1.0,.9,.2]]}",
's3':"{env:'room',who:[[LND,0,1.8,0,'smug','think']],signs:[[PUB,0,3.2,1.2,.9,.2]]}",
's4':"{env:'room',who:[[LND,0,1.8,0,'happy','cheer']],stamp:'TEST IT IN PUBLIC',sc:'#2a2a6a',stampAt:.5}",
's5':"{env:'hill',props:[[HRS,.9,0,2.0,.9,Math.PI/2,gal]],who:[[RID,-.9,1.6,Math.PI/2,'smug','run']],stamp:'HORSES WON',stampAt:.5}",
's6':"{env:'hill',who:[[RUN,0,1.8,0,'happy','both']],signs:[[M2,0,3.5,1.0,.9,.2]]}",
's7':"{env:'hill',who:[[RUN,0,1.8,0,'happy','cheer']],signs:[[M3,.6,3.4,1.0,.8,.2]]}",
's8':"{env:'hill',who:[[RUN,-.9,1.8,.5,'happy','cheer'],[RID,.9,1.8,-.5,'sweat','shrug']],signs:[[M4,0,3.4,1.0,.9,.2]]}",
's9':"{env:'hill',props:[[HRS,.9,0,2.0,.8,Math.PI/2,gal]],who:[[RUN,-.9,1.8,Math.PI/2,'happy','run']],signs:[[M5,0,3.6,1.0,.9,.2]],cam:[0,2.2,7.4,0,1.4,1.8,58]}"}
LINES=[
("Every June in Wales, runners race against horses.",['hook'],"OK | \"annual race ... runners compete against riders on horseback ... Llanwrtyd Wells every June\""),
("The Man versus Horse Marathon began in 1980.",['s2'],"OK | \"The event started in 1980\""),
("A pub landlord overheard two men arguing over whether a man could match a horse over a long distance.",['s3'],"OK | \"landlord Gordon Green overheard a discussion between two men in his pub\""),
("He decided to test it in public, and organized the first race.",['s4'],"OK | \"Green decided that the challenge should be tested in full public view, and organised the first event\""),
("For the first twenty-four races, no runner on foot won.",['s5'],"OK (inference) | 2004 was the 25th race and \"the first time that a man racing on foot had won the race\""),
("In 2004, Huw Lobb became the first runner to win overall.",['s6'],"OK | \"first time that a man racing on foot had won the race\""),
("He finished in two hours, five minutes, and nineteen seconds.",['s7'],"OK | \"in 2 hours, 5 minutes and 19 seconds\""),
("He won a prize fund of twenty-five thousand pounds, which had grown by a thousand every year.",['s8'],"OK | \"prize fund of GBP 25,000, which had been growing by GBP 1,000 each year\""),
("That year also had the most competitors ever: five hundred runners and forty horses.",['s9'],"OK | \"highest ever number of competitors: 500 runners and 40 horses\""),
]
COVER=("HUMANS VS","HORSES","EVERY YEAR IN WALES","{env:'hill',props:[[HRS,.9,0,2.0,1.1,Math.PI/2+.4]],who:[[RUN,-.9,1.7,Math.PI/2-.4,'angry','run']],cam:[0,2.0,5.8,0,1.3,1.8,54]}")
