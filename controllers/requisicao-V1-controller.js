const { Prisma, PrismaClient } = require('@prisma/client')

const moment = require('moment')

const prisma = new PrismaClient()

// Exclude keys from user
function exclude(user, keys) {
    for (let key of keys) {
        delete user[key]
    }
    return user
}
/*
const prisma = new PrismaClient({
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

exports.getRequisicao = async (req, res, next) => {

    var sortOrder = '';

    let requisicaos = '';

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

    if (req.params.sortField == 'custo') {
        //        console.log("sortBy custo = " + JSON.stringify(sortBy));
        orderBy = { custo: { nome: sortOrder } }
    } else {
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

    try {
        usuario = await prisma.usuario.findUnique({
            where: {
                idusuario: Number(req.user.idusuario),
            }
        })
        await prisma.$disconnect()

        if (req.params.filters == 0) {
            if (usuario.vtodosrequisicaos) {
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
                        select: {

                            idunidade: true

                        }
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

        totalRecords = await prisma.requisicao.count({
            where
        })
        requisicaos = await prisma.requisicao.findMany({
            skip: Number(req.params.skip),
            take: Number(req.params.take),
            where,
            include: {
                usuario: true, unidade: true,
                custo: {
                    include: { imovel: true }
                },
            },
            orderBy
        })

        for (i = 0; i <= requisicaos.length - 1; i++) {
            const userWithoutPassword = exclude(requisicaos[i], ['consulta']);
        }
        //        console.log("userWithoutPassword " + JSON.stringify(userWithoutPassword));
        await prisma.$disconnect()
        //       console.log(JSON.stringify(requisicaos));
        const response = {
            ok: true,
            totalRecords: totalRecords,
            length: requisicaos.length,
            requisicaos: requisicaos
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

exports.postRequisicao = async (req, res, next) => {
     console.log(req.body.requisicao);

   
    try {

        const pesquisaCusto = await prisma.custo.findFirst({
            where: {
                idcusto: Number(req.body.requisicao.idcusto),
                status: 'A',
            },
            include: {
                imovel: true,
            },
        })
        const pesquisaUnidade = await prisma.unidade.findFirst({
            where: {
                idunidade: Number(req.body.requisicao.idunidade),
                status: 'A',
            },
        })

        const createRequisicao = await prisma.requisicao.create({
            data: {
                //            idimovel: Number(req.body.requisicao.idimovel),
                descricao: req.body.requisicao.descricao,
                idunidade: Number(req.body.requisicao.idunidade),
                correcao: req.body.requisicao.correcao,
                valorproposta: Number(req.body.requisicao.valorproposta),
                idusercreateAt: Number(req.user.idusuario),
                consulta: (pesquisaCusto.imovel.nome + " " + pesquisaCusto.nome + " " +  req.body.requisicao.descricao + pesquisaUnidade.nome +   " " + req.body.requisicao.statusrequisicao + " " +  Number(req.body.requisicao.periodo) + + req.body.requisicao.tipopagamento + req.body.requisicao.numeroparcelas + req.body.requisicao.justificativa + req.body.requisicao.vigencia + req.body.requisicao.outros + req.body.requisicao.prazo),
                statusrequisicao: req.body.requisicao.statusrequisicao,
                aditivo: req.body.requisicao.aditivo,
                aprovado: req.body.requisicao.aprovado,
                periodo: Number(req.body.requisicao.periodo),
                status: "A",
                idcusto: Number(req.body.requisicao.idcusto),
                tipopagamento: req.body.requisicao.tipopagamento,
                numeroparcelas: Number(req.body.requisicao.numeroparcelas),
                renovauto: req.body.requisicao.renovauto,
                justificativa: req.body.requisicao.justificativa,
                vigencia: req.body.requisicao.vigencia,
                outros: req.body.requisicao.outros,
                prazo : req.body.requisicao.prazo,
            },
            include: {
                usuario: true, unidade: true, custo: true,
            },
        });
        const userWithoutPassword = exclude(createRequisicao, ['consulta']);
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Requisicao inserido com sucesso',
            createRequisicao: createRequisicao
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

exports.getRequisicaoDetail = async (req, res, next) => {
    //    console.log(req.params.idrequisicao)
    try {
        const requisicao = await prisma.requisicao.findFirst({
            where: {
                idrequisicao: Number(req.params.idrequisicao),
                status: 'A',
            },
            include: {
                usuario: true, unidade: true, custo: true,
            },
        })
        await prisma.$disconnect()
        if (requisicao.length == 0) {
            return res.status(404).send({
                ok: false,
                message: 'Requisicao não encontrado'
            })
        }

        const userWithoutPassword = exclude(requisicao, ['consulta']);
        const response = {
            ok: true,
            requisicao: requisicao
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

exports.updateRequisicao = async (req, res, next) => {

    //   console.log(req.body.requisicao.dtvigfinal);
    var dtvigfinal = moment(req.body.requisicao.dtvigfinal).format('DD/MM/YYYY');
    //    console.log(dtvigfinal); 
    var dtviginicio = moment(req.body.requisicao.dtviginicio).format('DD/MM/YYYY');
    ////    console.log(dtviginicio); 
    var dtrecdoc = moment(req.body.requisicao.dtrecdoc).format('DD/MM/YYYY');
    //    console.log(dtrecdoc); 
    var dtasscont = moment(req.body.requisicao.dtasscont).format('DD/MM/YYYY');
    //    console.log(dtasscont); 



    try {

        const valor = await prisma.requisicao.count({
            where: {
                idrequisicao: Number(req.params.idrequisicao),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Requisicao não cadastrado' })
        }
        /*        const pesquisaImovel = await prisma.imovel.findFirst({
                    where: {
                        idimovel: Number(req.body.requisicao.idimovel),
                        status: 'A',
                    },
                }) */
        const pesquisaCusto = await prisma.custo.findFirst({
            where: {
                idcusto: Number(req.body.requisicao.idcusto),
                status: 'A',
            },
            include: {
                imovel: true,
            },
        })
        const pesquisaUnidade = await prisma.unidade.findFirst({
            where: {
                idunidade: Number(req.body.requisicao.idunidade),
                status: 'A',
            },
        })
        /*       const pesquisaImovel = await prisma.imovel.findFirst({
                   where: {
                       idimovel: Number(req.body.requisicao.idimovel),
                       status: 'A',
                   },
               })
               console.log("pesquisaImovel" + JSON.stringify(pesquisaImovel)); */
        const updateRequisicao = await prisma.requisicao.update({
            where: {
                idrequisicao: Number(req.params.idrequisicao),
            },
            data: {
                //                idimovel: Number(req.body.requisicao.idimovel),
                descricao: req.body.requisicao.descricao,
                idunidade: Number(req.body.requisicao.idunidade),
                correcao: req.body.requisicao.correcao,
                valorproposta: Number(req.body.requisicao.valorproposta),
                iduserupdatedAt: Number(req.user.idusuario),
                consulta: (pesquisaCusto.imovel.nome + " " + pesquisaCusto.nome + " " +  req.body.requisicao.descricao + pesquisaUnidade.nome +   " " + req.body.requisicao.statusrequisicao + " " +  Number(req.body.requisicao.periodo) + + req.body.requisicao.tipopagamento + req.body.requisicao.numeroparcelas + req.body.requisicao.justificativa + req.body.requisicao.vigencia + req.body.requisicao.outros + req.body.requisicao.prazo),
                statusrequisicao: req.body.requisicao.statusrequisicao,
                aditivo: req.body.requisicao.aditivo,
                dtasscont: req.body.requisicao.dtasscont,
                periodo: Number(req.body.requisicao.periodo),
                idcusto: Number(req.body.requisicao.idcusto),
                tipopagamento: req.body.requisicao.tipopagamento,
                numeroparcelas: Number(req.body.requisicao.numeroparcelas),
                renovauto: req.body.requisicao.renovauto,
                justificativa: req.body.requisicao.justificativa,
                vigencia: req.body.requisicao.vigencia,
                outros: req.body.requisicao.outros,
                prazo : req.body.requisicao.prazo,

            }
        });

        const userWithoutPassword = exclude(updateRequisicao, ['consulta']);
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Requisicao atualizado com sucesso',
            updateRequisicao: updateRequisicao
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

