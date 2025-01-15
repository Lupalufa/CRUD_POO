// index.js
const { AlunoController } = require("./src/controllers/ControllerAluno");
const { Curso } = require("./src/models/Curso");

const alunos = new AlunoController()


// alunos.adicionarAluno('Juninho','Juninho@gmail.com','(84) 991262414', '427843',"Ciência da computação")
alunos.listarAluno();