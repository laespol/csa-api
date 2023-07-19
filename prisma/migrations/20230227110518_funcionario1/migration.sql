/*
  Warnings:

  - Added the required column `centrocusto` to the `funcionario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `funcionario` ADD COLUMN `centrocusto` VARCHAR(10) NOT NULL;
