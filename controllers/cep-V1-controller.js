const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

var convert = require('xml-js');

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
}) */


exports.getCepDetail = async (req, res, next) => {
    //    console.log(req.params.idcep)
    try {
        const cep = await prisma.cep.findMany({
            where: {
                idcep: req.params.idcep,
            }
        })
        //        console.log(ceps);
        if (cep.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Cep não encontrado'
            })
        }
        await prisma.$disconnect()

        const response = {
            cep: cep
        }
        return res.status(200).header('Content-Type', 'application/xml').send(convert.json2xml(response, { compact: true, ignoreComment: true, spaces: 4 }));
    } catch (error) {
        await prisma.$disconnect()
        console.log(JSON.stringify(error));
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};








