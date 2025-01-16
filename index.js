// index.js
const { AlunoController } = require("./src/controllers/ControllerAluno");
const { Curso } = require("./src/models/Curso");

const alunos = new AlunoController()


alunos.adicionarAluno('Pedrinho','Pedin@gmail.com','(84) 991262414', '427843',"Ciência da computação")
alunos.listarAluno();
// alunos.editarAluno('122356',null,'helena@gmail.com','(84) 991262414','Designer')

// alunos.excluirAluno('127849')