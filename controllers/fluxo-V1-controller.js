const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getFluxo = async (req, res, next) => {
    try {
        const fluxos = await prisma.fluxo.findMany({
            where: {
                status: 'A'
            },
            include : {usuario : true, nivel: true}
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: fluxos.length,
            fluxos: fluxos
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

exports.postFluxo = async (req, res, next) => {
    try {
        const createFluxo = await prisma.fluxo.create({
            data: {
                idnivel: req.body.fluxo.idnivel,
                iddepartamento: req.body.fluxo.iddepartamento,
                idusuario: req.body.fluxo.idusuario,
                idusercreateAt: Number(req.user.idusuario)
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Fluxo inserido com sucesso',
            createFluxo: createFluxo
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

exports.getFluxoDetail = async (req, res, next) => {
    try {
        const fluxo = await prisma.fluxo.findUnique({
            where: {
                idfluxo: Number(req.params.idfluxo),
                status: 'A'
            }, 
            include : {usuario: true, nivel:true}
        })

        if (fluxo.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Fluxo não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            fluxo: fluxo
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

exports.updateFluxo = async (req, res, next) => {
    const idfluxo = parseInt(req.params.idfluxo);
    const idfluxoAcesso = parseInt(req.user.idfluxo);
    var valor = 0;
    try {

        const valor = await prisma.fluxo.count({
            where: {
                idfluxo: Number(req.params.idfluxo),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Fluxo não cadastrado' })
        }

        const updateFluxo = await prisma.fluxo.update({
            where: {
                idfluxo: Number(req.params.idfluxo),
            },
            data: {
                idnivel: req.body.fluxo.idnivel,
                iddepartamento: req.body.fluxo.iddepartamento,
                idusuario: req.body.fluxo.idusuario,
                centrocusto: req.body.fluxo.centrocusto,
                iduserupdatedAt: Number(req.user.idusuario)
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Fluxo atualizado com sucesso',
            updateFluxo: updateFluxo
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

exports.deleteFluxo = async (req, res, next) => {
    try {

        const valor = await prisma.fluxo.count({
            where: {
                idfluxo: Number(req.params.idfluxo),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Fluxo não cadastrado' })
        }


        const deleteFluxo = await prisma.fluxo.update({
            where: {
                idfluxo: Number(req.params.idfluxo),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Fluxo removido com sucesso',
            deleteFluxo: deleteFluxo
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

exports.postFluxoconsulta = async (req, res, next) => {

    try {
        const fluxo = await prisma.fluxo.findFirst({
            where: {
                idnivel: Number(req.body.fluxo.idnivel),
                iddepartamento: Number(req.body.fluxo.iddepartamento),
                status: 'A'
            }, 
            include : {usuario: true, nivel: true}
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: fluxo.length,
            fluxo: fluxo
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



