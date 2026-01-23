/*
  Warnings:

  - You are about to drop the column `used` on the `PasswordResetToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PasswordResetToken" DROP COLUMN "used",
ADD COLUMN     "usedAt" TIMESTAMP(3);
