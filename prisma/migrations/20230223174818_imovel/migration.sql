-- AlterTable
ALTER TABLE `unidade` ADD COLUMN `idimovel` INTEGER NOT NULL DEFAULT 5;

-- AddForeignKey
ALTER TABLE `unidade` ADD CONSTRAINT `unidade_idimovel_fkey` FOREIGN KEY (`idimovel`) REFERENCES `imovel`(`idimovel`) ON DELETE RESTRICT ON UPDATE CASCADE;
