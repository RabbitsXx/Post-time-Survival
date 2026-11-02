# CLEOPATRA vs THE MOON LANDING.  Facts: topics/cleo.md (Wikipedia: Cleopatra, Great Pyramid of Giza, Apollo 11).
# Hook plan: frame 0 = Cleopatra already pulling a tape measure toward the pyramid on one side and the lunar lander on the other.
EP=dict(id='cleo',title="Cleopatra Lived Closer To The Moon Landing Than The Pyramids",
 lines=[
  dict(t="Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.",c=["Cleopatra lived closer in time","to the Moon landing","than to the building","of the Great Pyramid."],v='narr',pad=.1,shots=[('c_hook',1)]),
  dict(t="The Great Pyramid was built around twenty-six hundred BC.",c=["The Great Pyramid","was built around","twenty-six hundred BC."],v='narr',pad=.1,shots=[('c_pyr',1)]),
  dict(t="Cleopatra ruled Egypt from fifty-one to thirty BC.",c=["Cleopatra ruled Egypt","from fifty-one","to thirty BC."],v='narr',pad=.1,shots=[('c_cleo',1)]),
  dict(t="That is more than two thousand five hundred years after the pyramid.",c=["That is more than","two thousand five hundred years","after the pyramid."],v='narr',pad=.1,shots=[('c_gap1',1)]),
  dict(t="From her death to the Moon landing in 1969 is only about two thousand.",c=["From her death","to the Moon landing in 1969","is only about two thousand."],v='narr',pad=.1,shots=[('c_gap2',1)]),
  dict(t="In other words, she was nearer to us than to the people who built it.",c=["In other words,","she was nearer to us","than to the people","who built it."],v='narr',pad=.1,shots=[('c_hook',1)]),
  dict(t="To Cleopatra, the pyramids were already ancient history.",c=["To Cleopatra,","the pyramids were already","ancient history."],v='narr2',shots=[('c_end',1)],pad=.6),
 ],
 sfx=[('c_hook',.04,'whoosh'),('c_hook',.4,'stamp'),('c_hook','%0.6','chime'),
  ('c_pyr',.3,'thump'),('c_pyr','%0.4','pop'),
  ('c_cleo',.3,'chime'),('c_cleo','%0.5','pop'),
  ('c_gap1',.3,'riser'),('c_gap1','%0.75','stamp'),
  ('c_gap2',.3,'riser'),('c_gap2','%0.75','stamp'),
  ('c_end',.4,'stamp'),('c_end','%0.85','rimshot')],
)
PLACE_SHOTS=[]
