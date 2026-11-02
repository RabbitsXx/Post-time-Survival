# THE WAR OF THE BUCKET (1325).  Facts: topics/buck.md (Wikipedia "War of the Bucket", raw text).
# Hook plan: frame 0 = two armies already sprinting at a giant bucket; they collide at ~0.85 s (boing, shake).
EP=dict(id='buck',title="The War Named After A Bucket",
 lines=[
  dict(t="In 1325, a war between two Italian cities was named after a bucket.",c=["In 1325,","a war between two","Italian cities was","named after a bucket."],v='narr',pad=.1,shots=[('b_hook',1)]),
  dict(t="Bologna marched thirty-two thousand soldiers against Modena's seven thousand.",c=["Bologna marched","thirty-two thousand soldiers","against Modena's","seven thousand."],v='narr',pad=.1,shots=[('b_armies',1)]),
  dict(t="Modena won anyway, and Bologna's army fled back behind its walls.",c=["Modena won anyway,","and Bologna's army","fled back","behind its walls."],v='narr',pad=.1,shots=[('b_rout',1)]),
  dict(t="Some accounts say the winners grabbed a bucket from a well outside the gate, as a trophy.",c=["Some accounts say","the winners grabbed a bucket","from a well","outside the gate,","as a trophy."],v='narr',pad=.1,shots=[('b_well',1)]),
  dict(t="So the bucket was the prize, not the cause. The real trigger was a castle.",c=["So the bucket was the prize,","not the cause.","The real trigger","was a castle."],v='narr',pad=.1,shots=[('b_myth',.5),('b_castle',.5)]),
  dict(t="Modena kept the bucket in a tower.",c=["Modena kept the bucket","in a tower."],v='narr',pad=.1,shots=[('b_tower',1)]),
  dict(t="A poet wrote a mock epic about it, and a composer turned it into an opera.",c=["A poet wrote","a mock epic about it,","and a composer turned it","into an opera."],v='narr2',shots=[('b_end',1)],pad=.6),
 ],
 sfx=[('b_hook',.04,'whoosh'),('b_hook',.2,'foot',6,.14),('b_hook',.85,'boing'),('b_hook',.87,'hit_metal'),
  ('b_armies',.15,'riser'),('b_armies','%0.55','stamp'),
  ('b_rout',.1,'whoosh'),('b_rout',.5,'stamp'),('b_rout','%0.6','cheer' if False else 'chime'),
  ('b_well',.3,'creak'),('b_well','%0.55','plop'),('b_well','%0.75','chime'),
  ('b_myth',.4,'stamp'),('b_castle',.15,'bugle'),
  ('b_tower',.2,'bell'),('b_tower','%0.5','chime'),
  ('b_end',.3,'chime'),('b_end',.55,'stamp'),('b_end','%0.85','rimshot')],
)
PLACE_SHOTS=['b_armies','b_castle','b_tower']
