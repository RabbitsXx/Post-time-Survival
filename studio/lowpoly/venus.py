# VENUS: A SPIN TAKES LONGER THAN A YEAR.  Facts: topics/venus.md (Wikipedia "Venus", raw text).
# Hook plan: frame 0 = astronaut mid-panic as calendar pages burst into the air around him; tag says DAY > YEAR.
EP=dict(id='venus',title="On Venus, A Day Is Longer Than A Year",
 lines=[
  dict(t="On Venus, spinning once takes longer than circling the Sun.",c=["On Venus,","spinning once takes longer","than circling the Sun."],v='narr',pad=.1,shots=[('v_hook',1)]),
  dict(t="One spin takes two hundred forty-three Earth days.",c=["One spin takes","two hundred forty-three","Earth days."],v='narr',pad=.1,shots=[('v_spin',1)]),
  dict(t="One trip around the Sun takes only two hundred twenty-five.",c=["One trip around the Sun","takes only","two hundred twenty-five."],v='narr',pad=.1,shots=[('v_orbit',1)]),
  dict(t="So one day on Venus really is longer than one year.",c=["So one day on Venus","really is longer","than one year."],v='narr',pad=.1,shots=[('v_cmp',1)]),
  dict(t="Venus also spins backwards, so the Sun would rise in the west. Thick clouds would hide it, though.",c=["Venus also spins backwards,","so the Sun would rise","in the west.","Thick clouds would hide it,","though."],v='narr',pad=.1,shots=[('v_west',1)]),
  dict(t="And one sunrise to the next takes about one hundred seventeen Earth days.",c=["And one sunrise","to the next takes about","one hundred seventeen","Earth days."],v='narr',pad=.1,shots=[('v_117',1)]),
  dict(t="Good luck planning a schedule there.",c=["Good luck","planning a schedule there."],v='narr2',shots=[('v_end',1)],pad=.6),
 ],
 sfx=[('v_hook',.04,'whoosh'),('v_hook',.2,'pop',6,.15),('v_hook','%0.5','wah'),
  ('v_spin',.3,'riser'),('v_spin','%0.85','stamp'),
  ('v_orbit',.3,'riser'),('v_orbit','%0.88','stamp'),
  ('v_cmp',.3,'pop'),('v_cmp',.8,'pop'),('v_cmp','%0.55','stamp'),('v_west',.3,'whoosh'),('v_west','%0.6','pop'),
  ('v_117',.3,'riser'),('v_117','%0.85','stamp'),
  ('v_end',.3,'wah'),('v_end','%0.85','rimshot')],
)
PLACE_SHOTS=['v_spin','v_orbit']
