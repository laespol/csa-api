const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getImovel = async (req, res, next) => {
    try {
        const imovels = await prisma.imovel.findMany({
            where: {
                status: 'A'
            }

        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: imovels.length,
            imovels: imovels
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

exports.postImovel = async (req, res, next) => {

    try {
        console.log(req.body);
        const valor = await prisma.imovel.count({
            where: {
                nome: req.body.imovel.nome,
                status: 'A'
            }
        })

        if (valor != 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Imovel já cadastrado' })
        }

        const createImovel = await prisma.imovel.create({
            data: {
                nome: req.body.imovel.nome,
                idusercreateAt: Number(req.user.idusuario),
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Imovel inserido com sucesso',
            createImovel: createImovel
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

exports.getImovelDetail = async (req, res, next) => {
    try {
        const imovel = await prisma.imovel.findFirst({
            where: {
                idimovel: Number(req.params.idimovel),
                status: 'A'
            }
        })

        if (imovel.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Imovel não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            imovel: imovel
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

exports.updateImovel = async (req, res, next) => {

    try {

        const valor = await prisma.imovel.count({
            where: {
                idimovel: Number(req.body.imovel.idimovel),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Imovel não cadastrado' })
        }

        const updateImovel = await prisma.imovel.update({
            where: {
                idimovel: Number(req.body.imovel.idimovel)
            },
            data: {
                nome: req.body.imovel.nome,
                iduserupdatedAt: Number(req.user.idusuario)
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Imovel atualizado com sucesso',
            updateImovel: updateImovel
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

exports.deleteImovel = async (req, res, next) => {
    try {

        const valor = await prisma.imovel.count({
            where: {
                idimovel: Number(req.body.imovel.idimovel),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Imovel não cadastrado' })
        }


        const deleteImovel = await prisma.imovel.update({
            where: {
                idimovel: Number(req.body.imovel.idimovel),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Imovel removido com sucesso',
            deleteUsuario: deleteUsuario
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






