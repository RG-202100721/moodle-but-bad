const path = require("path");
const express = require('express');
const router = express.Router();
const app = express();
const options = {
    "default": {
        "folder": "/www/",
        "document": "index.html",
        "port": process.env.PORT || 1017,
        "favicon": "images/cursor.ico"
    },
    "extensions": {
        "txt": "text/plain; charset=utf-8",
        "htm": "text/html; charset=utf-8",
        "html": "text/html; charset=utf-8",
        "js": "application/javascript; charset=utf-8",
        "json": "application/json; charset=utf-8",
        "css": "text/css; charset=utf-8",
        "gif": "image/gif",
        "jpg": "image/jpg",
        "png": "image/png",
        "ico": "image/x-icon"
    }
};
app.use(express.json());

//cria e carrega a base de dados com informção
const dbcon = require('./scripts/connection');
dbcon.start();
dbcon.create();

function mimeType(filename) {
    var extension = path.extname(filename);
    if (extension.charAt(0) === ".") extension = extension.substring(1);
    return options.extensions[extension];
}

//processamento dos pedidos CRUD
router.get('/getAll*', (req, res) => {
    var sql = "";
    if (req.url.replace('/getAll','') == "RevisaoIndex") {
        sql = "SELECT * FROM Revisao WHERE DATE(Dia_Revisao) = CURRENT_DATE;";
    }
    else sql = `SELECT * FROM ${req.url.replace('/getAll','')};`;
    dbcon.query(sql, (err, result) => {
   		if (err) throw err;
   		if (result) res.send(result);
        else res.send("0 results.");
	});
});
router.post('/create', (req, res) => {
    var sql = `SELECT ID FROM ${req.body["Tabela"]} ORDER BY ID ASC;`;
    dbcon.query(sql, (err, result) => {
        if (err) throw err;
        else {
            var id = 0;
            for (id = 1; id - 1 < Object.keys(result).length; id++) if (result[id - 1]["ID"] != id) break;
            sql = "INSERT INTO " + req.body["Tabela"] + " VALUES ";
            switch (req.body["Tabela"]) {
                case "Aluno": sql += `(${id}, '${req.body["Nome"]}', '${req.body["Data_Nascimento"]}', '${req.body["Genero"]}', '${req.body["Email"]}', '${req.body["URLFoto"]}');`; break;
                case "Disciplina": sql += `(${id}, '${req.body["Nome"]}', '${req.body["Docente"]}');`; break;
                case "Revisao": sql += `(${id}, '${req.body["Dia_Revisao"]}', ${req.body["IDDisciplina"]}, ${req.body["IDAluno"]}, ${req.body["Nota_Antes"]}, ${req.body["Nota_Depois"]}, '${req.body["Efetivada"]}', '${req.body["Fechada"]}');`; break;
                case "Inscricao": sql += `(${id}, ${req.body["IDDisciplina"]}, ${req.body["IDAluno"]}, ${req.body["Nota"]})`; break;
            }
            dbcon.query(sql, (err, result) => {
       		    if (err) { res.send("0 results.");  throw err; }
   		        else res.send(JSON.stringify(id));
	        });
        }
    });
});
router.put('/edit', (req, res) => {
    var sql = `UPDATE ${req.body["Tabela"]} SET `;
    switch (req.body["Tabela"]) {
        case "Aluno": sql += `Nome = '${req.body["Nome"]}', Data_Nascimento = '${req.body["Data_Nascimento"]}', Genero = '${req.body["Genero"]}', Email = '${req.body["Email"]}', URLFoto = '${req.body["URLFoto"]}'`; break;
        case "Disciplina": sql += `Nome = '${req.body["Nome"]}', Docente = '${req.body["Docente"]}'`; break;
        case "Revisao": sql += `Dia_Revisao = '${req.body["Dia_Revisao"]}', IDDisciplina = ${req.body["IDDisciplina"]}, IDAluno = ${req.body["IDAluno"]}, Nota_Antes = ${req.body["Nota_Antes"]}, Nota_Depois = ${req.body["Nota_Depois"]}, Efetivada = '${req.body["Efetivada"]}', Fechada = '${req.body["Fechada"]}'`; break;
        case "Inscricao": sql += `IDDisciplina = ${req.body["IDDisciplina"]}, IDAluno = ${req.body["IDAluno"]}, Nota = ${req.body["Nota"]}`; break;
    }
    sql += ` WHERE ID = ${req.body["ID"]};`
    dbcon.query(sql, (err, result) => {
   		if (err) throw err;
   		if (result) res.send(result);
        else res.send("0 results.");
	});
});
router.delete('/delete', (req, res) => {
    var sql = '';
    switch (req.body["Tabela"]) {
        case "Aluno":
        case "Disciplina":
            sql = `DELETE FROM Inscricao WHERE ID${req.body["Tabela"]} = ${req.body["ID"]};`;
            dbcon.query(sql, function(err, result) {
   		        if (err) throw err;
                else {
                    sql = `DELETE FROM Revisao WHERE ID${req.body["Tabela"]} = ${req.body["ID"]};`;
                    dbcon.query(sql, function(err, result) {
       		            if (err) throw err;
                        else {
                            sql = `DELETE FROM ${req.body["Tabela"]} WHERE ID = ${req.body["ID"]};`;
                            dbcon.query(sql, function(err, result) { if (err) throw err; else res.send(JSON.stringify("Deleted.")); });
                        }
	                });
                }
	        });
            break;
        default:
            sql = `DELETE FROM ${req.body["Tabela"]} WHERE ID = ${req.body["ID"]};`;
            dbcon.query(sql, function(err, result) { if (err) throw err; else res.send(JSON.stringify("Deleted.")); });
            break;
    }
});

//processamento dos pedidos de ficheiros
router.get('/RESET', (req, res) => { 
    server.emit("RESET");
    res.sendFile(path.join(__dirname + options.default.folder + options.default.document));
});
router.get('/STOP', (req, res) => { 
    server.emit("STOP");
});
router.get('/*', (req, res) => { 
    switch (req.url) {
        case "/favicon.ico": res.sendFile(path.join(__dirname + options.default.folder + options.default.favicon)); break;
        case "/sweetalert2.js": res.sendFile(path.join(__dirname + "/node_modules/sweetalert2/dist/sweetalert2.js")); break;
        case "/sweetalert2/dark.css": res.sendFile(path.join(__dirname + "/node_modules/@sweetalert2/theme-dark/dark.css")); break;
        default: res.sendFile(path.join(__dirname + options.default.folder + options.default.document)); break;
    }
});

//criação do servidor http
app.set("Content-Type", mimeType(path.join(__dirname + options.default.folder + options.default.document)));
app.use(express.static('www'), router);
const server = app.listen(options.default.port, () => { console.log(`Listening on port ${options.default.port}`); });
server.on('RESET', () => {
    console.log("Resetting database...");
    dbcon.create();
});
server.on('STOP', () => {
    dbcon.end();
    console.log("Closing server...");
    server.close();
});
