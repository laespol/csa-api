const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const moment = require('moment')

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

// Exclude keys from user
function exclude(user, keys) {
    for (let key of keys) {
        delete user[key]
    }
    return user
}

exports.getHora = async (req, res, next) => {

    let totalRecords = 0;

    var sortOrder = '';

    let horas = '';

    let OR = '';

    if (req.params.sortOrder == 1) {
        sortOrder = "desc";
    } else {
        sortOrder = "asc";
    }

    var sortBy = req.params.sortField;

    try {

        if (req.params.sortField == 'usuario') {
            orderBy = { usuario: { nome: sortOrder } }
        } else {
            orderBy = { [req.params.sortField]: sortOrder }
        }

        usuario = await prisma.usuario.findUnique({
            where: {
                idusuario: Number(req.user.idusuario),
            }
        })
        await prisma.$disconnect()

        if (usuario.vtodoshoraextra) {
            if (req.params.globalFilter != 'undefined') {
                where = { status: 'A', consulta: { contains: req.params.globalFilter } };
            } else {
                where = { status: 'A' }
            };
        } else {
            //           if (usuario.idnivel == 3) {
            OR = await prisma.unidadegestor.findMany({
                where: {
                    status: 'A',
                    idusuario: Number(req.user.idusuario)
                },
                select: {
                    idunidade: true
                }
            })

            //               OR = [{ usuario: { idunidade: 1 }, usuario : { idunidade: 4 } }]

            //                        console.log("OR = " + JSON.stringify(OR));
            if (req.params.globalFilter != 'undefined') {
                where = { status: 'A', OR, consulta: { contains: req.params.globalFilter } };
            } else {
                where = { status: 'A', OR };
            }
            //           } else {
            /*            if (req.params.globalFilter != 'undefined') {
                            where = { status: 'A', idunidade: unidade.idunidade, consulta: { contains: req.params.globalFilter } };
                        } else {
                            where = { status: 'A', idunidade: usuario.idunidade };
                        } */
        }
        //        }
        totalRecords = await prisma.hora.count({
            where
        })
        horas = await prisma.hora.findMany({
            skip: Number(req.params.skip),
            take: Number(req.params.take),
            where,
            include: {
                unidade: true,
                tphora: true,
                usuario: {
                    include: { nivel: true }
                }
            },
            orderBy
        })

        for (i = 0; i <= horas.length - 1; i++) {
            const userWithoutconsulta = exclude(horas[i], ['consulta']);
            const userWithoutPassword = exclude(horas[i].usuario, ['senha']);
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            totalRecords: totalRecords,
            length: horas.length,
            horas: horas
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

exports.postHora = async (req, res, next) => {

    try {
        var datainicio = new Date(req.body.hora.datainicio);
        datainicio.setHours(datainicio.getHours() + 3);
        var datafinal = new Date(req.body.hora.datafinal);
        datafinal.setHours(datafinal.getHours() + 3);
        if (req.body.hora.dtcompini != null) {
            //    console.log(req.body.hora.dtcompini);
            var dtcompini = new Date(req.body.hora.dtcompini);
            dtcompini.setHours(dtcompini.getHours() + 3);
            //    console.log(req.body.hora.dtcompini);
        } else {
            console.log(req.body.hora.dtcompfim);
            var dtcompini = null;
        }
        if (req.body.hora.dtcompfim != null) {
            console.log(req.body.hora.dtcompfim);
            var dtcompfim = new Date(req.body.hora.dtcompfim);
            dtcompfim.setHours(dtcompfim.getHours() + 3);
        } else {
            console.log(req.body.hora.dtcompfim);
            var dtcompfim = null;
        }
        const pesquisaUsuario = await prisma.usuario.findFirst({
            where: {
                idusuario: Number(req.user.idusuario),
                status: 'A',
            },
        })
        const pesquisaUnidade = await prisma.unidade.findFirst({
            where: {
                idunidade: Number(pesquisaUsuario.idunidade),
                status: 'A',
            },
        })
        const createHora = await prisma.hora.create({
            data: {
                funcionario: req.body.hora.funcionario,
                chapa: req.body.hora.chapa,
                datainicio: datainicio,
                datafinal: datafinal,
                motivo: req.body.hora.motivo,
                idusercreateAt: Number(req.user.idusuario),
                qthoras: Number(req.body.hora.qthoras),
                status: "A",
                consulta: (pesquisaUsuario.nome + ' ' + pesquisaUnidade.nome + ' ' + req.body.hora.funcionario + datafinal + datainicio + req.body.hora.chapa + req.body.hora.motivo + Number(req.body.hora.qthoras) + req.body.hora.centrocusto + req.body.hora.departamento + dtcompini + dtcompfim + Number(req.body.hora.qthoras)),
                centrocusto: req.body.hora.centrocusto,
                idunidade: Number(req.body.hora.idunidade),
                departamento: req.body.hora.departamento,
                dtcompini: dtcompini,
                dtcompfim: dtcompfim,
                hrcomp: req.body.hora.hrcomp,
                idtphora: Number(req.body.hora.idtphora),


            },
            include: {
                unidade: true,
                tphora: true,
                usuario: {
                    include: { nivel: true }
                }
            },
        });
        await prisma.$disconnect()
        for (i = 0; i <= createHora.length - 1; i++) {
            const userWithoutconsulta = exclude(createHora[i], ['consulta']);
            const userWithoutPassword = exclude(createHora[i].usuario, ['senha']);
        }
        const response = {
            ok: true,
            message: 'Hora inserido com sucesso',
            createHora: createHora
        }
        return res.status(201).send(response);
    } catch (error) {
        //        console.log(error);
        await prisma.$disconnect()
        console.log(error);
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

exports.updateHora = async (req, res, next) => {

    try {

        const valor = await prisma.hora.count({
            where: {
                idhora: Number(req.body.hora.idhora),
                status: 'A'
            }
        })

        var datainicio = new Date(req.body.hora.datainicio);
        //        console.log(datainicio.getHours()); // 9.
        datainicio.setHours(datainicio.getHours() + 3);
        //        console.log(datainicio.getHours()); // 12.

        var datafinal = new Date(req.body.hora.datafinal);
        //        console.log(datafinal.getHours()); // 9.
        datafinal.setHours(datafinal.getHours() + 3);

        var dtcompfim = new Date(req.body.hora.dtcompfim);
        dtcompfim.setHours(dtcompfim.getHours() + 3);

        var dtcompini = new Date(req.body.hora.dtcompini);
        dtcompini.setHours(dtcompini.getHours() + 3);


        //       var datainicio = moment(req.body.hora.datainicio).format('DD/MM/YYYY');
        //        var datafinal = moment(req.body.hora.datafinal).format('DD/MM/YYYY');
        const pesquisaUsuario = await prisma.usuario.findFirst({
            where: {
                idusuario: Number(req.user.idusuario),
                status: 'A',
            },
        })

        const pesquisaUnidade = await prisma.unidade.findFirst({
            where: {
                idunidade: Number(pesquisaUsuario.idunidade),
                status: 'A',
            },
        })


        const updateHora = await prisma.hora.update({
            where: {
                idhora: Number(req.body.hora.idhora)
            },
            data: {
                funcionario: req.body.hora.funcionario,
                chapa: req.body.hora.chapa,
                datainicio: datainicio,
                datafinal: datafinal,
                motivo: req.body.hora.motivo,
                qthoras: Number(req.body.hora.qthoras),
                nome: req.body.hora.nome,
                status: "A",
                consulta: (pesquisaUsuario.nome + ' ' + pesquisaUnidade.nome + ' ' + req.body.hora.funcionario + datafinal + datainicio + req.body.hora.chapa + req.body.hora.motivo + Number(req.body.hora.qthoras) + req.body.hora.centrocusto + req.body.hora.departamento + dtcompini + dtcompfim + Number(req.body.hora.qthoras)),
                iduserupdatedAt: Number(req.user.idusuario),
                centrocusto: req.body.hora.centrocusto,
                idunidade: Number(req.body.hora.idunidade),
                departamento: req.body.hora.departamento,
                dtcompini: dtcompini,
                hrcomp: req.body.hora.hrcomp,
                idtphora: Number(req.body.hora.idtphora),
            },
            include: {
                usuario: {
                    include: { nivel: true, unidade: true }
                }
            },
        });
        await prisma.$disconnect()
        for (i = 0; i <= updateHora.length - 1; i++) {
            const userWithoutconsulta = exclude(updateHora[i], ['consulta']);
            const userWithoutPassword = exclude(updateHora[i].usuario, ['senha']);
        }
        const response = {
            ok: true,
            message: 'Hora atualizado com sucesso',
            updateHora: updateHora
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

exports.deleteHora = async (req, res, next) => {

    try {

        const valor = await prisma.hora.count({
            where: {
                idhora: Number(req.params.idhora),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Hora não cadastrado' })
        }


        const deleteHora = await prisma.hora.update({
            where: {
                idhora: Number(req.params.idhora),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Hora removido com sucesso',
            deleteHora: deleteHora
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

exports.getHoraGrafico1 = async (req, res, next) => {

    console.log(req.params);

    try {
        datainicio1 = new Date(`01/01/${req.params.ano}`);
        datafinal1 = new Date(`12/31/${req.params.ano}`);

        console.log ( datainicio1 + ' ' + datafinal1);
        const groupHoras = await prisma.hora.groupBy({
            by: ['idunidade', Year(datainicio)],
            _count: {
                idhora: true,
            },
            _sum: {
                qthoras: true,
            },
            where: {
                status: 'A',
                idtphora: 1,

            },
            orderBy: {
                idunidade: 'asc',
            }
        })

        await prisma.$disconnect()
        const response = {
            ok: true,
            length: groupHoras.length,
            groupHoras: groupHoras
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
        SELECT count(h.qthoras) as nrhora , sum(h.qthoras) as qthoras,month(h.datainicio) as mes , u.nome as unidade , h.idunidade FROM escola.hora h 
        inner join escola.unidade u on h.idunidade = u.idunidade
        where  h.status ='A' and h.idtphora = 1 and Year(h.datainicio)=${req.params.ano}
        group by h.idunidade, month(h.datainicio) order by h.idunidade; 
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

