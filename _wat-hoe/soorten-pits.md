---
title: Soorten PiTs 
excerpt: PiTs zijn er in allerlei soorten en maten. Hier zetten we alle types voor u op een rijtje.
---

De ene Plaats in Tijd (Place in Time) is de andere niet en het is van belang om verschillende ordes van grootte (of voorkomen in de tijd) van andere te kunnen onderscheiden. 
Om dat goed te kunnen doen zijn verschillende soorten PiTs gedefiniëerd. Op dit moment (juni 2015) zijn dat de volgende

##De soorten op een rij

- hg:Address
- hg:Monument
- hg:Fort
- hg:Building
- hg:Street
- hg:Neighbourhood
- hg:Borough
- hg:Place
- hg:Municipality
- hg:Water
- hg:Polder
- hg:Area
- hg:Region
- hg:Province
- hg:Baljuwschap
- hg:Barony
- hg:Departement
- hg:Countship
- hg:Heerlijkheid
- hg:Country

Voor de meest up to date versie van alle types; zie het <a href="https://raw.githubusercontent.com/histograph/schemas/master/json/pits.schema.json" title="pits.schema.json op github">pits schema</a> op github.

##Zoeken op type
Naar al deze types kan ook specifiek gezocht worden:

###Zoek naar de gemeente "Woerden"

- <a href="http://erfgeo.nl/thesaurus/#search=woerden%20type=hg:Municipality">erfgeo.nl/thesaurus/#search=woerden type=hg:Municipality</a>

###Zoek naar plaatsen die "Woerden" in hun naam hebben

- <a href="http://erfgeo.nl/thesaurus/#search=woerden%20type=hg:Place">erfgeo.nl/thesaurus/#search=woerden type=hg:Place</a>

###Zoek naar straten die "Woerden" bevatten

- <a href="http://erfgeo.nl/thesaurus/#search=woerden%20type=hg:Street">erfgeo.nl/thesaurus/#search=woerden type=hg:Street</a>

Ook hele andere dingen zijn mogelijk:

###Laat alle provincies zien
- <a href="http://erfgeo.nl/thesaurus/#search=*%20type=hg:Province">erfgeo.nl/thesaurus/#search=*%20type=hg:Province</a>

##Hierarchische relatie tussen PiTs

Op dit moment kan elke type PiT een relatie hebben met een ander type PiT. Dit zal echter niet altijd blijven kunnen en het team is bezig om restricties aan te brengen aan de relaties die gelegd kunnen worden. 
Het komt voor dat sommige typen PiTs slechts een beperkte periode in een bepaalde relatie met andere typen PiTs, staan. Bijvoorbeeld de volgende:

In de Frans-Bataafse tijd waren er in de Nederlanden geen provincies maar had je departementen, dus moet alleen voor die periode de volgende relatie kunnen bestaan:

     "hierarchy": [
           "hg:Place",
           "hg:Municipality",
           "hg:Departement",
           "hg:Country"
         ]

     
En na 1815 ziet dat er dan als volgt uit:

    "hierarchy": [
          "hg:Place",
          "hg:Municipality",
          "hg:Province",
          "hg:Country"
        ]


De hierarchieën die gehanteerd worden zullen via <a href="https://raw.githubusercontent.com/histograph/schemas/master/ontology/hierarchies.json" title="hierarchies.json file op github">deze link</a> terug te vinden zijn. 



