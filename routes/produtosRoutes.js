const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Rota para listar todos os produtos
router.get('/', produtoController.getAllProdutos);

// Rota para buscar um produto pelo ID
router.get('/:id', produtoController.getProdutoById);

// Rota para criar um novo produto
router.post('/', produtoController.createProduto);

// Rota para atualizar um produto pelo ID
router.put('/:id', produtoController.updateProduto);

// Rota para excluir um produto pelo ID
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;