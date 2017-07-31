#Portal do Conhecimento com iMap integrado

Dependências:
1 - Django-1.9.4.dist-info 
2 - django 
3 - django_cors_headers-1.1.0-py3.4.egg-info 
4 - django_rest_swagger-0.3.5.dist-info 
5 - djangorestframework-3.3.3.dist-info
6 - swi-prolog 

Passos para iniciar os serviços:

- Adicione o PNL/play-2.2.6 no PATH do ambiente de trabalho.
- Para rodar o processador de linguagem natural vá até PNL/projeto e rode:	
	play clean
	play compile
	play run

- Para rodar servidor do portal vá até Portal-V0/ e rode: 
	python manage.py runserver
- Parar rodar o Swish vá até Swish/ e rode:
	swipl run.pl