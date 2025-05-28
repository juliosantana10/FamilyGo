
const express = require('express');
const {
  adicionarMembro,
  obterMembrosPorFamilia,
  obterMembro,
  atualizarMembro,
  removerMembro,
  adicionarPontos,
  selecionarMembroAleatorio,
} = require('../controllers/membroController');

const router = express.Router();

router.route('/').post(adicionarMembro);
router.route('/:id').get(obterMembro).put(atualizarMembro).delete(removerMembro);
router.route('/:id/pontos').put(adicionarPontos);
router.route('/familia/:familiaId').get(obterMembrosPorFamilia);
router.route('/familia/:familiaId/aleatorio').get(selecionarMembroAleatorio);

module.exports = router;