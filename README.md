# Pedidos de peças Microsens

Este projeto consiste em realizar o gerenciamento do processo de solicitação, atendimento, e faturamento das peças dos chamados do setor da Assistência técnica.

A aplicação Full Stack funciona recebendo pedidos do adminidtrativo, sendo atendido pelos técnicos e faturado pelo financeiro, gerando um histórico de toda a movimentação de peças.

## Layout web 
<img src="/assets/login.png">
<img src="/assets/dashboard.png">
<img src="/assets/cadastrarUser.png">
<img src="/assets/cadastrarPeca.png">
<img src="/assets/pecasCadastradas.png">
<img src="/assets/lancarPecas.png">
<img src="/assets/pecasPendentes.png">
<img src="/assets/hitorico.png">
<img src="/assets/faturar.png">
<img src="/assets/configuracoes.png">

## Documentação

### Diagrama de Classe

<img src="/assets/classDiagram.png">

### Diagrama de Caso de Uso

<img src="/assets/ucDiagram.png">

### Diagrama Entidade Relacionamento

<img src="/assets/DER.png">

### Diagrama de Implantação

<img src="/assets/implantationDiagram.png">

### Diagrama de Estado

# Tecnologias utlizadas

## Back end
* Java
* Spring Boot
* JPA
* Maven
* JWT Spring Security
* Lombok
* FlyWay

## Front End
* HTML
* SCSS
* TypeScript
* Angular

## Banco de Dados
* PostgreSQL

# Como executar o programa
## Back end
Pré-requisito: Java 17

```
# clonar repositório
git clone https://github.com/PedroArthurMicrosens/pedidosDePecas.git

# entrar na pasta do projeto back end
cd backend

# executar o projeto
./mvnw spring-boot:run
```

## Front end
Pré-requisito: Angular CLI 17.3.5. e npm

```
# clonar repositório
git clone https://github.com/PedroArthurMicrosens/pedidosDePecas.git

# entrar na pasta do projeto front end
cd frontend

# instalar dependências
npm install

# executar o projeto
npm start
```
## Configurar Conexão com banco de dados
Você vai precisar se uma IDE para editar o código ou a ferramenta "NotePad++" que pode ser baixada pelo Link: [NotePad++](https://notepad-plus-plus.org/downloads/v8.6.6/).

Após possuir a ferramenta acesse o seguinte caminho:

- pedidosDePecas
  - backend
    - src
      - main
        - java
          - com
            - lacamentopeca
              - pedidosDePecas
                - config

 Editar o arquivo config.java que está contido dentro da pasta "config".
 ```
    private final String url = "jdbc:postgresql://localhost:5432/nomeDoSeuBanco";
    private final String user = "seuUsuario";
    private final String password = "suaSenha";
```
altere os campos "nomeDoSeuBanco", "seuUsuario" e "suaSenha" com as respectivas credencias que você configurou ao instalar o PostgreSQL.
>[!IMPORTANT]
>
>Note que foi utilizado o banco de dados PostgreSQL, se você for utilizar um banco dferente será necessário algumas configurações diferentes.

Agora é necessário acessar o seguinte caminho:
- pedidosDePecas
  - backend
    - src
      - resource

e editar o arquivo: application.properties
```
spring.datasource.url=jdbc:postgresql://localhost:5432/nomeDoSeuBanco
spring.datasource.username=seuUsuario
spring.datasource.password=suaSenha
```

Altere da mesma forma que foi realizado na configuração anterior.
 
