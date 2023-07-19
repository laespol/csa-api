/*
  Warnings:

  - A unique constraint covering the columns `[programa]` on the table `geradospdf` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `geradospdf_programa_key` ON `geradospdf`(`programa`);
