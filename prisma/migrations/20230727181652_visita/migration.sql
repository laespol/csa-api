-- CreateTable
CREATE TABLE `visita` (
    `idvisita` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(3000) NOT NULL,
    `email` VARCHAR(120) NULL,
    `nome` VARCHAR(120) NULL,
    `telefone` VARCHAR(20) NULL,
    `empresa` VARCHAR(120) NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `statusvisita` VARCHAR(1) NULL DEFAULT 'A',

    FULLTEXT INDEX `visita_descricao_idx`(`descricao`),
    PRIMARY KEY (`idvisita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `visita` ADD CONSTRAINT `visita_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
