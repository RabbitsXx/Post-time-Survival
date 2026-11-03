# THE DANCING PLAGUE OF 1518: distorted rubbery cast, polka music.  Facts: topics/dp.md (Wikipedia "Dancing plague of 1518", raw text).
# Hook plan: frame 0 = Troffea already mid-kick; sentence 1 = the strangest true statement.
EP=dict(id='dp',title="The Town That Couldn't Stop Dancing",
 lines=[
  dict(t="In 1518, a woman started dancing in a street, and she did not stop.",c=["In 1518,","a woman started dancing","in a street,","and she did not stop."],v='narr',pad=.1,shots=[('d_hook',1)]),
  dict(t="Within weeks, between fifty and four hundred people were dancing with her.",c=["Within weeks,","between fifty and","four hundred people","were dancing with her."],v='narr',pad=.1,shots=[('d_crowd',1)]),
  dict(t="Nobody knew why. The doctors had a plan: dance it out.",c=["Nobody knew why.","The doctors had a plan:","dance it out."],v='narr',pad=.1,shots=[('d_doc',1)]),
  dict(t="The city council even gave them a hall, plus musicians.",c=["The city council","even gave them a hall,","plus musicians."],v='narr',pad=.1,shots=[('d_hall',1)]),
  dict(t="It backfired. More people danced, so the council banned dancing. And music.",c=["It backfired.","More people danced,","so the council","banned dancing.","And music."],v='narr',pad=.1,shots=[('d_ban',1)]),
  dict(t="The cure was red shoes, holy water, and a chapel. By September, it was over.",c=["The cure was red shoes,","holy water, and a chapel.","By September,","it was over."],v='narr',pad=.1,shots=[('d_cure',1)]),
  dict(t="Lesson learned: do not hire a band.",c=["Lesson learned:","do not hire a band."],v='narr2',shots=[('d_end',1)],pad=.6),
 ],
 sfx=[('d_hook',.05,'whoosh'),('d_hook',.5,'boing'),('d_hook',1.2,'pop'),('d_crowd',.2,'pop',8,.25),('d_crowd','%0.6','boing'),('d_doc',.3,'chime'),('d_doc','%0.65','boing'),('d_hall',.2,'chime'),('d_hall','%0.5','pop',5,.2),('d_ban',.2,'stamp'),('d_ban','%0.5','stamp'),('d_cure',.2,'chime'),('d_cure','%0.6','bell'),('d_end',.3,'wah'),('d_end','%0.85','rimshot')],
)
PLACE_SHOTS=['d_crowd']
