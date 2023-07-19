-- CreateTable
CREATE TABLE `documentosol` (
    `iddocumentosol` INTEGER NOT NULL AUTO_INCREMENT,
    `idsolicitacao` INTEGER NOT NULL,
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

    PRIMARY KEY (`iddocumentosol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `documentosol` ADD CONSTRAINT `documentosol_idsolicitacao_fkey` FOREIGN KEY (`idsolicitacao`) REFERENCES `solicitacao`(`idsolicitacao`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `documentosol` ADD CONSTRAINT `documentosol_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
