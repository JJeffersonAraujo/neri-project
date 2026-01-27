/*
  Warnings:

  - You are about to drop the column `atendimentoId` on the `Atividade` table. All the data in the column will be lost.
  - You are about to drop the `Atendimento` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Paciente` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Atendimento" DROP CONSTRAINT "Atendimento_pacienteId_fkey";

-- DropForeignKey
ALTER TABLE "Atividade" DROP CONSTRAINT "Atividade_atendimentoId_fkey";

-- DropForeignKey
ALTER TABLE "Atividade" DROP CONSTRAINT "Atividade_plantaoId_fkey";

-- DropForeignKey
ALTER TABLE "Plantao" DROP CONSTRAINT "Plantao_escalaId_fkey";

-- DropIndex
DROP INDEX "Atividade_plantaoId_idx";

-- DropIndex
DROP INDEX "Plantao_data_idx";

-- DropIndex
DROP INDEX "Profissional_tipoProfissionalId_idx";

-- AlterTable
ALTER TABLE "Atividade" DROP COLUMN "atendimentoId";

-- DropTable
DROP TABLE "Atendimento";

-- DropTable
DROP TABLE "Paciente";

-- CreateTable
CREATE TABLE "JornadaExecutada" (
    "id" SERIAL NOT NULL,
    "escalaId" INTEGER NOT NULL,
    "inicioExecutado" TIMESTAMP(3) NOT NULL,
    "fimExecutado" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JornadaExecutada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JornadaCalculada" (
    "id" SERIAL NOT NULL,
    "escalaId" INTEGER NOT NULL,
    "minutosTrabalhados" INTEGER NOT NULL,
    "minutosAtraso" INTEGER NOT NULL,
    "minutosExtras" INTEGER NOT NULL,
    "minutosNoturnos" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JornadaCalculada_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plantao" ADD CONSTRAINT "Plantao_escalaId_fkey" FOREIGN KEY ("escalaId") REFERENCES "Escala"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_plantaoId_fkey" FOREIGN KEY ("plantaoId") REFERENCES "Plantao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JornadaExecutada" ADD CONSTRAINT "JornadaExecutada_escalaId_fkey" FOREIGN KEY ("escalaId") REFERENCES "Escala"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JornadaCalculada" ADD CONSTRAINT "JornadaCalculada_escalaId_fkey" FOREIGN KEY ("escalaId") REFERENCES "Escala"("id") ON DELETE CASCADE ON UPDATE CASCADE;
