# THE MAN WHO SOLD THE EIFFEL TOWER (Victor Lustig).  Facts: topics/lust.md (Wikipedia "Victor Lustig", raw text).
# Hook plan: frame 0 = dealer already sawing the tower's leg while the con man counts money; a SOLD sign slams on the tower at ~0.9 s.
EP=dict(id='lust',title="The Man Who Sold The Eiffel Tower",
 lines=[
  dict(t="A con man once sold the Eiffel Tower, as scrap metal.",c=["A con man once sold","the Eiffel Tower,","as scrap metal."],v='narr',pad=.1,shots=[('l_hook',1)]),
  dict(t="In 1925, Victor Lustig read that Paris was struggling to pay for its upkeep.",c=["In 1925,","Victor Lustig read that Paris","was struggling to pay","for its upkeep."],v='narr',pad=.1,shots=[('l_news',1)]),
  dict(t="So he invited scrap dealers to a hotel and pretended to be a government official.",c=["So he invited scrap dealers","to a hotel","and pretended to be","a government official."],v='narr',pad=.1,shots=[('l_hotel',1)]),
  dict(t="One dealer handed over about seventy thousand francs, bribe included.",c=["One dealer handed over","about seventy thousand francs,","bribe included."],v='narr',pad=.1,shots=[('l_money',1)]),
  dict(t="He was too embarrassed to call the police, so Lustig came back and tried again.",c=["He was too embarrassed","to call the police,","so Lustig came back","and tried again."],v='narr',pad=.1,shots=[('l_again',1)]),
  dict(t="He even took fifty thousand dollars from Al Capone, gave it back, and got a few thousand for his trouble.",c=["He even took","fifty thousand dollars","from Al Capone,","gave it back,","and got a few thousand","for his trouble."],v='narr',pad=.1,shots=[('l_capone',1)]),
  dict(t="He is known as the man who sold the Eiffel Tower twice.",c=["He is known as","the man who sold","the Eiffel Tower twice."],v='narr2',shots=[('l_end',1)],pad=.6),
 ],
 sfx=[('l_hook',.04,'whoosh'),('l_hook',.1,'creak',4,.18),('l_hook',.9,'thump'),('l_hook',.92,'boing'),
  ('l_news',.2,'pop'),('l_news',.6,'chime'),
  ('l_hotel',.2,'pop'),('l_hotel','%0.5','chime'),
  ('l_money',.4,'plop'),('l_money','%0.7','stamp'),
  ('l_again',.2,'foot',5,.2),('l_again','%0.55','wah'),
  ('l_capone',.3,'plop'),('l_capone','%0.62','stamp'),
  ('l_end',.3,'stamp'),('l_end','%0.85','rimshot')],
)
PLACE_SHOTS=[]
