# WHAT IF EVERYONE ON EARTH MOVED TO TEXAS - numbers-only explainer.  Source note: topics/tx.md.  Hook plan (HOOKS.md): frame 0 = pawns already flying from a globe into Texas; sentence 1 = the premise; a shake/boing at ~0.9 s.
EP=dict(id='tx',title="What If Everyone Moved To Texas?",
 lines=[
  dict(t="What if everyone on Earth moved to Texas? Would they even fit?",c=["What if everyone","on Earth moved to Texas?","Would they even fit?"],v='narr',pad=.1,shots=[('x_hook',1)]),
  dict(t="Texas covers about six hundred ninety-six thousand square kilometers.",c=["Texas covers about","six hundred ninety-six thousand","square kilometers."],v='narr',pad=.1,shots=[('x_area',1)]),
  dict(t="Spread eight point three billion people out evenly, and each person gets roughly eighty square meters.",c=["Spread eight point three","billion people out evenly,","and each person gets","roughly eighty square meters."],v='narr',pad=.1,shots=[('x_fill',1)]),
  dict(t="That is about twelve thousand people per square kilometer. Crowded, but less than Monaco, at about eighteen thousand, and Manhattan, at about twenty-nine thousand.",c=["That is about twelve thousand","people per square kilometer.","Crowded, but less than Monaco,","at about eighteen thousand,","and Manhattan,","at about twenty-nine thousand."],v='narr',pad=.1,shots=[('x_dens',1)]),
  dict(t="So yes, the whole world fits in Texas, and the rest of the planet would be empty.",c=["So yes, the whole world","fits in Texas,","and the rest of the planet","would be empty."],v='narr',pad=.1,shots=[('x_end',.6)]),
  dict(t="Everyone fits. Good luck finding parking.",c=["Everyone fits.","Good luck","finding parking."],v='narr2',shots=[('x_end',.4)],pad=.5),
 ],
 sfx=[('x_hook',.05,'whoosh'),('x_hook',.2,'pop',6,.12),('x_hook',.85,'boing'),('x_area',.3,'riser'),('x_area','%0.7','chime'),('x_fill',.4,'pop',10,.2),('x_fill','%0.6','stamp'),('x_dens',.3,'plink',3,.4),('x_dens','%0.7','chime'),('x_end','%0.4','thump'),('x_end','%0.9','rimshot')],
)
PLACE_SHOTS=['x_area','x_fill','x_dens']
