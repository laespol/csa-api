const { PrismaClient } = require('@prisma/client')
const csv = require('csvtojson')
const nodemailer = require('nodemailer'); // Importa o módulo principal
const moment = require('moment')
const csvFilePath = 'funcionario.csv'

const prisma = new PrismaClient()
async function main() {

    totalhoras = await prisma.hora.groupBy({
        by: ['idunidade'],
        where: {
            status: 'A',
            idtphora: 1,
            datainicio: 

        },

        _count: { idhora: true },
        _avg: { qthoras: true },
        _sum: {
            qthoras: true
        },
        orderBy: {
            idunidade: 'desc',
        }
    })



    console.log(totalhoras)

}
main().catch(console.error);