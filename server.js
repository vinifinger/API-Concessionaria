const apis = require('./config/api-config');

const port = 3000; // Porta do servidor

apis.app.listen(port);

console.log('Servidor HTTP está escutando na porta: ' + port);