const mongoose = require('mongoose');

const AtividadeSchema = new mongoose.Schema(
  {
    desafio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Desafio',
      required: true,
    },
    membro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Membro',
      required: true,
    },
    familia: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Familia',
      required: true,
    },
    evidencia: {
      type: String, // URL da imagem no Cloudinary
      required: [true, 'Por favor, envie uma evidência da atividade'],
    },
    pontosGanhos: {
      type: Number,
      required: true,
    },
    dataRealizacao: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Atividade', AtividadeSchema);