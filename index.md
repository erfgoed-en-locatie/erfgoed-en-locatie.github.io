---
altHeader: true
layout: "home"
---

<div class="row" class="home-blocks">
        
	<div class="six columns">
		<h1 style="margin-bottom: 10px;">Thesaurus</h1>
		<p style="margin-bottom: 20px;">De thesaurus is lorem ipsum dolor via quaternion ambular conteccio</p>
		<label>
			Zoek een PIT in de thesaurus
			<input placeholder="bijv. kerkstraat" data-keyuphandler="thesaurusSearch" style="margin-top: 10px; width: 415px"/>
		</label>
	</div>

	<div class="six columns">
		<h1>Wat? Hoe?</h1>
		{% for item in site.wat-hoe %}
		  <a href="{{ item.url }}">{{ item.title }}</a><br />
		{% endfor %}
	</div>

</div>

<div class="row" class="home-blocks">
        
	<div class="six columns">
		<h1>Nieuws</h1>
	</div>

	<div class="six columns">
		<h1>Tools</h1>
	
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