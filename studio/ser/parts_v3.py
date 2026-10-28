# THE LIGHTHOUSE Parts 2-5, v3: ONE SHOT PER SENTENCE (a cut every ~3-4 s), 2-3 caption chunks per shot.
# bt(scene, params, role, caps, hud, sfx)   caps = [(caption<=5 words, spoken_fragment), ...]
# role: H hook, S setup, V solve, P problem, E escalate, F payoff, R rule, C cliff
def S(*beats): return list(beats)
def bt(scene,params,role,caps,hud=None,sfx=None): return dict(scene=scene,params=params or {},role=role,caps=caps,hud=hud or [],sfx=sfx or [])

PARTS={}

PARTS[2]=dict(title="THE TIDE",series_hook="THE WALL HAS A DOOR",next_spoken="Part three. The wall has a door. Follow for part three.",
 end=dict(title="PART 3",subtitle="THE WALL HAS A DOOR",small="FOLLOW FOR PART 3"),
 yt_title="The Zombies Couldn't Swim. Then The Tide Went Out — Lighthouse Survival Part 2",
 sentences=[
 S(bt("crowd",{"eyes":1,"beam":1},"H",[("THOUSANDS OF <r>ZOMBIES</r>","Thousands of zombies"),("STARING AT HIS <y>LIGHT...</y>","are staring at his light.")],sfx=["whoosh"])),
 S(bt("lampClose",{"state":"on"},"S",[("HOW DO YOU <y>TURN OFF</y>","How do you turn off"),("A LAMP THAT <r>WON'T?</r>","a lamp that won't turn off?")])),
 S(bt("panel",{"kind":"override"},"P",[("THE OVERRIDE IS <r>LOCKED.</r>","The override is locked."),("THE <r>KEY</r> IS GONE.","The key is gone.")],["pill_label"],["hit"])),
 S(bt("panel",{"kind":"breaker","flip":1},"V",[("HE FINDS THE BREAKER BOX.","He finds the breaker box."),("ONE <y>CLICK.</y>","One click.")],sfx=["click"])),
 S(bt("lampClose",{"state":"dying"},"V",[("THE LAMP <r>DIES.</r>","The lamp dies."),("THE ISLAND GOES DARK.","The island goes dark.")],sfx=["hit"])),
 S(bt("prop",{"kind":"radio","dead":1},"P",[("THE RADIO DIES TOO.","The radio dies too."),("AND THE <r>RADAR.</r>","And the radar.")],sfx=["hit"])),
 S(bt("heroFull",{"view":"back","pose":"stand","bg":"night","mood":"night"},"E",[("HE CAN'T SEE THE <r>SHORE</r>","He can't see the shore anymore."),("THE <y>LONGEST NIGHT</y>","The longest night"),("OF HIS LIFE.","of his life.")])),
 S(bt("sea",{"kind":"quiet"},"S",[("THEN, BEFORE DAWN,","Then, before dawn,"),("THE WAVES GO <y>QUIET.</y>","the waves go quiet.")],sfx=["whoosh"])),
 S(bt("causeway",{"lvl":[0,.35],"tag":"TIDE DROPPING"},"E",[("THE TIDE IS <y>DROPPING.</y>","The tide is dropping."),("<r>FAST.</r>","Fast.")],["diagram_callout"],["pop"])),
 S(bt("causeway",{"lvl":[.35,.92]},"E",[("A LINE OF <y>PALE SAND</y>","And a line of pale sand rises,"),("STRAIGHT TO THE <r>ISLAND.</r>","straight to the island.")])),
 S(bt("causeway",{"lvl":1,"width":"40 FT WIDE","tag":"ANKLE DEEP"},"P",[("A <y>CAUSEWAY.</y>","A causeway."),("<y>FORTY FEET</y> WIDE.","Forty feet wide."),("<r>ANKLE</r> DEEP.","Ankle deep.")],["diagram_callout"],["pop"])),
 S(bt("causeway",{"lvl":1,"crowd":34,"walkers":10,"walk":[.02,.4]},"E",[("ZOMBIES CAN'T SWIM.","Zombies can't swim."),("BUT THEY CAN <r>WALK.</r>","But they can walk.")],sfx=["hit"])),
 S(bt("card",{"kind":"rule1"},"R",[("RULE #1 JUST <r>BROKE.</r>","Rule number one just broke.")],["rule_card"],["stamp"])),
 S(bt("card",{"kind":"tideChart"},"E",[("LOW TIDE: <y>5:47.</y>","Low tide is at five forty-seven."),("<r>TWO HOURS</r> AWAY.","Two hours away.")],["notepad_card"],["click"])),
 S(bt("causeway",{"lvl":1,"crowd":30,"walkers":1,"walk":[0,.16]},"C",[("THE FIRST ONE <r>STEPS</r>","The first one steps"),("ONTO THE <r>SAND.</r>","onto the sand.")],sfx=["hit"])),
 ])

