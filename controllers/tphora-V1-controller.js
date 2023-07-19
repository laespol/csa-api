const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getTphora = async (req, res, next) => {
    try {
        const tphoras = await prisma.tphora.findMany({
            where: {
                status: 'A'
            }
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: tphoras.length,
            tphoras: tphoras
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

exports.postTphora = async (req, res, next) => {
    var createTphora;
    const idtphora = parseInt(req.params.idtphora);
    try {

        const valor = await prisma.tphora.count({
            where: {
                email: req.body.tphora.nome,
                status: 'A'
            }
        })

        if (valor != 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Tphora já cadastrado' })
        }


        const createTphora = await prisma.tphora.create({
            data: {
                nome: req.body.tphora.nome,
                idusercreateAt: Number(req.user.idusuario),
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Tphora inserido com sucesso',
            createTphora: createTphora
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

exports.getTphoraDetail = async (req, res, next) => {

    try {
        const tphora = await prisma.tphora.findUnique({
            where: {
                idtphora: Number(req.params.idtphora),
                status: 'A'
            }
        })

        if (tphora.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Tphora não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            tphora: tphora
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

exports.updateTphora = async (req, res, next) => {
    const idtphora = parseInt(req.params.idtphora);
    const idtphoraAcesso = parseInt(req.user.idtphora);
    var valor;
    try {

        const valor = await prisma.tphora.count({
            where: {
                idtphora: Number(req.params.idtphora),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Tphora não cadastrado' })
        }

        const updateTphora = await prisma.tphora.update({
            where: {
                idtphora: Number(req.params.idtphora),
            },
            data: {
                nome: req.body.tphora.nome,
                idusercreateAt: Number(req.user.idusuario),
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Tphora atualizado com sucesso',
            updateTphora: updateTphora
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

exports.deleteTphora = async (req, res, next) => {

    try {

        const valor = await prisma.tphora.count({
            where: {
                idtphora: Number(req.params.idtphora),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Tphora não cadastrado' })
        }


        deleteTphora = await prisma.tphora.update({
            where: {
                idtphora: Number(req.params.idtphora),
            },
            data: {
                idusercreateAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Tphora removido com sucesso',
            deleteTphora: deleteTphora
        }
        return res.status(202).send(response);
    } catch (error) {
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};






