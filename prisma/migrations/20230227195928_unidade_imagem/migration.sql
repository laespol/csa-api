/*
  Warnings:

  - Added the required column `imagem1` to the `unidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem2` to the `unidade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `unidade` ADD COLUMN `imagem1` VARCHAR(5000) NOT NULL,
    ADD COLUMN `imagem2` VARCHAR(5000) NOT NULL;