exports.deleteRequisicao = async (req, res, next) => {
    try {
        const valor = await prisma.requisicao.count({
            where: {
                idrequisicao: Number(req.params.idrequisicao),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Requisicao não cadastrado' })
        }
        const deleteRequisicao = await prisma.requisicao.update({
            where: {
                idrequisicao: Number(req.params.idrequisicao),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Requisicao excluido com sucesso',
            deleteRequisicao: deleteRequisicao
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

exports.getRequisicaogeral = async (req, res, next) => {
    try {
        const requisicaos = await prisma.requisicao.findMany({
            where: {
                status: 'A'
            },
            include: {
                usuario: true, unidade: true,
                custo: {
                    include: { imovel: true }
                },
                Documento: {
                    select: {
                        iddocumento: true,
                    },
                },
            },

        })

        for (i = 0; i <= requisicaos.length - 1; i++) {

            const userWithoutPassword = exclude(requisicaos[i], ['consulta'])
            const userWithoutPassword1 = exclude(requisicaos[i], ['senha'])

        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: requisicaos.length,
            requisicaos: requisicaos
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

exports.getHoraGrafico = async (req, res, next) => {
    
    console.log(req.params.ano);

    try {

        const result = await prisma.$queryRaw
        `
        SELECT count(r.idunidade) as quantidade , sum(r.valorproposta) as valor, month(r.createdAt) as mes , r.idunidade,
 u.nome as unidade, r.statusrequisicao as status FROM escola.requisicao r 
inner join escola.unidade u on r.idunidade = u.idunidade 
where r.status ='A'  and Year(r.createdAt)=${req.params.ano}
group by r.idunidade, month(r.createdAt) , r.statusrequisicao
order by r.idunidade;
        `

        console.log(result);

        BigInt.prototype.toJSON = function() { return this.toString() }

        await prisma.$disconnect()
        const response = {
            ok: true,
           length: result.length,
            result: result
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
}

exports.getRequisicaoGrafico = async (req, res, next) => {
    
    console.log(req.params.ano);

    try {

        const result = await prisma.$queryRaw
        `
        SELECT month(r.createdAt) as mes, 
sum(r.valorproposta) as valor, r.statusrequisicao as status FROM escola.requisicao r 
inner join escola.unidade u on r.idunidade = u.idunidade 
where r.status ='A'  and Year(r.createdAt)=${req.params.ano}
group by r.idunidade, month(r.createdAt) , r.statusrequisicao
order by r.statusrequisicao , month(r.createdAt) ;
        `

        console.log(result);

        BigInt.prototype.toJSON = function() { return this.toString() }

        await prisma.$disconnect()
        const response = {
            ok: true,
           length: result.length,
            result: result
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
}