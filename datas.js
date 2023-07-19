const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

async function main() {

    const countUsers = await prisma.itcompra.count({})
    console.log(JSON.stringify(countUsers));

    const minMaxAge = await prisma.itcompra.aggregate({
        where: {
            status: 'A',
            statuscompra: 'Y'
        },
        _count: {
            _all: true,
        },
        _max: {
            valorcotacao: true,
        },
        _min: {
            valorcotacao: true,
        },
    })

    console.log(JSON.stringify(minMaxAge));

    const setValue = await prisma.itcompra.aggregate({
        _sum: {
            valorcotacao: true,
        },
    })
    console.log(JSON.stringify(setValue));


    const groupUsers = await prisma.itcompra.groupBy({
        by: ['idsolicitante'],
        _count: {
            _all: true,
            iditcompra: true,
        },
        _sum: {
            valorcotacao: true,
            valorentrega: true
        },
        where: {
            status: 'A',
            statuscompra: 'Y'
        },
        orderBy: {
            idsolicitante: 'desc',
        }
    })

    console.log(JSON.stringify(groupUsers));

    let data_ini = new Date();
    let data_fim = new Date();

    data_ini.setDate(data_ini.getDate() - 90);

    

    const result = await prisma.$queryRaw
    `
    SELECT  d.nome , sum(i.valorentrega), month(i.dtentrega) , year(i.dtentrega), sum(i.valorentrega - i.valorcotacao) as diferenca, count(i.iditcompra) FROM zanthus.itcompra i
    inner join zanthus.compra c on c.idcompra = i.idcompra
    inner join zanthus.departamento  d on c.iddepartamento = d.iddepartamento
    where i.status='A' and i.statuscompra='Y'
    group by d.iddepartamento ,year(i.dtentrega), month(i.dtentrega)
 `

    console.log(JSON.stringify(result));

    prisma.$disconnect();

}


main().catch(console.error);