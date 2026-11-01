// frame-gate support 1/2: register every person() so the gate can find them
(function(){const _p=person;person=function(o){const P=_p(o);(window.ALLP=window.ALLP||[]).push(P);return P}})();
