# VAMPIRE BATS SHARE FOOD (Halloween 2026).  Source note: topics/vampire_bats.md
EP=dict(id='vampire_bats',title='Vampire Bats Share Blood',
 lines=[
  dict(t="Vampire bats only eat blood.",c=["Vampire bats","only eat blood."],v='narr',shots=[('h_hook',.5),('h_poly',.5)]),
  dict(t="And a bat that goes a few days without a meal can starve.",c=["And a bat that goes","a few days without a meal","can starve."],v='narr',shots=[('h_hungry',.6),('h_weak',.4)]),
  dict(t="So when one comes home hungry, a roostmate will share some of its own blood meal.",c=["So when one","comes home hungry,","a roostmate will share","some of its own","blood meal."],v='narr',shots=[('h_roost',.4),('h_share',.6)]),
  dict(t="Even with bats that aren't family.",c=["Even with bats","that aren't family."],v='narr',shots=[('h_family',1)]),
  dict(t="And bats that shared more were fed more when they were hungry.",c=["And bats that","shared more","were fed more","when they were hungry."],v='narr',shots=[('h_tally',.55),('h_notes',.45)]),
  dict(t="The scariest animal on Halloween is also the best roommate.",c=["The scariest animal","on Halloween","is also the best roommate."],v='narr2',shots=[('h_final',1)],pad=.5),
  dict(d=('poly',"I'll share my candy."),shots=[('h_candy',1)],pad=.4),
 ],
 sfx=[('h_hook',.2,'sting'),('h_poly',.1,'chime'),('h_hungry',.2,'groan'),('h_weak',.1,'groan'),('h_roost',.0,'whoosh'),('h_share',.2,'plop',4,.18),('h_share','%0.6','chime'),('h_family',.2,'plop',3,.3),('h_tally',.0,'tick',5,.28),('h_notes',.0,'plink'),('h_final','%0.5','chime'),('h_candy',.0,'whoosh')],
)
