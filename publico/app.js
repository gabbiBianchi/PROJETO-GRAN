// app.js
const express = require('express');
const bodyParser = require('body-parser');
const productController = require('./controllers/productController');
const supplierController = require('./controllers/supplierController');
const productSupplierController = require('./controllers/productSupplierController');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Rotas de Produto
app.post('/products', productController.createProduct);
app.get('/products', productController.getProducts);

// Rotas de Fornecedor
app.post('/suppliers', supplierController.createSupplier);
app.get('/suppliers', supplierController.getSuppliers);

// Rota de Associação Produto/Fornecedor
app.post('/associations', productSupplierController.associateProductToSupplier);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
