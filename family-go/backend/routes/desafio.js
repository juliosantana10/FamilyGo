const express = require('express');
const {
  criarDesafio,
  obterDesafiosPorFamilia,
  obterDesafio,
  atualizarDesafio,
  excluirDesafio,
  atribuirDesafio,
  concluirDesafio,
  selecionarDesafioAleatorio,
} = require('../controllers/desafioController');

const router = express.Router();

router.route('/').post(criarDesafio);
router.route('/:id').get(obterDesafio).put(atualizarDesafio).delete(excluirDesafio);
router.route('/:id/atribuir/:membroId').put(atribuirDesafio);
router.route('/:id/concluir').put(concluirDesafio);
router.route('/familia/:familiaId').get(obterDesafiosPorFamilia);
router.route('/familia/:familiaId/aleatorio').get(selecionarDesafioAleatorio);

module.exports = router;