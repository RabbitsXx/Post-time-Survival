# THE WHISKY WAR (Hans Island, Canada vs Denmark).  Facts: topics/hans.md (Wikipedia "Hans Island", raw text).
# Hook plan: frame 0 = Canadian soldier already planting a flag + whisky bottle, Danish soldier marches in and slams schnapps down at ~0.95 s.
EP=dict(id='hans',title="The War Fought With Whisky",
 lines=[
  dict(t="Canada and Denmark fought over a tiny island by leaving each other alcohol.",c=["Canada and Denmark","fought over a tiny island","by leaving each","other alcohol."],v='narr',pad=.1,shots=[('h_hook',1)]),
  dict(t="Hans Island is an uninhabited rock in the Arctic, about one point three square kilometers.",c=["Hans Island is","an uninhabited rock","in the Arctic,","about one point three","square kilometers."],v='narr',pad=.1,shots=[('h_map',1)]),
  dict(t="The Danes left schnapps. The Canadians left whisky and a sign saying, welcome to Canada.",c=["The Danes left schnapps.","The Canadians left whisky","and a sign saying,","welcome to Canada."],v='narr',pad=.1,shots=[('h_signs',1)]),
  dict(t="People called it the friendliest war ever.",c=["People called it","the friendliest war ever."],v='narr',pad=.1,shots=[('h_friend',1)]),
  dict(t="In 2005, the fight moved to online ads, and Canada kept selling Danish pastries as a goodwill gesture.",c=["In 2005,","the fight moved to online ads,","and Canada kept selling","Danish pastries","as a goodwill gesture."],v='narr',pad=.1,shots=[('h_pastry',1)]),
  dict(t="In 2022, after seventeen years of talks, they split the island nearly in half.",c=["In 2022,","after seventeen years of talks,","they split the island","nearly in half."],v='narr',pad=.1,shots=[('h_split',1)]),
  dict(t="Nobody fired a shot. Cheers.",c=["Nobody fired a shot.","Cheers."],v='narr2',shots=[('h_end',1)],pad=.6),
 ],
 sfx=[('h_hook',.04,'whoosh'),('h_hook',.4,'plop'),('h_hook',.95,'hit_metal'),('h_hook',.97,'boing'),
  ('h_map',.2,'riser'),('h_map','%0.45','stamp'),
  ('h_signs',.3,'plop'),('h_signs',1.2,'plop'),('h_signs','%0.6','chime'),
  ('h_friend',.4,'stamp'),('h_friend',.1,'hit_metal',4,.55),
  ('h_pastry',.2,'chime'),('h_pastry','%0.6','pop'),
  ('h_split',.5,'whoosh'),('h_split',.9,'stamp'),
  ('h_end',.1,'hit_metal'),('h_end',.2,'chime'),('h_end','%0.85','rimshot')],
)
PLACE_SHOTS=['h_map']
