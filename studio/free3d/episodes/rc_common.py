import sys,os;sys.path.insert(0,os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SER='REMAIN CALM'
Z=-0.6                      # centre of aisle between rows (z -3.4 and 2.2)
CO=-7.0                     # checkout lane x
def ch(who,x,z,expr='calm',**k):return dict(who=who,pos=[x,z],expr=expr,**k)
def L(who,en):return (who,en)
def S(cam,chars,lines=(),place='',fov=40,grade='calm',min=2.4,sfx=(),cues=(),pad=.3,lead=.25,**k):
    return dict(cam=cam,chars=list(chars),lines=list(lines),place=place,fov=fov,grade=grade,min=min,sfx=list(sfx),cues=list(cues),pad=pad,lead=lead,**k)
def CAM(a,b,c=None,d=None):return [a,b,c or a,d or b]
def CARD(top,items,line,min=5.4,sfx=()):
    return dict(card=dict(type='rules',top=top,items=items),chars=[],cam=[[0,1,0],[0,1,0],[0,1,0],[0,1,0]],lines=[line] if isinstance(line,tuple) else list(line),place='',min=min,sfx=list(sfx),cues=[],pad=.4,lead=.25,fov=40,grade='calm')
