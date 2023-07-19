/*
  Warnings:

  - Added the required column `idunidade` to the `hora` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hora` ADD COLUMN `idunidade` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `hora` ADD CONSTRAINT `hora_idunidade_fkey` FOREIGN KEY (`idunidade`) REFERENCES `unidade`(`idunidade`) ON DELETE RESTRICT ON UPDATE CASCADE;
