/*
  Warnings:

  - You are about to drop the column `datahora` on the `hora` table. All the data in the column will be lost.
  - Added the required column `datafinal` to the `hora` table without a default value. This is not possible if the table is not empty.
  - Added the required column `datainicio` to the `hora` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hora` DROP COLUMN `datahora`,
    ADD COLUMN `datafinal` DATETIME(3) NOT NULL,
    ADD COLUMN `datainicio` DATETIME(3) NOT NULL;
