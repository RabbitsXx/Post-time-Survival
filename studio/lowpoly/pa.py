# THE PASTRY WAR - Post Time LowPoly.  Source note: studio/lowpoly/topics/pa.md
# Hook plan (HOOKS.md): frame 0 = cake already in flight; sentence 1 = the strangest outcome; splat + camera jerk at ~0.9 s; stake/number in the first 5 s.
EP=dict(id='pa',title="A Bakery Started A War",
 lines=[
  dict(t="A bakery started a war between France and Mexico.",c=["A bakery","started a war","between France","and Mexico."],v='narr',pad=.1,shots=[('pa_smash',1)]),
  dict(t="Mexican officers trashed a French pastry shop, and the chef billed them sixty thousand pesos.",c=["Mexican officers trashed","a French pastry shop,","and the chef billed them","sixty thousand pesos."],v='narr',pad=.1,shots=[('pa_bill',1)]),
  dict(t="France demanded six hundred thousand, blockaded Mexico's ports, and bombarded Veracruz.",c=["France demanded","six hundred thousand,","blockaded Mexico's ports,","and bombarded Veracruz."],v='narr',pad=.1,shots=[('pa_fleet',.45),('pa_fort',.55)]),
  dict(t="Mexico's General Santa Anna lost a leg to French cannon fire.",c=["Mexico's General","Santa Anna lost a leg","to French cannon fire."],v='narr',pad=.1,shots=[('pa_leg',1)]),
  dict(t="Britain stepped in, and Mexico agreed to pay.",c=["Britain stepped in,","and Mexico","agreed to pay."],v='narr',pad=.1,shots=[('pa_peace',1)]),
  dict(t="Years later, Santa Anna gave that leg a state funeral.",c=["Years later,","Santa Anna gave that leg","a state funeral."],v='narr',pad=.1,shots=[('pa_funeral',.6)]),
  dict(t="The leg got a funeral. The cakes got nothing.",c=["The leg got a funeral.","The cakes","got nothing."],v='narr2',shots=[('pa_funeral',.4)],pad=.9),
 ],
 sfx=[('pa_smash',.05,'whoosh'),('pa_smash',.85,'splat'),('pa_smash',.9,'boing'),('pa_bill',.2,'plink'),('pa_bill','%0.5','chime'),('pa_fleet',.3,'boom'),('pa_fleet','%0.6','boom'),('pa_fort',.5,'boom'),('pa_fort','%0.6','boom'),('pa_leg','%0.4','boom'),('pa_leg','%0.55','boing'),('pa_peace',.2,'chime'),('pa_funeral',.3,'boom'),('pa_funeral','%0.5','wah'),('pa_funeral','%0.95','rimshot')],
)
