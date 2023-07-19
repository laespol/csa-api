/*
  Warnings:

  - The primary key for the `requisicao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `idcontrato` on the `requisicao` table. All the data in the column will be lost.
  - Added the required column `idrequisicao` to the `requisicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `requisicao` DROP PRIMARY KEY,
    DROP COLUMN `idcontrato`,
    ADD COLUMN `idrequisicao` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`idrequisicao`);
