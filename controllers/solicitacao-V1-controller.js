const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


// Exclude keys from user
function exclude(user, keys) {
    for (let key of keys) {
        delete user[key]
    }
    return user
}
/*
exports.getSolicitacao = async (req, res, next) => {
    try {
        const solicitacaos = await prisma.solicitacao.findMany({
            where: {
                status: 'A'
            }
        })
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: solicitacaos.length,
            solicitacaos: solicitacaos
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
*/

exports.getSolicitacao = async (req, res, next) => {

    var sortOrder = '';

    let contratos = '';

    let totalRecords = 0;

    let where = '';

    let OR = '';




    console.log("req = " + JSON.stringify(req.params.filters));


    if (req.params.sortOrder == 1) {
        sortOrder = "desc";
    } else {
        sortOrder = "asc";
    }

    var sortBy = req.params.sortField;

    //    orderBy = { [req.params.sortField]: sortOrder }

    if (req.params.sortField == 'tpsolicitacao') {
        //        console.log("sortBy custo = " + JSON.stringify(sortBy));
        orderBy = { tpsolicitacao: { idtpsolcitacao: sortOrder } }
    } else {
        orderBy = { [req.params.sortField]: sortOrder }
    }
    /*
        if (req.params.sortField == 'imovel') {
            //            console.log("sortBy imovel = " + JSON.stringify(sortBy));
            orderBy = { [{ custo: { imove: { nome } } }]: sortOrder };
        } else {
            if (req.params.sortField == 'unidade') {
                //                console.log("sortBy unidade = " + JSON.stringify(sortBy));
                orderBy = { unidade: { nome: sortOrder } }
            } else {
                orderBy = { [req.params.sortField]: sortOrder }
            }
        }
    }
*/
    try {
        usuario = await prisma.usuario.findUnique({
            where: {
                idusuario: Number(req.user.idusuario),
            }
        })
        await prisma.$disconnect()

        if (req.params.filters == 0) {
            if (usuario.vtodoscontratos) {
                if (req.params.globalFilter != 'undefined') {
                    //                    console.log("where = { status: 'A', consulta: { contains: req.params.globalFilter } };");
                    where = { status: 'A', consulta: { contains: req.params.globalFilter } };
                }
                else {
                    //                   console.log("where = { status: 'A' }");
                    where = { status: 'A' }
                };
            } else {
                //               console.log("usuario.idnivel = " + usuario.idnivel)
                if (usuario.idnivel == 3) {
                    OR = await prisma.unidadegestor.findMany({
                        where: {
                            status: 'A',
                            idusuario: Number(req.user.idusuario)
                        },
                        //                       select: {

                        //                           idunidade: true

                        //                       }
                    })
                    if (req.params.globalFilter != 'undefined') {
                        //        console.log("where = { status: 'A',custo : {idimovel :Number(req.params.filters)}, idunidade: usuario.idunidade, consulta: { contains: req.params.globalFilter } };");
                        where = { status: 'A', OR, consulta: { contains: req.params.globalFilter } };
                    } else {
                        //      console.log("where = { status: 'A',custo :{idimovel :Number(req.params.filters)}, idunidade: usuario.idunidade };")
                        where = { status: 'A', OR };

                    }
                } else {
                    if (req.params.globalFilter != 'undefined') {
                        // console.log("where = { status: 'A', idunidade: usuario.idunidade, consulta: { contains: req.params.globalFilter } };");
                        where = { status: 'A', idunidade: usuario.idunidade, consulta: { contains: req.params.globalFilter } };
                    } else {
                        // console.log("where = { status: 'A', idunidade: usuario.idunidade };");
                        where = { status: 'A', idunidade: usuario.idunidade };

                    }
                }
            }
        } else {
            if (usuario.ti) {
                console.log("usuario.idnivel = " + usuario.idnivel)
                if (usuario.idnivel == 3) {
                    OR = await prisma.unidadegestor.findMany({
                        where: {
                            status: 'A',
                            idusuario: Number(req.user.idusuario)
                        },
                        //                       select: {
                        //                           idunidade: true
                        //                       }
                    })
                    if (req.params.globalFilter != 'undefined') {
                        //        console.log("where = { status: 'A',custo : {idimovel :Number(req.params.filters)}, idunidade: usuario.idunidade, consulta: { contains: req.params.globalFilter } };");
                        where = { status: 'A', custo: { idimovel: Number(req.params.filters) }, OR, consulta: { contains: req.params.globalFilter } };
                    } else {
                        //      console.log("where = { status: 'A',custo :{idimovel :Number(req.params.filters)}, idunidade: usuario.idunidade };")
                        where = { status: 'A', custo: { idimovel: Number(req.params.filters) }, OR };

                    }
                } else {
                    if (req.params.globalFilter != 'undefined') {
                        //            console.log("where = { status: 'A', custo : {idimovel :Number(req.params.filters)}, consulta: { contains: req.params.globalFilter } };");
                        where = { status: 'A', custo: { idimovel: Number(req.params.filters) }, consulta: { contains: req.params.globalFilter } };
                    }
                    else {
                        //          console.log("where = { status: 'A', custo : {idimovel :Number(req.params.filters)} }")
                        where = { status: 'A', custo: { idimovel: Number(req.params.filters) } }
                    };
                }
            } else {
                console.log("usuario.idnivel = " + usuario.idnivel)
                if (usuario.idnivel == 3) {
                    OR = await prisma.unidadegestor.findMany({
                        where: {
                            status: 'A',
                            idusuario: Number(req.user.idusuario)
                        },
                        select: {

                            idunidade: true

                        }
                    })
                    if (req.params.globalFilter != 'undefined') {
                        //        console.log("where = { status: 'A',custo : {idimovel :Number(req.params.filters)}, idunidade: usuario.idunidade, consulta: { contains: req.params.globalFilter } };");
                        where = { status: 'A', custo: { idimovel: Number(req.params.filters) }, OR, consulta: { contains: req.params.globalFilter } };
                    } else {
                        //      console.log("where = { status: 'A',custo :{idimovel :Number(req.params.filters)}, idunidade: usuario.idunidade };")
                        where = { status: 'A', custo: { idimovel: Number(req.params.filters) }, OR };

                    }
                } else {
                    if (req.params.globalFilter != 'undefined') {
                        //        console.log("where = { status: 'A',custo : {idimovel :Number(req.params.filters)}, idunidade: usuario.idunidade, consulta: { contains: req.params.globalFilter } };");
                        where = { status: 'A', custo: { idimovel: Number(req.params.filters) }, idunidade: usuario.idunidade, consulta: { contains: req.params.globalFilter } };
                    } else {
                        //      console.log("where = { status: 'A',custo :{idimovel :Number(req.params.filters)}, idunidade: usuario.idunidade };")
                        where = { status: 'A', custo: { idimovel: Number(req.params.filters) }, idunidade: usuario.idunidade };

                    }
                }
            }
        }


        totalRecords = await prisma.solicitacao.count({
            where
        })
        solicitacaos = await prisma.solicitacao.findMany({
            skip: Number(req.params.skip),
            take: Number(req.params.take),
            where,
            include: {
                usuario: true,
                tpsolicitacao: true
                //, unidade: true,
                //               custo:  iddocumento: true,
            },
            //               {
            //                   include: { imovel: true }
            //               },
            //               Documento: {
            //                   select: {
            //                     },
            //           },
            orderBy
        })


        for (i = 0; i <= solicitacaos.length - 1; i++) {
            const userWithoutPassword = exclude(solicitacaos[i], ['consulta']);
            if (usuario.contrato == 0) {
                if (solicitacaos[i].sigilo == '1') {
                    solicitacaos[i].nome = 'XXXX';
                    solicitacaos[i].telefone = 'XXXX';
                    solicitacaos[i].email = 'XXXX@XXX';
                    //               const userWithoutPassword1 = exclude(solicitacaos[i], ['nome']);
                    //               const userWithoutPassword2 = exclude(solicitacaos[i], ['telefone']);
                    //               const userWithoutPassword3 = exclude(solicitacaos[i], ['email']);
                }
            }
        }

        //        console.log("userWithoutPassword " + JSON.stringify(userWithoutPassword));
        await prisma.$disconnect()
        //       console.log(JSON.stringify(contratos));
        const response = {
            ok: true,
            totalRecords: totalRecords,
            length: solicitacaos.length,
            solicitacaos: solicitacaos
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

exports.postSolicitacao = async (req, res, next) => {
    var createSolicitacao;
    console.log(req.body);
    var valor = 0;
    try {

        const createSolicitacao = await prisma.solicitacao.create({
            data: {
                descricao: req.body.solicitacao.descricao,
                email: req.body.solicitacao.email,
                nome: req.body.solicitacao.nome,
                sigilo: Number(req.body.solicitacao.sigilo),
                telefone: req.body.solicitacao.telefone,
                idtpsolicitacao: Number(req.body.solicitacao.tpsolicitacao.idtpsolicitacao),
                consulta: (req.body.solicitacao.descricao + req.body.solicitacao.email + req.body.solicitacao.nome + req.body.solicitacao.telefone + req.body.solicitacao.resposta),

                idusercreateAt: Number(4)
            }
        });

        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Solicitacao inserido com sucesso',
            createSolicitacao: createSolicitacao
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

exports.postSolicitacaoSegura = async (req, res, next) => {
    var createSolicitacao;

    console.log(req.body);
    var valor = 0;
    try {

        const createSolicitacao = await prisma.solicitacao.create({
            data: {
                descricao: req.body.solicitacao.descricao,
                email: req.body.solicitacao.email,
                nome: req.body.solicitacao.nome,
                sigilo: Number(req.body.solicitacao.sigilo),
                telefone: req.body.solicitacao.telefone,
                idtpsolicitacao: Number(req.body.solicitacao.idtpsolicitacao),
                consulta: (req.body.solicitacao.descricao + req.body.solicitacao.email + req.body.solicitacao.nome + req.body.solicitacao.telefone + req.body.solicitacao.resposta),
                idusercreateAt: Number(req.user.idusuario)
            }
        });

        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Solicitacao inserido com sucesso',
            createSolicitacao: createSolicitacao
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

exports.getSolicitacaoDetail = async (req, res, next) => {
    try {
        const solicitacao = await prisma.solicitacao.findUnique({
            where: {
                idsolicitacao: Number(req.params.idsolicitacao),
                status: 'A'
            }
        })

        if (solicitacao.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Solicitacao não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            solicitacao: solicitacao
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

exports.updateSolicitacao = async (req, res, next) => {

    try {

        const valor = await prisma.solicitacao.count({
            where: {
                idsolicitacao: Number(req.params.idsolicitacao),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Solicitacao não cadastrado' })
        }

        const updateSolicitacao = await prisma.solicitacao.update({
            where: {
                idsolicitacao: Number(req.params.idsolicitacao),
            },
            data: {
                descricao: req.body.solicitacao.descricao,
                email: req.body.solicitacao.email,
                nome: req.body.solicitacao.nome,
                sigilo: Number(req.body.solicitacao.sigilo),
                telefone: req.body.solicitacao.telefone,
                resposta: req.body.solicitacao.resposta,
                statussolicitacao: req.body.solicitacao.statussolicitacao,
                idtpsolicitacao: Number(req.body.solicitacao.idtpsolicitacao),
                consulta: (req.body.solicitacao.descricao + req.body.solicitacao.email + req.body.solicitacao.nome + req.body.solicitacao.telefone + req.body.solicitacao.resposta),
                iduserupdatedAt: Number(req.user.idusuario)
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Solicitacao atualizado com sucesso',
            updateSolicitacao: updateSolicitacao
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

exports.deleteSolicitacao = async (req, res, next) => {

    try {

        const valor = await prisma.solicitacao.count({
            where: {
                idsolicitacao: Number(req.params.idsolicitacao),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Solicitacao não cadastrado' })
        }


        const deleteSolicitacao = await prisma.solicitacao.update({
            where: {
                statuscompra: req.body.solicitacao.statuscompra,
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Solicitacao removido com sucesso',
            deleteSolicitacao: deleteSolicitacao
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






