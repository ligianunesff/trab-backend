const db = require('./configs/database');

db.query('SELECT 1 + 1 AS result', (error, results) => {
    if (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    } else {
        console.log('Conexão bem-sucedida. Resultado:', results[0].result);
    }
});

