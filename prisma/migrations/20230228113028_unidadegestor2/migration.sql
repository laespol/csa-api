/*
  Warnings:

  - You are about to drop the column `centrocusto` on the `unidadegestor` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `unidadegestor` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `unidadegestor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `unidadegestor` DROP COLUMN `centrocusto`,
    DROP COLUMN `departamento`,
    DROP COLUMN `nome`;
