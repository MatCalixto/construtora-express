/*
  Warnings:

  - You are about to drop the column `unidade` on the `visitas` table. All the data in the column will be lost.
  - Added the required column `unidadeId` to the `visitas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "visitas" DROP COLUMN "unidade",
ADD COLUMN     "motivo" TEXT,
ADD COLUMN     "unidadeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "unidades" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unidades_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "visitas" ADD CONSTRAINT "visitas_unidadeId_fkey" FOREIGN KEY ("unidadeId") REFERENCES "unidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
