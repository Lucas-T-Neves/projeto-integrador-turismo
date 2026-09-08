# Projeto Integrador — Roteiros de viagem

Aplicação desenvolvida para integrar as disciplinas de **Front-end** e **Programação Web**. O projeto permite cadastrar viagens e consultar os roteiros persistidos pela API REST.

A solução foi organizada em dois diretórios:

- `client`: interface em React com Vite;
- `api`: API REST em Java, Spring Boot e JdbcTemplate.

## Tema e funcionamento

O tema adotado é **turismo**. A tela principal apresenta um formulário de cadastro e, ao lado, a lista de viagens cadastradas. Cada viagem contém data de ida, data de volta, cidade de partida, destino, preço do ingresso e quantidade de vagas.

Os dados exibidos não são estáticos: ao abrir a aplicação, o cliente realiza uma requisição `GET` para a API. Ao enviar o formulário, realiza uma requisição `POST`; depois do cadastro, a lista é atualizada novamente a partir do back-end.

## Tecnologias utilizadas

| Parte | Tecnologias |
| --- | --- |
| Cliente | React, JSX, Vite, Axios e CSS Modules |
| API | Java 21, Spring Boot, Spring Web MVC e JdbcTemplate |
| Banco de dados | H2 em arquivo |

## Como executar

### 1. Iniciar a API

É necessário ter o Java 21 instalado. No terminal, entre no diretório da API e execute:

```bash
cd api
./mvnw spring-boot:run
```

No Windows, utilize `mvnw.cmd spring-boot:run`.

A API ficará disponível em `http://localhost:8080`. O banco H2 é criado e atualizado automaticamente a partir de `api/src/main/resources/schema.sql`. Os dados são mantidos no arquivo `api/data/projetoturismo.mv.db`.

### 2. Iniciar o cliente

Em outro terminal, instale as dependências e inicie o Vite:

```bash
cd client
npm install
npm run dev
```

Depois, abra o endereço informado pelo Vite, normalmente `http://localhost:5173`.

Se a API estiver em outro endereço, crie o arquivo `client/.env` com:

```env
VITE_API_URL=http://localhost:8080/viagens
```

O back-end possui CORS habilitado para permitir o acesso durante o desenvolvimento local.

## Validações implementadas

O formulário exige o preenchimento dos seis campos, verifica se a data de volta não é anterior à data de ida e exige preço e quantidade de vagas maiores que zero. A API repete as validações essenciais antes de persistir os dados e rejeita duplicidades com status `409 Conflict`.

## Comandos úteis

No cliente:

```bash
npm run lint
npm run build
```

Na API:

```bash
./mvnw test
```

## Documentação complementar

O contrato dos endpoints está descrito em [`api/README.md`], e as instruções específicas do cliente estão em [`client/README.md`]
