const mongoose = require('mongoose');

// Cada carta guardada no deck é uma cópia resumida dos dados da YGOPRODeck
const cartaSchema = new mongoose.Schema(
  {
    cartaId: { type: Number, required: true },
    nome: { type: String, required: true },
    imagem: { type: String },
    tipo: { type: String },
  },
  { _id: false }
);

const deckSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'O nome do deck é obrigatório'],
      trim: true,
      maxlength: [60, 'O nome pode ter no máximo 60 caracteres'],
    },
    descricao: {
      type: String,
      trim: true,
      default: '',
      maxlength: [300, 'A descrição pode ter no máximo 300 caracteres'],
    },
    estrategia: {
      type: String,
      enum: {
        values: ['Agressivo', 'Controle', 'Combo', 'Equilibrado'],
        message: 'Estratégia inválida',
      },
      default: 'Equilibrado',
    },
    cartas: { type: [cartaSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Deck', deckSchema);