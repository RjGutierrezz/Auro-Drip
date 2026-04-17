/*
  Warnings:

  - Added the required column `userId` to the `ClothingItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClothingItem" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "ClothingItem_userId_idx" ON "ClothingItem"("userId");
