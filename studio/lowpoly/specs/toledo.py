ID='toledo';TITLE='The War Where Nobody Was Shot';SOURCE='Wikipedia "Toledo War"';DATE='2026-11-03'
DESC="The Toledo War (1835-1836) was a boundary dispute between Ohio and the Michigan Territory over the Toledo Strip, a region at the mouth of the Maumee River. Poor geographical understanding of the Great Lakes had produced conflicting laws. Michigan's 24-year-old 'Boy Governor' Stevens T. Mason and Ohio's governor Robert Lucas both passed penalties against residents who submitted to the other side, and both sent militia to opposite banks of the river, where they mostly taunted each other. The only blood spilled was a non-fatal stabbing of a law enforcement officer. Congress offered Michigan statehood plus the remaining three-quarters of the Upper Peninsula in exchange for giving up the strip, a deal considered poor at the time but whose mineral wealth became an asset.\n\nSource: Wikipedia, 'Toledo War'.\n\nWhat's the most pointless fight in history? Tell us in the comments.\n\n#shorts #history #funnyhistory #lowpoly"
TAGS=['toledo war','ohio','michigan','funny history','weird history','true story','history shorts','upper peninsula','boy governor']
PINNED="The only blood spilled was one non-fatal stabbing, and Michigan ended up with the Upper Peninsula. What's the most pointless fight in history? Tell me below 👇"
PROPS="""const OH=stgPerson('#2a4a8a','#3a3a4a','#4a3020','#dca47e',{stubble:1});stgHat(OH,'slouch',0x3a3a3a);
const MI=stgPerson('#2a6a3a','#3a3a4a','#6a4220','#e8b894');stgHat(MI,'cap',0x2a3a2a);
const GOV=stgPerson('#1c2a5c','#e8e0d0','#3a2418','#efc2a2',{tails:1});stgHat(GOV,'top',0x16161a);
const SUR=stgPerson('#6a5a3a','#5a5a62','#d8d8d8','#e8b894',{stache:'#d8d8d8'});
const CON=stgPerson('#2a2a3a','#5a5a62','#e8e8e8','#e8b894',{tails:1,beard:'#e8e8e8'});stgHat(CON,'top',0x16161a);
const RIV=stgBlock(8,.15,2.4,0x3a8ad0);
const S1=stgSign('TOLEDO WAR','1835-1836','#f4e8c0','#8a1a2a',2.0),S2=stgSign('MAUMEE RIVER','MOUTH','#f4e8c0','#2a2a6a',2.0),S3=stgSign('GREAT LAKES','???','#f4e8c0','#2a2a2a',1.8),S4=stgSign('AGE 24','BOY GOVERNOR','#f4e8c0','#2a6a2a',1.9),S5=stgSign('UPPER','PENINSULA','#f4e8c0','#2a2a6a',1.8)"""
SHOTS={
'hook':"{env:'field',who:[[OH,-.85,1.8,.5,'angry','fight'],[MI,.85,1.8,-.5,'angry','fight']],tag:['OHIO VS MICHIGAN','A WAR OVER LAND']}",
's2':"{env:'field',who:[[OH,-.85,1.8,.4,'happy','idle'],[MI,.85,1.8,-.4,'happy','idle']],signs:[[S1,0,3.3,1.0,1.0,.2]]}",
's3':"{env:'field',props:[[RIV,0,0,1.0]],who:[[OH,-.95,2.2,.3,'neutral','point'],[MI,.95,2.2,-.3,'neutral','point']],signs:[[S2,0,3.1,.6,.8,.2]],cam:[0,2.2,7.2,0,1.2,1.4,56]}",
's4':"{env:'room',who:[[SUR,0,1.8,0,'sweat','shrug']],signs:[[S3,0,3.2,1.2,.8,.2]]}",
's5':"{env:'room',who:[[GOV,0,1.8,0,'smug','cheer',0,.85]],signs:[[S4,.2,3.0,1.2,.8,.2]]}",
's6':"{env:'field',props:[[RIV,0,0,1.0]],who:[[OH,-.95,2.4,.5,'angry','cheer'],[MI,.95,2.4,-.5,'angry','shrug']],cam:[0,2.2,8.0,0,1.2,1.4,58],stamp:'MOSTLY TAUNTING',stampAt:.6}",
's7':"{env:'room',who:[[CON,0,1.8,0,'smug','point']],signs:[[S5,.9,2.6,1.6,.7,.3]]}",
's8':"{env:'field',who:[[MI,0,1.8,0,'happy','cheer']],stamp:'MINERAL WEALTH',sc:'#2a6a2a'}"}
LINES=[
("Two American states once went to war over a strip of land, and the only blood spilled was one non-fatal stabbing.",['hook'],"OK | \"The only blood spilled was the non-fatal stabbing of a law enforcement officer\""),
("It was called the Toledo War, and it lasted from 1835 to 1836.",['s2'],"OK | \"The Toledo War (1835-1836) ... boundary dispute between Ohio and the Michigan Territory\""),
("Both claimed the land around the mouth of the Maumee River.",['s3'],"OK | \"Control of the Maumee River's mouth was seen by both parties as a valuable economic asset\""),
("Poor geographical understanding of the Great Lakes had produced conflicting laws.",['s4'],"OK | \"Poor geographical understanding of the Great Lakes helped to produce conflicting state and federal legislation\""),
("Michigan's governor was a twenty-four-year-old called the Boy Governor.",['s5'],"OK | \"Michigan's 24-year-old 'Boy Governor' Stevens T. Mason\""),
("Both sides sent militia to opposite sides of the river, and mostly just taunted each other.",['s6'],"OK | \"Both states deployed militia ... little interaction ... apart from mutual taunting\""),
("In the end, Congress offered Michigan the rest of the Upper Peninsula for giving up the strip.",['s7'],"OK | \"Michigan gave up its claim to the strip in exchange for its statehood and the remaining three-quarters of the Upper Peninsula\""),
("Michigan thought it was a poor deal, but the Upper Peninsula's minerals became a big asset.",['s8'],"OK | \"considered a poor deal at the time ... mineral wealth would become an economic asset\""),
]
COVER=("A WAR WITH","ONE STABBING","OHIO VS MICHIGAN","{env:'field',who:[[OH,-.85,1.8,.5,'angry','fight'],[MI,.85,1.8,-.5,'angry','fight']],cam:[0,2.0,5.8,0,1.5,1.8,54]}")
