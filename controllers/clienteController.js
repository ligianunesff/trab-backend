const clienteModel = require('../models/clienteModel');
const db = require('../configs/database');

// Função para listar todos os clientes
exports.getAllClientes = async (req, res) => {
  try {
    const clientes = await clienteModel.getAllClientes();
    res.json(clientes).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para buscar um cliente pelo ID
exports.getClienteById = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await clienteModel.getClienteById(id);
    if (!cliente) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para criar um novo cliente
exports.createCliente = async (req, res) => {
  const { nome, sobrenome, email, idade } = req.body;
  try {
    const novoCliente = await clienteModel.createCliente({ nome, sobrenome, email, idade });
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para atualizar um cliente pelo ID
exports.updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nome, sobrenome, email, idade } = req.body;
  try {
    const clienteAtualizado = await clienteModel.updateCliente(id, { nome, sobrenome, email, idade });
    if (!clienteAtualizado) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json(clienteAtualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para excluir um cliente pelo ID
exports.deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const clienteDeletado = await clienteModel.deleteCliente(id);
    if (!clienteDeletado) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json({ message: 'Cliente excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
