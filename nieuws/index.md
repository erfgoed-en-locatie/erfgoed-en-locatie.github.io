---
---


<h1>Nieuws</h1>


<div class="content-block">
{% assign items = site.nieuws | sort: 'priority' %}
{% for item in items %}
  <h3><a href="{{ item.url }}">{{ item.title }}</a></h3>
  	<p>{{ item.created }} - {{ item.excerpt }}</p>
{% endfor %}
</div>