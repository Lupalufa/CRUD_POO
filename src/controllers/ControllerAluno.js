// Importações
const { pool } = require("../config/database");
const { Aluno } = require("../models/Aluno");
const { Curso } = require("../models/Curso"); // <== Adicione esta linha

class AlunoController {
    async adicionarAluno(nome, email, telefone, matricula, curso) {
        try {
            // const encontrar = `select matricula from aluno where = $4`
            // const verificarValor =  [matricula]
            // if (encontrar.rows.length >= 1) {
            //     return console.error('Aluno com as credênciais ja existe')
            // }
            const consulta = `insert into aluno (nome,email,telefone,matricula,curso)
            values ($1, $2, $3, $4, $5) RETURNING *`
            const valores = [nome, email, telefone, matricula, curso]
            const res = await pool.query(consulta, valores)
            if (res.rows.length >= 1) {
                return console.error('Aluno com as credênciais ja existe')
            }
            console.log("Dados criados com sucesso")
            console.table(res.rows[0])
        } catch (error) {
            console.error("Erro ao criar aluno:", error.message);
        }
    }

    async editarAluno(matricula, novoNome, novoEmail, novoTelefone, novoCurso) {
        try {
            const consulta = `select nome from aluno where matricula = $1`
            const valores = [matricula]
            const res = await pool.query(consulta, valores)
            if (res.rows.length == 0) {
                return console.error("Aluno não encontrado!")
            }
            const consultaEditar = `
            update aluno set
            nome = coalesce($2, nome),
            email = coalesce($3, email),
            telefone = coalesce($4, telefone),
            curso = coalesce($5, curso)
            where matricula = $1 returning *
            `
            
            const dadosEditados = [matricula, novoNome, novoEmail, novoTelefone, novoCurso]
            const modificar = await pool.query(consultaEditar, dadosEditados)
            console.log('Dados Editados com Sucesso')
            console.table(modificar.rows[0])


        } catch (error) {
            console.error("Erro ao editar aluno:", error.message);
        }
    }

    async excluirAluno(matricula) {
        try {
            const consulta = `select * from aluno where matricula = $1`
            const valores = [matricula]
            const res = await pool.query(consulta, valores)
            if (res.rows.length == 0) {
                return console.error('Aluno não encontrado')
            }
            const consultaDeletar = `delete from aluno where matricula = $1`
            const resposta = await pool.query(consultaDeletar, valores)
            console.log('Aluno excluido com sucesso')
            console.table(resposta.rows[0])
        } catch (error) {
            console.error("Erro ao excluir aluno:", error.message);
        }
    }

    async listarAluno() {
        try {
            const consulta = `select aluno.nome, aluno.email, aluno.telefone, aluno.matricula, aluno.curso from aluno`
            const dados = await pool.query(consulta);
            console.table(dados.rows);
        } catch (error) {

        }
    }
}

module.exports = { AlunoController };
