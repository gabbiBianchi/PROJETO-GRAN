// controllers/productController.js
const db = require('../models/db'); // Certifique-se de que este caminho esteja correto

// Criar Produto
const createProduct = (req, res) => {
    const { name, description, price, barcode } = req.body;
    const query = 'INSERT INTO products (name, description, price, barcode) VALUES (?, ?, ?, ?)';
    db.run(query, [name, description, price, barcode], function (err) {
        if (err) {
            return res.status(400).json({ message: 'Erro ao criar produto', error: err.message });
        }
        res.status(201).json({ message: 'Produto criado com sucesso!', id: this.lastID });
    });
};

// Ler Produto
const getProduct = (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM products WHERE id = ?';
    db.get(query, [productId], (err, row) => {
        if (err) {
            return res.status(400).json({ message: 'Erro ao buscar produto', error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(row);
    });
};

// Atualizar Produto
const updateProduct = (req, res) => {
    const { name, description, price, barcode } = req.body;
    const productId = req.params.id;
    const query = 'UPDATE products SET name = ?, description = ?, price = ?, barcode = ? WHERE id = ?';
    db.run(query, [name, description, price, barcode, productId], function (err) {
        if (err) {
            return res.status(400).json({ message: 'Erro ao atualizar produto', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto atualizado com sucesso' });
    });
};

// Deletar Produto
const deleteProduct = (req, res) => {
    const productId = req.params.id;
    const query = 'DELETE FROM products WHERE id = ?';
    db.run(query, [productId], function (err) {
        if (err) {
            return res.status(400).json({ message: 'Erro ao deletar produto', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto deletado com sucesso' });
    });
};

module.exports = { createProduct, getProduct, updateProduct, deleteProduct };
