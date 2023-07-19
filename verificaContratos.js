const { PrismaClient } = require('@prisma/client')
const moment = require("moment");


const prisma = new PrismaClient()

/* const prisma = new PrismaClient({
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

async function main() {

    var html = '';

    html = "";

    lista = [];

    await verificaContratosVencendo();

    /*
    this.html = this.html + `<p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>Departmento de Contratos</p>`
    var data = new Date();
    data = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    const createSendmail = await prisma.sendmail.create({
        data: {
            //         destinatario: "luis.espoladore@zanthus.com.br;compras@zanthus.com.br",
            destinatario: "luis.espoladore@santoamerico.org.br",
            html: Buffer.from(this.html),
            subject: "Pendencia de Contratos - " + data,
            idsolicitante: 2,
            idusuarioaprovacao: 2,
            idusuariocotacao: 2,
            idusuarioaprovacaodir: 2,
            idusuariocompra: 2,
            idusuarioentrega: 2,
            idcompra: 1,
            idusercreateAt: 2,
        },
    });
    */
    await prisma.$disconnect()


}


main().catch(console.error);


async function verificaContratosVencendo() {

    dataAtual = new Date();

    renovacao = 'Sim';

    html = '';

    email = '';

    unidade = '';

    tabela = '';
    try {

        const contratos = await prisma.contrato.findMany({
            where: {
                status: 'A',
                statuscontrato: 'A'
            },
            include: {
                usuario: true, unidade: true,
                custo: {
                    include: { imovel: true }
                },
            },
            orderBy: { idunidade: 'asc' }
        })

        await prisma.$disconnect()

        console.log(" Contratos = " + contratos.length);

        for (let i = 0; i <= contratos.length - 1; i++) {
            if (contratos[i].dtvigfinal != null) {
                if (new Date(contratos[i].dtvigfinal) < dataAtual) {

                    const gestores = await prisma.unidadegestor.findMany({
                        where: {
                            status : 'A',
                            idunidade: Number(contratos[i].unidade.idunidade)
                        },
                        include: {
                            usuario: true, unidade: true
                            
                        }
                    });
                    await prisma.$disconnect();
                    /*
                    console.log("contratos[i].idcontrato = " + contratos[i].idcontrato);
                    console.log("descrição = " + contratos[i].descricao);
                    console.log("contratos[i].unidade.idunidade = " + contratos[i].unidade.idunidade);
                    console.log("contratos[i].unidade.nome = " + contratos[i].unidade.nome);
                    console.log("contratos[i].cnpj = " + contratos[i].cnpj);
                    console.log("contratos[i].valor = " + contratos[i].valorproposta);
                    console.log("forneceor  = " + contratos[i].idcontrato);
                    console.log('Datas = ' + new Date(contratos[i].dtviginicio).toLocaleDateString() + ' - ' + new Date(contratos[i].dtvigfinal).toLocaleDateString() + ' - ' + new Date(dataAtual).toLocaleDateString());
                    console.log("gestor = " + gestores[0].usuario.nome);
                    console.log("email = " + gestores[0].usuario.email);
                    */

                    //    console.log(contratos[i].renovauto + '= ' + await testarenovação(contratos[i].renovauto));

                    //               var valor = contratos[i].valorproposta.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
                    var valor = formatMoney(contratos[i].valorproposta);

                    //               console.log(valor + ' ' + contratos[i].valorproposta);

                    lista.push({
                        idcontrato: contratos[i].idcontrato,
                        coligada: contratos[i].custo.imovel.nome,
                        area: contratos[i].custo.nome,
                        descricao: contratos[i].descricao,
                        idunidade: contratos[i].unidade.idunidade,
                        unidade: contratos[i].unidade.nome,
                        cnpj: contratos[i].cnpj,
                        valor: valor,
                        renovacao: await testarenovação(contratos[i].renovauto),
                        datainicio: moment(contratos[i].dtviginicio).format("DD/MM/YYYY"),
                        datafinal: moment(contratos[i].dtvigfinal).format("DD/MM/YYYY"),
                        razaosocial: contratos[i].razaosocial,
                        gestor: gestores[0].usuario.nome,
                        email: gestores[0].usuario.email + ';rosangela.evangelista@santoamerico.org.br'
                    });
                };
            };

        }

        idunidade = 0;
        console.log("lista = " + lista.length)
        for (let i = 0; i <= lista.length - 1; i++) {
            //       console.log(JSON.stringify(lista[i]));
            if (idunidade == 0) {
                idunidade = lista[i].idunidade;
                email = lista[i].email;
                unidade = lista[i].unidade;
                tabela = '';
                html = '';
                console.log("(idunidade == 0 ) " + idunidade);

            } else
                if (lista[i].idunidade != idunidade) {
                    console.log("(lista[i].idunidade != idunidade ) " + idunidade + ' ' + lista[i].idunidade);
                    destinatario = email;
                    //destinatario = 'luis.espoladore@santoamerico.org.br';
                    subject = 'Contratos vencidos no mes de :  ' + moment(dataAtual).format("MM/YYYY") + ' - ' + unidade;

                    html = `
                <p>&nbsp;</p>
                <p>ID : ${idunidade}</p>
                <p>Departamento : ${unidade}</p>
                <p>&nbsp;</p>
            <h2 style="color: #0000cd;">Relatorio de Contratos Vencidos </h2>

            <p>&nbsp;</p>
            <table style="border-collapse: collapse;" border="1">
            <tbody>
            <tr>
            <td style="text-align: center"><strong>Id Contrato</strong></td>
            <td style="text-align: center"><strong>Coligada</strong></td>
            <td style="text-align: center"><strong>Area</strong></td>
            <td style="text-align: center"><strong>cnpj</strong></td>
            <td style="text-align: center"><strong>Razão Social</strong></td>
            <td style="text-align: center"><strong>Valor</strong></td>
            <td style="text-align: center"><strong>Data Inicio</strong></td>
            <td style="text-align: center"><strong>Data Final</strong></td>
            <td style="text-align: center"><strong>Renovação Automatica</strong></td>
            </tr>
                          `;

                    html = html + tabela;

                    html = html + "</tbody></table><p>&nbsp;</p>";
                    console.log(html);

                    createSendmail = await prisma.sendmail.create({
                        data: {
                            destinatario: destinatario,
                            html: Buffer.from(html),
                            subject: subject,
                            idusercreateAt: Number(4)
                        },
                    });
                    await prisma.$disconnect()
                    idunidade = lista[i].idunidade;
                    email = lista[i].email;
                    unidade = lista[i].unidade;
                    tabela = '';

                }

            tabela = tabela + '<tr> ' +
                ' <td style="width:50px;  text-align: center"> ' + lista[i].idcontrato + ' </td> ' +
                ' <td style="width:150px;  text-align: center"> ' + lista[i].coligada + ' </td> ' +
                ' <td style="width:150px;  text-align: center"> ' + lista[i].area + ' </td> ' +
                ' <td style="width:150px;  text-align: center"> ' + lista[i].cnpj + ' </td> ' +
                ' <td style="width:150px; text-align: center"> ' + lista[i].razaosocial + ' </td> ' +
                ' <td style="width:100px;  text-align: center"> ' + lista[i].valor + ' </td> ' +
                ' <td style="width:150px; text-align: center"> ' + lista[i].datainicio + ' </td> ' +
                ' <td style="width:150px; text-align: center"> ' + lista[i].datafinal + ' </td> ' +
                ' <td style="width:150px; text-align: center"> ' + lista[i].renovacao + ' </td> ' +
                ' </tr> '
            //        console.log("html = " + html)
        }



        /*    this.html = this.html + `
                <h2 style="color: #0000cd;">Relatorio de Contratos com data de final de Vigencia </h2>
                <p>&nbsp;</p>
                <table style="border-collapse: collapse;" border="1">
                <tbody>
                <tr>
                <td style="text-align: center"><strong>Id Contrato</strong></td>
                <td style="text-align: center"><strong>Razão Social</strong></td>
                <td style="text-align: center"><strong>Departamento</strong></td>
                <td style="text-align: center"><strong>Unidade</strong></td>
                <td style="text-align: center"><strong>Data Inicio</strong></td>
                <td style="text-align: center"><strong>Data Final</strong></td>
                </tr>
                  `;
        
            console.log(this.html);
            for (let i = 0; i <= contratos.length - 1; i++) {
                if (contratos[i].dtviginicio != null) {
                    dtviginicio = contratos[i].dtviginicio.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                }
                if (contratos[i].dtvigfinal != null && contratos[i].dtvigfinal <= data) {
                    dtvigfinal = contratos[i].dtvigfinal.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
                } else {
                    return
                }
        
                this.html = this.html + "<tr> " +
                    ' <td style="width:50px; text-align: center">  ' + contratos[i].idcontratos + ' </td> ' +
                    ' <td style="width:150px; text-align: center"> ' + contratos[i].razaosocial + ' </td> ' +
                    ' <td style="width:150px; text-align: center"> ' + contratos[i].unidade.nome + ' </td> ' +
                    ' <td style="width:50px; text-align: center"> ' + contratos[i].imovel.nome + ' </td> ' +
                    ' <td style="width:150px; text-align: center"> ' + dtviginicio + ' </td> ' +
                    ' <td style="width:150px; text-align: center"> ' + dtvigfinal + ' </td> ' +
                    " </tr>"
        
            }
        
            this.html = this.html + "</tbody></table><p>&nbsp;</p>";
            */

    } catch (error) {
        console.log(error);
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }

}


function formatMoney(n, c, d, t) {
    c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
    return "R$ " + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

function testarenovação(renovauto) {
    if (renovauto) {
        return 'Não';
    } else {
        return 'Sim';
    }
}

