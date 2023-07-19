-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `ccontratos` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `choraextra` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `vtodoscontratos` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `vtodoshoraextra` BOOLEAN NOT NULL DEFAULT false;
