# SEALAND.  Facts: topics/sealand.md (Wikipedia "Principality of Sealand", raw text).
EP=dict(id='sealand',title="The Family That Claimed A Sea Fort As A Country",
 lines=[
  dict(t="A family claimed an old sea fort as a country, and it still has a flag and an anthem.",c=["A family claimed an old sea fort","as a country,","and it still has","a flag and an anthem."],v='narr',pad=.1,shots=[('z_hook',1)]),
  dict(t="In 1943, Britain built the fort in the North Sea to guard against German aircraft.",c=["In 1943,","Britain built the fort","in the North Sea","to guard against German aircraft."],v='narr',pad=.1,shots=[('z_fort',1)]),
  dict(t="In 1967, a pirate radio owner named Paddy Bates took it over and declared independence.",c=["In 1967,","a pirate radio owner","named Paddy Bates","took it over","and declared independence."],v='narr',pad=.1,shots=[('z_bates',1)]),
  dict(t="When workmen came near, his son fired warning shots, and a British court said the fort was outside British limits.",c=["When workmen came near,","his son fired warning shots,","and a British court said","the fort was outside","British limits."],v='narr',pad=.1,shots=[('z_shots',1)]),
  dict(t="It got a constitution, a currency, passports, and a national anthem.",c=["It got a constitution,","a currency, passports,","and a national anthem."],v='narr',pad=.1,shots=[('z_state',1)]),
  dict(t="In 1978, hired mercenaries stormed it, but Bates's son took it back.",c=["In 1978,","hired mercenaries stormed it,","but Bates's son","took it back."],v='narr',pad=.1,shots=[('z_coup',1)]),
  dict(t="Its population is normally about two people. It was once offered for sale for seven hundred fifty million euros.",c=["Its population is normally","about two people.","It was once offered for sale","for seven hundred fifty million euros."],v='narr2',shots=[('z_end',1)],pad=.6),
 ],
 sfx=[('z_hook',.04,'whoosh'),('z_hook',.3,'pop'),('z_hook','%0.55','chime'),('z_fort',.3,'stamp'),('z_bates',.4,'stamp'),
  ('z_shots',.2,'gun',3,.5),('z_shots','%0.6','stamp'),('z_state',.3,'chime',3,.6),('z_coup',.3,'whoosh'),('z_coup',.4,'stamp'),
  ('z_end',.3,'pop'),('z_end',.9,'pop'),('z_end','%0.85','rimshot')],
)
PLACE_SHOTS=['z_fort','z_end']
