/*
  Warnings:

  - The primary key for the `cep` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `idcep` on the `cep` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE `cep` DROP PRIMARY KEY,
    MODIFY `idcep` VARCHAR(8) NOT NULL,
    MODIFY `cidade` VARCHAR(255) NOT NULL,
    MODIFY `bairro` VARCHAR(255) NOT NULL,
    MODIFY `logradouro` VARCHAR(255) NOT NULL,
    ADD PRIMARY KEY (`idcep`);
