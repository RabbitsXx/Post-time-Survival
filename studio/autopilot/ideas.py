#!/usr/bin/env python3
"""ideas.py : the idea bank for Post Time Survival.  Every topic = a NEW world (new setting, cast, structure, announcer device, gag, real survival tip) that stays FUN and teaches one real tip.
   python3 ideas.py next N     the next N unused seeds (not in the register, not in backlog.json) as JSON; the daily run develops them into worlds/<id>.json + 2 scripts
   python3 ideas.py list       every seed and its status
   python3 ideas.py done ID    mark a seed used (the daily run does it after the topic is built)
The seeds are starting points; the daily run may improve or replace them (a better, funnier idea beats the bank) but must keep the rules in studio/long/LIBRARY.md."""
import json,os,sys
R=os.path.dirname(os.path.abspath(__file__));BL=R+'/ideas/backlog.json';REG=R+'/../long/register.json'
STRUCT=['countdown','ascent (one floor/room per scene)','investigation (clues, one suspect per scene)','one-take chase','found recordings','heist (a plan, then it goes wrong)','relay (an item passed along)','cooking show / tutorial gone wrong','escape room (three locks)','weather clock (storm gets closer)','radio call-in show','tour guide who will not stop talking']
SEEDS=[
 ('supermarket','a supermarket on its last night shift','eat the freezer first, then the fridge, then the shelf','the intercom keeps playing sale announcements','a shopping cart with one bad wheel'),
 ('cabin','a mountain cabin in a snowstorm','boil water at least one minute; melt snow, never eat it raw','the old fireplace radio','a bear that is more scared than the humans'),
 ('ferry','a car ferry stuck mid-river','water is a moat: stay off the shore until you know the shore is empty','the ferry captain announcements','a seagull that steals the food'),
 ('school-gym','a school gym used as a shelter','know two exits from every room you sleep in','the gym coach whistle','a trophy case that becomes armour'),
 ('hospital','a night-shift hospital wing','stay low and quiet, wash hands, ration medicine','the PA that pages Doctor Nobody','a wheelchair used as a getaway vehicle'),
 ('lighthouse-keeper','a sea-cliff weather station','keep a written log: dates, supplies, rules','the weather ticker','a kettle that screams at the wrong moment'),
 ('gas-station','a highway gas station at 3 a.m.','never run an engine in a closed space; fuel stays outside','the pump speaker that says Thank you','a vending machine that eats coins and zombies'),
 ('library','a public library after closing','make a paper map: no battery, no signal needed','the librarian who says Shhh to zombies','a book cart used as a battering ram'),
 ('mall','an empty shopping mall with the lights flickering','stay on the edges and near exits, never the middle of an open floor','the mall jingle','mannequins that are not mannequins'),
 ('zoo','a zoo with the gates locked','animals sense danger first: watch what they do','the zoo tour recording','a llama who is the real leader'),
 ('train-yard','a rail yard with one working locomotive','follow the tracks: they lead to places and stay away from roads','the stationmaster whistle','a handcar that only goes uphill'),
 ('bakery','a village bakery with a wood oven','ration calories: small meals, same time every day','the oven timer','a baguette used for everything'),
 ('airport','an airport terminal during a flight delay','pack light: one bag you can run with','the gate announcements','a lost-luggage carousel'),
 ('cinema','a cinema stuck on its late show','stay in the dark, move on the loud scenes','the projector booth','a popcorn machine as a trap'),
 ('fire-station','a small fire station','smoke rises: stay low, cover your mouth, find a second way out','the station alarm bell','a fire pole used as an escape slide'),
 ('campground','a lakeside campground','never camp by the water path: pick high ground, one exit, no fire at night','the ranger radio','a canoe that has a mind of its own'),
 ('container-port','a shipping-container yard','stack and block: a heavy door beats a locked door','the crane operator voice','a container that is full of rubber ducks'),
 ('farm-market','a farmers market on the last Saturday','trade skills, not just goods: barter plan','the market loudspeaker','a scale that always says 3 kilos'),
 ('radio-tower','a hilltop radio station','a hand-crank radio and a written frequency list beat a phone','the on-air DJ who never stops','a microphone that picks up the wrong whispers'),
 ('hotel','a seaside hotel off-season','check every room once, mark cleared doors with tape','the lobby bell','a luggage cart chase'),
 ('swimming-pool','an indoor swimming pool complex','shallow water slows them, deep water stops them: know your depth','the lifeguard whistle','a pool noodle with a purpose'),
 ('dam','a hydro dam control room','know where the high ground is: floods, fires and crowds all go downhill','the control board lights','a switch labelled DO NOT PRESS'),
 ('desert-highway','a desert highway diner','carry water first, food second: one litre per hour of effort','the jukebox','a tumbleweed that follows them'),
 ('construction','a building site with a half-built tower','use heights and cranes: they cannot climb, but check your own anchors','the site foreman radio','a wheelbarrow that is always in the way'),
]
def used():
    u=set()
    try:u|={w['id'] for w in json.load(open(REG))['worlds']}
    except Exception:pass
    try:u|=set(json.load(open(BL)).get('used',[]))
    except Exception:pass
    return u
def seeds():
    out=[];n=len(json.load(open(REG))['worlds']) if os.path.exists(REG) else 0
    for i,(id_,setting,tip,dev,gag) in enumerate(SEEDS):out.append(dict(id=id_,setting=setting,real_tip=tip,announcer_idea=dev,gag_idea=gag,structure_idea=STRUCT[(i+n)%len(STRUCT)]))
    return out
if __name__=='__main__':
    a=sys.argv[1:] or ['list'];u=used()
    if a[0]=='next':print(json.dumps([s for s in seeds() if s['id'] not in u][:int(a[1]) if len(a)>1 else 3],indent=1,ensure_ascii=False))
    elif a[0]=='list':
        for s in seeds():print(('USED ' if s['id'] in u else 'free ')+s['id'],'-',s['setting'])
    elif a[0]=='done':
        b=json.load(open(BL)) if os.path.exists(BL) else {'used':[]};b['used']=sorted(set(b['used'])|{a[1]});json.dump(b,open(BL,'w'),indent=1)
