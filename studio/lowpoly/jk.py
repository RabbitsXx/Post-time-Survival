# THE WAR NAMED AFTER A SAILOR'S EAR (War of Jenkins' Ear).  Fact-checked against Wikipedia "War of Jenkins' Ear" (see topics/jk.md).
# Hook plan (HOOKS.md): frame 0 = cutlass already swinging; the ear is in the air by ~0.6 s with a whoosh + shake; sentence 1 = the strangest TRUE statement.
EP=dict(id='jk',title="The War Named After A Sailor's Ear",
 lines=[
  dict(t="This war is named after a sailor's ear.",c=["This war","is named after","a sailor's ear."],v='narr',pad=.1,shots=[('j_hook',1)]),
  dict(t="In 1731, Spanish coast guards searched the British ship Rebecca for smuggled goods. Captain Robert Jenkins later claimed they cut off his ear.",c=["In 1731,","Spanish coast guards searched","the British ship Rebecca","for smuggled goods.","Captain Robert Jenkins","later claimed","they cut off his ear."],v='narr',pad=.1,shots=[('j_ship',1)]),
  dict(t="Seven years later, British politicians showed him off in Parliament to build support for war.",c=["Seven years later,","British politicians","showed him off in Parliament","to build support for war."],v='narr',pad=.1,shots=[('j_parl',1)]),
  dict(t="Britain went to war with Spain in 1739.",c=["Britain went to war","with Spain in 1739."],v='narr',pad=.1,shots=[('j_war',1)]),
  dict(t="Its biggest battle was a failed British attack on Cartagena, where the admiral also feuded with his own army commander.",c=["Its biggest battle","was a failed British attack","on Cartagena,","where the admiral","also feuded with","his own army commander."],v='narr',pad=.1,shots=[('j_cart',1)]),
  dict(t="When it ended in 1748, Britain had mostly failed to get what it wanted.",c=["When it ended in 1748,","Britain had mostly failed","to get what it wanted."],v='narr',pad=.1,shots=[('j_end',1)]),
  dict(t="Today, it is still marked every May in Savannah, Georgia.",c=["Today, it is still marked","every May","in Savannah, Georgia."],v='narr',pad=.1,shots=[('j_sav',1)]),
  dict(t="A nine year war, named after one ear. Allegedly.",c=["A nine year war,","named after one ear.","Allegedly."],v='narr2',shots=[('j_final',1)],pad=.45),
 ],
 sfx=[('j_hook',.05,'whoosh'),('j_hook',.5,'whoosh'),('j_hook',.6,'boing'),('j_hook',1.1,'pop'),('j_ship',.2,'creak'),('j_parl',.2,'thump',4,.35),('j_parl','%0.6','chime'),('j_war',.3,'pop'),('j_war',.65,'pop'),('j_war',1.0,'pop'),('j_war',1.35,'pop'),('j_war','%0.55','boom'),('j_cart',.3,'boom'),('j_cart','%0.6','boom'),('j_cart','%0.8','wah'),('j_end',.2,'chime'),('j_sav',.2,'chime'),('j_sav',.5,'pop',4,.25),('j_final','%0.4','chime'),('j_final','%0.8','rimshot')],
)

PLACE_SHOTS=['j_ship','j_war','j_cart']   # shots that are about a place on purpose (frame gate F6)