PARTS[3]=dict(title="THE FIRE LINE",series_hook="SOMEONE SAW THE SMOKE",next_spoken="Part four. Someone saw the smoke. Follow for part four.",
 end=dict(title="PART 4",subtitle="SOMEONE SAW THE SMOKE",small="FOLLOW FOR PART 4"),
 yt_title="He Burned 200 Gallons Of Diesel To Stop Zombies — It Backfired (Lighthouse Part 3)",
 sentences=[
 S(bt("causeway",{"lvl":1,"crowd":40,"walkers":12,"walk":[0,.26]},"H",[("HOW LONG UNTIL THEY","How long until they"),("REACH THE <r>ROCK?</r>","reach the rock?")],sfx=["whoosh"])),
 S(bt("causeway",{"lvl":1,"crowd":30,"walkers":14,"walk":[.26,.6],"tag":"2 MILES · 40 MIN"},"E",[("TWO MILES OF OPEN SAND.","Two miles of open sand."),("<r>FORTY MINUTES.</r>","Forty minutes,"),("MAYBE LESS.","maybe less.")])),
 S(bt("heroFace",{"expr":"worried","mood":"warm"},"P",[("NO WALLS.","No walls."),("NO GUNS.","No guns."),("NO <r>TIME.</r>","No time.")])),
 S(bt("card",{"kind":"fuel","val":800},"V",[("BUT HE HAS <y>DIESEL.</y>","But he has diesel."),("<y>800 GALLONS.</y>","Eight hundred gallons.")],["meter_card"],["click"])),
 S(bt("heroFull",{"view":"side","pose":"walk","bg":"beach","mood":"warm","carry":1},"V",[("HE DRAGS THE FIRST DRUM","He drags the first drum"),("DOWN THE ROCKS.","down the rocks.")])),
 S(bt("causeway",{"lvl":1,"neck":1,"width":"12 FT WIDE","tag":"THE NECK"},"V",[("AT THE EDGE,","At the edge,"),("THE SAND NARROWS.","the sand narrows."),("<y>TWELVE FEET</y> WIDE.","Twelve feet wide.")],["diagram_callout"])),
 S(bt("heroFull",{"view":"side","pose":"dig","bg":"beach","mood":"warm"},"V",[("HE DIGS A <y>TRENCH.</y>","He digs a trench"),("POURS <y>200 GALLONS.</y>","and pours two hundred gallons.")],sfx=["click"])),
 S(bt("causeway",{"lvl":1,"neck":1,"trench":1,"crowd":20,"walkers":14,"walk":[.4,.92]},"P",[("THE FIRST ZOMBIES","The first zombies"),("REACH THE <r>TRENCH.</r>","reach the trench.")])),
 S(bt("causeway",{"lvl":1,"neck":1,"trench":1,"fire":1,"crowd":20,"walkers":14,"walk":[.8,.8]},"V",[("HE <r>LIGHTS</r> IT.","He lights it."),("A WALL OF <r>FIRE.</r>","A wall of fire."),("THE FIRST WAVE <r>STOPS.</r>","The first wave stops.")],sfx=["hit"])),
 S(bt("heroFace",{"expr":"calm","mood":"warm"},"F",[("IT WORKS.","It works."),("FOR <r>NOW.</r>","For now.")],sfx=["pop"])),
 S(bt("causeway",{"lvl":[1,0],"neck":1,"trench":1,"walkers":10,"walk":[.8,.8],"sink":1,"tag":"TIDE RISING"},"E",[("THEN THE <y>TIDE TURNS</y>","Then the tide turns,"),("THE SEA <r>SWALLOWS</r> THE SAND.","and the sea swallows the sand.")],["diagram_callout"])),
 S(bt("causeway",{"lvl":0,"smoke":1},"E",[("THE FIRE <r>DIES.</r>","The fire dies."),("THE CAUSEWAY IS GONE.","The causeway is gone.")])),
 S(bt("card",{"kind":"fuel","val":600,"from":800,"warn":1},"P",[("BUT HE JUST BURNED","But he just burned"),("A <r>QUARTER</r> OF HIS FUEL.","a quarter of his fuel.")],["meter_card"],["hit"])),
 S(bt("lhWide",{"time":"day","tide":"high","smoke":1},"E",[("AND THE <r>SMOKE</r> IS RISING,","And the smoke is rising,"),("A THOUSAND FEET.","a thousand feet.")])),
 S(bt("radar",{"smoke":1,"range":30},"C",[("<r>THIRTY MILES</r> AWAY.","Visible from thirty miles."),("SOMEONE WILL <r>SEE IT.</r>","Someone is going to see it.")],["radar_map","pill_label"],["hit"])),
 ])

