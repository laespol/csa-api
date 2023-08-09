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
exports.getVisita = async (req, res, next) => {
    try {
        const visitas = await prisma.visita.findMany({
            where: {
                status: 'A'
            },
            include: { usuario: true },
            orderBy: {
                nome: "desc"
            }

        })

        for (i = 0; i <= visitas.length - 1; i++) {

            const userWithoutPassword = exclude(visitas[i], ['senha'])

        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            length: visitas.length,
            visitas: visitas
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

exports.postVisita = async (req, res, next) => {
    //console.log(req.body.visita);
    try {
        const valor = await prisma.visita.count({
            where: {
                email: req.body.visita.email,
                status: 'A'
            }
        })

        //       if (valor != 0) {
        //           return res.status(200).send({ ok: false, message: 'Visita já cadastrado' })
        //       }

        const hash = await bcrypt.hashSync(req.body.visita.senha, 10);
        const createVisita = await prisma.visita.create({
            data: {
                nome: req.body.visita.nome,
                email: req.body.visita.email,
                cpf: req.body.visita.cpf,
                dtnascimento: req.body.visita.dtnascimento,
                sexo: req.body.visita.sexo,
                idusercreateAt: req.user.idvisita,
                idnivel: req.body.visita.idnivel,
                idunidade: req.body.visita.idunidade,
                senha: hash,
                trocasenha: req.body.visita.trocasenha,
                iddepartamento: req.body.visita.iddepartamento,
                ramaln: req.body.visita.ramaln,
                celular: req.body.visita.celular,
                idmenu: req.body.visita.idmenu,
                chatid: req.body.visita.chatid,
                ti: req.body.visita.ti,
                contratost: req.body.visita.contratost,
                
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Visita inserido com sucesso',
            createVisita: createVisita
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

exports.getVisitaDetail = async (req, res, next) => {
    try {
        //         console.log(Number(req.params.idvisita));
        const visita = await prisma.visita.findFirst({
            where: {
                idvisita: Number(req.params.idvisita),
                status: 'A'
            },
            include: { usuario: true},
            orderBy: {
                nome: "desc"
            }
        })

        const userWithoutPassword = exclude(visita, ['senha'])
        //      console.log(userWithoutPassword);
        if (visita.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'Visita não encontrado'
            })
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            visita: visita,
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

exports.updateVisita = async (req, res, next) => {
    var updateVisita;
    try {

        const valor = await prisma.visita.count({
            where: {
                idvisita: Number(req.params.idvisita),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Visita não cadastrado' })
        }
        if (req.body.visita.trocasenha) {
            const hash = await bcrypt.hashSync(req.body.visita.senha, 10);
            updateVisita = await prisma.visita.update({
                where: {
                    idvisita: Number(req.params.idvisita),
                },
                data: {
                    nome: req.body.visita.nome,
                    email: req.body.visita.email,
                    cpf: req.body.visita.cpf,
                    dtnascimento: req.body.visita.dtnascimento,
                    sexo: req.body.visita.sexo,
                    iduserupdatedAt: Number(req.user.idvisita),
                    trocasenha: req.body.visita.trocasenha,
                    iddepartamento: req.body.visita.iddepartamento,
                    idunidade: req.body.visita.idunidade,
                    ramaln: req.body.visita.ramaln,
                    celular: req.body.visita.celular,
                    idnivel: req.body.visita.idnivel,
                    idmenu: req.body.visita.idmenu,
                    chatid: req.body.visita.chatid,
                    ti: req.body.visita.ti,
                    contratost: req.body.visita.contratost,
                    vtodoscontratos: req.body.visita.vtodoscontratos,
                    vtodoshoraextra: req.body.visita.vtodoshoraextra,
                    ccontratos: req.body.visita.ccontratos,
                    choraextra: req.body.visita.choraextra,
                    senha: hash
                },
            });
        } else {
            updateVisita = await prisma.visita.update({
                where: {
                    idvisita: Number(req.params.idvisita),
                },
                data: {
                    nome: req.body.visita.nome,
                    email: req.body.visita.email,
                    cpf: req.body.visita.cpf,
                    dtnascimento: req.body.visita.dtnascimento,
                    sexo: req.body.visita.sexo,
                    iduserupdatedAt: Number(req.user.idvisita),
                    trocasenha: req.body.visita.trocasenha,
                    iddepartamento: req.body.visita.iddepartamento,
                    idunidade: req.body.visita.idunidade,
                    ramaln: req.body.visita.ramaln,
                    celular: req.body.visita.celular,
                    idnivel: req.body.visita.idnivel,
                    idmenu: req.body.visita.idmenu,
                    chatid: req.body.visita.chatid,
                    ti: req.body.visita.ti,
                    contratost: req.body.visita.contratost,
                    vtodoscontratos: req.body.visita.vtodoscontratos,
                    vtodoshoraextra: req.body.visita.vtodoshoraextra,
                    ccontratos: req.body.visita.ccontratos,
                    choraextra: req.body.visita.choraextra,
                },
            });
        }
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Visita atualizado com sucesso',
            updateVisita: updateVisita
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

exports.deleteVisita = async (req, res, next) => {
    try {
        const valor = await prisma.visita.count({
            where: {
                idvisita: Number(req.params.idvisita),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(200).send({ ok: false, message: 'Visita não cadastrado' })
        }
        const deleteVisita = await prisma.visita.update({
            where: {
                idvisita: Number(req.params.idvisita),
            },
            data: {
                iduserupdatedAt: Number(req.user.idvisita),
                status: "D"
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Visita removido com sucesso',
            deleteVisita: deleteVisita
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

exports.getVisitaUnidade = async (req, res, next) => {
    //   console.log(JSON.stringify(req.params));
    try {
        const OR = await prisma.unidadegestor.findMany({
            where: {
                status: 'A',
                idvisita: Number(req.user.idvisita)
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

exports.getVisitaGestor = async (req, res, next) => {
 //   console.log(JSON.stringify(req.params));
    try {
        const gestor = await prisma.unidadegestor.findFirst({
            where: {
                status: 'A',
                idunidade: Number(req.params.idunidade),
                OR: [
                    {
                        visita: { idnivel: 3 }
                    },
                    {
                        visita: { idnivel: 9 }
                    },
                ],
            },
            include: {

                visita: {
                    include: {
                        nivel: true, unidade: true,
                    }
                },
            },
            orderBy: {
                idvisita: "desc"
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




