const express = require('express')
const app = express()
const port = 3000
let html
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const tablePessoal = `CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY (id));`;
const sql = `INSERT INTO people(name) values ('Kali')`
connection.query(tablePessoal)
connection.query(sql)

const selectSql = `SELECT * FROM people`;
connection.query(selectSql, (selectError, selectResults, selectFields) => {
    if (selectError) {
        console.error('Erro ao selecionar pessoas:', selectError);
        connection.end();
        return;
    }

    html = '<h1>Full Cycle Rocks!</h1><br><br><h2>Pessoas:</h2><ul>';

    selectResults.forEach(pessoa => {
        html += `<li>${pessoa.name}</li>`
    });

    html += '</ul>'

    connection.end();

});

app.get('/', (req, res) => {
    res.send(html)
});


app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})