# THE TARDIGRADE THAT SURVIVED SPACE.  Facts: topics/tardi.md (Wikipedia "Tardigrade", raw text).
# Hook plan: frame 0 = tardigrade already tumbling through space in front of Earth; "NO SPACESUIT" sign slams in at ~0.9 s.
EP=dict(id='tardi',title="The Tiny Animal That Survived Outer Space",
 lines=[
  dict(t="A tiny animal once survived ten days in outer space, with no spacesuit.",c=["A tiny animal once survived","ten days in outer space,","with no spacesuit."],v='narr',pad=.1,shots=[('t_hook',1)]),
  dict(t="It is called a tardigrade, or water bear, a microscopic creature with eight legs.",c=["It is called a tardigrade,","or water bear,","a microscopic creature","with eight legs."],v='narr',pad=.1,shots=[('t_meet',1)]),
  dict(t="In 2007, scientists launched thirty of them, dried out, into orbit.",c=["In 2007,","scientists launched thirty of them,","dried out,","into orbit."],v='narr',pad=.1,shots=[('t_launch',1)]),
  dict(t="Empty space alone did not hurt them. Add the Sun's ultraviolet light, and many died.",c=["Empty space alone","did not hurt them.","Add the Sun's ultraviolet light,","and many died."],v='narr',pad=.1,shots=[('t_uv',1)]),
  dict(t="But some came back to life when they got wet again.",c=["But some came back to life","when they got wet again."],v='narr',pad=.1,shots=[('t_revive',1)]),
  dict(t="They can even dry out completely and wait for years, until water returns.",c=["They can even dry out completely","and wait for years,","until water returns."],v='narr',pad=.1,shots=[('t_years',1)]),
  dict(t="Not bad for something nicknamed a moss piglet.",c=["Not bad for something","nicknamed a moss piglet."],v='narr2',shots=[('t_end',1)],pad=.6),
 ],
 sfx=[('t_hook',.04,'whoosh'),('t_hook',.3,'boing'),('t_hook',.9,'thump'),('t_hook',.92,'chime'),
  ('t_meet',.2,'pop'),('t_meet','%0.4','stamp'),
  ('t_launch',.2,'whoosh'),('t_launch',.4,'pop',8,.1),
  ('t_uv',.3,'chime'),('t_uv','%0.45','whoosh'),('t_uv','%0.8','stamp'),
  ('t_revive',.3,'plop'),('t_revive','%0.5','boing'),('t_revive','%0.7','pop'),
  ('t_years',.2,'tick',5,.55),
  ('t_end',.3,'pop'),('t_end','%0.85','rimshot')],
)
PLACE_SHOTS=['t_launch','t_uv','t_years','t_hook']
