---
title: Data toevoegen aan ErfGeo
excerpt: Erfgoedinstellingen kunnen zelf een dataset met PiTs maken en aanleveren. Maar hoe maak je zo'n dataset?
post_author: Menno den Engelse
priority: 8
---

Er zit inmiddels [flink wat data](/wat-hoe/watvoordata.html) in ErfGeo. Maar hoe voeg je er data aan toe?

Erfgoedinstellingen kunnen zelf een dataset met PiTs maken en aanleveren. Een medewerker van ErfGeo controleert en importeert de data vervolgens. Heb je hier hulp bij nodig, dan kan je altijd even contact opnemen.

Dit artikel geeft een aantal voorbeelden van PiTs die je in zo'n dataset op kan nemen.


##Aanleg van een bestaande straat dateren

Het in ErfGeo opgenomen Nationaal Wegenbestand (NWB) bevat alle huidige straten van Nederland, maar vertelt niet wanneer een straat is ontstaan. Nou weet ik dat het Wevershof in De Rijp rond 1971 is aangelegd. Die straat aanpassen in de NWB zelf is niet mogelijk. Immers, ErfGeo bevat data uit bronnen, en alleen als de data in de bron wijzigt kan de wijziging vervolgens in ErfGeo worden geïmporteerd. 

Wat wel mogelijk is, is een PiT maken in een eigen dataset. Als we die een relatie geven met de PiT in kwestie en een beginjaar toevoegen, dan hebben we ons doel bereikt.

<table>
	<tr>
		<th>id</th>
		<td>1</td>
	</tr>
	<tr>
		<th>name</th>
		<td>Wevershof</td>
	</tr>
	<tr>
		<th>type</th>
		<td>hg:Street</td>
	</tr>
	<tr>
		<th>sameHgConcept</th>
		<td>nwb/de-rijp-wevershof</td>
	</tr>
	<tr>
		<th>periodValidFor</th>
		<td>existence</td>
	</tr>
	<tr>
		<th>validSince</th>
		<td>1970-1972</td>
	</tr>
</table>

Elke PiT die we maken moet of een binnen de dataset uniek id hebben of een URI. Verder heeft een PiT meestal een naam en altijd een type. Met de laatste twee waarden in het voorbeeld hierboven zeggen we dat de straat die de nieuwe PiT beschrijft dezelfde is als het Wevershof in het Nationaal Wegenbestand en dat de straat ontstaan is tussen 1970 en 1972. 

De velden die de periode beschrijven, validSince en validUntil, mogen als datum `yyyy-mm-dd` of als jaar `yyyy` gegeven worden. Beide velden mogen ook als twee afzonderlijke waarden aangeleverd worden om een periode aan te geven, bijvoorbeeld met een veld validSince-minValue en een veld validSince-maxValue.

Overigens geldt voor alle veldnamen: de precieze naamgeving maakt niet uit, tijdens het importeren worden de velden gemapt.

##Een historische straatnaam toevoegen

In De Rijp loopt, ten noorden van de hoofdstraat, een klein straatje dat 't Achterom heet. Tot 1970 heette dit straatje Noorderstraat, maar in dat jaar fuseerde de gemeente De Rijp met de gemeente Graft en in die gemeente liep ook al een Noorderstraat.

Met een PiT die de volgende velden bevat kunnen we die informatie toevoegen:

<table>
	<tr>
		<th>id</th>
		<td>2</td>
	</tr>
	<tr>
		<th>name</th>
		<td>Noorderstraat</td>
	</tr>
	<tr>
		<th>type</th>
		<td>hg:Street</td>
	</tr>
	<tr>
		<th>periodValidFor</th>
		<td>toponym</td>
	</tr>
	<tr>
		<th>sameHgConcept</th>
		<td>nwb/de-rijp-t-achterom</td>
	</tr>
	<tr>
		<th>validUntil</th>
		<td>1970</td>
	</tr>
</table>




##De Beemstermeer - een verdwenen meer toevoegen

Ontginning van veen zorgde ervoor dat in de 12e eeuw het riviertje De Bamestra uitgroeide tot een binnenzee, een meer dat in open verbinding stond met de Zuiderzee. Begin 17e eeuw werd het meer drooggemaakt.