PARTS[4]=dict(title="THE STRANGER",series_hook="A STORM IS COMING",next_spoken="A storm is coming. Follow for part five.",
 end=dict(title="PART 5",subtitle="A STORM IS COMING",small="FOLLOW FOR PART 5"),
 yt_title="A Stranger Landed On His Island. One Cut Could Kill Her — Lighthouse Survival Part 4",
 sentences=[
 S(bt("lhWide",{"time":"day","tide":"high","smoke":1},"H",[("SOMEONE SAW THE SMOKE.","Someone saw the smoke."),("BUT <r>WHO?</r>","But who?")],sfx=["whoosh"])),
 S(bt("pov",{"binoc":1,"boat":1,"wave":1},"E",[("A <y>BOAT</y> DRIFTS IN,","A boat drifts in,"),("WAVING A <y>WHITE SHIRT.</y>","someone waving a white shirt.")],sfx=["pop"])),
 S(bt("heroFace",{"expr":"worried","mood":"warm"},"P",[("ALIVE?","Alive?"),("OR <r>INFECTED?</r>","Or infected?")],sfx=["hit"])),
 S(bt("card",{"kind":"rule3"},"R",[("HIS <y>RULE:</y>","His rule:"),("NOBODY LANDS","nobody lands"),("WITHOUT A <y>CHECK.</y>","without a check.")],["rule_card"],["stamp"])),
 S(bt("timer",{"hours":24},"V",[("<y>TWENTY-FOUR</y> HOURS","Twenty-four hours"),("ON THE <y>DOCK.</y>","on the dock.")],["timer_chip"])),
 S(bt("heroFace",{"who":"wren","expr":"tired","mood":"warm"},"E",[("ALONE. THIRSTY.","Alone. Thirsty."),("HER <r>ENGINE</r> IS DEAD.","Her engine is dead.")])),
 S(bt("heroFace",{"who":"wren","expr":"worried","mood":"red","sweat":1},"P",[("THEN SHE <r>COUGHS.</r>","Then she coughs."),("A <r>FEVER,</r> THAT NIGHT.","A fever, that night.")],sfx=["hit"])),
 S(bt("card",{"kind":"checklistBites","state":1},"V",[("NO BITES.","No bites."),("NO SCRATCHES.","No scratches."),("EXCEPT ONE <r>CUT.</r>","Except one cut.")],["checklist_card"],["click"])),
 S(bt("prop",{"kind":"hand","wound":2},"P",[("SWOLLEN. BLACK AT THE EDGES.","Swollen, black at the edges."),("<r>INFECTED.</r>","Infected.")])),
 S(bt("card",{"kind":"meds","val":6,"from":12,"warn":1},"V",[("HE HAS <y>TWELVE DOSES.</y>","He has twelve doses."),("SHE NEEDS <y>SIX.</y>","She needs six.")],["meter_card"],["click"])),
 S(bt("timer",{"secs":10},"V",[("HE DECIDES","He decides"),("IN <y>TEN SECONDS.</y>","in ten seconds.")],["timer_chip"])),
 S(bt("heroFace",{"who":"wren","expr":"calm","mood":"warm"},"F",[("BY MORNING,","By morning,"),("THE <y>FEVER BREAKS.</y>","the fever breaks.")],sfx=["whoosh"])),
 S(bt("map",{"north":1},"E",[("SHE CAME FOR A <y>RADIO.</y>","She came for a radio."),("SAFE ZONE,","Safe zone,"),("<y>FORTY MILES</y> NORTH.","forty miles north.")],["radar_map"],["pop"])),
 S(bt("sea",{"kind":"night"},"E",[("SIX BOATS FOLLOWED THAT VOICE.","Six boats followed that voice."),("NONE CAME <r>BACK.</r>","None came back.")],sfx=["hit"])),
 S(bt("wave",{"loop":2},"P",[("THE VOICE <y>NEVER BREATHES.</y>","The voice never breathes."),("IT'S A <r>RECORDING.</r>","It's a recording.")],["timer_chip","pill_label"],["hit"])),
 S(bt("lhWide",{"time":"storm","lit":0},"C",[("THEN THE SKY","Then the sky"),("TURNS <r>GREEN.</r>","turns green.")],sfx=["hit"])),
 ])

