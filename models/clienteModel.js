const connection = require('../configs/database');

// Definindo o modelo de dados para a tabela de clientes
class Cliente {
    constructor(id, nome, sobrenome, email, idade) {
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.idade = idade;
    }

    static async getAllClientes() {
        try {
            const query = 'SELECT * FROM clientes;';
            const results = await connection.promise().query(query);
            return results[0];
        } catch (error) {
            throw new Error("Ocorreu um erro ao buscar os clientes");
        }
    }

    static async getClienteById(id) {
        try {
            const query = `SELECT * FROM clientes where id = ${id};`;
            const results = await connection.promise().query(query);
            return results[0];
        } catch (error) {
            throw new Error("Ocorreu um erro ao buscar o ID");
        }
    }

    static async createCliente({nome, sobrenome, email, idade}) {
        try {
            const query = `INSERT INTO clientes (nome, sobrenome, email, idade) VALUES ("${nome}", "${sobrenome}", "${email}", "${idade}")`;
            const results = await connection.promise().query(query);
            return { id: results[0].insertId, nome, sobrenome, email, idade };
        } catch (error) {
            throw new Error("Ocorreu um erro ao criar cliente");
        }
    }

    static async updateCliente(id, newData) {
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
    
            const updateQuery = `UPDATE clientes SET ${updateFields.join(',')} WHERE id = ${id}`;
            const results = await connection.promise().query(updateQuery);
            
            // Verifica se algum registro foi afetado
            if (results[0].affectedRows === 0) {
                return null; // Retorna null se nenhum registro foi afetado
            }
            
            return { id, ...newData }; // Retorna os dados atualizados do cliente
        } catch (error) {
            throw new Error("Ocorreu um erro ao atualizar o cliente.");
        }
    }
    

    static async deleteCliente(id) {
        try {
            const query = `DELETE FROM clientes WHERE id = ${id}`;
            const results = await connection.promise().query(query);
        if (results[0].affectedRows === 0) {
            throw new Error("Nenhum cliente encontrado com o ID fornecido.");
        }
        return "Cliente excluído com sucesso.";
    } catch (error) {
        throw new Error("Ocorreu um erro ao excluir o cliente.");
    }
    }
}

module.exports = Cliente;