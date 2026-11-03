EP=dict(id='eiffel',title="The Eiffel Tower Leans Away From The Sun",
 lines=[
  dict(t="On a sunny day, the top of the Eiffel Tower leans away from the sun.",c=["On a sunny day,","the top of the Eiffel Tower","leans away from the sun."],v='narr',pad=.1,shots=[('e_hook',1)]),
  dict(t="The sun heats the metal on one side of the tower.",c=["The sun heats the metal","on one side","of the tower."],v='narr',pad=.1,shots=[('e_heat',1)]),
  dict(t="And heated metal expands.",c=["And heated metal","expands."],v='narr',pad=.1,shots=[('e_exp',1)]),
  dict(t="Depending on the temperature, the top can shift up to eighteen centimeters.",c=["Depending on the temperature,","the top can shift","up to eighteen centimeters."],v='narr',pad=.1,shots=[('e_cm',1)]),
  dict(t="When it was finished, it became by far the tallest human-made structure in the world.",c=["When it was finished,","it became by far","the tallest human-made structure","in the world."],v='narr',pad=.1,shots=[('e_tall',1)]),
  dict(t="It held that title for forty-one years, until the Chrysler Building was finished in 1930.",c=["It held that title","for forty-one years,","until the Chrysler Building","was finished in 1930."],v='narr',pad=.1,shots=[('e_chr',1)]),
  dict(t="Today it is the second tallest free-standing structure in France, after the Millau Viaduct.",c=["Today it is the second tallest","free-standing structure in France,","after the Millau Viaduct."],v='narr2',shots=[('e_end',1)],pad=.6),
 ],
 sfx=[('e_hook',.04,'whoosh'),('e_hook',.5,'chime'),('e_heat',.3,'riser'),('e_heat','%0.5','stamp'),('e_exp',.3,'creak'),('e_cm',.3,'stamp'),('e_tall',.3,'stamp'),('e_chr',.3,'chime'),('e_end',.3,'stamp'),('e_end','%0.85','rimshot')],
)
PLACE_SHOTS=['e_hook','e_heat','e_exp','e_cm','e_tall','e_chr','e_end']
