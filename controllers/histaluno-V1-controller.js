const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getHistaluno = async (req, res, next) => {

    try {
        const histalunos = await prisma.histaluno.findMany({
            where: {
                status: 'A'
            },
            include: {
                aluno: true,
                serie: true,
                anoletivo: true,
                posicao: true,
                usuario: true
            }
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: histalunos.length,
            histalunos: histalunos
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

exports.postHistaluno = async (req, res, next) => {
    console.log(req.body);
    try {
        const createHistaluno = await prisma.histaluno.create({
            data: {
                nome: req.body.histaluno.nome,
                iditcompra: Number(req.body.histaluno.iditcompra),
                idusercreateAt: Number(req.user.idusuario),
                statuscompra: req.body.histaluno.statuscompra
            },
            include: {
                posicao: true
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Histaluno inserido com sucesso',
            createHistaluno: createHistaluno
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

exports.getHistalunoDetail = async (req, res, next) => {

    try {
        const histaluno = await prisma.histaluno.findMany({
            where: {
                idhistaluno: Number(req.params.idhistaluno),
                status: 'A'
            },
            include: {
                aluno: true,
                serie: true,
                anoletivo: true,
                posicao: true,
                usuario: true
            }
        })

        if (histaluno.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Histaluno não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            histaluno: histaluno
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

exports.updateHistaluno = async (req, res, next) => {
    try {

        const valor = await prisma.histaluno.count({
            where: {
                idhistaluno: Number(req.params.idhistaluno),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Histaluno não cadastrado' })
        }

        updateHistaluno = await prisma.histaluno.update({
            where: {
                idhistaluno: Number(req.params.idhistaluno),
            },
            data: {
                nome: req.body.histaluno.nome,
                iditcompra: Number(req.body.histaluno.iditcompra),
                iduserupdatedAt: Number(req.user.idusuario),
                statuscompra: req.body.histaluno.statuscompra
            },
            include: {
                posicao: true
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Historico atualizado com sucesso',
            updateHistaluno: updateHistaluno
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

exports.deleteHistaluno = async (req, res, next) => {

    try {

        valor = await prisma.histaluno.count({
            where: {
                idhistaluno: Number(req.params.idhistaluno),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Historico não cadastrado' })
        }


        deleteHistaluno = await prisma.histaluno.update({
            where: {
                idhistaluno: Number(req.params.idhistaluno),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
            include: {
                posicao: true
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Historico removido com sucesso',
            deleteHistaluno: deleteHistaluno
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


exports.getHistalunoDetailIditcompra = async (req, res, next) => {
    try {
        const histalunos = await prisma.histaluno.findMany({
            where: {
                iditcompra: Number(req.params.iditcompra),
                status: 'A'
            },
            orderBy: {
                createdAt: "desc"
            },
            include: {
                posicao: true, usuario: true
            }

        })

        if (histalunos.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Historico não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: histalunos.length,
            histalunos: histalunos
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



