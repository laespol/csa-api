const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.getSendmail = async (req, res, next) => {
    var sendmails;
    try {
        sendmails = await prisma.sendmail.findMany({
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
            length: sendmails.length,
            sendmails: sendmails
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

exports.postSendmail = async (req, res, next) => {

    var createSendmail;
    try {
        createSendmail = await prisma.sendmail.create({
            data: {
                destinatario: req.body.sendmail.destinatario,
                html: Buffer.from(req.body.sendmail.html),
                subject: req.body.sendmail.subject,
                idsolicitante: req.body.sendmail.idsolicitante,
                idusuarioaprovacao: req.body.sendmail.idusuarioaprovacao,
                idusuariocotacao: req.body.sendmail.idusuariocotacao,
                idusuarioaprovacaodir: req.body.sendmail.idusuarioaprovacaodir,
                idusuariocompra: req.body.sendmail.idusuariocompra,
                idusuarioentrega: req.body.sendmail.idusuarioentrega,
                idcompra: req.body.sendmail.idcompra,
                idusercreateAt: Number(4)
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Sendmail inserido com sucesso',
            createSendmail: createSendmail
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

exports.getSendmailDetail = async (req, res, next) => {
    var sendmail;
    try {
        sendmail = await prisma.sendmail.findUnique({
            where: {
                idsendmail: req.params.idsendmail,
                status: 'A'
            }
        })

        if (result.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Sendmail não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            sendmail: sendmail
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

exports.updateSendmail = async (req, res, next) => {
    const idsendmail = parseInt(req.params.idsendmail);
    var valor;
    try {

        valor = await prisma.sendmail.count({
            where: {
                idsendmail: idsendmail,
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Sendmail não cadastrado' })
        }
        console.log(req.body.sendmail.senha);
        const hash = await bcrypt.hashSync(req.body.sendmail.senha, 10);
        console.log(hash);

        updateSendmail = await prisma.sendmail.update({
            where: {
                idsendmail: idsendmail,
            },
            data: {
                destinatario: req.body.sendmail.destinatario,
                html: Buffer.from(req.body.sendmail.html),
                subject: req.body.sendmail.subject,
                idsolicitante: req.body.sendmail.idsolicitante,
                idusuarioaprovacao: req.body.sendmail.idusuarioaprovacao,
                idusuariocotacao: req.body.sendmail.idusuariocotacao,
                idusuarioaprovacaodir: req.body.sendmail.idusuarioaprovacaodir,
                idusuariocompra: req.body.sendmail.idusuariocompra,
                idusuarioentrega: req.body.sendmail.idusuarioentrega,
                idcompra: req.body.sendmail.idcompra,
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Sendmail atualizado com sucesso',
            updateSendmail: updateSendmail
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

exports.deleteSendmail = async (req, res, next) => {
    const idsendmail = parseInt(req.params.idsendmail);
    const idusuarioAcesso = parseInt(req.user.idusuario);
    var valor;
    try {

        valor = await prisma.sendmail.count({
            where: {
                idsendmail: idsendmail,
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Sendmail não cadastrado' })
        }


        deleteSendmail = await prisma.sendmail.update({
            where: {
                idsendmail: idsendmail,
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
            deleteSendmail: deleteSendmail
        }
    } catch (error) {
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

exports.postMensagem = async (req, res, next) => {
    var sendmails;
    try {
        sendmails = await prisma.sendmail.findMany({
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
            length: sendmails.length,
            sendmails: sendmails
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






