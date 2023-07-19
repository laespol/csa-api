-- CreateTable
CREATE TABLE `geradospdf` (
    `idgeradospdf` INTEGER NOT NULL AUTO_INCREMENT,
    `programa` VARCHAR(50) NOT NULL,
    `codigo` VARCHAR(10000) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idgeradospdf`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `geradospdf` ADD CONSTRAINT `geradospdf_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
