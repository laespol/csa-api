/*
  Warnings:

  - You are about to drop the column `Motivo` on the `hora` table. All the data in the column will be lost.
  - You are about to drop the column `periodo` on the `hora` table. All the data in the column will be lost.
  - Added the required column `motivo` to the `hora` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hora` DROP COLUMN `Motivo`,
    DROP COLUMN `periodo`,
    ADD COLUMN `motivo` VARCHAR(60) NOT NULL,
    ADD COLUMN `qthoras` INTEGER NOT NULL DEFAULT 0;
