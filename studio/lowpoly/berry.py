# STRAWBERRIES AREN'T BERRIES.  Facts: topics/berry.md (Wikipedia "Berry", raw text).
# Hook plan: frame 0 = strawberry already sliding up to the door; bouncer's hand up, "NO" pops at ~0.55 s, banana waltzes in at ~0.9 s.
EP=dict(id='berry',title="Strawberries Are Not Berries",
 lines=[
  dict(t="Strawberries are not berries, but bananas are.",c=["Strawberries are","not berries,","but bananas are."],v='narr',pad=.1,shots=[('y_hook',1)]),
  dict(t="To a botanist, a berry is a fleshy fruit that grows from one flower's ovary, with seeds inside.",c=["To a botanist,","a berry is a fleshy fruit","that grows from one","flower's ovary,","with seeds inside."],v='narr',pad=.1,shots=[('y_def',1)]),
  dict(t="By that rule, grapes, tomatoes, eggplants, and bananas all get in.",c=["By that rule,","grapes, tomatoes,","eggplants,","and bananas all get in."],v='narr',pad=.1,shots=[('y_in',1)]),
  dict(t="Strawberries, raspberries, and blackberries are aggregate fruits, and mulberries are multiple fruits. All turned away.",c=["Strawberries, raspberries,","and blackberries","are aggregate fruits,","and mulberries are multiple fruits.","All turned away."],v='narr',pad=.1,shots=[('y_out',1)]),
  dict(t="In cooking, strawberries still count as berries. Only the botanists disagree.",c=["In cooking,","strawberries still count","as berries.","Only the botanists disagree."],v='narr',pad=.1,shots=[('y_kitchen',1)]),
  dict(t="So please, do not tell the strawberries.",c=["So please,","do not tell","the strawberries."],v='narr2',shots=[('y_end',1)],pad=.6),
 ],
 sfx=[('y_hook',.05,'whoosh'),('y_hook',.5,'thump'),('y_hook',.6,'boing'),('y_hook',.95,'chime'),
  ('y_def',.2,'pop'),('y_def','%0.5','chime'),
  ('y_in',.7,'chime',4,.75),
  ('y_out',.8,'thump',4,.6),('y_out','%0.8','wah'),
  ('y_kitchen',.3,'pop'),('y_kitchen','%0.6','chime'),
  ('y_end',.3,'wah'),('y_end','%0.85','rimshot')],
)
PLACE_SHOTS=[]
