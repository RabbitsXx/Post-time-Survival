"""Publish copy for THE LAST BUS Parts 1-10 (YouTube / TikTok / Instagram).  Part numbers here are the PUBLIC numbers 1..10.
STANDING RULES honoured here: YouTube tags (YT_TAGS, >= 8, <= 500 chars), part number + topic in every title, series name / part / topic announced in the video itself (PA at the start and the end)."""
P1_URL = None   # filled in once Part 1 is live

YT_TAGS = ("the last bus, last bus zombie, zombie bus, zombie apocalypse animation, zombie mystery, who is infected, infected among us, zombie story, "
           "animated zombie series, zombie survival, plot twist, apocalypse story, post time survival, funny zombie animation, zombie comedy, whodunit, "
           "locked room mystery, bus apocalypse, zombie shorts, animated mystery")
YT_HASH = "#shorts #zombie #zombieapocalypse #animation #thelastbus #mystery"
TT_HASH = "#zombie #zombieapocalypse #animatedstory #mystery #thelastbus #fyp"
IG_HASH = "#zombie #zombieapocalypse #animation #animatedstory #mystery #reels"

PREMISE = "12 strangers. 1 bus. 10 hours to the last ferry. And one of them is hiding a zombie bite."
CAST = ("THE PASSENGERS: Rosa (driver) · Priya (ER nurse) · Marcus (aggressively cautious) · Teddy (age 9, with Gary the dinosaur) · June (78, bottomless handbag) · "
        "Vic (live-streamer) · Lena (hoodie, secrets) · Benny (chicken suit) · Mr. Park (briefcase) · Dante (has seen every zombie movie) · Amara (and baby) · Walt (sound asleep). "
        "And BUS-E, the bus's very cheerful PA system.")
FOOT = ("Fiction and comedy. Voices are AI-generated; the animation is original.\n"
        "Watch the whole series in order: THE LAST BUS, Parts 1-10, from Post Time Survival.")

def head(n, nxt=None):
    s = f"THE LAST BUS — Part {n} of 10, from Post Time Survival\n{PREMISE}\n"
    if n > 1 and P1_URL: s += f"▶ Start from Part 1: {P1_URL}\n"
    return s + "\n"

def desc(n, body, nxt, ask):
    return (head(n) + body + "\n\n" + (f"🔔 Part {n+1} next: {nxt}.\n" if nxt else "🔔 That's the end of THE LAST BUS. A new series is coming.\n")
            + f"\n{ask}\nWhere was Steve (the polite zombie with the ticket) in this part? Tell me in the comments.\n\n" + CAST + "\n\n" + FOOT + "\n\n" + YT_HASH)

