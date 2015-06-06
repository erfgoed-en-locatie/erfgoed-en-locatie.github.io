---
---


<h1>Nieuws</h1>


<div class="content-block">
{% for item in site.nieuws %}
  <h3><a href="{{ item.url }}">{{ item.title }}</a></h3>
  	<p>{{ item.created }} - {{ item.excerpt }}</p>
{% endfor %}
</div>