---
altHeader: true
layout: "home"
---

<div class="row" class="home-blocks">
        
	<div class="six columns">
		<a href="http://geothesaurus.nl/"><h1 style="margin-bottom: 10px;">Thesaurus</h1></a>
		<p style="margin-bottom: 4px;">De thesaurus is lorem ipsum dolor via quaternion ambular conteccio</p>
		<label>
			Zoek een PIT in de thesaurus
			<input placeholder="bijv. kerkstraat" data-keyuphandler="thesaurusSearch" style="margin-top: 10px; width: 415px"/>
		</label>
	</div>

	<div class="six columns">
		<a href="/wat-hoe/index.html"><h1>Wat? Hoe?</h1></a><br>
		{% for item in site.wat-hoe %}
		  <a href="{{ item.url }}">{{ item.title }}</a><br />
		{% endfor %}
	</div>

</div>

<div class="row" class="home-blocks">
        
	<div class="six columns">
		<a href="/nieuws/index.html"><h1>Nieuws</h1></a>
	</div>

	<div class="six columns">
		<a href="/tools/index.html"><h1>Tools</h1></a><br>
		{% for item in site.tools %}
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
		var srcElement = e.srcElement,
			handlerName = srcElement.dataset.keyuphandler,
			handler = keyHandlerMap[handlerName];
		
		if(handler){
			handler.call(srcElement, e);
		}
	}

	function thesaurusSearchKeyUp(e){
		var enterCode = 13;

		if(e.keyCode === enterCode){
			location.href = 'http://histograph.io/viewer/#search=' + this.value
		}
	}

	document.addEventListener('keyup', genericKeyHandler);
</script>