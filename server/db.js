const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "123123",
    host: "localhost",
    port: 5000,
    database: "notes",
    //connectionString: "postgresql://postgres:123123@localhost:5000/notes?charset=utf8"
    client_encoding: "UTF8"
})

module.exports = pool;