---
title: Handleiding OpenRefine / ErfGeoProxy
excerpt: Toponiemen standaardiseren met OpenRefine en de ErfGeoProxy
post_author: Menno den Engelse
priority: 7
---


##Plaatsnamen standaardiseren met OpenRefine

[OpenRefine](http://openrefine.org/) (voorheen Google Refine) is een handige tool om data mee op te schonen en te verrijken. Je kunt OpenRefine ook gebruiken om plaatsnamen te standaardiseren - volg daarvoor de hieronder beschreven procedure. Als alternatief kunt u ook de [Standaardiseertool](standaardiseertool.html) gebruiken.

###1) Open je databestand in OpenRefine

Raadpleeg de [OpenRefine documentatie](http://openrefine.org/documentation.html) als je ergens niet uitkomt. Zorg dat je de plaatsnamen die je wilt standaardiseren in een aparte kolom hebt staan en open je databestand in OpenRefine.

###2) Hou de plaatsnamen tegen de ErfGeo API

Omdat de ErfGeo API zelf zoveel informatie biedt, dat het overzicht in deze exercitie enigszins verloren gaat, gebruiken we de boven op deze API gebouwde [ErfGeo Proxy](http://www.hicsuntleones.nl/erfgeoproxy/).

We gaan OpenRefine elke plaatsnaam tegen deze proxy houden en kiezen daarvoor in het menuutje bovenin de plaatsnamenkolom `Edit column > Add column by fetching url`.

![add column](/assets/imgs/add-column.png)

In het dialoogvenstertje dat nu opent geef je de nieuwe kolom een naam en vul je de expressie `"http://www.hicsuntleones.nl/erfgeoproxy/search/?q=" + escape(value,"url") + "&dataset=geonames"` in. Je precieze expressie is natuurlijk afhankelijk van wat je wilt standaardiseren en waar naar toe - je kan in plaats van 'geonames' ook 'tgn' gebruiken.

![add column](/assets/imgs/add-column2.png)

Als je op 'OK' klikt begint het proces. Dit kan een tijdje duren - een goed moment om koffie te gaan zetten. Maar als alles goed is gegaan zie je na verloop van tijd een extra kolom met het resultaat van je api aanroep.

![json](/assets/imgs/erfgeojson.png)

###3) JSON parsen

Het verkregen resultaat bevat, voor zover de api wat met je zoekvraag kon, de gegevens waar je naar op zoek was - in ons geval een GeoNames URI en een coördinaat.

Kies in het menuutje bovenin de kolom met het resultaat 'Edit column > Add column based on this column' en vul in het dialoogvenstertje de expressie `value.parseJson().results[0].geonames.uri` in.

![add column](/assets/imgs/add-column3.png)

Het resultaat is een extra kolom waar we keurig de GeoNames URIs in terugvinden. Als we de laatste handeling twee keer herhalen met de expressies `value.parseJson().results[0].geonames.geometry.coordinates[1]` en `value.parseJson().results[0].geonames.geometry.coordinates[0]` hebben we ook de lattitude en longitude geëxtraheerd.

![resultaat](/assets/imgs/result.png)

###4) data opschonen

Heb je echt goed opgelet, dan ben je in één van de dialoogvenstertjes hierboven een stukje json met twee resultaten voor 'Nederland' tegengekomen. Welke de juiste is, het land of het Gelderse plaatsje met dezelfde naam, dat zou eigenlijk handmatig bepaald moeten worden.

Stel dat we alleen een uri, lat en long willen opnemen wanneer er maar één resultaat is. Dan extraheren we eerst het 'num-found-with-datasets' op dezelfde wijze zoals we dat met de GeoNames URI, de lattitude en de longitude hebben gedaan. Gebruik daarvoor de expressie `value.parseJson()['num-found-with-datasets']`.

Klik dan op `Facet > Numeric Facet` in het menu bovenin de kolom 'count',

![numeric facet](/assets/imgs/numeric-facet.png)

In de linkerkolom verschijnt nu je facet, die je zo instelt dat alleen records met 2 of meer resultaten worden geselecteerd.

![numeric facet slide](/assets/imgs/numeric-facet-slide.png)

Pas dan `Edit cells > Common transforms > Blank out cells` toe op de velden long, lat en geonames.

![blank out cells](/assets/imgs/blank.png)

Verwijder de facet, zodat alle records weer te zien zijn. En voilá, Nederland is weer leeg!

![nl≠vol](/assets/imgs/nederland.png)

Op dezelfde manier kan je natuurlijk ook de BAG id's van gebouwen zoeken, de NWB geometrie van straten, etc.
