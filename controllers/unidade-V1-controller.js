const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getUnidade = async (req, res, next) => {
    try {
        const unidades = await prisma.unidade.findMany({
            where: {
                status: 'A'
            },
            include: {
                imovel: true
            },
        })
        await prisma.$disconnect()
        console.log("Unidade = " + JSON.stringify(unidades)); 
        const response = {
            ok: true,
            length: unidades.length,
            unidades: unidades
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

exports.postUnidade = async (req, res, next) => {

    try {
        console.log(req.body);
        const valor = await prisma.unidade.count({
            where: {
                nome: req.body.unidade.nome,
                status: 'A'
            }
        })

        if (valor != 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Unidade já cadastrado' })
        }

        const createUnidade = await prisma.unidade.create({
            data: {
                nome: req.body.unidade.nome,
                idimovel : req.body.unidade.idimovel,
                centrocusto: req.body.unidade.centrocusto,
                idusercreateAt: Number(req.user.idusuario),
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Unidade inserido com sucesso',
            createUnidade: createUnidade
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

exports.getUnidadeDetail = async (req, res, next) => {
    try {
        const unidade = await prisma.unidade.findFirst({
            where: {
                idunidade: Number(req.params.idunidade),
                status: 'A'
            },
            include: {
                imovel: true
            },
        })

        if (unidade.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Unidade não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            unidade: unidade
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

exports.updateUnidade = async (req, res, next) => {

    try {

        const valor = await prisma.unidade.count({
            where: {
                idunidade: Number(req.body.unidade.idunidade),
                idimovel : req.body.unidade.idimovel,
                centrocusto: req.body.unidade.centrocusto,
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Unidade não cadastrado' })
        }

        const updateUnidade = await prisma.unidade.update({
            where: {
                idunidade: Number(req.body.unidade.idunidade)
            },
            data: {
                nome: req.body.unidade.nome,
                iduserupdatedAt: Number(req.user.idusuario)
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Unidade atualizado com sucesso',
            updateUnidade: updateUnidade
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

exports.deleteUnidade = async (req, res, next) => {
    try {

        const valor = await prisma.unidade.count({
            where: {
                idunidade: Number(req.body.unidade.idunidade),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Unidade não cadastrado' })
        }


        const deleteUnidade = await prisma.unidade.update({
            where: {
                idunidade: Number(req.body.unidade.idunidade),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Unidade removido com sucesso',
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






