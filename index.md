---
altHeader: true
layout: "home"
---

<div class="row" class="home-blocks">
        
	<div class="six columns">

		<h1 style="margin-bottom: 10px;"><a href="/thesaurus">Thesaurus</a></h1>
		<div id="searchbox">
		<p>Zoek een plaats, gemeente, straat, etc.</p>
			<div class="row">
				<div class="eight columns">
				<label>
					<input type="text" class="u-full-width" id="searchstring" placeholder="bijv. spaarndam" data-keyuphandler="thesaurusSearch" style="margin-top: 10px;"/>
				</label>
				</div>
				<div class="four columns">
					<button class="button-primary" onclick="search();">Zoek</button>
				</div>
			</div>
		</div>
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

		<h1><a href="/nieuws/index.html">Nieuws</a></h1>

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