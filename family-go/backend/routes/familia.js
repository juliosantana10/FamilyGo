const express = require('express');
const {
  criarFamilia,
  obterFamilias,
  obterFamilia,
  atualizarFamilia,
  excluirFamilia,
  obterDashboard,
} = require('../controllers/familiaController');

const router = express.Router();

router.route('/').post(criarFamilia).get(obterFamilias);
router.route('/:id').get(obterFamilia).put(atualizarFamilia).delete(excluirFamilia);
router.route('/:id/dashboard').get(obterDashboard);

module.exports = router;