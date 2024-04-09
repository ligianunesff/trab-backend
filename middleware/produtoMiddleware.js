// Middleware para verificar se todos os campos estão preenchidos
function verificarCampos(req, res, next) {
  const { nome, descricao, preco, data_atualizado } = req.body;

  // Verificar se algum campo está vazio
  if (!nome || !descricao || !preco || !data_atualizado) {
    return res.status(400).json({ message: "Todos os campos devem ser preenchidos" });
  }

  // Se todos os campos estiverem preenchidos, avançar para o próximo middleware
  next();
}

module.exports = { verificarCampos };
