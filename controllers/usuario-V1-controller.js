const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// Exclude keys from user
function exclude(user, keys) {
    for (let key of keys) {
        delete user[key]
    }
    return user
}

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
  })
*/
exports.getUsuario = async (req, res, next) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            where: {
                status: 'A'
            },
            include: { nivel: true, unidade: true },
            orderBy: {
                nome: "desc"
            }

        })

        for (i = 0; i <= usuarios.length - 1; i++) {

            const userWithoutPassword = exclude(usuarios[i], ['senha'])

        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: usuarios.length,
            usuarios: usuarios
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

exports.postUsuario = async (req, res, next) => {
    //console.log(req.body.usuario);
    try {
        const valor = await prisma.usuario.count({
            where: {
                email: req.body.usuario.email,
                status: 'A'
            }
        })

        //       if (valor != 0) {
        //           return res.status(200).send({ ok: false, message: 'Usuario já cadastrado' })
        //       }

        const hash = await bcrypt.hashSync(req.body.usuario.senha, 10);
        const createUsuario = await prisma.usuario.create({
            data: {
                nome: req.body.usuario.nome,
                email: req.body.usuario.email,
                cpf: req.body.usuario.cpf,
                dtnascimento: req.body.usuario.dtnascimento,
                sexo: req.body.usuario.sexo,
                idusercreateAt: req.user.idusuario,
                idnivel: req.body.usuario.idnivel,
                idunidade: req.body.usuario.idunidade,
                senha: hash,
                trocasenha: req.body.usuario.trocasenha,
                iddepartamento: req.body.usuario.iddepartamento,
                ramaln: req.body.usuario.ramaln,
                celular: req.body.usuario.celular,
                idmenu: req.body.usuario.idmenu,
                chatid: req.body.usuario.chatid,
                ti: req.body.usuario.ti,
                contratost: req.body.usuario.contratost,
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Usuario inserido com sucesso',
            createUsuario: createUsuario
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

exports.getUsuarioDetail = async (req, res, next) => {
    try {
        //         console.log(Number(req.params.idusuario));
        const usuario = await prisma.usuario.findFirst({
            where: {
                idusuario: Number(req.params.idusuario),
                status: 'A'
            },
            include: { nivel: true, unidade: true },
            orderBy: {
                nome: "desc"
            }
        })

        const userWithoutPassword = exclude(usuario, ['senha'])
        //      console.log(userWithoutPassword);
        if (usuario.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Usuario não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            usuario: usuario,
            //            userWithoutPassword: userWithoutPassword
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

exports.updateUsuario = async (req, res, next) => {
    var updateUsuario;
    try {

        const valor = await prisma.usuario.count({
            where: {
                idusuario: Number(req.params.idusuario),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Usuario não cadastrado' })
        }
        if (req.body.usuario.trocasenha) {
            const hash = await bcrypt.hashSync(req.body.usuario.senha, 10);
            updateUsuario = await prisma.usuario.update({
                where: {
                    idusuario: Number(req.params.idusuario),
                },
                data: {
                    nome: req.body.usuario.nome,
                    email: req.body.usuario.email,
                    cpf: req.body.usuario.cpf,
                    dtnascimento: req.body.usuario.dtnascimento,
                    sexo: req.body.usuario.sexo,
                    iduserupdatedAt: Number(req.user.idusuario),
                    trocasenha: req.body.usuario.trocasenha,
                    iddepartamento: req.body.usuario.iddepartamento,
                    idunidade: req.body.usuario.idunidade,
                    ramaln: req.body.usuario.ramaln,
                    celular: req.body.usuario.celular,
                    idnivel: req.body.usuario.idnivel,
                    idmenu: req.body.usuario.idmenu,
                    chatid: req.body.usuario.chatid,
                    ti: req.body.usuario.ti,
                    contratost: req.body.usuario.contratost,
                    vtodoscontratos: req.body.usuario.vtodoscontratos,
                    vtodoshoraextra: req.body.usuario.vtodoshoraextra,
                    ccontratos: req.body.usuario.ccontratos,
                    choraextra: req.body.usuario.choraextra,
                    senha: hash
                },
            });
        } else {
            updateUsuario = await prisma.usuario.update({
                where: {
                    idusuario: Number(req.params.idusuario),
                },
                data: {
                    nome: req.body.usuario.nome,
                    email: req.body.usuario.email,
                    cpf: req.body.usuario.cpf,
                    dtnascimento: req.body.usuario.dtnascimento,
                    sexo: req.body.usuario.sexo,
                    iduserupdatedAt: Number(req.user.idusuario),
                    trocasenha: req.body.usuario.trocasenha,
                    iddepartamento: req.body.usuario.iddepartamento,
                    idunidade: req.body.usuario.idunidade,
                    ramaln: req.body.usuario.ramaln,
                    celular: req.body.usuario.celular,
                    idnivel: req.body.usuario.idnivel,
                    idmenu: req.body.usuario.idmenu,
                    chatid: req.body.usuario.chatid,
                    ti: req.body.usuario.ti,
                    contratost: req.body.usuario.contratost,
                    vtodoscontratos: req.body.usuario.vtodoscontratos,
                    vtodoshoraextra: req.body.usuario.vtodoshoraextra,
                    ccontratos: req.body.usuario.ccontratos,
                    choraextra: req.body.usuario.choraextra,
                },
            });
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Usuario atualizado com sucesso',
            updateUsuario: updateUsuario
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

exports.deleteUsuario = async (req, res, next) => {
    try {
        const valor = await prisma.usuario.count({
            where: {
                idusuario: Number(req.params.idusuario),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Usuario não cadastrado' })
        }
        const deleteUsuario = await prisma.usuario.update({
            where: {
                idusuario: Number(req.params.idusuario),
            },
            data: {
                iduserupdatedAt: Number(req.user.idusuario),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Usuario removido com sucesso',
            deleteUsuario: deleteUsuario
        }
        return res.status(200).send(response);
    } catch (error) {
        await prisma.$disconnect()
        return res.status(500).send({
            ok: false,
            error: error
        });
    }
};

exports.getUsuarioUnidade = async (req, res, next) => {
    //   console.log(JSON.stringify(req.params));
    try {
        const OR = await prisma.unidadegestor.findMany({
            where: {
                status: 'A',
                idusuario: Number(req.user.idusuario)
            },
            select: {
                idunidade: true
            }
        })
        //       const userWithoutPassword = exclude(gestor, ['senha'])

        const unidades = await prisma.unidade.findMany({
            where: {
                status: 'A',
                OR
            },
            orderBy: { nome: "desc" }

        })
        //       console.log("Unidade = " + JSON.stringify(unidades));
        await prisma.$disconnect()

        const response = {
            ok: true,
            length: unidades.length,
            unidades: unidades
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

exports.getUsuarioGestor = async (req, res, next) => {
 //   console.log(JSON.stringify(req.params));
    try {
        const gestor = await prisma.unidadegestor.findFirst({
            where: {
                status: 'A',
                idunidade: Number(req.params.idunidade),
                OR: [
                    {
                        usuario: { idnivel: 3 }
                    },
                    {
                        usuario: { idnivel: 9 }
                    },
                ],
            },
            include: {

                usuario: {
                    include: {
                        nivel: true, unidade: true,
                    }
                },
            },
            orderBy: {
                idusuario: "desc"
            }

        })

        const userWithoutPassword = exclude(gestor, ['senha'])
        await prisma.$disconnect()

        const response = {
            ok: true,
            length: gestor.length,
            gestor: gestor
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




