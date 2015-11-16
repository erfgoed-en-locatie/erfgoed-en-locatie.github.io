---
title: Vector afbeeldingen op basis van GeoJSON
excerpt: Geen geoNerd maar vormgever? Er is een manier om zo'n lap geojson om te zetten naar een vectorafbeelding.
post_author: Menno den Engelse
priority: 5
---

Als je [een detailpagina in de ErfGeo thesaurus](http://thesaurus.erfgeo.nl/pit/?id=menno/9) bekijkt dan zie je onder het kaartje een blokje [GeoJSON](https://nl.wikipedia.org/wiki/GeoJSON), met daarin een lange lap code met iets dat waarschijnlijk coördinaten zijn. Als je je afvraagt wat je daar in mercatorsnaam mee aan moet, dan is dit artikel voor jou.

![haarlem](/images/geojson-voorbeeld.png)



Bij alle op ErfGeo aanwezige geometrieën (de puntjes, lijntjes en polygonen op de kaart) vind je zo'n stukje GeoJSON. Ook de [ErfGeo API](/tools/api.html) spuugt GeoJSON uit (daar kunnen we verderop ons voordeel nog mee doen).

##Waarom GeoJSON?

GeoJSON is een open formaat om geografische gegevens in op te slaan en mee uit te wisselen. Het kan zowel geometrieën als informatie over die geometrieën bevatten. Steeds meer (web)toepassingen kunnen ermee omgaan. Plak maar eens wat GeoJSON in [geojson.io](http://geojson.io/).

##Kaartjes maken

Wil je visualisaties maken op basis van geografische informatie, dan is [QGIS](http://www.qgis.org/nl/site/) waarschijnlijk de beste en in ieder geval de goedkoopste kandidaat. Vanzelfsprekend leest en schrijft QGIS GeoJSON probleemloos.

Maar de knoppenbalken in QGIS kunnen nogal intimiderend overkomen en de kans bestaat, zeker als je alleen wat simpele bewerkingen wilt doen, dat je liever in je vertrouwde vector programma werkt.

Onderstaande afbeelding, die de gemeente De Rijp (rood) toont, de fusie met Graft (lichtrood), de gebiedsuitbreidingen (roze) en tenslotte de opname in Alkmaar (blauw) is gemaakt in [Sketch](http://bohemiancoding.com/sketch/), een vector programma voor de Mac. Maar het had ook in het gratis [Inkscape](https://inkscape.org/nl/) of in het elke maand wederom te betalen Illustrator of elk ander programma gemaakt kunnen worden. Zolang het maar svg-bestanden leest.

![van gemeente De Rijp naar Alkmaar](/images/graftderijp-alkmaar.png)

##GeoJSON omzetten naar een svg-bestand

Het daadwerkelijke omzetten van de GeoJSON naar svg heb ik op [mapstarter.com](http://mapstarter.com/) gedaan. Om de GeoJSON zelf te krijgen had ik naar de respectieve detailpagina's van gemeente [De Rijp](http://thesaurus.erfgeo.nl/pit/?id=gemeentegeschiedenis-geometries/De_Rijp-1812), [Graft-De Rijp](http://thesaurus.erfgeo.nl/hgconcept/?id=geonames/2755374) en [Alkmaar](http://thesaurus.erfgeo.nl/pit/?id=bestuurlijke-grenzen-gemeenten-actueel/0361) kunnen gaan.

In plaats daarvan heb ik, als aangekondigd, mijn voordeel gedaan met de api. Ik heb de api gevraagd naar geoconcepten van het type gemeente (hg:Municipality) die "De Rijp" of "Alkmaar" in de naam hebben: [https://api.histograph.io/search?q="De Rijp"&#124;"Alkmaar"&type=hg:Municipality](https://api.histograph.io/search?q="De Rijp"&#124;"Alkmaar"&type=hg:Municipality). Zo had ik alle geometrieën in één keer, in de juiste schaal en op de juiste plaats ten opzichte van elkaar.

We hadden de api ook kunnen vragen naar alle departementen uit de Franse tijd: <a href="https://api.histograph.io/search?q=*&type=hg:Departement">https://api.histograph.io/search?q=*&amp;type=hg:Departement</a>

![Franse Departementen](/images/geojson-departementen.png)

##Nog een voorbeeld

Stel, je wilt een vectorafbeelding hebben van de bebouwde kom van Rotterdam om - we houden het simpel - dit op een t-shirt te printen. Dan is het stappenplan als volgt:

1. Zoek op Rotterdam en zorg dat je terecht komt op [thesaurus.erfgeo.nl/pit/?id=atlas-verstedelijking/Rotterdam-2010](http://thesaurus.erfgeo.nl/pit/?id=atlas-verstedelijking/Rotterdam-2010)
2. Kopieer de geojson en plak deze in een leeg tekstbestand (het moet platte tekst blijven, dus vermijd Word).
3. Sla het bestand op als `rotterdam.geojson`.
4. Ga naar [mapstarter.com/](http://mapstarter.com/), kies daar onder `choose file` het zojuist gemaakte bestand.
5. Onder `download` download je het svg-bestand.
6. Open het svg-bestand in je vector programma.
7. Doe er mee wat je wilt.

![t-shirt Rotterdam](/images/tshirt-rotterdam.png)

##Toekomst

In de toekomst hopen we het mogelijk te maken geojson te leveren naar al je specifieke wensen. Alle straten in een bepaalde stad bijvoorbeeld, of de geometrieën van alle kerken in Amsterdam, of alle gemeentes in Drenthe in 1859. We houden je op de hoogte!

