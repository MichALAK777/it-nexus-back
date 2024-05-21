/*
  Warnings:

  - You are about to drop the column `cpf` on the `clientes` table. All the data in the column will be lost.
  - Made the column `senha` on table `usuarios` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `clientes` DROP COLUMN `cpf`;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `senha` VARCHAR(100) NOT NULL;
