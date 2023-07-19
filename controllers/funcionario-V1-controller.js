const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getFuncionario = async (req, res, next) => {
    try {
        const funcionarios = await prisma.funcionario.findMany({
            where: {
                status: 'A'
            }

        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: funcionarios.length,
            funcionarios: funcionarios
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

exports.postFuncionario = async (req, res, next) => {

    try {
        console.log(req.body);
        const valor = await prisma.funcionario.count({
            where: {
                nome: req.body.funcionario.nome,
                status: 'A'
            }
        })

        if (valor != 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Funcionario já cadastrado' })
        }

        const createFuncionario = await prisma.funcionario.create({
            data: {
                chapa: req.body.funcionario.chapa,
                departamento : req.body.funcionario.departamento,
                nome: req.body.funcionario.nome,
                centrocusto: req.body.funcionario.centrocusto,
                idusercreateAt: Number(req.user.idusuario),
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Funcionario inserido com sucesso',
            createFuncionario: createFuncionario
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

exports.getFuncionarioDetail = async (req, res, next) => {
    console.log(req.params)
    try {

  
        const funcionario = await prisma.funcionario.findFirst({
            where: {
                chapa: { contains: req.params.chapa },
                status: 'A'
            }
        })
        console.log(funcionario);

        if ( funcionario == null) {
            await prisma.$disconnect()
            return res.status(200).send({
                ok: false,
                message: 'Funcionario não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            funcionario: funcionario
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

exports.updateFuncionario = async (req, res, next) => {

    try {

        const valor = await prisma.funcionario.count({
            where: {
                idfuncionario: Number(req.body.funcionario.idfuncionario),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Funcionario não cadastrado' })
        }

        const updateFuncionario = await prisma.funcionario.update({
            where: {
                idfuncionario: Number(req.body.funcionario.idfuncionario)
            },
            data: {
                chapa: req.body.funcionario.chapa,
                departamento : req.body.funcionario.departamento,
                nome: req.body.funcionario.nome,
                centrocusto: req.body.funcionario.centrocusto,
                iduserupdatedAt: Number(req.user.idusuario)
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Funcionario atualizado com sucesso',
            updateFuncionario: updateFuncionario
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

exports.deleteFuncionario = async (req, res, next) => {
    try {

        const valor = await prisma.funcionario.count({
            where: {
                idfuncionario: Number(req.body.funcionario.idfuncionario),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Funcionario não cadastrado' })
        }


        const deleteFuncionario = await prisma.funcionario.update({
            where: {
                idfuncionario: Number(req.body.funcionario.idfuncionario),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Funcionario removido com sucesso',
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

exports.getFuncionarioDetailNome = async (req, res, next) => {
    console.log(req.params)
    try {
        const funcionarios = await prisma.funcionario.findMany({
            where: {    
                nome: { contains: req.params.nome }  ,
                status: 'A'
            }
        })

        if (funcionarios.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Funcionario não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            funcionarios: funcionarios
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

