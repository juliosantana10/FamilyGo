const express = require('express');
const {
  registrarAtividade,
  obterAtividadesPorFamilia,
  obterAtividadesPorMembro,
  obterAtividade,
  excluirAtividade,
} = require('../controllers/atividadeController');

const router = express.Router();

router.route('/').post(registrarAtividade);
router.route('/:id').get(obterAtividade).delete(excluirAtividade);
router.route('/familia/:familiaId').get(obterAtividadesPorFamilia);
router.route('/membro/:membroId').get(obterAtividadesPorMembro);

module.exports = router;