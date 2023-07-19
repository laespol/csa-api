-- CreateTable
CREATE TABLE `requisicao` (
    `idcontrato` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(2000) NOT NULL,
    `dtviginicio` DATETIME(3) NULL,
    `dtvigfinal` DATETIME(3) NULL,
    `idunidade` INTEGER NOT NULL,
    `correcao` VARCHAR(10) NOT NULL,
    `valorproposta` DECIMAL(65, 30) NULL DEFAULT 0.00000,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `consulta` VARCHAR(5000) NOT NULL,
    `statusrequisicao` VARCHAR(1) NOT NULL DEFAULT 'A',
    `aditivo` BOOLEAN NULL DEFAULT false,
    `dtasscont` DATETIME(3) NULL,
    `dtrecdoc` DATETIME(3) NULL,
    `aprovado` BOOLEAN NULL DEFAULT false,
    `periodo` INTEGER NULL,
    `idcusto` INTEGER NOT NULL,
    `renovauto` BOOLEAN NULL DEFAULT false,
    `tipopagamento` VARCHAR(10) NULL DEFAULT '',
    `numeroparcelas` INTEGER NULL DEFAULT 0,

    FULLTEXT INDEX `requisicao_consulta_idx`(`consulta`),
    PRIMARY KEY (`idcontrato`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `requisicao` ADD CONSTRAINT `requisicao_idunidade_fkey` FOREIGN KEY (`idunidade`) REFERENCES `unidade`(`idunidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requisicao` ADD CONSTRAINT `requisicao_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `requisicao` ADD CONSTRAINT `requisicao_idcusto_fkey` FOREIGN KEY (`idcusto`) REFERENCES `custo`(`idcusto`) ON DELETE RESTRICT ON UPDATE CASCADE;
