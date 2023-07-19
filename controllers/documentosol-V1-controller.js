const { Prisma, PrismaClient } = require('@prisma/client')

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

exports.getDocumentosol = async (req, res, next) => {

    try {

        const documentosols = await prisma.documentosol.findMany({
            where: {
                status: 'A'
            },
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: documentosols.length,
            documentosols: documentosols
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


exports.postDocumentosol = async (req, res, next) => {
    console.log(req.params.idsolicitacao);

    try {
        const createDocumentosol = await prisma.documentosol.create({
            data: {
                idsolicitacao: Number(req.params.idsolicitacao),
                documentopdf: Buffer.from(req.files.documentopdf.data),
                nome: req.files.documentopdf.name,
                mimetype: req.files.documentopdf.mimetype,
                encoding: req.files.documentopdf.encoding,
                size: Number(req.files.documentopdf.size),
                idusercreateAt: Number(4),

                status: "A"
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Documentosol inserido com sucesso',
            createDocumentosol: createDocumentosol
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

exports.postDocumentosolSegura = async (req, res, next) => {
    console.log(req.params.idsolicitacao);

    try {
        const createDocumentosol = await prisma.documentosol.create({
            data: {
                idsolicitacao: Number(req.params.idsolicitacao),
                documentopdf: Buffer.from(req.files.documentopdf.data),
                nome: req.files.documentopdf.name,
                mimetype: req.files.documentopdf.mimetype,
                encoding: req.files.documentopdf.encoding,
                size: Number(req.files.documentopdf.size),
                idusercreateAt:  Number(req.user.idusuario),

                status: "A"
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Documentosol inserido com sucesso',
            createDocumentosol: createDocumentosol
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

exports.getDocumentosolDetail = async (req, res, next) => {
    console.log(req.params.idsolicitacao)
    try {
        const documentosols = await prisma.documentosol.findMany({
            where: {
                idsolicitacao: Number(req.params.idsolicitacao),
                status: 'A',
            },
            orderBy: {
                iddocumentosol: "desc"
            }
        })
        await prisma.$disconnect()
 //       console.log(documentosol.length);
 //       if (documentosol.length == 0) {
 //           return res.status(404).send({
//                message: 'Documentosol não encontrado'
 //           })
//}

        const response = {
            ok: true,
            documentosols: documentosols
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

exports.updateDocumentosol = async (req, res, next) => {
    try {

        const valor = await prisma.documentosol.count({
            where: {
                idcontrato: Number(req.params.idcontrato),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Documentosol não cadastrado' })
        }
        const updateDocumentosol = await prisma.documentosol.update({
            where: {
                idcontrato: Number(req.params.idcontrato),
            },
            data: {
                idcontrato: Number(req.body.documentosol.idcontrato),
                documentosolpdf: req.body.documentosol.documentosolpdf,
                iduserupdatedAt: Number(req.user.idusuario),
                statusdocumentosol: req.body.documentosol.statusdocumentosol

            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Documentosol atualizado com sucesso',
            updateDocumentosol: updateDocumentosol
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

exports.deleteDocumentosol = async (req, res, next) => {
    try {
        const valor = await prisma.documentosol.count({
            where: {
                idcontrato: Number(req.params.idcontrato),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Documentosol não cadastrado' })
        }
        const deleteDocumentosol = await prisma.documentosol.update({
            where: {
                iddocumentosol: Number(req.params.iddocumentosol),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Documentosol excluido com sucesso',
            deleteDocumentosol: deleteDocumentosol
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

exports.getDocumentosolDetailPDF = async (req, res, next) => {

    try {
        const documentosol = await prisma.documentosol.findFirst({
            select : {
                documentosolpdf : true
            },
            where: {
                idcontrato: Number(req.params.idcontrato),
                status: 'A',
            }
        })
        await prisma.$disconnect()
 //       console.log(documentosol.length);
 //       if (documentosol.length == 0) {
 //           return res.status(404).send({
//                message: 'Documentosol não encontrado'
 //           })
//}

        const response = {
            documentosol: documentosol.documentosolpdf
        }
        console.log("response = " + documentosol.documentosolpdf);
        return res.status(200).send(documentosol.documentosolpdf);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};
