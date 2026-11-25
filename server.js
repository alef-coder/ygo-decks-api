require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const decksRouter = require('./routes/decks');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API YGO Decks funcionando' });
});

app.use('/decks', decksRouter);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Conectado ao MongoDB');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((erro) => {
    console.error('Erro ao conectar no MongoDB:', erro.message);
    process.exit(1);
  });