-- CreateTable
CREATE TABLE `unidadegestor` (
    `idunidadegestor` INTEGER NOT NULL AUTO_INCREMENT,
    `idunidade` INTEGER NOT NULL,
    `idusuario` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `departamento` VARCHAR(100) NOT NULL,
    `centrocusto` VARCHAR(10) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    UNIQUE INDEX `unidadegestor_idunidade_idusuario_key`(`idunidade`, `idusuario`),
    PRIMARY KEY (`idunidadegestor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `unidadegestor` ADD CONSTRAINT `unidadegestor_idunidade_fkey` FOREIGN KEY (`idunidade`) REFERENCES `unidade`(`idunidade`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `unidadegestor` ADD CONSTRAINT `unidadegestor_idusuario_fkey` FOREIGN KEY (`idusuario`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
