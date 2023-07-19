const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getPosicao = async (req, res, next) => {
    try {
        const posicaos = await prisma.posicao.findMany({
            where: {
                status: 'A'
            }
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: posicaos.length,
            posicaos: posicaos
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

exports.postPosicao = async (req, res, next) => {
    var createPosicao;
    var valor = 0;
    try {
        console.log(req.body);
        const valor = await prisma.posicao.count({
            where: {
                statuscompra: req.body.posicao.statuscompra,
                status: 'A'
            }
        })

        if (valor != 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Posicao já cadastrado' })
        }


        const createPosicao = await prisma.posicao.create({
            data: {
                statuscompra: req.body.posicao.statuscompra,
                nome: req.body.posicao.nome,
                idusercreateAt: Number(req.user.idusuario)
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Posicao inserido com sucesso',
            createPosicao: createPosicao
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

exports.getPosicaoDetail = async (req, res, next) => {
    try {
        const posicao = await prisma.posicao.findUnique({
            where: {
                statuscompra: req.body.posicao.statuscompra,
                status: 'A'
            }
        })

        if (posicao.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Posicao não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            posicao: posicao
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

exports.updatePosicao = async (req, res, next) => {

    try {

        const valor = await prisma.posicao.count({
            where: {
                statuscompra: req.body.posicao.statuscompra,
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Posicao não cadastrado' })
        }

        const updatePosicao = await prisma.posicao.update({
            where: {
                statuscompra: req.body.posicao.statuscompra,
            },
            data: {
                nome: req.body.posicao.nome,
                iduserupdatedAt: Number(req.user.idusuario)
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Posicao atualizado com sucesso',
            updatePosicao: updatePosicao
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

exports.deletePosicao = async (req, res, next) => {

    try {

        const valor = await prisma.posicao.count({
            where: {
                statuscompra: req.body.posicao.statuscompra,
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Posicao não cadastrado' })
        }


        const deletePosicao = await prisma.posicao.update({
            where: {
                statuscompra: req.body.posicao.statuscompra,
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Posicao removido com sucesso',
            deletePosicao: deletePosicao
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






