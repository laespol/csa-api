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

exports.getDocumento = async (req, res, next) => {

    try {

        const documentos = await prisma.documento.findMany({
            where: {
                status: 'A'
            },
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: documentos.length,
            documentos: documentos
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


exports.postDocumento = async (req, res, next) => {

 //   console.log(req.files);

    try {
        const createDocumento = await prisma.documento.create({
            data: {
                idcontrato: Number(req.params.idcontrato),
                documentopdf: Buffer.from(req.files.documentopdf.data),
                nome: req.files.documentopdf.name,
                mimetype: req.files.documentopdf.mimetype,
                encoding: req.files.documentopdf.encoding,
                size: Number(req.files.documentopdf.size),
                idusercreateAt: Number(req.user.idusuario),

                status: "A"
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Documento inserido com sucesso',
            createDocumento: createDocumento
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

exports.getDocumentoDetail = async (req, res, next) => {
    console.log(req.params.idcontrato)
    try {
        const documento = await prisma.documento.findFirst({
            where: {
                idcontrato: Number(req.params.idcontrato),
                status: 'A',
            },
            include: {
                contrato: true
            },
            orderBy: {
                iddocumento: "desc"
            }
        })
        await prisma.$disconnect()
 //       console.log(documento.length);
 //       if (documento.length == 0) {
 //           return res.status(404).send({
//                message: 'Documento não encontrado'
 //           })
//}

        const response = {
            ok: true,
            documento: documento
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

exports.updateDocumento = async (req, res, next) => {
    try {

        const valor = await prisma.documento.count({
            where: {
                idcontrato: Number(req.params.idcontrato),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Documento não cadastrado' })
        }
        const updateDocumento = await prisma.documento.update({
            where: {
                idcontrato: Number(req.params.idcontrato),
            },
            data: {
                idcontrato: Number(req.body.documento.idcontrato),
                documentopdf: req.body.documento.documentopdf,
                iduserupdatedAt: Number(req.user.idusuario),
                statusdocumento: req.body.documento.statusdocumento

            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Documento atualizado com sucesso',
            updateDocumento: updateDocumento
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

exports.deleteDocumento = async (req, res, next) => {
    try {
        const valor = await prisma.documento.count({
            where: {
                idcontrato: Number(req.params.idcontrato),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Documento não cadastrado' })
        }
        const deleteDocumento = await prisma.documento.update({
            where: {
                iddocumento: Number(req.params.iddocumento),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Documento excluido com sucesso',
            deleteDocumento: deleteDocumento
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

exports.getDocumentoDetailPDF = async (req, res, next) => {

    try {
        const documento = await prisma.documento.findFirst({
            select : {
                documentopdf : true
            },
            where: {
                idcontrato: Number(req.params.idcontrato),
                status: 'A',
            }
        })
        await prisma.$disconnect()
 //       console.log(documento.length);
 //       if (documento.length == 0) {
 //           return res.status(404).send({
//                message: 'Documento não encontrado'
 //           })
//}

        const response = {
            documento: documento.documentopdf
        }
        console.log("response = " + documento.documentopdf);
        return res.status(200).send(documento.documentopdf);
    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};
