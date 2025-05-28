const Atividade = require('../models/Atividade');
const Desafio = require('../models/Desafio');
const Membro = require('../models/Membro');
const Familia = require('../models/Familia');
const cloudinary = require('../config/cloudinary');

// @desc    Registrar uma nova atividade concluída (com evidência)
// @route   POST /api/atividades
// @access  Public
exports.registrarAtividade = async (req, res) => {
  try {
    const { desafioId, membroId, evidenciaBase64, familiaId } = req.body;

    // Verificar se o desafio existe
    const desafio = await Desafio.findById(desafioId);
    if (!desafio) {
      return res.status(404).json({
        success: false,
        error: 'Desafio não encontrado',
      });
    }

    // Verificar se o membro existe
    const membro = await Membro.findById(membroId);
    if (!membro) {
      return res.status(404).json({
        success: false,
        error: 'Membro não encontrado',
      });
    }

    // Fazer upload da evidência para o Cloudinary
    let evidenciaUrl = '';
    if (evidenciaBase64) {
      const uploadResult = await cloudinary.uploader.upload(evidenciaBase64, {
        folder: 'familia-game/evidencias',
      });
      evidenciaUrl = uploadResult.secure_url;
    } else {
      return res.status(400).json({
        success: false,
        error: 'É necessário fornecer uma evidência da atividade',
      });
    }

    // Criar a atividade
    const atividade = await Atividade.create({
      desafio: desafioId,
      membro: membroId,
      familia: familiaId,
      evidencia: evidenciaUrl,
      pontosGanhos: desafio.pontosRecompensa,
    });

    // Atualizar o status do desafio
    desafio.status = 'concluido';
    await desafio.save();

    // Atualizar os pontos do membro
    membro.pontuacao += desafio.pontosRecompensa;
    
    // Atualizar listas de desafios do membro
    membro.desafiosPendentes = membro.desafiosPendentes.filter(
      (d) => d.toString() !== desafioId
    );
    if (!membro.desafiosConcluidos.includes(desafioId)) {
      membro.desafiosConcluidos.push(desafioId);
    }
    await membro.save();

    // Atualizar pontuação total e nível da família
    const familia = await Familia.findById(familiaId);
    if (familia) {
      familia.pontuacaoTotal += desafio.pontosRecompensa;
      familia.calcularNivel();
      await familia.save();
    }

    res.status(201).json({
      success: true,
      data: {
        atividade,
        membro: {
          id: membro._id,
          nome: membro.nome,
          pontuacao: membro.pontuacao,
        },
        familia: {
          pontuacaoTotal: familia.pontuacaoTotal,
          nivel: familia.nivel,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Obter todas as atividades de uma família
// @route   GET /api/atividades/familia/:familiaId
// @access  Public
exports.obterAtividadesPorFamilia = async (req, res) => {
  try {
    const atividades = await Atividade.find({ familia: req.params.familiaId })
      .populate('desafio', 'titulo descricao pontosRecompensa')
      .populate('membro', 'nome avatar')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: atividades.length,
      data: atividades,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Obter todas as atividades de um membro
// @route   GET /api/atividades/membro/:membroId
// @access  Public
exports.obterAtividadesPorMembro = async (req, res) => {
  try {
    const atividades = await Atividade.find({ membro: req.params.membroId })
      .populate('desafio', 'titulo descricao pontosRecompensa')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: atividades.length,
      data: atividades,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Obter uma atividade pelo ID
// @route   GET /api/atividades/:id
// @access  Public
exports.obterAtividade = async (req, res) => {
  try {
    const atividade = await Atividade.findById(req.params.id)
      .populate('desafio', 'titulo descricao pontosRecompensa')
      .populate('membro', 'nome avatar')
      .populate('familia', 'nome mascote');

    if (!atividade) {
      return res.status(404).json({
        success: false,
        error: 'Atividade não encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: atividade,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Excluir uma atividade
// @route   DELETE /api/atividades/:id
// @access  Public
exports.excluirAtividade = async (req, res) => {
  try {
    const atividade = await Atividade.findById(req.params.id);

    if (!atividade) {
      return res.status(404).json({
        success: false,
        error: 'Atividade não encontrada',
      });
    }

    // Obter pontos ganhos na atividade para ajustar pontuação do membro e família
    const pontosGanhos = atividade.pontosGanhos;

    // Subtrair os pontos do membro
    const membro = await Membro.findById(atividade.membro);
    if (membro) {
      membro.pontuacao -= pontosGanhos;
      if (membro.pontuacao < 0) membro.pontuacao = 0;
      await membro.save();
    }

    // Subtrair os pontos da família e recalcular nível
    const familia = await Familia.findById(atividade.familia);
    if (familia) {
      familia.pontuacaoTotal -= pontosGanhos;
      if (familia.pontuacaoTotal < 0) familia.pontuacaoTotal = 0;
      familia.calcularNivel();
      await familia.save();
    }

    // Excluir a imagem do Cloudinary
    if (atividade.evidencia) {
      // Extrair o ID público da URL do Cloudinary
      const publicId = atividade.evidencia.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`familia-game/evidencias/${publicId}`);
    }

    await atividade.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};