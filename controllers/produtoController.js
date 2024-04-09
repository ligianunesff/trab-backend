const produtoModel = require('../models/produtoModel');
const db = require('../configs/database');

// Função para listar todos os produtos
exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await produtoModel.getAllProdutos();
    res.json(produtos).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para buscar um produto pelo ID
exports.getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await produtoModel.getProdutoById(id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para criar um novo produto
exports.createProduto = async (req, res) => {
  const { nome, descricao, preco, data_atualizada } = req.body;
  try {
    const novoProduto = await produtoModel.createProduto({ nome, descricao, preco, data_atualizada });
    res.status(201).json(novoProduto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para atualizar um produto pelo ID
exports.updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, data_atualizada } = req.body;
  try {
    const produtoAtualizado = await produtoModel.updateProduto(id, { nome, descricao, preco, data_atualizada });
    if (!produtoAtualizado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json(produtoAtualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para excluir um produto pelo ID
exports.deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const produtoDeletado = await produtoModel.deleteProduto(id);
    if (!produtoDeletado) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
