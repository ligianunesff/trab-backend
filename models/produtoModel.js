const db = require('../configs/database');

class Produto {
    constructor(id, nome, descricao, preco, data_atualizada) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.data_atualizada = data_atualizada;
    }

    // Método para recuperar todos os produtos do banco de dados
    static async getAllProdutos() {
        try {
            const query = 'SELECT * FROM produtos;';
            const results = await connection.promise().query(query);
            return results[0];
        } catch (error) {
            throw new Error("Ocorreu um erro ao buscar os produtos");
        }
    }

    // Método para recuperar um produto pelo seu ID
    static async getProdutoById(id) {
        try {
            const query = 'SELECT * FROM produtos WHERE id = ?';
            const results = await connection.promise().query(query, [id]);
            return results[0];
        } catch (error) {
            throw new Error("Ocorreu um erro ao buscar o ID");
        }
    }
    

    // Método para inserir um novo produto no banco de dados
    static async createProduto({nome, descricao, preco, data_atualizada}) {
        try {
            const query = `INSERT INTO produtos (nome, descricao, preco, data_atualizada) VALUES ("${nome}", "${descricao}", "${preco}", "${data_atualizada}")`;
            const results = await connection.promise().query(query);
            return { id: results[0].insertId, nome, descricao, preco, data_atualizada };
        } catch (error) {
            throw new Error("Ocorreu um erro ao criar produto");
        }
    }

    // Método para atualizar um produto pelo seu ID
    static async updateProduto(id, newData) {
        try {
            const updateFields = [];
            for (const [key, value] of Object.entries(newData)) {
                // Verifica se os campos fornecidos para atualização são válidos
                if (value !== undefined) {
                    updateFields.push(`${key} = '${value}'`);
                }
            }
    
            if (updateFields.length === 0) {
                throw new Error("Nenhum campo válido fornecido para atualização.");
            }
    
            const updateQuery = `UPDATE produtos SET ${updateFields.join(',')} WHERE id = ${id}`;
            const results = await connection.promise().query(updateQuery);
            
            // Verifica se algum registro foi afetado
            if (results[0].affectedRows === 0) {
                return null; // Retorna null se nenhum registro foi afetado
            }
            
            return { id, ...newData }; // Retorna os dados atualizados do produto
        } catch (error) {
            throw new Error("Ocorreu um erro ao atualizar o produto.");
        }
    }

    // Método para excluir um produto pelo seu ID
    static async deleteProduto(id) {
        try {
            const query = `DELETE FROM produtos WHERE id = ${id}`;
            const results = await connection.promise().query(query);
        if (results[0].affectedRows === 0) {
            throw new Error("Nenhum produto encontrado com o ID fornecido.");
        }
        return "Produto excluído com sucesso.";
    } catch (error) {
        throw new Error("Ocorreu um erro ao excluir o produto.");
    }
    }
}

module.exports = Produto;
