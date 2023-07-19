-- CreateTable
CREATE TABLE `solicitacao` (
    `idsolicitacao` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(3000) NOT NULL,
    `resposta` VARCHAR(3000) NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `consulta` VARCHAR(9000) NOT NULL,
    `statussolicitacao` VARCHAR(1) NULL DEFAULT 'A',
    `idtpsolicitacao` INTEGER NULL,

    FULLTEXT INDEX `solicitacao_consulta_idx`(`consulta`),
    PRIMARY KEY (`idsolicitacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tpsolicitacao` (
    `idtpsolicitacao` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(100) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idtpsolicitacao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `solicitacao` ADD CONSTRAINT `solicitacao_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `solicitacao` ADD CONSTRAINT `solicitacao_idtpsolicitacao_fkey` FOREIGN KEY (`idtpsolicitacao`) REFERENCES `Tpsolicitacao`(`idtpsolicitacao`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tpsolicitacao` ADD CONSTRAINT `Tpsolicitacao_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
