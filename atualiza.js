const { PrismaClient } = require('@prisma/client')
const moment = require('moment')
const FileSaver = require('file-saver')




const prisma = new PrismaClient()
const nodemailer = require('nodemailer'); // Importa o módulo principal


async function main() {
    status = 'A';
//    consulta = { contains: 'tot' };
       consulta = {  };
//    custo = { idimovel: Number("3") };
    custo = {  };
    statuscontrato = 'A';
    where = [];
    where = { status,  consulta, custo, statuscontrato };
    console.log(where)

    doc1 = await prisma.contrato.count({
        where
    })

    //   var file = new Blob([doc1.documentpdf], {type: 'application/pdf'});
    //   var fileURL = URL.createObjectURL(file);
    //  window.open(fileURL);

    console.log(doc1);


}
main().catch(console.error);

