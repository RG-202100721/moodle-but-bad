/*DROP DATABASE IF EXISTS prog_web_projeto; 
CREATE DATABASE IF NOT EXISTS prog_web_projeto; 
USE prog_web_projeto;
*/

DROP TABLE IF EXISTS Turma;
CREATE TABLE IF NOT EXISTS Turma (
  ID int NOT NULL AUTO_INCREMENT, 
  Nome varchar(255), 
  Ano int, 
  Nome_Responsavel varchar(255),
  Email_Responsavel varchar(50),
  Curso varchar(255),
  PRIMARY KEY (ID)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Inscricao;
CREATE TABLE IF NOT EXISTS Inscricao (
  ID int NOT NULL AUTO_INCREMENT, 
  IDDisciplina int NOT NULL, 
  IDAluno int NOT NULL,
  Nota decimal(10,2),
  PRIMARY KEY (ID)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Revisao;
CREATE TABLE IF NOT EXISTS Revisao (
  Dia_Revisao int, 
  IDDisciplina int NOT NULL, 
  IDAluno int NOT NULL,
  Nota_Antes decimal(10,2),
  Nota_Depois decimal(10,2),
  Efetivada char,
  Fechada char
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Aluno;
CREATE TABLE IF NOT EXISTS Aluno (
  ID int NOT NULL AUTO_INCREMENT, 
  Nome varchar(255), 
  Data_Nascimento date, 
  Genero char,
  Email varchar(50),
  URLFoto varchar(255),
  PRIMARY KEY (ID)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Disciplina;
CREATE TABLE IF NOT EXISTS Disciplina (
  ID int NOT NULL AUTO_INCREMENT, 
  Nome varchar(255), 
  Docente varchar(255),
  PRIMARY KEY (ID)
) ENGINE=InnoDB;


ALTER TABLE Inscricao ADD CONSTRAINT I_FK_D FOREIGN KEY (IDDisciplina) REFERENCES Disciplina(ID);
ALTER TABLE Inscricao ADD CONSTRAINT I_FK_A FOREIGN KEY (IDAluno) REFERENCES Aluno(ID);
ALTER TABLE Revisao ADD CONSTRAINT R_FK_D FOREIGN KEY (IDDisciplina) REFERENCES Disciplina(ID);
ALTER TABLE Revisao ADD CONSTRAINT R_FK_A FOREIGN KEY (IDAluno) REFERENCES Aluno(ID);


INSERT INTO Turma (Nome, Ano, Nome_Responsavel, Email_Responsavel, Curso) VALUES
('Turma do 10º Ano', 10, 'Breia Cachão', 'prividenuliya@antawii.com', 'Técnico de Audiovisuais'),
('Turma do 11º Ano', 11, 'Cisneiros Lampreia', 'rygcsd@playfuny.com', 'Técnico de Eletrónica'),
('Turma 1 do 12º Ano', 12, 'Bia Barreno', '5wf810r@dyoeii.com', 'Programação de Sistemas Informáticos'),
('Turma 2 do 12º Ano', 12, 'Tamára Flores', 'hypejhghjk@axie.ml', 'Programação de Sistemas Informáticos'),
('Turma do 13º Ano', 13, 'Ludmila Feitosa', 'aegerter@pyhaihyrt.com', 'Automação e Computadores');

INSERT INTO Aluno (Nome, Data_Nascimento, Genero, Email, URLFoto) VALUES
('Garcez Milheiriço', str_to_date('2002.03.05', '%Y.%m.%d'), 'F', 'cusaum@eetieg.com', 'https://picsum.photos/500'),
('Georgi Bogado', str_to_date('2001.04.10', '%Y.%m.%d'), 'M', 'kristian4811@filevino.com', 'https://picsum.photos/500'),
('Simas Canejo', str_to_date('2001.06.23', '%Y.%m.%d'), 'F', 'nhwxchief@ibelnsep.com', 'https://picsum.photos/500'),
('Romeu Parracho', str_to_date('2002.08.05', '%Y.%m.%d'), 'F', 'semilando@oanhxintv.com', 'https://picsum.photos/500'),
('Quinaz Carvalheiro', str_to_date('2000.02.15', '%Y.%m.%d'), 'M', 'smahi@ebarg.net', 'https://picsum.photos/500'),
('Naiara Moura', str_to_date('2001.05.18', '%Y.%m.%d'), 'M', 'chrisbieniek@capitalistdilemma.com', 'https://picsum.photos/500'),
('Temes Caetano', str_to_date('2001.03.11', '%Y.%m.%d'), 'M', 'gzoo55@ccvisal.xyz', 'https://picsum.photos/500'),
('Tom Paz', str_to_date('2000.09.23', '%Y.%m.%d'), 'F', 'markowael@tchoeo.com', 'https://picsum.photos/500'),
('Joyce Veloso', str_to_date('2002.11.03', '%Y.%m.%d'), 'F', 'lsykes@tchoeo.com', 'https://picsum.photos/500'),
('Cloe Boeira', str_to_date('1999.01.21', '%Y.%m.%d'), 'M', 'kinnik4@oanhxintv.com', 'https://picsum.photos/500');

INSERT INTO Disciplina (Nome, Docente) VALUES
('Matemática', 'Adelaide Faustino'), 
('Português', 'Kelvin Sobral'), 
('Inglês', 'Mónica Alves'), 
('Programação', 'Paloma Cardim'), 
('Geografia', 'Camilo Clementino');

INSERT INTO Inscricao (IDDisciplina, IDAluno, Nota) VALUES
(4, 1, 10.07), 
(2, 2, 8.47), 
(3, 3, 16.92), 
(1, 4, 12.07), 
(5, 5, 7.69), 
(2, 6, 9.77), 
(3, 7, 11.51), 
(4, 8, 18.22), 
(1, 9, 9.83), 
(5, 10, 19.01);

INSERT INTO Revisao (Dia_Revisao, IDDisciplina, IDAluno, Nota_Antes, Nota_Depois, Efetivada, Fechada) VALUES
(21, 2, 3, 6.91, 11.56, 'S', 'N'),
(11, 5, 7, 8.89, 16.26, 'N', 'N'),
(16, 3, 5, 2.08, 10.08, 'S', 'S'),
(27, 4, 10, 5.50, 14.85, 'S', 'N'),
(7, 1, 9, 10.87, 12.04, 'S', 'S');