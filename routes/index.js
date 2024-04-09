const express = require('express');
const router = express.Router();
 
// Rota padrão para o ponto de entrada
router.get('/', (req, res) => {
  res.send('Bem-vindo à minha aplicação!');
});
 
module.exports = router;