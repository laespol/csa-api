const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client')
const ActiveDirectory = require('activedirectory');

const prisma = new PrismaClient()

var config = {
    url: 'ldap://192.168.173.250',
    baseDN: 'dc=MSG,dc=local',
    username: 'glpi@santoamerico.org.br'
};


exports.Login = async (req, res, next) => {
//    console.log(JSON.stringify(req.body.email));
    var login;
    try {
        login = await prisma.usuario.findFirst({
            where: {
                cpf: req.body.email,
                status: 'A'
            },
            include: {
                nivel: true,
                menu: {
                    include: {
                        Menuitem: {
                            orderBy: {
                                seq: "asc"
                            },
                            where: {
                                status: 'A'
                            }
                        }
                    }
                }
            }

        })
 //       console.log(JSON.stringify(login));
        await prisma.$disconnect()
        if (login == null) {
            gravaLogin(req.body.email, 401, '0');
            return res.status(401).send({ ok: false, message: 'Falha na autenticação' })
        }

        var ad = new ActiveDirectory(config);
        var username = login.email;
        var password = req.body.senha;
 //       console.log(username);
 //       console.log(password);

        ad.authenticate(username, password, function (err, auth) {
            if (err) {
                console.log('ERROR: ' + JSON.stringify(err));
                gravaLogin(req.body.email, 401, '0');
                return res.status(401).send({ ok: false, message: 'Falha na autenticação' });
            }
            if (auth) {
                gravaLogin(req.body.email, 200, '0');
 //               console.log('Authenticated!');

                const token = jwt.sign({
                    idusuario: login.idusuario,
                    email: login.email,

                    nivel: login.nivel
                },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });
                gravaLogin(req.body.email, 200, '0');
                return res.status(200).send({
                    ok: true,
                    message: 'Autenticado com sucesso',
                    token: token,
                    registro: login
                });

            }
            else {
 //               console.log('Authentication failed!');
                gravaLogin(req.body.email, 401, '0');
                return res.status(401).send({ ok: false, message: 'Falha na autenticação' });
            }
        });
        /*
        if (await bcrypt.compareSync(req.body.senha, login.senha)) {
            const token = jwt.sign({
                idusuario: login.idusuario,
                email: login.email,
                nivel: login.nivel
            },
                process.env.JWT_KEY,
                {
                    expiresIn: "1h"
                });
            gravaLogin(req.body.email, 200, '0');
            return res.status(200).send({
                ok: true,
                message: 'Autenticado com sucesso',
                token: token,
                registro: login
            });
        }
        gravaLogin(req.body.email, 401, '0');
        return res.status(401).send({ ok: false, message: 'Falha na autenticação' })
*/
    } catch (error) {
                console.log(error);
        gravaLogin(req.body.email, 500, '0');
        return res.status(500).send({ ok: false, message: 'Falha na autenticação' });
    }


};

exports.Trocasenha = async (req, res, next) => {
    try {
        const valor = await prisma.usuario.count({
            where: {
                idusuario: Number(req.body.usuario.idusuario),
                status: 'A'
            }
        })
        if (valor == 0) {
            await prisma.$disconnect()
            return res.status(401).send({ ok: false, message: 'Usuario não encontrado' })
        }
        const hash = await bcrypt.hashSync(req.body.usuario.novasenha, 10);
        const updateUsuario = await prisma.usuario.update({
            where: {
                idusuario: Number(req.body.usuario.idusuario),
            },
            data: {
                senha: hash,
                trocasenha: false,
                iduserupdatedAt: Number(req.user.idusuario),
            },
        });
        await prisma.$disconnect()
        const response = {
            ok: true,
            message: 'Usuario atualizado com sucesso',
            updateUsuario: updateUsuario
        }
        return res.status(202).send(response);

    } catch (error) {
        await prisma.$disconnect()
        return res.status(500).send({ ok: false, message: 'Usuario não encontrado' });
    }

};

async function gravaLogin(email, respsend, iporigem) {
    try {
        const criarlogin = await prisma.login.create({
            data: {
                email: email,
                respsend: respsend,
                iporigem: iporigem
            },
        })
        await prisma.$disconnect()
    } catch (error) {
        //       console.log(error);
        await prisma.$disconnect()
    }
};



exports.getConfiguracao = async (req, res, next) => {
    try {
        const leconfiguracao = await prisma.configuracao.findUnique({
            where: {
                idconfiguracao: Number(req.params.idconfiguracao),
            }
        })

        if (leconfiguracao.length == 0) {
            await prisma.$disconnect()
            return res.status(404).send({
                ok: false,
                message: 'configuracao não encontrado'
            })
        }
        const configuracao = await prisma.configuracao.update({
            where: {
                idconfiguracao: Number(req.params.idconfiguracao),
            },
            data: {
                numeroreqcompra: leconfiguracao.numeroreqcompra + 1
            }
        })

        await prisma.$disconnect()
        const response = {
            ok: true,
            configuracao: configuracao
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
