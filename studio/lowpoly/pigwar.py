# THE PIG WAR - sample clip 1.  Source notes: studio/lowpoly/topics/pig_war.md
EP=dict(id='pig_war',title='The Pig War',
 lines=[
  dict(t="In 1859, an American farmer shot a pig.",v='narr',shots=[('munch',.3),('aim',.3),('bang',.4)]),
  dict(t="It was eating his garden. And it belonged to a British company.",v='narr',shots=[('pigflag',.5),('shrug',.5)]),
  dict(t="Britain threatened to arrest him.",v='narr',shots=[('twoshot',.5),('sweatcu',.5)]),
  dict(t="So America sent soldiers.",v='narr',shots=[('march',.6),('flagplant',.4)]),
  dict(t="So Britain sent warships.",v='narr',shots=[('ship',.6),('cannon',.4)]),
  dict(t="Soon, hundreds of soldiers and ships were glaring at each other, over one dead pig.",v='narr',shots=[('standoff',.4),('pigcu',.25),('glare',.35)]),
  dict(t="Thankfully, nobody else was hurt.",v='narr',shots=[('peace',1)]),
  dict(t="The pig was the only casualty.",v='narr',shots=[('grave',1)]),
  dict(t="It took twelve years, and a German emperor, to settle who owned the island.",v='narr',shots=[('years',.5),('kaiser',.5)]),
  dict(t="The pig was not consulted.",v='narr2',shots=[('ghost',1)],pad=.7),
 ],
 # (shot, offset seconds or '%f' fraction of shot, sfx name[, repeat, gap seconds])
 sfx=[('munch',.1,'munch',4,.28),('munch',.3,'oink'),('aim',.5,'click'),('bang',.28,'gun'),('bang',.36,'squeal'),('bang',.83,'thud'),
  ('pigflag',.2,'oink'),('pigflag',.5,'munch',3,.28),('shrug',.15,'plink'),('twoshot',.0,'whoosh'),('twoshot',.5,'plink'),('sweatcu',.2,'plink',3,.4),
  ('march',.0,'foot',40,.26),('flagplant',.0,'whoosh'),('flagplant',.25,'chime'),('ship',.0,'wave'),('ship',.5,'creak'),('cannon',.0,'creak'),('cannon',.3,'sting'),
  ('standoff',.0,'riser'),('pigcu',.0,'fly',1,0),('glare',.1,'plink',3,.45),('peace',.0,'chime'),('peace',.4,'thump'),('grave',.0,'bugle'),
  ('years',.0,'tick',13,'%0.07'),('kaiser',.0,'whoosh'),('kaiser','%0.8','stamp'),('ghost',.0,'chime'),('ghost','%0.55','slide')],
)
