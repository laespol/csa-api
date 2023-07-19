/*
  Warnings:

  - Added the required column `centrocusto` to the `hora` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `hora` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hora` ADD COLUMN `centrocusto` VARCHAR(10) NOT NULL,
    ADD COLUMN `departamento` VARCHAR(100) NOT NULL;
