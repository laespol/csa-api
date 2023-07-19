-- DropForeignKey
ALTER TABLE `tpsolicitacao` DROP FOREIGN KEY `Tpsolicitacao_idusercreateAt_fkey`;

-- AddForeignKey
ALTER TABLE `tpsolicitacao` ADD CONSTRAINT `tpsolicitacao_idusercreateAt_fkey` FOREIGN KEY (`idusercreateAt`) REFERENCES `usuario`(`idusuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
