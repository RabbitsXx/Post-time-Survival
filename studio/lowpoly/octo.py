# AN OCTOPUS HAS THREE HEARTS - Post Time LowPoly.  Source note: studio/lowpoly/topics/octo.md
# Applies the verified method: hook = weirdest fact + matching first shot, one picture per clause, diagram/label shots between character shots, topic-specific sets and props, visual-gag ending.
EP=dict(id='octo',title="An Octopus Has Three Hearts",
 lines=[
  dict(t="An octopus has three hearts. And when it swims, one of them stops.",c=["An octopus","has three hearts.","And when it swims,","one of them stops."],v='narr',pad=.12,shots=[('o_hook',.55),('o_swim',.45)]),
  dict(t="Two hearts push blood through the gills. The third sends it to the rest of the body.",c=["Two hearts push blood","through the gills.","The third sends it","to the rest of the body."],v='narr',pad=.12,shots=[('o_two',1)]),
  dict(t="Swimming pauses that body heart, so it wears the octopus out fast.",c=["Swimming pauses","that body heart,","so it wears","the octopus out fast."],v='narr',pad=.12,shots=[('o_swim2',.5),('o_tired',.5)]),
  dict(t="Scientists think that's why octopuses would rather crawl.",c=["Scientists think","that's why octopuses","would rather crawl."],v='narr',pad=.12,shots=[('o_crawl',1)]),
  dict(t="Their blood is blue, too, because it runs on copper instead of iron.",c=["Their blood is blue, too,","because it runs on copper","instead of iron."],v='narr',pad=.12,shots=[('o_blue',1)]),
  dict(d=('poly',"...Same."),shots=[('o_poly',1)]),
  dict(t="Octopuses hate cardio.",c=["Octopuses","hate cardio."],v='narr2',shots=[('o_end',1)],pad=.9),
 ],
 sfx=[('o_hook',.7,'boing'),('o_hook',.95,'boing'),('o_hook',1.2,'boing'),('o_hook','%0.55','whoosh'),('o_swim',.0,'whoosh'),('o_two',.1,'plink',3,.25),('o_two','%0.55','chime'),('o_swim2',.0,'whoosh'),('o_tired',.2,'wah'),('o_crawl',.0,'plop',6,.2),('o_blue',.2,'plink'),('o_blue','%0.6','chime'),('o_poly',.1,'exhale'),('o_poly','%0.5','thump'),('o_end',.55,'rimshot')],
)
