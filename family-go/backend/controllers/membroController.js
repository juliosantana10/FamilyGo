const Membro = require('../models/Membro');
const Familia = require('../models/Familia');
const Desafio = require('../models/Desafio');

// @desc    Adicionar novo membro à família
// @route   POST /api/membros
// @access  Public
exports.adicionarMembro = async (req, res) => {
  try {
    const { nome, avatar, familiaId } = req.body;

    // Verificar se a família existe
    const familia = await Familia.findById(familiaId);
    if (!familia) {
      return res.status(404).json({
        success: false,
        error: 'Família não encontrada',
      });
    }

    // Criar o membro
    const membro = await Membro.create({
      nome,
      avatar: avatar || 'default-avatar.png',
      familia: familiaId,
    });

    // Adicionar o membro à lista de membros da família
    familia.membros.push(membro._id);
    await familia.save();

    res.status(201).json({
      success: true,
      data: membro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Obter todos os membros de uma família
// @route   GET /api/membros/familia/:familiaId
// @access  Public
exports.obterMembrosPorFamilia = async (req, res) => {
  try {
    const membros = await Membro.find({ familia: req.params.familiaId })
      .select('nome avatar pontuacao')
      .sort('-pontuacao');

    res.status(200).json({
      success: true,
      count: membros.length,
      data: membros,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Obter um membro pelo ID
// @route   GET /api/membros/:id
// @access  Public
exports.obterMembro = async (req, res) => {
  try {
    const membro = await Membro.findById(req.params.id)
      .populate('desafiosPendentes')
      .populate('desafiosConcluidos');

    if (!membro) {
      return res.status(404).json({
        success: false,
        error: 'Membro não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: membro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Atualizar um membro
// @route   PUT /api/membros/:id
// @access  Public
exports.atualizarMembro = async (req, res) => {
  try {
    const { nome, avatar } = req.body;

    const membro = await Membro.findById(req.params.id);

    if (!membro) {
      return res.status(404).json({
        success: false,
        error: 'Membro não encontrado',
      });
    }

    // Atualizar apenas os campos fornecidos
    if (nome) membro.nome = nome;
    if (avatar) membro.avatar = avatar;

    await membro.save();

    res.status(200).json({
      success: true,
      data: membro,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Remover um membro
// @route   DELETE /api/membros/:id
// @access  Public
exports.removerMembro = async (req, res) => {
  try {
    const membro = await Membro.findById(req.params.id);

    if (!membro) {
      return res.status(404).json({
        success: false,
        error: 'Membro não encontrado',
      });
    }

    // Remover o membro da lista de membros da família
    const familia = await Familia.findById(membro.familia);
    if (familia) {
      familia.membros = familia.membros.filter(
        (membroId) => membroId.toString() !== req.params.id
      );
      await familia.save();
    }

    await membro.deleteOne();

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

// @desc    Adicionar pontos a um membro
// @route   PUT /api/membros/:id/pontos
// @access  Public
exports.adicionarPontos = async (req, res) => {
  try {
    const { pontos } = req.body;

    const membro = await Membro.findById(req.params.id);

    if (!membro) {
      return res.status(404).json({
        success: false,
        error: 'Membro não encontrado',
      });
    }

    // Adicionar pontos ao membro
    membro.pontuacao += parseInt(pontos);
    await membro.save();

    // Adicionar pontos à família e recalcular nível
    const familia = await Familia.findById(membro.familia);
    if (familia) {
      familia.pontuacaoTotal += parseInt(pontos);
      familia.calcularNivel();
      await familia.save();
    }

    res.status(200).json({
      success: true,
      data: {
        membro,
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

// @desc    Selecionar membro aleatório para desafio
// @route   GET /api/membros/familia/:familiaId/aleatorio
// @access  Public
exports.selecionarMembroAleatorio = async (req, res) => {
  try {
    const membros = await Membro.find({ familia: req.params.familiaId });

    if (membros.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Não foram encontrados membros para esta família',
      });
    }

    // Selecionar um membro aleatoriamente
    const membroAleatorio = membros[Math.floor(Math.random() * membros.length)];

    res.status(200).json({
      success: true,
      data: membroAleatorio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};