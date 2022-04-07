const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
const options = {
    "default": {
        "folder": "/www/",
        "document": "index.html",
        "port": 1017,
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
app.use(bodyParser.urlencoded({ extended: false }));
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

//processamento dos pedidos de ficheiros
router.get('/STOP', (req, res) => { 
    server.emit("STOP");
});
router.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname + options.default.folder + options.default.document));
});
router.get('/favicon.ico', (req, res) => { 
    res.sendFile(path.join(__dirname + options.default.folder + options.default.favicon)); 
});
router.get('/sweetalert2.js', (req, res) => { 
    res.sendFile(path.join(__dirname + "/node_modules/sweetalert2/dist/sweetalert2.js")); 
});
router.get('/sweetalert2/dark.css', (req, res) => { 
    res.sendFile(path.join(__dirname + "/node_modules/@sweetalert2/theme-dark/dark.css")); 
});

//processamento dos pedidos CRUD
router.get('/getAll*', (req, res) => {
    var sql = "SELECT * FROM " + req.url.replace("/getAll", "");
    dbcon.query(sql, function(err, result) {
   		if (err) throw err;
   		if (result) res.send(result);
        else res.send("0 results.");
	});
});
router.post('/create', (req, res) => {
    var id = 0;
    var sql = "SELECT COUNT(ID) AS id FROM " + req.body["Tabela"];
    dbcon.query(sql, function(err, result) {
        if (err) throw err;
        if (result) id = result[0].id + 1; 
        else res.send("0 results.");
    });

    var sql = "INSERT INTO " + req.body["Tabela"];
    switch (req.body["Tabela"]) {
        case "Aluno":
            sql += " (Nome, Data_Nascimento, Genero, Email, URLFoto) VALUES " +
                    `('${req.body["Nome"]}', str_to_date('${req.body["Data_Nascimento"]}', '%Y-%m-%d'), '${req.body["Genero"]}', '${req.body["Email"]}', '${req.body["URLFoto"]}');`;
            break;
        case "Disciplina":
            sql += " (Nome, Docente) VALUES " +
                    `('${req.body["Nome"]}', '${req.body["Docente"]}');`;
            break;
    }
    dbcon.query(sql, function(err, result) {
   		if (err) {
            res.send("0 results.");
            throw err;
        }
   		else res.send(JSON.stringify(id));
	});
});


//criação do servidor http
app.set("Content-Type", mimeType(path.join(__dirname + options.default.folder + options.default.document)));
app.use(express.static('www'), router);
const server = app.listen(options.default.port, () => { 
    console.log(`Listening on port ${options.default.port}`);
    myApp = process.title;
});
server.on('STOP', () => {
    dbcon.end();
    console.log("Closing server...");
    server.close();
});
