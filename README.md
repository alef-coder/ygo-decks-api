# YGO Decks API

API REST do app **YGO Decks**, feita com Node.js, Express e Mongoose.
Faz o CRUD de decks de Yu-Gi-Oh! e salva os dados no MongoDB Atlas.

O aplicativo (frontend) está em outro repositório: https://github.com/alef-coder/ygo-decks-app

## Tecnologias

- Node.js
- Express
- Mongoose (MongoDB Atlas)
- cors e dotenv

## Pré-requisitos

- Node.js instalado (versão LTS)
- Uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/atlas) com um cluster e um usuário de banco de dados
- No Atlas, o endereço `0.0.0.0/0` liberado em **Network Access**

## Como rodar

1. Clone o repositório e entre na pasta:

```bash
git clone https://github.com/alef-coder/ygo-decks-api.git
cd ygo-decks-api
```

2. Instale as dependências:

```bash
npm install
```

3. Crie um arquivo `.env` na raiz, copiando o `.env.example`, e preencha com a sua string de conexão do Atlas:

```
MONGODB_URI=mongodb+srv://USUARIO:SENHA@cluster0.xxxxx.mongodb.net/ygo-decks?retryWrites=true&w=majority
PORT=3000
```

4. Inicie o servidor:

```bash
npm run dev
```

O terminal deve mostrar `Conectado ao MongoDB` e `Servidor rodando na porta 3000`.
Para testar, abra http://localhost:3000 no navegador.

## Rotas

| Método | Rota | Descrição |
|---|---|---|
| GET | `/decks` | Lista todos os decks |
| GET | `/decks/:id` | Busca um deck pelo id |
| POST | `/decks` | Cria um deck |
| PUT | `/decks/:id` | Edita um deck |
| DELETE | `/decks/:id` | Exclui um deck |

## Modelo Deck

```json
{
  "nome": "Deck Dragões",
  "descricao": "Meu primeiro deck",
  "estrategia": "Agressivo",
  "cartas": []
}
```

- `nome`: obrigatório, até 60 caracteres
- `descricao`: opcional, até 300 caracteres
- `estrategia`: `Agressivo`, `Controle`, `Combo` ou `Equilibrado`
- `cartas`: lista de cartas resumidas (`cartaId`, `nome`, `imagem`, `tipo`)

## Estrutura

```
├── models/    # Deck.js (schema do Mongoose)
├── routes/    # decks.js (rotas do CRUD)
└── server.js  # servidor e conexão com o banco
```