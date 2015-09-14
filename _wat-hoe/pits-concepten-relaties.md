---
title: PiTs, HgConcepten en Relaties
excerpt: Wat zijn toch die fameuze PiTs? En hoe worden hgConcepten samengesteld? Hoe zit, kortom, de ErfGeo data in elkaar?
post_author: Menno den Engelse
priority: 2
---

ErfGeo bevat data uit vele bronnen. Elk van die bronnen kan informatie bevatten over een bepaalde straat, plaats, etc. Zo'n beschrijving van één zo'n plaats of straat in één dataset noemen we een PiT.

##Plaats in Tijd (PiT)

Een Plaats in Tijd, of Place in Time zo u wilt, beschrijft dus een straat, plaats, adres, gebouw, departement, etc. Elke PiT heeft een in ieder geval een `id`, een `name` en een `type`, en kan verder een `geometry`, een startdatum (`hasBeginning`), een einddatum (`hasEnd`) en een `uri` bevatten.

Meer dan bronnen met PiTs zit er niet in ErfGeo. Vaak zijn er meerdere PiTs die dezelfde plaats beschrijven. Een plaats als Amsterdam wordt door tientallen PiTs beschreven.

##Relaties

Tussen PiTs kunnen relaties worden gelegd. Zo kan je bijvoorbeeld zeggen dat de ene PiT hetzelfde concept beschrijft als een andere PiT, of dat de ene PiT in een andere ligt, of dat de ene PiT is opgegaan in de andere - bijvoorbeeld bij een gemeentelijke herindeling.

##HgConcepten

PiTs waarvan is aangegeven dat ze over dezelfde plaats gaan, met andere woorden PiTs die aan elkaar verbonden zijn met `hg:sameHgConcept` of `hg:isUsedFor` relaties, vormen samen een HgConcept. Die tweede relatie geeft aan dat de ene PiT een naam bevat die - bijvoorbeeld gedurende een bepaalde periode - werd of wordt gebruikt voor een PiT die een fysieke plaats beschrijft.

![Het HgConcept Heiloo](/images/klont.png)

Zo'n HgConcept is dus een dynamisch iets: er kunnen altijd nieuwe PiTs toegevoegd worden aan ErfGeo die een bestaand HgConcept beschrijven. Ook kan het best dat verschillende PiTs binnen één HgConcept elkaar tegenspreken. De ene zegt bijvoorbeeld dat de straat in 1900 is aangelegd, de andere noemt 1910 als begindatum.

Ook kan het voorkomen dat PiTs niet verbonden zijn terwijl dat eigenlijk wel zou moeten. Dan krijg je bijvoorbeeld twee Alkmaars terwijl er daar, binnen Nederland, toch maar één van is. Als we zo'n geval ontdekken, is het een kwestie van de juiste relatie leggen, om ze weer samen in een HgConcept te krijgen.