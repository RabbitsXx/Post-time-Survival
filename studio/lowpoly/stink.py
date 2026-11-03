# THE GREAT STINK (London 1858).  Facts: topics/stink.md (Wikipedia "Great Stink", raw text).
# Hook plan: frame 0 = three MPs already fleeing a green cloud with their noses held; tag names the event.
EP=dict(id='stink',title="The Smell That Made Parliament Want To Leave",
 lines=[
  dict(t="In 1858, the Thames smelled so bad that Parliament talked about leaving London.",c=["In 1858,","the Thames smelled so bad","that Parliament talked","about leaving London."],v='narr',pad=.1,shots=[('s_hook',1)]),
  dict(t="Untreated sewage flowed straight into the river, and a hot summer cooked it.",c=["Untreated sewage flowed","straight into the river,","and a hot summer","cooked it."],v='narr',pad=.1,shots=[('s_river',1)]),
  dict(t="They soaked the curtains in chloride of lime to block the smell. It did not work.",c=["They soaked the curtains","in chloride of lime","to block the smell.","It did not work."],v='narr',pad=.1,shots=[('s_curtain',1)]),
  dict(t="Disraeli ran out of a committee room with a handkerchief over his nose.",c=["Disraeli ran out","of a committee room","with a handkerchief","over his nose."],v='narr',pad=.1,shots=[('s_diz',1)]),
  dict(t="So Parliament let the city borrow three million pounds, and engineer Joseph Bazalgette built a new sewer system.",c=["So Parliament let the city","borrow three million pounds,","and engineer Joseph Bazalgette","built a new sewer system."],v='narr',pad=.1,shots=[('s_baz',1)]),
  dict(t="It took three hundred eighteen million bricks, and it still works today.",c=["It took three hundred","eighteen million bricks,","and it still works today."],v='narr',pad=.1,shots=[('s_bricks',.55),('s_end',.45)]),
  dict(t="Sometimes a bad smell is what gets things done.",c=["Sometimes a bad smell","is what gets things done."],v='narr2',shots=[('s_end',1)],pad=.6),
 ],
 sfx=[('s_hook',.04,'whoosh'),('s_hook',.3,'groan',1),('s_hook','%0.55','wah'),
  ('s_river',.3,'splash'),('s_river','%0.5','groan'),
  ('s_curtain',.4,'splash'),('s_curtain','%0.65','stamp'),
  ('s_diz',.2,'foot',6,.2),('s_diz','%0.3','stamp'),
  ('s_baz',.2,'pop'),('s_baz',.7,'pop'),('s_baz','%0.7','chime'),
  ('s_bricks',.25,'stamp'),('s_bricks','%0.6','chime'),
  ('s_end',.3,'chime'),('s_end','%0.85','rimshot')],
)
PLACE_SHOTS=['s_bricks']
