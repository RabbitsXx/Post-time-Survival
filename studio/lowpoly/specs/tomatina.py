ID='tomatina';TITLE='The Biggest Food Fight In The World';SOURCE='Wikipedia "La Tomatina"';DATE='2026-11-03'
DESC="La Tomatina is a Spanish festival in Buñol where participants throw tomatoes at each other, the biggest food fight in the world. It started on the last Wednesday of August 1945 when, at a parade of giants and big-head figures, a participant's big head fell off and he began hitting everything in his path; a vegetable stall fell victim and people started pelting each other with tomatoes until the local forces ended it. The next year young people brought tomatoes from home, and the yearly tradition began. Until 2013 there was no limit on participants; since then it has been ticketed for no more than 20,000 people, in a town of about 9,000.\n\nSource: Wikipedia, 'La Tomatina'.\n\nWould you join the tomato fight? Tell us in the comments.\n\n#shorts #funfacts #spain #festival #lowpoly"
TAGS=['la tomatina','tomato festival','bunol','spain','food fight','weird festivals','fun facts','did you know']
PINNED="It began by accident in 1945 at a parade. Would you join the tomato fight? Tell me below 👇"
PROPS="""function tom(){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.SphereGeometry(.16,8,6),M(0xd82a20));m.position.y=.16;g.add(m);S.add(g);ACT.push(g);return g}
const TM=[...Array(6)].map(tom);
const PP=[0,1,2].map(i=>stgPerson(['#f4f4f4','#f4f4f4','#f4f4f4'][i],'#3a3a4a',['#3a2418','#6a4220','#2a1c14'][i],['#e8b894','#dca47e','#d49a74'][i]));
const BH=stgPerson('#c4402a','#2a2a3a','#6a4220','#e8b894');(()=>{const h=new THREE.Mesh(new THREE.SphereGeometry(.34,10,8),M(0xf0c8a0));h.position.y=.14;BH.head.add(h);box(.1,.1,.02,M(0x111111),-.1,.2,.32,BH.head);box(.1,.1,.02,M(0x111111),.1,.2,.32,BH.head)})();
const STALL=(()=>{const g=new THREE.Group();box(2.4,.9,1.0,M(0x8a5a30),0,.45,0,g);for(let i=0;i<5;i++){const t=new THREE.Mesh(new THREE.SphereGeometry(.2,8,6),M([0xd82a20,0x5aaa3a,0xf0a020][i%3]));t.position.set(-.9+i*.45,1.0,0);g.add(t)}S.add(g);ACT.push(g);return g})();
const T1=stgSign('BUNOL','SPAIN','#c4202a','#ffffff',1.6),T2=stgSign('LAST WED','OF AUGUST 1945','#f4e8c0','#2a2a6a',2.0),T3=stgSign('A PARADE','OF BIG HEADS','#f4e8c0','#8a1a2a',2.0),T4=stgSign('20,000','MAX TICKETS','#f4e8c0','#2a6a2a',1.8),T5=stgSign('TOWN: ABOUT','9,000 PEOPLE','#f4e8c0','#2a2a6a',2.0)
const fly=(g,u,i)=>{}
const volley=(c)=>(g,u)=>{TM.forEach((t,i)=>{show(t);const a=((u*1.1+i/6)%1);t.position.set(-1.6+a*3.2,1.6+Math.sin(a*Math.PI)*1.2,1.6+(i%3)*.4);t.rotation.set(a*8,0,0)})}"""
SHOTS={
'hook':"{env:'street',who:[[PP[0],-.9,1.8,.5,'shock','panic'],[PP[1],.9,1.8,-.5,'angry','fight']],extra:(u)=>{TM.forEach((t,i)=>{show(t);const a=((u*1.1+i/6)%1);t.position.set(-1.6+a*3.2,1.4+Math.sin(a*Math.PI)*1.2,2.4+(i%3)*.3);t.rotation.set(a*8,0,0)})},tag:['THE BIGGEST','FOOD FIGHT']}",
's2':"{env:'street',signs:[[T1,0,3.2,1.0,1.0,.2]],who:[[PP[2],0,1.8,0,'happy','cheer']]}",
's3':"{env:'street',signs:[[T2,0,3.4,1.0,.9,.2]],who:[[PP[0],-.9,1.8,.5,'happy','cheer'],[PP[1],.9,1.8,-.5,'happy','cheer']]}",
's4':"{env:'street',who:[[BH,0,1.8,0,'angry','fight']],signs:[[T3,0,3.4,1.0,.9,.2]]}",
's5':"{env:'street',props:[[STALL,0,0,2.2,1.0,0]],who:[[BH,-.6,1.8,.6,'angry','fight']],extra:(u)=>{TM.forEach((t,i)=>{show(t);const a=((u*1.1+i/6)%1);t.position.set(-1.0+a*2.2,1.6+Math.sin(a*Math.PI)*1.0,2.6);t.rotation.set(a*8,0,0)})}}",
's6':"{env:'street',who:[[PP[0],-.9,1.8,.5,'happy','cheer'],[PP[1],.9,1.8,-.5,'happy','cheer']],extra:(u)=>{TM.forEach((t,i)=>{show(t);const a=((u*1.1+i/6)%1);t.position.set(-1.6+a*3.2,1.4+Math.sin(a*Math.PI)*1.2,2.4);t.rotation.set(a*8,0,0)})},stamp:'A TRADITION BEGINS',stampAt:.6}",
's7':"{env:'street',signs:[[T4,0,3.3,1.0,.9,.2]],who:[[PP[2],0,1.8,0,'happy','both']]}",
's8':"{env:'street',signs:[[T5,0,3.3,1.0,.9,.2]],who:[[PP[0],-.9,1.8,.5,'shock','shrug'],[PP[1],.9,1.8,-.5,'shock','shrug']]}"}
LINES=[
("In Spain, thousands of people throw tomatoes at each other in the biggest food fight in the world.",['hook'],"OK | \"Spanish festival ... participants throw tomatoes at each other. It is the biggest food fight in the world\""),
("It happens in the town of Buñol.",['s2'],"OK | \"festival in Buñol, Spain\""),
("It started on the last Wednesday of August in 1945, at a parade of giants and big-head figures.",['s3'],"OK | \"started the last Wednesday of August in 1945 ... Giants and Big-Heads figures parade\""),
("One participant's big head fell off, and he began hitting everything in his path.",['s4'],"OK | \"One participant's Big-head fell off ... began hitting everything in their path\""),
("A vegetable stall was in the way, and people started pelting each other with tomatoes.",['s5'],"OK | \"market stall of vegetables fell victim ... people started to pelt each other with tomatoes\""),
("The next year, young people brought tomatoes from home, and a yearly tradition began.",['s6'],"OK | \"The following year ... brought their own tomatoes from home ... this began the yearly tradition\""),
("Until 2013 there was no limit. Now it is ticketed for no more than twenty thousand people.",['s7'],"OK | \"in 2013 the festival became a ticketed event for no more than 20,000\""),
("Buñol itself has only about nine thousand residents.",['s8'],"OK | \"Buñol's population of about 9,000 people\""),
]
COVER=("THE BIGGEST","FOOD FIGHT","LA TOMATINA","{env:'street',who:[[PP[0],-.9,1.7,.5,'shock','panic'],[PP[1],.9,1.7,-.5,'angry','fight']],cam:[0,2.0,5.8,0,1.4,1.8,54]}")
