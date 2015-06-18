---
title: Plaatsaanduidingen in metadata standaardiseren
excerpt: Verrijk je metadata door plaats-, gemeente- en straatnamen te standaardiseren
post_author: Menno den Engelse
---

Er zijn drie goede redenen om topografische elementen te standaardiseren.

##Eenduidigheid

De eerste reden is een simpele: als je een gegeven plaatsaanduiding later nog eens tegenkomt wil je graag snappen om welke plaats het gaat. `Bergen`? Is dat het Noord-Hollandse of het Limburgse Bergen? Of misschien het Noorse Bergen of het Waalse Mons? Ook is Bergen wel eens gebruikt zonder de precisering 'op Zoom'.

Dit is op te lossen door `Bergen, Noord-Holland` te noteren. Al zou je dan eigenlijk ook aan moeten geven of het de plaats of de gemeente betreft, dat zijn immers twee verschillende entiteiten met verschillende eigenschappen. `Bergen, Noord-Holland, plaats` zou dus beter zijn.

Maar als je data uit verschillende bronnen met elkaar wil verbinden, dan loop je met die strategie al snel tegen een probleem. De kans is namelijk groot dat, hoe netjes je ook van je taak gekweten hebt, er in de ene bron `Gemeente Bergen, Noord-Holland` en in de andere `Gem. Bergen NH` staat, of `Bergen N.H., gemeente`. Als één van de bronnen door iemand anders wordt aangeleverd, is die kans natuurlijk nog veel groter.

Hoewel dit voor een mens geen probleem is, laat je bestanden met duizenden records waarschijnlijk liever door één of ander programmaatje aan elkaar koppelen. Als je handig bent kan je natuurlijk zelf wat code schrijven 
die `NH` en `N.H.` omzet naar `Noord-Holland`. Maar dit kost tijd, er blijven altijd wat gevallen over die handmatig na moet lopen en het zal de eerste keer niet zijn dat je de stad `Groningen` voor de provincie aanziet - of andersom.

##Verbinden met andere data

De tweede reden is dus 'verbindbaarheid'. Als je nou een algemeen gebruikte identificatiecode zou kunnen gebruiken, dan heb je van al die verschillende schrijfwijzes geen last meer. Geografische thesauri als TGN en GeoNames leveren dergelijke identificatiecodes. De GeoNames code voor de Noord-Hollandse plaats Bergen is `2759154`. Voor de gemeente Bergen heeft GeoNames een andere code, dat is `2759151`.

Als mens is het wel even slikken als je `2759154` ziet staan. Daarom zou ik altijd twee velden aanmaken: één met de machineleesbare code, en één met een voor mensen begrijpelijk label dat daarbij hoort. Je hoeft je bij dat label dan natuurlijk niet meer druk te maken over de juiste schrijfwijze - `Den Haag, ZH`, `'s Gravenhage` en `The Hague` mogen allemaal.

##Verrijking

De derde reden om te standaardiseren is verrijking. Stel dat je identificatiecode verwijst naar een plek waar meer informatie over de plaats in kwestie is te vinden. Bij GeoNames weten ze bijvoorbeeld van alles over Bergen, NH. Dat het in een gemeente met dezelfde naam ligt, bijvoorbeeld. Maar ook dat het op coördinaat `52.66917, 4.70417` ligt en dat de Russische naam 'Берген' is.

