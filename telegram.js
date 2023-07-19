const TelegramBot = require(`node-telegram-bot-api`)
const { PrismaClient } = require('@prisma/client')
require('dotenv/config');

const prisma = new PrismaClient()

//const TOKEN = `1985048926:AAFiKlYMwUBADQ3sPQa6uLTYHLz_Olx8SWs`

const TOKEN = process.env.TOKEN;

let chatId;
let messageId;
let text;


const bot = new TelegramBot(TOKEN, { polling: true })

bot.on('message', (msg) => {
    let resposta = '';
    console.log(msg);

    chatId = msg.chat.id.toString();
    messageId = msg.message_id;
    text   = msg.text;
    (async () => {
        console.log('before start');
        usuario = await myfunction(chatId);
        if (usuario != null) {
            console.log(usuario.nome);
            console.log('after start');
            resposta = "Seja bem vindo " + usuario.nome;
            console.log(resposta);
            bot.sendMessage(chatId, resposta);
        } else {
            acesso = await usuarioNovo(chatId,messageId,'','');
            console.log("volto da usuario novo " + JSON.stringify(acesso));
            if (acesso.email == null) {
                resposta = "OI, voce e novo por aqui informe seu usuario";
                bot.sendMessage(chatId, resposta);
                user   = msg.text;
                acesso = await usuarioNovo(chatId,messageId,user,'');
            } 
            if (acesso.senha == "") {
                resposta = "informe sua senha";
                bot.sendMessage(chatId, resposta);
                passwd   = msg.text;
                acesso = await usuarioNovo(chatId,messageId,user,passwd);
            }
            
        }

    })();

});

async function myfunction(chatId) {

    usuario = await prisma.usuario.findFirst({
        where: {
            chatid: chatId,
            status: 'A'
        }, select: {
            idusuario: true,
            nome: true,
            email: true,
            status: true,
        }
    })
    //   console.log(usuario.nome);
    console.log('Inside of myfunction');
    return usuario;
}

async function usuarioNovo(chatId, user, passwd) {

    console.log(user);
    console.log(passwd);
    console.log(chatId);

    acesso = await prisma.telegram.findFirst({
        where: {
            messageid: messageId,
            chatid: chatId
        }, select: {
            chatid: true,
            email: true,
            senha: true,
            quantidade: true,
            messageid: true,
            idtelegram: true
        }
    })
    console.log("Antes do if " + JSON.stringify(acesso));
    if (acesso == null ) {
        acesso = await prisma.telegram.create({
            data: {
                chatid: chatId,
                messageid: messageId,
            }
        })
    } else {
        acesso = await prisma.telegram.update({
            where: {
               idtelegram: acesso.idtelegram
            },
            data: {
                chatid: chatId,
                messageid: messageId,
                email: user,
                senha: passwd,
                quantidade: 1
            }
        })
    }
    //   console.log(usuario.nome);
    console.log("Antes de sair " + JSON.stringify(acesso));
    return acesso;
}



