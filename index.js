// index.js
const { AlunoController } = require("./src/controllers/ControllerAluno");
const { Curso } = require("./src/models/Curso");

const alunos = new AlunoController()


alunos.adicionarAluno('Pedrinho','Pedin@gmail.com','(84) 991262414', '999999',"Ciência da computação")
alunos.listarAluno();