const Desafio = require('../models/Desafio');
const Membro = require('../models/Membro');

// @desc    Criar um novo desafio
// @route   POST /api/desafios
// @access  Public
exports.criarDesafio = async (req, res) => {
  try {
    const { titulo, descricao, pontosRecompensa, familiaId, imagemReferencia } = req.body;

    const desafio = await Desafio.create({
      titulo,
      descricao,
      pontosRecompensa,
      imagemReferencia,
      familia: familiaId,
      status: 'disponivel',
    });

    res.status(201).json({
      success: true,
      data: desafio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Obter todos os desafios de uma família
// @route   GET /api/desafios/familia/:familiaId
// @access  Public
exports.obterDesafiosPorFamilia = async (req, res) => {
  try {
    const desafios = await Desafio.find({ familia: req.params.familiaId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: desafios.length,
      data: desafios,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Obter um desafio pelo ID
// @route   GET /api/desafios/:id
// @access  Public
exports.obterDesafio = async (req, res) => {
  try {
    const desafio = await Desafio.findById(req.params.id)
      .populate('membroResponsavel', 'nome avatar');

    if (!desafio) {
      return res.status(404).json({
        success: false,
        error: 'Desafio não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: desafio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Atualizar um desafio
// @route   PUT /api/desafios/:id
// @access  Public
exports.atualizarDesafio = async (req, res) => {
  try {
    const { titulo, descricao, pontosRecompensa, status, imagemReferencia } = req.body;

    const desafio = await Desafio.findById(req.params.id);

    if (!desafio) {
      return res.status(404).json({
        success: false,
        error: 'Desafio não encontrado',
      });
    }

    // Atualizar apenas os campos fornecidos
    if (titulo) desafio.titulo = titulo;
    if (descricao) desafio.descricao = descricao;
    if (pontosRecompensa) desafio.pontosRecompensa = pontosRecompensa;
    if (status) desafio.status = status;
    if (imagemReferencia) desafio.imagemReferencia = imagemReferencia;

    await desafio.save();

    res.status(200).json({
      success: true,
      data: desafio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Excluir um desafio
// @route   DELETE /api/desafios/:id
// @access  Public
exports.excluirDesafio = async (req, res) => {
  try {
    const desafio = await Desafio.findById(req.params.id);

    if (!desafio) {
      return res.status(404).json({
        success: false,
        error: 'Desafio não encontrado',
      });
    }

    // Se o desafio estiver atribuído a um membro, remova-o da lista de desafios pendentes
    if (desafio.membroResponsavel) {
      const membro = await Membro.findById(desafio.membroResponsavel);
      if (membro) {
        membro.desafiosPendentes = membro.desafiosPendentes.filter(
          (d) => d.toString() !== req.params.id
        );
        await membro.save();
      }
    }

    await desafio.deleteOne();

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

// @desc    Atribuir desafio a um membro
// @route   PUT /api/desafios/:id/atribuir/:membroId
// @access  Public
exports.atribuirDesafio = async (req, res) => {
  try {
    const desafio = await Desafio.findById(req.params.id);
    const membro = await Membro.findById(req.params.membroId);

    if (!desafio) {
      return res.status(404).json({
        success: false,
        error: 'Desafio não encontrado',
      });
    }

    if (!membro) {
      return res.status(404).json({
        success: false,
        error: 'Membro não encontrado',
      });
    }

    // Atribuir o desafio ao membro
    desafio.membroResponsavel = membro._id;
    desafio.status = 'pendente';
    await desafio.save();

    // Adicionar o desafio à lista de desafios pendentes do membro
    if (!membro.desafiosPendentes.includes(desafio._id)) {
      membro.desafiosPendentes.push(desafio._id);
      await membro.save();
    }

    res.status(200).json({
      success: true,
      data: desafio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Marcar desafio como concluído
// @route   PUT /api/desafios/:id/concluir
// @access  Public
exports.concluirDesafio = async (req, res) => {
  try {
    const desafio = await Desafio.findById(req.params.id);

    if (!desafio) {
      return res.status(404).json({
        success: false,
        error: 'Desafio não encontrado',
      });
    }

    // Verificar se o desafio está atribuído a algum membro
    if (!desafio.membroResponsavel) {
      return res.status(400).json({
        success: false,
        error: 'Este desafio não está atribuído a nenhum membro',
      });
    }

    // Atualizar o status do desafio
    desafio.status = 'concluido';
    await desafio.save();

    // Atualizar as listas de desafios do membro
    const membro = await Membro.findById(desafio.membroResponsavel);
    if (membro) {
      // Remover o desafio da lista de pendentes
      membro.desafiosPendentes = membro.desafiosPendentes.filter(
        (d) => d.toString() !== req.params.id
      );
      
      // Adicionar à lista de concluídos
      if (!membro.desafiosConcluidos.includes(desafio._id)) {
        membro.desafiosConcluidos.push(desafio._id);
      }
      
      await membro.save();
    }

    res.status(200).json({
      success: true,
      data: desafio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};

// @desc    Selecionar desafio aleatório
// @route   GET /api/desafios/familia/:familiaId/aleatorio
// @access  Public
exports.selecionarDesafioAleatorio = async (req, res) => {
  try {
    // Obter apenas desafios disponíveis (não atribuídos)
    const desafios = await Desafio.find({ 
      familia: req.params.familiaId,
      status: 'disponivel'
    });

    if (desafios.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Não foram encontrados desafios disponíveis para esta família',
      });
    }

    // Selecionar um desafio aleatoriamente
    const desafioAleatorio = desafios[Math.floor(Math.random() * desafios.length)];

    res.status(200).json({
      success: true,
      data: desafioAleatorio,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Erro no servidor',
    });
  }
};