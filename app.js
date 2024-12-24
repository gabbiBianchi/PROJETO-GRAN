const http = require("http");

// Criação do servidor
const server = http.createServer((req, res) => { 
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Olá, mundo! Bem-vindo ao servidor Node.js!");
});

// Porta do servidor
const port = 3000;

// Iniciar o servidor
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});
