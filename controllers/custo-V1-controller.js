const { PrismaClient } = require('@prisma/client')
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
}) */

exports.getCusto = async (req, res, next) => {
    try {
        const custos = await prisma.custo.findMany({
            where: {
                status: 'A'
            },
            include: {
                imovel: true
            },
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: custos.length,
            custos: custos
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

exports.postCusto = async (req, res, next) => {

    try {
        console.log(req.body);
        const valor = await prisma.custo.count({
            where: {
                idimovel : req.body.custo.idimovel,
                nome: req.body.custo.nome,
                status: 'A'
            }
        })

        if (valor != 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Custo já cadastrado' })
        }

        const createCusto = await prisma.custo.create({
            data: {
                idimovel : req.body.custo.idimovel,
                nome: req.body.custo.nome,
                idusercreateAt: Number(req.user.idusuario),
            },
            include: {
                imovel: true
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Custo inserido com sucesso',
            createCusto: createCusto
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

exports.getCustoDetail = async (req, res, next) => {
//    console.log(req.params.idimovel)
    try {
        const custos = await prisma.custo.findMany({
            where: {
                idimovel: Number(req.params.idimovel),
                status: 'A'
            },
            include: {
                imovel: true
            },
        })
//        console.log(custos);
        if (custos.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Custo não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            custos: custos
        }
        return res.status(200).send(response);
    } catch (error) {
        await prisma.$disconnect()
        console.log(JSON.stringify(error));
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

exports.updateCusto = async (req, res, next) => {

    try {

        const valor = await prisma.custo.count({
            where: {
                idcusto: Number(req.body.custo.idcusto),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Custo não cadastrado' })
        }

        const updateCusto = await prisma.custo.update({
            where: {
                idcusto: Number(req.body.custo.idcusto)
            },
            data: {
                nome: req.body.custo.nome,
                iduserupdatedAt: Number(req.user.idusuario)
            },
            include: {
                imovel: true
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Custo atualizado com sucesso',
            updateCusto: updateCusto
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

exports.deleteCusto = async (req, res, next) => {
    try {

        const valor = await prisma.custo.count({
            where: {
                idcusto: Number(req.body.custo.idcusto),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Custo não cadastrado' })
        }


        const deleteCusto = await prisma.custo.update({
            where: {
                idcusto: Number(req.body.custo.idcusto),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Custo removido com sucesso',
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






