-- CreateTable
CREATE TABLE `funcionario` (
    `idfuncionario` INTEGER NOT NULL AUTO_INCREMENT,
    `chapa` INTEGER NOT NULL,
    `nome` VARCHAR(100) NOT NULL,
    `departamento` VARCHAR(100) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    UNIQUE INDEX `funcionario_chapa_key`(`chapa`),
    PRIMARY KEY (`idfuncionario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `funcionario` ADD CONSTRAINT `funcionario_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
