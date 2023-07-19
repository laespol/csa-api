const { PrismaClient } = require('@prisma/client')
const nodemailer = require('nodemailer'); // Importa o módulo principal
const moment = require('moment')

const prisma = new PrismaClient()
async function main() {
    console.log("entrei")

    const contratos = await prisma.contrato.findMany({
        where: {
            status: 'A'
        },
    });

    //   console.log("Contratos = " + contratos)
    await prisma.$disconnect();
    //   console.log(contratos.length);
    for (i = 0; i <= contratos.length; i++) {
        console.log(JSON.stringify(contratos[i]));
        console.log(moment(contratos[i].dtvigfinal));
        var dtvigfinal = moment(contratos[i].dtvigfinal).format('DD/MM/YYYY');
        console.log(dtvigfinal);
        var dtviginicio = moment(contratos[i].dtviginicio).format('DD/MM/YYYY');
        console.log(dtviginicio);
        var dtrecdoc = moment(contratos[i].dtrecdoc).format('DD/MM/YYYY');
        console.log(dtrecdoc);
        var dtasscont = moment(contratos[i].dtasscont).format('DD/MM/YYYY');
        console.log(dtasscont);

        const pesquisaCusto = await prisma.custo.findMany({
            where: {
                idcusto: Number(contratos[i].idcusto),
                status: 'A',
            },
            include: {
                imovel: true,
            },
        })
        console.log("pesquisaCusto = " + JSON.stringify(pesquisaCusto[0].nome));
        const pesquisaUnidade = await prisma.unidade.findMany({
            where: {
                idunidade: Number(contratos[i].idunidade),
                status: 'A',
            },
        })

        console.log("dados = " + pesquisaCusto[0].imovel.nome + " " + pesquisaCusto[0].nome);

        contrato = await prisma.contrato.update({
            where: {
                idcontrato: contratos[i].idcontrato
            },
            data: {
                consulta: (pesquisaCusto[0].imovel.nome + " " + pesquisaCusto[0].nome + " " + contratos[i].razaosocial + contratos[i].cnpj + contratos[i].descricao + pesquisaUnidade[0].nome + dtviginicio + dtvigfinal + contratos[i].localizacao + " " + contratos[i].statuscontrato + " " + dtasscont + dtrecdoc + Number(contratos[i].periodo) + contratos[i].tipopagamento + contratos[i].numeroparcelas),
            }
        })
        await prisma.$disconnect();

    }

}
main().catch(console.error);