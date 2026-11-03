# THE EMU WAR (1932).  Facts: topics/emu.md (Wikipedia "Emu War", raw text).
# Hook plan: frame 0 = soldier mid-burst, emu already running at him; emu leaps over the dust at ~0.9 s and the hat flies off.
EP=dict(id='emu',title="The Army That Lost A War To Birds",
 lines=[
  dict(t="In 1932, the Australian army sent soldiers with machine guns to fight birds.",c=["In 1932,","the Australian army","sent soldiers with","machine guns to fight birds."],v='narr',pad=.1,shots=[('e_hook',.5),('e_hook2',.5)]),
  dict(t="About twenty thousand emus were wrecking wheat farms, and the farmers asked for machine guns.",c=["About twenty thousand emus","were wrecking wheat farms,","and the farmers asked","for machine guns."],v='narr',pad=.1,shots=[('e_farm',1)]),
  dict(t="The army sent three men, two guns, and ten thousand bullets.",c=["The army sent three men,","two guns,","and ten thousand bullets."],v='narr',pad=.1,shots=[('e_army',1)]),
  dict(t="The emus split into small groups and ran in every direction.",c=["The emus split","into small groups","and ran in every direction."],v='narr',pad=.1,shots=[('e_split',1)]),
  dict(t="A gun on a truck didn't help. The truck couldn't catch them, and the bumps ruined every shot.",c=["A gun on a truck","didn't help.","The truck couldn't catch them,","and the bumps","ruined every shot."],v='narr',pad=.1,shots=[('e_truck',1)]),
  dict(t="The commander compared them to tanks. The army's report claimed nine hundred eighty-six emus, for nearly ten thousand bullets.",c=["The commander compared","them to tanks.","The army's report claimed","nine hundred eighty-six emus,","for nearly ten thousand bullets."],v='narr',pad=.1,shots=[('e_tank',.4),('e_score',.6)]),
  dict(t="The army went home. Most people say the emus won.",c=["The army went home.","Most people say","the emus won."],v='narr2',shots=[('e_end',1)],pad=.6),
 ],
 sfx=[('e_hook',.04,'whoosh'),('e_hook',.05,'tick',12,.055),('e_hook',.05,'gun'),('e_hook',.9,'boing'),('e_hook',.92,'pop'),('e_hook2',.12,'whoosh'),('e_hook2',.45,'thump'),('e_hook2',.55,'chime'),
  ('e_farm',.25,'pop',5,.3),('e_farm','%0.55','squeak'),
  ('e_army',.15,'chime'),('e_army',.4,'stamp'),
  ('e_split',.1,'whoosh',4,.3),('e_split',.35,'pop'),
  ('e_truck',.25,'tick',8,.07),('e_truck',.9,'boing'),('e_truck','%0.7','wah'),
  ('e_tank',.28,'boing'),('e_tank','%0.6','thump'),
  ('e_score',.2,'riser'),('e_score','%0.55','stamp'),
  ('e_end',.5,'stamp'),('e_end',.3,'chime'),('e_end','%0.85','rimshot')],
)
PLACE_SHOTS=['e_split','e_score','e_hook2']
