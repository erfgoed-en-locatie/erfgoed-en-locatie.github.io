---
altHeader: true
layout: "home"
---

<div class="row" class="home-blocks">
        
	<div class="six columns">

		<h1 style="margin-bottom: 10px;"><a href="/thesaurus">Thesaurus</a></h1>

		<a href="/thesaurus">Zoek via de viewer</a><br />
		<a href="http://thesaurus.erfgeo.nl/">Tekstueel zoeken in de thesaurus</a><br />
		<a href="http://thesaurus.erfgeo.nl/bronnen">Overzicht gebruikte datasets</a><br />
		<!--
		<div id="searchbox-oud">
		<p>Bijvoorbeeld <a href="/thesaurus/#search=%22Heyloe%22">Heyloe</a>, 
						<a href="/thesaurus/#search=%22Nieuwer Amstel%22">Nieuwer Amstel</a>, 
						<a href="/thesaurus/#search=%22Worcum%22">Worcum</a>, 
						<a href="/thesaurus/#search=%22Volksvlijt%22">Volksvlijt</a>, 
						<a href="/thesaurus/#search=%22Morocco%22">Morocco</a>, 
						<a href="/thesaurus/#search=%22Stalinlaan%22">Stalinlaan</a>, 
						<a href="/thesaurus/#search=%22Monster%22">Monster</a>, 
						<a href="/thesaurus/#search=%22Dorestad%22">Dorestad</a></p>
			<div class="row">
				<div class="eight columns">
				<label>
					<input type="text" class="u-full-width" id="searchstring" placeholder="plaatsnaam, straatnaam, etc." data-keyuphandler="thesaurusSearch" style="margin-top: 10px;"/>
				</label>
				</div>
				<div class="four columns">
					<button class="button-primary" onclick="search();">Zoek</button>
				</div>
			</div>
		</div>
		-->
	</div>

	<div class="six columns">
		<h1><a href="/wat-hoe/index.html">Wat? Hoe?</a></h1>
		{% assign wathoe = site.wat-hoe | sort: 'priority' %}
		{% for item in wathoe limit:2 %}

		  <a href="{{ item.url }}">{{ item.title }}</a><br />
		{% endfor %}

		<a href="/wat-hoe/">&gt;&gt; meer</a>
	</div>

</div>

<div class="row" class="home-blocks">
        
	<div class="six columns">

		<h1><a href="/nieuws/index.html">Blog</a></h1>

		{% assign nieuws = site.nieuws | sort: 'priority' %}
		{% for item in nieuws limit:1 %}

		  <a href="{{ item.url }}">{{ item.title }}</a><br />
		  <p>{{ item.excerpt }}</p>
		{% endfor %}

		

	</div>

	<div class="six columns">
		<a href="/tools/index.html"><h1>Tools</h1></a><br>
		{% assign tools = site.tools | sort: 'priority' last %}
		{% for item in tools %}
		  {% if item.customUrl %}
		  	<a href="{{ item.customUrl }}">{{ item.title }}</a><br />
		  {% else %}
		  	<a href="{{ item.url }}">{{ item.title }}</a><br />
		  {% endif %}
		{% endfor %}
	</div>

</div>

<script type="text/javascript">
	var keyHandlerMap = {
			thesaurusSearch: thesaurusSearchKeyUp
		};

	function genericKeyHandler(e){
		var target = e.target || e.srcElement,
			handlerName = target.dataset.keyuphandler,
			handler = keyHandlerMap[handlerName];

		if(handler){
			handler.call(target, e);
		}
	}

	function thesaurusSearchKeyUp(e){
		var enterCode = 13;

		if(e.keyCode === enterCode){
			search();
			//location.href = '/thesaurus/#search=' + this.value
		}
	}

	document.addEventListener('keyup', genericKeyHandler);

	function search(){
		var searchstring = document.getElementById('searchstring').value;
		location.href = '/thesaurus/#search=' + searchstring;
	}
</script>

<!-- Piwik -->
<script type="text/javascript">
  var _paq = _paq || [];
  _paq.push(["setDomains", ["*.erfgeo.nl"]]);
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//stats.waag.org/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', '12']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<noscript><p><img src="//stats.waag.org/piwik.php?idsite=12" style="border:0;" alt="" /></p></noscript>
<!-- End Piwik Code -->
