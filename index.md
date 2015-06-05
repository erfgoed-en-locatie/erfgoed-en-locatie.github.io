---
altHeader: true
layout: "home"
---


<div class="row" class="home-blocks">
        
	<div class="six columns">
		<h1>Thesaurus</h1>
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