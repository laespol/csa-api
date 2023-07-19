const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getGeradospdf = async (req, res, next) => {
    var geradospdfs;
    try {
        geradospdfs = await prisma.geradospdf.findMany({
            where: {
                status: 'A'
            },
            orderBy: {
                createdAt: "asc"
            }
        }
        )
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: geradospdfs.length,
            geradospdfs: geradospdfs
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

exports.postGeradospdf = async (req, res, next) => {
    var createGeradospdf;
    try {
        createGeradospdf = await prisma.geradospdf.create({
            data: {
                programa: req.body.geradospdf.programa,
                codigo: req.body.geradospdf.codigo,
                idusercreateAt: req.user.idusuario,
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Geradospdf inserido com sucesso',
            createGeradospdf: createGeradospdf
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

exports.getGeradospdfDetail = async (req, res, next) => {
    var geradospdf;
    try {
        geradospdf = await prisma.geradospdf.findFirst({
            where: {
                programa : req.params.programa,
                status: 'A'
            },
            orderBy: {
                createdAt: "asc"
            }
        }
        )
        await prisma.$disconnect()
        const response = {
            ok: true,
            geradospdf: geradospdf
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

exports.updateGeradospdf = async (req, res, next) => {
    const idgeradospdf = parseInt(req.params.idgeradospdf);
    var valor;
    try {

        valor = await prisma.geradospdf.count({
            where: {
                idgeradospdf: idgeradospdf,
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Geradospdf não cadastrado' })
        }
        console.log(req.body.geradospdf.senha);
        const hash = await bcrypt.hashSync(req.body.geradospdf.senha, 10);
        console.log(hash);

        updateGeradospdf = await prisma.geradospdf.update({
            where: {
                idgeradospdf: idgeradospdf,
            },
            data: {
                programa: req.body.geradospdf.programa,
                codigo: req.body.geradospdf.codigo,
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Geradospdf atualizado com sucesso',
            updateGeradospdf: updateGeradospdf
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

exports.deleteGeradospdf = async (req, res, next) => {
    const idgeradospdf = parseInt(req.params.idgeradospdf);
    const idusuarioAcesso = parseInt(req.user.idusuario);
    var valor;
    try {

        valor = await prisma.geradospdf.count({
            where: {
                idgeradospdf: idgeradospdf,
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Geradospdf não cadastrado' })
        }


        deleteGeradospdf = await prisma.geradospdf.update({
            where: {
                idgeradospdf: idgeradospdf,
            },
            data: {
                iduserupdatedAt: idusuarioAcesso,
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Posicao removido com sucesso',
            deleteGeradospdf: deleteGeradospdf
        }
    } catch (error) {
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};






