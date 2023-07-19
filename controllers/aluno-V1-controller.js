const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

/*const prisma = new PrismaClient({
    log: [
      {
        emit: 'stdout',
        level: 'query',
      },
      {
        emit: 'stdout',
        level: 'error',
      },
      {
        emit: 'stdout',
        level: 'info',
      },
      {
        emit: 'stdout',
        level: 'warn',
      },
    ],
  })
*/
exports.getAluno = async (req, res, next) => {
    try {
        const alunos = await prisma.aluno.findMany({
            where: {
                status: 'A'
            },
            orderBy: {
                nome: "desc"
            }

        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: alunos.length,
            alunos: alunos
        }
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

exports.postAluno = async (req, res, next) => {

    try {
        const valor = await prisma.aluno.count({
            where: {
                ra: req.body.aluno.ra,
                status: 'A'
            }
        })

        if (valor != 0) {
            return res.status(200).send({ ok: false, message: 'Aluno já cadastrado' })
        }

        const createAluno = await prisma.aluno.create({
            data: {
                nome: req.body.aluno.nome,
                ra: req.body.aluno.ra,
                idusercreateAt: req.user.idusuario,
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Aluno inserido com sucesso',
            createAluno: createAluno
        }
        return res.status(201).send(response);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

exports.getAlunoDetail = async (req, res, next) => {
    try {
        const aluno = await prisma.aluno.findFirst({
            where: {
                idaluno: Number(req.params.idaluno),
                status: 'A'
            },
            include: { nivel: true, departamento: true },
            orderBy: {
                nome: "desc"
            }
        })
        if (aluno.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Aluno não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            aluno: aluno
        }
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

exports.updateAluno = async (req, res, next) => {
    var updateAluno;
    try {

        const valor = await prisma.aluno.count({
            where: {
                idaluno: Number(req.params.idaluno),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Aluno não cadastrado' })
        }
        updateAluno = await prisma.aluno.update({
            where: {
                idaluno: Number(req.params.idaluno),
            },
            data: {
                nome: req.body.aluno.nome,
                ra: req.body.aluno.ra,
                iduserupdatedAt: Number(req.user.idusuario),
            }
        });

        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Aluno atualizado com sucesso',
            updateAluno: updateAluno
        }
        return res.status(202).send(response);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

exports.deleteAluno = async (req, res, next) => {
    try {
        const valor = await prisma.aluno.count({
            where: {
                idaluno: Number(req.params.idaluno),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Aluno não cadastrado' })
        }
        const deleteAluno = await prisma.aluno.update({
            where: {
                idaluno: Number(req.params.idaluno),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Aluno removido com sucesso',
            deleteAluno: deleteAluno
        }
        return res.status(200).send(response);
    } catch (error) {
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

exports.getSituacaoaluno = async (req, res, next) => {

    var sortOrder = '';

    let situacaoaluno = '';

    let totalRecords = 0;


    if (req.params.sortOrder == 1) {
        sortOrder = "desc";
    } else {
        sortOrder = "asc";
    }

    var sortBy = req.params.sortField;
    try {
        if (req.params.globalFilter != 'undefined') {
            totalRecords = await prisma.situacaoaluno.count({
                where: {
                    status: 'A',
                }
            });
        }
        await prisma.$disconnect()
        const response = {
            totalRecords: totalRecords,
            ok: true,
            length: situacaoaluno.length,
            situacaoalunos: situacaoaluno
        }
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

exports.getAlunomateria = async (req, res, next) => {

    var sortOrder = '';

    let situacaoaluno = '';

    let totalRecords = 0;


    if (req.params.sortOrder == 1) {
        sortOrder = "desc";
    } else {
        sortOrder = "asc";
    }

    var sortBy = req.params.sortField;
    try {
        if (req.params.globalFilter != 'undefined') {
            totalRecords = await prisma.situacaoaluno.count({
                where: {
                    status: 'A',
                }
            });
        }
        await prisma.$disconnect()
        const response = {
            totalRecords: totalRecords,
            ok: true,
            length: situacaoaluno.length,
            situacaoalunos: situacaoaluno
        }
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};