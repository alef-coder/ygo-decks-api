const express = require('express');
const mongoose = require('mongoose');
const Deck = require('../models/Deck');

const router = express.Router();

const CAMPOS = ['nome', 'descricao', 'estrategia', 'cartas'];

// Pega do corpo da requisição só os campos que o deck aceita
function extrairDados(body) {
  const dados = {};
  for (const campo of CAMPOS) {
    if (body[campo] !== undefined) dados[campo] = body[campo];
  }
  return dados;
}

function idValido(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// CREATE: cadastrar deck
router.post('/', async (req, res) => {
  try {
    const deck = await Deck.create(extrairDados(req.body));
    res.status(201).json(deck);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

// READ: listar todos os decks (mais novos primeiro)
router.get('/', async (req, res) => {
  try {
    const decks = await Deck.find().sort({ createdAt: -1 });
    res.json(decks);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// READ: buscar um deck pelo id
router.get('/:id', async (req, res) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }
  try {
    const deck = await Deck.findById(req.params.id);
    if (!deck) return res.status(404).json({ erro: 'Deck não encontrado' });
    res.json(deck);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

// UPDATE: editar deck
router.put('/:id', async (req, res) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }
  try {
    const deck = await Deck.findByIdAndUpdate(
      req.params.id,
      extrairDados(req.body),
      { new: true, runValidators: true }
    );
    if (!deck) return res.status(404).json({ erro: 'Deck não encontrado' });
    res.json(deck);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

// DELETE: excluir deck
router.delete('/:id', async (req, res) => {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ erro: 'ID inválido' });
  }
  try {
    const deck = await Deck.findByIdAndDelete(req.params.id);
    if (!deck) return res.status(404).json({ erro: 'Deck não encontrado' });
    res.json({ mensagem: 'Deck excluído com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
});

module.exports = router;