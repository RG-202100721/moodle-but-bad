var fs = require("fs");
var mysql = require('mysql');

var type = "local";
if (type == "local") {
    var con = mysql.createConnection({
        //credenciais do servidor mysql
        host: "localhost",
        user: "root",
        database: "prog_web_projeto",
        password: "",
        multipleStatements: true
    });
}
else {
    var con = mysql.createConnection({
        //credenciais do servidor mysql
        host: "remotemysql.com",
        port: 3306,
        database: "XuJ9K1LH7W",
        user: "XuJ9K1LH7W",
        password: "iXpUAq7fVx",
        multipleStatements: true
    });
}

//criação da conexão ao servidor mysql
exports.start = function () {
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
};

//criação da base de dados a partir do ficheiro database.sql
exports.create = function () {
    var sql = fs.readFileSync('./scripts/database.sql').toString().replace(/\s+/g, ' ').split("\r\n").join('');
	con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Database created!");
    });
};

//faz uma query à base de dados (select, update, insert and delete)
exports.query = function (sql, callback) {
    con.query(sql, function (err, result) {
        if (err) throw err;
        if (JSON.stringify(sql).includes("SELECT")) {
            console.log('Database queried!\nQuery: ' + sql);
            callback(null, result);
        }
        else {
            console.log('Database updated!\nQuery: ' + sql);
            callback(null, null);
        }
    });
};

//fim da conexão ao servidor mysql
exports.end = function () {
    con.end(function (err, result) {
        if (err) throw err;
        console.log("Connection closed!");
    });
};