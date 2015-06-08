---
---
##Wat? Hoe?


<div class="content-block">
{% for item in site.wat-hoe %}
  <h3><a href="{{ item.url }}">{{ item.title }}</a></h3>
  <p>{{ item.excerpt }}</p>
{% endfor %}
</div>