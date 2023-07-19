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
exports.getSerie = async (req, res, next) => {
    try {
        const series = await prisma.serie.findMany({
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
            length: series.length,
            series: series
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

exports.postSerie = async (req, res, next) => {

    try {
        const valor = await prisma.serie.count({
            where: {
                ra: req.body.serie.nome,
                status: 'A'
            }
        })

        if (valor != 0) {
            return res.status(200).send({ ok: false, message: 'Serie já cadastrado' })
        }

        const createSerie = await prisma.serie.create({
            data: {
                nome: req.body.serie.nome,
                idusercreateAt: req.user.idusuario,
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Serie inserido com sucesso',
            createSerie: createSerie
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

exports.getSerieDetail = async (req, res, next) => {
    try {
        const serie = await prisma.serie.findFirst({
            where: {
                idserie: Number(req.params.idserie),
                status: 'A'
            },
            orderBy: {
                nome: "desc"
            }
        })
        if (serie.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Serie não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            serie: serie
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

exports.updateSerie = async (req, res, next) => {
    var updateSerie;
    try {

        const valor = await prisma.serie.count({
            where: {
                idserie: Number(req.params.idserie),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Serie não cadastrado' })
        }
        updateSerie = await prisma.serie.update({
            where: {
                idserie: Number(req.params.idserie),
            },
            data: {
                nome: req.body.serie.nome,
                iduserupdatedAt: Number(req.user.idusuario),
            }
        });

        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Serie atualizado com sucesso',
            updateSerie: updateSerie
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

exports.deleteSerie = async (req, res, next) => {
    try {
        const valor = await prisma.serie.count({
            where: {
                idserie: Number(req.params.idserie),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Serie não cadastrado' })
        }
        const deleteSerie = await prisma.serie.update({
            where: {
                idserie: Number(req.params.idserie),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Serie removido com sucesso',
            deleteSerie: deleteSerie
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




