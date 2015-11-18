---
title: Handleiding Standaardiseertool
excerpt: Toponiemen standaardiseren in bulk
post_author: Menno den Engelse
priority: 6
---


Wanneer u een lijst met plaatsnamen, straatnamen, adressen of bijvoorbeeld gemeentenamen heeft en deze wilt standaardiseren kunt u daarvoor de [standaardiseertool](http://standaardiseren.erfgeo.nl/) gebruiken. Werkt u liever met OpenRefine, dan leest u de [handleiding standaardiseren met OpenRefine en de ErfGeoProxy](openrefine.html). 

Drie goede redenen om te standaardiseren worden gegeven in het artikel [Standaardiseren](standaardiseren.html).

##Voorbereiding: een csv-bestand maken

De Standaardiseertool verwacht een csv-bestand als input dat een kolom met de te standaardiseren toponiemen bevat. Optioneel is een tweede veld dat een 'bredere' term bevat. Als de eerste kolom een straat bevat, kan de tweede een woonplaats bevatten. Of als de eerste kolom een woonplaats bevat, kan de tweede een gemeente of provincie bevatten.

Het csv-bestand mag meerdere kolommen bevatten - ik kan me voorstellen dat u er een door u gebruikte identifier in heeft opgenomen. Na standaardisatie download u uw oorspronkelijke csv-bestand, aangevuld met de gevraagde standaardiseringen en geomentrieën.

Het is handig uw bestand niet onnodig zwaar te maken: stop er niet meer kolommen in dan nodig en maak toponiemen (of combinaties van toponiemen en een 'breder' toponiem) zo mogelijk uniek.

Vanzelfsprekend worden resultaten beter naarmate de data 'schoner' is - de term `Schoterweg` zal, zeker in combinatie met de bredere term `Haarlem`, meer kans op resultaat geven dan een term als `Schoterweg (ter hoogte van de Kleverlaan)` en de bredere term `Haarlem / Kennemerland`.

Tot slot is het handig als de eerste rij van het csv-bestand de kolomnamen bevat.

##Het csv-bestand uploaden

Heeft u een account gemaakt en bent u ingelogd, dan kiest u in het menu van de [standaardiseertool](http://standaardiseren.erfgeo.nl/) 'Upload dataset'. U kunt daar aangeven welk scheidingsteken uw csv-bestand hanteert om velden te scheiden om de kans op een juiste interpretatie te vergroten. Verder wijst alles zich vanzelf.

##Opties ingeven

Het scherm 'Standaardiseeropties' vraagt als eerste welk veld het toponiem bevat en vervolgens of er een 'bredere term' beschikbaar is - daar hebben we het hierboven al over gehad.

Dan selecteert u het type waar u naar op zoek bent - kies 'hg:Street' voor straten, 'hg:Place' voor woonplaatsen, etc. Bevat uw dataset meerdere typen door elkaar, dan doorloopt u het proces zo vaak als nodig - wanneer u gaat standaardiseren laat de tool reeds gestandaardiseerde toponiemen met rust.

Rechtsboven geeft u de standaard op waarheen u wilt standaardiseren. Het is natuurlijk handig als deze standaard aansluit bij het opgegeven type - straten standaardiseren naar Gemeentegeschiedenis heeft net zo weinig zin als gemeentenamen standaardiseren naar het Nationaal Wegenbestand (nwb).

Hieronder is te zien welke combinaties bij de meestgebruikte typen het meeste opleveren:

<table class="table">
<tr>
<td>hg:Place</td>
<td>TGN of GeoNames (kennen met kleinste gehuchten ± 7000 plaatsen) of BAG (bevat ± 2500 plaatsen)</td>
</tr>
<tr>
<td>hg:Municipality</td>
<td>GeoNames (huidige gemeentes, met puntlocatie) of Gemeentegeschiedenis (alle historische gemeentes, bijgehouden tot ± 2011)</td>
</tr>
<tr>
<td>hg:Street</td>
<td>NWB (door ErfGeo samengestelde id's, maar met geometrieën) of BAG (geen geometrie)</td>
</tr>
<tr>
<td>hg:Address</td>
<td>BAG (met puntlocatie)</td>
</tr>
<tr>
<td>hg:Country</td>
<td>GeoNames</td>
</tr>
</table>

Het type hg:Building is wat problematisch. Weliswaar is elk gebouw uit de BAG dat groot genoeg is om een adres te bevatten opgenomen in ErfGeo, maar deze gebouwen hebben over het algemeen geen namen (soms hebben andere datasets wel een naam toegekend aan een gebouw). Zoeken op het adres dat ze bevatten kan niet met de standaardiseertool, maar middels de parameter `contains` wel met de [ErfGeoProxy](http://www.hicsuntleones.nl/erfgeoproxy/).

##Standaardiseren

U kunt eerst 20 records testen om te zien of de opgegeven instellingen iets opleveren. Vervolgens start u het standaardisatieproces met een druk op de knop 'bewaar en standaardiseer'. Zodra het standaardisatieproces is afgerond (bij grotere datasets kan dit vanzelfsprekend enige tijd duren) ontvangt u een email.

De resultaten van het proces zijn ondergebracht in vier tabbladen. Het eerste, 'Gestandaardiseerd', bevat de toponiemen die - met uw instellingen - precies één resultaat opleverden. Het kan zijn dat u hier nog fouten tussen ziet staan, die kunt u met de knop `niet juist` van deze tab verwijderen.

De tab 'Meerdere resultaten' bevat, inderdaad, toponiemen die meerdere resultaten opleverden. Door op 'bewerk' te klikken opent u alle bij een toponiem gevonden resultaten onder elkaar, met steeds het resultaat op een kaartje erbij, zodat u hier handmatig uw keuze kan maken.

De tab 'Geen resultaten' bevat alle toponiemen die geen resultaat gaven. Het kan zijn dat de geocoder de spellingsvariant van het toponiem niet kent en u wel. In dat geval kunt u handmatig een URI of id ingeven. U kunt dat natuurlijk ook later op uw eigen systeem doen, maar de hier ingegeven matches worden opgeslagen om later de geocoder te verrijken. Zo draagt u bij aan het verbeteren van de geocoder.

De tab 'Niet te achterhalen' dient om die toponiemen neer te zetten waarvan zowel de geocoder als u echt niet weten waar ze op slaan. Zo staan ze u niet meer in de weg als u de toponiemen op 'Meerdere resultaten' of 'Geen resultaten' probeert op te lossen.

U kunt het standaardisatieproces, met andere instellingen, zo vaak herhalen als u nodig acht. Zo kunt u bijvoorbeeld eerst naar plaatsen zoeken en die naar GeoNames standaardiseren, en in een tweede run naar straten en die naar de BAG standaardiseren.

##Downloaden

De knop 'Download csv-bestand' is te vinden op de detailpagina van de dataset. Klik daarvoor op de naam van de dataset. Uw krijgt uw originele bestand terug, aangevuld met een aantal velden dat de uri, id, naam, geometrie, type en dataset naam van het gestandaardiseerde toponiem bevat.


