/*
  Warnings:

  - You are about to drop the column `tphoras` on the `hora` table. All the data in the column will be lost.
  - Added the required column `idtphora` to the `hora` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hora` DROP COLUMN `tphoras`,
    ADD COLUMN `idtphora` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `tphora` (
    `idtphora` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `idusercreateAt` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `iduserupdatedAt` INTEGER NULL,
    `updatedAt` DATETIME(3) NULL,
    `status` VARCHAR(1) NOT NULL DEFAULT 'A',

    PRIMARY KEY (`idtphora`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `hora` ADD CONSTRAINT `hora_idtphora_fkey` FOREIGN KEY (`idtphora`) REFERENCES `tphora`(`idtphora`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tphora` ADD CONSTRAINT `tphora_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
