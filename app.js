const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');



const usuarioV1Route = require('./routes/usuario-V1-route');
const alunoV1Route = require('./routes/aluno-V1-route');
const serieV1Route = require('./routes/serie-V1-route');
const anoletivoV1Route = require('./routes/anoletivo-V1-route');
const alunoserieV1Route = require('./routes/alunoserie-V1-route');
const histalunoV1Route = require('./routes/histaluno-V1-route');
const loginV1Route = require('./routes/login-V1-route');
const menuV1Route = require('./routes/menu-V1-route');
const sendmailV1Route = require('./routes/sendmail-V1-route');
const posicaoV1Route = require('./routes/posicao-V1-route');
const colunaV1Route = require('./routes/coluna-V1-route');
const nivelV1Route = require('./routes/nivel-V1-route');
const contratoV1Route = require('./routes/contrato-V1-route');
const documentoV1Route = require('./routes/documento-V1-route');
const documentosolV1Route = require('./routes/documentosol-V1-route');
const unidadeV1Route = require('./routes/unidade-V1-route');
const imovelV1Route = require('./routes/imovel-V1-route');
const custoV1Route = require('./routes/custo-V1-route');
const histmovV1Route = require('./routes/histmov-V1-route');
const horaV1Route = require('./routes/hora-V1-route');
const geradospdfV1Route = require('./routes/geradospdf-V1-route');
const funcionarioV1Route = require('./routes/funcionario-V1-route');
const tphoraV1Route = require('./routes/tphora-V1-route');
const chatgptV1Route = require('./routes/chatgpt-V1-route');
const requisicaoV1Route = require('./routes/requisicao-V1-route');
const solicitacaoV1Route = require('./routes/solicitacao-V1-route');
const tpsolicitacaoV1Route = require('./routes/tpsolicitacao-V1-route');
const cepV1Route = require('./routes/cep-V1-route');

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(fileUpload());
//app.use(bodyParser.urlencoded({ extended: false }));  // apenas dados simples
//app.use(bodyParser.json()); // json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
        );

    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
        return res.status(200).send({});
    }
    next();
});

app.use('/v1/usuario', usuarioV1Route);
app.use('/v1/aluno', alunoV1Route);
app.use('/v1/serie', serieV1Route);
app.use('/v1/anoletivo', anoletivoV1Route);
app.use('/v1/alunoserie', alunoserieV1Route);
app.use('/V1/histaluno', histalunoV1Route);
app.use('/v1/login', loginV1Route);
app.use('/V1/menu' , menuV1Route);
app.use('/V1/sendmail' , sendmailV1Route);
app.use('/V1/posicao' , posicaoV1Route);
app.use('/V1/coluna', colunaV1Route);
app.use('/V1/nivel', nivelV1Route);
app.use('/V1/contrato', contratoV1Route);
app.use('/V1/documento', documentoV1Route);
app.use('/V1/documentosol', documentosolV1Route);
app.use('/V1/unidade' , unidadeV1Route);
app.use('/V1/imovel' , imovelV1Route);
app.use('/V1/custo' , custoV1Route);
app.use('/V1/histmov' , histmovV1Route);
app.use('/V1/hora' , horaV1Route);
app.use('/V1/geradospdf' , geradospdfV1Route);
app.use('/V1/funcionario' , funcionarioV1Route);
app.use('/V1/tphora', tphoraV1Route);
app.use('/V1/chatgpt', chatgptV1Route);
app.use('/V1/requisicao', requisicaoV1Route);
app.use('/V1/solicitacao', solicitacaoV1Route);
app.use('/V1/tpsolicitacao', tpsolicitacaoV1Route);
app.use('/V1/cep' , cepV1Route);

// Quando não encontra rota, entra aqui:
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;