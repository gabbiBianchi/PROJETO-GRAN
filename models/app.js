// public/app.js

// Função para cadastrar produto
document.getElementById('productForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const productName = document.getElementById('productName').value;
    const productDescription = document.getElementById('productDescription').value;
    const productPrice = document.getElementById('productPrice').value;
    const productBarcode = document.getElementById('productBarcode').value;

    const response = await fetch('/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: productName,
            description: productDescription,
            price: productPrice,
            barcode: productBarcode
        })
    });

    const result = await response.json();
    alert(result.message);
    loadProducts(); // Atualiza a lista de produtos
});

// Função para cadastrar fornecedor
document.getElementById('supplierForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const supplierName = document.getElementById('supplierName').value;
    const supplierCnpj = document.getElementById('supplierCnpj').value;
    const supplierAddress = document.getElementById('supplierAddress').value;
    const supplierContact = document.getElementById('supplierContact').value;

    const response = await fetch('/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: supplierName,
            cnpj: supplierCnpj,
            address: supplierAddress,
            contact: supplierContact
        })
    });

    const result = await response.json();
    alert(result.message);
    loadSuppliers(); // Atualiza a lista de fornecedores
});

// Função para associar produto a fornecedor
document.getElementById('associationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const productId = document.getElementById('productId').value;
    const supplierId = document.getElementById('supplierId').value;

    const response = await fetch('/associations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            productId,
            supplierId
        })
    });

    const result = await response.json();
    alert(result.message);
});

// Função para carregar e exibir os produtos
async function loadProducts() {
    const response = await fetch('/products');
    const products = await response.json();

    const productList = document.getElementById('productList');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `Produto: ${product.name}, Preço: ${product.price}`;
        productList.appendChild(li);
    });

    // Atualizar o select de produtos para a associação
    const productSelect = document.getElementById('productId');
    productSelect.innerHTML = '';
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Função para carregar e exibir os fornecedores
async function loadSuppliers() {
    const response = await fetch('/suppliers');
    const suppliers = await response.json();

    const supplierList = document.getElementById('supplierList');
    supplierList.innerHTML = '';
    suppliers.forEach(supplier => {
        const li = document.createElement('li');
        li.textContent = `Fornecedor: ${supplier.name}, CNPJ: ${supplier.cnpj}`;
        supplierList.appendChild(li);
    });

    // Atualizar o select de fornecedores para a associação
    const supplierSelect = document.getElementById('supplierId');
    supplierSelect.innerHTML = '';
    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier.id;
        option.textContent = supplier.name;
        supplierSelect.appendChild(option);
    });
}

// Carregar produtos e fornecedores ao iniciar
loadProducts();
loadSuppliers();
