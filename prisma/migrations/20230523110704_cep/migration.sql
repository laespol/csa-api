-- CreateTable
CREATE TABLE `cep` (
    `idcep` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `logradouro` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idcep`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
