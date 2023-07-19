const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getTpsolicitacao = async (req, res, next) => {
    try {
        const tpsolicitacaos = await prisma.tpsolicitacao.findMany({
            where: {
                status: 'A'
            }
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: tpsolicitacaos.length,
            tpsolicitacaos: tpsolicitacaos
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

exports.postTpsolicitacao = async (req, res, next) => {
    var createTpsolicitacao;
    const idtpsolicitacao = parseInt(req.params.idtpsolicitacao);
    try {

        const valor = await prisma.tpsolicitacao.count({
            where: {
                descricao: req.body.tpsolicitacao.descricao,
                status: 'A'
            }
        })

        if (valor != 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Tpsolicitacao já cadastrado' })
        }


        const createTpsolicitacao = await prisma.tpsolicitacao.create({
            data: {
                descricao: req.body.tpsolicitacao.descricao,
                idusercreateAt: Number(req.user.idusuario),
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Tpsolicitacao inserido com sucesso',
            createTpsolicitacao: createTpsolicitacao
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

exports.getTpsolicitacaoDetail = async (req, res, next) => {

//    console.log(req.params.idtpsolicitacao);

    try {
        const tpsolicitacao = await prisma.tpsolicitacao.findFirst({
            where: {
                idtpsolicitacao: Number(req.params.idtpsolicitacao),
                status: 'A'
            }
        })

        if (tpsolicitacao.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Tpsolicitacao não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            tpsolicitacao: tpsolicitacao
        }
        return res.status(200).send(response);
    } catch (error) {
        await prisma.$disconnect()
        console.log(error);
        return res.status(500).send({

            ok: false,
            error: error
        });
    }
};

exports.updateTpsolicitacao = async (req, res, next) => {
    const idtpsolicitacao = parseInt(req.params.idtpsolicitacao);
    const idtpsolicitacaoAcesso = parseInt(req.user.idtpsolicitacao);
    var valor;
    try {

        const valor = await prisma.tpsolicitacao.count({
            where: {
                idtpsolicitacao: Number(req.params.idtpsolicitacao),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Tpsolicitacao não cadastrado' })
        }

        const updateTpsolicitacao = await prisma.tpsolicitacao.update({
            where: {
                idtpsolicitacao: Number(req.params.idtpsolicitacao),
            },
            data: {
                descricao: req.body.tpsolicitacao.descricao,
                idusercreateAt: Number(req.user.idusuario),
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Tpsolicitacao atualizado com sucesso',
            updateTpsolicitacao: updateTpsolicitacao
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

exports.deleteTpsolicitacao = async (req, res, next) => {

    try {

        const valor = await prisma.tpsolicitacao.count({
            where: {
                idtpsolicitacao: Number(req.params.idtpsolicitacao),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Tpsolicitacao não cadastrado' })
        }


        deleteTpsolicitacao = await prisma.tpsolicitacao.update({
            where: {
                idtpsolicitacao: Number(req.params.idtpsolicitacao),
            },
            data: {
                idusercreateAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Tpsolicitacao removido com sucesso',
            deleteTpsolicitacao: deleteTpsolicitacao
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






