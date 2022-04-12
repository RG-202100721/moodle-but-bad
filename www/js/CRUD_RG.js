//pede todos os dados de uma tabela na base de dados (método GET)
function getAll(table) 
{
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", '/getAll' + table, false);
    xhttp.onload = () => { 
        var x = 0; 
        var query = JSON.parse(xhttp.response);
		while (query[x] != null) {
			switch (table) {
				case "Turma": turma.push(new Turma(query[x])); break;              
				case "Aluno": aluno.push(new Aluno(query[x])); aluno[x].birthday = aluno[x].birthday.split("T")[0]; break;
				case "Disciplina": disciplina.push(new Disciplina(query[x])); break;
				case "Inscricao": inscricao.push(new Inscricao(query[x])); break;
				case "Revisao": revisao.push(new Revisao(query[x])); revisao[x].revision_day = revisao[x].revision_day.split("T")[0]; break;
			}
			x++;
		}
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

    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/edit", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.onload = () => { 
        var text = '';
        switch (table) {
            case "Aluno": text = 'Aluno editado! (ID: '+ id +')'; break;
            case "Disciplina": text = 'Disciplina editada! (ID: '+ id +')'; break;
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
