# WHAT IF NORTH KOREA RULED THE WORLD - Post Time LowPoly.  Numbers-only explainer: no claims about people, only sourced figures (topics/nk.md).
# Hook plan (HOOKS.md): frame 0 = flag already flying at a giant Earth; sentence 1 = the premise; a boing/shake when the flag lands (~0.9 s).
EP=dict(id='nk',title="What If North Korea Ruled The World?",
 lines=[
  dict(t="What if North Korea ruled the whole world? Let's do the math.",c=["What if North Korea","ruled the whole world?","Let's do the math."],v='narr',pad=.1,shots=[('n_hook',1)]),
  dict(t="North Korea has about twenty-six million people. The world has about eight point three billion.",c=["North Korea has about","twenty-six million people.","The world has about","eight point three billion."],v='narr',pad=.1,shots=[('n_pop',1)]),
  dict(t="So every North Korean would have to govern about three hundred and twenty people.",c=["So every North Korean","would have to govern","about three hundred","and twenty people."],v='narr',pad=.1,shots=[('n_ratio',1)]),
  dict(t="Its army has one point two eight million active soldiers, the fourth largest on Earth. That is one soldier for every six and a half thousand people.",c=["Its army has one point two eight","million active soldiers,","the fourth largest on Earth.","That is one soldier","for every six and a half","thousand people."],v='narr',pad=.1,shots=[('n_army',1)]),
  dict(t="It is believed to have around fifty nuclear weapons, the smallest stockpile of any nuclear-armed country. That is one for every hundred and sixty million people.",c=["It is believed to have","around fifty nuclear weapons,","the smallest stockpile","of any nuclear-armed country.","That is one for every","hundred and sixty million people."],v='narr',pad=.1,shots=[('n_nuke',1)]),
  dict(t="So the plan has one small problem: the world is really, really big.",c=["So the plan has","one small problem:","the world is","really, really big."],v='narr',pad=.1,shots=[('n_end',.7)]),
  dict(t="Ruling the world takes a lot of people.",c=["Ruling the world","takes a lot","of people."],v='narr2',shots=[('n_end',.3)],pad=.5),
 ],
 sfx=[('n_hook',.05,'whoosh'),('n_hook',.85,'boing'),('n_hook',.9,'pop'),('n_pop',.3,'riser'),('n_pop','%0.7','chime'),('n_ratio',.3,'pop',4,.25),('n_ratio','%0.6','boing'),('n_army',.3,'foot',8,.3),('n_army','%0.7','stamp'),('n_nuke',.3,'tick',6,.2),('n_nuke','%0.7','chime'),('n_end','%0.25','whoosh'),('n_end','%0.6','thump'),('n_end','%0.65','boing'),('n_end','%0.9','rimshot')],
)
PLACE_SHOTS=[]
