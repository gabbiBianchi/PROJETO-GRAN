const db = require('./database');

// Criação das tabelas
db.serialize(() => {
    // Tabela de Produtos
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            barcode TEXT
        );
    `);

    // Tabela de Fornecedores
    db.run(`
        CREATE TABLE IF NOT EXISTS suppliers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            cnpj TEXT NOT NULL UNIQUE,
            address TEXT,
            contact TEXT
        );
    `);

    // Tabela de Associação Produto/Fornecedor
    db.run(`
        CREATE TABLE IF NOT EXISTS product_supplier (
            product_id INTEGER NOT NULL,
            supplier_id INTEGER NOT NULL,
            PRIMARY KEY (product_id, supplier_id),
            FOREIGN KEY (product_id) REFERENCES products(id),
            FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
        );
    `);

    console.log('Tabelas criadas com sucesso!');
});

db.close();
