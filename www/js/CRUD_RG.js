//pede todos os dados de uma tabela na base de dados (método GET)
function getAll(table, callback) 
{
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/getAll' + table, true);
    xhttp.onload = () => { 
        var x = 0, y = 0; 
        var query = JSON.parse(xhttp.response);
        while (query[x] != null) {
			switch (table) {
				case "Turma": 
                    while (query[x]["ID"] != y + 1) { turma.push(new Turma('skip')); y++; }
                    turma.push(new Turma(query[x])); 
                    break;              
				case "Aluno": 
                    while (query[x]["ID"] != y + 1) { aluno.push(new Aluno('skip')); y++; }
                    aluno.push(new Aluno(query[x]));
                    break;
				case "Disciplina": 
                    while (query[x]["ID"] != y + 1) { disciplina.push(new Disciplina('skip')); y++; }
                    disciplina.push(new Disciplina(query[x])); 
                    break;
				case "Inscricao": 
                    while (query[x]["ID"] != y + 1) { inscricao.push(new Inscricao('skip')); y++; }
                    inscricao.push(new Inscricao(query[x])); 
                    break;
				case "Revisao": case "RevisaoIndex": 
                    while (query[x]["ID"] != y + 1) { revisao.push(new Revisao('skip')); y++; }
                    revisao.push(new Revisao(query[x])); 
                    break;
			}
            x++;
            y++;
		}
        callback();
    };
    xhttp.onerror = () => { console.log(xhttp.response); };
    xhttp.send();
}

//insere os dados criados numa tabela da base de dados (método POST)
function createData(table) {
    var data = formInputs(table, 'no');
    
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/create", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.onload = () => { 
        var id = xhttp.response;
        var text = '';
        switch (table) {
            case "Aluno": text = 'Aluno adicionado! (ID: '+ id +')'; break;
            case "Disciplina": text = 'Disciplina adicionada! (ID: '+ id +')'; break;
            case "Revisao": text = 'Revisão adicionada! (ID: '+ id +')'; break;
            case "Inscricao": text = 'Inscrição adicionada! (ID: '+ id +')'; break;
        }
        Swal.fire({
            icon: 'success',
            text: text,
            allowOutsideClick: false,
            allowEscapeKey: false,
            preConfirm: () => { location.reload(1); }
        });
    };
    xhttp.onerror = () => { 
        Swal.fire({
            icon: 'error',
            text: xhttp.response,
            allowOutsideClick: false,
            allowEscapeKey: false
        }); 
    };
    xhttp.send(data);
}

//envia os dados editados para o registo selecionado (método PUT)
function editData(table, id) {
    var data = formInputs(table, id);
    if (window.location.href.includes("/index")) { id = revisao[id - 1].id; }

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/edit", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.onload = () => { 
        var text = '';
        switch (table) {
            case "Aluno": text = 'Aluno editado! (ID: '+ id +')'; break;
            case "Disciplina": text = 'Disciplina editada! (ID: '+ id +')'; break;
            case "Revisao": text = 'Revisão editada! (ID: '+ id +')'; break;
            case "Inscricao": text = 'Inscrição editada! (ID: '+ id +')'; break;
        }
        Swal.fire({
            icon: 'success',
            text: text,
            allowOutsideClick: false,
            allowEscapeKey: false,
            preConfirm: () => { location.reload(1); }
        });
    };
    xhttp.onerror = () => { 
        Swal.fire({
            icon: 'error',
            text: xhttp.response,
            allowOutsideClick: false,
            allowEscapeKey: false
        }); 
    };
    xhttp.send(data);
}

//apaga um registo na base de dados especificado pelo seu id (método DELETE)
function deleteData(table, id) {
    Swal.fire({
        title: 'Tem acerteza?',
        text: "Pretende apagar este registo? (ID: "+ id +")",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, quero apagar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            const xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", '/delete', true);
            xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhttp.onload = () => { 
                var text = '';
                switch (table) {
                    case "Aluno": text = 'Aluno apagado! (ID: '+ id +')'; break;
                    case "Disciplina": text = 'Disciplina apagada! (ID: '+ id +')'; break;
                    case "Revisao": text = 'Revisão apagada! (ID: '+ id +')'; break;
                    case "Inscricao": text = 'Inscrição apagada! (ID: '+ id +')'; break;
                }
                Swal.fire({
                    icon: 'success',
                    text: text,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    preConfirm: () => { location.reload(1); }
                });
            };
            xhttp.onerror = () => { 
                Swal.fire({
                    icon: 'error',
                    text: xhttp.response,
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }); 
            };
            xhttp.send(JSON.stringify({ "Tabela": table, "ID": id }));
        }
    });
}
