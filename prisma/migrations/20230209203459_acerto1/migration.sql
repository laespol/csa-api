/*
  Warnings:

  - You are about to drop the column `idimovel` on the `contrato` table. All the data in the column will be lost.
  - Added the required column `idimovel` to the `custo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `contrato` DROP FOREIGN KEY `contrato_idimovel_fkey`;

-- AlterTable
ALTER TABLE `contrato` DROP COLUMN `idimovel`;

-- AlterTable
ALTER TABLE `custo` ADD COLUMN `idimovel` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `custo` ADD CONSTRAINT `custo_idimovel_fkey` FOREIGN KEY (`idimovel`) REFERENCES `imovel`(`idimovel`) ON DELETE RESTRICT ON UPDATE CASCADE;
