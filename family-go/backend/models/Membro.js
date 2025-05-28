const mongoose = require('mongoose');

const MembroSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Por favor, adicione o nome do membro'],
      trim: true,
    },
    avatar: {
      type: String,
      default: 'default-avatar.png',
    },
    pontuacao: {
      type: Number,
      default: 0,
    },
    familia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Familia',
      required: true,
    },
    desafiosPendentes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Desafio',
      },
    ],
    desafiosConcluidos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Desafio',
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Membro', MembroSchema);