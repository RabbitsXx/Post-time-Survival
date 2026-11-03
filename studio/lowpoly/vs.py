# WHAT IF RUSSIA VS PLUTO (A vs B format: referee + seesaw, rounds with a scoreboard).  Facts: topics/vs.md (Wikipedia raw text).
# Hook plan: frame 0 = Russia and Pluto already sliding toward each other; "VS" slams with a boing at ~0.9 s.
EP=dict(id='vs',title="What If Russia Fought Pluto?",
 lines=[
  dict(t="Russia versus Pluto. Which one is bigger?",c=["Russia versus Pluto.","Which one","is bigger?"],v='narr',pad=.1,shots=[('v_hook',1)]),
  dict(t="Russia is the largest country on Earth, at about seventeen point one million square kilometers.",c=["Russia is the largest","country on Earth,","at about seventeen point one","million square kilometers."],v='narr',pad=.1,shots=[('v_rus',1)]),
  dict(t="Pluto's entire surface is about seventeen point seven million.",c=["Pluto's entire surface","is about","seventeen point seven million."],v='narr',pad=.1,shots=[('v_plu',1)]),
  dict(t="Round one, area. Pluto wins, by about four percent.",c=["Round one, area.","Pluto wins,","by about four percent."],v='narr',pad=.1,shots=[('v_r1',1)]),
  dict(t="Round two, population. Russia has about one hundred forty-six million people. Pluto has none.",c=["Round two, population.","Russia has about","one hundred forty-six","million people.","Pluto has none."],v='narr',pad=.1,shots=[('v_r2',1)]),
  dict(t="Final score, one to one. A tie.",c=["Final score,","one to one.","A tie."],v='narr',pad=.1,shots=[('v_end',.55)]),
  dict(t="Pluto at least has no traffic.",c=["Pluto at least","has no traffic."],v='narr2',shots=[('v_end',.45)],pad=.5),
 ],
 sfx=[('v_hook',.05,'whoosh'),('v_hook',.85,'boing'),('v_hook',.9,'pop'),('v_rus',.3,'riser'),('v_rus','%0.7','chime'),('v_plu',.3,'plink',3,.3),('v_plu','%0.7','chime'),('v_r1',.2,'whoosh'),('v_r1','%0.6','thump'),('v_r1','%0.65','boing'),('v_r2',.2,'pop',10,.14),('v_r2','%0.6','thump'),('v_end',.3,'chime'),('v_end','%0.9','rimshot')],
)
PLACE_SHOTS=[]
