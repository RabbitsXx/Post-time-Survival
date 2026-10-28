"""Publish copy for THE LAST SUNRISE Parts 1-5 (YouTube / TikTok / Instagram).  Part numbers here are the PUBLIC numbers 1..5."""
P1_URL = None   # filled in once Part 1 is live
YT_TAGS = ("what if the sun disappeared, what if the sun went out, sun dying, end of the world, apocalypse survival, survival animation, "
           "animated story, post apocalyptic story, frozen earth, ice age survival, last sunrise, stickman animation, survival story, "
           "hot spring survival, geothermal energy, apocalypse animation, cartoon survival, animated survival story, day by day survival, "
           "what would you do apocalypse, the sun goes out, sunless earth, dark sky apocalypse")
YT_HASH = "#shorts #apocalypse #survival #animation #animatedstory #whatif"
TT_HASH = "#apocalypse #survival #animatedstory #whatif #sun #fyp"
IG_HASH = "#apocalypse #survival #animation #animatedstory #whatif #reels"

def head(n, extra=""):
    s = f"THE LAST SUNRISE — Part {n} of 5, from Post Time Survival\n"
    if n > 1 and P1_URL: s += f"▶ Start from Part 1: {P1_URL}\n"
    return s + extra

M = {
 1: dict(
  yt_title="The Sun Just Went Out. Earth Has 8 Minutes Left — The Last Sunrise, Part 1",
  yt_desc=("The sun just went out. But its last light is still flying toward Earth, and for eight minutes and twenty seconds nothing seems wrong.\n"
           "Then the sky goes black at noon. Streetlights switch on. Mara, who runs a weather station in the mountains, packs a warm coat, a radio, a jar of seeds, and her dog, Ember.\n\n"
           + head(1, "\n🔔 Part 2 drops next: the first week.\n\nRule #1: heat is the real clock. What would YOU pack in eight minutes? Tell me in the comments.\n\n") + YT_HASH),
  tt=("The sun just went out — but Earth won't know for 8 minutes. ☀️🌑 What would you pack? Part 1 of 5.\n" + TT_HASH),
  ig=("The sun just went out. 🌑\nIts last light is still flying toward Earth — eight minutes and twenty seconds of normal life. Then the sky goes black at noon.\n"
      "Mara packs a coat, a radio, a jar of seeds… and her dog. What would you pack? Part 1 of 5. Part 2 next.\n" + IG_HASH),
  pin="Part 2 is next: the first week. What would you take in eight minutes? 👇"),
 2: dict(
  yt_title="How Fast Does A Town Freeze Without The Sun? Day By Day — The Last Sunrise, Part 2",
  yt_desc=("Seven days. That's all the heat this town has. Day three: snow falls in the dark. The power grid dies, state by state. People burn their furniture to stay warm.\n"
           "Mara's woodpile lasts four days — but her ground sensor says it's still thirty-eight degrees, forty feet down. The Earth keeps its own heat. Rule #2: follow the heat.\n\n"
           + head(2, "\n🔔 Part 3 drops next: the hot spring.\n\nTemperatures in the story fall from 15°C to −17°C in seven days. Would you make it? Tell me in the comments.\n\n") + YT_HASH),
  tt=("Day 3: snow in the dark. Day 7: −17°C. 🥶 The only warm thing left? The ground. Part 2 of 5.\n" + TT_HASH),
  ig=("A whole town freezing, day by day. 🥶\nThe power grid dies state by state, people burn their furniture — but forty feet down, the ground is still 38°C. Rule #2: follow the heat.\n"
      "Part 2 of 5. Part 3 next.\n" + IG_HASH),
  pin="Part 3 is next: the hot spring. Would you walk 12 miles in a blizzard? 👇"),
 3: dict(
  yt_title="12 Miles At -20°C To Reach The Only Warm Place On Earth — The Last Sunrise, Part 3",
  yt_desc=("Twelve miles, minus twenty, one sled built from an old door. Within an hour her eyelashes freeze. Rule #3: check your toes every hour.\n"
           "She crosses a frozen lake, drops flat when the ice cracks, and then sees a white column of steam: Eagle Hot Spring, thirty-eight degrees inside. But forty people are already there, and their leader blocks the door.\n\n"
           + head(3, "\n🔔 Part 4 drops next: a garden in the dark.\n\n“Seeds need light. We have none.” Could you prove him wrong? Tell me in the comments.\n\n") + YT_HASH),
  tt=("12 miles. −20°C. One sled made from a door. 🛷 Then: steam on the horizon… and a man blocking the door. Part 3 of 5.\n" + TT_HASH),
  ig=("She built a sled from an old door and walked 12 miles through a blizzard. 🛷\nAt hour six her toes turn white. The ice cracks. Then — steam. Eagle Hot Spring. 38°C inside. But the leader says there's no room for more mouths.\n"
      "Part 3 of 5. Part 4 next.\n" + IG_HASH),
  pin="Part 4 is next: can you grow food with no sun? 👇"),
 4: dict(
  yt_title="Can You Grow Food With No Sun? She Built A Garden Powered By Steam — The Last Sunrise, Part 4",
  yt_desc=("Their food lasts nine days. A radish takes twenty-five. Plants need heat, water, and light — and the spring already gives them heat and water.\n"
           "In a junkyard Mara finds a car alternator. Steam spins a fan, the fan makes power, and one bulb lights up, then twelve more. By day eight, little Pip waters the sprouts every morning. Then the lamps begin to flicker: the vent is clogging with white rock.\n\n"
           + head(4, "\n🔔 Part 5 drops next: the finale.\n\nWould you have thought of the alternator trick? Tell me in the comments.\n\n") + YT_HASH),
  tt=("No sun. No power. So she built a generator out of steam and a car alternator. ⚡🌱 Part 4 of 5.\n" + TT_HASH),
  ig=("How do you grow food with no sun? 🌱\nHeat and water from the hot spring. Light from a car alternator spun by steam. Day 4: a green sprout. Day 8: they eat. Then the lamps flicker.\n"
      "Part 4 of 5. The finale is next.\n" + IG_HASH),
  pin="Part 5 is the finale. Will the garden survive? 👇"),
 5: dict(
  yt_title="The Sun Is Gone. Here's How The Last Humans Made A New Sunrise — Part 5 Finale",
  yt_desc=("Half the camp wants to leave. Outside it's sixty below. The vent is clogged with white rock, and breaking it releases scalding steam. Someone has to hold the other end of the rod.\n"
           "Rule #4: nobody survives alone. On three, they push together. The crust cracks, steam roars upward, the fan spins faster than ever — and every lamp blazes at once. Pip has never seen a sunrise.\n\n"
           + head(5, "\n🔔 Follow for the next story from Post Time Survival.\n\nThe sun is gone, but morning isn't. What did you think of the ending? Tell me in the comments.\n\n") + YT_HASH),
  tt=("The sun is gone — so they built a new one. 🌅 The finale — Part 5 of 5.\n" + TT_HASH),
  ig=("Pip has never seen a sunrise. 🌅\nSo on the coldest night, forty people push a steel rod through the crust of a dying vent — and the lamps blaze. The sun is gone. Morning isn't.\n"
      "The finale — Part 5 of 5. Follow for the next story.\n" + IG_HASH),
  pin="That's the end of The Last Sunrise. Which part was your favourite? 👇"),
}