Omdat ErfGeo nog geen PiT van de Beemstermeer bevat, maken we er eentje aan. En we geven de nieuwe PiT een geometrie. Een geometrie kan een punt, een lijn of een polygoon zijn. Een punt mag als twee velden (lengte- en breedtegraad) meegeleverd worden, in de andere gevallen is het verplicht geojson aan te leveren. Een tool als <a href="/tools/histodraw.html">Histodraw</a> of [geojson.io](http://geojson.io) maakt dat een relatief eenvoudige exercitie.

<table>
	<tr>
		<th>id</th>
		<td>5</td>
	</tr>
	<tr>
		<th>name</th>
		<td>Beemstermeer</td>
	</tr>
	<tr>
		<th>type</th>
		<td>hg:Water</td>
	</tr>
	<tr>
		<th>validSince</th>
		<td>1150-1250</td>
	</tr>
	<tr>
		<th>validUntil</th>
		<td>1607-1612</td>
	</tr>
	<tr>
		<th>periodValidFor</th>
		<td>existence</td>
	</tr>
	<tr>
		<th>geometry</th>
		<td>{"type":"Polygon","coordinates":[[[4.836559295654297,52.540449426243796],[4.8427391052246085,52.5433726592131],[ ... voor de leesbaarheid is de polygoon iets ingekort! ... ],[4.835357666015625,52.53648187013421],[4.836559295654297,52.540449426243796]]]}</td>
	</tr>
</table>

Op dezelfde wijze kan je ook een verdwenen gebouw toevoegen, al zal de geometrie daar een kleiner oppervlak beslaan.

##Midden-Beemster en De Rijp - het ontstaan van een plaats dateren

Tot dan de havenbuurt van Graft, splitste het rijker wordende De Rijp zich in 1607 af en werd een zelfstandige Banne. Het verderop gelegen Midden-Beemster kon vanzelfsprekend pas ontstaan na de drooglegging van de Beemstermeer.

Bij het leggen van de sameHgConcept relatie kan je verwijzen naar zowel een ErfGeo PiT id als een externe URI. Een PiT heeft alleen een id als ie geen URI heeft. De Thesaurus of Geographic Names heeft URIs, dus die gebruiken we hier om te verwijzen.

<table>
	<tr>
		<th>id</th>
		<td>3</td>
	</tr>
	<tr>
		<th>name</th>
		<td>De Rijp</td>
	</tr>
	<tr>
		<th>type</th>
		<td>hg:Place</td>
	</tr>
	<tr>
		<th>periodValidFor</th>
		<td>existence</td>
	</tr>
	<tr>
		<th>sameHgConcept</th>
		<td>http://vocab.getty.edu/tgn/1047707</td>
	</tr>
	<tr>
		<th>validSince</th>
		<td>1607</td>
	</tr>
</table>



<table>
	<tr>
		<th>id</th>
		<td>4</td>
	</tr>
	<tr>
		<th>name</th>
		<td>Midden-Beemster</td>
	</tr>
	<tr>
		<th>type</th>
		<td>hg:Place</td>
	</tr>
	<tr>
		<th>periodValidFor</th>
		<td>existence</td>
	</tr>
	<tr>
		<th>sameHgConcept</th>
		<td>http://vocab.getty.edu/tgn/1047948</td>
	</tr>
	<tr>
		<th>validSince</th>
		<td>1623</td>
	</tr>
</table>

##De naam van een gebouw toevoegen

In principe heeft elk gebouw in Nederland een BAG id. Maar er zijn ook gebouwen met een welluidender naam. Zo staat het pand met BAG id 365100000000350 bekend als 'De Arend', vanwege de arend die de top van het pand siert. Die informatie kunnen we als volgt opnemen:

<table>
	<tr>
		<th>id</th>
		<td>6</td>
	</tr>
	<tr>
		<th>name</th>
		<td>De Arend</td>
	</tr>
	<tr>
		<th>type</th>
		<td>hg:Building</td>
	</tr>
	<tr>
		<th>sameHgConcept</th>
		<td>bag/365100000000350</td>
	</tr>
</table>

##Omnummeringen

Elke archivaris weet: een adres is een dynamisch ding. Niet alleen straten veranderen van naam, ook nummeringen willen nogal eens wijzigen. Hier geven we op dat het huidige adres Oosteinde 51, bij de BAG bekend onder id 0365200000001832, tussen 1961 en 2002 bekend stond als nummer 47.

<table>
	<tr>
		<th>id</th>
		<td>8</td>
	</tr>
	<tr>
		<th>name</th>
		<td>Oosteinde 47</td>
	</tr>
	<tr>
		<th>type</th>
		<td>hg:Address</td>
	</tr>
	<tr>
		<th>validSince</th>
		<td>1961</td>
	</tr>
	<tr>
		<th>validUntil</th>
		<td>2002</td>
	</tr>
	<tr>
		<th>periodValidFor</th>
		<td>toponym</td>
	</tr>
	<tr>
		<th>sameHgConcept</th>
		<td>bag/365200000001832</td>
	</tr>
</table>

##Een gemeentelijke herindeling: Graft-De Rijp 'absordbedBy' Alkmaar

Op 1 januari 2015 is de gemeente Graft-De Rijp opgegaan in de gemeente Alkmaar. Deze gemeentelijke herindeling is blijkbaar nog niet verwerkt in alle de door ErfGeo gebruikte datasets. Maar we kunnen zelf een PiT aanmaken die deze gemeentelijke herindeling beschrijft.

Met de sameHgConcept relatie koppelen we de nieuwe PiT aan de bestaande gemeente Graft-De Rijp PiT's, en met de absorbedBy relatie vertellen we dat de gemeente op haar einddatum is opgegaan in Alkmaar.

<table>
	<tr>
		<th>id</th>
		<td>7</td>
	</tr>
	<tr>
		<th>name</th>
		<td>Graft-De Rijp</td>
	</tr>
	<tr>
		<th>type</th>
		<td>hg:Municipality</td>
	</tr>
	<tr>
		<th>validSince</th>
		<td>1970</td>
	</tr>
	<tr>
		<th>validUntil</th>
		<td>2015-01-01</td>
	</tr>
	<tr>
		<th>sameHgConcept</th>
		<td>http://www.gemeentegeschiedenis.nl/gemeentenaam/Graft-De_Rijp</td>
	</tr>
	<tr>
		<th>absorbedBy</th>
		<td>http://www.gemeentegeschiedenis.nl/gemeentenaam/Alkmaar</td>
	</tr>
</table>

Bovenstaande informatie is allemaal terug te vinden in <a href="/assets/examples/voorbeelden-menno.csv">dit csv-bestand</a>, waarmee ik de dataset op ErfGeo heb aangemaakt.