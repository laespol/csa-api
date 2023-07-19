const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getNivel = async (req, res, next) => {
    try {
        const nivels = await prisma.nivel.findMany({
            where: {
                status: 'A'
            }
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: nivels.length,
            nivels: nivels
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

exports.postNivel = async (req, res, next) => {
    var createNivel;
    const idnivel = parseInt(req.params.idnivel);
    try {

        const valor = await prisma.nivel.count({
            where: {
                email: req.body.nivel.nome,
                status: 'A'
            }
        })

        if (valor != 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Nivel já cadastrado' })
        }


        const createNivel = await prisma.nivel.create({
            data: {
                nome: req.body.nivel.nome,
                idusercreateAt: Number(req.user.idusuario),
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Nivel inserido com sucesso',
            createNivel: createNivel
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

exports.getNivelDetail = async (req, res, next) => {

    try {
        const nivel = await prisma.nivel.findUnique({
            where: {
                idnivel: Number(req.params.idnivel),
                status: 'A'
            }
        })

        if (nivel.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Nivel não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            nivel: nivel
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

exports.updateNivel = async (req, res, next) => {
    const idnivel = parseInt(req.params.idnivel);
    const idnivelAcesso = parseInt(req.user.idnivel);
    var valor;
    try {

        const valor = await prisma.nivel.count({
            where: {
                idnivel: Number(req.params.idnivel),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Nivel não cadastrado' })
        }

        const updateNivel = await prisma.nivel.update({
            where: {
                idnivel: Number(req.params.idnivel),
            },
            data: {
                nome: req.body.nivel.nome,
                idusercreateAt: Number(req.user.idusuario),
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Nivel atualizado com sucesso',
            updateNivel: updateNivel
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

exports.deleteNivel = async (req, res, next) => {

    try {

        const valor = await prisma.nivel.count({
            where: {
                idnivel: Number(req.params.idnivel),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Nivel não cadastrado' })
        }


        deleteNivel = await prisma.nivel.update({
            where: {
                idnivel: Number(req.params.idnivel),
            },
            data: {
                idusercreateAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Nivel removido com sucesso',
            deleteNivel: deleteNivel
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