PARTS[5]=dict(title="THE LAST LIGHT",series_hook="THE SAFEST PLACE WAS THE LIGHT",next_spoken="The end. Follow for more.",
 end=dict(title="THE END",subtitle="THE SAFEST PLACE WAS THE LIGHT",small="FOLLOW FOR THE NEXT STORY"),
 yt_title="The Last Light: How One Lighthouse Beat A Zombie Horde — Part 5 Finale",
 sentences=[
 S(bt("lhWide",{"time":"storm","lit":0,"rain":1},"H",[("CAN ONE ROCK","Can one rock"),("SURVIVE THIS <r>STORM?</r>","survive this storm?")],sfx=["whoosh"])),
 S(bt("prop",{"kind":"generator","dead":1},"P",[("<r>SEVENTY-MILE</r> WINDS.","Seventy-mile winds."),("THE GENERATOR <r>DROWNS.</r>","The generator drowns.")],sfx=["hit"])),
 S(bt("lampClose",{"state":"backup"},"E",[("TOTAL DARKNESS.","Total darkness."),("THEN... <y>CLICK.</y>","Then, a click."),("THE LAMP <r>WAKES.</r>","The lamp wakes.")],sfx=["click"])),
 S(bt("sea",{"kind":"storm","beam":1,"bodies":2},"P",[("A WHITE BEAM.","A white beam."),("IN THE <y>WAVES,</y>","In the waves,"),("<r>BODIES.</r>","bodies.")],sfx=["hit"])),
 S(bt("sea",{"kind":"storm","bodies":3},"E",[("THEY CAN'T SWIM.","They can't swim."),("THEY DON'T <r>NEED</r> TO.","They don't need to.")])),
 S(bt("card",{"kind":"rule1","hl":1},"R",[("WATER WAS THE <y>WALL.</y>","Water was the wall."),("THE SEA <r>OPENED</r> IT.","The sea opened it.")],["rule_card"],["stamp"])),
 S(bt("ledge",{"chain":1},"V",[("HE <y>CHAINS</y> THE","He chains the"),("ONLY WAY UP,","only way up,"),("AND <y>WAITS.</y>","and waits.")],sfx=["click"])),
 S(bt("card",{"kind":"count","n":412},"P",[("DAWN.","Dawn."),("<r>FOUR HUNDRED</r> AND TWELVE.","Four hundred and twelve.")],["counter_chip"],["hit"])),
 S(bt("ledge",{"chain":1,"strain":1},"P",[("THE CHAIN CAN'T HOLD","The chain can't hold"),("THAT MANY.","that many.")])),
 S(bt("crowd",{"eyes":1,"beam":1},"E",[("THE <y>LAMP</y> BROUGHT","The lamp brought"),("THEM HERE.","them here.")])),
 S(bt("radar",{"beam":1,"dots":1,"lead":1},"V",[("LIGHT <y>DRAWS</y> THEM.","Light draws them."),("LIGHT CAN <y>LEAD</y> THEM.","Light can lead them.")],["radar_map"],["pop"])),
 S(bt("lampClose",{"state":"manual","wrench":1},"V",[("HE TURNS THE LENS.","He turns the lens."),("THE BEAM <y>SWINGS.</y>","The beam swings.")],sfx=["click"])),
 S(bt("crowd",{"eyes":1,"beam":1,"following":2},"E",[("THEY TURN,","They turn,"),("AND <r>FOLLOW.</r>","and follow."),("IT <y>WORKS.</y>","It works.")],sfx=["hit"])),
 S(bt("boat",{"many":1},"F",[("THEN, A <y>BOAT.</y>","Then, a boat."),("THEN <y>TEN.</y>","Then ten.")],sfx=["pop"])),
 S(bt("boat",{"many":1,"near":1},"F",[("SURVIVORS.","Survivors."),("THEY SAW THE <y>LIGHT.</y>","They saw the light.")])),
 S(bt("lhWide",{"time":"dusk","lit":1,"beam":1,"boats":1},"F",[("THE LAMP THAT <y>NEARLY</y>","The lamp that nearly"),("KILLED HIM","killed him"),("CALLS THEM <y>HOME.</y>","calls them home.")])),
 S(bt("lhWide",{"time":"night","lit":1,"beam":1,"boats":1},"F",[("THE SAFEST PLACE","The safest place"),("WAS NEVER A <y>PLACE.</y>","was never a place."),("IT WAS THE <y>LIGHT.</y>","It was the light.")],sfx=["hit"])),
 ])