Als je nou in plaats van de identificatiecode een URI gebruikt, dan kunnen zowel mens als machine die link volgen om bij die informatie te komen. URI staat voor 'Uniform Resource Identifier' en is niets anders dan een URL die gebruikt wordt om iets te identificeren. De GeoNames URI voor Bergen is [http://sws.geonames.org/2759154](http://sws.geonames.org/2759154). Je ziet de identifiecatiecode die we hierboven al gebruikten in de URI terugkomen.

Aan de URI zie je ook meteen waar de identificatiecode vandaan komt. En is het mogelijk in één veld identificatiecodes van verschillende bronnen te gebruiken zonder in de problemen te komen. TGN levert ook URI's voor plaatsaanduidingen - die voor Bergen is [http://vocab.getty.edu/tgn/7007058](http://vocab.getty.edu/tgn/7007058). Had je alleen de identificatiecode `2759154` gehad en gedacht dat het een TGN code was, dan was je in [West Fork Brush Creek](http://vocab.getty.edu/tgn/2759154) terecht gekomen.


##Standaardiseren met coördinaten, is dat niet voldoende?

Geo-informatici opperen vaak dat je alleen met geometrie ook alles oplost. Dat is niet waar. Op basis van coördinaten weet je wel dat het om het Noord-Hollandse Bergen gaat, maar niet of het de plaats of gemeente betreft. Data verbinden op basis van coördinaten lukt wel, maar vraagt altijd enige inspanning - de eigenaar van de andere dataset heeft zijn puntje misschien vijftig of vijfhonderd meter verderop geprikt. En de verrijking gaat niet verder dan de coördinaten zelf, terwijl je bij TGN of GeoNames naast coördinaten ook nog hiërarchische gegevens, alternatieve namen, etc. tot je beschikking hebt.


##Handmatig of geautomatiseerd standaardiseren

Handmatig de juiste URI's vinden kan via de thesaurus van [ErfGeo.nl](http://erfgeo.nl) of rechtstreeks bij de organisatie die de URI's die je wilt gebruiken uitgeeft, [TGN](http://vocab.getty.edu/) of [GeoNames](http://www.geonames.org/) bijvoorbeeld. Let er bij GeoNames op dat een URI als domein `sws.geonames.org` heeft, maar dat Geonames je de informatie toont op domein `www.geonames.org`.


Bij grotere hoeveelheden data is het handiger een technisch iemand te vragen de data tegen een [API](https://en.wikipedia.org/wiki/Web_API) aan te houden. GeoNames heeft een API, TGN is als linked open data gepubliceerd en heeft een sparql endpoint. De [ErfGeo API](/tools/api.html) levert TGN, GeoNames en eigen URI's, en kent, hoewel beperkt tot Nederland, bovendien allerlei historische plaatsnaamvarianten.


Om ook niet-programmeurs grotere hoeveelheden data in een semi-automatisch proces te laten standaardiseren, heeft Erfgoed & Locatie een [standaardiseertool](/tools/standaardiseren.html) laten ontwikkelen. Deze tool laat je een csv-bestand met te standaardiseren plaatsnamen uploaden, standaardiseert er zelf zoveel mogelijk, en biedt voor de overige gevallen een interface waarin je zelf keuzes kan maken of URI's in kan voeren.


##Welke URI voor welk type?

In de voorbeelden hierboven betrof het steeds plaatsen en een enkele gemeente. Maar het kan ook om straten, adressen of gebouwen gaan. Of om de departementen die we hier kortstondig in de Franse Tijd hadden. Of om verdwenen plaatsen die TGN of GeoNames nooit gehaald hebben. Welke identifiers of URI's gebruik je in die gevallen?

Voor huidig Nederland kunnen we toe met de 'Big Five': voor plaatsen TGN of GeoNames, voor gemeenten Gemeentegeschiedenis (dat elke gemeente op een eigen URI desgewenst als html, json of rdfxml ontsluit), voor straten het Nationaal Wegenbestand (NWB) en voor gebouwen en adressen de Basisadministratie Adressen en Gebouwen (BAG).

Bij BAG en NWB moet de aantekening gemaakt worden dat deze bronnen helemaal niet als linked data beschikbaar zijn, en dus ook geen URI's hebben.  Die leemte vult ErfGeo op door elke plaatsaanduiding uit elke bron een eigen URI te geven. In een URI als [http://thesaurus.erfgeo.nl/hgconcept/bag.leiden/546010000035758](http://thesaurus.erfgeo.nl/hgconcept/bag.leiden/546010000035758) is het BAG id opgenomen van het adres in kwestie.

Bij het NWB was het creëren van een URI iets complexer. Het NWB bestaat namelijk niet uit straten, maar uit wegvakken - stukjes straat tussen twee kruisingen. Om de NWB data toch als straten op te kunnen nemen, hebben we de wegvakken van elke straat samengevoegd en een id gegeven als nwb/woonplaats-straatnaam. Dat levert URI's op als [http://thesaurus.erfgeo.nl/hgconcept/nwb/de-rijp-wevershof](http://thesaurus.erfgeo.nl/hgconcept/nwb/de-rijp-wevershof).

Er zijn topografische elementen die niet in de bovenstaande Big Five zijn opgenomen. Door zee verzwolgen dorpen bijvoorbeeld, of, omgekeerd, de drooggemaakte Beemstermeer. De straten die voor de Stopera zijn gesloopt zul je niet terugvinden in het NWB, en het Paleis voor Volksvlijt niet in de BAG.

ErfGeo maakt voor elk topografisch element dat door een opgenomen dataset beschreven wordt een URI aan. Voor de Beemstermeer is dat [http://thesaurus.erfgeo.nl/hgconcept/menno/5](http://thesaurus.erfgeo.nl/hgconcept/menno/5) geworden. Zo krijgen ook bovenstaande voorbeelden, mits opgenomen in ErfGeo, een URI.

Nog even op een rij:

<table>
<tr><th>Type</th><th>URI</th></tr>
<tr><td>plaats</td><td>TGN, GeoNames</td></tr>
<tr><td>gemeente</td><td>Gemeentegeschiedenis</td></tr>
<tr><td>straat</td><td>ErfGeo URI op basis van samengesteld NWB id</td></tr>
<tr><td>gebouw</td><td>ErfGeo URI op basis van BAG id</td></tr>
<tr><td>adres</td><td>ErfGeo URI op basis van BAG id</td></tr>
<tr><td>anders, bijv. verdwenen dorp</td><td>ErfGeo URI</td></tr>
</table>


##Persistentie 

Het gevaar dat altijd op de loer ligt is dat een URI niet persistent kan blijken te zijn. ErfGeo zelf is nog bezig hier een strategie voor te ontwikkelen. Wat moet ErfGeo bijvoorbeeld doen wanneer een nieuwe versie van een dataset wordt aangeleverd en daar elementen uit verdwenen zijn? BAG en NWB willen vooral de huidige stand van zaken beschrijven. Als een gebouw gesloopt wordt, zal het ook uit de BAG verwijderd worden.





