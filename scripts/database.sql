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
  ID int NOT NULL AUTO_INCREMENT, 
  Dia_Revisao varchar(10),  
  IDDisciplina int NOT NULL, 
  IDAluno int NOT NULL,
  Nota_Antes decimal(10,2),
  Nota_Depois decimal(10,2),
  Efetivada char,
  Fechada char,
  PRIMARY KEY (ID)
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Aluno;
CREATE TABLE IF NOT EXISTS Aluno (
  ID int NOT NULL AUTO_INCREMENT, 
  Nome varchar(255), 
  Data_Nascimento varchar(10), 
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


ALTER TABLE Inscricao ADD CONSTRAINT I_FK_D FOREIGN KEY (IDDisciplina) REFERENCES Disciplina(ID) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE Inscricao ADD CONSTRAINT I_FK_A FOREIGN KEY (IDAluno) REFERENCES Aluno(ID) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE Revisao ADD CONSTRAINT R_FK_D FOREIGN KEY (IDDisciplina) REFERENCES Disciplina(ID) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE Revisao ADD CONSTRAINT R_FK_A FOREIGN KEY (IDAluno) REFERENCES Aluno(ID) ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO Turma (Nome, Ano, Nome_Responsavel, Email_Responsavel, Curso) VALUES
('10-TA', 10, 'Breia Cachão', 'prividenuliya@antawii.com', 'Técnico de Audiovisuais'),
('11-TE', 11, 'Cisneiros Lampreia', 'rygcsd@playfuny.com', 'Técnico de Eletrónica'),
('12-1-PSI', 12, 'Bia Barreno', '5wf810r@dyoeii.com', 'Programação de Sistemas Informáticos'),
('12-2-PSI', 12, 'Tamára Flores', 'hypejhghjk@axie.ml', 'Programação de Sistemas Informáticos'),
('13-AC', 13, 'Ludmila Feitosa', 'aegerter@pyhaihyrt.com', 'Automação e Computadores');

INSERT INTO Aluno (Nome, Data_Nascimento, Genero, Email, URLFoto) VALUES
('Garcez Milheiriço', '2002-03-05', 'F', 'cusaum@eetieg.com', 'https://picsum.photos/seed/1/500'),
('Georgi Bogado', '2001-04-10', 'M', 'kristian4811@filevino.com', 'https://picsum.photos/seed/2/500'),
('Simas Canejo', '2001-06-23', 'F', 'nhwxchief@ibelnsep.com', 'https://picsum.photos/seed/3/500'),
('Romeu Parracho', '2002-08-05', 'F', 'semilando@oanhxintv.com', 'https://picsum.photos/seed/4/500'),
('Quinaz Carvalheiro', '2000-02-15', 'M', 'smahi@ebarg.net', 'https://picsum.photos/seed/5/500'),
('Naiara Moura', '2001-05-18', 'M', 'chrisbieniek@capitalistdilemma.com', 'https://picsum.photos/seed/6/500'),
('Temes Caetano', '2001-03-11', 'M', 'gzoo55@ccvisal.xyz', 'https://picsum.photos/seed/7/500'),
('Tom Paz', '2000-09-23', 'F', 'markowael@tchoeo.com', 'https://picsum.photos/seed/8/500'),
('Joyce Veloso', '2002-11-03', 'F', 'lsykes@tchoeo.com', 'https://picsum.photos/seed/9/500'),
('Cloe Boeira', '1999-01-21', 'M', 'kinnik4@oanhxintv.com', 'https://picsum.photos/seed/10/500');

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
('2023-03-21', 2, 3, 6.91, 11.56, 'S', 'N'),
('2022-05-11', 5, 7, 8.89, 16.26, 'N', 'N'),
(CURRENT_DATE, 3, 5, 2.08, 10.08, 'S', 'S'),
('2022-08-27', 4, 10, 5.50, 14.85, 'S', 'N'),
('2020-12-07', 1, 9, 10.87, 12.04, 'S', 'S');