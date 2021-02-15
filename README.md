
# Desafio Back-end  Mestres da WEB

## Descrição
Com o atual cenário da pandemia, as empresas de todos os seguimentos tiveram que acelerar seu processo tecnológico, afim de continuar entregando valor para seu consumidor. 

Sendo assim, crie um sistema capaz de gerenciar o estoque de uma loja virtual de roupas, em que apenas o administrador da plataforma seja capaz de criar, listar, editar e deletar produtos. 

Todos os produtos devem apresentar a opção de cadastros de SKUs, ou seja, de variações do mesmo produto, indicando a quantidade correspondente a cada SKU. Ex: Camiseta com tamanhos P, M, G; Tênis com tamanhos 39, 40, 41, 42.

## Requisitos
 - NodeJS;
 - Docker;
 - Git
 - Internet;

## Instalação 

Baixe o projeto como o comando a seguir:

~~~bash
git clone https://github.com/JMoitta/desafio-mestres-da-web.git
~~~

Crie um container docker com o Postgres como comando a baixo:


~~~bash
docker run --name desafio_postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
~~~
Instale as depedencias do projeto:
~~~bash
yarn 
~~~
## Iniciar projeto
Agora só iniciar o projeto com o comando a baixo:
~~~bash
yarn dev:start
~~~
