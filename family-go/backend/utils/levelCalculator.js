/**
 * Calcula o nível do mascote com base na pontuação total
 * @param {Number} pontuacaoTotal - Pontuação total da família
 * @returns {Number} - Nível atual do mascote
 */
exports.calcularNivel = (pontuacaoTotal) => {
    // Cada 100 pontos equivale a um nível
    return Math.floor(pontuacaoTotal / 100) + 1;
  };
  
  /**
   * Calcula pontos necessários para o próximo nível
   * @param {Number} nivelAtual - Nível atual do mascote
   * @returns {Number} - Pontos necessários para o próximo nível
   */
  exports.pontosParaProximoNivel = (nivelAtual) => {
    return nivelAtual * 100;
  };
  
  /**
   * Calcula o progresso percentual no nível atual
   * @param {Number} pontuacaoTotal - Pontuação total da família
   * @returns {Number} - Percentual de progresso no nível atual (0-100)
   */
  exports.calcularProgressoNivel = (pontuacaoTotal) => {
    const nivelAtual = Math.floor(pontuacaoTotal / 100) + 1;
    const pontosMinimoNivelAtual = (nivelAtual - 1) * 100;
    const pontosParaProximoNivel = nivelAtual * 100;
    
    const pontosNoNivelAtual = pontuacaoTotal - pontosMinimoNivelAtual;
    const totalPontosNesteNivel = pontosParaProximoNivel - pontosMinimoNivelAtual;
    
    return Math.floor((pontosNoNivelAtual / totalPontosNesteNivel) * 100);
  };