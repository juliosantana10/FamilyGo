const mongoose = require('mongoose');

const DesafioSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'Por favor, adicione um título para o desafio'],
      trim: true,
    },
    descricao: {
      type: String,
      required: [true, 'Por favor, adicione uma descrição para o desafio'],
    },
    pontosRecompensa: {
      type: Number,
      required: [true, 'Por favor, defina os pontos de recompensa'],
      default: 10,
    },
    status: {
      type: String,
      enum: ['pendente', 'concluido', 'disponivel'],
      default: 'disponivel',
    },
    membroResponsavel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Membro',
    },
    imagemReferencia: {
      type: String,
      default: null,
    },
    familia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Familia',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Desafio', DesafioSchema);