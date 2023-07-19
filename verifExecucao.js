const { PrismaClient } = require('@prisma/client')


//const prisma = new PrismaClient()

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

async function main() {

    var OR = await prisma.unidadegestor.findMany({
        where: {
            status: 'A',
            idusuario: 4
        },
        select: {
            idunidade: true
        }
    })
    console.log(OR);
    //   lunidade = [1, 2];


    horas = await prisma.hora.findMany({
        where: {
            status: 'A', 
            usuario: {
                OR 
            }
        },
        select: {
            idhora: true,
            usuario: {
                select: {
                    idusuario: true,
                    idunidade: true,
                }
            }
        }
    });
    console.log(horas);


}
main().catch(console.error);