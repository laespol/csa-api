-- CreateTable
CREATE TABLE `hora` (
    `idhora` INTEGER NOT NULL AUTO_INCREMENT,
    `funcionario` VARCHAR(60) NOT NULL,
    `datahora` DATETIME(3) NOT NULL,
    `Motivo` VARCHAR(60) NOT NULL,
    `periodo` INTEGER NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',
    `consulta` VARCHAR(1000) NOT NULL,

    PRIMARY KEY (`idhora`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hora` ADD CONSTRAINT `hora_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
