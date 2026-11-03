# SIR NILS OLAV, THE PENGUIN GENERAL.  Facts: topics/nils.md (Wikipedia "Nils Olav", raw text).
# Hook plan: frame 0 = penguin already waddling along the line of guardsmen; they all salute at ~0.9 s (whoosh + chime).
EP=dict(id='nils',title="The Penguin Who Is A Major General",
 lines=[
  dict(t="A penguin in Edinburgh is a Norwegian major general, and a knight.",c=["A penguin in Edinburgh","is a Norwegian major general,","and a knight."],v='narr',pad=.1,shots=[('n_hook',1)]),
  dict(t="In 1972, Norwegian soldiers visiting the zoo adopted a penguin and named him Nils Olav.",c=["In 1972,","Norwegian soldiers visiting the zoo","adopted a penguin","and named him Nils Olav."],v='narr',pad=.1,shots=[('n_adopt',1)]),
  dict(t="Each time the guard comes back, he gets promoted. Lance corporal, corporal, sergeant, all the way to colonel-in-chief.",c=["Each time the guard comes back,","he gets promoted.","Lance corporal, corporal, sergeant,","all the way to colonel-in-chief."],v='narr',pad=.1,shots=[('n_ranks',1)]),
  dict(t="In 2008, he was knighted, with one hundred thirty guardsmen on parade.",c=["In 2008,","he was knighted,","with one hundred thirty","guardsmen on parade."],v='narr',pad=.1,shots=[('n_knight',1)]),
  dict(t="The first penguin died in 1987, so a near-double took over. Today it is the third Nils Olav.",c=["The first penguin died in 1987,","so a near-double took over.","Today it is","the third Nils Olav."],v='narr',pad=.1,shots=[('n_double',1)]),
  dict(t="He even outranked the man he was named after.",c=["He even outranked","the man he was","named after."],v='narr2',shots=[('n_end',1)],pad=.6),
 ],
 sfx=[('n_hook',.04,'whoosh'),('n_hook',.3,'foot',5,.2),('n_hook',.9,'chime'),('n_hook',.92,'whoosh'),
  ('n_adopt',.2,'plop'),('n_adopt',.3,'stamp'),
  ('n_ranks',.3,'chime',4,.9),
  ('n_knight',.5,'hit_metal'),('n_knight','%0.5','chime'),('n_knight',1.2,'stamp'),
  ('n_double',.3,'pop'),('n_double','%0.55','boing'),
  ('n_end',.4,'stamp'),('n_end',.2,'chime'),('n_end','%0.85','rimshot')],
)
PLACE_SHOTS=[]
