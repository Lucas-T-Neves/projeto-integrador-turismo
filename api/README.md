# API — Roteiros de viagem

API REST responsável por receber e persistir os dados das viagens do projeto integrador. A aplicação foi desenvolvida com Java 21, Spring Boot, Spring Web MVC, JdbcTemplate e banco H2.

## Execução

É necessário ter o Java 21 instalado. No diretório `api`, execute:

```bash
./mvnw spring-boot:run
```

No Windows:

```bat
mvnw.cmd spring-boot:run
```

O servidor inicia em `http://localhost:8080`.

A aplicação utiliza um banco H2 em arquivo, configurado em `src/main/resources/application.properties`:

```text
jdbc:h2:file:./data/projetoturismo
```

A tabela `viagem` é criada automaticamente pelo arquivo `src/main/resources/schema.sql`. O console do H2 fica disponível em `http://localhost:8080/h2-console`.

## Recurso `viagem`

| Campo | Tipo JSON | Obrigatório | Descrição |
| --- | --- | --- | --- |
| `id` | number | Não | Identificador gerado pela API |
| `dataIda` | string | Sim | Data de ida no formato `AAAA-MM-DD` |
| `dataVolta` | string | Sim | Data de volta no formato `AAAA-MM-DD` |
| `partida` | string | Sim | Cidade de origem, com até 40 caracteres |
| `destino` | string | Sim | Cidade de destino, com até 40 caracteres |
| `precoIngresso` | number | Sim | Preço maior que zero |
| `vagas` | number | Sim | Quantidade de vagas maior que zero |

## Endpoints

### Listar viagens

```http
GET /viagens
```

Retorna todos os registros persistidos.

Resposta `200 OK`:

```json
[
  {
    "id": 1,
    "dataIda": "2026-12-10",
    "dataVolta": "2026-12-15",
    "partida": "São Paulo",
    "destino": "Recife",
    "precoIngresso": 850.0,
    "vagas": 20
  }
]
```

### Cadastrar viagem

```http
POST /viagens
Content-Type: application/json
```

Exemplo de requisição:

```json
{
  "dataIda": "2026-12-10",
  "dataVolta": "2026-12-15",
  "partida": "São Paulo",
  "destino": "Recife",
  "precoIngresso": 850.0,
  "vagas": 20
}
```

Resposta `201 Created`: retorna o objeto cadastrado, incluindo o `id` gerado.

A API retorna `400 Bad Request` quando há campos obrigatórios ausentes, valores menores ou iguais a zero ou quando a data de volta é anterior à data de ida. Retorna `409 Conflict` quando já existe uma viagem com a mesma data, origem, destino e preço.

## Integração com o cliente

O cliente utiliza a URL base `http://localhost:8080/viagens` por padrão. Como a interface roda normalmente em outra origem (`http://localhost:5173`), o controlador utiliza `@CrossOrigin` para permitir a comunicação durante o desenvolvimento.

## Testes

Para executar os testes automatizados:

```bash
./mvnw test
```

O projeto possui teste de carregamento do contexto da aplicação.
