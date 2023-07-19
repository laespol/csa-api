/*
  Warnings:

  - You are about to drop the column `dtasscont` on the `requisicao` table. All the data in the column will be lost.
  - You are about to drop the column `dtrecdoc` on the `requisicao` table. All the data in the column will be lost.
  - You are about to drop the column `dtvigfinal` on the `requisicao` table. All the data in the column will be lost.
  - You are about to drop the column `dtviginicio` on the `requisicao` table. All the data in the column will be lost.
  - Added the required column `justificativa` to the `requisicao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `requisicao` DROP COLUMN `dtasscont`,
    DROP COLUMN `dtrecdoc`,
    DROP COLUMN `dtvigfinal`,
    DROP COLUMN `dtviginicio`,
    ADD COLUMN `justificativa` VARCHAR(2000) NOT NULL;