M = {
 1: dict(
  yt_title="12 Strangers On The Last Bus. 1 Is Hiding A Zombie Bite — The Last Bus, Part 1",
  yt_desc=desc(1,"The last bus out of the city leaves at 8 PM. The ferry at Pier 8 leaves at 6 AM. Ten stops, ten hours — and a bite takes about ten hours to turn you.\n"
                 "Priya, an ER nurse, lists the symptoms: fever, sweating, shaking, confusion, red eyes. Then she asks if anyone is bitten. Everybody says no. Somebody is lying.",
                 "the tunnel","WHO IS HIDING THE BITE? Name your suspect in the comments and we will see who guessed right in Part 9."),
  tt="Somebody on this bus is hiding a zombie bite. 🚌🧟 12 strangers, 10 hours, 1 liar. Who is it? Part 1 of 10.\n" + TT_HASH,
  ig="12 strangers. 1 bus. 10 hours to the last ferry. 🚌\nOne of them is hiding a zombie bite. Priya lists the symptoms. Everybody says they're fine. Who do you think is lying? Part 1 of 10 — Part 2 next.\n" + IG_HASH,
  pin="Who is hiding the bite? Drop your suspect below 👇 (and tell me where Steve was!) Part 2 is next: the tunnel."),
 2: dict(
  yt_title="The Bus Engine Is Off. One Sound Means Death — The Last Bus, Part 2 (The Tunnel)",
  yt_desc=desc(2,"800 meters of tunnel. Every sound echoes, so the bus coasts in silence. Then: a snoring man, a crying baby, a phone notification, a tactical flashlight, and a PA system with no volume control.\n"
                 "Real tip from Priya: in a tunnel, whisper like it's a library. Light is a loudspeaker.","the last drop",
                 "Which noise would have got YOU caught first? Tell me in the comments."),
  tt="800 meters of tunnel. 0 sounds allowed. 🤫🧟 One snore, one baby, one very loud bus. Part 2 of 10.\n" + TT_HASH,
  ig="The bus engine is off. Nobody make a sound. 🤫\nA snoring man, a baby, a phone, a flashlight and a PA system with no volume control. Part 2 of 10 — Part 3 next.\n" + IG_HASH,
  pin="Which noise would have got you caught first: the snore, the baby, the phone or BUS-E? 👇 Part 3 is next: the last drop."),
 3: dict(
  yt_title="A Zombie Apocalypse, Six Miles Of Fuel, And One Giant Chicken — The Last Bus, Part 3",
  yt_desc=desc(3,"Six miles of fuel. Eight miles to the highway. The only hope is a ghost gas station and a truck with a full tank.\n"
                 "Priya teaches the first rule of siphoning (never use your mouth: put the hose in the tank, keep the can lower, let gravity do the rest). Benny volunteers as a distraction. He is very white and very fast.",
                 "the chicken","What would YOU use as a distraction? Tell me in the comments."),
  tt="Six miles of fuel. Eight miles to go. One giant chicken. 🐔🧟 Part 3 of 10.\n" + TT_HASH,
  ig="Six miles of fuel, eight miles to the highway. 🐔\nThe only plan: siphon a truck and send a giant chicken to distract the horde. Part 3 of 10 — Part 4 next.\n" + IG_HASH,
  pin="Would you trust a chicken with your life? 🐔 Part 4 is next: the chicken."),
 4: dict(
  yt_title="Is The Chicken Bitten? Or Is That Just Ketchup? — The Last Bus, Part 4",
  yt_desc=desc(4,"A bloodstained chicken suit pounds on the door with a horde right behind him. Rule one: nobody gets on. Rule one has a chicken exception.\n"
                 "Is it a bite? Priya investigates (sweet, tomato, a little vinegar). And BUS-E accidentally mentions the driver's seat temperature. Thirty-nine degrees. The heater is off.",
                 "the sleeve check","Who is hiding the bite now? Update your suspect in the comments."),
  tt="Bitten… or just ketchup? 🐔🍅 Priya tastes the evidence. Part 4 of 10.\n" + TT_HASH,
  ig="Is the chicken bitten, or is that ketchup? 🍅🐔\nPriya investigates. Meanwhile BUS-E mentions the driver's seat is 39 degrees. Part 4 of 10 — Part 5 next.\n" + IG_HASH,
  pin="Did you catch the 39-degree seat? 👀 Tell me your suspect. Part 5 is next: the sleeve check."),
 5: dict(
  yt_title="Everybody Roll Up Your Sleeves. Someone Is Lying — The Last Bus, Part 5",
  yt_desc=desc(5,"Priya orders a sleeve check. Marcus has a tattoo nobody should ask about, June has a story about 1977, Dante has an emergency pizza, and Lena has a secret named Mochi.\n"
                 "Real tip: a bite is two curved rows of punctures. Parallel lines are scratches. And the driver refuses to be checked.",
                 "the briefcase","Who refused to show their arm? Tell me in the comments."),
  tt="Sleeves up! 🧟 Tattoo, hot pocket, kitten… and one person who refuses. Part 5 of 10.\n" + TT_HASH,
  ig="Sleeve check on the Last Bus. 💪\nA tattoo, an emergency pizza, a kitten called Mochi — and one person who refuses. Bite = two curved rows of punctures. Scratches = parallel lines. Part 5 of 10.\n" + IG_HASH,
  pin="Who refused the sleeve check? 👀 Part 6 is next: the briefcase."),
 6: dict(
  yt_title="He's Sweating, Shaking, Confused. Zombie… Or Something Else? — The Last Bus, Part 6",
  yt_desc=desc(6,"Mr. Park collapses: sweating, shaking, confused. Everybody screams 'turning!' Priya opens his briefcase.\n"
                 "Real tip: low blood sugar can look exactly like the symptom list. Fast sugar, about fifteen grams (soda, juice, candy) helps — and a vending machine in a dark diner is the only plan.",
                 "the drawbridge","Have you ever mistaken one problem for another? Tell me in the comments."),
  tt="Sweating. Shaking. Confused. 🧟 Zombie… or low blood sugar? Part 6 of 10.\n" + TT_HASH,
  ig="Sweating, shaking, confused — infected, or something else? 🥤\nSame symptoms, different cause. Part 6 of 10 — Part 7 next.\n" + IG_HASH,
  pin="Fun fact: low blood sugar can look like the whole symptom list. Did you suspect Mr. Park? 👇 Part 7 is next."),
 7: dict(
  yt_title="The Drawbridge Is Up. One (Scared) Man Must Climb The Tower — The Last Bus, Part 7",
  yt_desc=desc(7,"The bridge is up and it won't come down. Dante is sure there's a hidden lever or a ramp. There's a control tower, a ladder, a lever, and one man who is aggressively cautious.\n"
                 "Teddy sends Gary, the brave plastic dinosaur. Meanwhile the driver mixes up left and right.",
                 "the toll","Would you climb the tower? Tell me in the comments."),
  tt="The bridge is up. 🌉🧟 One scared man, one brave plastic dinosaur. Part 7 of 10.\n" + TT_HASH,
  ig="The drawbridge is up. 🌉\nSomeone has to climb the control tower. He's aggressively cautious. He has a dinosaur. Part 7 of 10 — Part 8 next.\n" + IG_HASH,
  pin="Did you notice what the driver said about left and right? 👀 Part 8 is next: the toll."),
 8: dict(
  yt_title="Zombie Raiders Want Everything We Own. Grandma Has A Pie — The Last Bus, Part 8",
  yt_desc=desc(8,"A toll road, a gang, and a very polite threat: the toll is everything you own. Dante has a legendary sword in his inventory (it's a stick). June has a cherry pie.\n"
                 "Priya's rule: noise is a weapon, if you aim it. And somebody on the bus is running out of time.",
                 "the glove","What would YOU have in your handbag? Tell me in the comments."),
  tt="The toll is EVERYTHING you own. 🥧🧟 Grandma has a pie. Noise is a weapon. Part 8 of 10.\n" + TT_HASH,
  ig="Raiders, a toll, and a cherry pie. 🥧\n'Noise is a weapon, if you aim it.' Part 8 of 10 — Part 9 next.\n" + IG_HASH,
  pin="Rosa said 'Not now.' 👀 What do you think she is hiding? Part 9 is next: the glove."),
 9: dict(
  yt_title="Take Off The Glove. Who Was Bitten All Along? — The Last Bus, Part 9",
  yt_desc=desc(9,"Priya has to see the driver's hand. Ten hours, a tunnel, a bridge and a toll — and the truth that was sitting at the wheel all night.\n"
                 "Would you stay on the bus?",
                 "Pier 8","Did you guess it? Comment who you suspected from Part 1."),
  tt="Rosa. Take off the glove. 🧤🚌 Part 9 of 10.\n" + TT_HASH,
  ig="Take off the glove. 🧤\nThe truth was sitting at the wheel all night. Part 9 of 10 — the finale is next.\n" + IG_HASH,
  pin="Did you guess it in Part 1, 4 or 5? 👇 The finale is next: Pier 8."),
 10: dict(
  yt_title="The Last Mile To Pier 8. The Ferry Leaves At Six — The Last Bus, Part 10 (Finale)",
  yt_desc=desc(10,"The last mile. The ferry leaves in twelve minutes. A horde on the pier, a man who has never driven a bus, and a horn that can be aimed.\n"
                  "The finale of THE LAST BUS.",
                  None,"What did you think of the ending? Tell me in the comments, and which series should come next."),
  tt="The finale. 🚌⛴️ The last mile to Pier 8. Part 10 of 10.\n" + TT_HASH,
  ig="The last mile to Pier 8. ⛴️\nThe ferry leaves at six. Part 10 of 10 — the finale. Thank you for riding the Last Bus.\n" + IG_HASH,
  pin="Thank you for riding the Last Bus 🚌 What should the next series be? 👇"),
}
