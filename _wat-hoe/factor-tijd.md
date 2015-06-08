---
title: Data toevoegen aan ErfGeo
excerpt: Erfgoedinstellingen kunnen zelf een dataset met PiTs maken en aanleveren. Maar hoe maak je zo'n dataset?
---

In een [vorig artikel](/wat-hoe/watvoordata.html) hebben we gezien wat voor data er in ErfGeo zit. Maar hoe voeg je er data aan toe? Of, specifieker, hoe voeg je er temporele gegevens aan toe?

Erfgoedinstellingen kunnen zelf een dataset met PiTs maken en aanleveren. Een medewerker van ErfGeo controleert en importeert de data vervolgens.

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
		<th>hasBeginning</th>
		<td>1971</td>
	</tr>
</table>


Elke PiT die we maken moet een binnen de dataset uniek id, een naam en een type hebben. Met de laatste twee waarden in het voorbeeld hierboven zeggen we dat de straat die de nieuwe PiT beschrijft dezelfde is als het Wevershof in het Nationaal Wegenbestand en dat de straat ontstaan is in 1971.


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
		<th>isUsedFor</th>
		<td>nwb/de-rijp-t-achterom</td>
	</tr>
	<tr>
		<th>hasEnd</th>
		<td>1970</td>
	</tr>
</table>




##De Beemstermeer - een verdwenen meer toevoegen

Ontginning van veen zorgde ervoor dat in de 12e eeuw het riviertje De Bamestra uitgroeide tot een binnenzee, een meer dat in open verbinding stond met de Zuiderzee. Begin 17e eeuw werd het meer drooggemaakt.

Omdat ErfGeo nog geen PiT van de Beemstermeer bevat, maken we er eentje aan. En we geven de nieuwe PiT een geometrie. Een geometrie kan een punt, een lijn of een polygoon zijn. Een punt mag als twee velden (lengte- en breedtegraad) meegeleverd worden, in de andere gevallen is het verplicht geojson aan te leveren. De tool <a href="/tools/histodraw.html">Histodraw</a> maakt dat een relatief eenvoudige exercitie.

<table>
	<tr>
		<th>id</th>
		<td>7</td>
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
		<th>hasBeginning</th>
		<td>1150</td>
	</tr>
	<tr>
		<th>hasEnd</th>
		<td>1612</td>
	</tr>
	<tr>
		<th>geometry</th>
		<td>{"type":"Polygon","coordinates":[[[4.836559295654297,52.540449426243796],[4.8427391052246085,52.5433726592131],[ ... voor de leesbaarheid is de polygoon iets ingekort! ... ],[4.835357666015625,52.53648187013421],[4.836559295654297,52.540449426243796]]]}</td>
	</tr>
</table>



##Midden-Beemster en De Rijp - het ontstaan van een plaats dateren

Tot dan de havenbuurt van Graft, splitste het rijker wordende De Rijp zich in 1607 af en werd een zelfstandige Banne. Het verderop gelegen Midden-Beemster kon vanzelfsprekend pas ontstaan na de drooglegging van de Beemstermeer.

Bij het leggen van de sameHgConcept relatie kan je verwijzen naar zowel een ErfGeo PiT id als een externe URI (zolang die maar bij ErfGeo bekend is).

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
		<th>sameHgConcept</th>
		<td>tgn/1047707</td>
	</tr>
	<tr>
		<th>hasBeginning</th>
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
		<th>sameHgConcept</th>
		<td>http://vocab.getty.edu/tgn/1047948</td>
	</tr>
	<tr>
		<th>hasBeginning</th>
		<td>1623</td>
	</tr>
</table>

##Een gemeentelijke herindeling: Graft-De Rijp 'absordbedBy' Alkmaar

Op 1 januari 2015 is de gemeente Graft-De Rijp opgegaan in de gemeente Alkmaar. Deze gemeentelijke herindeling is blijkbaar nog niet verwerkt in de door ErfGeo gebruikte datasets. Maar we kunnen zelf een PiT aanmaken die deze gemeentelijke herindeling beschrijft.

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
		<th>hasBeginning</th>
		<td>1970</td>
	</tr>
	<tr>
		<th>hasEnd</th>
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