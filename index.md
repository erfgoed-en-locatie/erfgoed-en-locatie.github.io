---
altHeader: true
layout: "home"
---

<div class="row" class="home-blocks">
        
	<div class="six columns">

		<h1 style="margin-bottom: 10px;">Thesaurus</h1>
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
		<h1>Wat? Hoe?</h1>
		{% for item in site.wat-hoe limit:2 %}

		  <a href="{{ item.url }}">{{ item.title }}</a><br />
		{% endfor %}

		<a href="/wat-hoe/">&gt;&gt; meer</a>
	</div>

</div>

<div class="row" class="home-blocks">
        
	<div class="six columns">

		<h1>Nieuws</h1>

		{% for post in site.posts %}
		  <a href="{{ post.url }}">
		    <h2>{{ post.title }}</h2>
		  </a>
		  {{ post.content }}
		{% endfor %}

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

	function search(){
		var searchstring = document.getElementById('searchstring').value;
		location.href = 'http://histograph.io/viewer/#search=' + searchstring;
	}
</script>