const mongoose = require('mongoose');

const FamiliaSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: [true, 'Por favor, adicione o nome da família'],
      trim: true,
    },
    mascote: {
      type: String,
      required: [true, 'Por favor, escolha um mascote'],
      enum: ['urso', 'leao', 'raposa', 'lobo', 'panda', 'gato'], // Personalize conforme seus mascotes
    },
    pontuacaoTotal: {
      type: Number,
      default: 0,
    },
    nivel: {
      type: Number,
      default: 1,
    },
    membros: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membro',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Método para calcular o nível do mascote
FamiliaSchema.methods.calcularNivel = function () {
  // Lógica simples: cada 100 pontos = 1 nível
  this.nivel = Math.floor(this.pontuacaoTotal / 100) + 1;
  return this.nivel;
};

module.exports = mongoose.model('Familia', FamiliaSchema);