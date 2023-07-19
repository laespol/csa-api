-- CreateTable
CREATE TABLE `pasta` (
    `idpasta` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `dtentrega` DATETIME(3) NULL,
    `dtvigencia` DATETIME(3) NULL,
    `iduserrec` INTEGER NOT NULL,
    `tempoguarda` INTEGER NOT NULL,
    `idunidade` INTEGER NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idpasta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pasta` ADD CONSTRAINT `pasta_idunidade_fkey` FOREIGN KEY (`idunidade`) REFERENCES `unidade`(`idunidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pasta` ADD CONSTRAINT `pasta_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
