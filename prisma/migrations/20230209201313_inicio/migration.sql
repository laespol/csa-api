-- CreateTable
CREATE TABLE `usuario` (
    `idusuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `cpf` VARCHAR(50) NULL,
    `dtnascimento` DATE NULL,
    `sexo` VARCHAR(1) NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `senha` VARCHAR(191) NOT NULL,
    `trocasenha` BOOLEAN NOT NULL DEFAULT true,
    `iddepartamento` INTEGER NOT NULL,
    `idmenu` INTEGER NOT NULL DEFAULT 1,
    `celular` VARCHAR(20) NULL,
    `ramaln` VARCHAR(20) NULL,
    `idnivel` INTEGER NOT NULL DEFAULT 1,
    `chatid` VARCHAR(191) NULL DEFAULT '0',
    `ti` BOOLEAN NOT NULL DEFAULT false,
    `contrato` BOOLEAN NOT NULL DEFAULT false,
    `contratost` BOOLEAN NOT NULL DEFAULT false,
    `idunidade` INTEGER NOT NULL DEFAULT 1,

    INDEX `usuario_email_idx`(`email`),
    INDEX `usuario_iddepartamento_fkey`(`iddepartamento`),
    INDEX `usuario_idmenu_fkey`(`idmenu`),
    INDEX `usuario_idnivel_fkey`(`idnivel`),
    PRIMARY KEY (`idusuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nivel` (
    `idnivel` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idnivel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `login` (
    `idlogin` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `respsend` INTEGER NOT NULL,
    `iporigem` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`idlogin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sendmail` (
    `idsendmail` INTEGER NOT NULL AUTO_INCREMENT,
    `destinatario` VARCHAR(1000) NOT NULL,
    `html` LONGBLOB NOT NULL,
    `subject` VARCHAR(200) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `idsolicitante` INTEGER NULL,
    `idusuarioaprovacao` INTEGER NULL,
    `idusuariocotacao` INTEGER NULL,
    `idusuarioaprovacaodir` INTEGER NULL,
    `idusuariocompra` INTEGER NULL,
    `idusuarioentrega` INTEGER NULL,
    `idcompra` INTEGER NULL,

    PRIMARY KEY (`idsendmail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu` (
    `idmenu` INTEGER NOT NULL AUTO_INCREMENT,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `nome` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`idmenu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menuitem` (
    `idmenuitem` INTEGER NOT NULL AUTO_INCREMENT,
    `idmenu` INTEGER NOT NULL,
    `seq` INTEGER NOT NULL,
    `titulo` VARCHAR(30) NOT NULL,
    `url` VARCHAR(200) NOT NULL,
    `icon` VARCHAR(30) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    INDEX `menuitem_idmenu_fkey`(`idmenu`),
    PRIMARY KEY (`idmenuitem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `telegram` (
    `chatid` VARCHAR(191) NOT NULL,
    `email` VARCHAR(100) NULL,
    `senha` VARCHAR(191) NULL,
    `quantidade` INTEGER NULL DEFAULT 1,
    `messageid` INTEGER NOT NULL DEFAULT 0,
    `idtelegram` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`idtelegram`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `coluna` (
    `idcoluna` INTEGER NOT NULL AUTO_INCREMENT,
    `programa` VARCHAR(50) NOT NULL,
    `field` VARCHAR(191) NOT NULL,
    `header` VARCHAR(191) NOT NULL,
    `style` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `agregado1` VARCHAR(191) NULL,
    `agregado2` VARCHAR(191) NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `ordem` INTEGER NOT NULL DEFAULT 0,
    `ordena` VARCHAR(191) NOT NULL DEFAULT 'true',

    PRIMARY KEY (`idcoluna`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuariocoluna` (
    `idusuariocoluna` INTEGER NOT NULL AUTO_INCREMENT,
    `idcoluna` INTEGER NOT NULL DEFAULT 0,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `idusuario` INTEGER NOT NULL,

    PRIMARY KEY (`idusuariocoluna`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aluno` (
    `idaluno` INTEGER NOT NULL AUTO_INCREMENT,
    `ra` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `respfinanceiro` INTEGER NOT NULL DEFAULT 8,
    `resppedagogico` INTEGER NOT NULL DEFAULT 8,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    UNIQUE INDEX `aluno_ra_key`(`ra`),
    PRIMARY KEY (`idaluno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `histaluno` (
    `idhistaluno` INTEGER NOT NULL AUTO_INCREMENT,
    `idalunoserie` INTEGER NOT NULL,
    `nome` VARCHAR(600) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `alunoIdaluno` INTEGER NULL,
    `anoletivoIdanoletivo` INTEGER NULL,
    `serieIdserie` INTEGER NULL,
    `statuscompra` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idhistaluno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anoletivo` (
    `idanoletivo` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(600) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idanoletivo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `serie` (
    `idserie` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(600) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idserie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `alunoserie` (
    `idalunoserie` INTEGER NOT NULL AUTO_INCREMENT,
    `idanoletivo` INTEGER NOT NULL,
    `idserie` INTEGER NOT NULL,
    `idaluno` INTEGER NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `statuscompra` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idalunoserie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `posicao` (
    `statuscompra` VARCHAR(1) NOT NULL,
    `nome` VARCHAR(30) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    UNIQUE INDEX `posicao_statuscompra_key`(`statuscompra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materia` (
    `idmateria` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idmateria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materiaserie` (
    `idmateriaserie` INTEGER NOT NULL AUTO_INCREMENT,
    `idanoletivo` INTEGER NOT NULL,
    `idserie` INTEGER NOT NULL,
    `idmateria` INTEGER NOT NULL,
    `idprofessor` INTEGER NOT NULL DEFAULT 0,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idmateriaserie`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notas` (
    `idnota` INTEGER NOT NULL AUTO_INCREMENT,
    `idmateriaserie` INTEGER NOT NULL,
    `idaluno` INTEGER NOT NULL,
    `nota` DECIMAL(65, 30) NOT NULL DEFAULT 0.00,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idnota`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imovel` (
    `idimovel` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(50) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idimovel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unidade` (
    `idunidade` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idunidade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contrato` (
    `idcontrato` INTEGER NOT NULL AUTO_INCREMENT,
    `idimovel` INTEGER NOT NULL,
    `razaosocial` VARCHAR(90) NOT NULL,
    `cnpj` VARCHAR(30) NULL,
    `descricao` CHAR(250) NOT NULL,
    `dtviginicio` DATETIME(3) NULL,
    `dtvigfinal` DATETIME(3) NULL,
    `idunidade` INTEGER NOT NULL,
    `correcao` VARCHAR(10) NOT NULL,
    `valorproposta` DECIMAL(65, 30) NULL DEFAULT 0.00000,
    `localizacao` VARCHAR(60) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `consulta` VARCHAR(3000) NOT NULL,
    `statuscontrato` VARCHAR(1) NOT NULL DEFAULT 'A',
    `aditivo` BOOLEAN NULL DEFAULT false,
    `dtasscont` DATETIME(3) NULL,
    `dtrecdoc` DATETIME(3) NULL,
    `aprovado` BOOLEAN NULL DEFAULT false,
    `periodo` INTEGER NULL,
    `idcusto` INTEGER NOT NULL,
    `tipopagamento` VARCHAR(10) NULL DEFAULT '',
    `numeroparcelas` INTEGER NULL DEFAULT 0,

    FULLTEXT INDEX `contrato_consulta_idx`(`consulta`),
    PRIMARY KEY (`idcontrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `documento` (
    `iddocumento` INTEGER NOT NULL AUTO_INCREMENT,
    `idcontrato` INTEGER NOT NULL,
    `documentopdf` LONGBLOB NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `nome` VARCHAR(255) NOT NULL,
    `mimetype` VARCHAR(255) NOT NULL,
    `encoding` VARCHAR(255) NOT NULL,
    `size` INTEGER NOT NULL,

    PRIMARY KEY (`iddocumento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `histmov` (
    `idhistmov` INTEGER NOT NULL AUTO_INCREMENT,
    `idusuario` INTEGER NOT NULL,
    `idcontrato` INTEGER NOT NULL,
    `dtretirada` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dtdevolucao` DATETIME(3) NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idhistmov`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `custo` (
    `idcusto` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(30) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idcusto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_idnivel_fkey` FOREIGN KEY (`idnivel`) REFERENCES `nivel`(`idnivel`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_idmenu_fkey` FOREIGN KEY (`idmenu`) REFERENCES `menu`(`idmenu`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario` ADD CONSTRAINT `usuario_idunidade_fkey` FOREIGN KEY (`idunidade`) REFERENCES `unidade`(`idunidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menuitem` ADD CONSTRAINT `menuitem_idmenu_fkey` FOREIGN KEY (`idmenu`) REFERENCES `menu`(`idmenu`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuariocoluna` ADD CONSTRAINT `usuariocoluna_idcoluna_fkey` FOREIGN KEY (`idcoluna`) REFERENCES `coluna`(`idcoluna`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histaluno` ADD CONSTRAINT `histaluno_idalunoserie_fkey` FOREIGN KEY (`idalunoserie`) REFERENCES `alunoserie`(`idalunoserie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histaluno` ADD CONSTRAINT `histaluno_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histaluno` ADD CONSTRAINT `histaluno_alunoIdaluno_fkey` FOREIGN KEY (`alunoIdaluno`) REFERENCES `aluno`(`idaluno`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histaluno` ADD CONSTRAINT `histaluno_anoletivoIdanoletivo_fkey` FOREIGN KEY (`anoletivoIdanoletivo`) REFERENCES `anoletivo`(`idanoletivo`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histaluno` ADD CONSTRAINT `histaluno_serieIdserie_fkey` FOREIGN KEY (`serieIdserie`) REFERENCES `serie`(`idserie`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histaluno` ADD CONSTRAINT `histaluno_statuscompra_fkey` FOREIGN KEY (`statuscompra`) REFERENCES `posicao`(`statuscompra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anoletivo` ADD CONSTRAINT `anoletivo_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `serie` ADD CONSTRAINT `serie_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunoserie` ADD CONSTRAINT `alunoserie_idanoletivo_fkey` FOREIGN KEY (`idanoletivo`) REFERENCES `anoletivo`(`idanoletivo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunoserie` ADD CONSTRAINT `alunoserie_idserie_fkey` FOREIGN KEY (`idserie`) REFERENCES `serie`(`idserie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunoserie` ADD CONSTRAINT `alunoserie_idaluno_fkey` FOREIGN KEY (`idaluno`) REFERENCES `aluno`(`idaluno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunoserie` ADD CONSTRAINT `alunoserie_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alunoserie` ADD CONSTRAINT `alunoserie_statuscompra_fkey` FOREIGN KEY (`statuscompra`) REFERENCES `posicao`(`statuscompra`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materiaserie` ADD CONSTRAINT `materiaserie_idanoletivo_fkey` FOREIGN KEY (`idanoletivo`) REFERENCES `anoletivo`(`idanoletivo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materiaserie` ADD CONSTRAINT `materiaserie_idserie_fkey` FOREIGN KEY (`idserie`) REFERENCES `serie`(`idserie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materiaserie` ADD CONSTRAINT `materiaserie_idmateria_fkey` FOREIGN KEY (`idmateria`) REFERENCES `materia`(`idmateria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materiaserie` ADD CONSTRAINT `materiaserie_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_idmateriaserie_fkey` FOREIGN KEY (`idmateriaserie`) REFERENCES `materiaserie`(`idmateriaserie`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_idaluno_fkey` FOREIGN KEY (`idaluno`) REFERENCES `aluno`(`idaluno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notas` ADD CONSTRAINT `notas_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imovel` ADD CONSTRAINT `imovel_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contrato` ADD CONSTRAINT `contrato_idimovel_fkey` FOREIGN KEY (`idimovel`) REFERENCES `imovel`(`idimovel`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contrato` ADD CONSTRAINT `contrato_idunidade_fkey` FOREIGN KEY (`idunidade`) REFERENCES `unidade`(`idunidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contrato` ADD CONSTRAINT `contrato_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `contrato` ADD CONSTRAINT `contrato_idcusto_fkey` FOREIGN KEY (`idcusto`) REFERENCES `custo`(`idcusto`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `documento_idcontrato_fkey` FOREIGN KEY (`idcontrato`) REFERENCES `contrato`(`idcontrato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documento` ADD CONSTRAINT `documento_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histmov` ADD CONSTRAINT `histmov_idusuario_fkey` FOREIGN KEY (`idusuario`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histmov` ADD CONSTRAINT `histmov_idcontrato_fkey` FOREIGN KEY (`idcontrato`) REFERENCES `contrato`(`idcontrato`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `custo` ADD CONSTRAINT `custo_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
