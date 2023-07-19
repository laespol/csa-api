/*
  Warnings:

  - Made the column `periodo` on table `contrato` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `contrato` MODIFY `periodo` VARCHAR(20);
