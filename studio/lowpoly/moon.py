# THE MOON IS DRIFTING AWAY.  Facts: topics/moon.md (Wikipedia "Moon", raw text).
EP=dict(id='moon',title="The Moon Is Slowly Leaving Us",
 lines=[
  dict(t="The Moon is slowly drifting away from Earth.",c=["The Moon is slowly","drifting away","from Earth."],v='narr',pad=.1,shots=[('o_hook',1)]),
  dict(t="We know because Apollo astronauts left laser reflectors on its surface.",c=["We know because","Apollo astronauts left","laser reflectors","on its surface."],v='narr',pad=.1,shots=[('o_refl',1)]),
  dict(t="Scientists bounce lasers off them to measure the distance.",c=["Scientists bounce lasers","off them","to measure the distance."],v='narr',pad=.1,shots=[('o_laser',1)]),
  dict(t="The Moon moves away at roughly the rate your fingernails grow.",c=["The Moon moves away","at roughly the rate","your fingernails grow."],v='narr',pad=.1,shots=[('o_nail',1)]),
  dict(t="As it drifts, Earth's rotation slows, and each day gets about seventeen microseconds longer every year.",c=["As it drifts,","Earth's rotation slows,","and each day gets","about seventeen microseconds","longer every year."],v='narr',pad=.1,shots=[('o_day',1)]),
  dict(t="In five billion years, the Moon will orbit forty percent farther away.",c=["In five billion years,","the Moon will orbit","forty percent","farther away."],v='narr',pad=.1,shots=[('o_five',1)]),
  dict(t="So book your Moon trip early.",c=["So book your","Moon trip early."],v='narr2',shots=[('o_end',1)],pad=.6),
 ],
 sfx=[('o_hook',.04,'whoosh'),('o_hook',.4,'chime'),('o_refl',.3,'pop'),('o_laser',.2,'plink',5,.5),('o_nail',.3,'riser'),('o_nail','%0.6','stamp'),
  ('o_day',.3,'pop'),('o_five',.3,'riser'),('o_five','%0.6','stamp'),('o_end',.3,'chime'),('o_end','%0.85','rimshot')],
)
PLACE_SHOTS=['o_hook','o_laser','o_day','o_five','o_nail']
