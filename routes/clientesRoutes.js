const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');


// Rota para listar todos os clientes
router.get('/', clienteController.getAllClientes);

// Rota para buscar um cliente pelo ID
router.get('/:id', clienteController.getClienteById);

// Rota para criar um novo cliente
router.post('/', clienteController.createCliente);

// Rota para atualizar um cliente pelo ID
router.put('/:id', clienteController.updateCliente);

// Rota para excluir um cliente pelo ID
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
