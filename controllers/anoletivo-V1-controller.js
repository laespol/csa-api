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
exports.getAnoletivo = async (req, res, next) => {
    try {
        const anoletivos = await prisma.anoletivo.findMany({
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
            length: anoletivos.length,
            anoletivos: anoletivos
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

exports.postAnoletivo = async (req, res, next) => {

    try {
        const valor = await prisma.anoletivo.count({
            where: {
                ra: req.body.anoletivo.nome,
                status: 'A'
            }
        })

        if (valor != 0) {
            return res.status(200).send({ ok: false, message: 'Ano letivo já cadastrado' })
        }

        const createAnoletivo = await prisma.anoletivo.create({
            data: {
                nome: req.body.anoletivo.nome,
                idusercreateAt: req.user.idusuario,
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Ano letivo inserido com sucesso',
            createAnoletivo: createAnoletivo
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

exports.getAnoletivoDetail = async (req, res, next) => {
    try {
        const anoletivo = await prisma.anoletivo.findFirst({
            where: {
                idanoletivo: Number(req.params.idanoletivo),
                status: 'A'
            },
            orderBy: {
                nome: "desc"
            }
        })
        if (anoletivo.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Ano letivo não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            anoletivo: anoletivo
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

exports.updateAnoletivo = async (req, res, next) => {
    var updateAnoletivo;
    try {

        const valor = await prisma.anoletivo.count({
            where: {
                idanoletivo: Number(req.params.idanoletivo),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Ano letivo não cadastrado' })
        }
        updateAnoletivo = await prisma.anoletivo.update({
            where: {
                idanoletivo: Number(req.params.idanoletivo),
            },
            data: {
                nome: req.body.anoletivo.nome,
                iduserupdatedAt: Number(req.user.idusuario),
            }
        });

        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Ano letivo atualizado com sucesso',
            updateAnoletivo: updateAnoletivo
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

exports.deleteAnoletivo = async (req, res, next) => {
    try {
        const valor = await prisma.anoletivo.count({
            where: {
                idanoletivo: Number(req.params.idanoletivo),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Ano letivo não cadastrado' })
        }
        const deleteAnoletivo = await prisma.anoletivo.update({
            where: {
                idanoletivo: Number(req.params.idanoletivo),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Ano letivo removido com sucesso',
            deleteAnoletivo: deleteAnoletivo
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




