// Middleware para verificar se todos os campos estão preenchidos
function verificarCamposClientes(req, res, next) {
    const { nome, sobrenome, email, idade } = req.body;
  
    // Verificar se algum campo está vazio
    if (!nome || !sobrenome || !email || !idade) {
      return res.status(400).json({ message: "Todos os campos devem ser preenchidos" });
    }
  
    // Se todos os campos estiverem preenchidos, avançar para o próximo middleware
    next();
  }
  
  module.exports = { verificarCamposClientes };
  