---
---
##Wat? Hoe?


<div class="content-block">
{% assign items = site.wat-hoe | sort: 'priority' %}
{% for item in items %}
  <h3><a href="{{ item.url }}">{{ item.title }}</a></h3>
  <p>{{ item.excerpt }}</p>
{% endfor %}
</div>