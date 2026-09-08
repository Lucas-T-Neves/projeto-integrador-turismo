# Cliente — Roteiros de viagem

Interface web do projeto integrador, construída com React e Vite. O cliente permite cadastrar viagens e consultar os registros persistidos pela API.

## Requisitos atendidos

- Formulário de cadastro com seis campos: data de ida, data de volta, partida, destino, preço do ingresso e vagas;
- componente separado para o cadastro (`CadastroViagem`);
- componente separado para a exibição de cada registro (`CardViagem`);
- consumo dos métodos `GET` e `POST` da API com Axios;
- estado React para formulário, lista, carregamento, mensagens e erros;
- interfaces construídas com JSX;
- estilos dos componentes em CSS Modules;
- mensagens para carregamento, sucesso, erro, lista vazia e envio em andamento.

## Tecnologias

- React;
- Vite;
- Axios;
- CSS Modules.

## Execução

Com a API em execução na porta 8080:

```bash
npm install
npm run dev
```

A aplicação normalmente será aberta em `http://localhost:5173`.

Para alterar a URL da API, crie um arquivo `.env` neste diretório:

```env
VITE_API_URL=http://localhost:8080/viagens
```

O valor padrão utilizado pelo cliente é `http://localhost:8080/viagens`.

## Organização dos arquivos

```text
src/
├── componentes/
│   ├── CadastroViagem/
│   │   ├── CadastroViagem.jsx
│   │   └── style.module.css
│   └── cardViagem/
│       ├── CardViagem.jsx
│       └── style.module.css
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

`App.jsx` coordena as requisições e mantém a lista recebida do back-end. `CadastroViagem` controla os campos do formulário e suas validações. `CardViagem` recebe uma viagem por propriedade e apresenta seus dados.

## Validação e estados da interface

Antes do envio, o cliente verifica campos vazios, período de datas, preço e quantidade de vagas. Durante as requisições, os botões são desabilitados quando necessário e a interface informa o andamento. Erros de comunicação, dados inválidos e duplicidade recebem mensagens específicas.

## Scripts

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run build    # gera a versão de produção
npm run preview  # visualiza a build localmente
npm run lint     # executa o ESLint
```
