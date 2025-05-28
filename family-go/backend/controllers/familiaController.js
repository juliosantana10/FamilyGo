const Familia = require('../models/Familia');
const Membro = require('../models/Membro');

// @desc    Criar uma nova família com membros iniciais
// @route   POST /api/familias
// @access  Public
exports.criarFamilia = async (req, res) => {
  try {
    const { nome, mascote, membros } = req.body;

    // Criar a família
    const familia = await Familia.create({
      nome,
      mascote,
    });

    // Criar os membros e associá-los à família
    if (membros && membros.length > 0) {
      const membrosDaFamilia = await Promise.all(
        membros.map(async (membroData) => {
          const membro = await Membro.create({
            nome: membroData.nome,
            avatar: membroData.avatar || 'default-avatar.png',
            familia: familia._id,
          });
          return membro._id;
        })
      );

      // Atualizar a família com os IDs dos membros criados
      familia.membros = membrosDaFamilia;
      await familia.save();
    }

    res.status(201).json({
      success: true,
      data: familia,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Obter todas as famílias
// @route   GET /api/familias
// @access  Public
exports.obterFamilias = async (req, res) => {
  try {
    const familias = await Familia.find().populate('membros');

    res.status(200).json({
      success: true,
      count: familias.length,
      data: familias,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Obter uma família pelo ID
// @route   GET /api/familias/:id
// @access  Public
exports.obterFamilia = async (req, res) => {
  try {
    const familia = await Familia.findById(req.params.id).populate({
      path: 'membros',
      select: 'nome avatar pontuacao',
    });

    if (!familia) {
      return res.status(404).json({
        success: false,
        error: 'Família não encontrada',
      });
    }

    res.status(200).json({
      success: true,
      data: familia,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Atualizar uma família
// @route   PUT /api/familias/:id
// @access  Public
exports.atualizarFamilia = async (req, res) => {
  try {
    const { nome, mascote } = req.body;

    const familia = await Familia.findById(req.params.id);

    if (!familia) {
      return res.status(404).json({
        success: false,
        error: 'Família não encontrada',
      });
    }

    // Atualizar apenas os campos fornecidos
    if (nome) familia.nome = nome;
    if (mascote) familia.mascote = mascote;

    await familia.save();

    res.status(200).json({
      success: true,
      data: familia,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Excluir uma família
// @route   DELETE /api/familias/:id
// @access  Public
exports.excluirFamilia = async (req, res) => {
  try {
    const familia = await Familia.findById(req.params.id);

    if (!familia) {
      return res.status(404).json({
        success: false,
        error: 'Família não encontrada',
      });
    }

    // Remover também todos os membros associados
    await Membro.deleteMany({ familia: req.params.id });

    await familia.deleteOne();

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

// @desc    Obter dashboard com pontuações da família
// @route   GET /api/familias/:id/dashboard
// @access  Public
exports.obterDashboard = async (req, res) => {
  try {
    const familia = await Familia.findById(req.params.id);

    if (!familia) {
      return res.status(404).json({
        success: false,
        error: 'Família não encontrada',
      });
    }

    // Obter todos os membros e suas pontuações
    const membros = await Membro.find({ familia: req.params.id })
      .select('nome avatar pontuacao')
      .sort('-pontuacao');

    res.status(200).json({
      success: true,
      data: {
        familia: {
          nome: familia.nome,
          mascote: familia.mascote,
          pontuacaoTotal: familia.pontuacaoTotal,
          nivel: familia.nivel,
        },
        membros,
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