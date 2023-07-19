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
exports.getAlunoserie = async (req, res, next) => {
    try {
        const alunoseries = await prisma.alunoserie.findMany({
            where: {
                status: 'A'
            },
            orderBy: {
                idserie: "desc"
            },
            include: {
                aluno: true, serie: true, anoletivo: true , posicao: true,
                Histaluno: {
                    include: { usuario: true , posicao: true},
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }

        })

        await prisma.$disconnect()
        const response = {
            ok: true,
            length: alunoseries.length,
            alunoseries: alunoseries
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

exports.postTeste = async() => {

};

exports.postAlunoserie = async (req, res, next) => {

    try {
        const valor = await prisma.alunoserie.count({
            where: {
                idanoletivo : req.body.alunoserie.idanoletivo,
                idserie: req.body.alunoserie.idserie,
                idaluno: req.body.alunoserie.idaluno,
                status: 'A'
            }
        })

        if (valor != 0) {
            return res.status(200).send({ ok: false, message: 'Aluno já cadastrado' })
        }

        const createAlunoserie = await prisma.alunoserie.create({
            data: {
                idanoletivo : req.body.alunoserie.idanoletivo,
                idserie: req.body.alunoserie.idserie,
                idaluno: req.body.alunoserie.idaluno,
                status: 'A',
                idusercreateAt: req.user.idusuario,
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Aluno inserido com sucesso',
            createAlunoserie: createAlunoserie
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

exports.getAlunoserieDetail = async (req, res, next) => {
    try {
        const alunoserie = await prisma.alunoserie.findFirst({
            where: {
                idalunoserie: Number(req.params.idalunoserie),
                status: 'A'
            },
            orderBy: {
                nome: "desc"
            },
            include: {
                aluno: true, serie: true, anoletivo: true , posicao: true,
                Histaluno: {
                    include: { usuario: true , posicao: true},
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })
        if (alunoserie.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Aluno não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            alunoserie: alunoserie
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

exports.updateAlunoserie = async (req, res, next) => {
    var updateAlunoserie;
    try {

        const valor = await prisma.alunoserie.count({
            where: {
                idalunoserie: Number(req.params.idalunoserie),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Ano letivo não cadastrado' })
        }
        updateAlunoserie = await prisma.alunoserie.update({
            where: {
                idalunoserie: Number(req.params.idalunoserie),
            },
            data: {
                idanoletivo : req.body.alunoserie.idanoletivo,
                idserie: req.body.alunoserie.idserie,
                idaluno: req.body.alunoserie.idaluno,
                iduserupdatedAt: Number(req.user.idusuario),
            }
        });

        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Aluno atualizado com sucesso',
            updateAlunoserie: updateAlunoserie
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

exports.deleteAlunoserie = async (req, res, next) => {
    try {
        const valor = await prisma.alunoserie.count({
            where: {
                idalunoserie: Number(req.params.idalunoserie),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Aluno não cadastrado' })
        }
        const deleteAlunoserie = await prisma.alunoserie.update({
            where: {
                idalunoserie: Number(req.params.idalunoserie),
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
            deleteAlunoserie: deleteAlunoserie
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

exports.getAlunoserieDetailaluno = async (req, res, next) => {
    try {
        const alunoserie = await prisma.alunoserie.findMany({
            where: {
                idaluno: Number(req.params.idaluno),
                status: 'A'
            },
            orderBy: {
                idanoletivo: "desc"
            },
            include: {
                aluno: true, serie: true, anoletivo: true , posicao: true,
                Histaluno: {
                    include: { usuario: true , posicao: true},
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })
        if (alunoserie.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Aluno não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            alunoserie: alunoserie
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
exports.getAlunoserieDetailanoletivo = async (req, res, next) => {
    try {
        const alunoserie = await prisma.alunoserie.findMany({
            where: {
                idanoletivo: Number(req.params.idanoletivo),
                status: 'A'
            },
            orderBy: {
                idserie: "desc"
            },
            include: {
                aluno: true, serie: true, anoletivo: true , posicao: true,
                Histaluno: {
                    include: { usuario: true , posicao: true},
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        })
        if (alunoserie.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Ano Letivo não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            alunoserie: alunoserie
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


