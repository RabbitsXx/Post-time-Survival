EP=dict(id='hippo',title="Hippos Live In Water But May Not Swim",
 lines=[
  dict(t="Hippos spend their days in water, but it is debated whether they can swim at all.",c=["Hippos spend their days in water,","but it is debated","whether they can swim at all."],v='narr',pad=.1,shots=[('h_hook',1)]),
  dict(t="At night, they leave the water to graze on land, and by dawn they are back in it.",c=["At night,","they leave the water","to graze on land,","and by dawn","they are back in it."],v='narr',pad=.1,shots=[('h_night',1)]),
  dict(t="In the water, they move by walking along the bottom.",c=["In the water,","they move by walking","along the bottom."],v='narr',pad=.1,shots=[('h_walk',1)]),
  dict(t="Or by bouncing off it.",c=["Or by bouncing off it."],v='narr',pad=.1,shots=[('h_bounce',1)]),
  dict(t="They rarely enter deep water.",c=["They rarely","enter deep water."],v='narr',pad=.1,shots=[('h_deep',1)]),
  dict(t="An adult hippo needs to surface at least every six minutes.",c=["An adult hippo","needs to surface","at least every six minutes."],v='narr',pad=.1,shots=[('h_six',1)]),
  dict(t="And a young one needs air every two to three minutes.",c=["And a young one","needs air","every two to three minutes."],v='narr',pad=.1,shots=[('h_calf',1)]),
  dict(t="On land, hippos trot. So a swimmer? Maybe not.",c=["On land,","hippos trot.","So a swimmer?","Maybe not."],v='narr2',shots=[('h_end',1)],pad=.6),
 ],
 sfx=[('h_hook',.04,'whoosh'),('h_hook',.4,'plop',3,.5),('h_night',.3,'pop'),('h_walk',.3,'thump',4,.5),('h_bounce',.3,'plop',3,.7),('h_deep',.3,'pop'),('h_six',.3,'tick',5,.4),('h_six','%0.6','stamp'),('h_calf',.3,'pop'),('h_end',.3,'foot',5,.3),('h_end','%0.85','rimshot')],
)
PLACE_SHOTS=['h_night','h_hook','h_walk','h_bounce','h_deep','h_six','h_calf','h_end']
