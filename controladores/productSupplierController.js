// controllers/productSupplierController.js
const db = require('../models/db');

const associateProductToSupplier = (req, res) => {
    const { productId, supplierId } = req.body;
    const query = 'INSERT INTO product_supplier (product_id, supplier_id) VALUES (?, ?)';
    db.run(query, [productId, supplierId], function(err) {
        if (err) {
            return res.status(400).json({ message: 'Erro ao associar produto e fornecedor', error: err.message });
        }
        res.status(201).json({ message: 'Produto e fornecedor associados com sucesso!' });
    });
};

module.exports = { associateProductToSupplier };
