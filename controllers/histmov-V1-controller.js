const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getHistmov = async (req, res, next) => {
    try {
        const histmovs = await prisma.histmov.findMany({
            where: {
                status: 'A'
            }
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: histmovs.length,
            histmovs: histmovs
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

exports.postHistmov = async (req, res, next) => {

    try {
        console.log(req.body);
        const valor = await prisma.histmov.count({
            where: {
                nome: req.body.histmov.nome,
                status: 'A'
            }
        })

        if (valor != 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Histmov já cadastrado' })
        }

        const createHistmov = await prisma.histmov.create({
            data: {
                idusuario  : Number(req.body.histmov.idusuario),
                dtretirada : req.body.contrato.dtretirada,
                dtdevolucao : req.body.contrato.dtasscont,
                idusercreateAt : Number(req.user.idusuario),  
                status : 'A'        
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Histmov inserido com sucesso',
            createHistmov: createHistmov
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

exports.getHistmovDetail = async (req, res, next) => {
    try {
        const histmov = await prisma.histmov.findUnique({
            where: {
                idhistmov: req.params.idhistmov,
                status: 'A'
            }
        })

        if (result.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Histmov não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            histmov: histmov
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

exports.updateHistmov = async (req, res, next) => {

    try {

        const valor = await prisma.histmov.count({
            where: {
                idhistmov: Number(req.body.histmov.idhistmov),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Histmov não cadastrado' })
        }

        const updateHistmov = await prisma.histmov.update({
            where: {
                idhistmov: Number(req.body.histmov.idhistmov)
            },
            data: {
                idusuario  : Number(req.body.histmov.idusuario),
                dtretirada : req.body.contrato.dtretirada,
                dtdevolucao : req.body.contrato.dtasscont,
                nome: req.body.histmov.nome,
                iduserupdatedAt: Number(req.user.idusuario),
                updatedAt : new Date()
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Histmov atualizado com sucesso',
            updateHistmov: updateHistmov
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

exports.deleteHistmov = async (req, res, next) => {
    try {

        const valor = await prisma.histmov.count({
            where: {
                idhistmov: Number(req.body.histmov.idhistmov),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Histmov não cadastrado' })
        }


        const deleteHistmov = await prisma.histmov.update({
            where: {
                idhistmov: Number(req.body.histmov.idhistmov),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Histmov removido com sucesso',
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






