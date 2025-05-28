const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());

// Rotas
app.use('/api/familias', require('./routes/familia'));
app.use('/api/membros', require('./routes/membro'));
app.use('/api/desafios', require('./routes/desafio'));
app.use('/api/atividades', require('./routes/atividade'));

// Rota padrão
app.get('/', (req, res) => {
  res.send('API do Jogo Familiar está funcionando');
});

// Gerenciamento de erro para rotas não encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT} em modo ${process.env.NODE_ENV}`);
});