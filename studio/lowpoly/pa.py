# THE PASTRY WAR - Post Time LowPoly.  Source note: studio/lowpoly/topics/pa.md  (script fact-checked against Wikipedia: Pastry War, Battle of Veracruz 1838, Santa Anna)
# Hook plan (HOOKS.md): frame 0 = cake already in flight; sentence 1 = the strangest TRUE statement; splat + camera jerk at ~0.9 s; stake/number in the first 5 s.
EP=dict(id='pa',title="The War Named After A Pastry Shop",
 lines=[
  dict(t="This war is named after a pastry shop.",c=["This war","is named after","a pastry shop."],v='narr',pad=.1,shots=[('pa_smash',1)]),
  dict(t="A French pastry chef complained that Mexican officers looted his shop, and demanded sixty thousand pesos.",c=["A French pastry chef","complained that Mexican officers","looted his shop,","and demanded","sixty thousand pesos."],v='narr',pad=.1,shots=[('pa_bill',1)]),
  dict(t="France then demanded six hundred thousand pesos, blockaded Mexico's ports, and bombarded the fortress at Veracruz.",c=["France then demanded","six hundred thousand pesos,","blockaded Mexico's ports,","and bombarded","the fortress at Veracruz."],v='narr',pad=.1,shots=[('pa_fleet',.45),('pa_fort',.55)]),
  dict(t="General Santa Anna was hit by French cannon fire and lost a leg.",c=["General Santa Anna","was hit by French cannon fire","and lost a leg."],v='narr',pad=.1,shots=[('pa_leg',1)]),
  dict(t="Britain brokered peace, and Mexico agreed to pay. Mexico never did.",c=["Britain brokered peace,","and Mexico agreed to pay.","Mexico never did."],v='narr',pad=.1,shots=[('pa_peace',1)]),
  dict(t="Santa Anna buried his leg with full military honors.",c=["Santa Anna buried his leg","with full military honors."],v='narr',pad=.1,shots=[('pa_funeral',1)]),
  dict(t="Six years later, a mob dug it up and dragged it through the streets.",c=["Six years later,","a mob dug it up","and dragged it","through the streets."],v='narr',pad=.1,shots=[('pa_mob',1)]),
  dict(t="The leg got a funeral. The cakes got nothing.",c=["The leg got a funeral.","The cakes","got nothing."],v='narr2',shots=[('pa_funeral2',1)],pad=.9),
 ],
 sfx=[('pa_smash',.05,'whoosh'),('pa_smash',.85,'splat'),('pa_smash',.9,'boing'),('pa_bill',.2,'plink'),('pa_bill','%0.5','chime'),('pa_fleet',.3,'boom'),('pa_fleet','%0.6','boom'),('pa_fort',.5,'boom'),('pa_fort','%0.6','boom'),('pa_leg','%0.4','boom'),('pa_leg','%0.55','boing'),('pa_peace',.2,'chime'),('pa_funeral',.3,'boom'),('pa_mob',.1,'whoosh'),('pa_mob','%0.5','thump',6,.35),('pa_funeral2','%0.3','wah'),('pa_funeral2','%0.8','rimshot')],
)
