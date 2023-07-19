const { PrismaClient } = require('@prisma/client')
const nodemailer = require('nodemailer'); // Importa o módulo principal

const prisma = new PrismaClient()
async function main() {

    let testAccount = await nodemailer.createTestAccount();
    let sendmail;
    let info;

/*    let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                    user: 'suporte.ti@zanthus.com.br',
                    pass: 'awstx#'
                },
                
            });  */


            let transporter = nodemailer.createTransport({
                service: "Outlook365",
                host: 'smtp.office365.com',
                port: 587,
                tls: {
                    ciphers:'SSLv3'
                },
                auth: {
                    user: 'luis.espoladore@santoamerico.org.br',
                    pass: 'Livia02#'
                }
            });


    sendmail = await prisma.sendmail.findMany({
        where: {
            status: 'A'
        }, select: {
            idsendmail: true,
            destinatario: true,
            html: true,
            subject: true,
            status: true,
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    await prisma.$disconnect()
    //    console.log(sendmail.length);
    //   console.log(JSON.stringify(sendmail));

    for (let i = 0; i <= sendmail.length - 1; i++) {
        console.log(i + " " + JSON.stringify(sendmail[i]));

        info = await transporter.sendMail({
            from: 'luis.espoladore@santoamerico.org.br',
            to: sendmail[i].destinatario,
            subject: sendmail[i].subject,
            html: sendmail[i].html
        });

        //        console.log("Message sent: %s", info.messageId);

        //        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        console.log("sendmail[i].idsendmail ================> " + sendmail[i].idsendmail);
        deleteSendmail = await prisma.sendmail.update({
            where: {
                idsendmail: sendmail[i].idsendmail,
            },
            data: {
                iduserupdatedAt: 99999,
                status: "E"
            },
        });
    }
}
main().catch(console.error);