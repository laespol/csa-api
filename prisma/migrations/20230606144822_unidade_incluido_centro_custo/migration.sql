/*
  Warnings:

  - Added the required column `centrocusto` to the `unidade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `unidade` ADD COLUMN `centrocusto` VARCHAR(20) NOT NULL;
