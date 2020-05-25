const sql = require('mssql');

class sqlExecuter {
    constructor({req = null, query = '', inputs = []}){
        this.req = req;
        this.query = query;
        this.inputs = JSON.parse(JSON.stringify(inputs));
    }

    async consultaBanco() {

        const config = {
            user: 'api-init',
            password: 'api2020',
            server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
            database: 'db_concessionaria',
            connectionTimeout: 30000,
            requestTimeout: 30000,
            parseJSON: true,
            options: {
                encrypt: false,
                enableArithAbort: true
            }
        };

        const poolConnect = new sql.ConnectionPool(config);

        try {
            console.log('Conectando com o banco...');
            const pool = await poolConnect.connect();
            const req = pool.request();
            for (let i = 0; i < this.inputs.length; i++) {
                req.input(this.inputs[i].nome, this.inputs[i].valor);
            }
            console.log('Executando Consulta...');
            return req.query(this.query);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

module.exports = sqlExecuter;