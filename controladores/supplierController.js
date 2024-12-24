// controllers/supplierController.js
const db = require('../models/db');

const createSupplier = (req, res) => {
    const { name, cnpj, address, contact } = req.body;
    const query = 'INSERT INTO suppliers (name, cnpj, address, contact) VALUES (?, ?, ?, ?)';
    db.run(query, [name, cnpj, address, contact], function(err) {
        if (err) {
            return res.status(400).json({ message: 'Erro ao criar fornecedor', error: err.message });
        }
        res.status(201).json({ message: 'Fornecedor criado com sucesso!', id: this.lastID });
    });
};

// Função para buscar todos os fornecedores
const getSuppliers = (req, res) => {
    const query = 'SELECT * FROM suppliers';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ message: 'Erro ao buscar fornecedores', error: err.message });
        }
        res.json(rows);
    });
};

module.exports = { createSupplier, getSuppliers };
