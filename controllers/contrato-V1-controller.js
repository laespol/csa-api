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


exports.getContrato = async (req, res, next) => {

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


        totalRecords = await prisma.contrato.count({
            where
        })
        contratos = await prisma.contrato.findMany({
            skip: Number(req.params.skip),
            take: Number(req.params.take),
            where,
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
            orderBy
        })


        for (i = 0; i <= contratos.length - 1; i++) {
            const userWithoutConsulta = exclude(contratos[i], ['consulta']);
            const userWithoutPassword = exclude(contratos[i].usuario, ['senha']);
        }
        //        console.log("userWithoutPassword " + JSON.stringify(userWithoutPassword));
        await prisma.$disconnect()
        //       console.log(JSON.stringify(contratos));
        const response = {
            ok: true,
            totalRecords: totalRecords,
            length: contratos.length,
            contratos: contratos
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

exports.postContrato = async (req, res, next) => {
    // console.log(req.body.contrato);

    //   console.log(req.body.contrato.dtvigfinal);
    var dtvigfinal = moment(req.body.contrato.dtvigfinal).format('DD/MM/YYYY');
    //    console.log(dtvigfinal); 
    var dtviginicio = moment(req.body.contrato.dtviginicio).format('DD/MM/YYYY');
    ////    console.log(dtviginicio); 
    var dtrecdoc = moment(req.body.contrato.dtrecdoc).format('DD/MM/YYYY');
    //    console.log(dtrecdoc); 
    var dtasscont = moment(req.body.contrato.dtasscont).format('DD/MM/YYYY');
    //    console.log(dtasscont); 
    try {

        /*     const pesquisaImovel = await prisma.imovel.findFirst({
                 where: {
                     idimovel: Number(req.body.contrato.idimovel),
                     status: 'A',
                 },
             }) */
        const pesquisaCusto = await prisma.custo.findFirst({
            where: {
                idcusto: Number(req.body.contrato.idcusto),
                status: 'A',
            },
            include: {
                imovel: true,
            },
        })
        const pesquisaUnidade = await prisma.unidade.findFirst({
            where: {
                idunidade: Number(req.body.contrato.idunidade),
                status: 'A',
            },
        })
        //        console.log("pesquisaImovel" + JSON.stringify(pesquisaImovel));
        const createContrato = await prisma.contrato.create({
            data: {
                //            idimovel: Number(req.body.contrato.idimovel),
                razaosocial: req.body.contrato.razaosocial,
                cnpj: req.body.contrato.cnpj,
                descricao: req.body.contrato.descricao,
                dtviginicio: req.body.contrato.dtviginicio,
                dtvigfinal: req.body.contrato.dtvigfinal,
                idunidade: Number(req.body.contrato.idunidade),
                correcao: req.body.contrato.correcao,
                valorproposta: Number(req.body.contrato.valorproposta),
                localizacao: req.body.contrato.localizacao,
                idusercreateAt: Number(req.user.idusuario),
                consulta: (pesquisaCusto.imovel.nome + " " + pesquisaCusto.nome + " " + req.body.contrato.razaosocial + req.body.contrato.cnpj + req.body.contrato.descricao + pesquisaUnidade.nome + dtviginicio + dtvigfinal + req.body.contrato.localizacao + " " + req.body.contrato.statuscontrato + " " + dtasscont + dtrecdoc + req.body.contrato.periodo + req.body.contrato.tipopagamento + req.body.contrato.numeroparcelas),
                statuscontrato: req.body.contrato.statuscontrato,
                aditivo: req.body.contrato.aditivo,
                dtasscont: req.body.contrato.dtasscont,
                dtrecdoc: req.body.contrato.dtrecdoc,
                aprovado: req.body.contrato.aprovado,
                periodo: req.body.contrato.periodo,
                status: "A",
                idcusto: Number(req.body.contrato.idcusto),
                tipopagamento: req.body.contrato.tipopagamento,
                numeroparcelas: Number(req.body.contrato.numeroparcelas),
                renovauto: req.body.contrato.renovauto
            },
            include: {
                usuario: true, unidade: true, custo: true,
            },
        });

        const userWithoutConsulta = exclude(createContrato, ['consulta']);
        const userWithoutPassword = exclude(createContrato.usuario, ['senha']);

        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Contrato inserido com sucesso',
            createContrato: createContrato
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

exports.getContratoDetail = async (req, res, next) => {
    //    console.log(req.params.idcontrato)
    try {
        const contrato = await prisma.contrato.findFirst({
            where: {
                idcontrato: Number(req.params.idcontrato),
                status: 'A',
            },
            include: {
                usuario: true, unidade: true, custo: true,
            },
        })
        await prisma.$disconnect()
        if (contrato.length == 0) {
            return res.status(404).send({
                ok: false,
                message: 'Contrato não encontrado'
            })
        }


        const userWithoutConsulta = exclude(contrato, ['consulta']);
        const userWithoutPassword = exclude(contrato.usuario, ['senha']);

        const response = {
            ok: true,
            contrato: contrato
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

exports.updateContrato = async (req, res, next) => {

 //   console.log(req.body);

    //   console.log(req.body.contrato.dtvigfinal);
    var dtvigfinal = moment(req.body.contrato.dtvigfinal).format('DD/MM/YYYY');
    //    console.log(dtvigfinal); 
    var dtviginicio = moment(req.body.contrato.dtviginicio).format('DD/MM/YYYY');
    ////    console.log(dtviginicio); 
    var dtrecdoc = moment(req.body.contrato.dtrecdoc).format('DD/MM/YYYY');
    //    console.log(dtrecdoc); 
    var dtasscont = moment(req.body.contrato.dtasscont).format('DD/MM/YYYY');
    //    console.log(dtasscont); 



    try {

        const valor = await prisma.contrato.count({
            where: {
                idcontrato: Number(req.params.idcontrato),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Contrato não cadastrado' })
        }
        /*        const pesquisaImovel = await prisma.imovel.findFirst({
                    where: {
                        idimovel: Number(req.body.contrato.idimovel),
                        status: 'A',
                    },
                }) */
        const pesquisaCusto = await prisma.custo.findFirst({
            where: {
                idcusto: Number(req.body.contrato.idcusto),
                status: 'A',
            },
            include: {
                imovel: true,
            },
        })
        const pesquisaUnidade = await prisma.unidade.findFirst({
            where: {
                idunidade: Number(req.body.contrato.idunidade),
                status: 'A',
            },
        })
        /*       const pesquisaImovel = await prisma.imovel.findFirst({
                   where: {
                       idimovel: Number(req.body.contrato.idimovel),
                       status: 'A',
                   },
               })
               console.log("pesquisaImovel" + JSON.stringify(pesquisaImovel)); */
        const updateContrato = await prisma.contrato.update({
            where: {
                idcontrato: Number(req.params.idcontrato),
            },
            data: {
                //                idimovel: Number(req.body.contrato.idimovel),
                razaosocial: req.body.contrato.razaosocial,
                cnpj: req.body.contrato.cnpj,
                descricao: req.body.contrato.descricao,
                dtviginicio: req.body.contrato.dtviginicio,
                dtvigfinal: req.body.contrato.dtvigfinal,
                idunidade: Number(req.body.contrato.idunidade),
                correcao: req.body.contrato.correcao,
                valorproposta: Number(req.body.contrato.valorproposta),
                localizacao: req.body.contrato.localizacao,
                iduserupdatedAt: Number(req.user.idusuario),
                consulta: (pesquisaCusto.imovel.nome + " " + pesquisaCusto.nome + " " + req.body.contrato.razaosocial + req.body.contrato.cnpj + req.body.contrato.descricao + pesquisaUnidade.nome + dtviginicio + dtvigfinal + req.body.contrato.localizacao + " " + req.body.contrato.statuscontrato + " " + dtasscont + dtrecdoc + req.body.contrato.periodo + req.body.contrato.tipopagamento + req.body.contrato.numeroparcelas),
                statuscontrato: req.body.contrato.statuscontrato,
                aditivo: req.body.contrato.aditivo,
                dtasscont: req.body.contrato.dtasscont,
                dtrecdoc: req.body.contrato.dtrecdoc,
                aprovado: req.body.contrato.aprovado,
                periodo: req.body.contrato.periodo,
                idcusto: Number(req.body.contrato.idcusto),
                tipopagamento: req.body.contrato.tipopagamento,
                numeroparcelas: Number(req.body.contrato.numeroparcelas),
                renovauto: req.body.contrato.renovauto

            }
        });


        const userWithoutConsulta = exclude(updateContrato, ['consulta']);
 //const userWithoutPassword = exclude(updateContrato.usuario, ['senha']);

        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Contrato atualizado com sucesso',
            updateContrato: updateContrato
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

exports.deleteContrato = async (req, res, next) => {
    try {
        const valor = await prisma.contrato.count({
            where: {
                idcontrato: Number(req.params.idcontrato),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Contrato não cadastrado' })
        }
        const deleteContrato = await prisma.contrato.update({
            where: {
                idcontrato: Number(req.params.idcontrato),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            }
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Contrato excluido com sucesso',
            deleteContrato: deleteContrato
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

exports.getContratogeral = async (req, res, next) => {
    try {
        const contratos = await prisma.contrato.findMany({
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

        for (i = 0; i <= contratos.length - 1; i++) {
            const userWithoutPassword = exclude(contratos[i], ['consulta'])
            const userWithoutPassword1 = exclude(contratos[i].usuario, ['senha'])
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: contratos.length,
            contratos: contratos
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



exports.postContratoPesquisageral = async (req, res, next) => {

    where = []

//    console.log(JSON.stringify(req.body));
 //   console.log(JSON.stringify(req.body.event.first));
 //   console.log(JSON.stringify(req.body.event.rows));
 //   console.log(JSON.stringify(req.body.event.sortField));
 //   console.log(JSON.stringify(req.body.event.sortOrder));
 //   console.log(JSON.stringify(req.body.event.filters.imovel));
 //   console.log(JSON.stringify(req.body.event.filters.status));
 //   console.log(JSON.stringify(req.body.event.globalFilter));

    try {

        if (req.body.event.sortOrder == 1) {
            sortOrder = "desc";
        } else {
            sortOrder = "asc";
        }

        // Classificação dos dados 
        if (req.body.event.sortField == undefined) {
            orderBy = { 'razaosocial': sortOrder }
        } else {
            if (req.body.event.sortField == 'custo') {

                orderBy = { custo: { nome: sortOrder } }
            } else {
                if (req.body.event.sortField == 'imovel') {
                    orderBy = { [{ custo: { imove: { nome } } }]: sortOrder };
                } else {
                    if (req.body.event.sortField == 'unidade') {
                        orderBy = { unidade: { nome: sortOrder } }
                    } else {
                        if (req.body.event.sortField == 'usuario') {
                            orderBy = { usuario: { nome: sortOrder } }
                        } else {
                            orderBy = { [req.body.event.sortField]: sortOrder }
                        }
                    }
                }
            }
        }

        //        console.log('orderby = ' + JSON.stringify(orderBy));

        //Quando pesquisa por pesquisa global
        status = 'A';
        consulta = {};
        custo = {};
        statuscontrato = {};
        OR = null;
        idunidade = {};

        if (req.body.event.globalFilter != null && req.body.event.globalFilter != undefined) {
            consulta = { contains: req.body.event.globalFilter };
            //        where = where +  {consulta: { contains: req.body.event.globalFilter}};
        }

        for (let filters in req.body.event.filters) {
            //            console.log('filters = ' + filters);
            //            console.log('Condição = ' + JSON.stringify(req.body.event.filters[filters]));

            for (let value in req.body.event.filters[filters]) {
                if (value != 'value') {


                    if (req.body.event.filters[filters][value].value != null) {
                        //                        console.log('Value = ' + JSON.stringify(req.body.event.filters[filters][value].value));
                        //                       console.log('Value = ' + JSON.stringify(req.body.event.filters[filters][value].matchMode));
                        //                   console.log('Value = ' + JSON.stringify(req.body.event.filters[filters][value].operator));
                        if (filters == 'imovel') {
                            //                       console.log('Value = ' + JSON.stringify(req.body.event.filters[filters][value].value.idimovel));
                            custo = { idimovel: Number(req.body.event.filters[filters][value].value.idimovel) };
                        }
                        if (filters == 'status') {
                            //                       console.log('Value = ' + JSON.stringify(req.body.event.filters[filters][value].value.idstatus));
                            statuscontrato = req.body.event.filters[filters][value].value.idstatus;
                        }
                        if (filters == 'global') {
                            //                       console.log('Value = ' + JSON.stringify(req.body.event.filters[filters][value].value.idstatus));
                            //                        statuscontrato = req.body.event.filters[filters][value].value.idstatus;
                        }
                    }
                }
            }
        }

        usuario = await prisma.usuario.findUnique({
            where: {
                idusuario: Number(req.user.idusuario),
            }
        })
        await prisma.$disconnect();

        if (usuario.vtodoscontratos) {
            OR = null;
        } else {
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
            } else {
                idunidade = usuario.idunidade;
            }
        }
 //       console.log(OR)
        if (OR == null) {
            where = { status, consulta, custo, statuscontrato,  idunidade  };          
        } else {
            where = { status, consulta, custo, statuscontrato,  idunidade , OR };
        }
        

        console.log(where)
        totalRecords = await prisma.contrato.count({
            where
        })
        contratos = await prisma.contrato.findMany({
            skip: Number(req.body.event.first),
            take: Number(req.body.event.rows),
            where,
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
            orderBy
        })

        await prisma.$disconnect()
        for (i = 0; i <= contratos.length - 1; i++) {
            const userWithoutConsulta = exclude(contratos[i], ['consulta']);
            const userWithoutPassword = exclude(contratos[i].usuario, ['senha']);
        }
        console.log('Total = ' + totalRecords);
        const response = {
            ok: true,
            totalRecords: totalRecords,
            length: contratos.length,
            contratos: contratos
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
