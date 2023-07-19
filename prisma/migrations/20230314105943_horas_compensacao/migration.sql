/*
  Warnings:

  - Added the required column `hrcomp` to the `hora` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tphoras` to the `hora` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `hora` ADD COLUMN `dtcompfim` DATETIME(3) NULL,
    ADD COLUMN `dtcompini` DATETIME(3) NULL,
    ADD COLUMN `hrcomp` INTEGER NOT NULL,
    ADD COLUMN `tphoras` INTEGER NOT NULL;
