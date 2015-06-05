---
title: Data toevoegen aan ErfGeo
---

In een <a href="">vorig artikel</a> hebben we gezien wat voor data er in ErfGeo zit. Maar hoe voeg je er data aan toe? Of, specifieker, hoe voeg je er temporele gegevens aan toe?

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
		<th>sameHgConcept</th>
		<td>nwb/de-rijp-wevershof</td>
	</tr>
	<tr>
		<th>hasBeginning</th>
		<td>1971</td>
	</tr>
</table>





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

Omdat ErfGeo nog geen PiT van de Beemstermeer bevat, hebben we nog geen bestaande Beemstermeer PiT om naar te verwijzen. Daarom geven we ook een geometrie mee. Een geometrie kan een punt, een lijn of een polygoon zijn. Een punt mag als twee velden (lengte- en breedtegraad) meegeleverd worden, in de andere gevallen is het verplicht geojson aan te leveren. Het tooltje Histodraw maakt dat een relatief eenvoudige exercitie.

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
		<th>hasBeginning</th>
		<td>1971</td>
	</tr>
	<tr>
		<th>hasEnd</th>
		<td>1612</td>
	</tr>
	<tr>
		<th>geometry</th>
		<td>{"type":"Polygon","coordinates":[[[4.836559295654297,52.540449426243796],[4.8427391052246085,52.5433726592131],[4.844970703125,52.54723520421158],[4.850120544433594,52.55172368081563],[4.8538970947265625,52.55652479874057],[4.859561920166016,52.559864397033024],[4.862823486328125,52.564351581934176],[4.8635101318359375,52.57040333679914],[4.8662567138671875,52.5748894436198],[4.871234893798828,52.57687153066553],[4.8772430419921875,52.578331958520074],[4.881191253662109,52.58135697574736],[4.882564544677734,52.58344307290583],[4.885654449462891,52.585111879151945],[4.887542724609374,52.59053506065283],[4.890117645263672,52.59428917780397],[4.8978424072265625,52.601796447229304],[4.906425476074219,52.605758098557764],[4.911918640136718,52.60659208475748],[4.91535186767578,52.60930243022841],[4.924621582031249,52.60805152239317],[4.928741455078125,52.605132598485966],[4.935951232910156,52.60680057882597],[4.943504333496094,52.61076177754226],[4.947967529296874,52.61388878659129],[4.9527740478515625,52.61388878659129],[4.956207275390625,52.61138719721736],[4.958953857421875,52.606175093642754],[4.957923889160156,52.60325604467093],[4.953117370605469,52.60137941045533],[4.949684143066406,52.599919750478996],[4.949684143066406,52.59762590081691],[4.9493408203125,52.59428917780397],[4.952430725097656,52.58949219325222],[4.954490661621094,52.58636344214016],[4.954490661621094,52.58406888269396],[4.953460693359375,52.58177420312145],[4.9555206298828125,52.580731127240206],[4.958610534667969,52.580731127240206],[4.963417053222656,52.58219142652432],[4.966850280761719,52.58406888269396],[4.973030090332031,52.58552907078575],[4.977836608886719,52.586989210232005],[4.981956481933594,52.58552907078575],[4.9871063232421875,52.58406888269396],[4.992256164550781,52.58240003673654],[4.996376037597656,52.57801901378955],[4.996376037597656,52.57468079766565],[4.990196228027344,52.57029900327264],[4.981269836425781,52.56529070208023],[4.976463317871094,52.56132539134846],[4.9774932861328125,52.55339369446022],[4.975090026855469,52.549218541178455],[4.9761199951171875,52.546295697522886],[4.974403381347656,52.54441662381244],[4.967193603515625,52.54128465552713],[4.9603271484375,52.53627304145946],[4.958953857421875,52.532305107923925],[4.956207275390625,52.526874723076205],[4.9555206298828125,52.52186146415167],[4.953460693359375,52.51663871100423],[4.9486541748046875,52.5143405029259],[4.945220947265625,52.511415336975304],[4.941444396972656,52.513086884218325],[4.933891296386719,52.511624283857785],[4.927711486816406,52.51120638909939],[4.918785095214844,52.51225111854443],[4.912261962890625,52.51684763305083],[4.904022216796875,52.517683311303244],[4.890975952148437,52.517892228382834],[4.8779296875,52.5197724373965],[4.868659973144531,52.522279257582305],[4.8614501953125,52.5249948180297],[4.8566436767578125,52.525412581659985],[4.850807189941406,52.52478593472457],[4.845314025878906,52.526039219655445],[4.837074279785156,52.53105200178694],[4.835357666015625,52.53648187013421],[4.836559295654297,52.540449426243796]]]}</td>
	</tr>
</table>



##Midden-Beemster en De Rijp - het ontstaan van een plaats dateren

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
		<th>sameHgConcept</th>
		<td>tgn/1047707</td>
	</tr>
	<tr>
		<th>hasBeginning</th>
		<td>1607</td>
	</tr>
</table>

## 