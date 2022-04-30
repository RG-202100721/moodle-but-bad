var fs = require("fs");
var mysql = require('mysql');
var port = process.env.PORT || 1017;

exports.checkPort = () => {
    if (port == 1017) {
        dbconfig = {
            //credenciais do servidor mysql local
            connectionLimit: 100,
            host: "localhost",
            user: "root",
            database: "prog_web_projeto",
            password: "",
            multipleStatements: true
        };
    }
    else {
        dbconfig = {
            //credenciais do servidor mysql
            connectionLimit: 100,
            host: "remotemysql.com",
            port: 3306,
            database: "XuJ9K1LH7W",
            user: "XuJ9K1LH7W",
            password: "iXpUAq7fVx",
            multipleStatements: true
        };
    }
}

//criação da conexão ao servidor mysql
exports.start = () => {
    pool = mysql.createPool(dbconfig);
    pool.getConnection((err, con) => {
		if (err) console.log('Error in DB connection (start): ' + err);
        console.log("Connected!");
        con.release();
	});

    /*
    con = mysql.createConnection(dbconfig);
    con.connect((err) => {
        if(err) {
            console.log('Error DB Connection:', err);
            setTimeout(exports.start, 2000);
        }
        else console.log("Connected!");
    });
    con.on('error', (err) => {
        console.log('Error DB Connection:', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            exports.start;
        }
        else throw err;
    });*/
};

//criação da base de dados a partir do ficheiro database.sql
exports.create = () => {
    var sql = fs.readFileSync('./scripts/database.sql').toString().replace(/\s+/g, ' ').split("\r\n").join('');
    pool.getConnection((err, con) => {
		if (err) {
			con.release();
	  		console.log('Error in DB connection (create): ' + err);
	  	}
        else {
            con.query(sql, (err2, result) => {
                if (err) console.log('Error in DB query (create): ' + err2);
                console.log("Database created!");
                con.release();
            });
        }
	});

    /*
	con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Database created!");
    });*/
};

//faz uma query à base de dados (select, update, insert and delete)
exports.query = (sql, callback) => {
    pool.getConnection((err, con) => {
		if (err) {
			con.release();
	  		console.log('Error in DB connection (query): ' + err);
	  	}
        else {
            con.query(sql, (err2, result) => {
                if (err) console.log('Error in DB query (query): ' + err2);
                if (JSON.stringify(sql).includes("INSERT")) {
                    console.log(`Database row inserted! [Query: ${sql}]`);
                    callback(null, result);
                }
                else if (JSON.stringify(sql).includes("UPDATE")) {
                    console.log(`Database row updated! [Query: ${sql}]`);
                    callback(null, null);
                }
                else if (JSON.stringify(sql).includes("DELETE")) {
                    console.log(`Database row deleted! [Query: ${sql}]`);
                    callback(null, null);
                }
                else {
                    console.log(`Database queried! [Query: ${sql}]`);
                    callback(null, result);
                }
                con.release();
            });
        }
	});

    /*
    con.query(sql, function (err, result) {
        if (err) {
            console.log('Error DB Connection:', err);
            if(err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR') {
                exports.start;
                exports.query(sql, callback);
            }
            else throw err;
        }
        if (JSON.stringify(sql).includes("INSERT")) {
            console.log(`Database row inserted! [Query: ${sql}]`);
            callback(null, result);
        }
        else if (JSON.stringify(sql).includes("UPDATE")){
            console.log(`Database row updated! [Query: ${sql}]`);
            callback(null, null);
        }
        else if (JSON.stringify(sql).includes("DELETE")){
            console.log(`Database row deleted! [Query: ${sql}]`);
            callback(null, null);
        }
        else {
            console.log(`Database queried! [Query: ${sql}]`);
            callback(null, result);
        }
    });*/
};

//fim da conexão ao servidor mysql
exports.end = () => {
    pool.end((err) => {
        if (err) console.log('Error in DB connection (end): ' + err);
        console.log("Connection closed!");
    });

    /*
    con.end(function (err, result) {
        if (err) throw err;
        console.log("Connection closed!");
    });*/
};